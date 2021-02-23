import Nav from "components/nav";
import Card from "components/card";
import { GetServerSideProps } from "next";
import { IBook } from "graphql/book";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import style from "styles/masonry.module.scss";

export default function Home({ books }: { books: IBook[] }) {
  const [state, setState] = useState("");
  const filteredBooks = useMemo(() => {
    if (state === "") {
      return books;
    }
    const options = {
      keys: ["authors", "title", "categories"],
    };
    const fuse = new Fuse(books, options);
    return fuse.search(state).map((val) => val.item);
  }, [books, state]);

  return (
    <main>
      <nav>
        <Nav state={state} setState={setState} />
      </nav>
      <main className={style.masonry}>
        {filteredBooks.map((book, idx) => (
          <Card key={idx} book={book} />
        ))}
      </main>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const res = await fetch(`${baseUrl}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{ books {
    title
    categories
    authors
    description
    rating
    images {
      thumbnail
    }
  } }`,
    }),
  }).then((val) => val.json());

  return {
    props: {
      books: res.data.books,
    },
  };
};
