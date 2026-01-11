import { createClient } from '@supabase/supabase-js'

// Ganti dengan URL & Key Project Supabase Anda
const supabase = createClient('HTTPS://YOUR_PROJECT.supabase.co', 'YOUR_PUBLIC_ANON_KEY')

export const getSmartHeatmap = async () => {
  // Kita ambil dari VIEW, bukan TABLE. 
  // View ini sudah matang datanya (Pre-calculated).
  const { data, error } = await supabase
    .from('view_smart_heatmap') 
    .select('*')
    .order('total_score', { ascending: false });
    
  if (error) console.log('Error ambil data:', error);
  return data;
};

export const laporGacor = async (zoneId) => {
    // Driver lapor, data masuk, View otomatis update skornya
    await supabase.from('live_reports').insert([{ zone_id: zoneId }]);
};
