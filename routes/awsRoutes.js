// Importing AWSPresigner
const { generateGetUrl, generatePutUrl } = require("../services/AWSPresigner");

module.exports = app => {
  // GET URL
  app.get("/api/getImageUrl", (req, res) => {
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    console.log("get image called");
    const { Key } = req.query;
    generateGetUrl(Key)
      .then(getURL => {
        res.send(getURL);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // PUT URL
  app.get("/api/putImageUrl", (req, res) => {
    console.log("post image called");
    // Both Key and ContentType are defined in the client side.
    // Key refers to the remote name of the file.
    // ContentType refers to the MIME content type, in this case image/jpeg
    const { Key, ContentType } = req.query;
    console.log(Key);
    console.log(ContentType);
    generatePutUrl(Key, ContentType)
      .then(putURL => {
        res.send({ putURL });
      })
      .catch(err => {
        res.send(err);
      });
  });
};
