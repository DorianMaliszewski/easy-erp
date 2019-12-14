import React from "react";
import routes from "../../routes";
import AdminCustomersTable from "../../components/Administration/AdminCustomers/AdminCustomersTable";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

let id = 0;
function createData(name: string, contact: string, phone: string, email: string, site: string, address: string, postalCode: string, createdBy: string) {
  id += 1;
  return { id, name, contact, phone, email, site, address, postalCode, createdBy };
}

const rows = [
  createData("Client", "John Doe", "0619755845", "contact@dorianmaliszewski.fr", "http://www.dorianmaliszewski.fr", "Mon adresse", "20137", "admin"),
  createData("Client", "John Doe", "0619755845", "contact@dorianmaliszewski.fr", "http://www.dorianmaliszewski.fr", "Mon adresse", "20137", "admin"),
  createData("Client", "John Doe", "0619755845", "contact@dorianmaliszewski.fr", "http://www.dorianmaliszewski.fr", "Mon adresse", "20137", "admin"),
  createData("Client", "John Doe", "0619755845", "contact@dorianmaliszewski.fr", "http://www.dorianmaliszewski.fr", "Mon adresse", "20137", "admin"),
  createData("Client", "John Doe", "0619755845", "contact@dorianmaliszewski.fr", "http://www.dorianmaliszewski.fr", "Mon adresse", "20137", "admin")
];

const Clients: React.FC<any> = props => {
  const history = useHistory();
  return (
    <>
      <Button color="primary" variant="contained" onClick={(e: any) => history.push(routes.CUSTOMERS_FORM.path)}>
        Créer un client
      </Button>
      <AdminCustomersTable customers={rows} />
    </>
  );
};

export default Clients;
