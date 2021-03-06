import Card from "components/card";
import Footer from "components/footer";
import Header from "components/header";
import Loader from "components/loader";
import Nav from "components/searchNav";
import Fuse from "fuse.js";
import { IBook } from "graphql/book";
import { useFetch } from "hooks/useFetch";
import Masonry from "hooks/useMasonry";
import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
            link
          }
        }`,
    }),
  });
  const { response, loading } = useFetch({
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

  const fetchData = () => {
    if (loading)
      return

    skip.current += 15;
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
          link
        }
      }`,
      }),
    });
  };

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
      <Head>
        <title>Home</title>
        <meta name="title" content="ZenLibrary"/>
        <meta name="description" content="A place to share and find new books."/>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://zenlibrary.cf/"/>
        <meta property="og:title" content="ZenLibrary"/>
        <meta property="og:description" content="A place to share and find new books."/>
        <meta property="og:image" content="https://raw.githubusercontent.com/king-11/ZenLibrary/main/public/images/bookcover.jpg"/>

        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://zenlibrary.cf/"/>
        <meta property="twitter:title" content="ZenLibrary"/>
        <meta property="twitter:description" content="A place to share and find new books."/>
        <meta property="twitter:image" content="https://raw.githubusercontent.com/king-11/ZenLibrary/main/public/images/bookcover.jpg"/>
      </Head>
      <nav>
        <Nav state={state} setState={setState} />
      </nav>
      <Header />
      <InfiniteScroll
        dataLength={filteredBooks.length}
        next={fetchData}
        hasMore={!control.nomore}
        loader={<Loader />}
        className="mb-10"
      >
        <Masonry breakpoints={breakpoints}>
          {filteredBooks.map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </Masonry>
      </InfiniteScroll>
      <Footer />
    </main>
  );
}
