import React from "react";
import AuthProvider from "./AuthProvider";
import DashboardProvider from "./DashboardProvider";
import { QuoteProvider } from "./QuoteProvider";
import { BillProvider } from "./BillProvider";
import { CustomerProvider } from "./CustomerProvider";
import { UserProvider } from "./UserProvider";
import { TenantProvider } from "./TenantProvider";
import ToastProvider from "./ToastProvider";

const MainProvider: React.FC<any> = props => {
  return (
    <ToastProvider horizontal="right">
      <AuthProvider>
        <TenantProvider>
          <CustomerProvider>
            <QuoteProvider>
              <BillProvider>
                <UserProvider>
                  <DashboardProvider>{props.children}</DashboardProvider>
                </UserProvider>
              </BillProvider>
            </QuoteProvider>
          </CustomerProvider>
        </TenantProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

MainProvider.propTypes = {};

export default MainProvider;
