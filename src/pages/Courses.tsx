
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Users, 
  Clock, 
  GraduationCap, 
  Calendar, 
  Filter,
  MoreHorizontal,
  Plus,
  FileText,
  ListChecks,
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/use-toast";

// Sample courses data
const coursesData = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 4,
    semester: "Fall 2025",
    faculty: "Dr. Rajesh Patel",
    students: 45,
    status: "active",
    description: "An introductory course covering the fundamentals of computer science including algorithms, programming concepts, and basic data structures.",
    schedule: [
      { day: "Monday", time: "9:00 AM - 10:30 AM", room: "Room 101" },
      { day: "Wednesday", time: "9:00 AM - 10:30 AM", room: "Room 101" }
    ]
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    credits: 4,
    semester: "Fall 2025",
    faculty: "Dr. Neha Sharma",
    students: 38,
    status: "active",
    description: "A comprehensive study of data structures and algorithms, their implementation, and analysis of their efficiency.",
    schedule: [
      { day: "Tuesday", time: "11:00 AM - 12:30 PM", room: "Room 203" },
      { day: "Thursday", time: "11:00 AM - 12:30 PM", room: "Room 203" }
    ]
  },
  {
    id: 3,
    code: "CS301",
    name: "Database Management Systems",
    department: "Information Technology",
    credits: 3,
    semester: "Fall 2025",
    faculty: "Dr. Priya Shah",
    students: 42,
    status: "active",
    description: "Introduction to database concepts, design principles, and implementation of relational database systems.",
    schedule: [
      { day: "Monday", time: "1:00 PM - 2:30 PM", room: "Room 105" },
      { day: "Friday", time: "1:00 PM - 2:30 PM", room: "Room 105" }
    ]
  },
  {
    id: 4,
    code: "EE201",
    name: "Circuit Theory",
    department: "Electrical Engineering",
    credits: 4,
    semester: "Fall 2025",
    faculty: "Prof. Amit Kumar",
    students: 50,
    status: "active",
    description: "Analysis of electrical circuits using various techniques including mesh and nodal analysis, network theorems, and operational amplifiers.",
    schedule: [
      { day: "Tuesday", time: "9:00 AM - 10:30 AM", room: "Room 302" },
      { day: "Thursday", time: "9:00 AM - 10:30 AM", room: "Room 302" }
    ]
  },
  {
    id: 5,
    code: "ME101",
    name: "Engineering Mechanics",
    department: "Mechanical Engineering",
    credits: 4,
    semester: "Fall 2025",
    faculty: "Dr. Sanjay Mehta",
    students: 55,
    status: "active",
    description: "Study of forces and their effects on rigid bodies at rest and in motion, including concepts of statics and dynamics.",
    schedule: [
      { day: "Wednesday", time: "1:00 PM - 2:30 PM", room: "Room 401" },
      { day: "Friday", time: "9:00 AM - 10:30 AM", room: "Room 401" }
    ]
  },
  {
    id: 6,
    code: "CS401",
    name: "Computer Networks",
    department: "Computer Science",
    credits: 3,
    semester: "Spring 2026",
    faculty: "Prof. Neha Sharma",
    students: 35,
    status: "upcoming",
    description: "Introduction to computer networks, network architectures, protocols, and applications.",
    schedule: [
      { day: "Monday", time: "11:00 AM - 12:30 PM", room: "Room 205" },
      { day: "Wednesday", time: "11:00 AM - 12:30 PM", room: "Room 205" }
    ]
  },
  {
    id: 7,
    code: "CE301",
    name: "Structural Engineering",
    department: "Civil Engineering",
    credits: 4,
    semester: "Fall 2025",
    faculty: "Dr. Vikram Singh",
    students: 40,
    status: "active",
    description: "Analysis and design of structural elements including beams, columns, and trusses using various methods and codes.",
    schedule: [
      { day: "Tuesday", time: "1:00 PM - 2:30 PM", room: "Room 305" },
      { day: "Thursday", time: "1:00 PM - 2:30 PM", room: "Room 305" }
    ]
  }
];

// Student enrollment data for the logged-in student
const studentEnrollment = {
  courses: [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      faculty: "Dr. Rajesh Patel",
      progress: 65,
      grade: "B+",
      attendance: 88
    },
    {
      id: 3,
      code: "CS301",
      name: "Database Management Systems",
      faculty: "Dr. Priya Shah",
      progress: 72,
      grade: "A",
      attendance: 92
    },
    {
      id: 4,
      code: "EE201",
      name: "Circuit Theory",
      faculty: "Prof. Amit Kumar",
      progress: 58,
      grade: "B",
      attendance: 78
    }
  ]
};

