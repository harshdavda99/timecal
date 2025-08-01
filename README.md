import React, { useState } from "react";
import { FaRegComments, FaRegFolderOpen } from "react-icons/fa";
import { MdClose, MdDelete, MdUpload } from "react-icons/md";

const initialChats = [
  { id: 1, title: "React Introduction" },
  {
    id: 2,
    title: "JSX Deep Dive",
    files: [
      { id: "f1", name: "jsx-snippets.txt", date: "July 12, 2025" },
      { id: "f2", name: "component-structure.docx", date: "July 13, 2025" },
    ],
  },
  { id: 3, title: "State vs Props" },
  {
    id: 4,
    title: "Hooks Overview",
    files: [
      { id: "f3", name: "hooks-cheatsheet.pdf", date: "July 14, 2025" },
      { id: "f4", name: "custom-hooks-guide.pdf", date: "July 15, 2025" },
    ],
  },
  {
    id: 5,
    title: "Redux Basics",
    files: [
      { id: "f5", name: "redux-flow.png", date: "July 16, 2025" },
      { id: "f6", name: "redux-notes.txt", date: "July 17, 2025" },
    ],
  },
  { id: 6, title: "React Router v6" },
  { id: 7, title: "React Context API" },
  { id: 8, title: "Code Splitting" },
];

export default function ChatFileAccordion() {
  const [chats, setChats] = useState(initialChats);
  const [openChatId, setOpenChatId] = useState(null);
  const [visibleFiles, setVisibleFiles] = useState([]);
  const [showAllChats, setShowAllChats] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [showFileSection, setShowFileSection] = useState(false);
  const [showUploadUI, setShowUploadUI] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleToggleChatFiles = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    setOpenChatId(chatId);
    setVisibleFiles(chat?.files || []);
    setShowAllFiles(false);
    setShowFileSection(true);
    setShowUploadUI(false);
    setSelectedFile(null);
  };

  const removeFile = (fileId) => {
    setVisibleFiles((prev) => prev.filter((file) => file.id !== fileId));
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === openChatId
          ? {
              ...chat,
              files: chat.files?.filter((f) => f.id !== fileId),
            }
          : chat
      )
    );
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (openChatId === chatId) {
      setOpenChatId(null);
      setVisibleFiles([]);
      setShowFileSection(false);
    }
  };

  const uploadFileToChat = () => {
    if (!selectedFile) return;
    const newFile = {
      id: `f${Date.now()}`,
      name: selectedFile.name,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === openChatId
          ? {
              ...chat,
              files: chat.files ? [...chat.files, newFile] : [newFile],
            }
          : chat
      )
    );

    setVisibleFiles((prev) => [...prev, newFile]);
    setShowUploadUI(false);
    setSelectedFile(null);
  };

  const displayedChats = showAllChats ? chats : chats.slice(0, 5);
  const displayedFiles = showAllFiles ? visibleFiles : visibleFiles.slice(0, 5);

  return (
    <div className="w-[350px] h-screen border-l fixed right-0 top-0 bg-[#f6f6f6] shadow-lg flex flex-col overflow-hidden">
      {/* Chat Section */}
      <div className="border-b">
        <div className="bg-white px-4 py-2 flex items-center justify-center text-lg font-bold text-gray-900">
          <FaRegComments className="mr-2" />
          Chats
        </div>

        <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {displayedChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-100"
            >
              <span className="text-sm text-gray-800 font-medium truncate">
                {chat.title}
              </span>
              <div className="flex items-center gap-2">
                {chat.files && (
                  <button
                    onClick={() => handleToggleChatFiles(chat.id)}
                    title="View Files"
                    className="p-1 hover:bg-yellow-100 rounded-full"
                  >
                    <FaRegFolderOpen className="text-yellow-500" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowUploadUI(true);
                    setShowFileSection(true);
                    setOpenChatId(chat.id);
                    setVisibleFiles(chat.files || []);
                  }}
                  title="Upload File"
                  className="p-1 hover:bg-green-100 rounded-full"
                >
                  <MdUpload className="text-green-500" />
                </button>
                <button
                  onClick={() => deleteChat(chat.id)}
                  title="Delete Chat"
                  className="p-1 hover:bg-red-100 rounded-full"
                >
                  <MdDelete className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {chats.length > 5 && (
          <button
            className="w-full text-sm text-blue-600 hover:underline py-2"
            onClick={() => setShowAllChats(!showAllChats)}
          >
            {showAllChats ? "See Less" : "See More"}
          </button>
        )}
      </div>

      {/* Files Section */}
      {showFileSection && openChatId && (
        <div className="flex-1 flex flex-col">
          <div className="bg-white px-4 py-2 flex justify-between items-center text-md font-semibold text-gray-900 border-b">
            <div className="truncate">
              Files for:
              <span className="text-blue-600 ml-1">
                {chats.find((c) => c.id === openChatId)?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {showUploadUI ? (
                <button
                  onClick={() => setShowUploadUI(false)}
                  title="Show Files"
                  className="p-1 hover:bg-yellow-100 rounded-full"
                >
                  <FaRegFolderOpen className="text-yellow-500" />
                </button>
              ) : (
                <button
                  onClick={() => setShowUploadUI(true)}
                  title="Upload File"
                  className="p-1 hover:bg-green-100 rounded-full"
                >
                  <MdUpload className="text-green-500" />
                </button>
              )}
              <button
                onClick={() => {
                  setShowFileSection(false);
                  setShowUploadUI(false);
                  setSelectedFile(null);
                }}
                title="Close"
                className="p-1 hover:bg-red-100 rounded-full"
              >
                <MdClose className="text-red-500" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {showUploadUI ? (
              <div className="p-4 space-y-2">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                {selectedFile && (
                  <div className="text-sm text-gray-700">
                    Selected: <strong>{selectedFile.name}</strong>
                  </div>
                )}
                <button
                  disabled={!selectedFile}
                  onClick={uploadFileToChat}
                  className={`w-full py-2 px-4 rounded text-white font-medium ${
                    selectedFile
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Upload
                </button>
              </div>
            ) : (
              <>
                {displayedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="px-4 py-2 border-b hover:bg-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-500">{file.date}</div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
                {visibleFiles.length > 5 && (
                  <button
                    className="w-full text-sm text-blue-600 hover:underline py-2"
                    onClick={() => setShowAllFiles(!showAllFiles)}
                  >
                    {showAllFiles ? "See Less" : "See More"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
