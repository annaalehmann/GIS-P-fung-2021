import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace login {
    
    interface Nutzer {
        nutzername: string;
        passwort: string;
    }
}