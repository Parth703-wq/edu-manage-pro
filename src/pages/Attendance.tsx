
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, ChevronDown, Check, X, Filter, UserCheck, UserX, CalendarCheck, CalendarX } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/use-toast";

// Sample student data
const students = [
  { id: 1, name: "Aditya Patel", roll: "19BCE001", attendance: 92 },
  { id: 2, name: "Priya Shah", roll: "19BCE002", attendance: 85 },
  { id: 3, name: "Rahul Mehta", roll: "19BCE003", attendance: 78 },
  { id: 4, name: "Sanjana Desai", roll: "19BCE004", attendance: 95 },
  { id: 5, name: "Vikram Singh", roll: "19BCE005", attendance: 88 },
  { id: 6, name: "Nisha Joshi", roll: "19BCE006", attendance: 65 },
  { id: 7, name: "Karan Patel", roll: "19BCE007", attendance: 72 },
  { id: 8, name: "Anjali Kumar", roll: "19BCE008", attendance: 90 },
];

// Sample daily attendance data
const dailyAttendance = {
  "2025-04-10": [
    { id: 1, name: "Aditya Patel", roll: "19BCE001", status: "present" },
    { id: 2, name: "Priya Shah", roll: "19BCE002", status: "present" },
    { id: 3, name: "Rahul Mehta", roll: "19BCE003", status: "absent" },
    { id: 4, name: "Sanjana Desai", roll: "19BCE004", status: "present" },
    { id: 5, name: "Vikram Singh", roll: "19BCE005", status: "present" },
    { id: 6, name: "Nisha Joshi", roll: "19BCE006", status: "absent" },
    { id: 7, name: "Karan Patel", roll: "19BCE007", status: "present" },
    { id: 8, name: "Anjali Kumar", roll: "19BCE008", status: "present" },
  ],
  "2025-04-11": [
    { id: 1, name: "Aditya Patel", roll: "19BCE001", status: "present" },
    { id: 2, name: "Priya Shah", roll: "19BCE002", status: "present" },
    { id: 3, name: "Rahul Mehta", roll: "19BCE003", status: "present" },
    { id: 4, name: "Sanjana Desai", roll: "19BCE004", status: "present" },
    { id: 5, name: "Vikram Singh", roll: "19BCE005", status: "absent" },
    { id: 6, name: "Nisha Joshi", roll: "19BCE006", status: "present" },
    { id: 7, name: "Karan Patel", roll: "19BCE007", status: "absent" },
    { id: 8, name: "Anjali Kumar", roll: "19BCE008", status: "present" },
  ],
  "2025-04-12": [
    { id: 1, name: "Aditya Patel", roll: "19BCE001", status: "present" },
    { id: 2, name: "Priya Shah", roll: "19BCE002", status: "absent" },
    { id: 3, name: "Rahul Mehta", roll: "19BCE003", status: "present" },
    { id: 4, name: "Sanjana Desai", roll: "19BCE004", status: "present" },
    { id: 5, name: "Vikram Singh", roll: "19BCE005", status: "present" },
    { id: 6, name: "Nisha Joshi", roll: "19BCE006", status: "present" },
    { id: 7, name: "Karan Patel", roll: "19BCE007", status: "present" },
    { id: 8, name: "Anjali Kumar", roll: "19BCE008", status: "absent" },
  ]
};

