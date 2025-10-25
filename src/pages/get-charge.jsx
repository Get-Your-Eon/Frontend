import { Map, MapMarker } from "react-kakao-maps-sdk"
import { Footer } from "@/widgets/layout";
import { useEffect, useState } from "react";

export function GetCharge() {

  const [state, setState] = useState({
    center: { 
      lat: 33.450701, 
      lng: 126.570667 
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: { 
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도 
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "Geolocation is not supported by this browser.",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <section className="relative block h-[20vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>

      <section>
        <Map
          id="map"
          center={state.center}
          style={{
            width: "100%",
            height: "700px",
          }}
          level={3} // 지도의 확대 레벨
        >
          {!state.isLoading && (
          <MapMarker position={state.center}>
            <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
            </div>
          </MapMarker>
        )}
        </Map>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  )
}

export default GetCharge;