import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-micro";
import { BookModel, IBook, IBookDocument } from "graphql/book";
import { connect } from "graphql/db";
import { isValidObjectId } from "mongoose";

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
    books(first: Int = 15, skip: Int = 0): [Book!]
    book(id: ID!): Book
  }
  type Mutation {
    createBook(singlebook: BookInput!): Book!
  }
`;

const resolvers = {
  Query: {
    sayHello: () => "Hello World!",
    books: async (parent, { first = 15, skip = 0 }) => {
      const books: IBookDocument[] = await BookModel.find({})
        .sort({ title: 1 })
        .limit(first)
        .skip(skip);

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
  formatError: (err) => {
    if (err.message.includes("duplicate key")) {
      return new Error("Book already exists");
    }
    return err;
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default handler;
