import React, { useState, useEffect } from "react";
import { ToastContext } from "../contexts/ToastContext";
import { Toast, ToastVariant } from "../models/Toast";
import { CustomizedSnackbars } from "../components/Snackbars/CustomSnackbar";

type ToastInfo = {
  message: string;
  variant: ToastVariant;
  callback?: Function;
  vertical?: string;
  horizontal?: string;
  duration?: number;
};

type ToastProviderProps = {
  children: any;
  duration?: number;
  horizontal?: string;
  vertical?: string;
};

const ToastProvider: React.FC<ToastProviderProps> = ({ children, duration = 5000, horizontal = "center", vertical = "bottom" }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextToast, setNextToast] = useState<Toast>();

  const show = (info: ToastInfo) => {
    const newToast = new Toast();
    newToast.callback = info.callback;
    newToast.message = info.message;
    newToast.variant = info.variant;
    newToast.duration = info.duration ? info.duration : duration;
    setToasts([...toasts, newToast]);
  };

  const onCloseToast = () => {
    if (nextToast) {
      nextToast.open = false;
      if (nextToast.callback) nextToast.callback();
    }
    if (toasts.length > 0) {
      setNextToast(toasts.shift());
    } else {
      setNextToast(undefined);
    }
  };

  useEffect(() => {
    if (!nextToast) {
      setNextToast(toasts.shift());
    }
  }, [toasts, nextToast]);

  return (
    <ToastContext.Provider value={{ toasts, show }}>
      {children}
      {nextToast && (
        <CustomizedSnackbars
          duration={nextToast.duration}
          open={nextToast.open}
          key={nextToast.id}
          message={nextToast.message}
          horizontal={nextToast.horizontal ? nextToast.horizontal : horizontal}
          vertical={nextToast.vertical ? nextToast.vertical : vertical}
          variant={nextToast.variant}
          onClose={onCloseToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
