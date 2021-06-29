namespace pruefungsabgabe {

    interface Rezepte {
        zutaten: string;
        zubereitung: string;
        autor: string;
    }

    let rezeptArray: Rezepte[];

    let publishButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("publish");
    publishButton.addEventListener("click", handleInsert);



    handlePublishMyRecipes();

    //Rezept in Datenbank einfügen
    async function handleInsert(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);

        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/insertRecipe" + "?" + query.toString() + "&autor=" + localStorage.getItem("nutzername");
        await fetch(_url);

        location.reload();
    }

    //Rezepte des Nutzers anzeigen
    async function handlePublishMyRecipes(): Promise<void> {

        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/publishMyRecipe";

        let response: Response = await fetch(_url);
        let responseJSON: string = await response.json();
        rezeptArray = JSON.parse(JSON.stringify(responseJSON));

        document.getElementById("myRecipes").innerHTML = "";

        for (let i: number = 0; i < rezeptArray.length; i++) {

            let div: HTMLDivElement = document.createElement("div");
            div.id = "currentRecipeDiv" + i;
            div.classList.add("currentRecipeClass");
            div.setAttribute("counter", i.toString());
            document.getElementById("myRecipes").appendChild(div);

            let zutaten: HTMLElement = document.createElement("p");
            zutaten.innerHTML = "Zutaten: " + rezeptArray[i].zutaten;
            div.appendChild(zutaten);

            let zubereitung: HTMLElement = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + rezeptArray[i].zubereitung;
            div.appendChild(zubereitung);

            let autor: HTMLElement = document.createElement("p");
            autor.innerHTML = "Autor: " + rezeptArray[i].autor;
            div.appendChild(autor);

            let buttonEdit: HTMLElement = document.createElement("button");
            buttonEdit.innerHTML = "bearbeiten";
            buttonEdit.classList.add("buttonRezepte");
            div.appendChild(buttonEdit);
            buttonEdit.addEventListener("click", handleRezeptBearbeiten);

            let buttonDelete: HTMLElement = document.createElement("button");
            buttonDelete.innerHTML = "löschen";
            buttonDelete.classList.add("buttonRezepte");
            div.appendChild(buttonDelete);
            buttonDelete.addEventListener("click", handleRezeptLoeschen);
        }
    }

    async function handleRezeptLoeschen(_event: Event): Promise<void> {

        let i: string = (<HTMLElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("counter")!;
        document.getElementById("currentRecipeDiv" + i)?.remove();

        /* let _url: string = "https://gis-pruefung-2021.herokuapp.com";*/
        let _url: string = "http://localhost:8100";
        _url += "/deleteMyRecipe" + "?" + "counter=" + i;
        await fetch(_url);
    }


    async function handleRezeptBearbeiten(_event: Event): Promise<void> {

        for (let i: number = 0; i < 5; i++) {
            let zutatenliste: HTMLInputElement = document.createElement("input");
            zutatenliste.setAttribute("type", "text");
            zutatenliste.value = "abc"; 
   
            document.getElementById("zutatenlisteEdit1").appendChild(zutatenliste);
        }

        for (let i: number = 5; i < 10; i++) {
            let zutatenliste: HTMLInputElement = document.createElement("input");
            zutatenliste.setAttribute("type", "text");
            document.getElementById("zutatenlisteEdit2").appendChild(zutatenliste);
            zutatenliste.value = "abc";
        }

        let zubereitung: HTMLTextAreaElement = document.createElement("textarea");
        zubereitung.setAttribute("type", "text");
        document.getElementById("zubereitungEdit").appendChild(zubereitung);
        zubereitung.id = "zubereitung";
        zubereitung.value = "abc";
     

        let buttonUpdate: HTMLElement = document.createElement("button");
        buttonUpdate.innerHTML = "aktualisieren";
        document.getElementById("editRecipes").appendChild(buttonUpdate);
        buttonUpdate.id = "buttonUpdate";


        for (let i: number = 0; i < rezeptArray.length; i++) {
    
            let zutaten: HTMLElement = document.getElementById("zutaten");
      
    
            let zubereitung: HTMLElement = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + localStorage.getItem("zubereitung" + i);
            div.appendChild(zubereitung);
    
            let autor: HTMLElement = document.createElement("p");
            autor.innerHTML = "Autor: " + localStorage.getItem("autor" + i);
            div.appendChild(autor);
    
            let button: HTMLElement = document.createElement("button");
            button.innerHTML = "entfernen";
            button.classList.add("buttonRezepte");
            div.appendChild(button);
            button.addEventListener("click", handleDelete);
        }

    }
}
