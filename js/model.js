import { QUANTITY_OF_USERS, API_URL, MAX_PICS_PER_POST } from "./config.js";

export const state = {
  users: {
    totalUsers: {},
    storyUsers: {},
    postUsers: {},
    suggestionUsers: {},
    asideUsers: {},
  },
  userQuantity: QUANTITY_OF_USERS,

  pictures: {
    allPics: {},
    postPics: {},
  },
};

// Load all users from API and put them in the state
export const loadUsers = async function () {
  try {
    const res = await fetch(`${API_URL}?results=${QUANTITY_OF_USERS}`);

    const { results } = await res.json();

    state.users.totalUsers = results;
  } catch (err) {
    throw err;
  }
};

const userShuffler = function (arr) {
  let randomIndex;
  for (let currIndex = arr.length - 1; currIndex > 0; currIndex--) {
    randomIndex = Math.floor(Math.random() * currIndex);

    [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]];
  }
  return arr;
};

// Separate the users in the state into different categories for the different sections

export const separateUsersIntoCategories = function (
  users,
  numStoryUsers = users.length * 0.5,
  numAsideUsers = 6
) {
  const totalUsersCopy = [...users];

  state.users.storyUsers = totalUsersCopy.splice(0, numStoryUsers);

  // This is done so that the order in which the users' posts show in the feed isnt exactly the same as the order of their stories;
  // This is because on actaul Instagram, the order of your friends' posts in your feed and the order of their stories is not the same
  state.users.postUsers = userShuffler([...state.users.storyUsers]);

  state.users.asideUsers = totalUsersCopy.splice(0, numAsideUsers);
  state.users.suggestionUsers = totalUsersCopy;
};

// Load 30 pictures into state
export const getPics = async function () {
  try {
    const res = await fetch("https://picsum.photos/v2/list?page=1");
    const data = await res.json();

    state.pictures.allPics = data;
  } catch (err) {
    throw err;
  }
};

// Divide the pictures randomly into different posts
export const delegatePics = function () {
  const randomInt = (min = 1, max = MAX_PICS_PER_POST) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  let picturesUsed = 0;
  let postsCreated = 1;

  // This while loop will create new properties within the state.pictures property; these new properties will represent 1 post each, and have a random number of pictures in them
  while (picturesUsed <= state.pictures.allPics.length - 5) {
    const picturesForThisPost = randomInt();
    state.pictures.postPics[`postPics${postsCreated}`] =
      state.pictures.allPics.slice(
        picturesUsed,
        picturesUsed + picturesForThisPost
      );
    picturesUsed += picturesForThisPost;
    postsCreated++;
  }

  // This will create the last "picsPost" property; the reason it had to be done this way is because above, the loop can end with either 5/4/3/2/or 1 pic that has not yet been used; this line
  // Will use any last pictures that have not been used
  state.pictures.postPics[`postPics${postsCreated}`] =
    state.pictures.allPics.slice(picturesUsed);
};

// This function is going to return an array of 3 unique but randomly chosen users from whichever array of users is passed into it
export const pullRandomUsers = function (users) {
  const randomNumberOfUsers = Math.floor(Math.random() * 4);

  const randomUsers = [];

  for (let i = 1; i <= randomNumberOfUsers; i++) {
    const randomUserIndex = Math.floor(Math.random() * (users.length - 1)) + 1;

    const randomUser = users[randomUserIndex];

    if (
      !randomUsers.some((userAlreadyChosen) => userAlreadyChosen === randomUser)
    )
      randomUsers.push(randomUser);
  }
  return randomUsers;
};
