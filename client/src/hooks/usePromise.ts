import { useState } from "react";
import { useEffect } from "react";

const usePromise = (promise: any, initParams?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [params, setParams] = useState(initParams);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    promise(params)
      .then((res: any) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((err: any) => {
        setIsLoading(false);
        setError(err);
      });
  }, [promise, params]);

  const race = (newParams: any) => {
    setParams(newParams);
  };

  return {
    data,
    error,
    isLoading,
    race
  };
};

export default usePromise;
