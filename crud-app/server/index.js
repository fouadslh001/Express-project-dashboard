import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser"
import dotenv from 'dotenv';
import route from './3-routes/userRoutes.js';
import cors from "cors"


dotenv.config(); 
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGOURL;



mongoose
   .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true }) 
   .then(() => {
      console.log("Database connected successfully");
      app.listen(PORT, () => {
         console.log(`Server is listening on port: ${PORT}`);
      });
   })
   .catch((error) => {
      console.error("Database connection error:", error);
   });
   
app.use("/api", route)