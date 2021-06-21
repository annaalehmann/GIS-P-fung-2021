"use strict";
var pruefungsabgabe;
(function (pruefungsabgabe) {
    let publishButton = document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);
    async function handlePublishRecipes() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url = "http://localhost:8100";
        _url += "/publishRecipes" + "?" + query.toString();
        await fetch(_url);
    }
})(pruefungsabgabe || (pruefungsabgabe = {}));
//# sourceMappingURL=script.js.map