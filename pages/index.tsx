import Card from "components/card";
import Loader from "components/loader";
import Nav from "components/nav";
import Fuse from "fuse.js";
import { useFetch } from "hooks/useFetch";
import Masonry from "hooks/useMasonry";
import { useMemo, useState } from "react";


export default function Home() {
  const [state, setState] = useState("");

  const { loading, response, error } = useFetch({
    url: "/api/graphql",
    options: {
      method: "POST",
      headers: {
        ContentType: "application/json",
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
          }
        }`,
      }),
    },
  });

  const filteredBooks = useMemo(() => {
    if (state === "") {
      return response?.data?.books ?? [];
    }
    const options = {
      keys: ["authors", "title", "categories"],
    };
    const fuse = new Fuse(response?.data?.books ?? [], options);
    return fuse.search(state).map((val) => val.item);
  }, [response?.data?.books, state]);

  const breakpoints = [
    {
      width: 768,
      columns: 1,
    },
    {
      width: 1024,
      columns: 2,
    },
    { width: 1536, columns: 3 },
    { width: 3000, columns: 4 },
  ];

  return (
    <main>
      <nav>
        <Nav state={state} setState={setState} />
      </nav>
      {loading ? (
        <Loader />
      ) : error ? (
        <span>{error}</span>
      ) : (
        <Masonry breakpoints={breakpoints}>
          {filteredBooks.map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </Masonry>
      )}
    </main>
  );
}
