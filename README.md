<h1 align="center" style="font-weight:700"> Library </h1>
<br>
<img src="./header.webp" text-align="center">

<p align="center" style="font-weight:500"> A place to share and read about books. The Website uses user friendly UI by making it really easy to find book of your interest and read about it as well as submit legit new books that people can spend their time with. </p>

<p align="center">I developed this project beacuse I am myself an avid book reader but when i want more books to read either I have to search it on internet or ask my friends around. This project simplifies it , people share books they have read while we provide you with a little bit of insight into that book and then you can go on and read more about it.</p>

<h2 align="center">Tech Stack Used</h2>
<ul>
    <li>Next JS
    <li>GraphQL
    <li>Mongoose
    <li>Google Books API
    <li>Taiwind CSS
</ul>

<h2 align="center"> Specification </h2>

<ul>
    <li>The UI consists of carousel for each genre and Grid structure that changes as per screen size.
    <li>The submitted books are checked aganist Google Books API for authenticity.
    <li>Books are stored in MongoDB NoSQL Database.
</ul>

<h2 align="center">Development Setup</h2>

- First Install Dependencies using yarn

```bash
yarn
```

- Get a mongodb database at [Mongo Atlas](https://www.mongodb.com/cloud/atlas) or setup a local Database using Docker or Mongo

- Set `.env.local` file with env `MONGO_URL` specifying connection link

- Run Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
