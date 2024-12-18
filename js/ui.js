class Modal {
  constructor() {
    this.modalEl = document.createElement("div");
    this.modalEl.classList.add("modal", "fade", "vw-100", "bg-dark");
    this.modalEl.id = "gameModal";
    this.modalEl.setAttribute("data-bs-backdrop", false);
    this.modalEl.innerHTML = `<div class="modal-dialog modal-fullscreen">
     <div class="modal-content border-0">
     <div class="container"></div>
     </div>
    </div>`;
    document.body.appendChild(this.modalEl);
    this.modal = new bootstrap.Modal(this.modalEl);
    this.modalEl.addEventListener("hidden.bs.modal", () => {
      this.modalEl.remove();
    });
  }

  addContent(content) {
    document.querySelector(".modal .container").innerHTML = content;
  }
}

export default class Ui {
  static #createMarkup() {
    document.body.innerHTML = `
    <header></header>
    <nav
      class="navbar bg-primary rounded-4 p-2 navbar-expand-lg shadow position-sticky top-0 z-2 col-10 mx-auto"
    >
      <div class="container-fluid">
        <a href="#" class="navbar-brand text-capitalize">
          <img src="./imgs/logo-sm.png" alt="logo" />
          game reviews </a
        ><button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav ms-auto"
             role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active link-light text-capitalize"
                role="button"
                data-bs-toggle="tab" 
                data-genre="all"
                >all</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link-light text-capitalize" role="button"
              data-bs-toggle="tab" 
              data-genre="mmorpg"
                >mmorpg</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link-light text-capitalize" role="button"
              data-bs-toggle="tab" 
              data-genre="shooter"
                >shooter</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link-light text-capitalize" role="button"
              data-bs-toggle="tab" 
              data-genre="strategy"
                >strategy</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link-light text-capitalize" role="button"
              data-bs-toggle="tab" 
              data-genre="fighting"
                >fighting</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link-light text-capitalize" role="button"
              data-bs-toggle="tab" 
              data-genre="sports"
                >sports</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link-light text-capitalize" role="button"
              data-bs-toggle="tab" 
              data-genre="social"
                >social</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section class="mt-5 py-5">
      <div class="container">
            <div class="row flex-wrap g-4">
            </div>
      </div>
    </section>

   
    `;
  }

  constructor() {
    Ui.#createMarkup();
    this.gamesRow = document.querySelector(".row");
  }

  addSpinner() {
    this.spinnerHolder = document.createElement("div");
    this.spinnerHolder.classList.add(
      "spinner-holder",
      "position-absolute",
      "top-0",
      "bottom-0",
      "start-0",
      "end-0",
      "z-3",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "bg-dark",
      "bg-opacity-75"
    );
    this.spinnerHolder.innerHTML = `  <div class="spinner-border text-info">
         <span class="visually-hidden">Loading...</span>
       </div>`;

    document.body.prepend(this.spinnerHolder);
  }

  displayAll(data) {
    this.gamesRow.innerHTML = "";
    if (!data.message) {
      data.forEach((game) => {
        this.gamesRow.innerHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3">
              <div class="card rounded-3 border border-black border-opacity-25 p-1 h-100" data-id="${game.id}">
                <div class="card-body mb-4">
                    <img src="${game.thumbnail}" class="card-img img-fluid mb-3" />
                    <div class="d-flex justify-content-between      align-items-baseline mb-3">
                      <h2 class="text-white small">${game.title}</h2>
                      <button class="btn btn-primary small">Free</button>
                  </div>
                  <p class="text-secondary-emphasis card-text mb-2 small">
                    ${game.short_description}
                  </p>
                </div>
                <div class="d-flex justify-content-between mb-3 px-2">
                  <span class="badge p-2 bg-body-tertiary text-uppercase small">
                    ${game.genre}
                  </span>
                  <span class="badge p-2 bg-body-tertiary small">${game.platform}</span>
                </div>
            </div>
            </div>
             `;
      });
    } else {
      this.gamesRow.innerHTML = `<div class="col">
        <p class="h3 text-center">Something went wrong please try again</p>
      </div>`;
    }

    this.spinnerHolder.remove();
  }
  createModal(content) {
    this.modal = new Modal();
    this.modal.addContent(content);
  }
  displayGameDetails(game) {
    this.createModal(` 
      <div class="modal-header border-0">
        <h1 class="modal-title fs-5" id="gameModalLabel">
          Game Details
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <figure class="col-md-4">
            <img src="${game.thumbnail}" class="w-100 mb-3 mb-md-0" />
          </figure>
          <div class="col-md-8 flex-grow-1">
            <h2 class="fs-4 mb-3">Title: ${game.title}</h2>
            <p class="mb-3">
              Category:
              <span class="badge bg-info small text-dark ms-2">
                ${game.genre}
              </span>
            </p>
            <p class="mb-3">
              Platform:
              <span class="badge bg-info small text-dark ms-2">
                ${game.platform}
              </span>
            </p>
            <p class="mb-3">
              Status:
              <span class="badge bg-info small text-dark ms-2">
                ${game.status}
              </span>
            </p>
            <p class="mb-3">${game.description}</p>
            <a
              href="${game.game_url}"
              target="_blank"
              class="btn btn-outline-warning"
            >
              Show Game
            </a>
 
        </div>
      </div>
    </div>`);
    this.modal.modal.show();
    this.spinnerHolder.remove();
  }
}
