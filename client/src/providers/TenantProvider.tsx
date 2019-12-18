import React, { useState } from "react";
import TenantContext from "../contexts/TenantContext";
import useSnackbar from "../hooks/useSnackbar";
import { TenantData } from "../models/TenantData";
import { useHistory } from "react-router-dom";
import { TenantApi } from "../api/TenantApi";
import { tap, catchError } from "rxjs/operators";

const TenantProvider: React.FC<any> = props => {
  const [tenant, setTenant] = useState<TenantData>(props.tenant);
  const snackbar = useSnackbar();
  const history = useHistory();

  const submit = (tenant: TenantData) => {
    return TenantApi.getInstance()
      .save(tenant)
      .pipe(
        tap((result: TenantData) => {
          snackbar.show("Modification enregistrée", "success");
        }),
        catchError(handleError)
      );
  };

  const cancel = () => {
    history.goBack();
  };

  const handleError = () => {
    return (error: any) => {
      console.log("An error occured", error);
      snackbar.show("Une erreur est survenue, veuillez réessayer", "error");
    };
  };

  return (
    <TenantContext.Provider
      value={{
        tenant,
        setTenant,
        submit,
        cancel
      }}
    >
      {props.children}
    </TenantContext.Provider>
  );
};

const useTenantContext = () => {
  return React.useContext(TenantContext);
};

export { TenantProvider, useTenantContext };
