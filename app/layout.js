"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackTop from "../component/backTop";
import LoadingScreen from "../component/loader";

const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

export default function RootLayout ( { children } ) {
  const [ loading, setLoading ] = React.useState( false );

  React.useEffect( () => {
    const timer = setTimeout( () => setLoading( true ), 6000 );
    return () => clearTimeout( timer );
  }, [] );

  return (
    <html
      lang="en"
      className={ `${ geistSans.variable } ${ geistMono.variable }` }
      suppressHydrationWarning
    >
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="IT Services and Solutions" />
        <title>EHAN Transport Agency</title>
      </head>
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
