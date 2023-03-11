import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import QRCode from 'qrcode.react';
import axios from 'axios';
import Button from "@mui/material/Button";
export default function step3() {
  useEffect(() => {
    const oldData = Cookies.getJSON("alreadyRegisteredUserData") || {};
    setFinalData(oldData);
  }, []);

  const [finalData, setFinalData] = useState([]);


  
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
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          item
          xs={3}
          sx={{ paddingTop: "3rem" }}
        >
          {finalData.length != 0 ? (
            <>
            
             <Typography textAlign={"center"} component="p" sx={{ fontWeight: 700 }} variant="h6">
               Name: {finalData[1].concat(" ",finalData[2])}
               <br/>
               Email: {finalData[3]}
               <br/>
               Mobile: {finalData[4]}
              </Typography>
            </>
          ) : (
            <>
              <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
               We don't have Registration from this Mobile Number
              </Typography>
            </>
          )}

          <Typography component="p" sx={{ fontWeight: 700 ,mt:10}} variant="h6">
            Generate and Download Your PASS for CheckIn
          </Typography>
             
          <Button onClick={() => generatePdf(finalData[3],finalData[1]+" "+finalData[2],finalData[4])}className='hvr-grow' type="submit"
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
  );
}
