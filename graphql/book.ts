import { Document, Model, Schema, model, models } from "mongoose";

export const bookSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
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
  categories: [
    {
      type: String,
      trim: true,
      required: false,
    },
  ],
  rating: {
    type: Number,
    required: false,
  },
  images: {
    type: Object,
    required: false,
    default: {},
    smallThumbnail: { type: String, required: false },
    thumbnail: { type: String, required: false },
  },
  industryIdentifiers: [
    {
      type: { type: String, required: true },
      identifier: { type: String, required: true },
    },
  ],
  suggestedBy: {
    type: String,
    trim: true,
    required: false,
    maxlength: 50,
  },
});

export interface IBook {
  description?: string;
  title: string;
  authors: string[];
  categories?: string[];
  rating?: number;
  images?: { smallThumbnail?: string; thumbnail?: string };
  industryIdentifiers: { type: string; identifier: string }[];
  suggestedBy?: string;
}

export interface IBookDocument extends IBook, Document {}
export interface IBookModel extends Model<IBookDocument> {}

export const BookModel =
  (models["books"] as Model<IBookDocument>) ||
  model<IBookDocument>("books", bookSchema);
