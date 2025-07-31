import React from "react";
import AccordionSection from "./AccordionSection";
import { FiTrash, FiUpload } from "react-icons/fi";

const ChatFilesPanel = () => {
  const chats = [
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

  const files = [
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

  const renderChatItem = (chat, { showUpload, onUpload, onDelete }) => (
    <div
      key={chat.id}
      className="group flex justify-between items-center px-4 py-2 hover:bg-gray-50"
    >
      <span className="text-gray-700">{chat.text}</span>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        {showUpload && (
          <button
            onClick={onUpload}
            className="p-1 rounded-full hover:bg-blue-100 text-blue-500 hover:text-blue-700 border-none focus:outline-none focus:ring-0"
            title="Upload"
          >
            <FiUpload />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 border-none focus:outline-none focus:ring-0"
          title="Delete"
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );

  const renderFileItem = (file, { onDelete }) => (
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
          onClick={onDelete}
          className="p-1 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 border-none focus:outline-none focus:ring-0"
          title="Delete"
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col space-y-6 p-4 h-full overflow-hidden">
      <AccordionSection
        title="Chats"
        icon="💬"
        items={chats}
        showUpload={true}
        renderItem={renderChatItem}
      />
      <AccordionSection
        title="Files"
        icon="📁"
        items={files}
        showUpload={false}
        renderItem={renderFileItem}
      />
    </div>
  );
};

export default ChatFilesPanel;























import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiTrash,
  FiUpload,
} from "react-icons/fi";

const AccordionSection = ({
  title,
  icon,
  items = [],
  showUpload = false,
  renderItem,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, 5);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-semibold text-gray-800"
      >
        <span>
          {icon} {title}
        </span>
        {!isOpen ? <FiChevronDown /> : <FiChevronUp />}
      </button>

      {isOpen && (
        <div>
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No {title.toLowerCase()} available</p>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto divide-y">
                {visibleItems.map((item) =>
                  renderItem(item, {
                    showUpload,
                    onUpload: () => alert(`Upload: ${item.text || item.name}`),
                    onDelete: () => alert(`Delete: ${item.text || item.name}`),
                  })
                )}
              </div>
              {items.length > 5 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="w-full text-sm text-blue-600 hover:underline py-2 text-center"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;

