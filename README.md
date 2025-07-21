import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { GoSidebarExpand , GoSidebarCollapse } from "react-icons/go";
import { MdChevronLeft } from "react-icons/md"
import ChatInput from "./ChatInput";

const chats = ["What is react js", "Create react app"];
const suggestions = [
    {
        title: "Rewrite this to sound more professional and less verbose",
        desc: "Improve your writing",
    },
    {
        title: "What is the purpose of {0}?",
        desc: "What is the purpose of this file?",
    },
    {
        title: "List key points from Component List.xlsx",
        desc: "Understand the main points",
    },
    {
        title: "Summarize file",
        desc: "Get an overview",
    },
    {
        title: "Create alt text to describe this image and its context to someone",
        desc: "Make it accessible",
    },
    {
        title: "Write a compelling intro paragraph to doc",
        desc: "Draft an introduction",
    },
];

export default function CopilotChatUI() {
    const [message, setMessage] = useState("");
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex font-sans text-gray-800">
            <div className="flex flex-col flex-1">
                {/* Header */}
                <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
                    <h1 className="text-2xl font-semibold">Welcome Harsh, how can I help?</h1>
                    <div>
                        <button
                            className="p-2 mx-2 border rounded text-xl text-gray-700 hover:text-black"
                            // onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                        >
                            <FiMenu />
                        </button>
                        <button
                            className="p-2 mx-2 border rounded text-xl text-gray-700 hover:text-black"
                            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                        >
                              {rightSidebarOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
                        </button>
                    </div>
                </header>

                {/* Body below header */}
                <div
                    className={`flex-1 flex justify-center px-6 py-10 overflow-y-auto transition-all duration-300 ${
                        rightSidebarOpen ? "bg-white" : "bg-gray-100"
                    }`}
                >
                    <div className="w-full max-w-6xl">
                        {/* Chat Input */}
                        <ChatInput />

                        {/* Suggestions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestions.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white"
                                >
                                    <div className="text-sm text-blue-600 font-semibold mb-1">💬 {item.title}</div>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            {rightSidebarOpen && (
                <div className="w-64 bg-gray-50 border-l px-4 py-6">
                    <div className="text-base font-bold mb-2">Chats</div>
                    <div className="text-xs text-gray-500 mb-1">Today</div>
                    <ul className="space-y-1 text-sm">
                        {chats.map((chat, index) => (
                            <li key={index} className="text-blue-600 hover:underline cursor-pointer">
                                {chat}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-3 text-xs text-blue-600 hover:underline">See more</button>
                </div>
            )}
        </div>
    );
}
