import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8002/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details.");
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8002/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (title, content) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8002/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes((prevNotes) => [response.data.note, ...prevNotes]);
      setNewNote({ title: "", content: "" }); // Reset the form
      setShowAddForm(false); // Hide the form
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to create note.");
    }
  };

  const handleUpdate = async (id, title, content) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8002/api/notes/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...response.data.note } : note
        )
      );
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8002/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchUserDetails();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-6">
        {/* Display User Details */}
        {user && (
          <div className="mb-6 p-6 rounded-lg bg-white shadow-lg border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome, {user.username}!</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          </div>
        )}
  
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Your Notes</h1>
          <button
            className={`${
              showAddForm ? "bg-red-500" : "bg-blue-500"
            } text-white px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg`}
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            {showAddForm ? "Close" : "Create Note"}
          </button>
        </div>
  
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
  
        {showAddForm && (
          <form
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate(newNote.title, newNote.content);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote((prev) => ({ ...prev, content: e.target.value }))
                }
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              Add Note
            </button>
          </form>
        )}
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onUpdate={(updatedNote) =>
                handleUpdate(note._id, updatedNote.title, updatedNote.content)
              }
              onDelete={() => handleDelete(note._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default DashboardPage;
