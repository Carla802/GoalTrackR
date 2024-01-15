import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-bootstrap-icons";

const Message = () => {
  const [inputValue, setInputValue] = useState("");

  const [userName, setUserName] = useState("");
  const [coach, setCoach] = useState("");

  const [conversations, setConversations] = useState({});
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = { content: inputValue, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");

      // Simulate a response after a short delay
      setTimeout(() => {
        const responseMessage = {
          content: `Hi ${userName}, how can I help you?`,
          sender: "other",
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      }, 1000);
    }
  };

  useEffect(() => {
    // Load initial data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserName(JSON.parse(storedUserData).name);
    }
  
    const storedCoachName = localStorage.getItem("coach");
    if (storedCoachName) {
      setCoach(storedCoachName);
    }
  
    const storedConversations = localStorage.getItem("conversations");
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
      if (JSON.parse(storedConversations)[coach]) {
        setMessages(JSON.parse(storedConversations)[coach]);
      }
    }
  }, [coach]); // Ajoutez coach comme dépendance ici
  
  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    const messageList = document.getElementById("message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    // Update conversations when messages change
    if (messages.length !== 0) {
      setConversations((prevConversations) => ({
        ...prevConversations,
        [coach]: messages,
      }));
  
      setConversations((prevConversations) => {
        localStorage.setItem("conversations", JSON.stringify({
          ...prevConversations,
          [coach]: messages,
        }));
        return prevConversations;
      });
    }
  }, [messages, coach]); // Ajoutez coach comme dépendance ici
  
  

  return (
    <>
      <section className="">
        <div className="lg:w-[640px] w-full h-full px-[20px]">
          <div className="flex items-center gap-2 py-4 bg-white w-full">
            <Link to={"/coaching"}>
              <ChevronLeft className="w-6 h-6"/>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              data-slot="icon"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span className="text-black">{coach}</span>
          </div>
          <ul id="message-list" className="mb-20 h-full overflow-y-auto">
            { messages.length === 0 && 
              <p className="items-center text-center text-sm m-10"> You have no conversation with this coach yet.</p>
            }
            {messages.map((message, index) => (
              <li
                key={index}
                className={`py-2 px-4 ${message.sender === "user" ? "rounded-bl-[8px]" : "rounded-tr-[8px]"} ${message.sender === "user" ? "rounded-t-[8px]" : "rounded-b-[8px]"} text-sm font-[500] sm:w-7/12 w-10/12 mb-6 ${message.sender === "user" ? "ml-auto" : "ml-0"} ${
                  message.sender === "user" ? "bg-[#d8e5ff]" : "bg-[#f5f8fe]"
                }`}
              >
                {message.content}
              </li>
            ))}

          </ul>
        </div>
        <div>
          <div className="lg:w-[640px] w-full px-[20px] gap-3 mx-auto flex justify-between py-4 fixed bottom-0 bg-white lg:left-[50%] inset-x-0 lg:right-auto lg:translate-x-[-50%]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter") handleSendMessage();
              }}
              className="block w-full outline-none border border-[rgba(0,0,0,.2)] pl-4 py-3 rounded-[6px]"
            />
            <button type="button" className="inline-block bg-[var(--primary-color)] px-3 rounded-[6px]" onClick={handleSendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rotate-[-45deg] text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Message;
