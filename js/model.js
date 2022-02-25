import { QUANTITY_OF_USERS, API_URL } from "./config.js";

export const state = {
  users: {},
  userQuantity: QUANTITY_OF_USERS,
};

// Load all users from API and put them in the state
export const loadUsers = async function () {
  try {
    const res = await fetch(`${API_URL}?results=${QUANTITY_OF_USERS}`);

    const { results } = await res.json();

    state.users = results;
  } catch (err) {
    console.error(err);
  }
};
