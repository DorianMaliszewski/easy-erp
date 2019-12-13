import React from "react";
import AuthProvider from "./AuthProvider";
import DashboardProvider from "./DashboardProvider";
import QuoteProvider from "./QuoteProvider";
import BillProvider from "./BillProvider";
import CustomerProvider from "./CustomerProvider";
import UserProvider from "./UserProvider";

const MainProvider = props => {
  return (
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
  );
};

MainProvider.propTypes = {};

export default MainProvider;
