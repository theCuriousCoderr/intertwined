import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowForwardIos,
  ChatBubble,
  Message,
  NearMe,
  RemoveRedEyeOutlined,
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
    responses: 0,
  });
  const navigate = useNavigate();

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
  }, []);

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL
  } else {
    baseURL = dotEnv.VITE_PROD_URL
  }

  // let analytics = document.getElementById("dashboard-anaytics");
  // let rect = analytics.getBoundingClientRect();
  // if (
  //   rect.top >= 0 &&
  //   rect.left >= 0 &&
  //   rect.bottom <=
  //   (window.innerHeight || document.documentElement.clientHeight) &&
  //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  // ) {

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

      <div className="bg-orange-50 bg-opacity-50">
        <div
          id="trapezium"
          className={`absolute top-0 w-full h-48 bg-gray-700 ${trapeziumState.color} ${trapeziumState.gradientDirection} ${trapeziumState.gradientColor} bg-opacity-90 changeColors `}
        ></div>

        <div className="relative w-full top-0 p-5 bg-red-40">
          <Header
            menuBarState={menuBarState}
            setMenuBarState={setMenuBarState}
          />
          <div className="space-y-5">
            <div>
              <h1 className="mt-16 text-2xl font-serif font-bold">
                Empowering Connections. <br />
                Where Requests Meet Responses.
              </h1>
              <div className="flex items-center gap-2 justify-start text-xs text-slate-800 mt-2">
                <div className="size-1 bg-slate-700 rounded-full"></div>
                <p>Send a request</p>
                <div className="size-1 bg-slate-700 rounded-full"></div>
                <p>Get a response</p>
                <div className="size-1 bg-slate-700 rounded-full"></div>
              </div>
            </div>

            <h1 className="text-sm leading-6 text-slate-500 ">
              Revolutionizing the way common needs and tasks are handled and
              addressed, our innovative project seamlessly bridges the gap
              between client needs and soluton offerings. By providing a
              user-friendly platform, we empower the common individuals and
              persons to effortlessly discover, engage and interact with service
              providers for any task or need at hand, thereby fostering a
              dynamic one-way marketplace where every interaction leads to
              mutual satisfaction and success.
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
        </div>

        <div className="bg-gray-950 relative overflow-hidden my-10 py-3">
          <div className="absolute size-40 rounded-full -top-10 -right-10 bg-orange-500">
            <div className="absolute size-20 rounded-full bg-gray-950 bottom-0 -right-0"></div>
          </div>
          <p className="relative w-[90%] font-light p-5 mx-auto text-xl font-serif text-orange-50 text-center text-balance">
            "Find and connect with people to help you do things"
          </p>
          <p className="text-orange-500 p-5 varela">Our services</p>

          <div className="p-5 space-y-3">
            {[
              {
                icon: 1,
                title: "Add services requests",
                text: "The platform allows you to post requests of whatever you might need help with",
              },
              {
                icon: 2,
                title: "View all services requests",
                text: "The platform allows you to post requests of whatever you might need help with",
              },
              {
                icon: 3,
                title: "View your services requests",
                text: "The platform allows you to post requests of whatever you might need help with",
              },
              {
                icon: 4,
                title: "Have a conversation with a res-shaker",
                text: "The platform allows you to post requests of whatever you might need help with",
              },
              {
                icon: 5,
                title: "Receive alerts and notifications",
                text: "The platform allows you to post requests of whatever you might need help with",
              },
            ].map((items) => {
              return (
                <div key={items.icon}>
                  <div className="flex gap-2 items-center">
                    <div>
                      {items.icon === 1 && (
                        <AddCircleOutlineOutlined
                          sx={{ color: orange[900], fontSize: 20 }}
                        />
                      )}
                      {items.icon === 2 && (
                        <ArticleOutlined
                          sx={{ color: orange[900], fontSize: 20 }}
                        />
                      )}
                      {items.icon === 3 && (
                        <RemoveRedEyeOutlined
                          sx={{ color: orange[900], fontSize: 20 }}
                        />
                      )}
                      {items.icon === 4 && (
                        <ChatOutlined
                          sx={{ color: orange[900], fontSize: 20 }}
                        />
                      )}
                      {items.icon === 5 && (
                        <NotificationsNoneOutlined
                          sx={{ color: orange[900], fontSize: 20 }}
                        />
                      )}
                    </div>
                    <p className="borde border-orange-500 text-orange-500 ">
                      {items.title}
                    </p>
                  </div>
                  <p className="text-slate-300 text-sm">{items.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 space-y-5">
          <p className="varela text-xl font-bold">The next big thing</p>
          <div className="text-sm text-balanc leading-6 text-slate-500 space-y-2">
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
            className="relative h-52 w-full bg-red-40 border-l-4 border-slate-200 "
          >
            <div className="absolute -left-1 bg-red-90 space-y-5">
              <div>
                <p className="border-l-4 border-orange-400 px-3">
                  {count.users} Users
                </p>
                <p className="px-4 text-xs text-slate-800">
                  You can't do it all. You can't have it all. You can't know it
                  all. We All Know
                </p>
              </div>
              <div>
                <p className="border-l-4 border-orange-400 px-3">
                  {count.requests} Requests
                </p>
                <p className="px-4 text-xs">
                  You can't do it all. You can't have it all. You can't know it
                  all. We All Know
                </p>
              </div>
              <div>
                <p className="border-l-4 border-orange-400 px-3">
                  {count.responses} Responses
                </p>
                <p className="px-4 text-xs">
                  You can't do it all. You can't have it all. You can't know it
                  all. We All Know
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer id="footer-cut" className="p-5 bg-slate-50 pt-20">
          <div>
            <p className="text-xl varela font-bold text-slate-950">
              intertwined
            </p>
            <div className="flex items-center gap-2">
              <div>
                <NearMe />
              </div>
              <p>Nigeria</p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Chat />
              </div>
              <p>Nigeria</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
