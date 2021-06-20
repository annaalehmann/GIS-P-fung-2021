"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    /*Variablen Deklaration für den Login-BUtton*/
    let buttonLogin = document.getElementById("login");
    /*Beim klicken auf den Button wird die Funktione handleLogin durchgeführt*/
    buttonLogin.addEventListener("click", handleLogin);
    /*Variablen Deklaration für den Registrieren-BUtton*/
    let buttonRegistrierung = document.getElementById("registrierung");
    /**Beim klicken auf den Button wird die Funktione handleLogin durchgeführt**/
    buttonRegistrierung.addEventListener("click", handleRegistrierung);
    async function handleRegistrierung() {
        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData = new FormData(document.forms[0]);
        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query = new URLSearchParams(formData);
        let url = "https://gis-pruefung-2021.herokuapp.com/";
        url += "/registrierung" + "?" + query.toString();
        await fetch(url);
        console.log("test");
    }
    /*async: Funktion als asynchrone Kommunikation deklariert, Promise: liefert Antwort vom Server, void: kein Wert? */
    async function handleLogin() {
        /*Zugriff auf die Formularwerte des Formulars "formular"*/
        let formData = new FormData(formular);
        /*Mit URLSearchParams Daten aus dem FormData-Objekt generieren, any, da Typescript FormData als Parameter nicht akzeptiert*/
        let query = new URLSearchParams(formData);
        let _url = "https://gis-pruefung-2021.herokuapp.com/";
        _url = _url + "/login" + "?" + query.toString();
        /*await: Ausführung der Funktion kann unterbrochen und zu einem späteren Zeitpunkt fortgesetzt werden, fetch: an den Server Anfrage verschicken und auf Antwort warten */
        let response = await fetch(_url);
        let responseText = await response.text();
        console.log(responseText);
        if (responseText == "true") {
            localStorage.setItem("user", responseText);
            alert("Du hast dich erfolgreich angemeldet");
            window.location.href = "index.html";
        }
        else {
            alert("Leider hast du noch keinen Account. Bitte registriere dich zuerst!");
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=login.js.map