import Carousel from "react-alice-carousel";
import styles from "styles/card.module.css";
import "react-alice-carousel/lib/alice-carousel.css";

export default function MultiCarousel() {
  const responsive = {
    0: {
      items: 1,
    },
    1000: {
      items: 2,
    },
    1620: {
      items: 3,
    },
  };

  const handleDragStart = (e) => e.preventDefault();

  const urlImg = "/images/bookcover.jpg";
  const items = [1, 2, 3].map((elem, index) => (
    <div
      key={index}
      onDragStart={handleDragStart}
      className="flex justify-center object-contain shadow-lg mx-auto rounded-lg"
      style={{ maxWidth: 500 }}
    >
      <figure className="my-5">
        <h1 className="font-bold capitalize text-lg text-gray-700 tracking-tighter">
          Journey to the Center of Earth
        </h1>
        <h2 className="font-medium text-base text-gray-500 tracking-wide">
          Jules Verne {index}
        </h2>
        <div className={styles.container}>
          <div
            className={styles.shaped}
            style={{
              background: `url(${urlImg})`,
            }}
          ></div>
          <div className={styles.content}>
            <p>
              A Journey to the Centre of the Earth and A Journey into the
              Interior of the Earth, is a classic science fiction novel by Jules
              Verne. It was first published in French in 1864, then reissued in
              1867 in a revised and expanded edition.
            </p>
          </div>
        </div>
      </figure>
    </div>
  ));

  return (
    <section className="my-4 px-1 md:px-4">
      <h1 className="text-3xl font-bold text-center text-yellow-600">
        Fiction
      </h1>
      <div className="my-4">
        <Carousel
          infinite
          activeIndex={0}
          items={items}
          animationType={"fadeout"}
          mouseTracking={true}
          responsive={responsive}
          disableDotsControls={true}
        ></Carousel>
      </div>
    </section>
  );
}
