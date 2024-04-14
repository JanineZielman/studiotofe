import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";
import React, { useRef } from "react";

const Index = ({ page, navigation, settings, projects }) => {
  const ref = useRef(null);

  const onWheel = (e) => {
    const elelemnt = ref.current;
    if (elelemnt) {
      if (e.deltaY == 0) return;
      elelemnt.scrollTo({
        left: elelemnt.scrollLeft + e.deltaY,
      });
    }
  };

  console.log(page)
  
  return (
    <div className="home-page">
      <Layout navigation={navigation} settings={settings}>
        <Head>
          <title>{prismicH.asText(page.data.title)}</title>
        </Head>
        <div className="highlights" ref={ref} onWheel={onWheel}>
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </Layout>
    </div>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", { lang: locale });
  const projects = await client.getAllByType("project", { lang: "*" });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      navigation,
      settings,
      projects,
    },
  };
}
