
import { ReactNode } from "react";

interface QuickStatProps {
  stat: {
    title: string;
    value: string;
    icon: ReactNode;
    change: string;
    color: string;
  };
}

const QuickStats = ({ stat }: QuickStatProps) => {
  return (
    <div className={`stat-card ${stat.color}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
        <div className="text-gray-400">{stat.icon}</div>
      </div>
      <div className="flex items-end">
        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
        {stat.change && (
          <p className={`ml-2 text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
            {stat.change}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuickStats;
