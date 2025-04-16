import {GET_REQUEST, JWT_TOKEN, REFRESH_TOKEN, USER_OBJECT} from "../values/globals";
import {makeRequest} from "./network_utils";

export const getToken = function () { //
  return localStorage.getItem(JWT_TOKEN);
};

export const saveToken = function (token) {
  localStorage.setItem(JWT_TOKEN, token);
};

//TODO: This should be removed
export const saveRefreshToken = function (token) {
  localStorage.setItem(REFRESH_TOKEN, token);
};

//TODO: This should be removed
export const getRefreshToken = function () {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const isUserLoggedIn = function () {
  return !(localStorage.getItem(USER_OBJECT) === null ||
           localStorage.getItem(USER_OBJECT) === undefined ||
           localStorage.getItem(USER_OBJECT) === 'null' || localStorage.getItem(USER_OBJECT) === 'undefined');
};

export const setUserObject = function (beforeFunc, afterFunc) {
  if (beforeFunc) {
    beforeFunc();
  }
  makeRequest(GET_REQUEST, "me/", {}, function (response) {
    let obj = response.data;
    localStorage.setItem(USER_OBJECT, JSON.stringify(obj));
  }, function (error) {
    //console.log(error.response);
  }, function () {
    if (afterFunc) {
      afterFunc();
    }
  });

};
export const getUserObject = function () {
  return JSON.parse(localStorage.getItem(USER_OBJECT)) || {};
};
export const logout = function () {
  localStorage.removeItem(USER_OBJECT);
  localStorage.removeItem(JWT_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);

  //Redirect the user to the login page.
  window.location.href = "/signin";
};