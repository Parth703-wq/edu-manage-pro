
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useAuth } from '../hooks/useAuth';

const Timetable = () => {
  const { user } = useAuth();
  const [activeDay, setActiveDay] = useState('monday');
  
  // Sample timetable data for different days
  const timetableData = {
    monday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Engineering Mathematics', faculty: 'Prof. Sharma', room: 'A-101' },
      { time: '10:00 AM - 11:00 AM', subject: 'Computer Programming', faculty: 'Prof. Patel', room: 'A-102' },
      { time: '11:15 AM - 12:15 PM', subject: 'Electronic Devices', faculty: 'Prof. Joshi', room: 'B-201' },
      { time: '12:15 PM - 1:15 PM', subject: 'Digital Systems', faculty: 'Prof. Mehta', room: 'C-301' },
      { time: '2:00 PM - 3:00 PM', subject: 'Lab: Computer Programming', faculty: 'Prof. Patel', room: 'Lab 1' },
      { time: '3:00 PM - 4:00 PM', subject: 'Lab: Computer Programming', faculty: 'Prof. Patel', room: 'Lab 1' },
    ],
    tuesday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Engineering Physics', faculty: 'Prof. Das', room: 'A-103' },
      { time: '10:00 AM - 11:00 AM', subject: 'Communication Skills', faculty: 'Prof. Singh', room: 'A-104' },
      { time: '11:15 AM - 12:15 PM', subject: 'Data Structures', faculty: 'Prof. Kumar', room: 'B-202' },
      { time: '12:15 PM - 1:15 PM', subject: 'Engineering Drawing', faculty: 'Prof. Verma', room: 'D-101' },
      { time: '2:00 PM - 3:00 PM', subject: 'Lab: Physics', faculty: 'Prof. Das', room: 'Lab 2' },
      { time: '3:00 PM - 4:00 PM', subject: 'Lab: Physics', faculty: 'Prof. Das', room: 'Lab 2' },
    ],
    wednesday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Engineering Mathematics', faculty: 'Prof. Sharma', room: 'A-101' },
      { time: '10:00 AM - 11:00 AM', subject: 'Computer Programming', faculty: 'Prof. Patel', room: 'A-102' },
      { time: '11:15 AM - 12:15 PM', subject: 'Workshop Practice', faculty: 'Prof. Rajput', room: 'Workshop' },
      { time: '12:15 PM - 1:15 PM', subject: 'Digital Systems', faculty: 'Prof. Mehta', room: 'C-301' },
      { time: '2:00 PM - 4:00 PM', subject: 'Lab: Electronics', faculty: 'Prof. Joshi', room: 'Lab 3' },
    ],
    thursday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Engineering Physics', faculty: 'Prof. Das', room: 'A-103' },
      { time: '10:00 AM - 11:00 AM', subject: 'Communication Skills', faculty: 'Prof. Singh', room: 'A-104' },
      { time: '11:15 AM - 12:15 PM', subject: 'Data Structures', faculty: 'Prof. Kumar', room: 'B-202' },
      { time: '12:15 PM - 1:15 PM', subject: 'Engineering Drawing', faculty: 'Prof. Verma', room: 'D-101' },
      { time: '2:00 PM - 4:00 PM', subject: 'Lab: Computer Programming', faculty: 'Prof. Patel', room: 'Lab 1' },
    ],
    friday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Engineering Mathematics', faculty: 'Prof. Sharma', room: 'A-101' },
      { time: '10:00 AM - 11:00 AM', subject: 'Computer Programming', faculty: 'Prof. Patel', room: 'A-102' },
      { time: '11:15 AM - 12:15 PM', subject: 'Electronic Devices', faculty: 'Prof. Joshi', room: 'B-201' },
      { time: '12:15 PM - 1:15 PM', subject: 'Digital Systems', faculty: 'Prof. Mehta', room: 'C-301' },
      { time: '2:00 PM - 4:00 PM', subject: 'Project Work', faculty: 'Multiple Faculty', room: 'Various' },
    ],
    saturday: [
      { time: '9:00 AM - 11:00 AM', subject: 'Remedial Classes', faculty: 'Various', room: 'As Assigned' },
      { time: '11:15 AM - 1:15 PM', subject: 'Extra-Curricular Activities', faculty: 'Activity Coordinators', room: 'Various' },
    ],
    sunday: [],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="page-title">Timetable</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Tabs defaultValue="monday" value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="w-full flex overflow-x-auto mb-4">
              <TabsTrigger value="monday">Monday</TabsTrigger>
              <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
              <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
              <TabsTrigger value="thursday">Thursday</TabsTrigger>
              <TabsTrigger value="friday">Friday</TabsTrigger>
              <TabsTrigger value="saturday">Saturday</TabsTrigger>
              <TabsTrigger value="sunday">Sunday</TabsTrigger>
            </TabsList>
            
            {Object.keys(timetableData).map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <h2 className="text-xl font-semibold capitalize">{day}'s Schedule</h2>
                
                {timetableData[day].length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Faculty</TableHead>
                          <TableHead>Room</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timetableData[day].map((slot, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{slot.time}</TableCell>
                            <TableCell>{slot.subject}</TableCell>
                            <TableCell>{slot.faculty}</TableCell>
                            <TableCell>{slot.room}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No classes scheduled for this day.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      {user?.role === 'faculty' && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Faculty Tools</h2>
            <p className="text-gray-600 mb-4">
              As a faculty member, you can request schedule changes or report conflicts using the schedule management tools.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">Contact the academic office for urgent timetable changes.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Timetable;
