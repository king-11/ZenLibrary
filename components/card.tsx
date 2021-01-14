import { IBook } from "graphql/book";
import Image from "next/image";

export default function Card({ book }: { book: IBook }) {
  let categories: string[] = [];
  if (book.categories.length !== 0) {
    book.categories.forEach((val) => {
      categories = [...categories, ...val.split(/[\s&]/).filter(Boolean)];
    });
  }
  // TODO: Add dropdown to show Industry Identifiers

  const defaultURI = "/images/bookcover.jpg";

  return (
    <div className="flex flex-col max-w-lg h-72 mx-2 my-4 shadow-md justify-evenly">
      <div className="px-3 py-1 flex flex-row justify-between">
        <div className="w-3/4">
          <h1 className="text-xl sm:text-2xl font-semibold  text-gray-800 overflow-hidden truncate">
            {book.title}
          </h1>
          <span className="flex justify-between overflow-hidden truncate">
            {book.authors.map((val, idx) => (
              <h2
                className="text-base font-sans font-light text-gray-600"
                key={idx}
              >
                {val}
              </h2>
            ))}
          </span>
          <h4 className="text-gray-700 font-mono">
            Rating: <span className="font-bold">{book.rating || null}</span>
          </h4>
        </div>
        <div className="w-1/4 flex justify-center">
          <Image
            src={book.images.thumbnail || defaultURI}
            alt={`Thumbnail for ${book.title}`}
            width={80}
            height={80}
          />
        </div>
      </div>
      <p className="px-2 py-2 break-all leading-snug max-h-36 overflow-y-hidden">
        {book.description ||
          "Can't seem to find a proper description its your turn to find it"}
      </p>
      <div className="flex justify-around my-2 mx-2">
        {categories?.map((val, idx) => (
          <span
            key={idx}
            className="bg-blue-500 text-white rounded-2xl px-3 ml-auto"
          >
            {val}
          </span>
        ))}
      </div>
    </div>
  );
}
