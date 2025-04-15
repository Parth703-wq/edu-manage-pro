
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Bookmark, School } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    phone: "9876543210", // Default values for demo
    department: user?.role === "faculty" ? "Computer Science" : "Information Technology",
    semester: user?.role === "student" ? "6" : "",
    address: "GEC Bharuch, Bharuch, Gujarat",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real application, this would send data to a backend
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 bg-college-purple text-white">
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-500 mt-2">{profileData.department}</p>
              
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline" 
                  className="mt-4 w-full"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      disabled={!isEditing || user?.role === "admin"}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      disabled={true}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Bookmark className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled={true}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed capitalize"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <School className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="department"
                      value={profileData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {user?.role === "student" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester
                    </label>
                    <input
                      type="text"
                      name="semester"
                      value={profileData.semester}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-college-purple focus:ring-college-purple disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
