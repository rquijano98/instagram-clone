import searchBarView from "./views/searchBarView.js";
import storiesView from "./views/storiesView.js";
import * as model from "./model.js";

const init = function () {
  searchBarView.addHandlerSearch();
  model.loadUsers();
};

const init2 = async function () {
  await model.loadUsers();

  storiesView.render(model.state.users);
};

init();
init2();
