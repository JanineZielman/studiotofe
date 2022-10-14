import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

const Image = ({ slice, index }) => {
  const image = slice.primary.image;

  return (
    <section className="image-section">
      {prismicH.isFilled.image(image) && (
        <PrismicNextImage field={image} layout="responsive" />
      )}
    </section>
  );
};

export default Image;
