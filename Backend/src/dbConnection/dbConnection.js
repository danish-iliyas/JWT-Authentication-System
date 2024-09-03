import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "Registration",
    })
    .then(() => {
      console.log("conected");
    })
    .catch((err) => {
      console.log("error is this", err);
    });
};
