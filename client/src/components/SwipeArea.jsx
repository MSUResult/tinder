import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";

const SwipeArea = () => {
  const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

  const handleSwipe = (dir, user) => {
    if (dir === "right") swipeRight(user);
    else if (dir === "left") swipeLeft(user);
  };

  return (
    <div className="relative w-full max-w-sm h-[30rem] flex justify-center items-center">
      {userProfiles.map((user) => (
        <TinderCard
          className="absolute transition-transform duration-300"
          key={user._id}
          onSwipe={(dir) => handleSwipe(dir, user)}
          swipeRequirementType="position"
          swipeThreshold={80}
          preventSwipe={["up", "down"]}
        >
          <div
            className="relative w-80 h-[28rem] select-none rounded-xl overflow-hidden
            border border-gray-200 shadow-lg bg-white transition-transform duration-300
            hover:shadow-2xl hover:scale-105"
          >
            <figure className="relative h-3/4 overflow-hidden">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="object-cover w-full h-full pointer-events-none transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </figure>
            <div className="p-4 bg-white bg-opacity-80 backdrop-blur-lg rounded-b-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}, {user.age}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{user.bio}</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeArea;
