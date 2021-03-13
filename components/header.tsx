export default function Header() {
  return (
    <header className="flex w-full items-center flex-col py-4 px-4">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
        Zen Library
      </h1>
      <code className="text-sm sm:text-base max-w-lg text-center py-2">
        &ldquo;There is more treasure in books than in all the pirate’s loot on
        Treasure Island.&rdquo;
        <br />
        <em>Walt Disney</em>
      </code>
      <p className="text-sm sm:text-base mb-8 leading-relaxed max-w-2xl text-center">
        A curated collection of books based on recommendation system laid out in
        an form that&apos;s easy to search and add your favourites to the list.
        Help out in setting up an amazing set of books that we can spend our
        leisure time with .
      </p>
      <style jsx>
        {`
          h1 {
            background: #000046; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #1cb5e0,
              #000046
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(
              to right,
              #1cb5e0,
              #000046
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;

            -webkit-animation: shine 2s linear infinite;
            -moz-animation: shine 2s linear infinite;
            animation: shine 2s linear infinite;
          }

          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
        `}
      </style>
    </header>
  );
}
