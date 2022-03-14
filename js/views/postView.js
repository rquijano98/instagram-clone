import { Views } from "./Views.js";

import {
  WORDS_PER_COMMENT,
  YOUR_PERSONAL_USERNAME,
  MAXIMUM_ADDITIONAL_COMMENTS_PER_POST,
  MINIMUM_ADDITIONAL_COMMENTS_PER_POST,
  MAXIMUM_ADDITIONAL_LIKES_PER_POST,
} from "../config.js";

// import { loremIpsum } from "lorem-ipsum";

class PostView extends Views {
  _parentElement = document.querySelector(".post");

  _generateMarkup(additionalUsers) {
    console.log(this._data);

    const numberOfAdditionalLikes = this._generateNumber(
      // Having the minimum additional likes be the additionalusers length + 1 will: 1) make it so there is at least 1 like per post, and 2) make it so that you won't ever have a situation where there are 0 additional likes AND multiple different profile pictures in the "Liked by" section; situation 1 (1 like per post) is because currently, this code does not properly function if a post does not have at least 1 like; situation 2 exists to prevent a situation that would never happen on actual instagram
      additionalUsers.length + 1,
      additionalUsers.length + MAXIMUM_ADDITIONAL_LIKES_PER_POST + 1
    );
    const numberOfComments = this._generateNumber(
      MINIMUM_ADDITIONAL_COMMENTS_PER_POST,
      MAXIMUM_ADDITIONAL_COMMENTS_PER_POST
    );

    const markup =
      `
    <header class="title-bar">
      <span data-id="${this._data.users.postUsers[0].login.uuid}" class="profile-picture-container user-${this._data.users.postUsers[0].login.uuid}"><img src = "${this._data.users.postUsers[0].picture.thumbnail}"/></span>
      <span class="post-username">${this._data.users.postUsers[0].login.username}</span>
      <ion-icon name="ellipsis-horizontal" class="dots-icon"></ion-icon>
    </header>
    <div class="img-container">
      <ion-icon name="chevron-back-circle" class = "left-arrow arrow"></ion-icon>
      <ion-icon name="chevron-forward-circle" class="right-arrow arrow"></ion-icon>
      <ul class="post-image-list">` +
      this._data.pictures.postPics.postPics1
        .map(
          (pic) => `<li><img class="post-img" src="${pic.download_url}" /></li>`
        )
        .join("") +
      `  </ul>
    </div>
    <div class="utilities-bar">
      <div class="utility-icons">
        <ion-icon class="heart-icon" name="heart-outline"></ion-icon>
        <ion-icon name="chatbubble-outline"></ion-icon>
        <ion-icon name="paper-plane-outline"></ion-icon>
      </div>

    <div class="dots">` +
      (this._data.pictures.postPics.postPics1.length > 1
        ? this._data.pictures.postPics.postPics1
            .map((_, i) => `<div data-dot="${i}" class="dot dot-${i}"></div>`)
            .join("")
        : "") +
      `</div>
    <ion-icon name="bookmark-outline"></ion-icon>
    </div> 
    <div class="comments-and-likes">
      <div class="liked-by-container">
        <div class="images-portion ${
          additionalUsers.length === 0 ? "hidden" : ""
        }">` +
      (additionalUsers.length > 0
        ? additionalUsers
            .map(
              (user) => `
          <img src="${user.picture.thumbnail}"/>
          `
            )
            .join("")
        : "") +
      (additionalUsers.length > 0
        ? `
        </div>
      <p class="text-portion">Liked by <a href="#" class="user-who-liked">${
        additionalUsers[0].login.username
      }</a> and <a href="#" class="others-who-liked">${numberOfAdditionalLikes} other${
            numberOfAdditionalLikes > 1 ? "s" : ""
          }</a> </p>
        
        `
        : `
        </div>
        <p class="text-portion"><a href = "#" class="others-who-liked total-likes">${numberOfAdditionalLikes} like${
            numberOfAdditionalLikes > 1 ? "s" : ""
          }</a></p>

        `) +
      `</div>

      <div class="comments-container">
        <p class="comment"><a href="#" class="user-commenter">${
          this._data.users.postUsers[0].login.username
        }</a> Lorem ipsum </p>
        <a href="#" class="view-remaining-comments ${
          numberOfComments === 0 ? "hidden" : ""
        }">View ${
        numberOfComments > 1 ? `all ${numberOfComments} comments` : "1 comment"
      }</a>
      </div>
      <a href="#" class="date-posted">15 hours ago</a>
    </div>
    <div class="hidden feedback-bar">

      <div class="emoji-container">
        <span class="coming-soon">Coming soon.. emojis to add to your comments :)</span>
      </div>
      <span class="mini-square"></span>

      <ion-icon class="happy-icon" name="happy-outline"></ion-icon>
      <form>
        <span class="textarea" role="textbox" contenteditable></span>
        <button>Post</button>
      </form>
    </div> 
    `;

    return markup;
  }

