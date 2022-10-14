import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const TextWithImage = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <section className="image-text">
      <div className="image">
        {prismicH.isFilled.image(image) && (
          <PrismicNextImage field={image} layout="responsive" />
        )}
      </div>
      <div className="text">
        <PrismicRichText field={slice.primary.text} />
      </div>
    </section>
  );
};

export default TextWithImage;
