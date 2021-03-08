import { motion } from "framer-motion";
import Icon from "mdi-react/CheckboxMarkedCircleOutlineIcon";
import { IBookLite } from "pages/create";
import { PureComponent, ReactEventHandler } from "react";
import { InView } from "react-intersection-observer";
import style from "styles/addCard.module.scss";

const getRandomNumber = (start: number, end: number) => {
  const positive = Math.floor(Math.random() * 100) & 1 ? true : false;
  const value = Math.floor(Math.random() * (end - start + 1) + start);
  return positive ? value : value * -1;
};

class CardComponent extends PureComponent<
  { book: IBookLite },
  { categories: string[] }
> {
  state = { categories: [] };
  static defaultURI = "/images/bookcover.jpg";
  static animate = { opacity: 1, y: 0, x: 0 };
  constructor(props) {
    super(props);
  }
  readonly submitBook: ReactEventHandler = (event) => {
    event.preventDefault();
    const { book } = this.props;
    console.info(book);
  };

  render() {
    const { book } = this.props;

    return (
      <InView as="div" triggerOnce>
        {({ ref, inView }) => (
          <motion.div
            ref={ref}
            className={style.container}
            initial={{
              opacity: 0,
              transitionDuration: "1s",
              y: getRandomNumber(0, 100),
              x: getRandomNumber(0, 100),
            }}
            animate={inView ? CardComponent.animate : {}}
          >
            <div className={style.header}>
              <div>
                <h1>{book.title}</h1>
                <div>
                  {book.authors?.map((val, idx) => (
                    <h2 key={idx}>{val}</h2>
                  ))}
                </div>
                <h4>
                  Rating: <span>{book.rating || ""}</span>
                </h4>
              </div>
              <div>
                <img
                  src={book.imageLinks?.thumbnail || CardComponent.defaultURI}
                  alt={`Thumbnail for ${book.title}`}
                  loading="lazy"
                />
                <button onClick={this.submitBook}>
                  <Icon size={30} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </InView>
    );
  }
}

export default CardComponent;
