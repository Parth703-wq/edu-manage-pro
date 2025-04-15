
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { BadgeIndianRupee, FileText, CreditCard, Calendar, CheckCircle, AlertCircle, Download, Send } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

const Fees = () => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState('2023-24');
  const [activeAdminTab, setActiveAdminTab] = useState('overview');
  
  // Sample fee structure data
  const feeStructure = {
    '2023-24': {
      tuitionFee: 85000,
      developmentFee: 15000,
      examFee: 5000,
      libraryFee: 3000,
      computerLabFee: 8000,
      sportsFee: 2000,
      miscellaneous: 2000,
      total: 120000
    }
  };
  
  // Sample payment history
  const paymentHistory = [
    { id: 'INV2023001', date: '2023-06-15', amount: 60000, type: 'Online Payment', status: 'Paid', receipt: 'REC230615' },
    { id: 'INV2023002', date: '2023-11-20', amount: 60000, type: 'Online Payment', status: 'Paid', receipt: 'REC231120' },
  ];
  
  // Sample upcoming dues
  const upcomingDues = [
    { id: 'UD2024001', dueDate: '2024-05-15', description: 'First Installment (2024-25)', amount: 65000 },
  ];

  // Sample fee collection statistics
  const feeStats = {
    totalCollected: 12500000,
    pendingAmount: 3500000,
    totalStudents: 1254,
    paidStudents: 952,
    pendingStudents: 302
  };

  // Sample department-wise fee collection
  const departmentStats = [
    { department: 'Computer Science', collected: 4500000, pending: 850000, students: 450 },
    { department: 'Electrical Engineering', collected: 3200000, pending: 950000, students: 320 },
    { department: 'Mechanical Engineering', collected: 2800000, pending: 680000, students: 280 },
    { department: 'Civil Engineering', collected: 2000000, pending: 1020000, students: 204 }
  ];
  
  // Calculate total paid and balance
  const totalFee = feeStructure[selectedYear]?.total || 0;
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const balance = totalFee - totalPaid;

  const renderAdminContent = () => {
    switch(activeAdminTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <BadgeIndianRupee className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Collected</p>
                      <h3 className="text-2xl font-bold">₹{feeStats.totalCollected.toLocaleString()}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Amount</p>
                      <h3 className="text-2xl font-bold">₹{feeStats.pendingAmount.toLocaleString()}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Students Paid</p>
                      <h3 className="text-2xl font-bold">{feeStats.paidStudents}/{feeStats.totalStudents}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Department Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Fee Collection</CardTitle>
                <CardDescription>Overview of fees collected by department</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Collected (₹)</TableHead>
                      <TableHead>Pending (₹)</TableHead>
                      <TableHead>Collection Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentStats.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.students}</TableCell>
                        <TableCell>{dept.collected.toLocaleString()}</TableCell>
                        <TableCell>{dept.pending.toLocaleString()}</TableCell>
                        <TableCell>
                          {Math.round((dept.collected / (dept.collected + dept.pending)) * 100)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'feeStructure':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure Management</CardTitle>
              <CardDescription>Configure fee structures for different academic years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <select 
                    className="px-3 py-2 border rounded-md"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2023-24">Academic Year 2023-24</option>
                    <option value="2024-25">Academic Year 2024-25</option>
                  </select>
                  <Button variant="outline">Edit Structure</Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Component</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tuition Fee</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.tuitionFee?.toLocaleString()}</TableCell>
                      <TableCell>Basic tuition fee for education</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Development Fee</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.developmentFee?.toLocaleString()}</TableCell>
                      <TableCell>For infrastructure development</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Examination Fee</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.examFee?.toLocaleString()}</TableCell>
                      <TableCell>For conducting exams and assessments</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Library Fee</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.libraryFee?.toLocaleString()}</TableCell>
                      <TableCell>For library resources and maintenance</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Computer Lab Fee</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.computerLabFee?.toLocaleString()}</TableCell>
                      <TableCell>For computer labs and IT infrastructure</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sports & Cultural Fee</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.sportsFee?.toLocaleString()}</TableCell>
                      <TableCell>For sports facilities and cultural events</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Miscellaneous</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.miscellaneous?.toLocaleString()}</TableCell>
                      <TableCell>Other institutional expenses</TableCell>
                    </TableRow>
                    <TableRow className="font-bold bg-gray-50">
                      <TableCell>Total</TableCell>
                      <TableCell>{feeStructure[selectedYear]?.total?.toLocaleString()}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 'reports':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Fee Reports</CardTitle>
              <CardDescription>Generate and download fee collection reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Report Type</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple">
                      <option>Collection Summary</option>
                      <option>Department Wise</option>
                      <option>Outstanding Dues</option>
                      <option>Refunds</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple">
                      <option>Last 30 days</option>
                      <option>Last Quarter</option>
                      <option>Current Semester</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Format</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button>Generate Report</Button>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-3">Recent Reports</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div>
                        <span className="font-medium">Collection Summary - March 2024</span>
                        <p className="text-sm text-gray-500">Generated on Apr 02, 2024</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div>
                        <span className="font-medium">Outstanding Dues - Winter Semester</span>
                        <p className="text-sm text-gray-500">Generated on Mar 15, 2024</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment Notifications</CardTitle>
              <CardDescription>Send reminders to students with pending dues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Recipients</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple">
                      <option>All Students with Pending Dues</option>
                      <option>Computer Science Department</option>
                      <option>Electrical Engineering Department</option>
                      <option>Mechanical Engineering Department</option>
                      <option>Civil Engineering Department</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Notification Type</label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple">
                      <option>Email</option>
                      <option>SMS</option>
                      <option>Both</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message Template</label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple mb-2">
                    <option>General Payment Reminder</option>
                    <option>Urgent Payment Notice</option>
                    <option>Fee Deadline Extension</option>
                    <option>Custom Message</option>
                  </select>
                  
                  <textarea 
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple h-32"
                    defaultValue="Dear [STUDENT_NAME], This is a reminder that your fee payment of ₹[AMOUNT] for [SEMESTER] is due on [DUE_DATE]. Please make the payment as soon as possible to avoid late fees. Regards, Finance Department, GEC Bharuch"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Preview</Button>
                  <Button>Send Notifications</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return <div>Select a tab to view content</div>;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="page-title">Fees Management</h1>
      
      {user?.role === 'student' && (
        <>
          {/* Fee Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BadgeIndianRupee className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Fee</p>
                    <h3 className="text-2xl font-bold">₹{totalFee.toLocaleString()}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paid Amount</p>
                    <h3 className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance Due</p>
                    <h3 className="text-2xl font-bold">₹{balance.toLocaleString()}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Fee Structure */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Fee Structure (Academic Year {selectedYear})</CardTitle>
              <CardDescription>Breakdown of fees applicable for the current academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Tuition Fee</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.tuitionFee?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Development Fee</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.developmentFee?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Examination Fee</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.examFee?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Library Fee</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.libraryFee?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Computer Lab Fee</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.computerLabFee?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sports & Cultural Activities</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.sportsFee?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Miscellaneous Fee</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.miscellaneous?.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow className="font-bold bg-gray-50">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{feeStructure[selectedYear]?.total?.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Payment History */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of past fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount (₹)</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <a href="#" className="text-primary flex items-center justify-end">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Upcoming Dues */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Dues</CardTitle>
              <CardDescription>Fee amounts due for payment</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingDues.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingDues.map((due) => (
                      <TableRow key={due.id}>
                        <TableCell>{due.dueDate}</TableCell>
                        <TableCell>{due.description}</TableCell>
                        <TableCell>{due.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <button className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center ml-auto">
                            <CreditCard className="h-4 w-4 mr-1" />
                            Pay Now
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No upcoming dues at this time.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-muted/50 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Late payment fees apply after the due date.</span>
            </CardFooter>
          </Card>
        </>
      )}
      
      {user?.role === 'admin' && (
        <div>
          <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-wrap gap-2">
            <Button 
              variant={activeAdminTab === 'overview' ? 'default' : 'outline'} 
              onClick={() => setActiveAdminTab('overview')}
              className="flex items-center"
            >
              Overview
            </Button>
            <Button 
              variant={activeAdminTab === 'feeStructure' ? 'default' : 'outline'} 
              onClick={() => setActiveAdminTab('feeStructure')}
              className="flex items-center"
            >
              Fee Structure
            </Button>
            <Button 
              variant={activeAdminTab === 'reports' ? 'default' : 'outline'} 
              onClick={() => setActiveAdminTab('reports')}
              className="flex items-center"
            >
              Reports
            </Button>
            <Button 
              variant={activeAdminTab === 'notifications' ? 'default' : 'outline'} 
              onClick={() => setActiveAdminTab('notifications')}
              className="flex items-center"
            >
              Notifications
            </Button>
          </div>
          
          {renderAdminContent()}
        </div>
      )}
      
      {user?.role === 'faculty' && (
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Fee Information</h2>
            <p>Faculty members do not have access to fee management. Please contact the accounts department for any fee-related queries.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Fees;
