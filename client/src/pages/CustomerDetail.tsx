import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CustomerContext from "../contexts/CustomerContext";
import CustomerCard from "../components/Customers/CustomerCard";
import { CustomerData } from "../models/CustomerData";

const CustomerDetail: React.FC<any> = props => {
  const history = useHistory();
  const { id } = useParams();

  const customerContext = useContext(CustomerContext);
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    if (id) {
      customerContext.findById(parseInt(id, 10)).subscribe(
        (c: CustomerData) => {
          setCustomer(c);
        },
        (err: any) => {
          history.goBack();
        }
      );
    }
  }, [id]);

  if (!customer) {
    return <Splashscreen text="Récupération du client" />;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", paddingBottom: 20 }}>
        <div style={{ flexGrow: 1 }}>
          <Button onClick={e => history.goBack()}>
            <ChevronLeftIcon /> Retour
          </Button>
        </div>
      </div>
      <CustomerCard customer={customer} />
    </>
  );
};

export default CustomerDetail;
