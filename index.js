import express from "express"
import router from "./route/mainRoute.js";
import bodyParser from "body-parser";
import connectToDB from "./Database/connectToDB.js";

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)

connectToDB()
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
