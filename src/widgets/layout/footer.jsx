import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
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
