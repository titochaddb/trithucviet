import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Download, Users, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Admin } from "mongodb"
import AdminHeader from "@/app/admin/header"

export default function ClassReportPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const classId = params.id

  // Get class details based on ID
  const classDetails = {
    id: classId,
    subject: "Mathematics",
    grade: "9th Grade",
    teacher: "Dr. Sarah Johnson",
    room: "Room 101",
  }

  // Sample months for the dropdown
  const months = [
    { value: "5", label: "May 2025" },
    { value: "4", label: "April 2025" },
    { value: "3", label: "March 2025" },
    { value: "2", label: "February 2025" },
    { value: "1", label: "January 2025" },
  ]

  // Sample class data for the month
  const classData = {
    totalDays: 8,
    totalHours: 16,
    totalStudents: 18,
    daysPerWeek: [
      { day: "Monday", count: 4, hours: 8 },
      { day: "Wednesday", count: 4, hours: 8 },
    ],
    students: [
      {
        id: 1,
        name: "Alex Johnson",
        attendance: 8,
        attendancePercentage: 100,
        performance: "Excellent",
      },
      {
        id: 2,
        name: "Sophia Chen",
        attendance: 8,
        attendancePercentage: 100,
        performance: "Good",
      },
      {
        id: 3,
        name: "Ethan Williams",
        attendance: 7,
        attendancePercentage: 88,
        performance: "Satisfactory",
      },
      {
        id: 4,
        name: "Emma Davis",
        attendance: 8,
        attendancePercentage: 100,
        performance: "Excellent",
      },
      {
        id: 5,
        name: "Noah Kim",
        attendance: 6,
        attendancePercentage: 75,
        performance: "Good",
      },
    ],
    dailySchedule: [
      {
        date: "May 1, 2025",
        day: "Monday",
        time: "3:00 PM - 5:00 PM",
        room: "Room 101",
        attendance: 18,
        notes: "Covered introduction to geometry",
      },
      {
        date: "May 3, 2025",
        day: "Wednesday",
        time: "3:00 PM - 5:00 PM",
        room: "Room 101",
        attendance: 17,
        notes: "Continued with geometry concepts",
      },
      {
        date: "May 8, 2025",
        day: "Monday",
        time: "3:00 PM - 5:00 PM",
        room: "Room 101",
        attendance: 18,
        notes: "Introduced trigonometry basics",
      },
      {
        date: "May 10, 2025",
        day: "Wednesday",
        time: "3:00 PM - 5:00 PM",
        room: "Room 101",
        attendance: 16,
        notes: "Continued with trigonometry",
      },
      // More dates would follow...
    ],
  }

  // Function to get performance badge color
  const getPerformanceBadgeColor = (performance: string) => {
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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader/>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href="/admin/reports">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {classDetails.subject} ({classDetails.grade}) - Class Report
            </h1>
            <p className="text-muted-foreground">
              Teacher: {classDetails.teacher} | Room: {classDetails.room}
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="5">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classData.totalDays} days</div>
              <p className="text-xs text-muted-foreground">in May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classData.totalHours} hours</div>
              <p className="text-xs text-muted-foreground">in May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classData.totalStudents}</div>
              <p className="text-xs text-muted-foreground">enrolled students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  classData.dailySchedule.reduce((sum, day) => sum + day.attendance, 0) /
                    classData.dailySchedule.length,
                )}
              </div>
              <p className="text-xs text-muted-foreground">students per class</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Class Days Distribution</CardTitle>
              <CardDescription>Breakdown of class days by weekday</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classData.daysPerWeek.map((day) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">
                          {day.day}
                        </Badge>
                        <span className="text-sm font-medium">
                          {day.count} days ({day.hours} hours)
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((day.count / classData.totalDays) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-purple-600"
                        style={{ width: `${Math.round((day.count / classData.totalDays) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>Top 5 students by attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classData.students.map((student) => (
                  <div key={student.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{student.name}</span>
                        <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                          {student.performance}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">{student.attendancePercentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-green-600"
                        style={{ width: `${student.attendancePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Class Sessions - May 2025</CardTitle>
            <CardDescription>Detailed view of each class session</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classData.dailySchedule.map((session, index) => (
                  <TableRow key={index}>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.day}</TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell>{session.room}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {session.attendance}/{classData.totalStudents} (
                        {Math.round((session.attendance / classData.totalStudents) * 100)}%)
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={session.notes}>
                      {session.notes}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/schedule?date=${session.date}`}>View in Schedule</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

