"use client";
import { useAuthContext } from "context/authContext";
import base from "lib/base";
import Link from "next/link";
const UserBox = () => {
  const { user } = useAuthContext();

  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        {" "}
        {user && user.picture ? (
          <img
            src={base.cdnUrl + "/150x150/" + user.picture}
            className="img-circle elevation-2"
            alt="User Image"
          />
        ) : (
          <img
            src="/dist/img/default-150x150.png"
            className="img-circle elevation-2"
            alt="User Image"
          />
        )}
      </div>

      <div className="info">
        <Link href="/userprofile" className="d-block">
          {user && user.firstName}
        </Link>
      </div>
    </div>
  );
};

export default UserBox;
