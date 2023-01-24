import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/client".clientRoutes);
app.use("/general".generalRoutes);
app.use("/management".managementRoutes);
app.use("/sales".salesRoutes);

const PORT = process.env.PORT;
const mongoURL = "mongodb://127.0.0.1:27017/blog";
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log("App connecte to MongoDB and running at port: " + PORT)
    );
  })
  .catch((error) => console.log(error));
