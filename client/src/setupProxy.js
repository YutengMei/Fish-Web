const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy(["/api", "/auth/google"], { target: "http://localhost:5000" }));
};

// const proxyDarkSky = require("http-proxy-middleware");
//
// module.exports = function(app) {
//   app.use(proxyDarkSky("/darksky", { target: "http://localhost:3000" }));
// };
