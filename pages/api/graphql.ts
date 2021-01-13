import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-micro";

import { isValidObjectId } from "mongoose";
import { IBookDocument, BookModel, IBook } from "graphql/book";
import { connect } from "graphql/db";

const typeDefs = gql`
  type Images {
    smallThumbnail: String
    thumbnail: String
  }
  type IndustryIdentifiers {
    type: String
    identifier: String
  }
  type Book {
    _id: ID!
    description: String
    title: String!
    authors: [String!]!
    categories: [String!]
    rating: Float
    images: Images
    industryIdentifiers: [IndustryIdentifiers!]!
    suggestedBy: String
  }
  input ImagesInput {
    smallThumbnail: String
    thumbnail: String
  }
  input IndustryIdentifiersInput {
    type: String
    identifier: String
  }
  input BookInput {
    description: String
    title: String!
    authors: [String!]!
    categories: [String!]
    rating: Float
    images: ImagesInput
    industryIdentifiers: [IndustryIdentifiersInput!]!
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
