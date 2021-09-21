import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace pruefungsabgabe {

  //Interfaces und Arrays sin dazu da um die Inhalte der Rezepte aus der Datenbank zu laden
  export interface Nutzer {
    nutzername: string;
    passwort: string;
  }

  export interface Rezepte {
    _id: string; 
    zutaten: string; 
    zubereitung: string; 
    autor: string;
  }

  let nutzerArray: Nutzer;
  let rezeptArray: Rezepte;

  let url: string;
  url = "mongodb+srv://test-user:12345@foodmood.bxjhf.mongodb.net/database_foodmood?retryWrites=true&w=majority";
  let registrierungDaten: Mongo.Collection;
  let rezepteDaten: Mongo.Collection;

  console.log("Server wird gestartet");
  let port: number = Number(process.env.PORT);
  if (!port)//wenn es den Port nicht gibt 
  // bekommt der Port den Wert 8100
    port = 8100;


  let server: Http.Server = Http.createServer(); //Servervariable vom Typ HTTP-Server wird festgelegt 
  server.addListener("request", handleRequest); // Dem Server werden Handler als Listerner hinzugefügt
  server.listen(port); //Server hört den Port ab 

  connectDatabase();


  async function connectDatabase(): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(url, options);
    await mongoClient.connect();

    registrierungDaten = mongoClient.db("database_foodmood").collection("registrierung");
    rezepteDaten = mongoClient.db("database_foodmood").collection("rezepte");

    console.log("Mit Datenbank verbunden");
  }

//In dieser Funktion werden alle Anfragen mithilfe von pathname bearbeitet
  async function handleRequest(request: Http.IncomingMessage, response: Http.ServerResponse): Promise<void> {

    //Hier werden die Parameter für die response festgelegt 
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.setHeader("Access-Control-Allow-Origin", "*");


    if (request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(request.url, true);
      let pathname: String | null = url.pathname;

      console.log(pathname);

      if (pathname == "/registrierung") {
        //Hier wird geprüft ob der nutzernamen und das passwort in der Datenbank bereits hinterlegt ist
        if (await registrierungDaten.findOne(url.query)) {
          response.write("false");
          console.log("Bereits registriert");
        }
        //Gibt es die Daten nicht wird der Account in der Datenbank hinterlegt 
        else {
          response.write("true");
          registrierungDaten.insertOne(url.query);
          console.log("Registrierung ausführen");
        }
      }

      if (pathname == "/login") {
        //Hier wird geprüft ob der nutzernamen und das passwort in der Datenbank bereits hinterlegt ist
        if (await registrierungDaten.findOne(url.query)) {
          nutzerArray = JSON.parse(JSON.stringify(url.query));
          response.write("true");
          console.log("Login-Daten vorhanden");
        }
        //Falls diese Daten nicht hinterlegt sind, wird "false" als repsonse an den Client weitergeleitet
        else {
          response.write("false");
          console.log("Keine Login-Daten vorhanden");
        }
      }

      //Hier werden eingetragenen Rezeptdaten in der Datenbank hinterlegt
      if (pathname == "/insertRecipe") {
        rezepteDaten.insertOne(url.query);
        console.log("Rezeptdaten in Datenbank übertragen");
      }

      //Hier werden nur Rezepte mit dem vom Client übergebenen autor (=nutzername) in der Datenbank durchsucht und an den Client weitergegeben
      if (pathname == "/publishMyRecipe") {
        response.write(JSON.stringify(await rezepteDaten.find({ "autor": nutzerArray.nutzername }).toArray()));
        console.log("Alle Rezepte des Autors werden angezeigt");
      }

      //Hier werden alle Rezepte in der Datenbank durchsucht und an den Client weitergegeben 
      if (pathname == "/publishAllRecipes") {
        response.write(JSON.stringify(await rezepteDaten.find().toArray()));
        console.log("Alle Rezepte werden angezeigt");
      }
      
      if (pathname == "/deleteMyRecipe") {
        //Hier werden alle Rezepte in der Datenbank nach Autor gefiltert. 
        let rezepte: String[] = await rezepteDaten.find({ "autor": nutzerArray.nutzername }).toArray();
        //Der Wert des Counters wird aus der URL gefiltert. 
        let counter: number = parseFloat(JSON.stringify(url.query).replace(/\D/g, ""));
        //Mithilfe des Counters kann so eines der rausgefilterten Rezepte gelöscht werden.
        rezepteDaten.deleteOne(rezepte[counter]);
        console.log("Rezept gelöscht");
      }

      //Das Rezept was zum bearbeiten angeklickt wurde, wird in der Datenbank gesucht und in das rezeptArray reingespeichert. 
      if (pathname == "/searchRecipe") {
        rezeptArray = await rezepteDaten.findOne(url.query);
        console.log("Rezept gefunden");
      }

      //Klickt man auf "aktualisieren" wird, anhand der im Interface gespeicherten _id, das entsprechende Rezept in der Datenbank 
      //gefunden und mit den neuen Inhalten des Formulars überschrieben. 
      if (pathname == "/updateRecipe") {
        rezepteDaten.findOneAndUpdate({"_id": new Mongo.ObjectId(rezeptArray._id)}, {$set: url.query});
        console.log("Rezept aktualisiert");
      }

      response.end();
    }
  }
}
