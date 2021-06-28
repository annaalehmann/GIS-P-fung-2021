"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruefungsabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let nutzerArray;
    let url;
    url = "mongodb+srv://test-user:12345@foodmood.bxjhf.mongodb.net/database_foodmood?retryWrites=true&w=majority";
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
            console.log(pathname);
            if (pathname == "/registrierung") {
                if (await registrierungDaten.findOne(url.query)) {
                    response.write("false");
                    console.log("Bereits registriert");
                }
                else {
                    response.write("true");
                    registrierungDaten.insertOne(url.query);
                    console.log("Registrierung ausführen");
                }
            }
            if (pathname == "/login") {
                if (await registrierungDaten.findOne(url.query)) {
                    nutzerArray = JSON.parse(JSON.stringify(url.query));
                    response.write("true");
                    console.log("Login-Daten vorhanden");
                }
                else {
                    response.write("false");
                    console.log("Keine Login-Daten vorhanden");
                }
            }
            if (pathname == "/insertRecipe") {
                rezepteDaten.insertOne(url.query);
                console.log("Rezeptdaten in Datenbank übertragen");
            }
            if (pathname == "/publishMyRecipe") {
                response.write(JSON.stringify(await rezepteDaten.find({ "autor": nutzerArray.nutzername }).toArray()));
                console.log("Alle Rezepte des Autors werden angezeigt");
            }
            if (pathname == "/publishAllRecipes") {
                response.write(JSON.stringify(await rezepteDaten.find().toArray()));
                console.log("Alle Rezepte werden angezeigt");
            }
            if (pathname == "/deleteMyRecipe") {
                let rezepte = await rezepteDaten.find({ "autor": nutzerArray.nutzername }).toArray();
                let counter = parseFloat(JSON.stringify(url.query).replace(/\D/g, ""));
                rezepteDaten.deleteOne(rezepte[counter]);
                console.log("Rezept gelöscht");
            }
            if (pathname == "/favorite") {
                let rezepte = await rezepteDaten.find({}).toArray();
                let counter = parseFloat(JSON.stringify(url.query));
                response.write(JSON.stringify(await rezepteDaten.find(rezepte[counter]).toArray()));
                console.log("Rezept favorisiert");
            }
            response.end();
        }
    }
})(pruefungsabgabe = exports.pruefungsabgabe || (exports.pruefungsabgabe = {}));
//# sourceMappingURL=server.js.map