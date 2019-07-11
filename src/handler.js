const fs = require("fs");
const path = require("path");
// let dataFile = require("./uniName.json");
// var d = dataFile.data[0];
// d2 = d.DA;
// console.log(d);

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
        "Contetn-Type": "text/html"
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
  // console.log("endpoint,", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, {
        "Contetn-Type": extensionType[extension]
      });
      response.end(file);
    }
  });
};

const apiHandler = (request, response, endpoint) => {
  console.log("request uni", request.url);
  var queryString = endpoint.split("=")[1];
  console.log(queryString);

  const filePath = path.join(__dirname, "uniName.json");
  fs.readFile(filePath, "utf-8", (error, read) => {
    if (read) {
      const result = JSON.parse(read);
      console.log(typeof result);
      const resultfinal = findMatch(result, queryString);
      response.writeHead(200, {
        "Comtent-Type": "applicaton/json"
      });
      response.end(JSON.stringify(resultfinal));
      console.log("the qs", queryString);
      //console.log("results re", findMatch(result, queryString));
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
    return filteredData.slice(0, 10); //show only 5 item on list
  }
};

module.exports = {
  homeHandler,
  publicHandler,
  apiHandler
};
0;
