import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace pruefungsabgabe {

    let url: string;
    url = "mongodb+srv://test-user:12345@foodmood.bxjhf.mongodb.net/database_foodmood?retryWrites=true&w=majority";

    let registrierungDaten: Mongo.Collection;
    let rezepteDaten: Mongo.Collection;

    console.log("Server wird gestartet");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;


    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);

    connectDatabase();

    async function connectDatabase(): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();

        registrierungDaten = mongoClient.db("database_foodmood").collection("registrierung");
        rezepteDaten = mongoClient.db("database_foodmood").collection("rezepte");

        console.log("Mit Datenbank verbunden");
    }


    async function handleRequest(request: Http.IncomingMessage, response: Http.ServerResponse): Promise<void> {

        response.setHeader("content-type", "text/html; charset=utf-8");
        response.setHeader("Access-Control-Allow-Origin", "*");


        if (request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(request.url, true);
            let pathname: String | null = url.pathname;

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
                  response.write("true");
                  console.log("Login-Daten vorhanden");
                }
      
                else {
                  response.write("false");
                  console.log("Keine Login-Daten vorhanden");
                }
            }

            console.log("Server Ende");
            response.end();
            console.log("Server Ende 2");
        }
    }
}
