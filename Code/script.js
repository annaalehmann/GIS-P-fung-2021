"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    /*interface Nutzer {
          id: string;
          nutzername: string;
          passwort: string;
      }*/
    let rezeptArray;
    let publishButton = document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);
    async function handlePublishRecipes() {
        /* let id: Nutzer = JSON.parse(localStorage.getItem("nutzername"));*/
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publish" + "?" + query.toString();
        let response = await fetch(_url);
        let responseJSON = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));
        document.getElementById("myRecipes").innerHTML = "";
        /*query.append("id", id.id);*/
        for (let i = 0; i < rezeptArray.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("zaehler", i.toString());
            document.getElementById("myRecipes").appendChild(div);
            let zutaten = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + rezeptArray[i].zutaten;
            div.appendChild(zutaten);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=script.js.map