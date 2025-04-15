
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  Search,
  Plus,
  Send,
  MessageSquare,
  Users,
  User,
  Filter,
  Trash2,
  Clock,
  Edit,
  Star,
  StarOff,
  MoreVertical
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/use-toast";

// Sample messages data
const messagesData = [
  {
    id: 1,
    sender: "Dr. Rajesh Patel",
    senderId: 101,
    role: "faculty",
    avatar: null,
    recipients: ["All Students", "All Faculty"],
    subject: "Change in Mid-Semester Examination Schedule",
    message: "Dear all, This is to inform you that the Mid-Semester Examination for all courses has been rescheduled. The new dates will be announced soon. Please stay tuned for further updates.",
    timestamp: "2025-04-14T10:30:00",
    unread: true,
    important: true
  },
  {
    id: 2,
    sender: "Admin Office",
    senderId: 102,
    role: "admin",
    avatar: null,
    recipients: ["All Students", "All Faculty"],
    subject: "Campus Maintenance Notice",
    message: "The college campus will undergo maintenance work this weekend. The library and computer labs will remain closed on Saturday and Sunday. Regular activities will resume on Monday.",
    timestamp: "2025-04-13T16:45:00",
    unread: false,
    important: false
  },
  {
    id: 3,
    sender: "Prof. Amit Kumar",
    senderId: 103,
    role: "faculty",
    avatar: null,
    recipients: ["19BCE-A", "19BCE-B"],
    subject: "Assignment Submission Deadline",
    message: "Dear students, This is a reminder that the deadline for submitting the Circuit Theory assignment is approaching. Please ensure that you submit your work by April 20th, 2025.",
    timestamp: "2025-04-12T08:15:00",
    unread: false,
    important: true
  },
  {
    id: 4,
    sender: "Prof. Neha Sharma",
    senderId: 104,
    role: "faculty",
    avatar: null,
    recipients: ["John Student"],
    subject: "Project Feedback",
    message: "Hi John, I've reviewed your project proposal and have some feedback for you. Overall, it's good but needs some minor adjustments. Let's discuss this during our next class.",
    timestamp: "2025-04-11T14:20:00",
    unread: true,
    important: false
  },
  {
    id: 5,
    sender: "Student Council",
    senderId: 105,
    role: "student",
    avatar: null,
    recipients: ["All Students"],
    subject: "Annual Cultural Festival",
    message: "Dear Students, The annual cultural festival 'Horizon 2025' is scheduled for May 15-17, 2025. Various events including music, dance, and literary competitions will be organized. Registration for participation will begin next week.",
    timestamp: "2025-04-10T11:00:00",
    unread: false,
    important: false
  }
];

// Categories for message filtering
const categories = [
  {
    id: "inbox",
    name: "Inbox",
    icon: MessageSquare
  },
  {
    id: "sent",
    name: "Sent",
    icon: Send
  },
  {
    id: "important",
    name: "Important",
    icon: Star
  },
  {
    id: "trash",
    name: "Trash",
    icon: Trash2
  }
];

