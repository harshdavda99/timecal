import React, { useState } from "react";
import { FiTrash, FiUpload, FiChevronDown, FiChevronRight } from "react-icons/fi";

const ChatFilesAccordion = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [filesExpanded, setFilesExpanded] = useState(false);

  const chatItems = [
    { id: 1, text: "How tosss install React?" },
    { id: 2, text: "Explain JSX." },
    { id: 3, text: "What is useEffect?" },
    { id: 4, text: "What is state?" },
    { id: 5, text: "Props vs State?" },
    { id: 6, text: "What is context API?" },
    { id: 7, text: "How to manage global state?" },
    { id: 8, text: "React vs Angular?" },
    { id: 9, text: "React performance optimization?" },
    { id: 10, text: "Lazy loading in React?" },
  ];

  const fileItems = [
    { id: 1, name: "Resumes.pdf", date: "Uploaded on July 10, 2025" },
    { id: 2, name: "Portfolio.zip", date: "Uploaded on July 28, 2025" },
    { id: 3, name: "CoverLetter.docx", date: "Uploaded on July 29, 2025" },
    { id: 4, name: "Photo.png", date: "Uploaded on July 29, 2025" },
    { id: 5, name: "IDCard.pdf", date: "Uploaded on July 29, 2025" },
    { id: 6, name: "Certificate.pdf", date: "Uploaded on July 29, 2025" },
    { id: 7, name: "OfferLetter.pdf", date: "Uploaded on July 29, 2025" },
    { id: 8, name: "Transcript.pdf", date: "Uploaded on July 30, 2025" },
    { id: 9, name: "Invoice2025.pdf", date: "Uploaded on July 30, 2025" },
    { id: 10, name: "Presentation.pptx", date: "Uploaded on July 30, 2025" },
  ];

  const visibleChats = chatExpanded ? chatItems : chatItems.slice(0, 5);
  const visibleFiles = filesExpanded ? fileItems : fileItems.slice(0, 5);

  return (
    <div className="space-y-6 p-4">
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
                      className="flex justify-between items-center px-4 py-2"
                    >
                      <span className="text-gray-700">{chat.text}</span>
                      <FiTrash
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title="Delete"
                        onClick={() => alert(`Delete chat: ${chat.text}`)}
                      />
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
                      className="flex justify-between items-center px-4 py-2"
                    >
                      <div>
                        <p className="text-gray-800">{file.name}</p>
                        {/* <p className="text-sm text-gray-500">{file.date}</p> */}
                      </div>
                      <div className="flex gap-3">
                        <FiUpload
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          title="Upload"
                          onClick={() => alert(`Upload for: ${file.name}`)}
                        />
                        <FiTrash
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          title="Delete"
                          onClick={() => alert(`Delete file: ${file.name}`)}
                        />
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
