import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function CreateAgentForm({ templates, onCancel }) {
  const [showDialog, setShowDialog] = useState(false);
  const [agentName, setAgentName] = useState("");

  const handleTryNow = (templateName) => {
    setAgentName(templateName);
    setShowDialog(true);
  };

  const handleCreateAgent = () => {
    // Replace with real API call
    alert(`Creating agent with name: ${agentName}`);
    setShowDialog(false);
  };

  return (
    <>
      <div className="w-full flex p-6 space-x-6">
        {/* Left side: Create Agent Form */}
        <div className="w-1/2 bg-white p-6 rounded-xl shadow border border-gray-400">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-0 text-black">Create Agent</h2>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Cancel
            </button>
          </div>

          <label className="mt-6 block text-sm font-medium mb-2 text-black" htmlFor="agentName">
            Agent Name
          </label>
          <input
            id="agentName"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type Name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />
          <p className="text-xs text-gray-500 mb-6">
            This can be adjusted at any time after creation
          </p>

          <div
            className="bg-gray-100 p-4 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition"
            onClick={() => setShowDialog(true)}
          >
            <FaUserCircle className="text-xl text-gray-500" />
            <div>
              <h3 className="text-sm text-black font-medium">Custom Starter</h3>
              <p className="text-xs text-gray-500">A minimalist starting point with basic config</p>
            </div>
          </div>
        </div>

        {/* Right side: Templates */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Choose Templates</h2>
          <div className="grid grid-cols-2 gap-8 mt-8">
            {templates.map(({ name, desc, iconPath }, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-sm flex flex-col justify-between h-full cursor-pointer hover:shadow-md transition"
                onClick={() => handleTryNow(name)}
              >
                <div>
                  <h4 className="font-semibold text-sm text-black flex items-center gap-2">
                    {iconPath && <img src={iconPath} alt={`${name} icon`} className="w-5 h-5" />}
                    {name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 mb-2">{desc}</p>
                </div>

                <button
                  className="text-xs text-indigo-600 font-medium hover:underline mt-4 self-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTryNow(name);
                  }}
                  type="button"
                >
                  Try Now &gt;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple modal dialog */}
      {showDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-96 max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Create Agent</h3>
            <label className="block mb-2 font-medium text-gray-700">Agent Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Agent Name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={handleCreateAgent}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
