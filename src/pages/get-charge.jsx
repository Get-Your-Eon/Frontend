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

  const [markers, setMarkers] = useState([]);
  const [info, setInfo] = useState();
  const [map, setMap] = useState();

  // 현재 위치와 충전소 데이터 가져오기
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
            const stationsData = await fetchChargeStations(lat, lng, 2000);
            console.log('충전소 데이터:', stationsData);
            
            if (stationsData.stations && stationsData.stations.length > 0) {
              // 현재 위치 마커 추가
              const newMarkers = [
                {
                  position: { lat, lng },
                  content: "현재 위치",
                  isCurrentLocation: true,
                }
              ];

              // 충전소 마커들 추가
              stationsData.stations.forEach((station) => {
                newMarkers.push({
                  position: {
                    lat: station.lat,
                    lng: station.lon,
                  },
                  content: station.statNm || "충전소",
                  isCurrentLocation: false,
                });
              });

              setMarkers(newMarkers);
            }
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
  }, []); // 빈 배열로 한 번만 실행

  // 지도 범위 설정 (마커가 변경될 때)
  useEffect(() => {
    if (!map || markers.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
    });
    map.setBounds(bounds);
  }, [map, markers]); // map과 markers가 모두 준비되면 실행

  return (
    <>
      <section className="relative block h-[20vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-cover bg-center"/>
      </section>

      <section>
        <Map
          id="map"
          center={state.center}
          style={{
            width: "100%",
            height: "700px",
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
              image={
                marker.isCurrentLocation
                  ? {
                      src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                      size: { width: 24, height: 35 },
                    }
                  : undefined
              }
            >
              {info && info.content === marker.content && (
                <div style={{ 
                  padding: "5px", 
                  color: "#000", 
                  backgroundColor: "#fff", 
                  borderRadius: "5px",
                  fontSize: "12px",
                  whiteSpace: "nowrap"
                }}>
                  {marker.content}
                </div>
              )}
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