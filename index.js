import express from "express"
import router from "./route/mainRoute.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
