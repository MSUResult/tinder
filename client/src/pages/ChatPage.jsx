import { useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const {
    messages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();
  const { authUser } = useAuthStore();

  const { id } = useParams();

  const match = matches.find((m) => m?._id === id);

  useEffect(() => {
    if (authUser && id) {
      getMyMatches();
      getMessages(id);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    getMyMatches,
    authUser,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    id,
  ]);

  if (isLoadingMyMatches) return <LoadingMessagesUI />;
  if (!match) return <MatchNotFound />;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />

      <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full">
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-lg p-4">
          <img
            src={match.image || "/avatar.png"}
            className="w-14 h-14 object-cover rounded-full mr-4 border-2 border-blue-400"
          />
          <h2 className="text-2xl font-semibold text-white">{match.name}</h2>
        </div>

        <div className="flex-grow overflow-y-auto mt-4 bg-white/10 backdrop-blur-lg border border-white/20 shadow-inner rounded-lg p-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-300 py-8">
              Start your conversation with {match.name}
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`mb-3 ${
                  msg.sender === authUser._id ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                    msg.sender === authUser._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))
          )}
        </div>
        <MessageInput match={match} />
      </div>
    </div>
  );
};

export default ChatPage;

const MatchNotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center border border-white/20">
      <UserX size={64} className="mx-auto text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-white mb-2">
        Match Not Found
      </h2>
      <p className="text-gray-300">
        Oops! It seems this match doesn&apos;t exist or has been removed.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors 
        focus:outline-none focus:ring-2 focus:ring-blue-300 inline-block"
      >
        Go Back To Home
      </Link>
    </div>
  </div>
);

const LoadingMessagesUI = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center border border-white/20">
      <Loader size={48} className="mx-auto text-blue-400 animate-spin mb-4" />
      <h2 className="text-2xl font-semibold text-white mb-2">Loading Chat</h2>
      <p className="text-gray-300">
        Please wait while we fetch your conversation...
      </p>
      <div className="mt-6 flex justify-center space-x-2">
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);
