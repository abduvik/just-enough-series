const express = require("express");
const fs = require("fs");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
require("../dist/ssr/commonjs/src_containers_AboutContainer_About_md.js");
const App = require("../dist/ssr/commonjs/main.js");

const app = express();

const htmlPageContent = fs.readFileSync("./dist/ssr/index.html", "utf8");

app.use(express.static("dist/ssr/", { index: false }));

app.get("*", (req, res) => {
  const html = ReactDOMServer.renderToString(
    React.createElement(App.SsrApp(req.url))
  );

  const finalHtml = htmlPageContent.replace(
    "<body>",
    `<body><div id="root">${html}</div>`
  );
  res.send(finalHtml);
});

app.listen(3004, () => {
  console.log("SRR Server is listening on port 3004");
});
