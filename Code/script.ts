namespace pruefungsabgabe {

    interface Nutzer {
        id: string; 
        nutzername: string; 
        passwort: string; 

    }

    interface Rezepte {
        id: string;
        zutaten: string;
        zubereitung: string;
    }


    let publishButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("publish");
    publishButton.addEventListener("click", handlePublishRecipes);

    async function handlePublishRecipes(): Promise<void> {

        let id: Nutzer = JSON.parse(localStorage.getItem("nutzername"));
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        query.append("id", id.id);


        /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/publish" + "?" + query.toString();
        let response: Response = await fetch(_url);
        let responseText: string = await response.text();
        let splitResponseText: Rezepte[] = JSON.parse(responseText.split("$")[1]);

        let posten: HTMLDivElement = (<HTMLDivElement>document.getElementById("myRecipes"));

        for (let i: number = 0; i < splitResponseText.length; i++) {

            let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            posten.appendChild(div);
            div.setAttribute("zaehler", i.toString());

            let zutaten: HTMLElement = document.createElement("p");
            zutaten.innerHTML = "Zutaten:" + splitResponseText[i].zutaten;
            div.appendChild(zutaten);

            let zubereitung: HTMLElement = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung:" + splitResponseText[i].zubereitung;
            div.appendChild(zubereitung);
        }

    }
}
