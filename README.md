**EXPERIMENTAL** - NOT AN OFFICIAL GRAPHCMS LIBRARY

# graphcms-js

> JSON to GraphCMS request handler

## Quickstart

```js
const { GraphCMS } = require("graphcms-js");

const api = new GraphCMS("<endpoint>", {
  token: "<optional-auth-token>",
});

api
  .model("posts")
  .select({ id: true, title: true })
  .exec()
  .then(console.log)
  .catch(console.log);

api
  .model("post")
  .where({ id: "ckfdy1so000sx0107hyg1o9k0" })
  .select({ id: true, title: true, authors: { id: true, name: true } })
  .exec()
  .then(console.log)
  .catch(console.log);
```
