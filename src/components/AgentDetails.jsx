import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { IoSettingsOutline, IoCubeOutline, IoConstructOutline } from "react-icons/io5";
import InfoTooltip from "./InfoTooltip";

function AgentDetails({ agentName, agentData, updateAgentData }) {
  const [activeTab, setActiveTab] = useState("Model");
  const [temperature, setTemperature] = useState(agentData.temperature);
  // const [detectEmotion, setDetectEmotion] = useState(false);
  const [firstMessage, setFirstMessage] = useState(agentData.firstMessage);
  const [systemPrompt, setSystemPrompt] = useState(agentData.systemPrompt);
  const [maxTokens, setMaxTokens] = useState(agentData.maxTokens);
  const [copied, setCopied] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const tabs = [
    { name: "Model", icon: <IoCubeOutline className="inline-block mr-1" /> },
    { name: "Functions", icon: <IoConstructOutline className="inline-block mr-1" /> },
    { name: "Advanced", icon: <IoSettingsOutline className="inline-block mr-1" /> },
  ];

  useEffect(() => {
    setTemperature(agentData.temperature);
    // setDetectEmotion(agentData.detectEmotion);
    setFirstMessage(agentData.firstMessage);
    setSystemPrompt(agentData.systemPrompt);
    setMaxTokens(agentData.maxTokens);
  }, [agentData]);

  const handleUpdate = () => {
    updateAgentData({
      temperature,
      // detectEmotion,
      firstMessage,
      systemPrompt,
      maxTokens,
    });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(agentData.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      e.target.value = ""; // Reset the input
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">{agentName}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 relative">
            <span>{agentData.email}</span>
            <button
              onClick={handleCopyEmail}
              className="p-1 hover:text-indigo-600"
              aria-label="Copy email"
            >
              <FaRegCopy />
            </button>
            {copied && (
              <div className="absolute left-full ml-2 bg-green-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
                Copied
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 border border-gray-300 rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
            title="Talk with your Agent"
          >
            <FaPhoneAlt />
            Talk with your Agent
          </button>
          <button
            onClick={handleUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded flex items-center gap-1"
          >
            <MdCheckCircle />
            Update
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex space-x-8">
        {tabs.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            className={`relative pb-2 font-medium text-sm flex items-center ${activeTab === name
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-400 hover:text-indigo-600"
              }`}
          >
            {icon}
            {name}
          </button>
        ))}
      </div>

      {/* Model Tab */}
      {activeTab === "Model" && (
        <div className="flex space-x-10 h-[500px]"> {/* fixed height, adjust as needed */}
          <div className="w-1/3 space-y-6 text-gray-600 text-sm ">
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  Training
                  <InfoTooltip info="Upload your knowledge base to train the agent." />
                </div>
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white  focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="w-2/3 space-y-6 text-gray-700 text-sm overflow-y-auto">
            {/* This div will scroll internally */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">First Message</label>
              <textarea
                rows={3}
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">System Prompt</label>
              <textarea
                rows={8}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            {/* Your other repeated First Message textareas */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">First Message</label>
              <textarea
                rows={3}
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">First Message</label>
              <textarea
                rows={3}
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">First Message</label>
              <textarea
                rows={3}
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
        </div>

      )}
      {/* Other Tabs Placeholder */}
      {activeTab !== "Model" && (
        <div className="text-gray-400 italic">
          Content for {activeTab} tab is coming soon.
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded shadow-lg z-50">
          ✅ Agent form updated successfully!
        </div>
      )}
    </div>
  );
}

export default AgentDetails;
