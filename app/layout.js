"use client";
import React from "react";
import Head from "next/head";
import { Newsreader } from "next/font/google";
import "./globals.css";
import BackTop from "../component/backTop";
import LoadingScreen from "../component/loader";

const newsreader = Newsreader( {
  subsets: [ "latin" ],
  weight: [ "400", "500", "600", "700" ],
} );

export default function RootLayout ( { children } ) {
  const [ loading, setLoading ] = React.useState( false );

  React.useEffect( () => {
    const timer = setTimeout( () => setLoading( true ), 6000 );
    return () => clearTimeout( timer );
  }, [] );

  return (
    <html lang="en" className={ newsreader.className }>
      <title>EHAN Transport Agency</title>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="IT Services and Solutions" />
      </Head>
      <body>
        { loading ? (
          <>
            { children }
            <BackTop />
          </>
        ) : (
          <LoadingScreen />
        ) }
      </body>
    </html>
  );
}
