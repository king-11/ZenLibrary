import axios from "axios";
import { motion } from "framer-motion";
import Icon from "mdi-react/CheckboxMarkedCircleOutlineIcon";
import Web from 'mdi-react/WebIcon';
import { IBookLite } from "pages/create";
import {
  Dispatch,
  PureComponent,
  ReactEventHandler,
  SetStateAction
} from "react";
import { InView } from "react-intersection-observer";
import style from "styles/addCard.module.scss";

const getRandomNumber = (start: number, end: number) => {
  const positive = Math.floor(Math.random() * 100) & 1 ? true : false;
  const value = Math.floor(Math.random() * (end - start + 1) + start);
  return positive ? value : value * -1;
};

class CardComponent extends PureComponent<
  { book: IBookLite; setBooks: Dispatch<SetStateAction<IBookLite[]>> },
  { categories: string[] }
> {
  state = { categories: [] };
  static defaultURI = "/images/bookcover.jpg";
  static animate = { opacity: 1, y: 0, x: 0 };
  constructor(props) {
    super(props);
  }
  readonly submitBook: ReactEventHandler = async (event) => {
    event.preventDefault();
    const { book, setBooks } = this.props;
    const input = {
      images: book.imageLinks,
      authors: book.authors,
      categories: book.categories,
      title: book.title,
      description: book.description,
      industryIdentifiers: book.industryIdentifiers,
      rating: book.rating,
      link: book.link
    };
    const query = `mutation CreateBook($input:BookInput!) {
                    createBook(singlebook:$input) {
                      title
                      _id
                    }
                  }`;
    try {
      const { data } = await axios.post("/api/graphql", {
        query,
        variables: {
          input,
        },
      });
      if (data.errors !== undefined) {
        console.error(data.errors[0].message);
        alert("Book Already Exists");
      } else {
        setBooks(null);
        alert("Book was Added");
      }
    } catch (e) {
      console.log(e);
    }
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
                <address className="flex px-2 justify-between mx-auto mt-10">
                  {book.link && (
                  <a target="_blank" rel="noreferrer" href={book.link} className="block">
                    <Web size={30} />
                  </a>
                  )}
                  <button onClick={this.submitBook}>
                    <Icon size={30} />
                  </button>
                </address>
              </div>
            </div>
          </motion.div>
        )}
      </InView>
    );
  }
}

export default CardComponent;
