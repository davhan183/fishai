import { useState } from 'react';
import Head from 'next/head';
import { Grid } from '@mui/material';

import Main from '../components/Main';
import Result from '../components/Result';
import NoResult from '../components/NoResult';

export default function Home() {
  const [url, setURL] = useState(null);
  const [data, setData] = useState({});
  const [isHome, setIsHome] = useState(true);
  const [isExample, setIsExample] = useState(false);

  const analyze = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setURL(URL.createObjectURL(image));
      
      const body = new FormData();
      body.append('file', image);
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        body
      });
      const data = await response.json();
      setData(data);
      setIsExample(false);
      setIsHome(false);
    }
  };

  const example = async () => {
    const response = await fetch('http://127.0.0.1:8000/example', {
      method: 'GET'
    });
    const data = await response.json()
    setData(data);
    setIsExample(true);
    setIsHome(false);
  };

  const goHome = () => {
    setIsHome(true);
  };

  const isIdentified = data.allowed_catch != -1;

  return (
    <div>
      <Head>
        <title>Fish AI</title>
      </Head>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        {
          isHome ? (
            <Main goHome={goHome} analyze={analyze} example={example} />
          ) : data && isIdentified ? (
            <Result data={data} isExample={isExample} goHome={goHome} />
          ) : (
            <NoResult url={url} goHome={goHome} />
          )
        }
      </Grid>
    </div>
  )
}
