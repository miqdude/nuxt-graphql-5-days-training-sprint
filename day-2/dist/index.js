"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: __dirname }, (err) => {
        if (err) {
            console.log(err);
        }
    });
});
app.listen(8080, function () {
    console.log("server running on 8080");
});
//# sourceMappingURL=index.js.map