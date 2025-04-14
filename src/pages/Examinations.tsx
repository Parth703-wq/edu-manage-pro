
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Calendar, Award, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Examinations = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('schedule');
  
  // Sample exam schedule data
  const examSchedule = [
    { id: 'EX001', subject: 'Engineering Mathematics', date: '2024-05-10', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall A', type: 'Mid Semester' },
    { id: 'EX002', subject: 'Computer Programming', date: '2024-05-12', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall B', type: 'Mid Semester' },
    { id: 'EX003', subject: 'Electronic Devices', date: '2024-05-14', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall A', type: 'Mid Semester' },
    { id: 'EX004', subject: 'Digital Systems', date: '2024-05-16', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall C', type: 'Mid Semester' },
    { id: 'EX005', subject: 'Engineering Physics', date: '2024-05-18', time: '10:00 AM - 1:00 PM', venue: 'Exam Hall A', type: 'Mid Semester' },
  ];
  
  // Sample exam results data
  const examResults = [
    { 
      subject: 'Engineering Mathematics', 
      credits: 4,
      components: [
        { name: 'Mid Semester', max: 30, obtained: 24 },
        { name: 'End Semester', max: 70, obtained: 59 },
      ],
      total: { max: 100, obtained: 83 },
      grade: 'A',
      status: 'Passed'
    },
    { 
      subject: 'Computer Programming', 
      credits: 4,
      components: [
        { name: 'Mid Semester', max: 30, obtained: 26 },
        { name: 'End Semester', max: 70, obtained: 61 },
      ],
      total: { max: 100, obtained: 87 },
      grade: 'A',
      status: 'Passed'
    },
    { 
      subject: 'Electronic Devices', 
      credits: 3,
      components: [
        { name: 'Mid Semester', max: 30, obtained: 22 },
        { name: 'End Semester', max: 70, obtained: 53 },
      ],
      total: { max: 100, obtained: 75 },
      grade: 'B',
      status: 'Passed'
    },
    { 
      subject: 'Digital Systems', 
      credits: 3,
      components: [
        { name: 'Mid Semester', max: 30, obtained: 20 },
        { name: 'End Semester', max: 70, obtained: 49 },
      ],
      total: { max: 100, obtained: 69 },
      grade: 'C',
      status: 'Passed'
    },
    { 
      subject: 'Engineering Physics', 
      credits: 4,
      components: [
        { name: 'Mid Semester', max: 30, obtained: 19 },
        { name: 'End Semester', max: 70, obtained: 52 },
      ],
      total: { max: 100, obtained: 71 },
      grade: 'B',
      status: 'Passed'
    },
  ];
  
  // Sample past papers data
  const pastPapers = [
    { id: 'PP001', subject: 'Engineering Mathematics', year: '2023', type: 'Mid Semester', link: '#' },
    { id: 'PP002', subject: 'Engineering Mathematics', year: '2023', type: 'End Semester', link: '#' },
    { id: 'PP003', subject: 'Computer Programming', year: '2023', type: 'Mid Semester', link: '#' },
    { id: 'PP004', subject: 'Computer Programming', year: '2023', type: 'End Semester', link: '#' },
    { id: 'PP005', subject: 'Electronic Devices', year: '2023', type: 'Mid Semester', link: '#' },
    { id: 'PP006', subject: 'Electronic Devices', year: '2023', type: 'End Semester', link: '#' },
  ];
  
  // Calculate GPA from results
  const calculateGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    const gradePoints = {
      'A+': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0
    };
    
    examResults.forEach(result => {
      totalCredits += result.credits;
      totalGradePoints += result.credits * gradePoints[result.grade];
    });
    
    return (totalGradePoints / totalCredits).toFixed(2);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="page-title">Examinations</h1>
      
      <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="resources">Exam Resources</TabsTrigger>
        </TabsList>
        
        {/* Exam Schedule Tab */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Examinations</CardTitle>
              <CardDescription>Schedule for the mid-semester examinations (May 2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Exam Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examSchedule.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell>{exam.venue}</TableCell>
                        <TableCell>{exam.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>All students must arrive 30 minutes before the examination time.</span>
            </CardFooter>
          </Card>
          
          {/* Important Instructions Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Important Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p>Students must carry their college ID card to the examination hall.</p>
              </div>
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p>Mobile phones and electronic devices are strictly prohibited.</p>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                <p>No student will be allowed to enter the examination hall 15 minutes after the commencement of the examination.</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <p>Students are advised to bring their own stationery as sharing is not permitted during the examination.</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <p>For any queries regarding the examination schedule, please contact the examination department.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Results Tab */}
        <TabsContent value="results">
          {user?.role === 'student' && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Semester Results</CardTitle>
                  <CardDescription>Previous Semester Examination Results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Mid Term</TableHead>
                          <TableHead>End Term</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {examResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{result.subject}</TableCell>
                            <TableCell>{result.credits}</TableCell>
                            <TableCell>{result.components[0].obtained}/{result.components[0].max}</TableCell>
                            <TableCell>{result.components[1].obtained}/{result.components[1].max}</TableCell>
                            <TableCell className="font-semibold">{result.total.obtained}/{result.total.max}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary font-bold">
                                {result.grade}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                result.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {result.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-college-purple" />
                    <span className="font-semibold">GPA: {calculateGPA()}</span>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Your grades across subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-full max-w-md mb-4 mt-2">
                      {/* This would be replaced with a chart component in a real implementation */}
                      <div className="bg-gray-100 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">Grade chart visualization would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Standing</CardTitle>
                    <CardDescription>Your current academic progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Current GPA</span>
                        <span className="font-bold">{calculateGPA()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-college-purple h-2.5 rounded-full" style={{ width: `${(parseFloat(calculateGPA()) / 10) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0.0</span>
                        <span>5.0</span>
                        <span>10.0</span>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium mb-2">Academic Summary</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Credits Earned:</span>
                            <span className="font-semibold">18</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Credits Required:</span>
                            <span className="font-semibold">180</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Standing:</span>
                            <span className="font-semibold text-green-600">Good</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Semester:</span>
                            <span className="font-semibold">1st</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          
          {user?.role === 'faculty' && (
            <Card>
              <CardHeader>
                <CardTitle>Result Management</CardTitle>
                <CardDescription>Tools for managing and uploading examination results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Faculty Result Management Portal</h3>
                  <p className="mb-4 text-muted-foreground">Use the faculty portal to upload and manage student examination results.</p>
                  <button className="bg-primary text-white px-4 py-2 rounded-md">Access Result Portal</button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {user?.role === 'admin' && (
            <Card>
              <CardHeader>
                <CardTitle>Examination Administration</CardTitle>
                <CardDescription>Administrative tools for managing the examination process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Administrative Functions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Result Publication</h4>
                      <p className="text-sm text-gray-600 mb-4">Manage result publication and notifications</p>
                      <button className="bg-primary text-white px-3 py-1 rounded-md text-sm">Manage Results</button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Exam Scheduling</h4>
                      <p className="text-sm text-gray-600 mb-4">Create and update examination schedules</p>
                      <button className="bg-primary text-white px-3 py-1 rounded-md text-sm">Schedule Exams</button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Result Analysis</h4>
                      <p className="text-sm text-gray-600 mb-4">View performance analytics and reports</p>
                      <button className="bg-primary text-white px-3 py-1 rounded-md text-sm">View Reports</button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Grade Moderation</h4>
                      <p className="text-sm text-gray-600 mb-4">Moderate and finalize grades</p>
                      <button className="bg-primary text-white px-3 py-1 rounded-md text-sm">Moderate Grades</button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Past Question Papers</CardTitle>
              <CardDescription>Access previous years' examination papers for reference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Exam Type</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPapers.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell className="font-medium">{paper.subject}</TableCell>
                        <TableCell>{paper.year}</TableCell>
                        <TableCell>{paper.type}</TableCell>
                        <TableCell className="text-right">
                          <a 
                            href={paper.link} 
                            className="inline-flex items-center px-3 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>Resources to help you prepare for examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>Engineering Mathematics - Formula Sheet</span>
                    </span>
                    <a href="#" className="text-primary text-sm hover:underline">Download</a>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>Computer Programming - Sample Programs</span>
                    </span>
                    <a href="#" className="text-primary text-sm hover:underline">Download</a>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>Electronic Devices - Circuit Diagrams</span>
                    </span>
                    <a href="#" className="text-primary text-sm hover:underline">Download</a>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>Digital Systems - Logic Gates Reference</span>
                    </span>
                    <a href="#" className="text-primary text-sm hover:underline">Download</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Exam Guidelines</CardTitle>
                <CardDescription>Important information for examination candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-1">Examination Rules and Regulations</h4>
                    <p className="text-sm text-gray-600">Complete guide to examination procedures and policies</p>
                    <a href="#" className="text-primary text-sm flex items-center mt-2">
                      <FileText className="h-4 w-4 mr-1" />
                      Download PDF
                    </a>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-1">Grading System</h4>
                    <p className="text-sm text-gray-600">Understanding the college's grading policy</p>
                    <a href="#" className="text-primary text-sm flex items-center mt-2">
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </a>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-1">Examination Schedule Template</h4>
                    <p className="text-sm text-gray-600">Calendar format for planning your exam preparation</p>
                    <a href="#" className="text-primary text-sm flex items-center mt-2">
                      <FileText className="h-4 w-4 mr-1" />
                      Download Template
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Examinations;
