import searchBarView from "./views/searchBarView.js";
import storiesView from "./views/storiesView.js";
import * as model from "./model.js";
import suggestionView from "./views/suggestionView.js";
import postView from "./views/postView.js";

const init = function () {
  searchBarView.addSearchJS();
  model.loadUsers();

  storiesView.clickStory();
  storiesView.clickArrows();
};

const init2 = async function () {
  try {
    await model.loadUsers();
    await model.getPics();

    model.separateUsersIntoCategories(model.state.users.totalUsers);
    model.delegatePics();

    storiesView.render(model.state.users.storyUsers);

    storiesView.createObserver();

    suggestionView.render(model.state.users.suggestionUsers);
    suggestionView.addMarkupJS();

    postView.render(
      model.state,
      model.pullRandomUsers(model.state.users.storyUsers)
    );
    postView.addMarkupJS();

    // suggestionView.createObserver();
  } catch (err) {
    console.error(`Oh no .. ${err}`);
  }
};

init();
init2();
