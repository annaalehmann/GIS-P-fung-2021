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
        console.log("handleRegistrierung start ");
        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData = new FormData(document.forms[0]);
        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query = new URLSearchParams(formData);
        /*let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
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
    console.log("Vor handleLogin");
    /*async: Funktion als asynchrone Kommunikation deklariert, Promise: liefert Antwort vom Server, void: kein Wert? */
    async function handleLogin() {
        console.log("handleLogin start");
        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData = new FormData(document.forms[0]);
        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query = new URLSearchParams(formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let url = "http://localhost:8100";
        url = url + "/login" + "?" + query.toString();
        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        let response = await fetch(url);
        let responseText = await response.text();
        console.log("Vor der If-Anweisung");
        if (responseText == "true") {
            console.log("In der If-Answeisung");
            window.location.href = "index.html";
            window.alert("DU hast dich erfolgreich eingeloggt");
        }
        else {
            window.alert("Fehler beim Login. Versuche es erneut.");
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=login.js.map