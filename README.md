**EXPERIMENTAL** - NOT AN OFFICIAL GRAPHCMS LIBRARY

# graphcms-request

> JSON to GraphCMS request handler

## Quickstart

```js
const { GraphCMS } = require("graphcms-request");

const api = new GraphCMS("<endpoint>", {
  token: "<optional-auth-token>",
});

api
  .model("blogPost")
  .where({ id: "ckfdy1so000sx0107hyg1o9k0" })
  .select({ id: true, title: true, authors: { id: true, name: true } })
  .exec()
  .then(console.log)
  .catch(console.log);
```
