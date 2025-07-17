
import React, { useState, useRef, useEffect } from 'react';

const TableWithDropdown = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownDirection, setDropdownDirection] = useState('bottom');
    const dropdownRef = useRef(null);
    const buttonRefs = useRef({});

    const users = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
    }));

    const toggleDropdown = (id) => {
        if (openDropdown === id) {
            setOpenDropdown(null);
            setSearchTerm('');
        } else {
            const buttonEl = buttonRefs.current[id];
            if (buttonEl) {
                const rect = buttonEl.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;

                setDropdownDirection(spaceBelow < 150 && spaceAbove > 150 ? 'top' : 'bottom');
            }
            setOpenDropdown(id);
            setSearchTerm('');
        }
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpenDropdown(null);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const filteredOptions = ['Edit', 'Delete', "remove", 'cancel', 'Edit', 'Delete', "remove", 'cancel'].filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <table className="min-w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2 relative">
                                <button
                                    ref={(el) => (buttonRefs.current[user.id] = el)}
                                    onClick={() => toggleDropdown(user.id)}
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                >
                                    ⋮
                                </button>

                                {openDropdown === user.id && (
                                    <div
                                        ref={dropdownRef}
                                        className={`absolute right-0 w-40 bg-white border rounded shadow-lg z-10 ${
                                            dropdownDirection === 'top' ? 'bottom-full mb-2' : 'mt-2'
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-3 py-2 border-b text-sm focus:outline-none"
                                        />
                                        <ul className="text-sm max-h-40 overflow-auto">
                                            {filteredOptions.length > 0 ? (
                                                filteredOptions.map((option, index) => (
                                                    <li key={index}>
                                                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                                            {option}
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-400">No results</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithDropdown;
