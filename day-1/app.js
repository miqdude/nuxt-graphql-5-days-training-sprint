"use strict";
exports.__esModule = true;
var express = require("express");
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var router = express.Router();
        router.get('/', function (req, res) {
            res.sendFile('index.html', { root: __dirname }, function (err) {
                console.log(err);
            });
        });
        this.express.use('/', router);
        router.get('/custom', function (req, res) {
            res.send("Hello Miqdad");
        });
        this.express.use('/custom', router);
    };
    return App;
}());
exports["default"] = new App().express;