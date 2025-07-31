import React, { useState } from "react";
import {
  FiTrash,
  FiUpload,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

const ChatFilesAccordion = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [filesExpanded, setFilesExpanded] = useState(false);

  const chatItems = [
    { id: 1, text: "How to install React?" },
    { id: 2, text: "Explain JSX." },
    { id: 3, text: "What is useEffect?" },
    { id: 4, text: "What is state?" },
    { id: 5, text: "Props vs State?" },
    { id: 6, text: "What is context API?" },
    { id: 7, text: "How to manage global state?" },
    { id: 8, text: "Explain Virtual DOM." },
    { id: 9, text: "What is reconciliation?" },
    { id: 10, text: "React vs Angular?" },
  ];

  const fileItems = [
    { id: 1, name: "Resume.pdf", date: "Uploaded on July 10, 2025" },
    { id: 2, name: "Portfolio.zip", date: "Uploaded on July 28, 2025" },
    { id: 3, name: "CoverLetter.docx", date: "Uploaded on July 29, 2025" },
    { id: 4, name: "Photo.png", date: "Uploaded on July 29, 2025" },
    { id: 5, name: "IDCard.pdf", date: "Uploaded on July 29, 2025" },
    { id: 6, name: "Certificate.pdf", date: "Uploaded on July 29, 2025" },
    { id: 7, name: "OfferLetter.pdf", date: "Uploaded on July 29, 2025" },
    { id: 8, name: "Invoice.pdf", date: "Uploaded on July 30, 2025" },
    { id: 9, name: "Presentation.pptx", date: "Uploaded on July 30, 2025" },
    { id: 10, name: "Notes.txt", date: "Uploaded on July 30, 2025" },
  ];

  const visibleChats = chatExpanded ? chatItems : chatItems.slice(0, 5);
  const visibleFiles = filesExpanded ? fileItems : fileItems.slice(0, 5);

  return (
    <div className="flex flex-col space-y-6 p-4 h-full overflow-hidden">
      {/* Chat Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-semibold text-gray-800"
        >
          <span>💬 Chat</span>
          {isChatOpen ? <FiChevronDown /> : <FiChevronRight />}
        </button>
        {isChatOpen && (
          <div>
            {chatItems.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No chats available</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto divide-y">
                  {visibleChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="group flex justify-between items-center px-4 py-2 hover:bg-gray-50"
                    >
                      <span className="text-gray-700">{chat.text}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => alert(`Upload: ${chat.text}`)}
                          className="p-1 rounded-full hover:bg-blue-100 text-blue-500 hover:text-blue-700 border-none focus:outline-none focus:ring-0"
                          title="Upload"
                        >
                          <FiUpload />
                        </button>
                        <button
                          onClick={() => alert(`Delete chat: ${chat.text}`)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 border-none focus:outline-none focus:ring-0"
                          title="Delete"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {chatItems.length > 5 && (
                  <button
                    onClick={() => setChatExpanded(!chatExpanded)}
                    className="w-full text-sm text-blue-600 hover:underline py-2 text-center"
                  >
                    {chatExpanded ? "See less" : "See more"}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Files Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsFilesOpen(!isFilesOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-semibold text-gray-800"
        >
          <span>📁 Files</span>
          {isFilesOpen ? <FiChevronDown /> : <FiChevronRight />}
        </button>
        {isFilesOpen && (
          <div>
            {fileItems.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No files uploaded</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto divide-y">
                  {visibleFiles.map((file) => (
                    <div
                      key={file.id}
                      className="group flex justify-between items-center px-4 py-2 hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.date}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => alert(`Delete: ${file.name}`)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 border-none focus:outline-none focus:ring-0"
                          title="Delete"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {fileItems.length > 5 && (
                  <button
                    onClick={() => setFilesExpanded(!filesExpanded)}
                    className="w-full text-sm text-blue-600 hover:underline py-2 text-center"
                  >
                    {filesExpanded ? "See less" : "See more"}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatFilesAccordion;
