import { Header } from "./Header";

export const Layout = ({ navigation, settings, children }) => {
  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <main>{children}</main>
    </>
  );
};
