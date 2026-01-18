import express from "express";
import { api } from "../routes/api/api.js";
import { website } from "../routes/website/website.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

/* Routes Api */
app.use("/api/", api);

/* Routes Website */
app.use("/", website);

export default app;