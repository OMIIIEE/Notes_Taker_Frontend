import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    onUpdate({ title, content });
    setEditMode(false);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formats date and time as per locale
  };

  const handleDelete = () => {
    setConfirmDelete(false); // Close the confirmation modal
    onDelete(note._id); // Call the delete handler
  };

  return (
    <>
      <div className="p-4 border border-gray-300 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">{note.title}</h3>
        <p className="mt-2">{note.content.split(" ").slice(0, 15).join(" ")}...</p>
        <div className="mt-4 text-sm text-gray-600 flex flex-col">
          <span>Created on: {new Date(note.createdAt).toLocaleString()}</span>
          <span>Updated on: {new Date(note.updatedAt).toLocaleString()}</span>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <FaEye className="text-blue-500 cursor-pointer" onClick={() => setShowModal(true)} />
          <FaEdit className="text-green-500 cursor-pointer" onClick={() => setEditMode(true)} />
          <FaTrashAlt
            className="text-red-500 cursor-pointer"
            onClick={() => setConfirmDelete(true)}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">{note.title}</h3>
            <p>{note.content}</p>
            <div className="mt-4 text-sm text-gray-600">
              <span>Created on: {new Date(note.createdAt).toLocaleString()}</span>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this note?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Note</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            ></textarea>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