// Recipients list for new messages
const recipientOptions = [
  { value: "all", label: "All Users" },
  { value: "all_students", label: "All Students" },
  { value: "all_faculty", label: "All Faculty" },
  { value: "19BCE-A", label: "19BCE-A" },
  { value: "19BCE-B", label: "19BCE-B" },
  { value: "20BCE-A", label: "20BCE-A" },
  { value: "Dr. Rajesh Patel", label: "Dr. Rajesh Patel (Faculty)" },
  { value: "Prof. Neha Sharma", label: "Prof. Neha Sharma (Faculty)" },
  { value: "John Student", label: "John Student (Student)" }
];

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [activeCategory, setActiveCategory] = useState("inbox");
  const [messages, setMessages] = useState(messagesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipients: [],
    subject: "",
    message: ""
  });

  // Filter messages based on category and search term
  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchTerm === "" || 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeCategory === "inbox") {
      return matchesSearch;
    } else if (activeCategory === "sent") {
      // In a real app, we would check if the current user is the sender
      return matchesSearch && message.sender === user?.name;
    } else if (activeCategory === "important") {
      return matchesSearch && message.important;
    } else if (activeCategory === "trash") {
      // In a real app, we would have a "deleted" flag
      return false;
    }
    
    return matchesSearch;
  });

  // Format timestamp to readable string
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle selecting a message
  const handleSelectMessage = (message: any) => {
    setSelectedMessage(message);
    
    // Mark as read if unread
    if (message.unread) {
      const updatedMessages = messages.map(msg => 
        msg.id === message.id ? { ...msg, unread: false } : msg
      );
      setMessages(updatedMessages);
    }
  };

  // Toggle important flag for a message
  const toggleImportant = (messageId: number) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, important: !msg.important } : msg
    );
    setMessages(updatedMessages);
    
    const message = messages.find(msg => msg.id === messageId);
    toast({
      title: message?.important ? "Removed from important" : "Marked as important",
      description: `"${message?.subject}" has been ${message?.important ? "removed from" : "added to"} your important messages.`
    });
  };

  // Delete a message
  const deleteMessage = (messageId: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    setSelectedMessage(null);
    
    toast({
      title: "Message deleted",
      description: "The message has been moved to trash."
    });
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.subject.trim() === "" || newMessage.message.trim() === "" || newMessage.recipients.length === 0) {
      toast({
        title: "Cannot send message",
        description: "Please fill in all fields before sending.",
        variant: "destructive"
      });
      return;
    }
    
    const newMsg = {
      id: messages.length + 1,
      sender: user?.name || "Unknown User",
      senderId: parseInt(user?.id || "0"),
      role: user?.role || "student",
      avatar: null,
      recipients: newMessage.recipients,
      subject: newMessage.subject,
      message: newMessage.message,
      timestamp: new Date().toISOString(),
      unread: false,
      important: false
    };
    
    setMessages([newMsg, ...messages]);
    setComposeOpen(false);
    setNewMessage({
      recipients: [],
      subject: "",
      message: ""
    });
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with students and faculty</p>
        </div>
        
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Compose
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>Compose and send a new message</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="recipients" className="text-sm font-medium">Recipients</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipientOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="Enter message subject" 
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your message" 
                  rows={6}
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setComposeOpen(false)}>Cancel</Button>
              <Button onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-2">
              <nav>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Button 
                        variant={activeCategory === category.id ? "secondary" : "ghost"}
                        className={`w-full justify-start ${activeCategory === category.id ? 'bg-secondary' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <category.icon className="mr-2 h-4 w-4" />
                        {category.name}
                        {category.id === "inbox" && (
                          <Badge className="ml-auto">{messages.filter(msg => msg.unread).length}</Badge>
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Message List and Content */}
        <div className="col-span-1 lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[600px]">
                {/* Message List */}
                <div className={`col-span-1 ${selectedMessage ? 'hidden md:block' : ''} border-r`}>
                  <div className="p-4 border-b">
                    <h3 className="font-medium">{categories.find(c => c.id === activeCategory)?.name}</h3>
                  </div>
                  <ScrollArea className="h-[calc(600px-57px)]">
                    {filteredMessages.length > 0 ? (
                      <ul>
                        {filteredMessages.map((message) => (
                          <li 
                            key={message.id}
                            className={`border-b last:border-b-0 hover:bg-muted/50 cursor-pointer ${
                              selectedMessage?.id === message.id ? 'bg-muted/50' : ''
                            } ${message.unread ? 'bg-blue-50/50' : ''}`}
                            onClick={() => handleSelectMessage(message)}
                          >
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className={`font-medium ${message.unread ? 'font-semibold' : ''}`}>
                                    {message.sender}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(message.timestamp)}
                                  </span>
                                  {message.important && (
                                    <Star className="ml-1 h-4 w-4 text-yellow-500" />
                                  )}
                                </div>
                              </div>
                              <h4 className={`text-sm mb-1 ${message.unread ? 'font-semibold' : ''}`}>
                                {message.subject}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {message.message}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground text-center">No messages found</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>

                {/* Message Content */}
                <div className={`col-span-1 lg:col-span-2 ${selectedMessage ? 'block' : 'hidden md:block'}`}>
                  {selectedMessage ? (
                    <div className="h-full flex flex-col">
                      <div className="p-4 border-b flex justify-between items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="md:hidden"
                          onClick={() => setSelectedMessage(null)}
                        >
                          Back
                        </Button>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleImportant(selectedMessage.id)}
                          >
                            {selectedMessage.important ? (
                              <StarOff className="h-4 w-4" />
                            ) : (
                              <Star className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => deleteMessage(selectedMessage.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <ScrollArea className="flex-grow">
                        <div className="p-6">
                          <h2 className="text-xl font-semibold mb-1">{selectedMessage.subject}</h2>
                          <div className="flex items-center mb-4">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>{selectedMessage.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{selectedMessage.sender}</div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {new Date(selectedMessage.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">
                            To: {selectedMessage.recipients.join(", ")}
                          </div>
                          <Separator className="my-4" />
                          <div className="prose max-w-none">
                            <p>{selectedMessage.message}</p>
                          </div>
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <Button>
                          <Send className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No message selected</h3>
                      <p className="text-muted-foreground text-center mb-6">
                        Select a message from the list to view its contents
                      </p>
                      <Button onClick={() => setComposeOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Compose New Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
