import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCheckCircle, MdAddCall } from "react-icons/md";
import { FaRegCopy, FaMicrophoneSlash } from "react-icons/fa6";
import { IoSettingsOutline, IoCubeOutline, IoConstructOutline, IoTimer } from "react-icons/io5";
import { IoIosKeypad } from "react-icons/io";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import InfoTooltip from "./InfoTooltip";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdSettingsSuggest } from "react-icons/md";
import { FaMicrophoneLines } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";
function AgentDetails({ agentName, agentData, updateAgentData }) {
  const [activeTab, setActiveTab] = useState("Model");
  const [temperature, setTemperature] = useState(agentData.temperature);
  const [firstMessage, setFirstMessage] = useState(agentData.firstMessage);
  const [systemPrompt, setSystemPrompt] = useState(agentData.systemPrompt);
  const [primaryRole, setPrimaryRole] = useState(agentData.primaryRole);
  const [conversationflow, setConversationFlow] = useState(agentData.conversationflow);
  const [behavioralGuidelines, setBehaviouralGudielines] = useState(agentData.behavioralGuidelines);
  const [greetingMessage, setGreetingMessage] = useState(agentData.greetingMessage);
  const [knowledgeBase, setKnowledgeBase] = useState(agentData.knowledgeBase);
  const [response, setResponse] = useState(agentData.response);
  const [copied, setCopied] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);



  const tabs = [
    { name: "Model", icon: <IoCubeOutline className="inline-block mr-1" /> },
    { name: "Functions", icon: <IoConstructOutline className="inline-block mr-1" /> },
    { name: "Advanced", icon: <IoSettingsOutline className="inline-block mr-1" /> },
  ];
  // ✅ File upload logic
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    setTemperature(agentData.temperature);
    // setDetectEmotion(agentData.detectEmotion);
    setFirstMessage(agentData.firstMessage);
    setSystemPrompt(agentData.systemPrompt);
  }, [agentData]);

  const handleUpdate = () => {
    updateAgentData({
      temperature,
      firstMessage,
      systemPrompt,
      primaryRole,
      greetingMessage,
      conversationflow,
      behavioralGuidelines,
      knowledgeBase,
      response,
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
      e.target.value = ""; // Clear the input
      return;
    }

    setUploadedFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const SliderSetting = ({ label, icon: Icon, tooltip }) => {
    const [value, setValue] = useState(7);

    return (
      <div className="flex items-center justify-between gap-6 bg-gray-100 rounded-lg px-4 py-2 mr-6">
        {/* Left: Icon, Label & Description */}
        <div className="flex items-start gap-2 w-1/2">
          {Icon && <Icon className="text-2xl text-gray-600" />}
          <div>
            <p className="font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-500 mt-1">
              {tooltip || "This will allow the assistant to end the call."}
            </p>
          </div>
        </div>

        {/* Right: Slider */}
        <div className="w-2/5">
          <div className="flex justify-end text-sm text-purple-700 font-bold mb-1">
            {value}
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-3 accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      </div>
    );
  };
  function AutoResizingTextarea({ value, onChange, rows = 1 }) {
    const textareaRef = useRef(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // Reset height to shrink if needed
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
      }
    }, [value]);

    return (
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded p-2 resize-none overflow-hidden"
      />
    );
  }
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
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {uploadedFile && (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                    title="Remove uploaded file"
                  >
                    <AiOutlineCloseCircle size={25} className="bg-white" />
                  </button>
                )}
              </div>
              {uploadedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded: <strong>{uploadedFile.name}</strong>
                </p>
              )}
            </div>
          </div>
          <div className="flex h-full">
            <div className="w-px bg-gray-300 h-full" />
          </div>
          <div className="w-2/3 text-gray-700 text-sm">
            <h2 className="mb-4 font-semibold text-lg">Instructions :</h2>

            <div className="space-y-6 overflow-y-auto h-[460px] pr-2"> {/* Adjust height if needed */}
              {/* This section scrolls */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1 mt-6">
                    First Message
                    <InfoTooltip info="This is the message your assistant says first when initiating a conversation." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setFirstMessage(e.target.value)}
                  rows={3}
                />

              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    System Prompt
                    <InfoTooltip info="Defines how the assistant should behave globally." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={8}
                />

              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Primary Role
                    <InfoTooltip info="Describes the assistant’s main function or persona." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setPrimaryRole(e.target.value)}
                  rows={3}
                />

              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Conversation Flow
                    <InfoTooltip info="Defines how the assistant should guide the conversation." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setConversationFlow(e.target.value)}
                  rows={3}
                />

              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Behavioral Guidelines
                    <InfoTooltip info="Set tone, do’s and don’ts for assistant behavior." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setBehaviouralGudielines(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Greeting Message
                    <InfoTooltip info="What the assistant says when a conversation begins." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  rows={3}
                />

              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Knowledge Base
                    <InfoTooltip info="Reference data or knowledge the assistant should use." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  rows={3}
                />

              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  <div className="flex items-center gap-1">
                    Response
                    <InfoTooltip info="Default or fallback response pattern." />
                  </div>
                </label>
                <AutoResizingTextarea
                  value={firstMessage}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={3}
                />

              </div>
            </div>
          </div>
        </div>

      )}
      {activeTab === "Functions" && (
        <div className="h-[500px] flex flex-col space-y-4">

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 pr-2 space-y-8 text-sm text-gray-700">

            {/* Predefined Functions Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4 mr-4">
              <h3 className="font-semibold text-lg">Predefined Functions</h3>
              <p className="text-sm text-gray-500">
                We've pre-built functions for common use cases. You can enable them and configure them below.
              </p>

              <div className="space-y-4">
                {/* Enable End Call */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg">

                  <div>
                    <div className="flex items-start gap-2 text-gray-700 font-medium">
                      <MdAddCall className="text-xl mt-[2px]" />
                      <div>
                        <span>Enable End Call Function</span>
                        <p className="text-xs text-gray-500 mt-1">
                          This will allow the assistant to end the call from its side. (Best for GPT-4 and larger models.)
                        </p>
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={agentData.enableEndCall || false}
                      onChange={(e) => updateAgentData({ enableEndCall: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* Dial Keypad */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg">
                  <div>
                    <div className="flex items-start gap-2 text-gray-700 font-medium">
                      <IoIosKeypad className="text-xl mt-[2px]" />
                      <div>
                        <span>Dial Keypad</span>
                        <p className="text-xs text-gray-500 mt-1">
                          This sets whether the assistant can dial digits on the keypad.
                        </p>
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={agentData.dialKeypad || false}
                      onChange={(e) => updateAgentData({ dialKeypad: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* Forwarding number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forwarding Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      value={agentData.countryCode || "+1"}
                      onChange={(e) => updateAgentData({ countryCode: e.target.value })}
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Phone number"
                      className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                      value={agentData.forwardingNumber || ""}
                      onChange={(e) => updateAgentData({ forwardingNumber: e.target.value })}
                    />
                  </div>
                </div>

                {/* End Call Phrases */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Call Phrases
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                    placeholder="e.g. Goodbye, talk to you soon"
                    value={agentData.endCallPhrases || ""}
                    onChange={(e) => updateAgentData({ endCallPhrases: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Custom Functions Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4 mr-4">
              <h3 className="font-semibold text-lg">Custom Functions</h3>
              <p className="text-sm text-gray-500">
                Define your custom functions here to enhance your assistant’s capabilities.
              </p>
              <button
                className="mt-2 w-full px-4 py-2 bg-gray-100 text-black text-center rounded hover:bg-indigo-700 hover:text-white"
                onClick={() => {
                  // Add custom function logic here
                }}
              >
                Create New Function
              </button>
            </div>
          </div>
        </div>
      )}


      {activeTab === "Advanced" && (
        <div className="h-[500px] flex flex-col space-y-4">

          {/* Optional: Add fixed content here like a title if needed */}

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 pr-2 space-y-8 text-sm text-gray-700">

            {/* Privacy Section */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4 mr-4">
              <h3 className="font-semibold text-lg">Privacy</h3>
              <p className="text-sm text-gray-500">
                This section lets you customize the assistant’s privacy settings.
              </p>
              <div className="space-y-4">
                {/* HIPAA Compliance Toggle */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg mr-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <MdSettingsSuggest className="text-2xl text-gray-600" />
                      <p className="font-medium">HIPAA Compliance</p>
                    </div>
                    <p className="text-xs text-gray-500 pl-7">
                      Ensures the assistant follows HIPAA privacy regulations during conversations.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={agentData.hipaaCompliance || false}
                      onChange={(e) =>
                        updateAgentData({ hipaaCompliance: e.target.checked })
                      }
                    />
                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-transparent rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                {/* Audio Recording Toggle */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg mr-6">

                  <div>
                    <div className="flex items-center gap-2">
                      <FaMicrophoneLines className="text-2xl text-gray-600" />
                      <p className="font-medium">Audio Recording</p>
                    </div>
                    <p className="text-xs text-gray-500 pl-7">
                      Allows the assistant to record the audio of the conversation.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={agentData.audioRecording || false}
                      onChange={(e) =>
                        updateAgentData({ audioRecording: e.target.checked })
                      }
                    />
                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-transparent rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

            </div>

            {/* Start Speaking Plan */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4 mr-4">
              <h3 className="font-semibold text-lg">Start Speaking Plan</h3>
              <p className="text-sm text-gray-500">
                Defines when the assistant should initiate conversation.
              </p>

              <SliderSetting label="Wait Seconds" icon={BsFillClockFill} />
              <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-lg mr-6">
                <div>
                  <p className="font-medium flex items-center gap-2 text-gray-700">
                    <LiaNetworkWiredSolid className="text-2xl text-gray-600" />
                    Smart Endpointing
                  </p>
                  <p className="text-xs text-gray-500 pl-6">
                    Allows the assistant to smartly decide when to stop listening based on speech patterns.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={agentData.smartEndpointing || false}
                    onChange={(e) => updateAgentData({ smartEndpointing: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-transparent rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <SliderSetting label="On Punctuation Seconds" icon={MdSettingsSuggest} />
              <SliderSetting label="On No Punctuation Seconds" icon={MdSettingsSuggest} />
              <SliderSetting label="On Number Seconds" icon={MdSettingsSuggest} />
            </div>

            {/* Stop Speaking Plan */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4 mr-4">
              <h3 className="font-semibold text-lg">Stop Speaking Plan</h3>
              <p className="text-sm text-gray-500">
                Defines when the assistant should end conversation.
              </p>
              <SliderSetting label="Number of Words" icon={MdSettingsSuggest} />
              <SliderSetting label="Voice Seconds" icon={FaMicrophoneLines} />
              <SliderSetting label="Back off Seconds" icon={MdSettingsSuggest} />
            </div>

            {/* Call Time Out */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm space-y-4 mr-4">
              <h3 className="font-semibold text-lg">Call Time Out</h3>
              <p className="text-sm text-gray-500">
                Defines when the assistant should end the conversation.
              </p>
              <SliderSetting label="Silence Timeout" icon={FaMicrophoneSlash} />
              <SliderSetting label="Maximum Duration" icon={IoTimer} />
            </div>
          </div>
        </div>
      )}
      {/* Success Message */}
      {
        showSuccessMessage && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded shadow-lg z-50">
            ✅{agentName} Agent form updated successfully!
          </div>
        )
      }
    </div>
  )
}
export default AgentDetails;