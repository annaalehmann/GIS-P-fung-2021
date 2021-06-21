namespace pruefungsabgabe {

    /*Variablen Deklaration für den Login-BUtton*/
    let buttonLogin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
    /*Beim klicken auf den Button wird die Funktion handleLogin durchgeführt*/
    buttonLogin.addEventListener("click", handleLogin);

    /*Variablen Deklaration für den Registrieren-BUtton*/
    let buttonRegistrierung: HTMLButtonElement = <HTMLButtonElement>document.getElementById("registrierung");
    /**Beim klicken auf den Button wird die Funktion handleLogin durchgeführt**/
    buttonRegistrierung.addEventListener("click", handleRegistrierung);


    async function handleRegistrierung(): Promise<void> {

        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData: FormData = new FormData(document.forms[0]);

        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/registrierung" + "?" + query.toString();

        let response: Response = await fetch(_url);
        let responseText: string = await response.text();

        if (responseText == "true") {
            window.alert("Du hast dich erfolgreich registriert.");
        }

        else {
            window.alert("Registrierung fehlgeschlagen. Wohlmöglich gibt es diesen Account schon.");
        }
    }


    /*async: Funktion als asynchrone Kommunikation deklariert, Promise: liefert Antwort vom Server, void: kein Wert? */
    async function handleLogin(): Promise<void> {

        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData: FormData = new FormData(document.forms[0]);

        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /*let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url = _url + "/login" + "?" + query.toString();

        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        console.log(_url);
        let response: Response = await fetch(_url);
        let responseText: string = await response.text();
        console.log("test3");

        if (responseText == "true") {
            
            let nutzername: string = <string>formData.get("nutzername");
            let passwort: string = <string>formData.get("Password");
            
            localStorage.setItem("Nutzername", nutzername);
            localStorage.setItem("Passwort", passwort);
            
            window.location.href = "index.html";
            window.alert("Du hast dich erfolgreich eingeloggt");
        }

        else {
            window.alert("Fehler beim Login. Versuche es erneut.");
        }
    }
}