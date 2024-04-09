// import "@/styles/reset.css";
import "@/styles/globals.css";
import { GlobalProvider } from "@/contexts/GlobalContext";

import Header from "@/components/Header";
import Toast from "./Toast";
function MyApp({
  Component,
  pageProps,
}: Readonly<{ Component: any; pageProps: any }>) {
  return (
    <GlobalProvider>
      <Header />

      <Component {...pageProps} />
      <Toast />
    </GlobalProvider>
  );
}

export default MyApp;
