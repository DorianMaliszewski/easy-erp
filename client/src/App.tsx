import React, { useContext } from "react";
import "./App.css";
import Signin from "./pages/Signin";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import routes from "./routes";
import { REFRESH_TOKEN } from "./constants";
import AuthContext from "./contexts/AuthContext";
import moment from "moment";
import "moment/locale/fr";
import Splashscreen from "./pages/Splashscreen";
import ConnectedRouter from "./components/ConnectedRouter";

moment.locale("fr");

const App: React.FC<any> = ({ ...props }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  if (localStorage.getItem(REFRESH_TOKEN) && !authContext.user && !authContext.instanceUrl) {
    authContext.refreshToken().then((res: any) => {
      if (res === false) {
        authContext.setUser(null); // Modify state to rerender and redirect to login
        history.push(routes.LOGIN.path);
      }
    });
    return <Splashscreen text=" " />;
  }

  return (
    <Switch>
      <Route path={routes.LOGIN.path} component={Signin} />
      <ConnectedRouter />
      <Redirect path="*" to={routes.LOGIN.path} />
    </Switch>
  );
};

export default App;
