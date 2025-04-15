
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Announcements from "./pages/Announcements";
import Timetable from "./pages/Timetable";
import Fees from "./pages/Fees";
import Examinations from "./pages/Examinations";
import Attendance from "./pages/Attendance";
import Courses from "./pages/Courses";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="/students" element={
                <ProtectedRoute allowedRoles={['admin', 'faculty']}>
                  <Students />
                </ProtectedRoute>
              } />
              
              <Route path="/faculty" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Faculty />
                </ProtectedRoute>
              } />

              <Route path="/courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />

              <Route path="/announcements" element={
                <ProtectedRoute>
                  <Announcements />
                </ProtectedRoute>
              } />
              
              <Route path="/timetable" element={
                <ProtectedRoute>
                  <Timetable />
                </ProtectedRoute>
              } />
              
              <Route path="/fees" element={
                <ProtectedRoute>
                  <Fees />
                </ProtectedRoute>
              } />
              
              <Route path="/examinations" element={
                <ProtectedRoute>
                  <Examinations />
                </ProtectedRoute>
              } />
              
              <Route path="/attendance" element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              } />
              
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
