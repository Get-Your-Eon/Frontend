import { useEffect, useRef } from 'react';
import { Map } from "react-kakao-maps-sdk"
// import useKakaoLoader from "./useKakaoLoader"
import { Footer } from "@/widgets/layout";

export function GetCharge() {
  return (
    <>
      <section className="relative block h-[13vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>

      <section className="p-4">
        <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "350px",
      }}
      level={3} // 지도의 확대 레벨
    />
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  )
}

export default GetCharge;