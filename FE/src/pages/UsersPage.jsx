import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditUserModal from "../components/EditUserModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async (pageNumber) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users?page=${pageNumber}`
      );
      const data = await response.json();
      console.log("data", data);
      setUsers(data);
      setTotalPages(Math.ceil(data.total / data.per_page));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEditUser = (user) => setEditingUser(user);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        alert("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg flex items-center"
          >
            <div>
              <h2 className="font-bold">
                {
                  // Conditional rendering based on whether firstname and lastname are present
                  user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}` // Show full name if both are present
                    : user.username // Show username as a fallback
                }
              </h2>
              <p>{user.email}</p>
            </div>
            <button
              className="ml-auto mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => handleEditUser(user)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="py-2 px-4 mx-2 bg-gray-300 rounded-lg"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage((prev) => {
              const newPage = prev + 1;
              fetchUsers(newPage);
              return newPage;
            });
          }}
          className="py-2 px-4 mx-2 bg-blue-500 text-white rounded-lg"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={() => fetchUsers(page)}
        />
      )}
    </div>
  );
};

export default UsersPage;
