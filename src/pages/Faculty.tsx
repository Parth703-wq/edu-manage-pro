
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal,
  GraduationCap, 
  BookOpen,
  Calendar,
  Users,
  Mail
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "../hooks/use-toast";

// Sample faculty data
const facultyData = [
  {
    id: 1,
    name: "Dr. Rajesh Patel",
    employeeId: "FAC001",
    department: "Computer Science",
    designation: "Professor",
    email: "rajesh.patel@gecbharuch.ac.in",
    phone: "+91 9876543210",
    courses: ["Data Structures", "Algorithms"],
    joined: "2015-06-15",
    status: "active"
  },
  {
    id: 2,
    name: "Dr. Priya Shah",
    employeeId: "FAC002",
    department: "Information Technology",
    designation: "Associate Professor",
    email: "priya.shah@gecbharuch.ac.in",
    phone: "+91 9876543211",
    courses: ["Database Management", "Web Development"],
    joined: "2016-07-10",
    status: "active"
  },
  {
    id: 3,
    name: "Prof. Amit Kumar",
    employeeId: "FAC003",
    department: "Electrical Engineering",
    designation: "Assistant Professor",
    email: "amit.kumar@gecbharuch.ac.in",
    phone: "+91 9876543212",
    courses: ["Circuit Theory", "Power Systems"],
    joined: "2018-01-20",
    status: "active"
  },
  {
    id: 4,
    name: "Dr. Sanjay Mehta",
    employeeId: "FAC004",
    department: "Mechanical Engineering",
    designation: "Professor",
    email: "sanjay.mehta@gecbharuch.ac.in",
    phone: "+91 9876543213",
    courses: ["Thermodynamics", "Fluid Mechanics"],
    joined: "2014-08-05",
    status: "active"
  },
  {
    id: 5,
    name: "Prof. Neha Sharma",
    employeeId: "FAC005",
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "neha.sharma@gecbharuch.ac.in",
    phone: "+91 9876543214",
    courses: ["Computer Networks", "Operating Systems"],
    joined: "2019-03-12",
    status: "active"
  },
  {
    id: 6,
    name: "Dr. Vikram Singh",
    employeeId: "FAC006",
    department: "Civil Engineering",
    designation: "Associate Professor",
    email: "vikram.singh@gecbharuch.ac.in",
    phone: "+91 9876543215",
    courses: ["Structural Engineering", "Surveying"],
    joined: "2017-11-08",
    status: "on leave"
  },
  {
    id: 7,
    name: "Prof. Anita Desai",
    employeeId: "FAC007",
    department: "Electronics Engineering",
    designation: "Assistant Professor",
    email: "anita.desai@gecbharuch.ac.in",
    phone: "+91 9876543216",
    courses: ["Digital Electronics", "Microprocessors"],
    joined: "2020-02-15",
    status: "active"
  }
];

// Department options
const departments = [
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics Engineering",
  "Chemical Engineering"
];

const Faculty = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
  const [filteredFaculty, setFilteredFaculty] = useState(facultyData);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Filter faculty based on search and department filter
  const applyFilters = () => {
    let filtered = facultyData;
    
    if (searchTerm) {
      filtered = filtered.filter(faculty => 
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDepartment) {
      filtered = filtered.filter(faculty => faculty.department === selectedDepartment);
    }
    
    setFilteredFaculty(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters();
  };

  // Handle department filter change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    applyFilters();
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDepartment(undefined);
    setFilteredFaculty(facultyData);
  };

  // Handle view faculty details
  const viewFacultyDetails = (faculty: any) => {
    setSelectedFaculty(faculty);
  };

  // Handle add faculty
  const handleAddFaculty = () => {
    toast({
      title: "Faculty Added",
      description: "New faculty member has been added successfully.",
    });
    setShowAddDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty members and their details</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Faculty</DialogTitle>
                <DialogDescription>
                  Enter the details of the new faculty member.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="employeeId" className="text-sm font-medium">Employee ID</label>
                  <Input id="employeeId" placeholder="Enter employee ID" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">Department</label>
                  <Select>
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
                  <label htmlFor="designation" className="text-sm font-medium">Designation</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="associate_professor">Associate Professor</SelectItem>
                      <SelectItem value="assistant_professor">Assistant Professor</SelectItem>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={handleAddFaculty}>Add Faculty</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={() => alert('Export faculty data')}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or email..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  {selectedDepartment && <Badge variant="secondary" className="ml-2">{selectedDepartment}</Badge>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none">Filter Options</h4>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
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

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaculty.length > 0 ? (
                      filteredFaculty.map((faculty) => (
                        <TableRow key={faculty.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {faculty.name}
                            </div>
                          </TableCell>
                          <TableCell>{faculty.employeeId}</TableCell>
                          <TableCell>{faculty.department}</TableCell>
                          <TableCell>{faculty.designation}</TableCell>
                          <TableCell>{faculty.email}</TableCell>
                          <TableCell>
                            <Badge variant={faculty.status === 'active' ? 'outline' : 'secondary'} className={
                              faculty.status === 'active' ? 'bg-green-50 text-green-700 hover:bg-green-50' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50'
                            }>
                              {faculty.status === 'active' ? 'Active' : 'On Leave'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => viewFacultyDetails(faculty)}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Faculty Details</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                                  <div className="flex flex-col items-center justify-center md:col-span-1">
                                    <Avatar className="h-24 w-24 mb-4">
                                      <AvatarFallback className="text-2xl">{faculty.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-medium text-lg">{faculty.name}</h3>
                                    <p className="text-sm text-muted-foreground">{faculty.designation}</p>
                                    <Badge variant={faculty.status === 'active' ? 'outline' : 'secondary'} className="mt-2">
                                      {faculty.status === 'active' ? 'Active' : 'On Leave'}
                                    </Badge>
                                  </div>
                                  
                                  <div className="space-y-4 md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm text-muted-foreground">Employee ID</p>
                                        <p className="font-medium">{faculty.employeeId}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Department</p>
                                        <p className="font-medium">{faculty.department}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{faculty.email}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Phone</p>
                                        <p className="font-medium">{faculty.phone}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">Joined</p>
                                        <p className="font-medium">{new Date(faculty.joined).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm text-muted-foreground mb-2">Assigned Courses</p>
                                      <div className="flex flex-wrap gap-2">
                                        {faculty.courses.map((course, index) => (
                                          <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                                            {course}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="flex space-x-2 pt-4">
                                      <Button variant="outline" size="sm" className="flex items-center">
                                        <Mail className="mr-1 h-4 w-4" />
                                        Email
                                      </Button>
                                      <Button variant="outline" size="sm" className="flex items-center">
                                        <Calendar className="mr-1 h-4 w-4" />
                                        Schedule
                                      </Button>
                                      <Button variant="outline" size="sm" className="flex items-center">
                                        <Users className="mr-1 h-4 w-4" />
                                        Students
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No faculty members found matching the search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty) => (
                  <Card key={faculty.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{faculty.name}</CardTitle>
                            <CardDescription>{faculty.designation}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => viewFacultyDetails(faculty)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Assign Courses</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{faculty.department}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{faculty.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{faculty.courses.length} Courses</span>
                        </div>
                        <div className="pt-2">
                          <Badge variant={faculty.status === 'active' ? 'outline' : 'secondary'} className={
                            faculty.status === 'active' ? 'bg-green-50 text-green-700 hover:bg-green-50' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50'
                          }>
                            {faculty.status === 'active' ? 'Active' : 'On Leave'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-32">
                  <p className="text-muted-foreground">No faculty members found matching the search criteria</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Faculty;
