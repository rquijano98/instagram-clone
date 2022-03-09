import { Views } from "./Views.js";

class SuggestionView extends Views {
  _parentElement = document.querySelector(".suggestion-card-list");
  _grandparentElement = document.querySelector(".suggestion-container");

  _generateMarkup(additionalData) {
    const markup =
      `<li> <span class = 'blank-space blank-space-1'></span></li>` +
      this._data
        .map(
          (user) => `<li class="suggestion-card">
      <ion-icon name="close-outline" class="hide-card"></ion-icon>
      <img src = "${user.picture.medium}">
      
      <div class="suggestion-card-text-container">
        
        <p class="suggestion-username">${user.login.username}</p>
        <p class="suggestion-followed-by">Suggested for you</p>
      </div>
      <button class="suggestion-follow">Follow</button>
      </li>`
        )
        .join("") +
      `<li> <span class = 'blank-space blank-space-2'></span></li> `;

    return markup;
  }

  addMarkupJS() {
    this._closeCard();
    this._clickFollow();
    this._createObserver();
    this._clickArrows();

    // Makes it so there are is no scrolling in place if you start with 3 cards or less
    if (this._data.length <= 3) this._removeScrolling();
  }

  _closeCard() {
    const allCards = Array.from(this._parentElement.children);

    const callback = function (e) {
      if (!e.target.classList.contains("hide-card")) return;

      // Declares variable for the card that had its X button clicked
      const clickedCard = e.target.closest(".suggestion-card");

      // Adds the transition class to every card, which will allow for proper animations when cards are closed
      allCards.forEach((cardEl) => cardEl.classList.add("transition"));

      // Adds the 'clicked' class just to the card whose X was clicked
      clickedCard.classList.add("clicked");

      // This chunk of code finds the index of the card that was closed; it then moves every card to the right of it to the left by 210px
      const clickedCardIndex = allCards.findIndex(
        (cardEl) => cardEl === clickedCard
      );
      for (let i = clickedCardIndex; i < allCards.length; i++) {
        allCards[i].style.transform = "translateX(-21rem)";
      }

      // This timeout does 3 things after 0.5 seconds (chose this value because that is how long the sliding of the cards from right to left takes):
      // 1. Removes the transition class from all cards, because an animation is NOT wanted during the next 3 steps
      // 2. Translates all cards back to their "original" positions
      // 3. Sets display of the clicked card to none so that it no longer takes up space in the list of cards
      setTimeout(() => {
        allCards.forEach((cardEl) => {
          cardEl.classList.remove("transition");
          cardEl.style.transform = "translateX(0)";
        });
        clickedCard.style.display = "none";
      }, 500);

      // This will make it so that scrolling is disabled if there are 3 or less cards. I had to set my accumulator as allCards.length -2 because allCards actually is an array that also contains .blank-space-1 and .blank-space-2

      const remainingCards = allCards.reduce((acc, card) => {
        // console.log(remainingCards);
        if (card.classList.contains("clicked")) return acc - 1;
        return acc;
      }, allCards.length - 2);

      if (remainingCards <= 3) this._removeScrolling();
    };

    this._parentElement.addEventListener("click", callback.bind(this));
  }

  _clickFollow() {
    this._parentElement.addEventListener("click", function (e) {
      const followBtn = e.target.closest(".suggestion-follow");
      if (!followBtn) return;

      followBtn.textContent = "Requested";
      followBtn.classList.add("clicked");
    });
  }

  _createObserver() {
    const observerFunction = function (entries) {
      // if (entries[0].isIntersecting) return;
      console.log("hello");

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
      threshold: 0.1,
      rootMargin: "0px 10px 0px 10px",
    };

    const storiesObserver = new IntersectionObserver(
      observerFunction.bind(this),
      observerOptions
    );

    storiesObserver.observe(this._parentElement.firstElementChild);
    storiesObserver.observe(this._parentElement.lastElementChild);
  }

  _clickArrows() {
    const callback = function (e) {
      this._parentElement.scrollBy({
        left:
          e.target === this._grandparentElement.querySelector(".left-arrow")
            ? -(this._grandparentElement.offsetWidth - 23)
            : this._grandparentElement.offsetWidth - 23,
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

  _removeScrolling() {
    this._parentElement.style.overflow = "hidden";

    Array.from(this._grandparentElement.querySelectorAll(".arrow")).forEach(
      (arrow) => (arrow.style.display = "none")
    );
  }
}

export default new SuggestionView();
