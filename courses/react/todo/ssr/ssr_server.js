const express = require("express");
const fs = require("fs");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const App = require("../dist/ssr/main.js");

const app = express();

const htmlPageContent = fs.readFileSync("./dist/hydrate/index.html", "utf8");

app.use(express.static("dist/hydrate", { index: false }));

app.get("*", (req, res) => {
  const html = ReactDOMServer.renderToString(App.SsrApp(req.url));

  const finalHtml = htmlPageContent.replace(
    "<body>",
    `<body><div id="root">${html}</div>`
  );
  res.send(finalHtml);
});

app.listen(3002, () => {
  console.log("SRR Server is listening on port 3002");
});
