import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";
import React, { useRef } from "react";
import Slider from "react-slick";

const Index = ({ page, navigation, settings, projects }) => {
  const sliderRef = useRef();

  var settingsSlider = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onWheelSlider = (e, ref) => {
    console.log(e)
    if (e.deltaY > 10) {
      sliderRef.current.slickNext();

    }
    if (e.deltaY < -10) {
      sliderRef.current.slickPrev();
    }

  };
  
  return (
    <div className="home-page">
      <Layout navigation={navigation} settings={settings}>
        <Head>
          <title>{prismicH.asText(page.data.title)}</title>
        </Head>
        <div className="highlights" onWheel={onWheelSlider}>
          <Slider {...settingsSlider} ref={sliderRef}>
            {page.data.slices.map((slice, i) => {
              return(
                <video muted autoPlay loop playsInline key={`video${i}`}>
                  <source src={slice.primary.video.url} type="video/mp4"/>
                </video>
              )
            })}
        </Slider>
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
