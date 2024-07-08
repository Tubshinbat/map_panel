"use client";
import { useEffect, useState } from "react";
import CountBox from "./CountBox";

import { getNewsCount, getPlaceCount, getUserCount } from "lib/getFetchers";

const CountBoxs = () => {
  const [user, setUser] = useState(null);
  const [place, setPlace] = useState(null);
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchDatas = async () => {
      const userData = await getUserCount();
      const placeData = await getPlaceCount();
      const newsData = await getNewsCount();

      setUser({
        styles: "text-bg-primary",
        label: "Нийт хэрэглэгч",
        count: userData.data ? userData.data.data : 0,
        link: "/users",
        icon: "solar:dollar-minimalistic-linear",
        boxStyle: "primary-gradient",
      });

      setPlace({
        styles: "text-bg-warning",
        label: "Нийт газрууд",
        count: placeData.data ? placeData.data.count : 0,
        link: "/places",
        icon: "solar:recive-twice-square-linear",
        boxStyle: "warning-gradient",
      });

      setNews({
        styles: "text-bg-secondary",
        label: "Нийт мэдээлэл",
        count: newsData.data ? newsData.data.data : 0,
        link: "/news",
        icon: "ri:news-line",
        boxStyle: "secondary-gradient",
      });
    };

    fetchDatas().then().catch();
  }, []);

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body pb-0" data-simplebar>
          <div className="row flex-nowrap">
            <CountBox data={user} />
            <CountBox data={place} />
            <CountBox data={news} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountBoxs;
