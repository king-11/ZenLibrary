import Nav from "components/nav";
import Card from "components/card";
import { GetServerSideProps } from "next";
import { IBook } from "graphql/book";

export default function Home({ books }: { books: IBook[] }) {
  return (
    <main>
      <nav>
        <Nav />
      </nav>
      <section className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center">
        {books.map((book, idx) => (
          <Card key={idx} book={book} />
        ))}
      </section>
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
