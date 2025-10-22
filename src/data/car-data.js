import defaultCarImage from '../assets/car_ioniq.avif'
import default2CarImage from '../assets/car_casper.avif'

export const manufacturers = [
  {
    id: '현대자동차',
    name: '현대자동차',
    models: [
      { id: 'GV60', name: 'GV60' },
      { id: 'GV70', name: 'GV70' },
      { id: '아이오닉6', name: '아이오닉6' },
      { id: '코나 EV', name: '코나 EV' },
      { id: '아이오닉5', name: '아이오닉5' },
      { id: 'G80', name: 'G80' },
      { id: '아이오닉9', name: '아이오닉9' },
    ]
  },
  {
    id: '기아',
    name: '기아',
    models: [
      { id: 'Niro EV', name: 'Niro EV' },
      { id: 'EV9', name: 'EV9' },
      { id: 'EV6', name: 'EV6' },
      { id: 'EV3', name: 'EV3' },
      { id: 'EV4', name: 'EV4' },
      { id: 'PV5', name: 'PV5' },
      { id: 'EV5', name: 'EV5' }
    ]
  },
  {
    id: '르노코리아',
    name: '르노코리아',
    models: [
      { id: 'scenic', name: 'scenic' }
    ]
  },
  {
    id: 'BMW',
    name: 'BMW',
    models: [
      { id: 'MINI', name: 'MINI' },
      { id: 'i4', name: 'i4' },
      { id: 'iX1', name: 'iX1' },
      { id: 'iX2', name: 'iX2' },
      { id: 'i5', name: 'i5' }
    ]
  },
  {
    id: '테슬라코리아',
    name: '테슬라코리아',
    models: [
      { id: 'Model 3', name: 'Model 3' },
      { id: 'Model Y', name: 'Model Y' },
    ]
  },
  {
    id: '메르세데스벤츠코리아',
    name: '메르세데스벤츠코리아',
    models: [
      { id: 'EQB', name: 'EQB' },
      { id: 'EQA', name: 'EQA' },
    ]
  },
  {
    id: '폭스바겐그룹코리아',
    name: '폭스바겐그룹코리아',
    models: [
      { id: '아우디 Q4', name: '아우디 Q4' },
      { id: '폭스바겐 ID.4', name: '폭스바겐 ID.4' },
      { id: '폭스바겐 ID.5', name: '폭스바겐 ID.5' },
      { id: '아우디 Q6', name: '아우디 Q6' }
    ]
  },
  {
    id: '케이지모빌리티',
    name: '케이지모빌리티',
    models: [
      { id: '토레스 EVX', name: '토레스 EVX' },
      { id: '코란도 EV', name: '코란도 EV' },
    ]
  },
  {
    id: '폴스타오토모티브코리아',
    name: '폴스타오토모티브코리아',
    models: [
      { id: 'Polestar 4', name: 'Polestar 4' },
    ]
  },
  {
    id: '볼보자동차코리아',
    name: '볼보자동차코리아',
    models: [
      { id: 'EX30', name: 'EX30' },
    ]
  },
  {
    id: '비와이디코리아',
    name: '비와이디코리아',
    models: [
      { id: 'ATTO 3', name: 'ATTO 3' },
      { id: 'SEAL', name: 'SEAL' }
    ]
  }
];

export const getModelsByManufacturer = (manufacturerId) => {
  const manufacturer = manufacturers.find(m => m.id === manufacturerId);
  return manufacturer ? manufacturer.models : [];
};

export const modelImageMap = {
  GV60: defaultCarImage,
  GV70: default2CarImage,
};

export const getImageByModel = (modelId) => {
  return modelImageMap[modelId] ?? defaultCarImage;
};