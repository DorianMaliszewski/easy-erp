import React from "react";
import AuthProvider from "./AuthProvider";
import DashboardProvider from "./DashboardProvider";
import { QuoteProvider } from "./QuoteProvider";
import { BillProvider } from "./BillProvider";
import { CustomerProvider } from "./CustomerProvider";
import UserProvider from "./UserProvider";
import ToastProvider from "./ToastProvider";

const MainProvider: React.FC<any> = props => {
  return (
    <ToastProvider horizontal="right">
      <AuthProvider>
        <CustomerProvider>
          <QuoteProvider>
            <BillProvider>
              <UserProvider>
                <DashboardProvider>{props.children}</DashboardProvider>
              </UserProvider>
            </BillProvider>
          </QuoteProvider>
        </CustomerProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

MainProvider.propTypes = {};

export default MainProvider;
