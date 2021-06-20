"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruefungsabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let url;
    /* url = "mongodb+srv://test-user:12345@foodmood.bxjhf.mongodb.net/database_foodmood?retryWrites=true&w=majority";*/
    url = "http://localhost:8100";
    let registrierungDaten;
    let rezepteDaten;
    console.log("Server wird gestartet");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);
    connectDatabase();
    async function connectDatabase() {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        registrierungDaten = mongoClient.db("database_foodmood").collection("registrierung");
        rezepteDaten = mongoClient.db("database_foodmood").collection("rezepte");
        console.log("Mit Datenbank verbunden");
    }
    async function handleRequest(request, response) {
        response.setHeader("content-type", "text/html; charset=utf-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        if (request.url) {
            let url = Url.parse(request.url, true);
            let pathname = url.pathname;
            if (pathname == "/registrierung") {
                registrierungDaten.insertOne(url.query);
            }
            response.end();
        }
    }
})(pruefungsabgabe = exports.pruefungsabgabe || (exports.pruefungsabgabe = {}));
//# sourceMappingURL=server.js.map