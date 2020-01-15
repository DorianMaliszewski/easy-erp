import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

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

export default function TopSearchBar() {
  const [search, setSearch] = React.useState("");
  const [options, setOptions] = React.useState<any>([]);

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

  const handleSearch = () => {
    console.log("Recherche");
  };

  return <SearchBar value={search} onChange={newValue => setSearch(newValue)} onRequestSearch={handleSearch} placeholder="Rechercher" />;
}
