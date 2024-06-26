import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowForwardIos,
  Call,
  ChatBubble,
  Message,
  NearMe,
  RemoveRedEyeOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import Header from "./Header";
import MenuBar from "./MenuBar";
import {
  AddCircleOutlineOutlined,
  ArticleOutlined,
  Chat,
  ChatOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import MenuBarExtend from "./MenuBarExtend";
import getHook from "../../apiHooks/getHook";
import request from "../images/request.png";
import vector from "../images/vector_cube.avif";
import universe from "../../assets/video/universe.mp4";
let dotEnv = import.meta.env;

function LandingPage() {
  const [menuBarState, setMenuBarState] = useState(false);
  const [menuBarExtend, setMenuBarExtend] = useState(false);
  const [menuBarExtendOption, setMenuBarExtendOption] = useState("");
  const [trapeziumState, setTrapeziumState] = useState({
    color: "",
    gradientColor: "",
    gradientDirection: "",
  });
  const [count, setCount] = useState({
    users: 0,
    requests: 0,
    responses: 10,
  });
  const navigate = useNavigate();

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL;
  } else {
    baseURL = dotEnv.VITE_PROD_URL;
  }

  useEffect(() => {
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Home";
    let colors = [
      "bg-red-800",
      "bg-orange-800",
      "bg-teal-800",
      "bg-green-800",
      "bg-pink-800",
      "bg-purple-800",
      "bg-sky-800",
    ];
    let gradientColors = [
      "from-red-800 to-red-800",
      "from-orange-800 to-orange-800",
      "from-teal-800 to-teal-800",
      "from-green-800 to-green-800",
      "from-pink-800 to-pink-800",
      "from-purple-800 to-purple-800",
      "from-sky-800 to-sky-800",
    ].sort((a, b) => a.length - b.length);
    let gradientDirections = [
      "bg-gradient-to-t",
      "bg-gradient-to-b",
      "bg-gradient-to-l",
      "bg-gradient-to-r",
      "bg-gradient-to-tr",
      "bg-gradient-to-tl",
      "bg-gradient-to-br",
    ];

    setInterval(() => {
      let rndm = Math.round((Math.random() * 100) % 7);

      if (rndm % 2 === 1) {
        setTrapeziumState({
          color: colors[rndm],
          gradientDirection: "",
          gradientColor: "",
        });
      } else {
        setTrapeziumState({
          color: "",
          gradientDirection: gradientDirections[rndm],
          gradientColor: gradientColors[rndm],
        });
      }
    }, 5000);

    let dashboardAnalytics = localStorage.getItem("dashboard-analytics");
    if (dashboardAnalytics) {
      dashboardAnalytics = JSON.parse(dashboardAnalytics);
      setCount({
        users: dashboardAnalytics.users,
        requests: dashboardAnalytics.requests,
        responses: dashboardAnalytics.responses,
      });
    }

    async function getDashboardAnalytics() {
      let url = baseURL + "/dashboard-analytics";
      let response = await getHook(url);
      if (response.success) {
        let data = response.success;
        setCount({ users: data.users, requests: data.requests, responses: 10 });
        localStorage.setItem(
          "dashboard-analytics",
          JSON.stringify({
            users: data.users,
            requests: data.requests,
            responses: 10,
          })
        );
      }
    }
    getDashboardAnalytics();
  }, []);

  document.addEventListener("scroll", () => {
    setMenuBarState(false);
  });

  return (
    <div className="relative">
      <div className="relative p-3 bg-red-40">
        {menuBarState && (
          <MenuBar
            menuBarState={menuBarState}
            setMenuBarState={setMenuBarState}
            setMenuBarExtend={setMenuBarExtend}
            setMenuBarExtendOption={setMenuBarExtendOption}
          />
        )}
      </div>

      {menuBarExtend && (
        <div className="fixed z-20 top-0 h-full w-full bg-white overflow-scroll slideInLeft">
          <MenuBarExtend
            setMenuBarExtend={setMenuBarExtend}
            menuBarExtendOption={menuBarExtendOption}
          />
        </div>
      )}

      <div className="bg-red-40">
        <div
          id="trapezium"
          className={`lg:hidden absolute top-0 w-full h-48 lg:h-80 bg-gray-700 ${trapeziumState.color} ${trapeziumState.gradientDirection} ${trapeziumState.gradientColor} bg-opacity-90 changeColors `}
        ></div>
        <div
          id="trapezium"
          className={`hidden lg:block absolute top-0 w-full h-48 lg:h-80 bg-gray-800 bg-opacity-90`}
        ></div>

        <div className="relative w-full top-0 p-5 bg-red-40">
          <Header
            menuBarState={menuBarState}
            setMenuBarState={setMenuBarState}
            setMenuBarExtend={setMenuBarExtend}
            setMenuBarExtendOption={setMenuBarExtendOption}
          />
          <div className="space-y-5 lg:hidden">
            <div>
              <h1 className="mt-16 text-2xl font-bold font-serif text-gray-950">
                Empowering Connections. <br />
                Where Requests Meet Responses.
              </h1>
              <div className="flex items-center gap-2 justify-start text-xs md:text-base text-slate-800 mt-2">
                <div className="size-1 bg-slate-700 rounded-full"></div>
                <p>Send a request</p>
                <div className="size-1 bg-slate-700 rounded-full"></div>
                <p>Get a response</p>
                <div className="size-1 bg-slate-700 rounded-full"></div>
              </div>
            </div>

            <div className="w-72 aspect-video rounded-md overflow-hidden bg-red-500 mx-auto">
              <img src={vector} className="w-full" />
            </div>

            <h1 className="text-base md:text-lg leading-6 text-slate-600 font-[Rubik]">
              Revolutionizing the way your common needs and tasks are handled
              and addressed, our innovative project seamlessly bridges the gap
              between client needs and soluton offerings. By providing a
              user-friendly platform, we empower the common individuals and
              persons to effortlessly discover, engage and interact with service
              providers for any task or need at hand, thereby fostering a
              dynamic marketplace where every interaction leads to mutual
              satisfaction and success.
            </h1>
            <div className="flex items-center ">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 bg-gray-950 px-3 py-2 rounded-lg text-slate-50 text-base active:bg-green-500"
              >
                <p>Join us now</p>
                <div>
                  <ArrowForwardIos sx={{ fontSize: 20 }} />
                </div>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 px-10">
            <div className="w-1/2">
              <div>
                <h1 className="mt-16 text-3xl font-bold font-serif text-purple-400">
                  Empowering Connections. <br />
                  Where Requests Meet Responses.
                </h1>
                <div className="flex items-center gap-2 justify-start text-xs md:text-base text-slate-300 mt-2">
                  <div className="size-1 bg-slate-300 rounded-full"></div>
                  <p>Send a request</p>
                  <div className="size-1 bg-slate-300 rounded-full"></div>
                  <p>Get a response</p>
                  <div className="size-1 bg-slate-300 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-base md:text-lg mt-16 leading-6 text-slate-800 varela">
                Revolutionizing the way your common needs and tasks are handled
                and addressed, our innovative project seamlessly bridges the gap
                between client needs and soluton offerings. By providing a
                user-friendly platform, we empower the common individuals and
                persons to effortlessly discover, engage and interact with
                service providers for any task or need at hand, thereby
                fostering a dynamic marketplace where every interaction leads to
                mutual satisfaction and success.
              </h1>
              <div className="flex items-center my-5 ">
                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-2 bg-gray-950 px-3 py-2 rounded-lg text-slate-50 text-base active:bg-green-500"
                >
                  <p>Join us now</p>
                  <div>
                    <ArrowForwardIos sx={{ fontSize: 20 }} />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <div
                className={` overflow-hidden mx-auto rounded-md ${trapeziumState.color} ${trapeziumState.gradientDirection} ${trapeziumState.gradientColor} bg-opacity-90 changeColors p-1`}
              >
                <img
                  src={vector}
                  className="w-full aspect-video mx-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-950 relative z-20 overflow-hidden my-10 py-3">
          <div className="absolute -z-10 h-full w-full bg-red-40 hidden lg:block">
            <video autoPlay loop height="100%" width="100%">
              <source src={universe}type="video/mp4" />
            </video>
          </div>
          <div className="absolute size-40 rounded-full -top-10 -right-10 bg-orange-500">
            <div className="absolute size-20 rounded-full bg-gray-950 bottom-0 -right-0"></div>
          </div>
          <p className="relative w-[90%] font-light p-5 mx-auto text-xl font-serif text-orange-50 text-center text-balance lg:text-3xl">
            "Find and connect with people to help you do things"
          </p>
          <p className="text-orange-500 p-5 varela lg:text-center lg:text-2xl">
            Our services
          </p>

          <div className="p-5 space-y-3 lg:flex lg:space-y-0 lg:gap-5 lg:px-10">
            {[
              {
                icon: (
                  <AddCircleOutlineOutlined
                    sx={{ color: orange[900], fontSize: 20 }}
                  />
                ),
                title: "Add services requests",
                text: "You as a user can post service requests on the platform, out to the reach of potential helpers who might be able to help you.",
              },
              {
                icon: (
                  <ArticleOutlined sx={{ color: orange[900], fontSize: 20 }} />
                ),
                title: "View all services requests",
                text: "You can view through and explore all service requests posted by you and other users.",
              },
              {
                icon: (
                  <RemoveRedEyeOutlined
                    sx={{ color: orange[900], fontSize: 20 }}
                  />
                ),
                title: "View your services requests",
                text: "You can also choose to see only the service requests that you have personally made.",
              },
              {
                icon: (
                  <ChatOutlined sx={{ color: orange[900], fontSize: 20 }} />
                ),
                title: "Have a conversation with a res-shaker",
                text: "You can have an in-app conversation with a client you wish to help or assist with his/her request.",
              },
              {
                icon: (
                  <NotificationsNoneOutlined
                    sx={{ color: orange[900], fontSize: 20 }}
                  />
                ),
                title: "Receive alerts and notifications",
                text: "You will receive real-time alerts and notifications of messages from people who wish to help or assist you with your request.",
              },
            ].map((items) => {
              return (
                <div
                  key={items.title}
                  className="lg:w-[20%] lg:hover:scale-110 transition-all lg:hover:shadow lg:hover:shadow-slate-800 lg:hover:rounded-md"
                >
                  <div className="flex lg:flex-col gap-2 items-center lg:h-20 bg-red-40">
                    <div>{items.icon}</div>
                    <p className="text-orange-500 md:text-lg lg:text-center">
                      {items.title}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm md:text-lg lg:text-lg lg:text-center lg:h-40 lg:flex lg:items-center lg:px-2">
                    {items.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative p-5 space-y-5 overflow-hidden bg-red-40 lg:px-10">
          <div className="absolute -rotate-12 -top-32 -left-32 -z-10 text-slate-100 opacity-50">
            <StarBorderOutlined sx={{ fontSize: 400 }} />
          </div>
          <div className="absolute rotate-12 -bottom-24 -right-36 -z-10 text-slate-100 opacity-50">
            <StarBorderOutlined sx={{ fontSize: 400 }} />
          </div>

          <p className="varela text-xl md:text-2xl font-bold">
            The next big thing
          </p>
          <div className="text-sm md:text-xl text-balanc leading-6 text-slate-500 space-y-2">
            <p>
              By starting small and focusing on answering and solving the
              "incapability" questions of individuals, we hope to serve our
              users well and make life easier and less worrisome for them.
            </p>
            <p>
              You can't do it all. You can't have it all. You can't know it all.
              We know and that's why we are here.
            </p>
            <p>
              You have a request ? You have a task you need help with ? You need
              help getting something ?<br /> - Just send a request.
            </p>
          </div>

          <div
            id="dashboard-anaytics"
            className="hidden relative h-56 w-full bg-red-40 border-l-4 border-slate-200 "
          >
            <div className=" absolute -left-1 bg-red-90 space-y-5 md:text-xl">
              <div className="h-10">
                <p className="border-l-4 border-orange-400 px-3">
                  {count.users || 0}
                </p>
                <p className="px-4 text-xs text-slate-800">
                  active users on the platform
                </p>
              </div>
              <div className="h-10">
                <p className="border-l-4 border-orange-400 px-3">
                  {count.requests || 0}
                </p>
                <p className="px-4 text-xs">total service requests sent out</p>
              </div>
              <div className="h-10">
                <p className="border-l-4 border-orange-400 px-3">
                  {/* {Math.round(count.requests / count.users) || 0} */}
                  ---
                </p>
                <p className="px-4 text-xs">
                  average service requests sent out per user
                </p>
              </div>
              <div className="h-10">
                <p className="border-l-4 border-orange-400 px-3">
                  {/* {count.responses || 0} */}
                  ---
                </p>
                <p className="px-4 text-xs">received responses</p>
              </div>
            </div>
          </div>
        </div>

        <footer id="footer-cut" className="p-5 bg-slate-50 pt-20 pb-5">
          <div className="space-y-2 lg:flex lg:items-center lg:justify-between lg:px-10">
            <p className="text-xl varela font-bold text-slate-950">
              intertwined
            </p>
            <div className="flex items-center gap-2">
              <div>
                <NearMe sx={{ fontSize: 20 }} />
              </div>
              <p>Ibadan, Nigeria</p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Chat sx={{ fontSize: 20 }} />
              </div>
              <p>Ibadan, Nigeria</p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Call sx={{ fontSize: 20 }} />
              </div>
              <p>070-3788-7923</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
