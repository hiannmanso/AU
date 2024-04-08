// import "@/styles/reset.css";
import "@/styles/globals.css";
import { GlobalProvider } from "@/contexts/GlobalContext";
import Header from "@/components/Header";
function MyApp({
  Component,
  pageProps,
}: Readonly<{ Component: any; pageProps: any }>) {
  return (
    <GlobalProvider>
      <Header />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
