export function ChargerList({ markers, onMarkerClick, chargers, selectedStationId }) {
  const chargerStations = markers.filter(marker => !marker.isCurrentLocation);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[30rem] overflow-y-auto">
      <h3 className="font-bold text-lg mb-3 text-eon-dark">실시간 충전 현황</h3>
      {chargerStations.length === 0 ? (
        <p className="text-gray-500 text-sm">주변에 충전소가 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {chargerStations.map((station, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onMarkerClick(station.station_id, station.addr)}
            >
              <div className="font-semibold text-sm text-eon-dark mb-1">
                {station.station_name}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {station.addr}
              </div>
              <div className="text-xs text-gray-500">
                {station.available_charger > 0 ? (
                  <>전체 {station.total_charger}대 중 <span className="text-eon-light">{station.available_charger}대</span> 충전 가능</>
                ) : (
                  <>충전정보가 없습니다.</>
                )}
              </div>
              
              {/* 선택된 스테이션의 충전기 상세 정보 표시 */}
              {selectedStationId === station.station_id && chargers && chargers.charger_details && station.available_charger > 0 && (
                <div className="mt-3 border-t pt-3">
                  <div className="text-xs text-gray-700 font-medium mb-2">충전기 정보:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {chargers.charger_details.map((charger, i) => (
                      <div
                        key={i}
                        className={`border-2 rounded-md p-2 text-center ${
                          charger.availability === '사용가능'
                            ? 'border-eon-light bg-eon-light bg-opacity-20'
                            : 'border-gray-300 bg-gray-100'
                        }`}
                      >
                        <div className="text-xs font-medium mb-1">
                          {charger.charger_name}
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {charger.charge_type_description}
                        </div>
                        <div className="text-xs font-semibold">
                          {charger.status_text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 로딩 상태 표시 */}
              {selectedStationId === station.station_id && !chargers && (
                <div className="mt-3 border-t pt-3">
                  <div className="text-xs text-gray-500">충전기 정보를 불러오는 중...</div>
                </div>
              )}
            </div>
          ))}
          <p className="text-xs text-gray-600 mt-2 text-right">*제공처의 충전기 정보 업데이트 시간차이로 실제와 다를 수 있습니다.<span className="text-eon-dark"> <a href="https://en-ter.co.kr/main.do" target="_blank">에너지마켓플레이스 제공</a></span></p>
        </div>
      )}
    </div>
  );
}