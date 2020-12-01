import React, { useReducer, useEffect } from "react";

import { userReducer } from "../reducers/user";
import { UserApi } from "../api/UserApi";
import { FIND_ALL_USER, USER_ADD, USER_UPDATE } from "../actions/user";

import { tap, map } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { UserData } from "../models/UserData";

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

  const findById = (id: number): Observable<UserData> => {
    let userFinded = null;
    if (userState.users) {
      userFinded = userState.users.find((u: any) => u.id === id);
    }
    return userFinded ? of(userFinded as UserData) : findAll().pipe(map(result => result.items.find(u => u.id === id) as UserData));
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

  const save = (user: UserData, isInternal: boolean) => {
    return UserApi.getInstance()
      .save(user, isInternal)
      .pipe(
        tap((u: UserData) => {
          return updateState(u, user.id ? false : true);
        })
      );
  };

  const updateState = (user: UserData, isCreate: boolean) => {
    if (isCreate) {
      dispatch({ type: USER_ADD.SUCCESS, user: user });
    } else {
      dispatch({ type: USER_UPDATE.SUCCESS, user: user });
    }
    return user;
  };

  return <UserContext.Provider value={{ state: userState, findAll, get, findById, getCustomerUsers, getInternalUsers, save }}>{props.children}</UserContext.Provider>;
};

const useUserContext = () => {
  const userContext = React.useContext(UserContext);

  useEffect(() => {
    if (!userContext.state.isLoading && !userContext.state.users) {
      userContext.findAll().subscribe();
    }
  });

  return userContext;
};

export { UserProvider, useUserContext };
