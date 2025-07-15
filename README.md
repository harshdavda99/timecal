import { useState } from "react";
import Select from 'react-select';

const mockUsers = [
    { value: 'u1', label: 'Alice' },
    { value: 'u2', label: 'Bob' },
    { value: 'u3', label: 'Charlie' },
];

const mockRepos = [
    { value: 'r1', label: 'Repo A' },
    { value: 'r2', label: 'Repo B' },
    { value: 'r3', label: 'Repo C' },
];


const GroupForm = ({ onGroupCreated }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedRepos, setSelectedRepos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGroup = {
            id: Date.now(),
            name: groupName,
            users: selectedUsers,
            repos: selectedRepos,
        };

        onGroupCreated(newGroup);

        setGroupName('');
        setSelectedUsers([]);
        setSelectedRepos([]);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow rounded bg-white space-y-4">
            <h2 className="text-xl font-semibold">Create User Group</h2>
            <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <Select
                isMulti
                options={mockUsers}
                value={selectedUsers}
                onChange={setSelectedUsers}
                placeholder="Select Users"
            />
            <Select
                isMulti
                options={mockRepos}
                value={selectedRepos}
                onChange={setSelectedRepos}
                placeholder="Select Repositories"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Group</button>
        </form>
    );
};

const GroupList = ({ groups }) => {
    return (
        <div className="max-w-5xl mx-auto mt-6">
            <h2 className="text-xl font-bold mb-4">User Groups</h2>
            {groups.length === 0 ? (
                <p className="text-gray-500">No groups created yet.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-4 py-2 border">#</th>
                                <th className="text-left px-4 py-2 border">Group Name</th>
                                <th className="text-left px-4 py-2 border">Users</th>
                                <th className="text-left px-4 py-2 border">Repositories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group, index) => (
                                <tr key={group.id} className="border-t">
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{group.name}</td>
                                    <td className="px-4 py-2 border">
                                        {group.users.map(user => user.label).join(', ')}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {group.repos.map(repo => repo.label).join(', ')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const UserGrouping = () => {
    const [groups, setGroups] = useState([]);

    const handleGroupCreated = (newGroup) => {
        setGroups(prev => [...prev, newGroup]);
    };
    return (
        <>
            <div className="p-6 bg-gray-100 w-1/2">
                <GroupForm onGroupCreated={handleGroupCreated} />
                <GroupList groups={groups} />
            </div>
        </>
    )
}

export default UserGrouping
