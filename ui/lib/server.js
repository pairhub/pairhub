const express = require("express");
const next = require("next");

const proxy = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const API_HOST =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3010"
    : "https://api.pairhub.io";
const apiProxy = proxy({ target: API_HOST, changeOrigin: true });

app
  .prepare()
  .then(() => {
    const server = express();

    server.use("/graphql", apiProxy);
    server.use("/graphiql", apiProxy);
    server.use("/login", apiProxy);
    server.use("/logout", apiProxy);

    server.get("/@:username", (req, res) => {
      const params = { username: req.params.username };
      app.render(req, res, "/profile", params);
    });

    server.get("/post/:id", (req, res) => {
      const params = { id: req.params.id };
      app.render(req, res, "/post", params);
    });

    server.get("/:owner/:repo", (req, res) => {
      const { owner, repo } = req.params;
      const params = { repository: `${owner}/${repo}` };
      app.render(req, res, "/repository", params);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
