const http = require("http");

const hostName = "localhost";
const post = 3000;

const server = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on("data", (chunk) => {
    console.log(JSON.parse(chunk));
    // res.end(`chunk`);
  });
  req.on("end", () => {
    //end of data
    res.end(`<h1>This is my first server created by Node.js.</h1>`);
  });
  // res.statusCode = 200;
  // res.setHeader = ('content-Type', 'text/html');
  // res.end(`<h1>This is my first server created by Node.js.</h1>`);
});

server.listen(post, hostName, () => {
  console.log("伺服器打開囉");
});
