class SheetParser {
    constructor(res, req) {
        this.FormattedData = {
            categoryList: [],
            sheetData: [] 
        };

        this.parseSheet(req.params.id).then(() => {
            res.status(200).json(this.FormattedData);
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
    }

    FormattedCategories(data){
        const categories = [];
        for (const key in data) {
            if (!Object.hasOwn(data, key)) continue;
            const categoryObject = data[key];
            categories.push(categoryObject.category);

        }

        this.FormattedData.categoryList = [...new Set(categories)];
        return;
    }

    FormattedSheetData(data){
        const sheetData = [];

        for (const key in data) {
            if (!Object.hasOwn(data, key)) continue;
            const sheetObject = data[key];
            sheetData.push({
                title: sheetObject.title,
                description: sheetObject.description_short,
                category: sheetObject.category,
                link: sheetObject.links,
                img_link: sheetObject.Img_link 
            });
        }

        this.FormattedData.sheetData = sheetData;
        return;
    }

    async parseSheet(sheetId) {
        const PublicGoogleSheetsParser = await import('public-google-sheets-parser');
        const parser = new PublicGoogleSheetsParser.default(sheetId);
        const sheets = await parser.parse();
        this.FormattedCategories(sheets);
        this.FormattedSheetData(sheets);
        return this.FormattedData;
    }


}

export default async function sheetParser(req, res) {
    new SheetParser(res, req);
}