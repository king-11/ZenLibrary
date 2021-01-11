import { Document, Model, Schema, model, models } from "mongoose";

const bookGenres = [
  "Fiction",
  "Manga",
  "Biography",
  "Non Fiction",
  "Self Help",
  "Mystery",
  "Fantasy",
  "Poetry",
  "Spirituality",
];

export const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  authors: [
    {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  ],
  description: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: false,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
    required: true,
    enum: bookGenres,
  },
  suggestedBy: {
    type: String,
    trim: true,
    required: false,
    maxlength: 50,
  },
});

export interface IBook {
  name: string;
  description: string;
  img: string;
  suggestedBy?: string;
  genre:
    | "Fiction"
    | "Manga"
    | "Biography"
    | "Non Fiction"
    | "Self Help"
    | "Mystery"
    | "Fantasy"
    | "Poetry"
    | "Spirituality";
}

export interface IBookDocument extends IBook, Document {}
export interface IBookModel extends Model<IBookDocument> {}

export const BookModel =
  (models["books"] as Model<IBookDocument>) ||
  model<IBookDocument>("books", bookSchema);
