require("dotenv").config();
const express = require ("express");
const router = require("./app/router/index");
const cors = require('cors')
const app = express();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use(router);

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
})