import mongoose from "mongoose";

const url = "mongodb://localhost:27017/library" || process.env.MONGO_URL;

export const connect = async () => {
  const state = mongoose.connection.readyState;
  if ([1, 2].includes(state)) return;
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    autoIndex:true
  });
};
