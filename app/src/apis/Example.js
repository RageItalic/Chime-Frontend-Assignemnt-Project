// TODO: implement functions to interface with your api here
// You can either use the standard fetch API, or install axios or any other 3rd party library.

// You can also feel free to just do the API request in your component

// Also feel free to either use .then(response => ...).catch(e => ...) or async/await and try/catch syntax

export const getExample = async () => {
  try {
    const response = await fetch("/api/example");
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
