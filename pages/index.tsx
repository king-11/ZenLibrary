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
      <section className="flex flex-wrap justify-center">
        {books.map((book, idx) => (
          <Card key={idx} book={book} />
        ))}
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/graphql", {
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
