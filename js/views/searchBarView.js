"use strict";

const searchBar = document.querySelector(".search-bar");
const closeBtn = document.querySelector(".close-icon");
const searchBtn = document.querySelector(".search-icon");

class SearchBarView {
  // Clicking inside of the search bar (activating the input field)
  addHandlerSearch() {
    searchBar.addEventListener("click", function () {
      searchBtn.classList.add("hidden");
      closeBtn.classList.remove("hidden");
      searchBar.placeholder = "Search";
      searchBar.style.padding = "0 0 0 2.4rem";
    });
    // Deactivaing the input field
    window.addEventListener("click", function (e) {
      if (e.target.classList.contains("search-bar")) return;
      searchBtn.classList.remove("hidden");
      closeBtn.classList.add("hidden");
      searchBar.style.padding = "0 0 0 4.8rem";
    });
  }
}

export default new SearchBarView();
