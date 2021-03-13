import axios from "axios";
import Card from "components/addBook";
import Footer from "components/footer";
import GitHubNav from "components/githubNav";
import Loader from "components/loader";
import { IBook } from "graphql/book";
import Head from 'next/head';
import { FormEvent, useState } from "react";

export interface IBookLite extends Omit<IBook, "images"> {
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
}

export default function Create() {
  const [formData, setFormData] = useState<{ title: string; author: string }>({
    author: "",
    title: "",
  });
  const [books, setBooks] = useState<IBookLite[]>(null);
  const [loading, setLoading] = useState(false);

  const getBooks = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title && !formData.author) return;

    setLoading(true);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${
        formData.title ? `intitle:${formData.title}&` : ""
      }${
        formData.author ? `inauthor:${formData.author}&` : ""
      }printType=books&maxResults=20`
    );
    if (response.data.totalItems)
      setBooks(
        response.data.items.map((x) => {
          return {
            ...x.volumeInfo,
            rating: x.volumeInfo.averageRating || null,
          };
        })
      );
    // console.log(response.data.items.map((x) => x.volumeInfo.authors));
    setLoading(false);
  };

  return (
    <main className="relative">
      <Head>
        <title>Add Book</title>
      </Head>
      <GitHubNav />
      <div className="flex md:flex-row flex-col container mx-auto md:justify-around items-center px-auto">
        <div className="md:order-2 lg:max-w-lg md:max-w-sm max-w-xs">
          <img
            src="/images/bookart.jpg"
            loading="lazy"
            alt="book art"
            className="object-cover"
          />
        </div>
        <div className="flex-grow md:order-1 py-6 md:pr-4 md:w-full w-80">
          <h1 className="text-3xl font-bold mb-10 md:text-left text-center">
            Add A New Book
          </h1>
          <div className="flex items-center py-2 md:justify-start justify-center">
            <hr className="w-14 border-2 hidden mr-6 md:inline-block  border-white" />
            <p className="text-lg font-semibold ">Provide Details</p>
          </div>
          <form
            className="flex flex-col py-4 max-w-lg items-center md:items-start"
            onSubmit={getBooks}
          >
            <div className="w-full">
              <h2 className="py-1">Title</h2>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                onBlur={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="rounded-md shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="w-full">
              <h2 className="py-1">Author</h2>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
                onBlur={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
                className="rounded-md shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <button className="focus:outline-none mt-10 h-14 w-14 rounded-full text-center shadow-md hover:shadow-lg">
              <img
                src="/images/arrow.png"
                alt="arrow submit"
                aria-hidden
                className="h-6"
              />
            </button>
          </form>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : books === null ? (
        <p className="text-center mt-8 mb-20 text-lg">Search Some Books</p>
      ) : books.length === 0 ? (
        "No Books Found"
      ) : (
        <div className="flex px-4 flex-wrap order-3 sm:justify-center justify-around my-8 sm:my-20">
          {books.map((book, idx) => {
            return (
              <Card book={book} key={book.title + idx} setBooks={setBooks} />
            );
          })}
        </div>
      )}
      <Footer />
    </main>
  );
}
