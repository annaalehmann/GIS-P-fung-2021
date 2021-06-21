namespace pruefungsabgabe {

    interface rezept {
        zutaten: string;
        zubereitung: string;
    }


    let publishButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);

    async function handlePublishRecipes(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/publish" + "?" + query.toString();
        let response: Response = await fetch(_url, { method: "get" });
        let responseText: string = await response.text();

        (<HTMLElement>document.getElementById("myRecipes")).innerHTML = responseText;
    }

}