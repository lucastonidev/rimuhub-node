import express from "express";
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import sheetParser from "./controllers/sheetParser.js";
const router = express.Router();

router.get("/categorys/:id", (req, res) => {
    const parser = new PublicGoogleSheetsParser(req.params.id);
    parser.parse().then((sheets) => {
        const categories = [];
        for (const key in sheets) {
            if (!Object.hasOwn(sheets, key)) continue;
            const categoryObject = sheets[key];
            categories.push(categoryObject.category);

        }

        const categoriesList = [...new Set(categories)];

        res.status(200).json({ hasCategorys: true, data: categoriesList });
    }).catch((error) => {
        res.status(500).json({ hasCategorys: false, error: error });
    });
});

router.get("/data/:id", sheetParser);

router.post("/addInformation", async (req, res) => {
    const { title, description, category, imageLink, apiKey, links } = req.body;

    const url = "https://sheetdb.io/api/v1/" + apiKey;
    const data = {
        title: title,
        type_information: "link",
        Img_link: imageLink,
        description_short: description,
        description_long: "null",
        category: category,
        links: links,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        res.status(200).json({ success: true, message: "Item adicionado com sucesso!" });
    } catch (error) {
        console.error('Erro ao adicionar informação:', error);
        res.status(500).json({ success: false, message: "Erro ao adicionar informação." });
    }

});

export { router as api };