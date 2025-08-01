import React, { useState, useRef } from "react";
import { FaRegComments, FaRegFolderOpen } from "react-icons/fa";
import { MdClose, MdDelete, MdUpload } from "react-icons/md";

const initialChats = [
  { id: 1, title: "Chat 1" },
  {
    id: 2,
    title: "Chat 2",
    files: [
      { id: "f1", name: "file1.txt" },
      { id: "f2", name: "file2.txt" },
      { id: "f3", name: "report.pdf" },
      { id: "f4", name: "image.png" },
      { id: "f5", name: "design.sketch" },
      { id: "f6", name: "doc.docx" },
      { id: "f7", name: "notes.md" },
    ],
  },
  { id: 3, title: "Chat 3" },
  { id: 4, title: "Chat 4" },
  { id: 5, title: "Chat 5" },
  { id: 6, title: "Chat 6" },
];

export default function ChatFileAccordion() {
  const [chats, setChats] = useState(initialChats);
  const [openChatId, setOpenChatId] = useState(null);
  const [visibleFiles, setVisibleFiles] = useState([]);
  const [showAllChats, setShowAllChats] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef(null);

  const displayedChats = showAllChats ? chats : chats.slice(0, 5);
  const displayedFiles = showAllFiles ? visibleFiles : visibleFiles.slice(0, 5);

  const handleToggleChatFiles = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    const files = chat?.files || [];
    if (openChatId === chatId) {
      setOpenChatId(null);
      setVisibleFiles([]);
      setShowUpload(false);
    } else {
      setOpenChatId(chatId);
      setVisibleFiles(files);
      setShowUpload(false);
    }
  };

  const removeFile = (fileId) => {
    setVisibleFiles((prev) => prev.filter((file) => file.id !== fileId));
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === openChatId
          ? { ...chat, files: chat.files?.filter((f) => f.id !== fileId) }
          : chat
      )
    );
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (openChatId === chatId) {
      setOpenChatId(null);
      setVisibleFiles([]);
      setShowUpload(false);
    }
  };

  const uploadFileToChat = (file) => {
    if (!file || !openChatId) return;
    const newFile = {
      id: `f${Date.now()}`,
      name: file.name,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === openChatId
          ? { ...chat, files: [...(chat.files || []), newFile] }
          : chat
      )
    );
    setVisibleFiles((prev) => [...prev, newFile]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFileToChat(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFileToChat(file);
  };

  return (
    <div className="w-[350px] h-screen border-l bg-[#fdfdfd] p-4 flex flex-col gap-4 shadow-lg text-gray-800">
      {/* Chat List */}
      <div className="rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-white px-4 py-2 font-bold text-lg">
          <span className="flex items-center gap-2">
            <FaRegComments /> Conversations
          </span>
        </div>
        <div className="max-h-[260px] overflow-y-auto">
          {displayedChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm"
            >
              <span className="truncate font-medium">{chat.title}</span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleToggleChatFiles(chat.id)}
                  className="p-1 rounded-full hover:bg-yellow-100"
                  title="Toggle Files"
                >
                  <FaRegFolderOpen className="text-yellow-500 text-sm" />
                </button>
                <button
                  onClick={() => {
                    setOpenChatId(chat.id);
                    const chatData = chats.find((c) => c.id === chat.id);
                    setVisibleFiles(chatData?.files || []);
                    setShowUpload(true);
                  }}
                  className="p-1 rounded-full hover:bg-blue-100"
                  title="Upload File"
                >
                  <MdUpload className="text-blue-600 text-sm" />
                </button>
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="p-1 rounded-full hover:bg-red-100"
                  title="Delete Chat"
                >
                  <MdDelete className="text-red-500 text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {chats.length > 5 && (
          <button
            onClick={() => setShowAllChats(!showAllChats)}
            className="w-full py-1 text-xs text-center text-blue-600 hover:underline bg-gray-50"
          >
            {showAllChats ? "Load less" : "Load more"}
          </button>
        )}
      </div>

      {/* File Viewer */}
      {openChatId && (
        <div className="rounded-xl flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center bg-white px-4 py-2 font-bold text-md">
            <span>
              Files:{" "}
              <span className="text-blue-600">
                {chats.find((c) => c.id === openChatId)?.title}
              </span>
            </span>
            <button
              onClick={() => {
                setOpenChatId(null);
                setVisibleFiles([]);
                setShowUpload(false);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MdClose className="text-red-500 text-sm" />
            </button>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto">
            {displayedFiles.map((file) => (
              <div
                key={file.id}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-sm"
              >
                <div className="font-medium">{file.name}</div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                >
                  <MdDelete className="text-sm" />
                </button>
              </div>
            ))}
            {visibleFiles.length > 5 && (
              <button
                onClick={() => setShowAllFiles(!showAllFiles)}
                className="w-full py-1 text-xs text-center text-blue-600 hover:underline bg-gray-50"
              >
                {showAllFiles ? "Load less" : "Load more"}
              </button>
            )}
          </div>

          {/* Upload Area (visible only if triggered) */}
          {showUpload && (
            <div className="border-t p-4 bg-white space-y-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center text-sm text-gray-600 cursor-pointer hover:border-blue-400 transition"
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <MdUpload className="mx-auto text-2xl mb-1 text-blue-500" />
                Drag & drop file here or click to browse
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg"
              >
                <MdUpload /> Upload File
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
