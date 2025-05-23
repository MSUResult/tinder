import { useEffect, useState } from "react";
import { Heart, Loader, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  useEffect(() => {
    getMyMatches();
  }, [getMyMatches]);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg overflow-hidden 
					transition-transform duration-300 ease-in-out 
					${isOpen ? "translate-x-0" : "-translate-x-full"} 
					lg:translate-x-0 lg:static lg:w-1/4`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 pb-[27px] border-b border-blue-300 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h2 className="text-xl font-bold">Messages</h2>
            <button
              className="lg:hidden p-1 text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 z-10 relative">
            {isLoadingMyMatches ? (
              <LoadingState />
            ) : matches.length === 0 ? (
              <NoMatchesFound />
            ) : (
              matches.map((match) => (
                <Link key={match._id} to={`/chat/${match._id}`}>
                  <div className="flex items-center mb-4 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-300">
                    <img
                      src={match.image || "/avatar.png"}
                      alt="User avatar"
                      className="size-12 object-cover rounded-full mr-3 border-2 border-blue-400"
                    />

                    <h3 className="font-semibold text-gray-800">
                      {match.name}
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <button
        className="lg:hidden fixed top-4 left-4 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
        onClick={toggleSidebar}
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
};
export default Sidebar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Heart className="text-blue-400 mb-4" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No Messages Yet
    </h3>
    <p className="text-gray-500 max-w-xs">
      Your inbox is empty for now. Keep engaging and your messages will show up
      here!
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-blue-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Messages
    </h3>
    <p className="text-gray-500 max-w-xs">
      Fetching your conversations... Hang tight!
    </p>
  </div>
);
