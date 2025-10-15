
import { useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import {
  TooltipProvider,
  Tooltip as AnimateTooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";

const DonutCard = ({ title, data, colors }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onEnter = (_, index) => setActiveIndex(index);
  const onLeave = () => setActiveIndex(null);

  return (
    <div
      className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-lg w-[420px] h-[260px]"
      style={{
        border: 'none',
        outline: 'none'
      }}
      tabIndex={-1}
      onFocus={(e) => e.target.blur()}
    >
      {/* Radial Bar Chart (like circular segments) */}
      <TooltipProvider>
        <AnimateTooltip>
          <TooltipTrigger asChild>
            <div className="w-44 h-44 flex justify-center items-center">
              <ResponsiveContainer>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="100%"
                  barSize={22}
                  data={data}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={5}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    isAnimationActive={true}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </RadialBar>
                  <Tooltip
                    content={() => null}
                    cursor={false}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-900 text-white border-0 shadow-lg z-50">
            <div className="space-y-1">
              {data.map((entry, index) => (
                <p key={index} className="text-sm">
                  <span style={{ color: colors[index % colors.length] }}>●</span> {entry.name}: {entry.value}
                </p>
              ))}
            </div>
          </TooltipContent>
        </AnimateTooltip>
      </TooltipProvider>



      {/* Legend + Title */}
      <div className="flex-1 ml-5">
        <div className="flex items-center gap-2 mb-3">
          <h5 className="font-semibold">{title}</h5>
        </div>

        <div className="space-y-3">
          {data.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className={`flex items-center gap-3 cursor-pointer transition-transform ${activeIndex === index ? "scale-105 font-semibold" : ""
                }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={onLeave}
            >
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-700">{entry.name}</span>
              <span className="text-xs text-gray-500 ml-auto">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutCard;
