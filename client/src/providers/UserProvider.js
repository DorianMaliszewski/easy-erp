import React, { useReducer } from "react";
import UserContext from "../contexts/UserContext";

import { userReducer } from "../reducers/user";

import { FIND_ALL_USER } from "../actions/user";

let id = 0;

function createData(name, role, email, phone, client) {
  return { id: ++id, name, role, email, phone, client };
}

const userRows = [
  createData("John Doe", "ROLE_CONTACT", "john.doe@exemple.com", "0619755845", "Client 1"),
  createData("John Doe 2", "ROLE_CONTACT", "john.doe@exemple.com", "0619755845", "Client 1"),
  createData("John Doe 4", "ROLE_MANAGER", "john.doe@exemple.com", "0619755845", "Client 1"),
  createData("John Doe 7", "ROLE_SUPER_ADMIN", "john.doe@exemple.com", "0619755845", "Client 1"),
  createData("John Doe 9", "ROLE_ADMIN", "john.doe@exemple.com", "0619755845", "Client 1"),
  createData("John Doe 20", "ROLE_USER", "john.doe@exemple.com", "0619755845", "Client 1")
];

const initialState = {
  users: [],
  isLoading: false
};

const UserProvider = props => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const findAll = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        dispatch({ type: FIND_ALL_USER.REQUEST, users: userRows });
        resolve(userRows);
      }, 1000);
    });
  };

  const findOneById = id => {
    const user = userState.users.find(u => u.id === id);
    console.log("Putin");
    if (user) {
      return new Promise((resolve, reject) => resolve(user));
    } else {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(userRows.find(u => u.id === id));
        }, 1000);
      });
    }
  };

  const get = () => {
    if (userState.users && userState.users.length > 0) {
      return userState.users;
    }

    findAll();
  };

  return <UserContext.Provider value={{ state: userState, findAll, get, findOneById }}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
