// TODO: implement functions to interface with your api here
// You can either use the standard fetch API, or install axios or any other 3rd party library.

// You can also feel free to just do the API request in your component

// Also feel free to either use .then(response => ...).catch(e => ...) or async/await and try/catch syntax

import axios from "axios";

let uri =
  "https://d5a5ce43-e7e0-44fc-9a4c-5158e9f33244.mock.pstmn.io/api/v1/menu";

export const getData = async () => {
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
