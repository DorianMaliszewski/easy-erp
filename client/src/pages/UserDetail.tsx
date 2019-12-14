import React, { useContext } from "react";
import { Typography, Button } from "@material-ui/core";
import Splashscreen from "./Splashscreen";
import usePromise from "../hooks/usePromise";
import UserContext from "../contexts/UserContext";
import { useHistory, useParams } from "react-router-dom";
import UserDetailCard from "../components/User/UserDetailCard";
import { useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const UserDetail: React.FC<any> = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();

  const { data, isLoading, race } = usePromise(userContext.findOneById);

  useEffect(() => {
    if (id) race(parseInt(id, 10));
  }, [id, race]);

  return (
    <div>
      {isLoading ? (
        <Splashscreen text="Chargement de l'utilisateur" />
      ) : (
        data && (
          <>
            <Button onClick={e => history.goBack()}>
              <ChevronLeftIcon /> Retour
            </Button>
            <Typography gutterBottom align="center" variant="h3" component="h1">
              {data.name}
            </Typography>
            <UserDetailCard user={data} />
          </>
        )
      )}
    </div>
  );
};

export default UserDetail;
