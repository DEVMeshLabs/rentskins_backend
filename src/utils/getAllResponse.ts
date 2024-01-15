import axios from "axios";

export async function getAllData(URLs) {
  return Promise.all(URLs.map(fetchData));
}

async function fetchData(URL) {
  return axios
    .get(URL)
    .then(function (response) {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(() => {
      return { sucess: false };
    });
}
