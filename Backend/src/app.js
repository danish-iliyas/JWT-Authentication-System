import express from "express";
import { dbConnection } from "./dbConnection/dbConnection.js";
import dotenv from "dotenv";
import registrationRoutes from "./routes/registrationRoutes.js";
import ProductRoute from "./routes/ProductRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

dbConnection();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  console.log("hi");
});

app.use("/api", registrationRoutes);
app.use("/product", ProductRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
