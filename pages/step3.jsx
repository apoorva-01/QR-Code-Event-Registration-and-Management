import React from 'react'
import Typography from '@mui/material/Typography';
import QRCode from 'qrcode.react';
export default function step3() {
  return (
    <>
      <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
        This is your Checkin QR Code.
      </Typography>
      <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
        We have send this on your email
      </Typography>
      <QRCode value={"https://qr-code-event-registration-and-management-1x2la38h5-apoorva-01.vercel.app/attendance/vermaapoorva0510@gmail.com"} />
    </>
  )
}