// Faculty teaching data
const facultyTeaching = {
  courses: [
    {
      id: 2,
      code: "CS201",
      name: "Data Structures and Algorithms",
      students: 38,
      schedule: [
        { day: "Tuesday", time: "11:00 AM - 12:30 PM", room: "Room 203" },
        { day: "Thursday", time: "11:00 AM - 12:30 PM", room: "Room 203" }
      ]
    },
    {
      id: 6,
      code: "CS401",
      name: "Computer Networks",
      students: 35,
      schedule: [
        { day: "Monday", time: "11:00 AM - 12:30 PM", room: "Room 205" },
        { day: "Wednesday", time: "11:00 AM - 12:30 PM", room: "Room 205" }
      ]
    }
  ]
};

// Department options for filtering
const departments = [
  "All Departments",
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics Engineering",
  "Chemical Engineering"
];

const Courses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState(coursesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  
  const isStudent = user?.role === 'student';
  const isFaculty = user?.role === 'faculty';
  const isAdmin = user?.role === 'admin';
  
  // Filter courses based on search and filters
  const getFilteredCourses = () => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
                           
      const matchesDepartment = selectedDepartment === "All Departments" || 
                               course.department === selectedDepartment;
                               
      const matchesSemester = selectedSemester === "All Semesters" ||
                             course.semester === selectedSemester;
                             
      return matchesSearch && matchesDepartment && matchesSemester;
    });
  };

  // Apply filters
  const applyFilters = () => {
    // In a real app, this might fetch data from an API
    // For now, we're just using the filtering function
    toast({
      title: "Filters Applied",
      description: `Showing courses for ${selectedDepartment}, ${selectedSemester}`
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedDepartment("All Departments");
    setSelectedSemester("All Semesters");
    setSearchTerm("");
  };

  // View course details
  const viewCourseDetails = (course: any) => {
    setSelectedCourse(course);
  };

  // Handle add course
  const handleAddCourse = () => {
    toast({
      title: "Course Added",
      description: "New course has been added successfully."
    });
    setShowAddCourseDialog(false);
  };

  // Handle enroll in course (for students)
  const handleEnroll = (courseId: number) => {
    toast({
      title: "Enrollment Request Submitted",
      description: "Your request to enroll in this course has been submitted for approval."
    });
  };

  // Render course content based on user role
  const renderCourseContent = () => {
    if (isStudent) {
      return renderStudentCourses();
    } else if (isFaculty) {
      return renderFacultyCourses();
    } else {
      return renderAllCourses();
    }
  };

  // Render all courses (admin view)
  const renderAllCourses = () => {
    const filteredCourses = getFilteredCourses();
    
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Courses</h2>
          <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Enter the details for the new course.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium">Course Code</label>
                  <Input id="code" placeholder="e.g., CS101" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Course Name</label>
                  <Input id="name" placeholder="Enter course name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">Department</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.filter(d => d !== "All Departments").map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="credits" className="text-sm font-medium">Credits</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Credit</SelectItem>
                      <SelectItem value="2">2 Credits</SelectItem>
                      <SelectItem value="3">3 Credits</SelectItem>
                      <SelectItem value="4">4 Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="semester" className="text-sm font-medium">Semester</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                      <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                      <SelectItem value="Summer 2026">Summer 2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="faculty" className="text-sm font-medium">Faculty</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dr. Rajesh Patel</SelectItem>
                      <SelectItem value="2">Dr. Neha Sharma</SelectItem>
                      <SelectItem value="3">Prof. Amit Kumar</SelectItem>
                      <SelectItem value="4">Dr. Priya Shah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Input id="description" placeholder="Enter course description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddCourseDialog(false)}>Cancel</Button>
                <Button onClick={handleAddCourse}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.faculty}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          course.status === 'active' 
                            ? 'bg-green-50 text-green-700 hover:bg-green-50' 
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-50'
                        }>
                          {course.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => viewCourseDetails(course)}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>{course.code}: {course.name}</DialogTitle>
                              <DialogDescription>Course Details</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Department</span>
                                <span className="font-medium">{course.department}</span>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Credits</span>
                                <span className="font-medium">{course.credits}</span>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Semester</span>
                                <span className="font-medium">{course.semester}</span>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Faculty</span>
                                <span className="font-medium">{course.faculty}</span>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Students</span>
                                <span className="font-medium">{course.students}</span>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="outline" className={
                                  course.status === 'active' 
                                    ? 'bg-green-50 text-green-700 hover:bg-green-50 w-fit' 
                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-50 w-fit'
                                }>
                                  {course.status === 'active' ? 'Active' : 'Upcoming'}
                                </Badge>
                              </div>
                              <div className="flex flex-col space-y-1 col-span-3">
                                <span className="text-sm text-muted-foreground">Description</span>
                                <p>{course.description}</p>
                              </div>
                              <div className="flex flex-col space-y-1 col-span-3">
                                <span className="text-sm text-muted-foreground">Schedule</span>
                                <div className="space-y-1">
                                  {course.schedule.map((item, index) => (
                                    <div key={index} className="flex items-center text-sm">
                                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                      <span>{item.day}: {item.time} at {item.room}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Edit Course</Button>
                              <Button>View Enrollments</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No courses found matching the search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant="outline" className={
                          course.status === 'active' 
                            ? 'bg-green-50 text-green-700 hover:bg-green-50' 
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-50'
                        }>
                          {course.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewCourseDetails(course)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Course</DropdownMenuItem>
                            <DropdownMenuItem>View Enrollments</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="bg-primary/10 p-2 rounded-md mr-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription>{course.code}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.faculty}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.students} Students</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{course.credits} Credits</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" className="w-full" onClick={() => viewCourseDetails(course)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-32">
                  <p className="text-muted-foreground">No courses found matching the search criteria</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  // Render student's enrolled courses
  const renderStudentCourses = () => {
    const enrolledCourses = studentEnrollment.courses;
    
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <p className="text-muted-foreground">Currently enrolled courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-md mr-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{course.faculty}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md bg-muted p-2 text-center">
                      <div className="text-sm font-medium">Grade</div>
                      <div className="text-lg font-bold">{course.grade}</div>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-center">
                      <div className="text-sm font-medium">Attendance</div>
                      <div className="text-lg font-bold">{course.attendance}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="mr-1 h-4 w-4" />
                  Materials
                </Button>
                <Button variant="outline" size="sm">
                  <ListChecks className="mr-1 h-4 w-4" />
                  Assignments
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 mb-6">
          <h2 className="text-xl font-semibold">Available Courses</h2>
          <p className="text-muted-foreground">Courses you can enroll in</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.slice(0, 3).map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.department}</TableCell>
                <TableCell>{course.faculty}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    course.status === 'active' 
                      ? 'bg-green-50 text-green-700 hover:bg-green-50' 
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-50'
                  }>
                    {course.status === 'active' ? 'Active' : 'Upcoming'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };

  // Render faculty's teaching courses
  const renderFacultyCourses = () => {
    const teachingCourses = facultyTeaching.courses;
    
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">My Teaching Schedule</h2>
          <p className="text-muted-foreground">Courses you are currently teaching</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachingCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-md mr-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 h-fit">
                    {course.students} Students
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Schedule:</h4>
                  {course.schedule.map((item, index) => (
                    <div key={index} className="flex items-center text-sm border-l-2 border-primary pl-3">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <span>{item.day}: {item.time} at {item.room}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto grid grid-cols-2 gap-2">
                <Button size="sm">
                  <Users className="mr-1 h-4 w-4" />
                  Students
                </Button>
                <Button size="sm" variant="outline">
                  <ListChecks className="mr-1 h-4 w-4" />
                  Materials
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-medium text-lg">Looking for more courses?</h3>
                <p className="text-muted-foreground">Request to teach additional courses for upcoming semesters</p>
              </div>
              <Button>Request New Course</Button>
            </div>
          </Card>
        </div>
      </>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Browse and manage courses</p>
        </div>
      </div>

      {/* Search and Filters */}
      {(isAdmin || !isStudent && !isFaculty) && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses by name, code or faculty..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium leading-none">Filter Options</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Semester</label>
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Semesters">All Semesters</SelectItem>
                          <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                          <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                          <SelectItem value="Summer 2026">Summer 2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={resetFilters}>Reset</Button>
                      <Button size="sm" onClick={applyFilters}>Apply Filters</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses Content */}
      {renderCourseContent()}
    </div>
  );
};

export default Courses;
