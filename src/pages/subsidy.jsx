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

  const handleManufacturerChange = (e) => {
    const manufacturerId = e.target.value;
    setSelectedManufacturer(manufacturerId);
    setSelectedModel(''); // 모델명 초기화
    setCarImageSrc(carImage); // 제조사 변경하면 default 이미지로 초기화
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleSidoChange = (e) => {
    setSelectedSido(e.target.value);
    setSelectedSigungu(''); // 시/군/구 초기화
  };

  const handleSigunguChange = (e) => {
    setSelectedSigungu(e.target.value);
  };

  const handleSearch = async () => {
    if (!selectedSido || !selectedSigungu || !selectedManufacturer || !selectedModel) {
      alert('시/도, 시/군/구, 제조사, 모델을 모두 선택해주세요.');
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
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>

      {/* <section>
        <div className='sub-page2'>
          <div className='request-box'>
            <div>
              <p>내 차 보조금 조회하기</p>
              <select className='sido-select' defaultValue='default'>
                <option value='default' disabled>시/도 선택</option>
                <option value=''>경기도</option>
              </select>

              <select className='sigungu-select' defaultValue='default'>
                <option value='default' disabled>시/군/구 선택</option>
                <option value=''>성남시</option>
              </select>

              <select 
                className='manufacturer-select'
                value={selectedManufacturer}
                onChange={handleManufacturerChange}
              >
                <option value='' disabled>제조사 선택</option>
                <option value='현대자동차'>현대</option>
                <option value='기아'>기아</option>
                <option value='르노코리아'>르노</option>
                <option value='BMW'>BMW</option>
                <option value='테슬라코리아'>테슬라</option>
                <option value='메르세데스벤츠코리아'>메르세데스벤츠</option>
                <option value='폭스바겐그룹코리아'>폭스바겐</option>
                <option value='케이지모빌리티'>KGM</option>
                <option value='폴스타오토모티브코리아'>폴스타</option>
                <option value='볼보자동차코리아'>볼보</option>
                <option value='비와이디코리아'>BYD</option>
              </select>

              <select 
                className='model-select'
                value={selectedModel}
                onChange={handleModelChange}
                disabled={!selectedManufacturer}
              >
              <option value="" disabled>
                  {!selectedManufacturer ? '제조사를 먼저 선택해주세요' : '모델명 선택'}
                </option>
                {availableModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>

              <button type='button' onClick={handleSearch}>보조금 조회</button>
            </div>
          </div>
          <div className='result-box'>
          {subsidyResults.length === 0 ? (
              <div>
                <p>검색 결과가 없습니다.</p>
              </div>
            ) : (
              subsidyResults.map((result, index) => (
                <div key={`res-${index}`} className='result-item'>
                  <div>
                    <img src={carImageSrc} alt='자동차모델이미지' />
                    <h4>{result.model_name}</h4>
                    <p>국비: <span>{result.subsidy_national}</span> 만원</p>
                    <p>지방비: <span>{result.subsidy_local}</span> 만원</p>
                    <p>총합: <span>{result.subsidy_total}</span> 만원</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section> */}

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
                    className="w-full px-4 py-3 border border-blue-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white"
                    value={selectedSido}
                    onChange={handleSidoChange}
                  >
                    <option value="" disabled>시/도 선택</option>
                    <option value="경기도">경기도</option>
                  </select>

                  <select 
                    className="w-full px-4 py-3 border border-blue-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white"
                    defaultValue="default"
                    value={selectedSigungu}
                    onChange={handleSigunguChange}
                    // disabled={!selectedSido}
                  >
                    <option value="" disabled>
                      시/군/구 선택
                      {/* {!selectedSido ? "시/도를 먼저 선택해주세요" : "시/군/구 선택"} */}
                    </option>
                    <option value="성남시">성남시</option>
                  </select>

                  <select 
                    className="w-full px-4 py-3 border border-blue-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white"
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
                    className="w-full px-4 py-3 border border-blue-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-gray-700 bg-white disabled:bg-blue-gray-50 disabled:text-blue-gray-400"
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
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
                  >
                    보조금 조회
                  </button>
                </div>
              </div>
            </div>

            {/* 결과 박스 */}
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
                              className="w-48 h-32 object-cover rounded-lg shadow-md"
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
                      </div>
                    ))}
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
