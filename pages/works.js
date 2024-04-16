import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";
import { PrismicNextImage } from "@prismicio/next";


const Works = ({ page, navigation, settings, projects }) => {  
  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
      </Head>
        <div className="projects">
          {projects.map((item, i) => {
            return(
              <a href={`/projects/${item.uid}`} className="project-item" key={`project${i}`}>
                <div>
                  <p className="category">{item.data.category}</p>
                  <p>{item.data.title}</p>
                </div>
                <span>{item.data.year}</span>
                <img src={item.data.cover_image.url}/>
              </a>
            )
          })}
        </div>

      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Works;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("works");
  const projects = await client.getAllByType("project",{
    orderings: [
      { field: "my.project.year", direction: "desc" },
      { field: "my.project.title", direction: "asc" }
    ],
  });
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
