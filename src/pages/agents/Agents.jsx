import React from 'react';
import AgentsDetails from '../../components/AgentsDetails';
import CreateAgentForm from '../../components/CreateAgentForm';
import { IoIosAddCircleOutline } from "react-icons/io";

function Agents(props) {
  const { agents, selectedAgent, setSelectedAgent, isCreatingAgent, setIsCreatingAgent, templates, updateAgentData } = props;
  return (
<div className="flex flex-1 bg-gray-100">
            {!isCreatingAgent ? (
              <>
                {/* Agent List Sidebar */}
                <div className="w-1/4 bg-white p-4 border-r border-gray-300 rounded-lg shadow-sm m-2">
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
                  <AgentsDetails
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
  );
}

export default Agents;
