import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { AUTH_TOKEN } from "../constants";

const useAxios = (method: string, url: string, body: any) => {
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
      .then((res: any) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err: any) => {
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
