import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Box, Typography, Chip, CircularProgress } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import 'leaflet/dist/leaflet.css'; // Wajib import CSS Leaflet

// --- KONFIGURASI SUPABASE (Sebaiknya dipisah di file services/api.js) ---
const supabaseUrl = 'HTTPS://YOUR_PROJECT.supabase.co'; // GANTI INI
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY'; // GANTI INI
const supabase = createClient(supabaseUrl, supabaseKey);

// Koordinat Tengah Bandung
const BANDUNG_CENTER = [-6.9175, 107.6191];

export default function HeatmapPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi Algoritma Warna berdasarkan Skor
  const getColor = (score) => {
    if (score >= 9) return { color: 'red', label: 'GACOR PARAH 🔥' };
    if (score >= 6) return { color: 'orange', label: 'RAMAI ⚡' };
    return { color: 'green', label: 'NORMAL 🍃' };
  };

  useEffect(() => {
    fetchSmartData();
  }, []);

  const fetchSmartData = async () => {
    try {
      // Mengambil data dari VIEW pintar yang sudah kita buat di Database
      // View ini otomatis menghitung bobot jam + laporan driver
      let { data, error } = await supabase
        .from('view_smart_heatmap')
        .select('*');
      
      if (error) throw error;
      setZones(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      
      {/* Peta Full Screen */}
      <MapContainer 
        center={BANDUNG_CENTER} 
        zoom={13} 
        style={{ height: '90vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {zones.map((zone) => {
          const status = getColor(zone.total_score);
          return (
            <CircleMarker
              key={zone.id}
              center={[zone.latitude, zone.longitude]}
              pathOptions={{ color: status.color, fillColor: status.color, fillOpacity: 0.6 }}
              radius={15 + (zone.total_score * 1.5)} // Lingkaran membesar jika skor tinggi
            >
              <Popup>
                <Typography variant="subtitle2" fontWeight="bold">{zone.name}</Typography>
                <Typography variant="caption" display="block">{zone.type}</Typography>
                <Chip 
                  label={`${status.label} (Skor: ${zone.total_score})`} 
                  size="small" 
                  color={status.color === 'red' ? 'error' : status.color === 'orange' ? 'warning' : 'success'} 
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" display="block" sx={{mt:1, fontStyle:'italic'}}>
                  "Rezeki sudah diatur, tapi jemputlah di titik yang tepat."
                </Typography>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Floating Legend */}
      <Box sx={{ 
        position: 'absolute', top: 10, right: 10, zIndex: 1000, 
        bgcolor: 'rgba(255,255,255,0.9)', p: 1, borderRadius: 2, boxShadow: 3 
      }}>
        <Typography variant="caption" fontWeight="bold">Indikator:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}><Box sx={{width:10, height:10, bgcolor:'red', borderRadius:'50%', mr:1}}/> <Typography variant="caption">Gacor</Typography></Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}><Box sx={{width:10, height:10, bgcolor:'orange', borderRadius:'50%', mr:1}}/> <Typography variant="caption">Ramai</Typography></Box>
      </Box>
    </Box>
  );
}
