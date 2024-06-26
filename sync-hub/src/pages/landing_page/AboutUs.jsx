import {
  FacebookOutlined,
  LinkedIn,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function AboutUs() {
  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | About Us";
  }, []);
  const socialMediaLinks = [
    {
      link: "https://www.facebook.com/profile.php?id=100060733820016",
      title: <FacebookOutlined />,
      id: "Facebook",
    },
    {
      link: "https://twitter.com/elijahdimeji549",
      title: <Twitter />,
      id: "Twitter",
    },
    { link: "https://wa.link/zyjbt6", title: <WhatsApp />, id: "Whatsapp" },
    {
      link: "https://www.linkedin.com/in/oladimeji-olalekan-a24a58250",
      title: <LinkedIn />,
      id: "LinkedIn",
    },
  ];
  return (
    <div className="mt-5 lg:w-2/3 bg-red-40">
      <p
        id="top"
        className="text-lg font-bold varela p-2 border-b border-slate-300"
      >
        About Us
      </p>

      <p>
        {" "}
        This project was built using the <em>MERN</em> stack.
      </p>
      <div className="mt-5 space-y-1">
        <div className="flex items-end">
          <div className="w-[10%] flex items-center justify-center bg-red-20">
            <p className="text-2xl font-bold ">M</p>
          </div>
          <p className="text-base font-normal">ongoDB</p>
        </div>
        <div className="flex items-end">
          <div className="w-[10%] flex items-center justify-center bg-red-20">
            <p className="text-2xl font-bold ">E</p>
          </div>
          <p className="text-base font-normal">xpressJs</p>
        </div>
        <div className="flex items-end">
          <div className="w-[10%] flex items-center justify-center bg-red-20">
            <p className="text-2xl font-bold ">R</p>
          </div>
          <p className="text-base font-normal">eactJs</p>
        </div>
        <div className="flex items-end">
          <div className="w-[10%] flex items-center justify-center bg-red-20">
            <p className="text-2xl font-bold ">N</p>
          </div>
          <p className="text-base font-normal">odeJs</p>
        </div>
        <p>
          * Styling was done with{" "}
          <em className="font-medium underline-offset-2 underline text-green-700">
            TailwindCSS
          </em>
        </p>
      </div>
      <p className="my-5 text-lg font-semibold varela border-b border-slate-300">
        {" "}
        - Contact the developer -{" "}
      </p>
      <div className="flex justify-evenly lg:justify-start lg:gap-10 items-center ">
        {socialMediaLinks.map((items) => {
          return (
            <div
              key={items.id}
              className="group w-8 h-8 rounded-full relative bg-red-30 flex items-center justify-center"
            >
              <NavLink to={items.link}>{items.title}</NavLink>
              <div className="transition-all group-hover:translate-x-8 absolute -bottom-2 right-full w-full group-hover:bg-orange-400 h-1"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutUs;
