import Card from "components/card";
import Loader from "components/loader";
import Nav from "components/nav";
import Fuse from "fuse.js";
import { IBook } from "graphql/book";
import { useFetch } from "hooks/useFetch";
import Masonry from "hooks/useMasonry";
import { useEffect, useMemo, useRef, useState } from "react";

const headers = {
    ContentType: "application/json",
    Accept: "application/json",
  },
  method: "POST" | "GET" = "POST";

export default function Home() {
  const [state, setState] = useState("");
  const skip = useRef(0);
  const [control, setControl] = useState({ load: true, nomore: false });
  const [options, setOptions] = useState({
    method: method,
    headers: headers,
    body: JSON.stringify({
      query: `{ books(skip:0) {
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
  });
  const { loading, response, error } = useFetch({
    url: "/api/graphql",
    options: options,
    control,
  });

  const [books, setBooks] = useState<IBook[]>([]);
  useEffect(() => {
    if (response?.data?.books) {
      if (response.data.books.length == 0)
        setControl({ ...control, nomore: true });
      const tempBooks: IBook[] = [...books, ...response?.data?.books];
      const check: Set<string> = new Set();
      setBooks(
        tempBooks
          .filter((obj) => !check.has(obj.title) && check.add(obj.title))
          .sort((a, b) => (a.title <= b.title ? -1 : 1))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data]);

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

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;

      skip.current += 15;
      setControl({ ...control, load: false });
      setOptions({
        method: method,
        headers: headers,
        body: JSON.stringify({
          query: `{ books(skip:${skip.current}) {
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
      });
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll, false)
    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize",handleScroll,false)
    }
  }, []);

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
