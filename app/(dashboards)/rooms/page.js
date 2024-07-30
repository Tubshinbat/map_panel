"use client";
import RoomPageComponent from "components/Room/RoomPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(RoomPageComponent);
export default ProtectedDashboardPage;
