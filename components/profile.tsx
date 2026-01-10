"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
    Mail, 
    Phone, 
    Calendar, 
    Shield, 
    BookOpen, 
    Clock, 
    Settings, 
    LogOut, 
    Camera,
    User as UserIcon,
    MapPin,
    AlertCircle
} from "lucide-react"

export default function ProfileComponent() {
    const { user, signOut } = useAuthStore()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <UserIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Please sign in</h2>
                <p className="text-gray-500 mt-2 mb-6 max-w-sm">
                    You need to be logged in to view and manage your profile settings.
                </p>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => router.push("/")}>Go Home</Button>
                    <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
                </div>
            </div>
        )
    }

    const handleLogout = () => {
        signOut()
        router.push("/")
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header / Hero Section */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="container mx-auto px-4 h-full relative z-10 flex items-end pb-8 md:pb-0 translate-y-[50%] md:translate-y-[40%]">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
                        {/* Avatar */}
                        <div className="relative group">
                            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-xl">
                                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                                <AvatarFallback className="text-4xl font-bold bg-blue-100 text-blue-600">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg group-hover:scale-110">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Name & Role */}
                        <div className="flex-1 text-center md:text-left mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 md:text-white py-1">{user.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1 md:text-blue-100">
                                <Badge variant="secondary" className="gap-1 bg-white/20 hover:bg-white/30 text-black md:text-white border-none backdrop-blur-sm">
                                    <Shield className="w-3 h-3" />
                                    Student
                                </Badge>
                                {user.isVerified && (
                                    <Badge className="bg-green-500 hover:bg-green-600">Verified Account</Badge>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-4 md:mt-0 mb-4 ">
                            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-black md:text-white backdrop-blur-sm" onClick={() => setIsEditing(!isEditing)}>
                                <Settings className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button variant="destructive" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-48 md:pt-32">
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px] h-11 p-1 bg-white border shadow-sm rounded-xl">
                        <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                        <TabsTrigger value="courses" className="rounded-lg">My Courses</TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-lg">Settings</TabsTrigger>
                    </TabsList>

                    <Separator />

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Personal Info Card */}
                            <Card className="col-span-2 shadow-sm border-gray-100">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Your contact details and public profile information.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Full Name</Label>
                                            <div className="font-medium flex items-center gap-2">
                                                <UserIcon className="w-4 h-4 text-gray-400" />
                                                {user.name}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Email Address</Label>
                                            <div className="font-medium flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {user.email}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Phone Number</Label>
                                            <div className="font-medium flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                {user.phone}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Location</Label>
                                            <div className="font-medium flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                Addis Ababa, Ethiopia
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Member Since</Label>
                                            <div className="font-medium flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Last Active</Label>
                                            <div className="font-medium flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                Just now
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats Card */}
                            <Card className="shadow-sm border-gray-100 h-fit">
                                <CardHeader>
                                    <CardTitle>Learning Stats</CardTitle>
                                    <CardDescription>Your progress at a glance.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">{user.enrolledCourses?.length || 0}</div>
                                            <div className="text-sm text-gray-500">Enrolled Courses</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">0</div>
                                            <div className="text-sm text-gray-500">Certificates Earned</div>
                                        </div>
                                    </div>
                                    
                                    {!user.isVerified && (
                                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                                            <div>
                                                <h4 className="font-medium text-yellow-900 text-sm">Verify your account</h4>
                                                <p className="text-yellow-700 text-xs mt-1">Please verify your email address to unlock all features.</p>
                                                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-yellow-200 bg-yellow-100 hover:bg-yellow-200 text-yellow-800">
                                                    Resend Verification
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* My Courses Tab */}
                    <TabsContent value="courses" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
                        <Card className="shadow-sm border-gray-100">
                            <CardHeader>
                                <CardTitle>Enrolled Courses</CardTitle>
                                <CardDescription>Manage your active courses and learning progress.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {user.enrolledCourses?.length > 0 ? (
                                    <div className="grid gap-4">
                                        {/* Course items would be mapped here */}
                                        <div className="text-center py-8 text-gray-500">
                                            Course list component to be implemented
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <BookOpen className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                                        <p className="text-gray-500 mt-1 mb-6">Start your learning journey by exploring our course catalog.</p>
                                        <Button onClick={() => router.push("/courses")}>Browse Courses</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
                         <Card className="shadow-sm border-gray-100">
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>Manage your account preferences and login details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Change Password</Label>
                                    <div className="flex gap-2">
                                        <Input type="password" placeholder="Current Password" className="max-w-xs" />
                                        <Input type="password" placeholder="New Password" className="max-w-xs" />
                                    </div>
                                    <Button className="mt-2">Update Password</Button>
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <Label className="text-red-600">Danger Zone</Label>
                                    <p className="text-sm text-gray-500">Once you delete your account, there is no going back. Please be certain.</p>
                                    <Button variant="destructive" className="mt-2">Delete Account</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
