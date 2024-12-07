import { useMatchStore } from "../store/useMatchStore";

const getFeedbackStyle = (swipeFeedback) => {
  if (swipeFeedback === "liked") return "bg-green-500 text-white";
  if (swipeFeedback === "passed") return "bg-red-500 text-white";
  if (swipeFeedback === "matched") return "bg-pink-500 text-white";
  return "";
};

const getFeedbackText = (swipeFeedback) => {
  if (swipeFeedback === "liked") return "You Liked!";
  if (swipeFeedback === "passed") return "You Passed!";
  if (swipeFeedback === "matched") return "It's a Match!";
  return "";
};

const SwipeFeedback = () => {
  const { swipeFeedback } = useMatchStore();

  return (
    <div
      className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl font-bold py-3 px-6 rounded-lg ${getFeedbackStyle(swipeFeedback)} opacity-100 transition-opacity duration-500`}
      style={{ transition: 'opacity 1s ease-in-out' }} // Smooth fade-in/fade-out
    >
      {getFeedbackText(swipeFeedback)}
    </div>
  );
};

export default SwipeFeedback;
