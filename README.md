import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaPlus, FaFileUpload } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

export default function ChatInput() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFileMenu, setShowFileMenu] = useState(false);
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);
    const dropdownRef = useRef();
    const fileMenuRef = useRef();
    const fileRef = useRef();
    const justToggledRef = useRef(false);

    // Prevent dropdowns from closing on toggle/double click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (justToggledRef.current) {
                justToggledRef.current = false;
                return;
            }

            const clickedDropdown = dropdownRef.current?.contains(event.target);
            const clickedFile = fileMenuRef.current?.contains(event.target);

            if (!clickedDropdown && !clickedFile) {
                setShowDropdown(false);
                setShowFileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            const maxHeight = 96; // ~3 lines
            textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "scroll" : "hidden";
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        }
    }, [message]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            // Upload logic here
        }
    };

    return (
        <div className="w-full flex justify-center px-4 mt-6">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-md px-4 pt-4 pb-2 relative">
                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            // sendMessage();
                        }
                    }}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent outline-none resize-none text-base placeholder-gray-400 overflow-hidden"
                />

                {/* Bottom Bar */}
                <div className="flex items-center justify-between mt-3">
                    {/* Dropdown Toggle */}
                    <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                            justToggledRef.current = true;
                            setShowDropdown(!showDropdown);
                            setShowFileMenu(false);
                        }}
                    >
                        <img
                            src="https://img.icons8.com/color/48/000000/artificial-intelligence.png"
                            alt="icon"
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">Think Deeper</span>
                        <HiChevronDown className="text-sm" />
                    </div>

                    {/* Right Buttons */}
                    <div className="flex items-center gap-3 relative">
                        {/* File Upload Toggle */}
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => {
                                justToggledRef.current = true;
                                setShowFileMenu(!showFileMenu);
                                setShowDropdown(false);
                            }}
                        >
                            <FaPlus className="text-lg" />
                        </button>

                        {/* File Menu */}
                        {showFileMenu && (
                            <div
                                ref={fileMenuRef}
                                className="absolute bottom-12 w-40 right-10 bg-white shadow-md p-2 rounded-md z-50"
                            >
                                <div
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                    onClick={() => fileRef.current.click()}
                                >
                                    <FaFileUpload className="text-gray-600" />
                                    <span className="text-sm">Upload File</span>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileRef}
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        {/* Send Button */}
                        <button className="bg-orange-200 hover:bg-orange-300 p-2 rounded-full text-white">
                            <IoIosSend className="text-orange-600 text-xl" />
                        </button>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        className="absolute bottom-16 left-4 w-80 bg-white shadow-lg rounded-lg p-3 z-50"
                    >
                        <DropdownItem
                            title="Quick response"
                            desc="Best for everyday conversation"
                            badge="2-3 sec"
                        />
                        <DropdownItem
                            title="Think Deeper"
                            desc="Better for complex topics"
                            badge="~30 sec"
                            selected
                        />
                        <DropdownItem
                            title="Deep Research"
                            desc="Detailed + reference"
                            badge="~10 min"
                            newBadge
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function DropdownItem({ title, desc, badge, newBadge = false, selected = false }) {
    return (
        <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <div>
                <div className="font-medium">{title}</div>
                <div className="text-xs text-gray-500">{desc}</div>
            </div>
            <div className="flex items-center gap-2">
                {newBadge && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">New</span>
                )}
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{badge}</span>
                <input type="radio" name="mode" checked={selected} readOnly />
            </div>
        </div>
    );
}