const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState("19BCE-A");
  const [selectedSubject, setSelectedSubject] = useState("Computer Programming");
  const [selectedSection, setSelectedSection] = useState("A");
  const [todayAttendance, setTodayAttendance] = useState<any[]>([]);

  // Fetch today's attendance data
  const fetchAttendanceData = (selectedDate: Date) => {
    const dateString = format(selectedDate, "yyyy-MM-dd");
    const attendance = dailyAttendance[dateString as keyof typeof dailyAttendance] || [];
    setTodayAttendance(attendance);
  };

  // Mark attendance
  const markAttendance = (studentId: number, status: string) => {
    setTodayAttendance(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    );

    toast({
      title: "Attendance Updated",
      description: `Marked ${status} for Student ID: ${studentId}`,
    });
  };

  // Save attendance
  const saveAttendance = () => {
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(date || new Date(), "PPP")} has been saved successfully.`,
    });
  };

  // Generate attendance report
  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: "Attendance report has been generated and is ready for download.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        
        {user?.role === 'admin' && (
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" onClick={generateReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="overall">Overall Report</TabsTrigger>
          {user?.role === 'faculty' && (
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <Card className="col-span-1 md:col-span-3">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Select date and class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          if (date) fetchAttendanceData(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19BCE-A">19BCE-A</SelectItem>
                      <SelectItem value="19BCE-B">19BCE-B</SelectItem>
                      <SelectItem value="20BCE-A">20BCE-A</SelectItem>
                      <SelectItem value="20BCE-B">20BCE-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Programming">Computer Programming</SelectItem>
                      <SelectItem value="Data Structures">Data Structures</SelectItem>
                      <SelectItem value="Digital Systems">Digital Systems</SelectItem>
                      <SelectItem value="Engineering Mathematics">Engineering Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full" onClick={() => {
                  if (date) fetchAttendanceData(date);
                }}>
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filter
                </Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-9">
              <CardHeader>
                <CardTitle>Daily Attendance Record</CardTitle>
                <CardDescription>
                  {date ? format(date, "PPPP") : "Select a date"} | {selectedClass} | {selectedSubject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAttendance.length > 0 ? (
                      todayAttendance.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.roll}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              student.status === 'present' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-red-50 text-red-700'
                            }`}>
                              {student.status === 'present' ? (
                                <Check className="w-3 h-3 mr-1" />
                              ) : (
                                <X className="w-3 h-3 mr-1" />
                              )}
                              {student.status === 'present' ? 'Present' : 'Absent'}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                          No attendance data found for the selected date. Please select a different date or class.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="overall">
          <Card>
            <CardHeader>
              <CardTitle>Overall Attendance Report</CardTitle>
              <CardDescription>Complete attendance summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center p-4 border rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-green-100 text-green-700 mr-4">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                    <p className="text-2xl font-bold">83.12%</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-red-100 text-red-700 mr-4">
                    <UserX className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Below 75% Attendance</p>
                    <p className="text-2xl font-bold">2 Students</p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Total Classes</TableHead>
                      <TableHead>Classes Attended</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.roll}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>{Math.round(42 * student.attendance / 100)}</TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            student.attendance >= 75 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {student.attendance >= 75 ? 'Good Standing' : 'Warning'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {user?.role === 'faculty' && (
          <TabsContent value="mark">
            <Card>
              <CardHeader>
                <CardTitle>Mark Today's Attendance</CardTitle>
                <CardDescription>
                  {format(new Date(), "PPPP")} | {selectedClass} | {selectedSubject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="w-full md:w-auto">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="19BCE-A">19BCE-A</SelectItem>
                        <SelectItem value="19BCE-B">19BCE-B</SelectItem>
                        <SelectItem value="20BCE-A">20BCE-A</SelectItem>
                        <SelectItem value="20BCE-B">20BCE-B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Programming">Computer Programming</SelectItem>
                        <SelectItem value="Data Structures">Data Structures</SelectItem>
                        <SelectItem value="Digital Systems">Digital Systems</SelectItem>
                        <SelectItem value="Engineering Mathematics">Engineering Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Mark Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.roll}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                                onClick={() => markAttendance(student.id, 'present')}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Present
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                                onClick={() => markAttendance(student.id, 'absent')}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={saveAttendance}>
                    Save Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      {user?.role === 'student' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Attendance Overview</CardTitle>
            <CardDescription>Current semester attendance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-700 mr-4">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                    <p className="text-xl font-bold">88%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">37 out of 42 classes attended</p>
              </div>
              
              <div className="flex flex-col justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-yellow-100 text-yellow-700 mr-4">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-xl font-bold">83%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">10 out of 12 classes attended</p>
              </div>
              
              <div className="flex flex-col justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-100 text-red-700 mr-4">
                    <CalendarX className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Low Attendance Subjects</p>
                    <p className="text-xl font-bold">1 Subject</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Engineering Physics: 65%</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Subject-wise Attendance</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Total Classes</TableHead>
                      <TableHead>Attended</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Computer Programming</TableCell>
                      <TableCell>Prof. Patel</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>11</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          92%
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Data Structures</TableCell>
                      <TableCell>Prof. Kumar</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>9</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          90%
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Engineering Mathematics</TableCell>
                      <TableCell>Prof. Sharma</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          88%
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Digital Systems</TableCell>
                      <TableCell>Prof. Mehta</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                          67%
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Engineering Physics</TableCell>
                      <TableCell>Prof. Das</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                          65%
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Attendance;
