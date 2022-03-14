export class Views {
  _data;

  render(data, additionalData = "") {
    this._data = data;
    const markup = this._generateMarkup(additionalData);

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
}
