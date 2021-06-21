namespace pruefungsabgabe {


let publishButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("publish");
publishButton.addEventListener("click", handlePublishRecipes);

async function handlePublishRecipes(): Promise<void> {

    let formData: FormData = new FormData(document.forms[0]);
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    /* let url: string = "https://gis-pruefung-2021.herokuapp.com";*/
    let _url: string = "http://localhost:8100";
    _url += "/publishRecipes" + "?" + query.toString();
    await fetch(_url);

}
}