  addMarkupJS() {
    this._clickArrows();
    this._createObservers();
    this._clickStory();
    this._addComment();
    this._seeMoreHandler();
    this._addScrollToTextArea();
    this._clickEmoji();
    this._likePost();
    // this._getInputWidth();
    // this._expandInputHeight();
  }

  _createObservers() {
    const observerFunction = function (entries) {
      // if (entries[0].isIntersecting) return;

      if (
        entries[0].target ===
        this._parentElement.querySelector(".post-image-list").firstElementChild
      )
        this._parentElement
          .querySelector(".left-arrow")
          .classList.toggle("hidden");
      if (
        entries[0].target ===
        this._parentElement.querySelector(".post-image-list").lastElementChild
      )
        this._parentElement
          .querySelector(".right-arrow")
          .classList.toggle("hidden");
    };

    const observerOptions = {
      root: this._parentElement,
      threshold: 0.97,
      // rootMargin: "1px",
    };

    const storiesObserver = new IntersectionObserver(
      observerFunction.bind(this),
      observerOptions
    );

    storiesObserver.observe(
      this._parentElement.querySelector(".post-image-list").firstElementChild
    );
    storiesObserver.observe(
      this._parentElement.querySelector(".post-image-list").lastElementChild
    );

    // This will be the observer function that will turn certain dots blue depending on which image in the image list that is currently in the view
    const observerFunction2 = function (entries) {
      // This will loop through every entry created by the observer function when half of a picture comes into view
      entries.forEach((entry) => {
        // This will make it so that this code only gets executed for the observer entry of the picture that has at least half of itself in view
        if (entry.isIntersecting) {
          // This will find WHICH image in the list of images corresponds to the observer entry's target
          const imageNumber = Array.from(
            this._parentElement.querySelector(".post-image-list").children
          ).findIndex((child) => child === entry.target);

          // This will add a class called active to the dot that corresponds with the image in view; this also removes the active class from all other dots
          Array.from(this._parentElement.querySelectorAll(".dot")).forEach(
            (dot) => dot.classList.remove("active")
          );
          this._parentElement
            .querySelector(`.dot-${imageNumber}`)
            ?.classList.add("active");
        }
      });

      // if(isIntersecting)
    };

    const observerOptions2 = {
      root: this._parentElement,
      threshold: 0.5,
    };

    const dotActivatingObserver = new IntersectionObserver(
      observerFunction2.bind(this),
      observerOptions2
    );

    // This will make the observer observe every picture in the picture list
    Array.from(
      this._parentElement.querySelector(".post-image-list").children
    ).forEach((pic) => dotActivatingObserver.observe(pic));
  }

  _clickArrows() {
    const imageWindow = this._parentElement.querySelector(".post-image-list");

    const callback = function (e) {
      console.log(e);
      imageWindow.scrollBy({
        left:
          e.target === this._parentElement.querySelector(".left-arrow")
            ? -imageWindow.offsetWidth
            : imageWindow.offsetWidth,
        behavior: "smooth",
      });
    };

    this._parentElement
      .querySelector(".left-arrow")
      .addEventListener("click", callback.bind(this));
    this._parentElement
      .querySelector(".right-arrow")
      .addEventListener("click", callback.bind(this));
  }

  _clickStory() {
    this._parentElement.addEventListener("click", function (e) {
      // Set the clicked element to storyEl
      const clickedEl = e.target;
      const posterEl = clickedEl.closest(".profile-picture-container");
      if (!posterEl) return;

      console.log("hello");

      // This chunk of code will remove the colorful border from EVERY icon of ONE particular user after that icon is clicked in any location
      const clickedID = posterEl.dataset.id;

      Array.from(document.querySelectorAll(`.user-${clickedID}`)).forEach(
        (el) => el.classList.add("clicked")
      );
    });
  }

