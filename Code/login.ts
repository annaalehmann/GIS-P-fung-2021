namespace pruefungsabgabe {

    /*Variablen Deklaration für den Login-BUtton*/
    let buttonLogin: HTMLButtonElement = document.querySelector("button#login");
    /*Beim klicken auf den Button wird die Funktion handleLogin durchgeführt*/
    buttonLogin.addEventListener("click", handleLogin);

    /*Variablen Deklaration für den Registrieren-BUtton*/
    let buttonRegistrierung: HTMLButtonElement = document.querySelector("button#registrierung");
    /**Beim klicken auf den Button wird die Funktion handleLogin durchgeführt**/
    buttonRegistrierung.addEventListener("click", handleRegistrierung);


    async function handleRegistrierung(): Promise<void> {
        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData: FormData = new FormData(document.forms[0]);

        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /*let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/registrierung" + "?" + query.toString();
        await fetch(_url);
    }


    /*async: Funktion als asynchrone Kommunikation deklariert, Promise: liefert Antwort vom Server, void: kein Wert? */
    async function handleLogin(): Promise<void> {

        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData: FormData = new FormData(document.forms[0]);

        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url = _url + "/login" + "?" + query.toString();

        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        let response: Response = await fetch(_url);
        let responseText: string = await response.text();
        console.log(responseText);


        if (responseText == "true") {
            localStorage.setItem("user", responseText);
            window.location.href = "index.html";
        }

    }
}