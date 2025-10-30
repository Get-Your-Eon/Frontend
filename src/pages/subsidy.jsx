import React, { useState } from 'react';
import carImage from '/img/cars/gv60.png';
import { getModelsByManufacturer, getImageByModel } from '@/data/car-data';
import { Footer } from "@/widgets/layout";
import { fetchSubsidy } from '@/api/apis';

export function Subsidy() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [carImageSrc, setCarImageSrc] = useState(carImage);
  const [subsidyResults, setSubsidyResults] = useState([]);

  // 에러 상태 추가
  const [errors, setErrors] = useState({
    sido: false,
    sigungu: false,
    manufacturer: false,
    model: false
  });

  const handleSidoChange = (e) => {
    setSelectedSido(e.target.value);
    setSelectedSigungu(''); // 시/군/구 초기화
    setErrors(prev => ({ ...prev, sido: false, sigungu: false }));
  };

  const handleSigunguChange = (e) => {
    setSelectedSigungu(e.target.value);
    setErrors(prev => ({ ...prev, sigungu: false }));
  };

  const handleManufacturerChange = (e) => {
    const manufacturerId = e.target.value;
    setSelectedManufacturer(manufacturerId);
    setSelectedModel(''); // 모델명 초기화
    setCarImageSrc(carImage); // 제조사 변경하면 default 이미지로 초기화
    setErrors(prev => ({ ...prev, manufacturer: false, model: false }));
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setErrors(prev => ({ ...prev, model: false }));
  };

  const handleSearch = async () => {
    // 에러 상태 초기화
    const newErrors = {
      sido: !selectedSido,
      sigungu: !selectedSigungu,
      manufacturer: !selectedManufacturer,
      model: !selectedModel
    };

    setErrors(newErrors);

    // 하나라도 에러가 있으면 return
    if (Object.values(newErrors).some(error => error)) {
      const missingFields = [];
      if (newErrors.sido) missingFields.push('시/도');
      if (newErrors.sigungu) missingFields.push('시/군/구');
      if (newErrors.manufacturer) missingFields.push('제조사');
      if (newErrors.model) missingFields.push('모델');
      
      alert(`다음 항목을 선택해주세요: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const data = await fetchSubsidy(selectedManufacturer, selectedModel);
      console.log('검색 결과:', data);
      
      setSubsidyResults(Array.isArray(data) ? data : [data]);
      // 선택 모델에 해당하는 이미지로 변경
      const newImageSrc = getImageByModel(selectedModel);
      setCarImageSrc(newImageSrc);
      
    } catch (error) {
      alert('보조금 정보를 가져오는 중 오류가 발생했습니다.');
      console.error('검색 오류:', error);
    }
  };

  // 모델명 가져오기
  const availableModels = getModelsByManufacturer(selectedManufacturer);
  return (
    <>
      <section className="relative block h-[20vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-cover bg-center"/>
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-xl p-8 border border-blue-gray-50">
                <h2 className="text-2xl font-bold text-blue-gray-700 mb-8 text-center">
                  내 차 보조금 조회하기
                </h2>
                
                <div className="space-y-4">
                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white ${
                      errors.sido 
                        ? 'border-red-500 ring-2 ring-red-200' 
                        : 'border-blue-gray-200'
                    }`}
                    value={selectedSido}
                    onChange={handleSidoChange}
                  >
                    <option value="" disabled>시/도 선택</option>
                    <option value="경기도">경기도</option>
                  </select>

                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white ${
                      errors.sigungu 
                        ? 'border-red-500 ring-2 ring-red-200' 
                        : 'border-blue-gray-200'
                    }`}
                    value={selectedSigungu}
                    onChange={handleSigunguChange}
                  >
                    <option value="" disabled>
                      시/군/구 선택
                    </option>
                    <option value="성남시">성남시</option>
                  </select>

                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white ${
                      errors.manufacturer 
                        ? 'border-red-500 ring-2 ring-red-200' 
                        : 'border-blue-gray-200'
                    }`}
                    value={selectedManufacturer}
                    onChange={handleManufacturerChange}
                  >
                    <option value="" disabled>제조사 선택</option>
                    <option value="현대자동차">현대</option>
                    <option value="기아">기아</option>
                    <option value="르노코리아">르노</option>
                    <option value="BMW">BMW</option>
                    <option value="테슬라코리아">테슬라</option>
                    <option value="메르세데스벤츠코리아">메르세데스벤츠</option>
                    <option value="폭스바겐그룹코리아">폭스바겐</option>
                    <option value="케이지모빌리티">KGM</option>
                    <option value="폴스타오토모티브코리아">폴스타</option>
                    <option value="볼보자동차코리아">볼보</option>
                    <option value="비와이디코리아">BYD</option>
                  </select>

                  <select 
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white disabled:bg-blue-gray-50 disabled:text-blue-gray-400 ${
                      errors.model 
                        ? 'border-red-500 ring-2 ring-red-200' 
                        : 'border-blue-gray-200'
                    }`}
                    value={selectedModel}
                    onChange={handleModelChange}
                    disabled={!selectedManufacturer}
                  >
                    <option value="" disabled>
                      {!selectedManufacturer ? "제조사를 먼저 선택해주세요" : "모델명 선택"}
                    </option>
                    {availableModels.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>

                  <button 
                    type="button" 
                    onClick={handleSearch}
                    className="w-full bg-eon-light hover:bg-eon-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
                  >
                    보조금 조회
                  </button>
                </div>
              </div>
            </div>

            {/* 보조금 조회 결과 */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-xl p-8 border border-blue-gray-50 min-h-[400px]">
                {subsidyResults.length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="text-6xl text-blue-gray-300 mb-4">🔍</div>
                      <p className="text-xl text-blue-gray-500">검색 결과가 없습니다.</p>
                      <p className="text-sm text-blue-gray-400 mt-2">제조사와 모델을 선택한 후 조회해보세요.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {subsidyResults.map((result, index) => (
                      <div 
                        key={`res-${index}`} 
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="flex-shrink-0">
                            <img 
                              src={carImageSrc} 
                              alt="자동차모델이미지" 
                              className="w-50 h-37 object-contain rounded-lg shadow-md"
                            />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <h4 className="text-2xl font-bold text-blue-gray-800 mb-4">
                              {result.model_name}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-blue-gray-500 mb-1">국비</p>
                                <p className="text-lg font-bold text-green-600">
                                  {result.subsidy_national} 만원
                                </p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-blue-gray-500 mb-1">지방비</p>
                                <p className="text-lg font-bold text-blue-600">
                                  {result.subsidy_local} 만원
                                </p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-red-200">
                                <p className="text-sm text-blue-gray-500 mb-1">총 보조금</p>
                                <p className="text-xl font-bold text-red-600">
                                  {result.subsidy_total} 만원
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-200">
                          <div className="text-center">
                            <h5 className="text-lg font-bold text-orange-700 mb-3">💰 실제 구매가격</h5>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="text-sm text-blue-gray-600 mb-2">
                                <span className="font-medium">차량 정가</span>
                                <span className="mx-2">-</span>
                                <span className="font-medium">총 보조금</span>
                                <span className="mx-2">=</span>
                                <span className="font-medium text-orange-600">실제 구매가격</span>
                              </div>
                              <div className="text-lg font-mono">
                                <span className="text-blue-gray-700">{result.salePrice?.toLocaleString()}만원</span>
                                <span className="mx-2 text-blue-gray-500">-</span>
                                <span className="text-red-600">{(result.subsidy_total * 10000)?.toLocaleString()}만원</span>
                                <span className="mx-2 text-blue-gray-500">=</span>
                                <span className="text-2xl font-bold text-orange-600">
                                  {(result.salePrice - result.subsidy_total)?.toLocaleString()}만원
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className='text-sm text-blue-gray-500 text-right'>데이터 제공 : 환경부 무공해차 통합누리집<br/>
                      *정확한 정보는 지자체에 문의해주세요
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Subsidy;
