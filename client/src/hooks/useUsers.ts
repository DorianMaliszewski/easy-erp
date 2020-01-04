import { useEffect } from "react";
import { useUserContext } from "../providers/UserProvider";

const useUsers = () => {
  const userContext = useUserContext();

  useEffect(() => {
    if (!userContext.state.users && !userContext.state.isLoading) {
      userContext.findAll().subscribe();
    }
  }, [userContext]);
  return userContext.state.users;
};

export default useUsers;
