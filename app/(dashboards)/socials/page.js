"use client";
import SocialPageComponent from "components/Social/SocialPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(SocialPageComponent);
export default ProtectedDashboardPage;
