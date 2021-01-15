import { IBook } from "graphql/book";
import Image from "next/image";
import style from "styles/card.module.scss";

export default function Card({ book }: { book: IBook }) {
  let categories: string[] = [];
  if (book.categories.length !== 0) {
    book.categories.forEach((val) => {
      categories = [...categories, ...val.split(/[\W]/).filter(Boolean)];
    });
  }
  // TODO: Add dropdown to show Industry Identifiers

  const defaultURI = "/images/bookcover.jpg";

  return (
    <div className={style.container}>
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
          <Image
            src={book.images.thumbnail || defaultURI}
            alt={`Thumbnail for ${book.title}`}
            width={80}
            height={80}
          />
        </div>
      </div>
      <p className={style.content}>
        {book.description ||
          "Can't seem to find a proper description its your turn to find it"}
      </p>
      <div className={style.footer}>
        {categories?.map((val, idx) => (
          <span key={idx}>{val}</span>
        ))}
      </div>
    </div>
  );
}
