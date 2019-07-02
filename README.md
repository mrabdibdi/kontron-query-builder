# Query Builder

This module create a custom query to bridge command with Jira.

## Installation

```bash
npm i --save kontron-query-builder
```

## Usage

```
const { buildQuery } = require("../index");

const whitelist = ["startAt", "maxResults", "jql"];

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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT