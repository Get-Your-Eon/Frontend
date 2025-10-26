import { Map, MapMarker } from "react-kakao-maps-sdk"
import { Footer } from "@/widgets/layout";
import { useEffect, useState } from "react";
import { fetchChargeStations } from "@/api/apis";

export function GetCharge() {

  const [state, setState] = useState({
    center: { 
      lat: 33.450701, 
      lng: 126.570667 
    },
    errMsg: null,
    isLoading: true,
  });

  const [chargeStations, setChargeStations] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setState((prev) => ({
            ...prev,
            center: { 
              lat: lat,
              lng: lng,
            },
            isLoading: false,
          }));

          // 충전소 데이터 가져오기
          try {
            const stationsData = await fetchChargeStations(lat, lng, 5000);
            console.log('충전소 데이터:', stationsData); 
            setChargeStations(stationsData);
          } catch (error) {
            console.error("충전소 데이터를 가져오는데 실패했습니다:", error);
          }
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
          {/* 현재 위치 마커 */}
          {!state.isLoading && (
            <MapMarker position={state.center}>
              <div style={{ padding: "5px", color: "#000", backgroundColor: "#fff", borderRadius: "5px" }}>
                {state.errMsg ? state.errMsg : "현재 위치!"}
              </div>
            </MapMarker>
          )}
          
          {/* 충전소 마커들 */}
          {Array.isArray(chargeStations) && chargeStations.map((station, index) => (
            <MapMarker 
              key={station.station_id || index}
              position={{ 
                lat: parseFloat(station.lat), 
                lng: parseFloat(station.lon) // lon을 lng로 매핑
              }}
            >
              <div style={{ 
                padding: "5px", 
                color: "#000", 
                backgroundColor: "#e3f2fd", 
                borderRadius: "5px",
                fontSize: "12px",
                whiteSpace: "nowrap"
              }}>
                {station.station.name || "충전소"}
              </div>
            </MapMarker>
          ))}
        </Map>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  )
}

export default GetCharge;