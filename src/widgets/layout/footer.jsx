import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  const brands = [
    { name: '현대', url: 'https://www.hyundai.com/kr/ko/e' },
    { name: '기아', url: 'https://www.kia.com/kr' },
    { name: '르노', url: 'https://www.renault.co.kr/ko/main/main.jsp' },
    { name: 'BMW', url: 'https://www.bmw.co.kr/ko/index.html' },
    { name: '테슬라', url: 'https://www.tesla.com/ko_kr' },
    { name: '메르세데스벤츠', url: 'https://www.mercedes-benz.co.kr/' },
    { name: '폭스바겐', url: 'https://www.volkswagen.co.kr/ko.html' },
    { name: 'KGM', url: 'https://www.kg-mobility.com/' },
    { name: '폴스타', url: 'https://www.polestar.com/kr/' },
    { name: '볼보', url: 'https://www.volvocars.com/kr/' },
    { name: 'BYD', url: 'https://www.bydauto.kr/index' },
  ];

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <footer className="relative px-4 pt-8 pb-6 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-4 pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-5/12">
            <Typography variant="h4" className="mb-4 text-white" color="white">
              {title}
            </Typography>
            <Typography className="font-normal text-gray-300 lg:w-2/5">
              {description}
            </Typography>
            {/* socials + toggle removed from here and will be placed into the three-column responsive area below */}
          </div>

          

          {/* three-column responsive area: socials+toggle | 이용약관 메뉴 | 고객센터 menu */}
          <div className="w-full mt-4 flex flex-row items-start justify-between gap-4">
            {/* first column: socials + toggle */}
            <div className="w-1/3 flex justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                {socials.map(({ color, name, path }) => (
                  <a
                    key={name}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                      <Typography color={name === 'github' ? 'white' : color}>
                        <i className={`fa-brands fa-${name}`} />
                      </Typography>
                    </IconButton>
                  </a>
                ))}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex items-center gap-3 rounded-md border border-gray-400 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                  >
                    <span className="text-sm text-white whitespace-nowrap">{selectedIndex !== null ? brands[selectedIndex]?.name : '브랜드 바로가기'}</span>
                    <svg className={`w-4 h-4 text-white transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {open && (
                    <ul
                      role="listbox"
                      className="absolute left-1/2 bottom-full z-30 mb-2 w-72 -translate-x-1/2 overflow-hidden rounded-md border border-gray-700 bg-gray-700 text-white shadow-lg"
                    >
                      {brands.map((b, idx) => (
                        <li
                          key={b.name}
                          role="option"
                          aria-selected={selectedIndex === idx}
                          onClick={() => { setSelectedIndex(idx); window.open(b.url, '_blank'); setOpen(false); }}
                          className={`cursor-pointer px-3 py-2 ${selectedIndex === idx ? 'bg-gray-600 font-semibold' : 'hover:bg-gray-600'}`}
                        >
                          <span className="text-sm text-white">{b.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* second column: first menu */}
            <div className="w-1/3 text-center lg:text-left">
              <Typography variant="small" color="gray" className="mb-2 block font-medium uppercase text-gray-300">
                {menus[0]?.name}
              </Typography>
              <ul className="mt-3">
                {(menus[0]?.items || []).map((item) => (
                  <li key={item.name}>
                    <Typography as="a" href={item.path} target="_blank" rel="noreferrer" variant="small" className="mb-2 block font-normal text-gray-300 hover:text-white">
                      {item.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>

            {/* third column: second menu */}
            <div className="w-1/3 text-center lg:text-left">
              <Typography variant="small" color="gray" className="mb-2 block font-medium uppercase text-gray-300">
                {menus[1]?.name}
              </Typography>
              <ul className="mt-3">
                {(menus[1]?.items || []).map((item) => (
                  <li key={item.name}>
                    <Typography as="a" href={item.path} target="_blank" rel="noreferrer" variant="small" className="mb-2 block font-normal text-gray-300 hover:text-white">
                      {item.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex flex-wrap items-center justify-center md:justify-between bg-black py-4">
          <div className="mx-auto w-full px-4 text-center">
            <Typography variant="small" className="font-normal text-gray-400">
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "EON",
  description:
    "전기차 토탈 관리 플랫폼",
  socials: [
    // {
    //   color: "gray",
    //   name: "twitter",
    //   path: "https://www.twitter.com/creativetim",
    // },
    // {
    //   color: "gray",
    //   name: "youtube",
    //   path: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    // },
    // {
    //   color: "gray",
    //   name: "instagram",
    //   path: "https://www.instagram.com/creativetimofficial/",
    // },
    {
      color: "black",
      name: "github",
      path: "https://github.com/orgs/Get-Your-Eon/repositories",
    },
  ],
  menus: [
    {
      name: "이용약관",
      items: [
        { name: "개인정보 처리방침" },
        // { name: "Blog", path: "https://www.creative-tim.com/blog" },
        {
          name: "이메일무단수집거부",
          // path: "https://github.com/orgs/Get-Your-Eon/repositories",
        },
        // {
        //   name: "Free Products",
        //   path: "https://www.creative-tim.com/templates/free?ref=mtk",
        // },
      ],
    },
    {
      name: "고객센터",
      items: [
        // {
        //   name: "MIT License",
        //   path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
        // },
        // {
        //   name: "Contribute",
        //   path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
        // },
        // {
        //   name: "Change Log",
        //   path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
        // },
        {
          name: "Contact Us",
          path: "https://discord.com/channels/1408060888027758764/1433490640515239967",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} EON All rights reserved.{" "}
      {/* <a
        href="https://github.com/orgs/Get-Your-Eon/repositories"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        TEAM EON
      </a>
      . */}
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
