import React from 'react'
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import Loader from './loader/Loader';

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if(value === "") return;
    sendMessage({sender: "user", message: value});
    setValue("");
  };
  return (
    <aside className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4 py-4 overflow-auto relative">
      {loading ? <Loader /> :
        <>
          <textarea 
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1} 
            className="border-0 bg-transparent outline-none resize-none w-11/12 text-lg" 
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <AiOutlineSend 
            alt="send-button" 
            className=" absolute top-6 right-3 text-xl hover:cursor-pointer ease-in duration-100 hover:scale-125 active:scale-90" 
            onClick={!loading && handleSubmit}  
          />
        </>
      }
    </aside>
  )
}

export default ChatInput