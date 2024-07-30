"use client";
import BankAccountEditPageComponent from "components/Paid/BankAccountEditPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(BankAccountEditPageComponent);
export default ProtectedDashboardPage;
