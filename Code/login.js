"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let buttonLogin = document.getElementById("login");
    buttonLogin.addEventListener("click", handleLogin);
    let buttonRegistrierung = document.getElementById("registrierung");
    buttonRegistrierung.addEventListener("click", handleRegistrierung);
    async function handleRegistrierung() {
        //Greift auf die ausgefüllten Daten des ersten Formulars zu und gibt diese an den Server weiter
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/registrierung" + "?" + query.toString();
        let response = await fetch(_url);
        let responseText = await response.text();
        //Überprüfung ob es den Account bereits gibt oder die registrierung erfolgreich abgelaufen ist
        if (responseText == "true") {
            window.alert("Du hast dich erfolgreich registriert.");
        }
        else {
            window.alert("Registrierung fehlgeschlagen. Wohlmöglich gibt es diesen Account schon.");
        }
    }
    async function handleLogin() {
        //Greift auf die ausgefüllten Daten des ersten Formulars zu und gibt diese an den Server weiter
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /*let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url = _url + "/login" + "?" + query.toString();
        let response = await fetch(_url);
        let responseText = await response.text();
        //Ist der Login erfolgreich abgelaufen werden nutzername und passwort im localStorage gespeichert und man wird zur Startseite weitergeleitet.
        if (responseText == "true") {
            let nutzername = formData.get("nutzername");
            let passwort = formData.get("passwort");
            localStorage.setItem("nutzername", nutzername);
            localStorage.setItem("passwort", passwort);
            window.location.href = "alle-rezepte.html";
            window.alert("Du hast dich erfolgreich eingeloggt");
        }
        //Falls die Login-Daten noch nicht vergeben sind kommt es zu einer Fehlermeldung. 
        else {
            window.alert("Fehler beim Login. Versuche es erneut.");
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=login.js.map