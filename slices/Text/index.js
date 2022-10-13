import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

const Text = ({ slice }) => {
  return (
    <section>
      <div
        className={clsx(
          slice.variation === "twoColumns" && "md:columns-2 md:gap-6"
        )}
      >
        <PrismicRichText field={slice.primary.text} />
      </div>
    </section>
  );
};

export default Text;
