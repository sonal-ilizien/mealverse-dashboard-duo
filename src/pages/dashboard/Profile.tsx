
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { PencilIcon, Camera, Upload, Check, ChefHat } from "lucide-react";

// Mock cook profile data
const mockProfileData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Passionate home cook with over 10 years of experience in Italian and Mediterranean cuisine. I love creating dishes that bring people together and share the joy of homemade meals.",
  address: "123 Culinary Lane, Foodville, CA 94123",
  profileImage: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  kitchenImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
  idVerified: true,
  hygieneVerified: true,
};

export default function Profile() {
  const [profile, setProfile] = useState(mockProfileData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(mockProfileData);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
    toast.success("Profile updated successfully!");
  };
  
  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };
  
  const handleProfileImage = () => {
    // In a real app, this would open a file picker
    toast.info("Profile image upload functionality would open here");
  };
  
  const handleKitchenImage = () => {
    // In a real app, this would open a file picker
    toast.info("Kitchen image upload functionality would open here");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!editing && (
          <Button 
            onClick={() => setEditing(true)} 
            variant="outline"
            className="gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </section>
      
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-32 w-32 border-2 border-orange-300">
                  <img src={profile.profileImage} alt={profile.name} className="object-cover" />
                </Avatar>
                {editing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600"
                    onClick={handleProfileImage}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="mt-4 flex flex-col items-center">
                <Badge className="bg-green-100 text-green-800 px-3 py-1">
                  <ChefHat className="h-4 w-4 mr-1" />
                  Certified Cook
                </Badge>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    readOnly={!editing}
                    className={!editing ? "bg-muted cursor-default" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!editing}
                    className={!editing ? "bg-muted cursor-default" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!editing}
                    className={!editing ? "bg-muted cursor-default" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    readOnly={!editing}
                    className={!editing ? "bg-muted cursor-default" : ""}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  readOnly={!editing}
                  className={!editing ? "bg-muted cursor-default" : ""}
                  rows={4}
                />
              </div>
              
              {editing && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Kitchen Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kitchen Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden h-60">
              <img
                src={profile.kitchenImage}
                alt="Kitchen"
                className="w-full h-full object-cover"
              />
              {editing && (
                <Button
                  className="absolute bottom-4 right-4 gap-2 bg-white/80 text-gray-800 hover:bg-white"
                  onClick={handleKitchenImage}
                >
                  <Camera className="h-4 w-4" />
                  Update Photo
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Upload clear photos of your kitchen. This helps customers trust your food preparation environment.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">ID Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a government-issued ID for verification
                </p>
              </div>
              <div className="flex items-center gap-2">
                {profile.idVerified ? (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload ID
                  </Button>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Food Hygiene Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your food hygiene certification
                </p>
              </div>
              <div className="flex items-center gap-2">
                {profile.hygieneVerified ? (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Certificate
                  </Button>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for new orders
                </p>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
