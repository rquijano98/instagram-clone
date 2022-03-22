import { Views } from "./Views.js";
import {
  YOUR_PERSONAL_USERNAME,
  YOUR_PERSONAL_NAME,
  YOUR_PERSONAL_PROFILE_PICTURE,
} from "../config.js";

class AsideView extends Views {
  _parentElement = document.querySelector("aside");

  _generateMarkup() {
    const markup =
      `
      <div class="other-users-suggestions">
        <div class="suggestion-title">
          <p class="suggestion-title-text">Suggestions For You</p>
          <a href="#" class="suggestion-title-link">See All</a>
        </div>` +
      this._data
        .map(
          (user) =>
            `<div data-id="${user.login.uuid}" class="user-container" >
          <img src ="${user.picture.medium}" class="profile-picture suggestion-profile-picture"/>
          <div class="user-text-container">
            <a href="#" class="aside-username">${user.login.username}</a>
            <span class="aside-name">${user.name.first} ${user.name.last}</span>
          </div>
          <span href="#" class="follow-btn">Follow</span>
        </div>`
        )
        .join("") +
      `</div>`;
    return markup;
  }

  addMarkupJS() {
    this._fillInPersonalUserInfo();
    this._clickFollow();

    Array.from(this._parentElement.querySelectorAll("img")).forEach((img) =>
      this._addLink(img)
    );
  }

  _fillInPersonalUserInfo() {
    document.querySelector(".personal-username").textContent =
      YOUR_PERSONAL_USERNAME;
    document.querySelector(".personal-name").textContent = YOUR_PERSONAL_NAME;
  }

  _clickFollow() {
    this._parentElement.addEventListener("click", function (e) {
      const followBtn = e.target.closest(".follow-btn");
      if (!followBtn) return;
      followBtn.classList.toggle("clicked");

      if (!followBtn.classList.contains("clicked"))
        followBtn.textContent = "Follow";
      else followBtn.textContent = "Requested";
    });
  }
}

export default new AsideView();
