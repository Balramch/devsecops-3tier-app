import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const API = "/api";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (!name || !email) return alert("Fill all fields");

    try {
      await axios.post(`${API}/users`, { name, email });
      setName("");
      setEmail("");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple CRUD App By Balram Chaudhary</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <button onClick={addUser} style={{ marginLeft: 10 }}>
        Add
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id} | {u.name} | {u.email}
            <button
              onClick={() => deleteUser(u.id)}
              style={{ marginLeft: 10, color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}