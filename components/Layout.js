import { Header } from "./Header";
import Head from "next/head";

export const Layout = ({ navigation, settings, children }) => {
  return (
    <>
      <Head>
        <meta name="description" content={settings.data.site_description} />
        <meta property="og:description" content={settings.data.site_description} />
        <meta property="og:image" content={settings.data.image.url} />
      </Head>
      <Header navigation={navigation} settings={settings} />
      <main>{children}</main>
    </>
  );
};
