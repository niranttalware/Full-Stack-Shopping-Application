import React, { useEffect, useState } from "react";
import { apiUrl } from "../../api/apiUrl";

const UsersAdmin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const res = await fetch(apiUrl("/api/auth/users"));
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    await fetch(apiUrl(`/api/auth/user/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">All Users</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr className="border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">City</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b text-center">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.city}</td>
              <td className="p-3">{u.role}</td>

              <td className="p-3">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-500 font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;
