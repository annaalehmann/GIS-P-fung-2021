"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruefungsabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let url;
    url = "mongodb+srv://test-user:<12345>@foodmood.bxjhf.mongodb.net/database_foodmood?retryWrites=true&w=majority";
    let registrierungDaten;
    let rezepteDaten;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);
    async function connectDatabase() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        registrierungDaten = mongoClient.db("database_foodmood").collection("registrierung");
        rezepteDaten = mongoClient.db("database_foodmood").collection("rezepte");
    }
    connectDatabase();
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let pathname = url.pathname;
            if (pathname == "/registrierung") {
                registrierungDaten.insertOne(url.query);
            }
            _response.end();
        }
    }
})(pruefungsabgabe = exports.pruefungsabgabe || (exports.pruefungsabgabe = {}));
//# sourceMappingURL=server.js.map