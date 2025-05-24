"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Plus,
  Search,
  User,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AdminHeader from "../header"

export default function SchedulePage() {
  // State for the current view (day, week, month)
  const [currentView, setCurrentView] = useState("week")

  // State for the current date
  const [currentDate, setCurrentDate] = useState(new Date())

  // State for the selected schedule item
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  // State for the drawer (mobile) or dialog (desktop) visibility
  const [detailsOpen, setDetailsOpen] = useState(false)

  // State for the add/edit schedule dialog
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false)

  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false)

  // Sample schedule data - in a real app, this would come from a database
  const schedules = [
    {
      id: 1,
      class: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      room: "Room 101",
      day: "Monday",
      startTime: "15:00",
      endTime: "17:00",
      displayStartTime: "3:00 PM",
      displayEndTime: "5:00 PM",
      students: 18,
      color: "bg-blue-100 border-blue-300",
      description: "Algebra, geometry, and introduction to trigonometry",
    },
    {
      id: 2,
      class: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      room: "Room 101",
      day: "Wednesday",
      startTime: "15:00",
      endTime: "17:00",
      displayStartTime: "3:00 PM",
      displayEndTime: "5:00 PM",
      students: 18,
      color: "bg-blue-100 border-blue-300",
      description: "Algebra, geometry, and introduction to trigonometry",
    },
    {
      id: 3,
      class: "English",
      grade: "8th Grade",
      teacher: "Ms. Emily Rodriguez",
      room: "Room 102",
      day: "Tuesday",
      startTime: "16:00",
      endTime: "17:30",
      displayStartTime: "4:00 PM",
      displayEndTime: "5:30 PM",
      students: 15,
      color: "bg-green-100 border-green-300",
      description: "Literature analysis, essay writing, and grammar",
    },
    {
      id: 4,
      class: "English",
      grade: "8th Grade",
      teacher: "Ms. Emily Rodriguez",
      room: "Room 102",
      day: "Thursday",
      startTime: "16:00",
      endTime: "17:30",
      displayStartTime: "4:00 PM",
      displayEndTime: "5:30 PM",
      students: 15,
      color: "bg-green-100 border-green-300",
      description: "Literature analysis, essay writing, and grammar",
    },
    {
      id: 5,
      class: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      room: "Room 103",
      day: "Monday",
      startTime: "16:30",
      endTime: "18:00",
      displayStartTime: "4:30 PM",
      displayEndTime: "6:00 PM",
      students: 20,
      color: "bg-purple-100 border-purple-300",
      description: "Biology fundamentals and introduction to chemistry",
    },
    {
      id: 6,
      class: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      room: "Room 103",
      day: "Wednesday",
      startTime: "16:30",
      endTime: "18:00",
      displayStartTime: "4:30 PM",
      displayEndTime: "6:00 PM",
      students: 20,
      color: "bg-purple-100 border-purple-300",
      description: "Biology fundamentals and introduction to chemistry",
    },
    {
      id: 7,
      class: "History",
      grade: "8th Grade",
      teacher: "Mrs. Lisa Thompson",
      room: "Room 104",
      day: "Tuesday",
      startTime: "15:30",
      endTime: "17:00",
      displayStartTime: "3:30 PM",
      displayEndTime: "5:00 PM",
      students: 16,
      color: "bg-yellow-100 border-yellow-300",
      description: "World history and social studies",
    },
    {
      id: 8,
      class: "History",
      grade: "8th Grade",
      teacher: "Mrs. Lisa Thompson",
      room: "Room 104",
      day: "Thursday",
      startTime: "15:30",
      endTime: "17:00",
      displayStartTime: "3:30 PM",
      displayEndTime: "5:00 PM",
      students: 16,
      color: "bg-yellow-100 border-yellow-300",
      description: "World history and social studies",
    },
    {
      id: 9,
      class: "Physics",
      grade: "10th Grade",
      teacher: "Dr. James Wilson",
      room: "Room 201",
      day: "Friday",
      startTime: "15:30",
      endTime: "17:30",
      displayStartTime: "3:30 PM",
      displayEndTime: "5:30 PM",
      students: 14,
      color: "bg-red-100 border-red-300",
      description: "Mechanics, waves, and thermodynamics",
    },
    {
      id: 10,
      class: "Computer Science",
      grade: "10th Grade",
      teacher: "Mr. David Kim",
      room: "Computer Lab",
      day: "Saturday",
      startTime: "09:00",
      endTime: "12:00",
      displayStartTime: "9:00 AM",
      displayEndTime: "12:00 PM",
      students: 12,
      color: "bg-indigo-100 border-indigo-300",
      description: "Programming fundamentals and computational thinking",
    },
  ]

  // Sample students for the selected class
  const sampleStudents = [
    { id: 1, name: "Alex Johnson", grade: "9th Grade", performance: "Excellent" },
    { id: 2, name: "Sophia Chen", grade: "9th Grade", performance: "Good" },
    { id: 3, name: "Ethan Williams", grade: "9th Grade", performance: "Satisfactory" },
    { id: 4, name: "Emma Davis", grade: "9th Grade", performance: "Excellent" },
    { id: 5, name: "Noah Kim", grade: "9th Grade", performance: "Good" },
  ]

  // Sample teachers for dropdown
  const teachers = [
    { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics" },
    { id: 2, name: "Prof. Michael Chen", subject: "Science" },
    { id: 3, name: "Ms. Emily Rodriguez", subject: "English" },
    { id: 4, name: "Dr. James Wilson", subject: "Physics" },
    { id: 5, name: "Mrs. Lisa Thompson", subject: "History" },
    { id: 6, name: "Mr. David Kim", subject: "Computer Science" },
  ]

  // Sample classes for dropdown
  const classes = [
    { id: 1, name: "Mathematics", grade: "9th Grade" },
    { id: 2, name: "English", grade: "8th Grade" },
    { id: 3, name: "Science", grade: "9th Grade" },
    { id: 4, name: "History", grade: "8th Grade" },
    { id: 5, name: "Physics", grade: "10th Grade" },
    { id: 6, name: "Computer Science", grade: "10th Grade" },
  ]

  // Sample rooms for dropdown
  const rooms = [
    { id: "101", name: "Room 101" },
    { id: "102", name: "Room 102" },
    { id: "103", name: "Room 103" },
    { id: "104", name: "Room 104" },
    { id: "201", name: "Room 201" },
    { id: "lab", name: "Computer Lab" },
  ]

  // Days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // Time slots for the timeline (15-minute intervals from 8 AM to 8 PM)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 4) + 8
    const minute = (i % 4) * 15
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour
    return {
      time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      display: minute === 0 ? `${displayHour} ${ampm}` : "",
    }
  })

  // Group schedules by day for the timeline view
  const schedulesByDay = days.map((day) => {
    return {
      day,
      schedules: schedules.filter((schedule) => schedule.day === day),
    }
  })

  // Function to handle schedule item click
  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule)
    setDetailsOpen(true)
  }

  // Function to open the add schedule form
  const handleAddSchedule = () => {
    setIsEditMode(false)
    setSelectedSchedule(null)
    setScheduleFormOpen(true)
  }

  // Function to open the edit schedule form
  const handleEditSchedule = (schedule) => {
    setIsEditMode(true)
    setSelectedSchedule(schedule)
    setScheduleFormOpen(true)
  }

  // Function to get performance badge color
  const getPerformanceBadgeColor = (performance) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Good":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Satisfactory":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Needs Improvement":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Function to format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Function to navigate to previous period
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (currentView === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  // Function to navigate to next period
  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (currentView === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // Function to go to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <GraduationCapIcon className="h-6 w-6" />
          <span>Excel Academy Admin</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/admin" className="text-sm font-medium underline-offset-4 hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/teachers" className="text-sm font-medium underline-offset-4 hover:underline">
            Teachers
          </Link>
          <Link href="/admin/classes" className="text-sm font-medium underline-offset-4 hover:underline">
            Classes
          </Link>
          <Link href="/admin/students" className="text-sm font-medium underline-offset-4 hover:underline">
            Students
          </Link>
          <Link
            href="/admin/schedule"
            className="text-sm font-medium text-purple-600 underline-offset-4 hover:underline"
          >
            Schedule
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="ml-auto md:hidden">
          <MenuIcon className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
      </header> */}
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
            <p className="text-muted-foreground">Manage class schedules and time slots</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddSchedule}>
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search schedules..."
                className="w-full bg-background pl-8 md:w-[300px]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All days</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All teachers</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>
          <Tabs defaultValue="week" className="w-auto" onValueChange={setCurrentView} value={currentView}>
            <TabsList className="grid w-[250px] grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Timeline View */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[100px_repeat(7,1fr)] border rounded-lg bg-white">
              {/* Time column */}
              <div className="border-r">
                <div className="h-12 border-b flex items-center justify-center font-medium">Time</div>
                {timeSlots.map((slot, index) => (
                  <div key={index} className="h-8 flex items-center justify-end pr-2 text-xs text-gray-500">
                    {slot.display}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {days.map((day, dayIndex) => (
                <div key={day} className="border-r last:border-r-0">
                  <div className="h-12 border-b flex items-center justify-center font-medium">{day}</div>
                  <div className="relative">
                    {/* Time slot grid lines */}
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="h-8 border-b last:border-b-0"></div>
                    ))}

                    {/* Schedule items */}
                    {schedulesByDay[dayIndex].schedules.map((schedule) => {
                      // Calculate position and height based on start and end times
                      const startParts = schedule.startTime.split(":").map(Number)
                      const endParts = schedule.endTime.split(":").map(Number)

                      const startMinutes = startParts[0] * 60 + startParts[1]
                      const endMinutes = endParts[0] * 60 + endParts[1]

                      // Convert to position in the grid (8 AM = 480 minutes is the start)
                      const startPosition = ((startMinutes - 480) / 15) * 8 // 8px per 15 minutes
                      const duration = ((endMinutes - startMinutes) / 15) * 8 // 8px per 15 minutes

                      return (
                        <div
                          key={schedule.id}
                          className={`absolute left-1 right-1 rounded-md border-l-4 px-2 py-1 text-xs shadow-sm cursor-pointer transition-all hover:shadow-md ${schedule.color}`}
                          style={{
                            top: `${startPosition}px`,
                            height: `${duration}px`,
                            zIndex: 10,
                          }}
                          onClick={() => handleScheduleClick(schedule)}
                        >
                          <div className="font-medium truncate">{schedule.class}</div>
                          <div className="truncate">
                            {schedule.displayStartTime} - {schedule.displayEndTime}
                          </div>
                          <div className="truncate">{schedule.room}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* List View */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>All Scheduled Classes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Day</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Class</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Grade</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Teacher</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Room</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Students</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((schedule) => (
                      <tr
                        key={schedule.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
                        onClick={() => handleScheduleClick(schedule)}
                      >
                        <td className="p-4 align-middle">{schedule.day}</td>
                        <td className="p-4 align-middle">
                          {schedule.displayStartTime} - {schedule.displayEndTime}
                        </td>
                        <td className="p-4 align-middle font-medium">{schedule.class}</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            {schedule.grade}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{schedule.teacher}</td>
                        <td className="p-4 align-middle">{schedule.room}</td>
                        <td className="p-4 align-middle">{schedule.students}</td>
                        <td className="p-4 align-middle" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditSchedule(schedule)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete the schedule for {schedule.class} on {schedule.day}{" "}
                                    from {schedule.displayStartTime} to {schedule.displayEndTime}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Details Dialog/Drawer (responsive) */}
        <Dialog open={detailsOpen && !isMobile()} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule Details</DialogTitle>
              <DialogDescription>View detailed information about this scheduled class.</DialogDescription>
            </DialogHeader>
            {selectedSchedule && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedSchedule.class}</h3>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 mt-1">
                        {selectedSchedule.grade}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{selectedSchedule.day}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {selectedSchedule.displayStartTime} - {selectedSchedule.displayEndTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{selectedSchedule.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{selectedSchedule.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{selectedSchedule.students} students</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Description</h4>
                      <p className="text-sm text-gray-600">{selectedSchedule.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Students in this Class</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-2 text-left font-medium">Name</th>
                          <th className="px-4 py-2 text-left font-medium">Grade</th>
                          <th className="px-4 py-2 text-left font-medium">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleStudents.map((student) => (
                          <tr key={student.id} className="border-b last:border-b-0">
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">{student.grade}</td>
                            <td className="px-4 py-2">
                              <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                                {student.performance}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <DialogFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEditSchedule(selectedSchedule)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Schedule
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="text-red-500 hover:text-red-700">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the schedule for {selectedSchedule.class} on{" "}
                            {selectedSchedule.day} from {selectedSchedule.displayStartTime} to{" "}
                            {selectedSchedule.displayEndTime}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Mobile Drawer for Schedule Details */}
        <Drawer open={detailsOpen && isMobile()} onOpenChange={setDetailsOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Schedule Details</DrawerTitle>
              <DrawerDescription>View detailed information about this scheduled class.</DrawerDescription>
            </DrawerHeader>
            {selectedSchedule && (
              <div className="px-4 space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedSchedule.class}</h3>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 mt-1">
                      {selectedSchedule.grade}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{selectedSchedule.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {selectedSchedule.displayStartTime} - {selectedSchedule.displayEndTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{selectedSchedule.teacher}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{selectedSchedule.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{selectedSchedule.students} students</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{selectedSchedule.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Students in this Class</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-2 text-left font-medium">Name</th>
                          <th className="px-4 py-2 text-left font-medium">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleStudents.map((student) => (
                          <tr key={student.id} className="border-b last:border-b-0">
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">
                              <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                                {student.performance}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button variant="outline" className="flex-1" onClick={() => handleEditSchedule(selectedSchedule)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="flex-1 text-red-500 hover:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the schedule for {selectedSchedule.class} on{" "}
                          {selectedSchedule.day}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Add/Edit Schedule Dialog */}
        <Dialog open={scheduleFormOpen} onOpenChange={setScheduleFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Schedule" : "Add New Schedule"}</DialogTitle>
              <DialogDescription>
                {isEditMode ? "Update the details of this scheduled class." : "Create a new scheduled class."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select defaultValue={selectedSchedule?.class ? "1" : undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id.toString()}>
                          {classItem.name} ({classItem.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select defaultValue={selectedSchedule?.teacher ? "1" : undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <Select defaultValue={selectedSchedule?.day?.toLowerCase() || undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day.toLowerCase()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Select defaultValue={selectedSchedule?.room ? "101" : undefined}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" defaultValue={selectedSchedule?.startTime || "15:00"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input id="endTime" type="time" defaultValue={selectedSchedule?.endTime || "17:00"} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter class description"
                  defaultValue={selectedSchedule?.description || ""}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setScheduleFormOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                {isEditMode ? "Update Schedule" : "Add Schedule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

// Helper function to detect mobile
function isMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768
  }
  return false
}
