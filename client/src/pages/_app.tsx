// import "@/styles/reset.css";
import "@/styles/globals.css";
import { GlobalProvider } from "@/contexts/GlobalContext";

function MyApp({
  Component,
  pageProps,
}: Readonly<{ Component: any; pageProps: any }>) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
