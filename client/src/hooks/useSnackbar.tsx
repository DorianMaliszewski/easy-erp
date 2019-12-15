import React, { useState, useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState();
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const toastContext = useContext(ToastContext);

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (message: string, variant: string) => {
    toastContext.show({ message, variant });
  };

  return {
    showSnackbar
  };
};

export default useSnackbar;
