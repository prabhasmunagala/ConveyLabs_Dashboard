import React, { useState, useEffect, useRef } from "react";
import { TbSmartHome } from "react-icons/tb";
import { IoMdContacts, IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import { FaRegFolderOpen, FaPhoneAlt, FaPlug, FaRegBookmark, FaUserCircle, FaList } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GoBell } from "react-icons/go";
import AgentDetails from "./AgentDetails";
import NotificationSidebar from "./NotificationSidebar";
import CustomerSupport from "../assets/add-user.svg";
import CreateAgentForm from "./CreateAgentForm";


function SideNavbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const inputRef = useRef(null);

  const [agents, setAgents] = useState({
    "Agent Name 01": {
      email: "test@email.com",
      firstMessage: "",
      systemPrompt: "",
      maxTokens: 25,
      // temperature: 0.7,
      // detectEmotion: false,
    },
    "Agent Name 02": {
      email: "agent02@example.com",
      firstMessage: "Hello!",
      systemPrompt: "",
      maxTokens: 30,
      // temperature: 0.5,
      // detectEmotion: true,
    },
  });


  const templates = [
    {
      name: "Customer Support",
      desc: "Efficiently handle FAQs, troubleshoot issues, and provide instant resolutions to user queries.",
      iconPath: CustomerSupport,
    },
    {
      name: "Appointment Setter",
      desc: "Streamline bookings by managing appointments and sending reminders with ease.",
      icon: "",
    },
    {
      name: "Feedback Collector",
      desc: "Capture user reviews, suggestions, and insights for continuous improvement.",
      icon: "",
    },
    {
      name: "Sales Assistant",
      desc: "Guide users through products, answer queries, and support purchasing decisions.",
      icon: "",
    },
    {
      name: "Onboarding Helper",
      desc: "Welcome new users with step-by-step guidance and answer initial questions.",
      icon: "",
    },
    {
      name: "Event Reminder",
      desc: "Send timely notifications for meetings, events, and important deadlines.",
      icon: "",
    },
    {
      name: "Lead Qualifier",
      desc: "Engage prospects, ask qualifying questions, and pass on leads to your sales team.",
      icon: "",
    },
    {
      name: "HR Assistant",
      desc: "Answer employee inquiries about policies, leave, and more while automating HR tasks.",
      icon: "",
    },
  ];

  const [selectedAgent, setSelectedAgent] = useState("Agent Name 01");

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome!", isNew: false },
    { id: 2, text: "You have a message!", isNew: false },
  ]);

  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);

  // Update agent details
  const updateAgentData = (agentName, newData) => {
    setAgents((prev) => ({
      ...prev,
      [agentName]: {
        ...prev[agentName],
        ...newData,
      },
    }));
  };

  // Notification simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        { id: prev.length + 1, text: "New Notification", isNew: true },
      ]);
      setHasNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Mark notifications as read when sidebar opens
  useEffect(() => {
    if (isNotificationSidebarOpen) {
      setHasNotification(false);
      setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
    }
  }, [isNotificationSidebarOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  const menuItems = [
    { name: "Home", icon: <TbSmartHome /> },
    { name: "Agents", icon: <IoMdContacts /> },
    { name: "Contacts", icon: <FaList /> },
    { name: "Files", icon: <FaRegFolderOpen /> },
    { name: "Phone Number", icon: <FaPhoneAlt /> },
    { name: "Integrations", icon: <FaPlug /> },
    { name: "Call Logs", icon: <FaRegBookmark /> },
    { name: "Campaigns" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-100 border-r border-gray-300 transition-all duration-300 flex flex-col justify-between ${isSidebarOpen ? "w-64" : "w-16"} p-4`}>
        <div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mb-4 p-2 text-gray-600 hover:text-blue-600">
            <BiLogOut className="w-6 h-6" />
          </button>
          <ul className="space-y-4 text-black font-medium">
            {menuItems.map((item) =>
              item.name ? (
                <li
                  key={item.name}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${activeItem === item.name ? "bg-blue-600 text-white" : "hover:text-blue-600"
                    }`}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsCreatingAgent(false);
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </li>
              ) : null
            )}
          </ul>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-300 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{activeItem}</h2>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li className="relative">
              {isSearchOpen ? (
                <div ref={inputRef} className="flex items-center border border-gray-300 rounded overflow-hidden" style={{ width: "200px" }}>
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") alert(`Searching: ${searchQuery}`);
                      else if (e.key === "Escape") setIsSearchOpen(false);
                    }}
                    placeholder="Search..."
                    className="px-2 py-1 w-full focus:outline-none"
                  />
                  <button className="px-3 text-gray-600 hover:text-blue-600" type="button">
                    <IoIosSearch />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="hover:text-blue-600 text-2xl" type="button">
                  <IoIosSearch />
                </button>
              )}
            </li>
            <li className="relative hover:text-blue-600 text-2xl cursor-pointer" onClick={() => setIsNotificationSidebarOpen((p) => !p)}>
              <GoBell />
              {hasNotification && <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-600 rounded-full ring-2 ring-white"></span>}
            </li>
          </ul>
        </div>

        {/* Content Area */}
        {activeItem === "Agents" && (
          <div className="flex flex-1">
            {!isCreatingAgent ? (
              <>
                {/* Agent List Sidebar */}
                <div className="w-1/4 bg-gray-50 p-4 border-r border-gray-300">
                  <h3 className="flex items-center justify-between text-lg font-semibold mb-4">
                    All Agents
                    <IoIosAddCircleOutline
                      className="text-indigo-600 hover:text-indigo-800 cursor-pointer text-2xl"
                      onClick={() => setIsCreatingAgent(true)}
                    />
                  </h3>
                  <ul className="space-y-2">
                    {Object.keys(agents).map((agent) => (
                      <li
                        key={agent}
                        className={`p-2 rounded cursor-pointer ${agent === selectedAgent ? "bg-blue-100" : "hover:bg-gray-200"}`}
                        onClick={() => setSelectedAgent(agent)}
                      >
                        {agent}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Agent Details */}
                <div className="w-3/4 p-6 overflow-y-auto">
                  <AgentDetails
                    agentName={selectedAgent}
                    agentData={agents[selectedAgent]}
                    updateAgentData={(data) => updateAgentData(selectedAgent, data)}
                  />
                </div>
              </>
            ) : (
              <CreateAgentForm templates={templates} onCancel={() => setIsCreatingAgent(false)} />
            )}
          </div>
        )}

        {/* Notification Sidebar */}
        <NotificationSidebar
          isOpen={isNotificationSidebarOpen}
          onClose={() => setIsNotificationSidebarOpen(false)}
          notifications={notifications}
        />
      </div>
    </div>
  );
}

export default SideNavbar;
