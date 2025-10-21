import { useEffect, useRef } from 'react';
import { Footer } from "@/widgets/layout";

export function GetCharge() {

  const mapRef = useRef(null);

  useEffect(() => {
    // 카카오 지도 스크립트가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      // 카카오 지도 스크립트 동적 로드
      const script = document.createElement('script');
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };
    }

    function initializeMap() {
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
        level: 3 // 지도 확대 레벨
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(mapRef.current, options);

      // 마커 생성 (선택사항)
      const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    }
  }, []);
  return (
    <>
      <section className="relative block h-[13vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>

      <section className="p-4">
         <div
          ref={mapRef}
          className="w-full h-[60vh] rounded-2xl shadow-md"
          style={{ width: "100%", height: "500px" }}
        />
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  )
}

export default GetCharge;