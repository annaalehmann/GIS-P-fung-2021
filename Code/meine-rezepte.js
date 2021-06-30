"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let rezeptArray;
    let publishButton = document.getElementById("publish");
    publishButton.addEventListener("click", handleInsert);
    handlePublishMyRecipes();
    //Rezept in Datenbank einfügen
    async function handleInsert() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/insertRecipe" + "?" + query.toString() + "&autor=" + localStorage.getItem("nutzername");
        await fetch(_url);
        location.reload();
    }
    //Rezepte des Nutzers anzeigen
    async function handlePublishMyRecipes() {
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publishMyRecipe";
        let response = await fetch(_url);
        let responseJSON = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));
        /*Aufbau der einzelnen Rezepte*/
        document.getElementById("myRecipes").innerHTML = "";
        for (let i = 0; i < rezeptArray.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("myRecipes").appendChild(div);
            let zutaten = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + rezeptArray[i].zutaten;
            div.appendChild(zutaten);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);
            let autor = document.createElement("p");
            autor.innerHTML = "Autor: " + rezeptArray[i].autor;
            div.appendChild(autor);
            let buttonEdit = document.createElement("button");
            buttonEdit.innerHTML = "bearbeiten";
            buttonEdit.classList.add("buttonRezepte");
            div.appendChild(buttonEdit);
            buttonEdit.addEventListener("click", handleRezeptBearbeiten);
            let buttonDelete = document.createElement("button");
            buttonDelete.innerHTML = "löschen";
            buttonDelete.classList.add("buttonRezepte");
            div.appendChild(buttonDelete);
            buttonDelete.addEventListener("click", handleRezeptLoeschen);
        }
    }
    /*Meine Rezepte löschen*/
    async function handleRezeptLoeschen(_event) {
        let i = _event.currentTarget.parentElement.getAttribute("counter");
        document.getElementById("currentRecipeDiv" + i)?.remove();
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/deleteMyRecipe" + "?" + "counter=" + i;
        await fetch(_url);
    }
    async function handleRezeptBearbeiten(_event) {
        let i = _event.currentTarget.parentElement.getAttribute("counter");
        let iNr = parseInt(i);
        document.getElementById("zutatenlisteEdit1").innerHTML = "";
        document.getElementById("zutatenlisteEdit2").innerHTML = "";
        document.getElementById("zubereitungBearbeiten").innerHTML = "";
        document.getElementById("buttonBearbeitenContainer").innerHTML = "";
        for (let i = 0; i < 5; i++) {
            let zutatenliste = document.createElement("input");
            zutatenliste.setAttribute("type", "text");
            zutatenliste.value = rezeptArray[iNr].zutaten[i];
            zutatenliste.name = "zutaten";
            document.getElementById("zutatenlisteEdit1").appendChild(zutatenliste);
        }
        for (let i = 5; i < 10; i++) {
            let zutatenliste = document.createElement("input");
            zutatenliste.setAttribute("type", "text");
            zutatenliste.value = rezeptArray[iNr].zutaten[i];
            zutatenliste.name = "zutaten";
            document.getElementById("zutatenlisteEdit2").appendChild(zutatenliste);
        }
        let zubereitung = document.createElement("textarea");
        zubereitung.setAttribute("type", "text");
        document.getElementById("zubereitungBearbeiten").appendChild(zubereitung);
        zubereitung.value = rezeptArray[iNr].zubereitung;
        zubereitung.name = "zubereitung";
        let buttonUpdate = document.createElement("button");
        buttonUpdate.innerHTML = "aktualisieren";
        document.getElementById("buttonBearbeitenContainer").appendChild(buttonUpdate);
        buttonUpdate.id = "button";
        buttonUpdate.addEventListener("click", handleRezeptAktualisieren);
        let formData = new FormData(document.forms[1]);
        let query = new URLSearchParams(formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/searchRecipe" + "?" + query.toString() + "&autor=" + localStorage.getItem("nutzername");
        await fetch(_url);
    }
    async function handleRezeptAktualisieren(_event) {
        let formData = new FormData(document.forms[1]);
        let query = new URLSearchParams(formData);
        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/updateRecipe" + "?" + query.toString() + "&autor=" + localStorage.getItem("nutzername");
        await fetch(_url);
        location.reload();
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=meine-rezepte.js.map