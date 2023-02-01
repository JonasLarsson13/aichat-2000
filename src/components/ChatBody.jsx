import React, { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

const ChatBody = ({ chat }) => {

  const parent = useRef(null);
  const bottomRef = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"})
  }, [chat]);

  return (
    <section className="flex flex-col gap-4" ref={parent}>
      {
        chat.map((message, i) => {
          return (
            <article key={i} className={`break-words border-2 rounded-xl px-3 py-3 max-w-[80%] ${message.sender === "ai" ? 'border-[#ffffff] bg-[#ffffffe5] self-start text-black rounded-bl-none' : 'border-[#5b9fd34a] bg-[#2472aeeb] self-end rounded-br-none'}`}>
              <pre className="whitespace-pre-wrap">
                <span>{message.message}</span>
              </pre>
            </article>
          )
        })
      }

      <div ref={bottomRef} className="h-3" />
    </section>
  )
}

export default ChatBody