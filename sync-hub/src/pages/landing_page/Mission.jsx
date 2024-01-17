import React, { useEffect } from "react";

function Mission() {
  useEffect(()=>{
    let title = document.querySelector("title");
    title.innerHTML = "intertwined | Mission & Vision";

  }, [])
  return (
    <div className="mt-5 bg-red-40 py-5">
      <p
        id="top"
        className="text-lg font-bold varela p-2 border-b border-slate-300"
      >
        Mission & Vision
      </p>
      <p className="font-light my-5">
        <span className="text-xl font-medium bg-green-400">Our mission :</span>{" "}
        To make your access to potential helpers regarding your physical tasks
        and labour easier
      </p>
      <div>
        <p className="text-xl font-medium bg-green-400">
          A simple illustration
        </p>
        <p className="px-5 font-medium text-green-600">
          :: using an errand/delivery scenario
        </p>
        <div>
          <div className="text-sm space-y-3 mt-2">
            <p>
              You are at point A and{" "}
              <span className="bg-blue-400">need to get an item</span> from
              point B but you don't want to leave your comfort zone just yet or
              anytime soon as the item is not that important and can wait for
              some time or days before you go pick it --{" "}
              <span className="bg-blue-400">
                for whatever reasons or so, you don't feel like going to collect
                the item yourself.
              </span>{" "}
            </p>
            <p>
              On the other hand, you would appreciate it if someone is already
              at point B and can help you bring your item to point A or if
              someone can help you go to point B to pick up the item.{" "}
              <span className="bg-blue-400">
                Eitherways, you would appreciate if someone can help you bring
                your item to your place either for free or for a token fee.
              </span>
            </p>
            <p>
              Well,{" "}
              <span className="bg-red-400 text-slate-200">
                one notable problem
              </span>{" "}
              with this solution is{" "}
              <span className="bg-red-400 text-slate-200">
                {" "}
                how you will get the word out that you need help with something
              </span>
              . Do you start texting your friends or people you know
              individually to let them know you need help or what?{" "}
              <span className="bg-blue-400">
                It would really be nice if you can just post your request or
                what you need on a{" "}
                <span className="bg-orange-400">platform</span> with some
                conditions attached to it and then wait to see and expect if you
                can get a response from someone willing to help you
              </span>{" "}
            </p>
            <p>
              <span className="bg-orange-400">
                That's the purpose of intertwined
              </span>
              . intertwined is{" "}
              <span className="bg-orange-400">that platform</span> when you can{" "}
              <span className="bg-blue-400">post your requests</span> and{" "}
              <span className="bg-blue-400">get responses</span> regarding it
              from people willing to help; share your need and worries out to{" "}
              <span className="bg-green-400">potential helpers</span> with just
              a request
            </p>
            <p>
              {" "}
              Our mission is to reduce and direct away the everyday struggles of
              individuals regarding incapabilities as regards carrying out a
              task or getting what they need.{" "}
            </p>
            <p className="text-pretty">
              Instead of thinking and worrying about{" "}
              <span className="bg-red-500 text-slate-200 ">
                "how can i do this ?"
              </span>
              ,{" "}
              <span className="bg-red-500 text-slate-200 ">
                "I wish i had this ..."{" "}
              </span>{" "}
              ,{" "}
              <span className="bg-red-500 text-slate-200">
                "I need this ..."
              </span>
              ,{" "}
              <span className="bg-red-500 text-slate-200 ">
                "how do i do this ?"
              </span>{" "}
              - you can just post a request on intertwined and see if anyone can
              be of help to you.{" "}
            </p>
            <p className="font-bold text-xl">
              This is our mission, and our Vision is{" "}
              <span className="bg-green-400">
                {" "}
                world where physical tasks and needs of individuals can be
                shared with potential helpers{" "}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
