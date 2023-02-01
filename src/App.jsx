import { useState } from 'react';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import { useMutation } from 'react-query';
import { fetchResponse } from './api';
import Loader from './components/loader/Loader';
function App() {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) => setChat((prev) => [...prev, {sender: 'ai', message: data.message.replace(/^\n\n/, "")}])
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  }

  return (
    <div className="bg-[#0d1926] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
      <figure className="gradient-01 x-0 absolute"></figure>
      <figure className="gradient-02 x-0 absolute"></figure>
      <header className="font-bold text-2xl text-center">
        AIChat 2000.3
      </header>
      <main className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody chat={chat} />
      </main>
      <footer className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </footer>
    </div>
  )
}

export default App
