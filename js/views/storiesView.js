import { Views } from "./Views.js";

class StoriesView extends Views {
  _grandparentElement = document.querySelector(".stories-container"); //Needed to make because some methods require the parent element of the stories, which is <ul>, and others require the container element, whic his a <div>

  _parentElement = document.querySelector(".stories-list");

  _generateMarkup() {
    if (this._data.length <= 7) this._disableArrow();

    const markup =
      `<span class = 'blank-space blank-space-1'></span> ` +
      this._data
        .map((user) => {
          return `
      <li class="story user-${user.login.uuid}" data-id="${user.login.uuid}" >
        <span  class="profile-pic-container story-profile-pic-container">
          <img src = '${user.picture.medium}'/>
        </span>
    
       <span class="username">${user.login.username}</span>
      </li>
    `;
        })
        .join(" ") +
      `<span class = 'blank-space blank-space-2'></span>`;

    return markup;
  }

  createObserver() {
    const observerFunction = function (entries) {
      // if (entries[0].isIntersecting) return;
      if (entries[0].target === this._parentElement.firstElementChild)
        this._grandparentElement
          .querySelector(".left-arrow")
          .classList.toggle("hidden");
      if (entries[0].target === this._parentElement.lastElementChild)
        this._grandparentElement
          .querySelector(".right-arrow")
          .classList.toggle("hidden");
    };

    const observerOptions = {
      root: this._grandparentElement,
      threshold: 0.5,
      rootMargin: "8px",
    };

    const storiesObserver = new IntersectionObserver(
      observerFunction.bind(this),
      observerOptions
    );

    storiesObserver.observe(this._parentElement.firstElementChild);
    storiesObserver.observe(this._parentElement.lastElementChild);
  }

  clickStory() {
    this._parentElement.addEventListener("click", function (e) {
      // Set the clicked element to storyEl
      const clickedEl = e.target;
      const storyEl = clickedEl.closest(".story");
      if (!storyEl) return;

      // This chunk of code will remove the colorful border from EVERY icon of ONE particular user after that icon is clicked in any location
      const clickedID = storyEl.dataset.id;

      Array.from(document.querySelectorAll(`.user-${clickedID}`)).forEach(
        (el) => el.classList.add("clicked")
      );
    });
  }

  clickArrows() {
    const callback = function (e) {
      console.log(e);
      this._parentElement.scrollBy({
        left:
          e.target === this._grandparentElement.querySelector(".left-arrow")
            ? -360
            : 360,
        behavior: "smooth",
      });
    };

    this._grandparentElement
      .querySelector(".left-arrow")
      .addEventListener("click", callback.bind(this));
    this._grandparentElement
      .querySelector(".right-arrow")
      .addEventListener("click", callback.bind(this));
  }

  _disableArrow() {
    this._grandparentElement
      .querySelector(".right-arrow")
      .classList.add("hidden");
  }
}

export default new StoriesView();
