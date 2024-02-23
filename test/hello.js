const http = require("http");
const fs = require("fs");
const url = require("url");
const queryString = require("querystring");
const autrePageHtml = require("./html/autrePage");

const superSiteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Super site</h1>
</body>
</html>
`;

// console.log(http);

const server = http.createServer((request, response) => {
  const urlData = url.parse(request.url);

  if (request.method === "GET") {
    if (urlData.pathname === "/super-site") {
      response.end(superSiteHtml);
    } else if (urlData.pathname === "/autre-page") {
      response.end(autrePageHtml);
    } else if (urlData.pathname === "/add-data") {
      const dataInUrl = queryString.parse(urlData.query);
      console.log(dataInUrl);
      fs.appendFile(
        "./data.txt",
        `\n${Date.now()} - ${dataInUrl.data}`,
        (err) => {
          if (err) {
            console.log("err", err);
          } else {
            console.log("Tout va bien");
          }
        }
      );

      response.end("add data");
    }
  }
});

server.listen("3000");
