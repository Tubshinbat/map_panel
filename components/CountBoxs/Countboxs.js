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
        styles: "count-box tile-green",
        label: "Нийт хэрэглэгч",
        count: userData.data ? userData.data.data : 0,
        link: "/users",
        icon: "fa-solid fa-users",
        boxStyle: "primary-gradient",
      });

      setPlace({
        styles: "count-box tile-aqua",
        label: "Нийт газрууд",
        count: placeData.data ? placeData.data.count : 0,
        link: "/places",
        icon: "fa-solid fa-place-of-worship",
        boxStyle: "warning-gradient",
      });

      setNews({
        styles: "count-box  tile-info",
        label: "Нийт мэдээлэл",
        count: newsData.data ? newsData.data.data : 0,
        link: "/news",
        icon: "fa-solid fa-newspaper",
        boxStyle: "secondary-gradient",
      });
    };

    fetchDatas().then().catch();
  }, []);

  return (
    <div className="col-12">
      <div className="row flex-nowrap">
        <CountBox data={user} />
        <CountBox data={place} />
        <CountBox data={news} />
      </div>
    </div>
  );
};

export default CountBoxs;
