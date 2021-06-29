"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    /*Variablen Deklaration für den Login-BUtton*/
    let buttonLogin = document.getElementById("login");
    /*Beim klicken auf den Button wird die Funktion handleLogin durchgeführt*/
    buttonLogin.addEventListener("click", handleLogin);
    /*Variablen Deklaration für den Registrieren-BUtton*/
    let buttonRegistrierung = document.getElementById("registrierung");
    /**Beim klicken auf den Button wird die Funktion handleLogin durchgeführt**/
    buttonRegistrierung.addEventListener("click", handleRegistrierung);
    async function handleRegistrierung() {
        let formData = new FormData(document.forms[0]);
        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query = new URLSearchParams(formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/registrierung" + "?" + query.toString();
        let response = await fetch(_url);
        let responseText = await response.text();
        if (responseText == "true") {
            window.alert("Du hast dich erfolgreich registriert.");
        }
        else {
            window.alert("Registrierung fehlgeschlagen. Wohlmöglich gibt es diesen Account schon.");
        }
    }
    /*async: Funktion als asynchrone Kommunikation deklariert, Promise: liefert Antwort vom Server, void: kein Wert? */
    async function handleLogin() {
        let formData = new FormData(document.forms[0]);
        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query = new URLSearchParams(formData);
        /*let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url = _url + "/login" + "?" + query.toString();
        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        console.log(_url);
        let response = await fetch(_url);
        let responseText = await response.text();
        console.log("test3");
        if (responseText == "true") {
            let nutzername = formData.get("nutzername");
            let passwort = formData.get("passwort");
            localStorage.setItem("nutzername", nutzername);
            localStorage.setItem("passwort", passwort);
            window.location.href = "alle-rezepte.html";
            window.alert("Du hast dich erfolgreich eingeloggt");
        }
        else {
            window.alert("Fehler beim Login. Versuche es erneut.");
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=login.js.map