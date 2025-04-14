
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DollarSign, FileText, CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Fees = () => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState('2023-24');
  
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
  
  // Calculate total paid and balance
  const totalFee = feeStructure[selectedYear]?.total || 0;
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const balance = totalFee - totalPaid;
  
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
                    <DollarSign className="h-6 w-6 text-primary" />
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
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Fee Management Tools</h2>
            <p className="mb-4">As an administrator, you can access the fee management dashboard to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>View fee status for all students</li>
              <li>Generate fee reports by department or batch</li>
              <li>Send payment reminders</li>
              <li>Update fee structures</li>
              <li>Process refunds or adjustments</li>
            </ul>
          </CardContent>
        </Card>
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
