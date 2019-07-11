const fs = require("fs");
const path = require("path");
const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
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
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": extensionType[extension]
      });
      response.end(file);
    }
  });
};

const apiHandler = (request, response, endpoint) => {
  const queryString = endpoint.split("=")[1];

  const filePath = path.join(__dirname, "/data/uniName.json");
  fs.readFile(filePath, "utf-8", (error, read) => {
    if (read) {
      const result = JSON.parse(read);
      const resultfinal = findMatch(result, queryString);
      response.writeHead(200, {
        "Content-Type": "applicaton/json"
      });
      response.end(JSON.stringify(resultfinal));
    } else if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Server Error</h1>");
    }
  });
};
const findMatch = (arr, input) => {
  if (input) {
    const matched = arr.map(ele => {
      if (
        ele["University of Andorra"].substr(0, input.length).toUpperCase() ===
        input.toUpperCase()
      ) {
        return ele["University of Andorra"];
      }
    });
    const filteredData = matched.filter(result => {
      return result !== undefined;
    });
    return filteredData.slice(0, 10);
  }
};

module.exports = {
  homeHandler,
  publicHandler,
  apiHandler
};
0;
