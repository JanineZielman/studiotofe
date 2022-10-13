import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const Hero = ({ slice }) => {
  const backgroundImage = slice.primary.backgroundImage;

  return (
    <section className="relative bg-slate-900 text-white">
      {prismicH.isFilled.image(backgroundImage) && (
        <PrismicNextImage
          field={backgroundImage}
          alt=""
          layout="fill"
          className="pointer-events-none select-none object-cover opacity-40"
        />
      )}
      <div className="grid justify-items-center gap-8">
        <div className="max-w-2xl text-center">
          <PrismicRichText
            field={slice.primary.text}
            components={components}
          />
        </div>
        {prismicH.isFilled.link(slice.primary.buttonLink) && (
          <PrismicLink
            field={slice.primary.buttonLink}
            className="rounded bg-white px-5 py-3 font-medium text-slate-800"
          >
            {slice.primary.buttonText || "Learn More"}
          </PrismicLink>
        )}
      </div>
    </section>
  );
};

export default Hero;
