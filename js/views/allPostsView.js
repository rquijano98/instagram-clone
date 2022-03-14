import { Views } from "./Views.js";

class allPostsView extends Views {
  _parentElement = document.querySelector("main");

  uniqueRender(data) {
    this._data = data;
    this._generatePosts();
    this._fillPosts();
  }

  _generatePosts() {
    const postPictureArr = Object.entries(this._data.pictures.postPics);

    console.log(postPictureArr);

    const markup = postPictureArr
      .map(
        (post, i) =>
          `
    <section class="post post-${i}">yo</section>
    `
      )
      .join("");

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _fillPosts() {
    const postPictureArr = Object.entries(this._data.pictures.postPics);
  }
}

export default new allPostsView();
