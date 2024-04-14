import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";

const Works = ({ page, navigation, settings, projects }) => {
  console.log(page)
  
  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
      
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Works;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("works", {
    fetchLinks: `project.title, project.intro, project.image `
  });
  const projects = await client.getAllByType("project");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
      projects,
    },
  };
}
