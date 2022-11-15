import express from "express";
import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import cookieParser from "cookie-parser";
import { configCors } from "./config/configCORS";
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
//tạo cổng chạy
const PORT = process.env.PORT || 8000;
//config cors
configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection();

//config view engine
configViewEngine(app);
app.use(cookieParser());
//init web routes
// initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(">>>>>>>>JWT Backend", PORT);
});
