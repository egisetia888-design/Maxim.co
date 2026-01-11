import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';

export default function WalletPage() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const netIncome = income - expense;
  const sedekah = netIncome > 0 ? netIncome * 0.025 : 0; // 2.5% Logic

  return (
    <Stack spacing={2}>
      <Card sx={{ bgcolor: 'white' }}>
        <CardContent>
          <Typography variant="h6">Kalkulator Barakah</Typography>
          <TextField 
            label="Pendapatan Hari Ini (Rp)" 
            type="number" 
            fullWidth 
            margin="normal"
            onChange={(e) => setIncome(Number(e.target.value))}
          />
          <TextField 
            label="Pengeluaran (Bensin/Makan)" 
            type="number" 
            fullWidth 
            margin="normal"
            onChange={(e) => setExpense(Number(e.target.value))}
          />
          
          <Typography variant="h5" color={netIncome >= 0 ? "green" : "red"} sx={{ mt: 2 }}>
            Bersih: Rp {netIncome.toLocaleString('id-ID')}
          </Typography>
          
          {netIncome > 0 && (
            <Box sx={{ mt: 1, p: 1, bgcolor: '#e3f2fd', borderRadius: 1 }}>
              <Typography variant="body2">
                💡 Anjuran Sedekah (2.5%): <b>Rp {sedekah.toLocaleString('id-ID')}</b>
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      <Button variant="contained" color="warning">Simpan Laporan</Button>
    </Stack>
  );
}
