
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Bell, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  role: string;
  target: string[];
}

const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Fall Semester Registration',
    content: 'Registration for fall semester courses starts next week. Please check your eligibility and complete registration before the deadline.',
    date: '2023-07-12',
    author: 'Admin',
    role: 'admin',
    target: ['all']
  },
  {
    id: 2,
    title: 'Campus Maintenance Notice',
    content: 'The main library will be closed for renovations from July 20-25. Alternative study spaces have been arranged in the Student Center.',
    date: '2023-07-10',
    author: 'Facilities Department',
    role: 'admin',
    target: ['all']
  },
  {
    id: 3,
    title: 'Midterm Examination Schedule',
    content: 'Midterm examinations will be held from August 5-10. The detailed schedule has been published on the examination portal.',
    date: '2023-07-08',
    author: 'Examination Committee',
    role: 'faculty',
    target: ['student', 'faculty']
  },
  {
    id: 4,
    title: 'Faculty Meeting',
    content: 'All faculty members are required to attend the semester planning meeting on July 15 at 2:00 PM in Conference Room A.',
    date: '2023-07-07',
    author: 'Dean of Academic Affairs',
    role: 'admin',
    target: ['faculty']
  },
  {
    id: 5,
    title: 'Scholarship Opportunity',
    content: 'Applications are now open for the Merit Scholarship Program. Eligible students can apply through the student portal before July 30.',
    date: '2023-07-05',
    author: 'Financial Aid Office',
    role: 'admin',
    target: ['student']
  }
];

const Announcements = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(SAMPLE_ANNOUNCEMENTS);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    target: [] as string[]
  });

  // Filter announcements by user role
  const filteredAnnouncements = announcements.filter(
    announcement => 
      announcement.target.includes('all') || 
      announcement.target.includes(user?.role || '')
  );

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        id: Date.now(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().split('T')[0],
        author: user?.name || 'Unknown User',
        role: user?.role || 'unknown',
        target: newAnnouncement.target.length ? newAnnouncement.target : ['all']
      };

      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', target: [] });
      setIsAddingAnnouncement(false);
    }
  };

  const handleTargetChange = (target: string) => {
    setNewAnnouncement(prev => {
      const exists = prev.target.includes(target);
      if (exists) {
        return {
          ...prev,
          target: prev.target.filter(t => t !== target)
        };
      } else {
        return {
          ...prev,
          target: [...prev.target, target]
        };
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        
        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <Button 
            className="bg-college-purple hover:bg-college-purple/90"
            onClick={() => setIsAddingAnnouncement(!isAddingAnnouncement)}
          >
            {isAddingAnnouncement ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                New Announcement
              </>
            )}
          </Button>
        )}
      </div>

      {isAddingAnnouncement && (
        <Card className="mb-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Create New Announcement</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="Announcement title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                rows={4}
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple"
                placeholder="Announcement content"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Visible to</label>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="target-admin"
                    checked={newAnnouncement.target.includes('admin')}
                    onChange={() => handleTargetChange('admin')}
                    className="rounded border-gray-300 text-college-purple focus:ring-college-purple"
                  />
                  <label htmlFor="target-admin" className="ml-2 text-sm text-gray-700">
                    Administrators
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="target-faculty"
                    checked={newAnnouncement.target.includes('faculty')}
                    onChange={() => handleTargetChange('faculty')}
                    className="rounded border-gray-300 text-college-purple focus:ring-college-purple"
                  />
                  <label htmlFor="target-faculty" className="ml-2 text-sm text-gray-700">
                    Faculty
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="target-student"
                    checked={newAnnouncement.target.includes('student')}
                    onChange={() => handleTargetChange('student')}
                    className="rounded border-gray-300 text-college-purple focus:ring-college-purple"
                  />
                  <label htmlFor="target-student" className="ml-2 text-sm text-gray-700">
                    Students
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="target-all"
                    checked={newAnnouncement.target.includes('all')}
                    onChange={() => handleTargetChange('all')}
                    className="rounded border-gray-300 text-college-purple focus:ring-college-purple"
                  />
                  <label htmlFor="target-all" className="ml-2 text-sm text-gray-700">
                    Everyone
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                className="bg-college-purple hover:bg-college-purple/90"
                onClick={handleAddAnnouncement}
                disabled={!newAnnouncement.title || !newAnnouncement.content}
              >
                Post Announcement
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="p-4">
            <div className="flex items-start">
              <Bell className="h-5 w-5 text-college-purple mr-3 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{announcement.content}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  Posted by <span className="font-medium text-gray-700 ml-1">{announcement.author}</span>
                  {announcement.target.includes('all') ? (
                    <span className="ml-4 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">All Users</span>
                  ) : (
                    <div className="ml-4 flex gap-1">
                      {announcement.target.map((target) => (
                        <span key={target} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs capitalize">
                          {target}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <Bell className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No announcements</h3>
          <p className="text-gray-500">There are currently no announcements for you.</p>
        </div>
      )}
    </div>
  );
};

export default Announcements;
