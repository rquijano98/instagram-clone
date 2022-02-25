import { Views } from "./Views.js";

class StoriesView extends Views {
  _parentElement = document.querySelector(".stories-list");

  _generateMarkup() {
    console.log(this._data);

    const markup = this._data
      .map((user) => {
        return `
      <li class="story">
        <span class="profile-pic-container story-profile-pic-container">
          <img src = '${user.picture.medium}'/>
        </span>
    
       <span class="username">${user.login.username}</span>
      </li>
    `;
      })
      .join(" ");
    return markup;
  }
}

export default new StoriesView();
