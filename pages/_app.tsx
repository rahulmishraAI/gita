import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head'; 
import '../styles/globals.css';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* favicon icon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Bhagavad Gita GPT</title>
      </Head>
      <Component {...pageProps} />
      <Analytics /> {/* Vercel Analytics */}
      <Footer /> {/* Add Footer here */}
    </>
  );
}

export default MyApp;
