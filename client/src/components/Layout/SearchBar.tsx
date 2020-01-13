import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, InputBase, IconButton, Paper, Popper, List, ListItem } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme: Theme) => ({
  paperInput: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  popper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    zIndex: 10
  }
}));

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [options, setOptions] = React.useState<any>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    if (search.length >= 3) {
      switch (search.substr(0, 3).toLowerCase()) {
        case "fac":
          console.log("Recherche des factures");
          setOptions(["FAC1-001", "FAC1-001", "FAC1-001", "FAC1-001", "FAC1-001", "FAC1-001", "FAC1-001"]);
          break;
        case "dev":
          console.log("Recherche des devis");
          setOptions(["DEV1-001", "DEV1-001", "DEV1-001", "DEV1-001", "DEV1-001", "DEV1-001", "DEV1-001"]);
          break;
        case "cli":
        case "con":
        case "uti":
        default:
          console.log("Rechercher des clients");
          console.log("Recherche des contact");
          console.log("Recherche des utilisateurs");
          setOptions(["Utilisateur", "Utilisateur", "Utilisateur", "Utilisateur", "Utilisateur", "Utilisateur", "Utilisateur"]);
          break;
      }
    }
  }, [search]);

  const handleSearchChange = (e: any, value: any) => {
    setSearch(value);
  };

  const handleSelectOption = (e: any) => {
    console.log("Option selected");
    setSearch(e.target.innerText);
  };

  const handleSearch = (e: React.KeyboardEvent<any>) => {
    if (e.keyCode === 13) {
      console.log("Entrer");
      if (search.length >= 3) {
        console.log("Recherche");
      }
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      autoSelect={false}
      style={{ width: 300 }}
      open={true}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={handleSelectOption}
      getOptionLabel={option => option}
      options={options}
      loading={loading}
      value={search}
      inputValue={search}
      onInputChange={handleSearchChange}
      renderInput={params => (
        <Paper>
          <TextField
            {...params}
            fullWidth
            variant="standard"
            placeholder="Recherche"
            onKeyUp={handleSearch}
            InputProps={{
              style: {
                padding: 10
              },
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        </Paper>
      )}
    />
  );
}
