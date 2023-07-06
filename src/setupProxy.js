const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // Add any other necessary headers here
      },
    })
  );
};
