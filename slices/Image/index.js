import * as prismicH from "@prismicio/helpers";

const Image = ({ slice}) => {
  const image = slice.primary.image;
  
  return (
    <section className={`image-section ${slice.items.length > 0 && 'multi'}`}>
      {prismicH.isFilled.image(image) && (
        <div className="image"><img src={image.url} /></div>
      )}
      {slice.items.map((item, i) => {
        return(
          <div className="image" key={`project-image${i}`}><img src={item.image.url} /></div>
        )
      })}
    </section>
  );
};

export default Image;
