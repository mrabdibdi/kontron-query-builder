const { buildQuery } = require("../index");

const whitelist = ["startAt", "maxResults", "jql"];

// let query = buildQuery("http://test.io", whitelist, { jql: "test" });
// console.log(query)
// query = buildQuery("http://test.io", whitelist, { jql: "test", maxResults:3000, hacked: true });
// console.log(query)

const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  const query = buildQuery(
    req.protocol + "://" + req.get("host"),
    whitelist,
    req.query
  );
  res.status(200).json({
    msg: query
  });
});

app.listen(1337, () => {
  console.log("App is listening on port 1337");
});
