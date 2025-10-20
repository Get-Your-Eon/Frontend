import {
  CurrencyDollarIcon,
  GiftIcon,
  MapPinIcon,
  BoltIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export const contactData = [
  {
    title: "전기차 구매전 가격 비교",
    icon: CurrencyDollarIcon,
    description:
      "전기차 구매 전 다양한 모델의 가격을 비교해보세요.",
  },
  {
    title: "정부 보조금을 한눈에",
    icon: GiftIcon,
    description:
      "정부 보조금과 지자체 보조금을 포함한 실구매가를 한눈에 확인할 수 있습니다.",
  },
  {
    title: "내가 사는 지역을 기준으로 조회",
    icon: MapPinIcon,
    description:
      "내가 사는 지역을 기준으로 전기차 보조금을 쉽게 조회할 수 있습니다.",
  },
];

export const chargeData = [
  {
    title: "실시간 충전소 현황",
    icon: BoltIcon,
    description:
      "실시간으로 충전소의 사용 가능 여부와 대기 상황을 확인할 수 있습니다.",
  },
  {
    title: "내 위치 기준 충전소 검색",
    icon: MapPinIcon,
    description:
      "현재 위치를 기준으로 가장 가까운 충전소를 찾아드립니다.",
  },
  {
    title: "충전 시간 및 요금 안내",
    icon: ClockIcon,
    description:
      "충전소별 예상 충전 시간과 요금 정보를 미리 확인할 수 있습니다.",
  },
];

export default contactData;
