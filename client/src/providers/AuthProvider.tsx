import React, { useState } from "react";
import { AUTH_TOKEN, REFRESH_TOKEN, INSTANCE_URL } from "../constants";
import { login, refreshToken } from "../api/AuthApi";
import { withRouter } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import routes from "../routes";
import Axios from "axios";
import { initInterceptor } from "../utils/fetchInterceptor";

const AuthProvider: React.FC<any> = props => {
  const [user, setUser] = useState();
  const [instanceUrl, setInstanceUrl] = useState("");

  const loginAction = (username: string, password: string) => {
    return login(username, password)
      .then((res: any) => {
        sessionStorage.setItem(AUTH_TOKEN, res.access_token);
        localStorage.setItem(AUTH_TOKEN, res.access_token);
        localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
        sessionStorage.setItem(INSTANCE_URL, res.instanceUrl);
        setInstanceUrl(res.instanceUrl);
        Axios.defaults.headers.common["Authorization"] = "Bearer " + res.access_token;
        initInterceptor();
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
    props.history.push(routes.LOGIN.path);
  };

  const refreshTokenAction = () => {
    return refreshToken()
      .then((res: any) => {
        sessionStorage.setItem(AUTH_TOKEN, res.access_token);
        localStorage.setItem(REFRESH_TOKEN, res.refresh_token);
        sessionStorage.setItem(INSTANCE_URL, res.instanceUrl);
        setInstanceUrl(res.instanceUrl);
        initInterceptor();
        Axios.defaults.headers.common["Authorization"] = "Bearer " + res.access_token;
        setUser(res.user);
        return true;
      })
      .catch((err: any) => {
        console.error("Erreur lors du rafraîchissement du token", err);
        sessionStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        sessionStorage.removeItem(INSTANCE_URL);
        return false;
      });
  };

  const isMoreThanOrEqualAdmin = () => {
    return user && (user.role.name === "ROLE_ADMIN" || user.role.name === "ROLE_SUPER_ADMIN");
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login: loginAction, isConnected, logout, isMoreThanOrEqualAdmin, refreshToken: refreshTokenAction, instanceUrl }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
