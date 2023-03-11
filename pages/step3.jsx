import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import QRCode from 'qrcode.react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Button from '@mui/material/Button';
export default function Step3() {

  function send(email) {
    const data = axios.post('/api/email',
      {
        qrCodeData: `${process.env.DEPLOYED_URL}/attendance/${email}`,
        to: email,
        subject: "Registration Check In QR Code",
        text: "This is a test email from the Next.js Contact Form.",
      }
    );

  }

  useEffect(() => {
    const oldData = Cookies.getJSON('registeringUserData') || {};
    if (!oldData) {
      router.push('/');
    }
    setFinalData(oldData)
    // send(oldData.email);

  }, []);


  const [finalData, setFinalData] = useState(null)


  const [pdfBuffer, setPdfBuffer] = useState(null);

  const generatePdf = async (email,name,mobile) => {
    console.log("inint")
    const response = await fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({ email ,name,mobile}),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      setPdfBuffer(buffer);
    }
  };


  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >

        <Grid container
          direction="column"
          alignItems="center"
          justifyContent="center" item xs={3} sx={{paddingTop:"3rem"}}>
          <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
            This is your Checkin QR Code.
          </Typography>
          <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
            Generate and Download Your PASS for CheckIn
          </Typography>
          <div  style={{padding:"3rem"}}>
          {finalData ? (<> <QRCode value={`https://qr-code-event-registration-and-management.vercel.app/attendance/${finalData?.email}`} /></>) : null}
          </div>
         
          <Button onClick={() => generatePdf(finalData?.email,finalData?.data.firstName+" "+finalData?.data.lastName,finalData?.mobile)}className='hvr-grow' type="submit"
            style={{ backgroundColor: '#202082', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
            Generate PASS
          </Button>
       
          {pdfBuffer && (
            <a href={URL.createObjectURL(new Blob([pdfBuffer], { type: 'application/pdf' }))} download="CII_Check_IN.pdf">
              Download PASS
            </a>
          )}

        </Grid>

      </Grid>


    </>
  )
}
