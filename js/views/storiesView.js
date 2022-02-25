import { Views } from "./Views.js";

class StoriesView extends Views {
  _parentElement = document.querySelector(".stories-container");

  _generateMarkup() {
    console.log(this._data);
    const markup = `
      <div class="story">
        <span class="profile-pic-container story-profile-pic-container">
          <img src="${this._data[0].picture.medium}"/>
        </span>
        <span class="username">${this._data[0].login.username}</span>
       </div>
    `;

    return markup;
  }
}

export default new StoriesView();
