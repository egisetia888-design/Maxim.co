import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box, Typography } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SchoolIcon from '@mui/icons-material/School';

// Import komponen halaman (Buat file terpisah nanti)
import HeatmapPage from './pages/HeatmapPage';
import WalletPage from './pages/WalletPage';
import SeniorPage from './pages/SeniorPage';

export default function App() {
  const [value, setValue] = useState(0);

  // Logika Router Sederhana
  const renderPage = () => {
    if (value === 0) return <HeatmapPage />; // Halaman Peta
    if (value === 1) return <WalletPage />;  // Halaman Dompet
    if (value === 2) return <SeniorPage />;  // Halaman Tips
    return <Typography>Halaman Tidak Ditemukan</Typography>;
  };

  return (
    <Box sx={{ pb: 7, height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Header Sederhana */}
      <Box sx={{ p: 2, bgcolor: '#ffce00', color: 'black', textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">MAXIM BANDUNG HELPER</Typography>
        <Typography variant="caption">بسم الله الرحمن الرحيم</Typography>
      </Box>

      {/* Konten Utama */}
      <Box sx={{ p: 1 }}>
        {renderPage()}
      </Box>

      {/* Navigasi Bawah */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Peta Gacor" icon={<MapIcon />} />
          <BottomNavigationAction label="Dompet" icon={<AccountBalanceWalletIcon />} />
          <BottomNavigationAction label="Ilmu Senior" icon={<SchoolIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
