// sidebarConfig.js
import {
    FiHome,
    FiUsers,
    FiSettings,
    FiFileText,
} from "react-icons/fi";

export const sidebarItems = [
    {
        key: "home",
        label: "Home",
        icon: FiHome,
    },
    {
        key: "users",
        label: "Users",
        icon: FiUsers,
        submenu: [
            { key: "add-user", label: "Add User" },
            { key: "user-list", label: "User List" },
            { key: "edit-user", label: "Edit User" },
        ],
    },
    {
        key: "reports",
        label: "Reports",
        icon: FiFileText,
        submenu: [
            { key: "daily-report", label: "Daily Report" },
            { key: "monthly-report", label: "Monthly Report" },
        ],
    },
    {
        key: "settings",
        label: "Settings",
        icon: FiSettings,
    },
];
