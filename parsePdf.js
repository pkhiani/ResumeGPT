const fs = require("fs");
const PDFParser = require("pdf-parse");

export default async function parsePdf(file) {
  // Read the PDF file
  const dataBuffer = fs.readFileSync(file);

  // Parse the PDF content
  return PDFParser(dataBuffer)
    .then(function (data) {
      const text = data.text;
      return text;
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}
