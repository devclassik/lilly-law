import { useState } from "react";

export function useUser() {
  const [userData, setUserDataState] = useState(() => {
    const storedData = getAllData("ud");
    return storedData || null;
  });

  function getUserData() {
    return userData;
  }

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getAllData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  function setUserData(data) {
    saveToLocalStorage("ud", data);
    setUserDataState(data);
  }

  return {
    getUserData,
    setUserData,
    saveToLocalStorage,
    getAllData,
  };
}
