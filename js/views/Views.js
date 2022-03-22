export class Views {
  _data;

  render(data, additionalData = "") {
    this._data = data;
    const markup = this._generateMarkup(additionalData);

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _addLink(element) {
    element.addEventListener("click", function (e) {
      // This guard clause exists SPECIFICALLY for the suggestion section (not the aside section); this makes it so that if you hit the large blue follow button or the X button, you do not get redirected to the top of the page
      if (
        e.target.classList.contains("suggestion-follow") ||
        e.target.classList.contains("hide-card")
      )
        return;

      const url = window.location.origin + "/#";
      window.location.href = url;
    });
  }
}
