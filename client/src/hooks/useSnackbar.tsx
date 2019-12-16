import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

const useSnackbar = () => {
  const toastContext = useContext(ToastContext);

  const showSnackbar = (message: string, variant: string) => {
    toastContext.show({ message, variant });
  };

  return {
    show: showSnackbar
  };
};

export default useSnackbar;
