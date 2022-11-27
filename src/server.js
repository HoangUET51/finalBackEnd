import express from "express";
import cookieParser from "cookie-parser";
import { configCors } from "./config/configCORS";
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
//tạo cổng chạy
const PORT = process.env.PORT || 8000;
//config cors
configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection();
app.use(cookieParser());
//setup fileserver static
app.use("/public", express.static(path.join(__dirname, "./public")));
//init web routes
initApiRoutes(app);

app.use((req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(">>>>>>>>JWT Backend", PORT);
});
