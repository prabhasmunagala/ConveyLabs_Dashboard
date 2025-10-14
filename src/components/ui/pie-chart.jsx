
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DonutCard = ({ title, data, colors }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  return (
    <div className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-lg w-[420px] h-[260px]">
      {/* Donut Pie on Left */}
      <div className="w-44 h-44 flex justify-center items-center">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke={activeIndex === index ? "#fff" : "#f9f9f9"}
                  strokeWidth={activeIndex === index ? 3 : 1}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + Title on Right */}
      <div className="flex-1 ml-5">
        <div className="flex items-center gap-2 mb-3">
          <h5 className="font-semibold">{title}</h5>
        </div>

        <div className="space-y-3">
          {data.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className={`flex items-center gap-3 cursor-pointer transition-transform ${
                activeIndex === index ? "scale-105 font-semibold" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={onPieLeave}
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