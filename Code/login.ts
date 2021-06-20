namespace login {

    /*Variablen Deklaration für den Login-BUtton*/
    let buttonLogin: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".login")!;
    /*Beim klicken auf den Button wird die Funktione handleLogin durchgeführt*/
    buttonLogin.addEventListener("click", handleLogin);

    /*Variablen Deklaration für den Registrieren-BUtton*/
    let buttonRegistrierung: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".registrierung")!;
    /**Beim klicken auf den Button wird die Funktione handleLogin durchgeführt**/
    buttonRegistrierung.addEventListener("click", handleRegistrierung);

    /*Variablen Deklaration für das Login/Registrierungs-Formular*/
    let formular: HTMLFormElement = <HTMLFormElement>document.getElementById("formular")!;


    /*async: Funktion als asynchrone Kommunikation deklariert, Promise: liefert Antwort vom Server, void: kein Wert? */
    async function handleLogin(): Promise<void> {

        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData: FormData = new FormData(formular);

        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let datenabfrage: URLSearchParams = new URLSearchParams(<any>formData);
        let _url: string = "https://gis-pruefung-2021.herokuapp.com/";
        _url = _url + "/login?" + datenabfrage.toString();

        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        let response: Response = await fetch(_url);


    }

    async function handleRegistrierung(): Promise<void> {
        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData: FormData = new FormData(formular);

        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let datenabfrage: URLSearchParams = new URLSearchParams(<any>formData);
        let _url: string = "https://gis-pruefung-2021.herokuapp.com/";
        _url = _url + "/login?" + datenabfrage.toString();

        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        let response: Response = await fetch(_url);
      

    }
}