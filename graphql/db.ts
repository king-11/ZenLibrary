import mongoose from "mongoose";

const url =
  process.env.MONGO_URL ||
  "mongodb://localhost:27017/?readPreference=primary&ssl=false";

export const connect = async () => {
  const state = mongoose.connection.readyState;
  if ([1, 2].includes(state)) return;
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
};
