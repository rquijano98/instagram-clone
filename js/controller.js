import headerView from "./views/headerView.js";
import asideView from "./views/asideView.js";
import storiesView from "./views/storiesView.js";
import * as model from "./model.js";
import suggestionView from "./views/suggestionView.js";

// NOTE: PostView import is actually an import of the entire class, it is NOT an import of an instance of a class like all the other imports here
import { PostView } from "./views/postView.js";

import allPostsView from "./views/allPostsView.js";

const init = async function () {
  try {
    await model.getPics();
    model.delegatePics();

    await model.loadUsers();
    model.separateUsersIntoCategories(model.state.users.totalUsers);

    headerView.addMarkupJS();

    storiesView.render(model.state.users.storyUsers);
    storiesView.addMarkupJS();

    asideView.render(model.state.users.asideUsers);
    asideView.addMarkupJS();

    allPostsView.uniqueRender(model.state.pictures.postPics);
    // This passes the class PostView into the createPostObjects class instance method; the method returns an array of instances of the PostView class; this array is looped over, and the render method of each instance is called
    allPostsView.createPostObjects(PostView).forEach((post) => {
      post.render(
        model.state,
        model.pullRandomUsers(model.state.users.storyUsers)
      );

      post.addMarkupJS();
    });
    allPostsView.updatePostTimes(model.generateTimes());

    suggestionView.render(model.state.users.suggestionUsers);
    suggestionView.addMarkupJS();
  } catch (err) {
    console.error(err);
  }
};

init();
