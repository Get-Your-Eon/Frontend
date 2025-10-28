import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk"
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
  const [currentLocation, setCurrentLocation] = useState(null);

  // 지도크기에 따라 radius 값 바꿔주기
  const getRadiusFromLevel = (level) => {
    if (level <= 3) return 500;
    if (level <= 5) return 1000;
    if (level <= 7) return 2000;
    if (level <= 9) return 3000;
    if (level <= 11) return 4000;
    if (level <= 13) return 5000;
    return 10000;
  };

  // 충전소 데이터 가져오기
  const loadChargeStations = async (centerLat, centerLng, radius, userLat, userLng) => {
    try {
      const stationsData = await fetchChargeStations(centerLat, centerLng, radius);
      console.log('충전소 데이터:', stationsData, 'radius:', radius);
      
      // 현재 위치 마커
      const newMarkers = [
        {
          position: { lat: userLat, lng: userLng },
          content: "현재 위치",
          isCurrentLocation: true,
        }
      ];

      // 충전소 마커
      if (stationsData.stations && stationsData.stations.length > 0) {
        stationsData.stations.forEach((station) => {
          newMarkers.push({
            position: {
              lat: station.lat,
              lng: station.lon,
            },
            content: station.addr + "\n" + station.station_name,
            station_name: station.station_name,  // 추가
            addr: station.addr,  // 추가
            isCurrentLocation: false,
          });
        });
      }

      console.log('마커 개수:', newMarkers.length);
      setMarkers(newMarkers);
    } catch (error) {
      console.error("충전소 데이터를 가져오는데 실패했습니다:", error);
      // 에러가 나도 현재 위치 마커는 표시
      setMarkers([
        {
          position: { lat: userLat, lng: userLng },
          content: "현재 위치",
          isCurrentLocation: true,
        }
      ]);
    }
  };

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setCurrentLocation({ lat, lng });
          setState((prev) => ({
            ...prev,
            center: { 
              lat: lat,
              lng: lng,
            },
            isLoading: false,
          }));

          // 현재 위치에 마커 표시
          setMarkers([
            {
              position: { lat, lng },
              content: "현재 위치",
              isCurrentLocation: true,
            }
          ]);
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

  // 지도를 블러오고 현재 위치를 알 때 초기 충전소 데이터 불러오기
  useEffect(() => {
    if (map && currentLocation) {
      loadChargeStations(
        currentLocation.lat, 
        currentLocation.lng, 
        2000,
        currentLocation.lat,
        currentLocation.lng
      );
    }
  }, [map, currentLocation]);

  // 줌 레벨 변경 감지
  useEffect(() => {
    if (!map || !currentLocation) return;

    const handleZoomChanged = () => {
      const level = map.getLevel();
      const center = map.getCenter();
      const radius = getRadiusFromLevel(level);

      const moveLatLon = new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);
      map.panTo(moveLatLon);
      
      loadChargeStations(
        center.getLat(), 
        center.getLng(), 
        radius,
        currentLocation.lat,
        currentLocation.lng
      );
    };

    kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map, currentLocation]);

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
          level={7}
          onCreate={setMap}
        >
          {markers.map((marker, index) => (
            <MapMarker
              key={`marker-${index}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
              image={
                marker.isCurrentLocation
                  ? {
                      src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                      size: { width: 24, height: 35 },
                    }
                  : {
                    src: "/img/eon.png",
                    size: { width: 40, height: 40 },
                  }
              }
            />
            ))}
              
            {info && !info.isCurrentLocation && (
            <CustomOverlayMap position={info.position} yAnchor={1.7}>
              <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px]">
                <div className="flex justify-between items-center mb-2 border-b pb-2">
                  <div className="font-bold text-sm">{info.station_name}</div>
                  <button
                    className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                    onClick={() => setInfo(null)}
                    title="닫기"
                  >
                    ×
                  </button>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="mb-2">{info.addr}</div>
                </div>
              </div>
            </CustomOverlayMap>
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