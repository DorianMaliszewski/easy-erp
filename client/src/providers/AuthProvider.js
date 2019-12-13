import React, { useState } from 'react';
import { AUTH_TOKEN, REFRESH_TOKEN, INSTANCE_URL } from '../constants';
import { login, refreshToken } from '../api/auth';
import { withRouter } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../routes';
import Axios from 'axios';

const AuthProvider = props => {
  const [user, setUser] = useState();

  const loginAction = (username, password) => {
    return login(username, password)
      .then(res => {
        sessionStorage.setItem(AUTH_TOKEN, res.access_token);
        localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
        sessionStorage.setItem(INSTANCE_URL, res.instanceUrl);
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token;
        setUser(res.user);
        return true;
      })
      .catch(err => {
        throw err.response;
      });
  };

  const isConnected = () => {
    return sessionStorage.getItem(AUTH_TOKEN) && user;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    sessionStorage.removeItem(INSTANCE_URL);
    props.history.push(routes.LOGIN_ROUTE.path);
  };

  const refreshTokenAction = () => {
    return refreshToken()
      .then(res => {
        sessionStorage.setItem(AUTH_TOKEN, res.access_token);
        localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
        sessionStorage.setItem(INSTANCE_URL, res.instanceUrl);
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token;
        setUser(res.user);
        return true;
      })
      .catch(err => {
        console.error('Erreur lors du rafraîchissement du token', err);
        sessionStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        sessionStorage.removeItem(INSTANCE_URL);
        return false;
      });
  };

  const isMoreThanOrEqualAdmin = () => {
    return user && (user.role.name === 'ROLE_ADMIN' || user.role.name === 'ROLE_SUPER_ADMIN');
  };
  return <AuthContext.Provider value={{ user, setUser, login: loginAction, isConnected, logout, isMoreThanOrEqualAdmin, refreshToken: refreshTokenAction }}>{props.children}</AuthContext.Provider>;
};

export default withRouter(AuthProvider);
