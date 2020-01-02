import React, { useState, useEffect } from "react";
import { useUserContext } from "../../providers/UserProvider";

const UserTable = React.lazy(() => import("../../components/User/UserTable"));

const InternalUsers: React.FC<any> = props => {
  const userContext = useUserContext();
  const [internalUsers, setInternalUsers] = React.useState<any>();

  React.useEffect(() => {
    if (!internalUsers && !userContext.state.isLoading) {
      userContext.getInternalUsers().subscribe((users: any) => {
        setInternalUsers(users);
      });
    }
  }, [userContext]);

  return (
    <React.Suspense fallback={<div>Chargement</div>}>
      <UserTable users={internalUsers} isLoading={userContext.state.isLoading} />
    </React.Suspense>
  );
};

export default InternalUsers;
