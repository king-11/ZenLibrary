import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-micro";

import { isValidObjectId } from "mongoose";
import { IBookDocument, BookModel, IBook } from "graphql/book";
import { connect } from "graphql/db";

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
    authors: [String!]!
    genre: String!
    description: String!
    img: String
    suggestedBy: String
  }
  input BookInput {
    name: String
    authors: [String!]!
    genre: String!
    description: String!
    img: String
    suggestedBy: String
  }
  type Query {
    sayHello: String!
    books: [Book!]
    book(id: ID!): Book
  }
  type Mutation {
    createBook(singlebook: BookInput!): Book!
  }
`;

const resolvers = {
  Query: {
    sayHello: () => "Hello World!",
    books: async () => {
      const books: [IBookDocument] = await BookModel.find({});
      return [...books];
    },
    book: async (parent, { id }) => {
      if (!isValidObjectId(id)) return null;
      const book: IBookDocument = await BookModel.findById(id).exec();
      return book;
    },
  },
  Mutation: {
    createBook: async (parent, { singlebook }: { singlebook: IBook }) => {
      const newBook: IBookDocument = await BookModel.create(singlebook);
      return newBook.toJSON();
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    await connect();
    return {};
  },
});

export default apolloServer.createHandler({ path: "/api/graphql" });
