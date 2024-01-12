import { ArrowBack, Send } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import postHook from "../../../apiHooks/postHook";
import { Avatar } from "@mui/material";
import bg_whatsapp_image from '../../images/bg_whatsapp.jpg'
let dotEnv = import.meta.env;



function Messages({
  clientContent,
  setClientContent,
  user,
  setNewMessage,
  sendersList,
  removeSender,
  theme
}) {
  const [chatsArray, setChatsArray] = useState("");
  const [textArea, setTextArea] = useState({
    message: "",
    rows: 1,
  });
  const [chats, setChats] = useState("");
  const [client, setClient] = useState({
    email: "",
    photo: "",
  });
  const [sending, setSending] = useState(false);
  const chatBack = useRef("")

  let baseURL;
  if (dotEnv.MODE === "development") {
    baseURL = dotEnv.VITE_DEV_URL
  } else {
    baseURL = dotEnv.VITE_PROD_URL
  }

  setTimeout(()=> {
    let last = document.getElementById("last")
    if (last) {
      last.scrollIntoView(true)
    }

  }, 1000)

  useEffect(() => {
    async function getChats() {
      // IF USER IS ACCESSING THE MESSAGE PAGE BY CLICKING A "Message Client Now" BUTTON
      if (clientContent.reqShaker) {
        // get the user chat history
        let url = baseURL + "/get-user-chats";
        let response = await postHook(url, {
          email: user.email,
          client: clientContent.reqShaker,
        });
        // if user has no chat history
        if (response.warning) {
          // get details of the client the user wants to message
          url = baseURL + "/get-user";
          let clientData = await postHook(url, {
            email: clientContent.reqShaker,
          });
          let image;
          if (clientData.success) {
            image = clientData.success.photo;
          } else {
            image = "";
          }
          // update client state with client details
          setClient({ email: clientContent.reqShaker, photo: image });
          // open a direct message page between the user and client
          setChats("Direct Message");
        }
        // if user have a chat history
        else if (response.success) {
          // check if user have any chat history with client
          let userClientHistory = response.success.filter(
            (item) => item._doc.with === clientContent.reqShaker
          );
          // if user has any chat history with client
          if (userClientHistory.length >= 1) {
            // update chats array state with the existing chat history details between the user and client
            setChatsArray({
              chats: userClientHistory[0]._doc.history,
              photo: userClientHistory[0].photo,
            });
            // update client state with client details
            setClient({
              email: userClientHistory[0]._doc.with,
              photo: userClientHistory[0].photo,
            });
            // open a direct message page between the user and client
            setChats("Direct Message");
          }
          // if user doesn't have any chat history with client
          else {
            // get details of the client the user wants to message
            url = baseURL + "/get-user";
            let clientData = await postHook(url, {
              email: clientContent.reqShaker,
            });
            let image;
            if (clientData.success) {
              image = clientData.success.photo;
            } else {
              image = "";
            }
            // update client state with client details
            setClient({ email: clientContent.reqShaker, photo: image });
            // open a direct message page between the user and client
            setChats("Direct Message");
          }
        }
      }
      // if user is accessing the Message Page by clicking the "Chats Icon" on the FootNavBar
      // IF USER IS ACCESSING THE MESSAGE PAGE BY CLICKING THE "Chats Icon" ON THE FootNavBar
      else {
        // get the user chat history
        let url = baseURL + "/get-user-chats";
        let response = await postHook(url, { email: user.email });
        // if user have a chat history
        if (response.success) {
          // update chats state with all the people details that user has chatted with or have a chat history with
          setChats(response.success);
          chatBack.current = response.success
        }
        // if user has no chat history
        else if (response.warning) {
          setChats("No chats");
        }
      }
    }
    getChats();



   
  }, []);


  function handleMessageChange(e) {
    if (textArea.rows < 5 && Math.round(e.target.value.length / 50) >= 1) {
      setTextArea({
        rows: Math.round(e.target.value.length / 50),
        [e.target.name]: e.target.value,
      });
    } else if (
      textArea.rows >= 5 &&
      Math.round(e.target.value.length / 50) >= 1
    ) {
      setTextArea({ rows: 5, [e.target.name]: e.target.value });
    } else if (Math.round(e.target.value.length / 50) < 1) {
      setTextArea({ rows: 1, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmitMessage() {
    if (textArea.message === "") {
      return;
    }

    setSending(true);

    if (textArea.message) {
      let topic = "";
      if (clientContent) {
        topic = clientContent.requestTitle
      }
      let messageDetails = {
        message: `${textArea.message}|${topic}`,
        reqEmail: client.email,
        resEmail: user.email,
      };
      let url = baseURL + "/send-messages"
      let response = await postHook(url, messageDetails )
      if (response.success) {
        let data = response.success
        if ((data[2] === user.email && data[1] === client.email) || (data[1] === user.email && data[2] === client.email)) {
          // update chats array state with the existing chat history details between the user and client
          setChatsArray({ ...chatsArray, chats: data[0] });
          setSending(false);
          setNewMessage(true);
        }
      }
    }
    setTextArea({ message: "", rows: 1 });
  }

  return (
    <div className={`relative mt-14 ${theme === "lightMode" ? "bg-white" : "bg-gray-900"} h-screen`}>
      {chats === "" && (
        <div className="mt-10 p-5">
          <p className="text-lg text-blue-700 font-bold mb-5">
            ... Fetching chats
          </p>
          <div className="relative h-1 w-full rounded-full bg-slate-300 overflow-hidden">
            <div className="progress left-right  h-full rounded-full w-full bg-orange-500"></div>
          </div>
        </div>
      )}

      {chats === "No chats" && (
        <div className="mt-10 p-5">
          <p className="text-base text-red-500 font-bold mb-5">
            You have no chat history available.
            <br />
            <br />
            Message a client to start a chat history with them.
          </p>
        </div>
      )}

      {chats === "Direct Message" && (
        <div className="fixed w-full bg-blue-40 h-screen">
          <div onClick={() => { (setChats(chatBack.current) ? setChats(chatBack.current) : setChats("No chats")); setClientContent("") }} className="">
            <div className="flex justify-between items-center px-5">
             {theme === "lightMode" ? <ArrowBack /> : <ArrowBack sx={{color: "white"}} /> }
             <div className="flex items-center gap-2">
              <p className={`${theme === "lightMode" ? "text-black" : "text-white"} text-xs`}>{client.email}</p>
               {(chatsArray.photo || client.photo) ? <img
                src={chatsArray.photo || client.photo}
                alt="client photo."
                className={`size-10 rounded-full object-cover ${!(theme === "lightMode") && "border-2 border-slate-100"}`}
              /> : <Avatar />} </div>
            </div>
          </div>

          <div className={`absolute z-10 top-14 bottom-28 w-full ${theme === "lightMode" ? "bg-[#FFFFED] " : "bg-gray-900"} flex flex-col items-end p-1 justify-between px-1 overflow-scrol`}>
            <img src={bg_whatsapp_image} className="absolute -z-10 w-full h-full object-cover opacity-20" />
            <div className=" w-full bg-lime-30 absolut bottom- overflow-scroll">
            {/* {clientContent.requestTitle && <p className=" p-1 bg-green-100 rounded font-semibold">Message Topic: <span className="text-green-700">{clientContent.requestTitle} </span></p> } */}
              {chatsArray &&
                chatsArray.chats.map((item) => {
                  return (
                    <div key={item._id} className="my-1">
                     { item.text.split("|")[1] && <p className="p-1 bg-slate-50">Message Topic: <span className="text-blue-600 font-semibold">{item.text.split("|")[1]}</span> </p> }
                      {item.id === user.email && (
                        <div className="flex justify-end px-5">
                          <div className="relative z-10 max-w-[80%] ">
                            <div className="absolute size-5 bottom-0 -right-2 bg-lime-200 -z-10 triangle-right"></div>
                            <p className="p-2 rounded bg-lime-200 text-sm ">
                              {/* {item.text} */}
                              {item.text.split("|")[0] || item.text}
                            </p>
                          </div>
                        </div>
                      )}
                     
                      {item.id === client.email && (
                        <div className="flex justify-start px-5">
                          <div className="relative z-10 max-w-[80%]">
                            <div className="absolute size-5 bottom-0 -left-2 bg-slate-200 -z-10 triangle-left"></div>
                            <p className="p-2 rounded bg-slate-200 text-sm">
                            {item.text.split("|")[0] || item.text}
                            </p> 
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                 <p id="last" className="bg-red-200 opacity-0">
                  
            </p>
            </div>
            {sending && (
              <div className="flex justify-end px-5">
                <div className="bg-lime-200 w-28 text-slate-500">
                  <p className="p-2 rounded bg-slate-20 text-sm ">
                    <span className="animate-ping mr-2">...</span> Sending
                  </p>
                </div>
              </div>
            )}
           
            <div className="flex justify-evenly w-full bg-whit">
              <div className="w-[80%] bg-red-30">
                <textarea
                  maxLength={1000}
                  rows={textArea.rows}
                  name="message"
                  value={textArea.message}
                  onChange={handleMessageChange}
                  type="text"
                  className="w-full rounded-lg py-1 pb-3 px-2 text-pretty text-sm resize-y bg-slate-200 border border-slate-500"
                  placeholder="Message"
                />
              </div>
              <div
                onClick={handleSubmitMessage}
                className={`pl-2 w-[12%] ${
                  textArea.message
                    ? "bg-orange-500 active:bg-green-500"
                    : "bg-orange-300"
                } rounded-full flex items-center justify-center`}
              >
                <div>
                  {textArea.message ? (
                    <Send sx={{ fontSize: 30 }} />
                  ) : (
                    <Send sx={{ fontSize: 30, color: "gray" }} />
                  )}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      )}

      {chats.length >= 1 &&
        chats !== "Direct Message" &&
        chats !== "No chats" && (
          <div className="bg-red-30">
            <p
              id="top"
              className={`text-lg font-bold varela p-2 border-y  ${theme === "lightMode" ? "bg-white border-slate-300" : "bg-gray-900 text-white border-slate-700"}`}
            >
              Chats History
            </p>
            <div>
              {chats.map((item) => {
                return (
                  <div
                    onClick={() => {
                      removeSender(item._doc.with);
                      setChatsArray({
                        chats: item._doc.history,
                        photo: item.photo,
                      });
                      setClient({ email: item._doc.with, photo: item.photo });
                      setChats("Direct Message");
                    }}
                    key={item._doc.with}
                    className="fle items-center gap-5 p-3 border-y- bg-red-30"
                  >
                    <div className="float-right w-[80%] bg-red-30 flex justify-between items-end">
                      <div>
                        <p className={`${theme === "lightMode" ? "text-slate-800" : "text-slate-200"} text-base`}>{item._doc.with}</p>
                        <p className={`text-xs ${theme === "lightMode" ? "text-slate-500" : "text-slate-400"}`}>
                          {/* {item._doc.history[item._doc.history.length - 1].text} */}
                          {item._doc.history[item._doc.history.length - 1].text.split("|")[0] || item._doc.history[item._doc.history.length - 1].text}
                        </p>
                      </div>
                      {sendersList.includes(item._doc.with) && (
                        <div className="bg-red-600 size-3 rounded-full"></div>
                      )}
                    </div>
                    <div className={`size-14 bg-gray-200 rounded-full flex items-center justify-center ${theme === "lightMode" ? "border" : "border-2 border-slate-100"}`}>
                      {item.photo ? <img
                        src={item.photo}
                        alt="user photo"
                        className="rounded-full w-full h-full object-cover"
                      /> : <Avatar /> }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}

export default Messages;