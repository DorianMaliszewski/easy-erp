import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { makeStyles, Theme } from "@material-ui/core";

const Signin: React.FC<any> = props => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  let { from } = props.location.state || { from: { pathname: "/dashboard" } };

  if (localStorage.getItem(AUTH_TOKEN) && authContext.user) {
    return <Redirect to={from} />;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");
    setIsConnecting(true);
    authContext.login(username, password).catch((err: any) => {
      setIsConnecting(false);
      if (!err) return setError("Une erreur est survenue");
      switch (err.status) {
        case 400:
          setError("Identifiants incorrects");
          break;
        default:
          setError("Une erreur est survenue");
      }
    });
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Identifiant</InputLabel>
            <Input id="username" name="username" autoComplete="username" autoFocus onChange={e => setUsername(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Button disabled={isConnecting} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Connexion
          </Button>
        </form>
        {error && (
          <Typography style={{ paddingTop: 20 }} variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
      </Paper>
    </main>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  }
}));

export default Signin;
