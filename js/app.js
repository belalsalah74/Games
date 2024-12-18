import Request from "./request.js";
import Ui from "./ui.js";

export default class App {
  static #request = new Request();
  static #ui = new Ui();
  static #baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api/";
  static #options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "923d006a52msh5a31f2d37441848p14843djsnbd98e20d5b0c",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  async start() {
    App.#ui.addSpinner();
    const data = await App.#request.getData(
      `${App.#baseUrl}games`,
      App.#options
    );
    App.#ui.displayAll(data);
    this.#handleDetails();
    this.#handleCategory();
  }

  #handleDetails() {
    document.querySelectorAll(".card").forEach((el) => {
      el.addEventListener("click", async () => {
        App.#ui.addSpinner();
        let id = el.dataset["id"];
        try {
          const data = await App.#request.getGame(
            App.#baseUrl,
            id,
            App.#options
          );
          App.#ui.displayGameDetails(data);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  #handleCategory() {
    document.querySelectorAll(".nav-link").forEach((el) =>
      el.addEventListener("click", async (e) => {
        App.#ui.addSpinner();
        let data;
        if (el.dataset["genre"] === "all") {
          data = await App.#request.getData(
            `${App.#baseUrl}games`,
            App.#options
          );
        } else {
          data = await App.#request.getData(
            `${App.#baseUrl}games?category=${el.dataset["genre"]}`,
            App.#options
          );
        }
        App.#ui.displayAll(data);
        document.querySelector(".navbar-collapse").classList.remove("show");
      })
    );
  }
}
