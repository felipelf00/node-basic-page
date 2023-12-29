const http = require("node:http");
const fs = require("fs");
const url = require("node:url");

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  const parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  const requestedPath = parsedUrl.pathname;

  const routeMapping = {
    "/": "index.html",
    "/about": "about.html",
    "/contact-me": "contact-me.html",
  };

  if (routeMapping[requestedPath]) {
    const filePath = routeMapping[requestedPath];
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        console.error(err);
        res.end("Internal server error");
      } else {
        res.statusCode = 404;
        res.end(data);
      }
    });
  } else {
    fs.readFile("./404.html", (err, data) => {
      if (err) {
        res.statusCode = 500;
        console.error(err);
        res.end("Internal server error");
      } else {
        res.statusCode = 404;
        res.end(data);
      }
    });
  }

  fs.readFile("./about.html", (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal server error");
    } else {
      res.statusCode = 200;
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
