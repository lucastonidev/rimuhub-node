import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
   res.render("index");
});

router.get("/add", (req, res) => {
   res.render("add");
});

router.get("/vizualize", (req, res) => {
   res.render("vizualize");
});

router.get("/config", (req, res) => {
   res.render("config");
});

router.get("/help", (req, res) => {
   res.render("help");
});

export { router as website };