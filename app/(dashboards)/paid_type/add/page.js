"use client";
import BankAccountAddPageComponent from "components/Paid/BankAccountAddPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(BankAccountAddPageComponent);
export default ProtectedDashboardPage;
