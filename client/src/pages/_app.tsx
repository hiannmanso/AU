import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({
  Component,
  pageProps,
}: Readonly<{ Component: any; pageProps: any }>) {
  return <Component {...pageProps} />;
}

export default MyApp;
