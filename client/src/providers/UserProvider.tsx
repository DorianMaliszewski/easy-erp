import React, { useReducer } from "react";

import { userReducer } from "../reducers/user";
import { UserApi } from "../api/UserApi";
import { FIND_ALL_USER } from "../actions/user";

import { tap, map } from "rxjs/operators";
import { of } from "rxjs";

const UserContext = React.createContext<any>({});

const initialState = {
  users: null,
  isLoading: false,
  numFound: 0
};

const UserProvider: React.FC<any> = props => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const findAll = () => {
    dispatch({ type: FIND_ALL_USER.REQUEST });
    return UserApi.getInstance()
      .findAll()
      .pipe(
        tap(result => {
          dispatch({ type: FIND_ALL_USER.SUCCESS, users: result.items, numFound: result.numFound });
        })
      );
  };

  const findOneById = (id: number) => {
    let userFinded = null;
    if (userState.users) {
      userFinded = userState.users.find((u: any) => u.id === id);
    }
    return userFinded ? of(userFinded) : findAll().pipe(map(result => result.items.find(u => u.id === id)));
  };

  const get = () => {
    if (!userState.users && !userState.isLoading) {
      findAll().subscribe();
    }
    if (userState.users && userState.users.length > 0) {
      return userState.users;
    }
  };

  const getCustomerUsers = () => {
    if (userState.users) {
      return of(userState.users.filter((u: any) => u.role.name === "ROLE_CLIENT"));
    } else {
      return findAll().pipe(map(result => result.items.filter((u: any) => u.role.name === "ROLE_CLIENT")));
    }
  };

  const getInternalUsers = () => {
    if (userState.users) {
      return of(userState.users.filter((u: any) => u.role.name !== "ROLE_CLIENT"));
    } else {
      return findAll().pipe(map(result => result.items.filter((u: any) => u.role.name !== "ROLE_CLIENT")));
    }
  };

  return <UserContext.Provider value={{ state: userState, findAll, get, findOneById, getCustomerUsers, getInternalUsers }}>{props.children}</UserContext.Provider>;
};

const useUserContext = () => {
  return React.useContext(UserContext);
};

export { UserProvider, useUserContext };
