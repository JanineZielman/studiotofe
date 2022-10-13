import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

const Image = ({ slice, index }) => {
  const image = slice.primary.image;

  return (
    <section>
      {prismicH.isFilled.image(image) && (
        <div className="bg-gray-100">
          <PrismicNextImage field={image} layout="responsive" />
        </div>
      )}
    </section>
  );
};

export default Image;
