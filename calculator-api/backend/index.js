const express = require("express");
const cors = require("cors");
const app = express();
const wyniki = [];
app.use(cors());
app.use("/:sol", (req, res) => {
  wyniki.push(req.params.sol);
  res.status(200).send(wyniki)
});
app.listen(5000, () => {
  console.log("serve at http://localhost:5000");
});
