"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let rezeptArray;
    let publishButton = document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);
    async function handlePublishRecipes() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publish" + "?" + query.toString();
        await fetch(_url);
        for (let i = 0; i < rezeptArray.length; i++) {
            let div = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.setAttribute("zaehler", i.toString());
            let zutaten = document.createElement("p");
            zutaten.innerHTML = "Zutaten:" + rezeptArray[i].zutaten;
            div.appendChild(zutaten);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung:" + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);
        }
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=script.js.map