  _likePost() {
    const heart = this._parentElement.querySelector(".heart-icon");

    const likesEl = this._parentElement.querySelector(".others-who-liked");

    heart.addEventListener("click", function () {
      if (heart.getAttribute("name") === "heart-outline") {
        heart.setAttribute("name", "heart");

        // This handles the animation of the heart
        //////////////////////////////////////////
        heart.classList.add("clicked", "grown");
        setTimeout(() => heart.classList.remove("grown"), 100);
        //////////////////////////////////////////

        // This handles updating the like count
        //////////////////////////////////////////
        const likesElContent = likesEl.textContent.split(" ");

        const oldLikeAmount = +likesElContent[0];
        const newLikeAmount = oldLikeAmount + 1;

        // This will make sure that the word that comes after the number gets pluralized if the number goes from 1 to 2
        const secondWord =
          oldLikeAmount === 1 ? likesElContent[1] + "s" : likesElContent[1];

        likesEl.textContent = `${newLikeAmount} ${secondWord}`;
        //////////////////////////////////////////
      } else {
        heart.setAttribute("name", "heart-outline");
        heart.classList.remove("clicked");

        // This handles updating the like count
        //////////////////////////////////////////
        const likesElContent = likesEl.textContent.split(" ");

        const oldLikeAmount = +likesElContent[0];
        const newLikeAmount = oldLikeAmount - 1;

        const secondWord =
          oldLikeAmount === 2
            ? likesElContent[1].replace("s", "")
            : likesElContent[1];

        likesEl.textContent = `${newLikeAmount} ${secondWord}`;

        //////////////////////////////////////////
      }
    });
  }

  _addComment() {
    const commentBar = this._parentElement.querySelector("form");
    const commentInput = this._parentElement.querySelector(".textarea");

    // THIS FUNCTION IS NOT COMPLETE
    const callbackForPressingPost = function (e) {
      e.preventDefault();
      const newCommentHTML = `
      <p class="comment"><a href="#" class="user-commenter">${YOUR_PERSONAL_USERNAME}</a> ${commentInput.textContent}</p>
      `;

      if (commentInput.textContent) {
        this._parentElement
          .querySelector(".comments-container")
          .insertAdjacentHTML("beforeend", newCommentHTML);
      }

      const newComment = this._parentElement.querySelector(
        ".comments-container"
      ).lastElementChild;

      this._seeMoreHandler(newComment);

      commentInput.textContent = "";
      commentBar.querySelector("button").classList.remove("active-button");
    };

    // THis will be the callback function for pressing enter in the textarea; it essentially just calls the callback for pressing the post button, but it only does so when enter is pressed
    const callbackForPressingEnter = function (e) {
      if (e.key === "Enter") callbackForPressingPost.call(this, e);
    };

    // The event listeners for either:

    // Pressing the post button
    commentBar.addEventListener("submit", callbackForPressingPost.bind(this));

    // Pressing enter within the textarea
    commentInput.addEventListener(
      "keydown",
      callbackForPressingEnter.bind(this)
    );

    commentInput.addEventListener("input", function (e) {
      if (commentInput.textContent)
        this.parentElement.lastElementChild.classList.add("active-button");
      if (!commentInput.textContent)
        this.parentElement.lastElementChild.classList.remove("active-button");
    });
  }

  _seeMoreHandler(
    comment = this._parentElement.querySelector(".comments-container")
      .firstElementChild
  ) {
    // Get the username of the comment
    const username = comment.firstElementChild?.textContent;

    // Get the actual comment itself
    const commentText = comment.lastChild?.textContent;

    if (commentText.length > WORDS_PER_COMMENT) {
      const usernameHTML = `<a href="#" class="user-commenter">${username}</a>`;

      const firstPortionOfTextHTML = `<span class = "first-part">${commentText.slice(
        0,
        WORDS_PER_COMMENT
      )}</span>`;
      const secondPortionOfTextHTML = `<span class="second-part">${commentText.slice(
        WORDS_PER_COMMENT
      )}</span>`;

      const entireCommentHTML =
        usernameHTML +
        firstPortionOfTextHTML +
        `<span class="more"> ... <span class="the-word-more">more</span></span>` +
        secondPortionOfTextHTML;

      comment.innerHTML = "";
      comment.insertAdjacentHTML("afterbegin", entireCommentHTML);
    }

    comment
      .querySelector(".the-word-more")
      ?.addEventListener("click", function () {
        comment.classList.add("more-clicked");
      });
  }

  _addScrollToTextArea() {
    const textarea = this._parentElement.querySelector(".textarea");

    textarea.addEventListener("input", function () {
      if (textarea)
        if (textarea.offsetHeight > 80) textarea.classList.add("maxheight");
        else textarea.classList.remove("maxheight");
    });
  }

  _clickEmoji() {
    let emojisHidden = true;

    const happyFace = this._parentElement.querySelector(".happy-icon");

    window.addEventListener("click", function (e) {
      if (emojisHidden && e.target === happyFace) {
        happyFace.parentElement.classList.remove("hidden");
        emojisHidden = false;
      } else {
        happyFace.parentElement.classList.add("hidden");
        emojisHidden = true;
      }
    });
  }

  _generateNumber(min, max) {
    const randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  }
}

export default new PostView();
