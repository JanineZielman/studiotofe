import * as prismicH from "@prismicio/helpers";

const Image = ({ slice, index }) => {
  const image = slice.primary.image;

  return (
    <section className="image-section">
      {prismicH.isFilled.image(image) && (
        <img src={image.url} />
      )}
    </section>
  );
};

export default Image;
