import { TIME_AMPLIFIER } from "../config.js";

class allPostsView {
  _parentElement = document.querySelector("main");

  uniqueRender(data) {
    this._data = data;
    this._generatePosts();
  }

  _generatePosts() {
    const postPictureArr = Object.entries(this._data);

    postPictureArr.forEach((post, i) => {
      const markup = `
          <section data-postnum = "${i}" class="post post-${i}"></section>
          `;

      // Insert the first post before the "suggestions box"
      if (i === 0)
        this._parentElement.firstElementChild.insertAdjacentHTML(
          "afterend",
          markup
        );
      // Insert all posts besides the first one after the "suggestions box"
      else this._parentElement.insertAdjacentHTML("beforeend", markup);
    });
  }

  createPostObjects(someClass) {
    const postPictureArr = Array.from(
      this._parentElement.querySelectorAll(".post")
    );
    const arrayOfClasses = postPictureArr.map((post) => new someClass(post));
    return arrayOfClasses;
  }

  updatePostTimes(timeArr) {
    const allPosts = Array.from(this._parentElement.querySelectorAll(".post"));
    timeArr.forEach(
      (time, i) =>
        (allPosts[i].querySelector(".date-posted").textContent = time)
    );
  }
}

export default new allPostsView();
