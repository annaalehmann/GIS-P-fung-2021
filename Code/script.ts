namespace pruefungsabgabe {

    interface Rezepte {
        id: string;
        zutaten: string;
        zubereitung: string;
    }

    /*Verbindungsaufbau zur Datenbank*/
    async function communicate(_url: RequestInfo) {
        let response: Response = await fetch(_url);

 
    }

    let rezeptArray: Rezepte[];


    let publishButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);

    async function handlePublishRecipes(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/publish" + "?" + query.toString();
        await fetch(_url);

        


        for (let i: number = 0; i < rezeptArray.length; i++) {

            let div: HTMLDivElement = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.setAttribute("zaehler", i.toString());
           
            let zutaten: HTMLElement = document.createElement("p");
            zutaten.innerHTML = "Zutaten:" + rezeptArray[i].zutaten;
            div.appendChild(zutaten);

            let zubereitung: HTMLElement = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung:" + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);

           
        }

    }
}
