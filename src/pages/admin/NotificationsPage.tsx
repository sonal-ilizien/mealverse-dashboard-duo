
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2 } from "lucide-react";

// Sample notifications data
const initialNotifications = [
  {
    id: "1",
    type: "alert",
    title: "System Maintenance",
    message: "Scheduled maintenance in 2 hours. The system will be unavailable for approximately 30 minutes.",
    timestamp: "1 hour ago",
    read: false
  },
  {
    id: "2",
    type: "report",
    title: "New Report Received",
    message: "A new report has been filed for the meal 'Seafood Paella'.",
    timestamp: "3 hours ago",
    read: false
  },
  {
    id: "3",
    type: "user",
    title: "New Cook Registration",
    message: "Chef Robert Smith has joined the platform and is awaiting approval.",
    timestamp: "5 hours ago",
    read: true
  },
  {
    id: "4",
    type: "alert",
    title: "High User Traffic",
    message: "The platform is experiencing unusually high traffic. Performance may be affected.",
    timestamp: "Yesterday",
    read: true
  },
  {
    id: "5",
    type: "report",
    title: "Resolved Report",
    message: "The report for Order #34567 has been resolved by Admin User.",
    timestamp: "Yesterday",
    read: true
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread" 
      ? notifications.filter(notif => !notif.read)
      : notifications.filter(notif => notif.type === activeTab);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell className="h-5 w-5 text-red-500" />;
      case "report":
        return <Bell className="h-5 w-5 text-amber-500" />;
      case "user":
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              All
              <Badge className="ml-2 bg-blue-500">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="report">Reports</TabsTrigger>
            <TabsTrigger value="user">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start p-4 border rounded-md ${notification.read ? 'bg-background' : 'bg-blue-50'}`}
                  >
                    <div className="mr-4 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No notifications found.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default NotificationsPage;
