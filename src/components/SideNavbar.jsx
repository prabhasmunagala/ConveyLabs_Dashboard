import React, { useState, useEffect, useRef } from "react";
import { TbSmartHome } from "react-icons/tb";
import { IoMdContacts} from "react-icons/io";
import { FaRegFolderOpen, FaPhoneAlt, FaPlug, FaRegBookmark, FaUserCircle, FaList } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import NotificationSidebar from "./NotificationSidebar";
import TopNavbar from "./TopNavbar";
import Agents from "../pages/agents/Agents";
import CustomerSupport from "../assets/add-user.svg";
// import CreateAgentForm from "./CreateAgentForm";
import Dashboard from "../pages/overview/page";
import CallLogs from "../pages/call_logs/page";

function SideNavbar() {
  const [activeItem, setActiveItem] = useState("Overview");
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
      //
    },
    "Agent Name 02": {
      email: "agent02@example.com",
      firstMessage: "",
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
    { name: "Overview", icon: <TbSmartHome /> },
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
      <div className={`bg-#d7d7d7 border-r border-white-300 transition-all duration-300 flex flex-col justify-between ${isSidebarOpen ? "w-64" : "w-16"} p-4`}>
        <div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mb-4 p-2 text-white-600 hover:text-blue-600">
            <BiLogOut className="w-6 h-6" />
          </button>
          <ul className="space-y-4 text-black font-medium">
            {menuItems.map((item) =>
              item.name ? (
                <li
                  key={item.name}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${activeItem === item.name ? "bg-[#068fff] text-white" : "hover:text-blue-600"
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
        <TopNavbar
          activeItem={activeItem}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          inputRef={inputRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isNotificationSidebarOpen={isNotificationSidebarOpen}
          setIsNotificationSidebarOpen={setIsNotificationSidebarOpen}
          hasNotification={hasNotification}
          setHasNotification={setHasNotification}
          setIsCreatingAgent={setIsCreatingAgent}
        />

        {/* Content Area */}
        {activeItem === "Overview" && (
          <div className="flex-1 overflow-y-auto">
            <Dashboard />
          </div>
        )}
        {activeItem === "Agents" && (
          <Agents
            agents={agents}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            isCreatingAgent={isCreatingAgent}
            setIsCreatingAgent={setIsCreatingAgent}
            templates={templates}
            updateAgentData={updateAgentData}
          />
        )}
        {activeItem === "Call Logs" && (
          <div className="flex-1 overflow-y-auto">
            <CallLogs/>
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
