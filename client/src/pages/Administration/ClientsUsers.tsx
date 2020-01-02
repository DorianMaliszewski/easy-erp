import React, { useState, useEffect } from "react";
import { useUserContext } from "../../providers/UserProvider";

const UserTable = React.lazy(() => import("../../components/User/UserTable"));

const ClientsUsers: React.FC<any> = props => {
  const userContext = useUserContext();
  const [customersUsers, setCustomersUsers] = React.useState<any>();

  React.useEffect(() => {
    if (!customersUsers && !userContext.state.isLoading) {
      userContext.getCustomerUsers().subscribe((users: any) => setCustomersUsers(users));
    }
  }, [userContext]);

  return (
    <React.Suspense fallback={<div>Chargement</div>}>
      <UserTable users={customersUsers} isLoading={userContext.state.isLoading} />
    </React.Suspense>
  );
};

export default ClientsUsers;
