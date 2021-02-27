import { motion } from "framer-motion";
import { IBook } from "graphql/book";
import { PureComponent } from "react";
import { InView } from "react-intersection-observer";
import style from "styles/card.module.scss";

class CardComponent extends PureComponent<{ book: IBook }, { categories: string[] }> {
  state = {categories:[]}
  static defaultURI = "/images/bookcover.jpg";
  static animate = { opacity: 1, scaleY: 1 };
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {book} = this.props
    if (book.categories.length !== 0) {
      book.categories.forEach((val) => {
        this.setState({categories:[...this.state.categories,...val.split(/[\W]/).filter(Boolean)]})
      });
    }
  }

  render() {
    const { book } = this.props;
    const {categories} = this.state

    return (<InView as="div" triggerOnce>
    {({ref,inView}) => (<motion.div
      ref={ref}
      className={style.container}
      initial={{
        opacity: 0,
        scaleY: Math.random(),
        transitionDuration: "1s",
      }}
      animate={inView ? CardComponent.animate : {}}
    >
      <div className={style.header}>
        <div>
          <h1>{book.title}</h1>
          <div>
            {book.authors.map((val, idx) => (
              <h2 key={idx}>{val}</h2>
            ))}
          </div>
          <h4>
            Rating: <span>{book.rating || null}</span>
          </h4>
        </div>
        <div>
          <img
            src={book.images.thumbnail || CardComponent.defaultURI}
            alt={`Thumbnail for ${book.title}`}
            loading="lazy"
          />
        </div>
      </div>
      <figure className={style.content}>
        {book.description ||
          "Can't seem to find a proper description its your chance to find it"}
      </figure>
      <div className={style.footer}>
        {categories?.map((val, idx) => (
          <span key={idx}>{val}</span>
        ))}
      </div>
    </motion.div>)}
  </InView>)
  }
}

export default CardComponent;
