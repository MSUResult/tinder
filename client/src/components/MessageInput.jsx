import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ match }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const { sendMessage } = useMessageStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(match._id, message);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSendMessage} className="flex relative">
      <button
        type="button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00CEC9] hover:text-[#E84393] transition duration-300"
      >
        <Smile size={24} />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-3 pl-12 rounded-l-lg border-2 border-transparent
        focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] bg-[#0A0A1E] text-[#F8F8F8]
        placeholder-[#B48EAD] shadow-lg transition-all duration-300 ease-in-out"
        placeholder="Type a message..."
      />

      <button
        type="submit"
        className="bg-[#E84393] text-white p-3 rounded-r-lg 
        hover:bg-[#FF6B81] hover:shadow-[0_0_15px_#FF6B81] transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#FF6B81] active:scale-95"
      >
        <Send size={24} />
      </button>

      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-20 left-4 bg-[#222031] rounded-lg shadow-lg p-2"
        >
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              setMessage((prevMessage) => prevMessage + emojiObject.emoji);
            }}
          />
        </div>
      )}
    </form>
  );
};

export default MessageInput;
