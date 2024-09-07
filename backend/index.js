const express = require("express");
const port = 6969;


const app = express();
const cors = require("cors");


const mainrouter = require("./router/index");
const buyerrouter = require("./router/buyer");
const sellerrouter = require("./router/seller");
const adminrouter = require("./router/admin");
const trackLocation = require('./middleware/tracklocation');
const trackBehavior = require('./middleware/trackBehavior');

app.use(cors());
app.use(express.json());
app.use(trackLocation);
app.use(trackBehavior);

app.use("/api/v1", mainrouter);
app.use("/api/v1/buyer", buyerrouter);
app.use("/api/v1/seller", sellerrouter);
app.use("/api/v1/admin", adminrouter);


app.listen(port);
