namespace pruefungsabgabe {

    let buttonLogin: HTMLButtonElement = <HTMLButtonElement>document.getElementById("login");
    buttonLogin.addEventListener("click", handleLogin);

    let buttonRegistrierung: HTMLButtonElement = <HTMLButtonElement>document.getElementById("registrierung");
    buttonRegistrierung.addEventListener("click", handleRegistrierung);

    
    async function handleRegistrierung(): Promise<void> {

        //Greift auf die ausgefüllten Daten des ersten Formulars zu und gibt diese an den Server weiter
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/registrierung" + "?" + query.toString();

        let response: Response = await fetch(_url);
        let responseText: string = await response.text();

        //Überprüfung ob es den Account bereits gibt oder die registrierung erfolgreich abgelaufen ist
        if (responseText == "true") {
            window.alert("Du hast dich erfolgreich registriert.");
        }

        else {
            window.alert("Registrierung fehlgeschlagen. Wohlmöglich gibt es diesen Account schon.");
        }
    }

    async function handleLogin(): Promise<void> {

        //Greift auf die ausgefüllten Daten des ersten Formulars zu und gibt diese an den Server weiter
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /*let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url = _url + "/login" + "?" + query.toString();

        console.log(_url);
        let response: Response = await fetch(_url);
        let responseText: string = await response.text();

        //Ist der Login erfolgreich abgelaufen werden nutzername und passwort im localStorage gespeichert und man wird zur Startseite weitergeleitet.
        if (responseText == "true") {

            let nutzername: string = <string>formData.get("nutzername");
            let passwort: string = <string>formData.get("passwort");

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
}