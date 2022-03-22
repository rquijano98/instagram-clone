import {
  TOTAL_NUMBER_OF_PICTURES,
  USER_API,
  PICTURE_API,
  MAX_PICS_PER_POST,
  TIME_AMPLIFIER,
} from "./config.js";

export const state = {
  users: {
    totalUsers: {},
    storyUsers: {},
    postUsers: {},
    suggestionUsers: {},
    asideUsers: {},
  },

  pictures: {
    allPics: {},
    postPics: {},
  },
};

// Load all users from API and put them in the state
export const loadUsers = async function () {
  try {
    const res = await fetch(
      // THE REASON THAT THE NUMBER OF USERS FETCHED IS TWICE THE NUMBER OF POSTS CREATED BY THE PICTURES IS BECAUSE LATER IN THE CODE, I ASSIGN HALF OF ALL USERS FETCHED TO postUsers; this means that there will be exactly the same number of posts and postUsers, which is what is wanted
      `${USER_API}?results=${
        Object.entries(state.pictures.postPics).length * 2
      }`
    );

    const { results } = await res.json();

    state.users.totalUsers = results;
  } catch (err) {
    throw err;
  }
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

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
  numAsideUsers = 5
) {
  const totalUsersCopy = [...users];

  state.users.storyUsers = totalUsersCopy.splice(0, numStoryUsers);

  // This is done so that the order in which the users' posts show in the feed isnt exactly the same as the order of their stories;
  // This is because on actaul Instagram, the order of your friends' posts in your feed and the order of their stories is not the same
  state.users.postUsers = userShuffler([...state.users.storyUsers]);

  state.users.asideUsers = totalUsersCopy.splice(0, numAsideUsers);
  state.users.suggestionUsers = totalUsersCopy;
};

// Load pictures into state
export const getPics = async function () {
  try {
    const res = await fetch(
      // Using randomInt to decide what page from picsum.photos is chosen creates variability in the instagram page that gets generated
      // NOTE:Lorem Picsum API has a total of 993 pictures; it is made up of several pages, each page having 30 pictures by deault; for the best results, your first argument of randomInt should be 1, your second should be 10, and in the config.js file, TOTAL_NUMBER_OF_PICTURES should be no greater than 93
      `${PICTURE_API}list?page=${randomInt(
        1,
        10
      )}&limit=${TOTAL_NUMBER_OF_PICTURES}`
    );
    const data = await res.json();

    state.pictures.allPics = data;
  } catch (err) {
    throw err;
  }
};

// Divide the pictures randomly into different posts
export const delegatePics = function () {
  // const randomInt = (min = 1, max = MAX_PICS_PER_POST) =>
  //   Math.floor(Math.random() * (max + 1 - min) + min);

  let picturesUsed = 0;
  let postsCreated = 0;

  // This while loop will create new properties within the state.pictures property; these new properties will represent 1 post each, and have a random number of pictures in them
  while (picturesUsed < state.pictures.allPics.length - MAX_PICS_PER_POST) {
    const picturesForThisPost = randomInt(1, MAX_PICS_PER_POST);
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

export const generateTimes = function () {
  const posts = Array.from(document.querySelectorAll(".post"));

  // This will determine how many milliseconds apart the content of the posts were generated; this will then be multiplied by user determined TIME_AMPLIFIER; in this fictional Instagram feed, the product of those numbers will be how many hours ago a user made their post
  const postedSomeHoursAgo = posts
    .map((post) => post.dataset.time)
    .map((time, i, allTimes) => {
      const timeDiff = i === 0 ? 0 : time - allTimes[0];
      return timeDiff;
    })
    .map((time) => time * TIME_AMPLIFIER);

  // This will take the result of postedSomeHoursAgo and turn it into a string
  const whenUserPosted = postedSomeHoursAgo.map((time) => {
    //firstPostTime be how many minutes ago the first post was posted
    const firstPostTime = randomInt(1, 59);
    let timeMessage;
    // If first post, it was posted some amount of minutes ago
    if (time === 0)
      timeMessage = `${firstPostTime} minute${
        firstPostTime === 1 ? "" : "s"
      } ago`;
    // If a post was made less than a day ago, make a string that tells you how many hours ago it was posted
    else if (time > 0 && time < 24)
      timeMessage = `${Math.floor(time)} hour${
        Math.floor(time === 1) ? "" : "s"
      } ago`;
    // If a post was made more than a day ago but less than a week ago, make a string that tells you how many days ago it was posted
    else if (time >= 24 && time < 192)
      timeMessage = `${Math.floor(time / 24)} day${
        time >= 24 && time < 48 ? "" : "s"
      } ago`;
    // If a post was made more than a week ago, just put the month and date it was posted
    else {
      const todaysDate = new Date();
      const datePosted = todaysDate.setHours(-time);

      const dateFormatter = Intl.DateTimeFormat(navigator.language, {
        day: "numeric",
        month: "long",
      });

      timeMessage = dateFormatter.format(datePosted);
    }

    return timeMessage;
  });

  return whenUserPosted;
};
