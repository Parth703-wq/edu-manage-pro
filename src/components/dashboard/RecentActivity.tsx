
interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-college-light-purple text-white flex items-center justify-center text-sm font-medium">
              {activity.user.charAt(0)}
            </div>
          </div>
          <div className="ml-3">
            <div className="text-sm">
              <span className="font-medium text-gray-900">{activity.user}</span>{' '}
              <span className="text-gray-700">{activity.action}</span>{' '}
              <span className="font-medium text-gray-900">{activity.target}</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {activity.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
