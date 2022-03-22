import { Views } from "./Views.js";

class headerView extends Views {
  _searchBar = document.querySelector(".search-bar");
  _closeBtn = document.querySelector(".close-icon");
  _searchBtn = document.querySelector(".search-icon");

  addMarkupJS() {
    this._addSearchJS();

    // Makes it so clicking on any of the icons in the navigation brings you back to the top of the page
    Array.from(document.querySelectorAll(".icon-container")).forEach((icon) =>
      this._addLink(icon)
    );

    this._addLink(document.querySelector(".first-half"));
  }

  // Clicking inside of the search bar (activating the input field)
  _addSearchJS() {
    const callback1 = function () {
      this._searchBtn.classList.add("hidden");
      this._closeBtn.classList.remove("hidden");
      this._searchBar.placeholder = "Search";
      this._searchBar.style.padding = "0 0 0 1.6rem";
      this._searchBar.classList.add("clicked");
    };
    this._searchBar.addEventListener("click", callback1.bind(this));

    // Deactivaing the input field
    const callback2 = function (e) {
      if (e.target.classList.contains("search-bar")) return;
      this._searchBtn.classList.remove("hidden");
      this._closeBtn.classList.add("hidden");
      this._searchBar.style.padding = "0 0 0 4rem";
      this._searchBar.classList.remove("clicked");
    };
    window.addEventListener("click", callback2.bind(this));
  }
}

export default new headerView();
