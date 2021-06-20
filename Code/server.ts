import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace pruefungsabgabe {

    let url: string;
    url = "mongodb+srv://test-user:<12345>@foodmood.bxjhf.mongodb.net/database_foodmood?retryWrites=true&w=majority";

    let registrierungCollection: Mongo.Collection;
    let rezepteCollection: Mongo.Collection;

    console.log("Starting server");

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;


    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);


    async function connectDatabase(): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();

        registrierungCollection = mongoClient.db("database_foodmood").collection("registrierung");
        rezepteCollection = mongoClient.db("database_foodmood").collection("rezepte");
    }

    connectDatabase();


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");


        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let pathname: String | null = url.pathname;

            if (pathname == "/registrierung") {
                registrierungCollection.insertOne(url.query);
            }

            _response.end();
        }

    }
}