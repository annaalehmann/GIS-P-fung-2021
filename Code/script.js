"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let publishButton = document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);
    async function handlePublishRecipes() {
        let id = JSON.parse(localStorage.getItem("nutzername"));
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        query.append("id", id.id);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publish" + "?" + query.toString();
        let response = await fetch(_url);
        let responseText = await response.text();
        let splitResponseText = JSON.parse(responseText.split("$")[1]);
        let posten = document.getElementById("myRecipes");
        for (let i = 0; i < splitResponseText.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            posten.appendChild(div);
            div.setAttribute("zaehler", i.toString());
            let zutaten = document.createElement("p");
            zutaten.innerHTML = "Zutaten:" + splitResponseText[i].zutaten;
            div.appendChild(zutaten);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung:" + splitResponseText[i].zubereitung;
            div.appendChild(zubereitung);
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=script.js.map