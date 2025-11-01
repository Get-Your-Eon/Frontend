import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Carousel
} from "@material-tailwind/react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/cards";
import { featuresData, contactData, chargeData } from "@/data";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-cover bg-center" style={{backgroundColor: '#D5DBE0'}}/>
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="black"
                className="mb-20 font-black mt-56"
              >
                Electric On Mobility
              </Typography>
              <Link to="/subsidy">
                <button className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors">
                  자세히 알아보기
                </button>
              </Link>
              {/* <Typography variant="lead" color="black" className="opacity-80">
                전기차 구입부터 관리, 운행까지<br/>
                전 과정을 웹 하나로, 켜는 순간 시작되는 EON 라이프
              </Typography> */}

              {/* Car Image Carousel */}
              <div className="mt-10 w-full max-w-4xl mx-auto">
                <Carousel
                  className="rounded-xl"
                  autoplay={true}
                  autoplayDelay={3000}
                  loop={false}
                  prevArrow={false}
                  nextArrow={false}
                  navigation={false}
                  data-carousel="slide"
                >
                  <img
                    src="/img/slide1.webp"
                    alt="Electric Vehicle 1"
                    className="h-full w-full object-cover"
                  />
                  <img
                    src="/img/slide2.webp"
                    alt="Electric Vehicle 2"
                    className="h-full w-full object-cover"
                  />
                  <img
                    src="/img/slide3.webp"
                    alt="Electric Vehicle 3"
                    className="h-full w-full object-cover"
                  />
                  <img
                    src="/img/slide1.webp"
                    alt="Electric Vehicle 1"
                    className="h-full w-full object-cover"
                  />
                  <img
                    src="/img/slide2.webp"
                    alt="Electric Vehicle 2"
                    className="h-full w-full object-cover"
                  />
                  <img
                    src="/img/slide3.webp"
                    alt="Electric Vehicle 3"
                    className="h-full w-full object-cover"
                  />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-35 bg-white px-4 pb-20 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                우리는 전기차 사용자들에게 지침서가 되고 싶습니다.
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                전기차 보급률 증가에 따라 사용자들이 겪는 불편함은 정보의 분산에 있습니다.<br/>EON은 사용자들에게 전기차 구매, 관리, 운행에 필요한 정보를 한번에 제공하는 통합 플랫폼을 목표로 합니다.
                <br />
                <br />
                누구에게나 첫걸음은 낯설고 어렵습니다.
                전기차를 처음 구매하려는 사람들에게는 친절한 길잡이가, 전기차를 보유한 사람들에게는 스마트한 관리비서가 되어주고 싶습니다. 전기차의 시작부터 관리까지, 언제나 곁에서 함께하는 든든한 동반 앱을 만들기 위해 이 서비스를 만들었습니다.
              </Typography>
              {/* <Button variant="filled">read more</Button> */}
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/ev2.jpg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  {/* <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography> */}
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    About EON
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    전기차 구매,관리,운행에 필요한 정보를 앱 하나로 해결<br/>
                    실시간 충전소 현황, 보조금 계산, 모델 비교 등 원스톱 서비스<br/>
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white px-4">
          <img 
            src="/img/main1.webp" 
            alt="Description" 
            className="mx-auto max-w-full h-auto"
          />
      </section>
      {/* <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration,
            Ted, Scambos, NSIDClead scentist, puts the potentially record
            maximum.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section> */}
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="" heading="전기차 보조금 조회 및 비교">
            경기도 성남시 기준으로 전기차 모델별 보조금 조회 및 비교<br/>
            {/* 전기차 제조사, 시리즈명 선택 후 국비, 지방비 보조금 비교 확인 가능 */}
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>

          <PageTitle section="" heading="전기차 충전소 위치 조회">
            내 위치를 기준으로 전기차 충전소 검색<br/>
            {/* 전기차 제조사, 시리즈명 선택 후 국비, 지방비 보조금 비교 확인 가능 */}
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {chargeData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>

          {/* <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle> */}
          {/* <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form> */}
        </div>
      </section>
      <section className="relative bg-white px-4">
          <img 
            src="/img/main2.webp" 
            alt="Description" 
            className="mx-auto max-w-full h-auto"
          />
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
