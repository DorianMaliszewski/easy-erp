import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { AUTH_TOKEN } from "../constants";

const useAxios = (method, url, body) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    Axios.request({
      method,
      url,
      data: body,
      headers: {
        Authorization: localStorage.getItem(AUTH_TOKEN)
      }
    })
      .then(res => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, [data]);

  return {
    data,
    error,
    isLoading
  };
};

export default useAxios;
