import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from "@prismicio/next";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";

const Project = ({ page, navigation, settings }) => {

  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>
          {page.data.title} |{" "}
          {prismicH.asText(settings.data.siteTitle)}
        </title>
      </Head>
			<div className="container">
        <div className="hero">
          <div className="scroll"></div>
          <img src={page.data.cover_image.url}/>
          <div className="fixed-info">
            <h1>
              <span>{page.data.category}</span><br/>
              {page.data.title}
            </h1>
          </div>
        </div>
        <div className="content">
          <PrismicRichText field={page.data.description}/>
        </div>
				
      	<SliceZone slices={page.data.slices} components={components} />
			</div>
    </Layout>
  );
};

export default Project;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("project", params.uid, { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("project", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
