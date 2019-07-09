const fs = require("fs");
const path = require("path");

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, { "Contetn-Type": "text/html" });
      response.end(file);
    }
  });
};

const publicHandler = (request, response, endpoint) => {
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    png: "image/png",
    jpg: "image/jpg"
  };

  const filePath = path.join(__dirname, "..", endpoint);
  console.log("endpoint,", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, { "Contetn-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

const apiHandler = (request, response, endpoint) => {
  console.log("request uni", request.url);
  var queryString = endpoint.split("?")[1];
  console.log(queryString);
};

module.exports = { homeHandler, publicHandler, apiHandler };
