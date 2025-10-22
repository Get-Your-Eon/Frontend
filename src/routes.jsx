import { Home, Subsidy, GetCharge } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "보조금 찾기",
    path: "/subsidy",
    element: <Subsidy />,
  },
  {
    name: "충전소 찾기",
    path: "/charge",
    element: <GetCharge />,
  },
];

export default routes;
