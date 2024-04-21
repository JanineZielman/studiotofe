import Head from "next/head";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";

const Index = ({ page, navigation, settings}) => {
  const sliderRef = useRef();
  const [loading, setLoading] = useState(true);

  var settingsSlider = {
    dots: true,
    arrows: false,
    infinite: true,
    lazyLoad: 'ondemand',
    speed: 1000,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          speed: 500,
        }
      },
    ]
  };

  const onWheelSlider = (e, ref) => {
    if (e.deltaY > 10) {
      sliderRef.current.slickNext();

    }
    if (e.deltaY < -10) {
      sliderRef.current.slickPrev();
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(function() {
      setLoading(false);
    }, 2000);
  }, [])
  
  
  return (
    <div className="home-page">
      {loading ?
          <div className="loading-screen">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="loading-txt">Loading</div>
          </div>
        :
        <Layout navigation={navigation} settings={settings}>
          <Head>
            <title>{prismicH.asText(page.data.title)} |{" "}
            {prismicH.asText(settings.data.siteTitle)}
            </title>
          </Head>
          <div className="highlights" onWheel={onWheelSlider}>
            <Slider {...settingsSlider} ref={sliderRef}>
              {page.data.slices.map((slice, i) => {
                return(
                  <div key={`video${i}`}>
                    <video muted autoPlay loop playsInline>
                      <source src={slice.primary.video?.url} type="video/mp4"/>
                    </video>
                    <div className="intro">
                      <PrismicRichText field={slice.primary.intro}/>
                    </div>
                  </div>
                )
              })}
          </Slider>
          </div>
        </Layout>
        }
    </div>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}
