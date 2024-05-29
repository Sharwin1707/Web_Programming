import { useState, useEffect } from "react";
import axios from "axios";

let cache = {};

const fetchData = (url) => {
  if (!cache[url]) {
    cache[url] = axios.get(url).then((response) => {
      if (response.status === 200) {
        cache[url] = response.data;
        return response.data;
      } else {
        throw new Error("Error fetching data");
      }
    });
    throw cache[url]; // Throw the promise to let Suspense catch it
  }
  if (cache[url] instanceof Promise) {
    throw cache[url]; // Still fetching
  }
  return cache[url]; // Already fetched
};

export const useFetch = (url) => {
  return fetchData(url);
};
