import AdminHeader from "@/app/admin/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookOpen, Calendar, Clock, Download, MapPin, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function StudentReportPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const studentId = params.id

  // Get student details based on ID
  const student = {
    id: studentId,
    name: "Alex Johnson",
    grade: "9th Grade",
    performance: "Excellent",
    image: "/placeholder.svg?height=100&width=100",
  }

  // Sample months for the dropdown
  const months = [
    { value: "5", label: "May 2025" },
    { value: "4", label: "April 2025" },
    { value: "3", label: "March 2025" },
    { value: "2", label: "February 2025" },
    { value: "1", label: "January 2025" },
  ]

  // Sample learning data for the month
  const learningData = {
    totalDays: 12,
    totalHours: 24,
    totalClasses: 3,
    daysPerWeek: [
      { day: "Monday", count: 4, hours: 8 },
      { day: "Wednesday", count: 4, hours: 8 },
      { day: "Friday", count: 4, hours: 8 },
    ],
    subjects: ["Mathematics", "Science", "Physics"],
    classes: [
      {
        id: 1,
        subject: "Mathematics",
        grade: "9th Grade",
        teacher: "Dr. Sarah Johnson",
        performance: "Excellent",
        days: [
          { day: "Monday", time: "3:00 PM - 5:00 PM" },
          { day: "Wednesday", time: "3:00 PM - 5:00 PM" },
        ],
        totalDays: 8,
        totalHours: 16,
      },
      {
        id: 3,
        subject: "Science",
        grade: "9th Grade",
        teacher: "Prof. Michael Chen",
        performance: "Good",
        days: [
          { day: "Monday", time: "4:30 PM - 6:00 PM" },
          { day: "Wednesday", time: "4:30 PM - 6:00 PM" },
        ],
        totalDays: 8,
        totalHours: 12,
      },
      {
        id: 9,
        subject: "Physics",
        grade: "9th Grade",
        teacher: "Dr. James Wilson",
        performance: "Excellent",
        days: [{ day: "Friday", time: "3:30 PM - 5:30 PM" }],
        totalDays: 4,
        totalHours: 8,
      },
    ],
    dailySchedule: [
      {
        date: "May 1, 2025",
        day: "Monday",
        classes: [
          {
            subject: "Mathematics",
            teacher: "Dr. Sarah Johnson",
            time: "3:00 PM - 5:00 PM",
            room: "Room 101",
          },
          {
            subject: "Science",
            teacher: "Prof. Michael Chen",
            time: "4:30 PM - 6:00 PM",
            room: "Room 103",
          },
        ],
      },
      {
        date: "May 3, 2025",
        day: "Wednesday",
        classes: [
          {
            subject: "Mathematics",
            teacher: "Dr. Sarah Johnson",
            time: "3:00 PM - 5:00 PM",
            room: "Room 101",
          },
          {
            subject: "Science",
            teacher: "Prof. Michael Chen",
            time: "4:30 PM - 6:00 PM",
            room: "Room 103",
          },
        ],
      },
      {
        date: "May 5, 2025",
        day: "Friday",
        classes: [
          {
            subject: "Physics",
            teacher: "Dr. James Wilson",
            time: "3:30 PM - 5:30 PM",
            room: "Room 201",
          },
        ],
      },
      // More dates would follow...
    ],
  }

  // Calculate percentage of days per weekday
  const totalDays = learningData.daysPerWeek.reduce((sum, day) => sum + day.count, 0)
  const dayPercentages = learningData.daysPerWeek.map((day) => ({
    ...day,
    percentage: Math.round((day.count / totalDays) * 100),
  }))

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
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image src={student.image || "/placeholder.svg"} alt={student.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{student.name} - Learning Report</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  {student.grade}
                </Badge>
                <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                  {student.performance}
                </Badge>
              </div>
            </div>
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
              <CardTitle className="text-sm font-medium">Learning Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{learningData.totalDays} days</div>
              <p className="text-xs text-muted-foreground">in May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{learningData.totalHours} hours</div>
              <p className="text-xs text-muted-foreground">in May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{learningData.totalClasses}</div>
              <p className="text-xs text-muted-foreground">different classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{learningData.subjects.length}</div>
              <p className="text-xs text-muted-foreground">different subjects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Learning Days Distribution</CardTitle>
              <CardDescription>Breakdown of learning days by weekday</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dayPercentages.map((day) => (
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
                      <span className="text-sm font-medium">{day.percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-purple-600" style={{ width: `${day.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Classes Overview</CardTitle>
              <CardDescription>Summary of classes enrolled this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningData.classes.map((classItem) => (
                  <div key={classItem.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            {classItem.grade}
                          </Badge>
                          <Badge variant="outline" className={getPerformanceBadgeColor(classItem.performance)}>
                            {classItem.performance}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{classItem.totalDays} days</div>
                        <div className="text-sm text-gray-500">{classItem.totalHours} hours</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium">Teacher: {classItem.teacher}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {classItem.days.map((day, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100">
                            {day.day}: {day.time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Learning Schedule - May 2025</CardTitle>
            <CardDescription>Detailed view of learning activities by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningData.dailySchedule.map((day, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <h3 className="font-medium">
                      {day.date} ({day.day})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {day.classes.map((classItem, classIndex) => (
                      <div key={classIndex} className="rounded-md bg-gray-50 p-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-purple-600" />
                              <span className="font-medium">{classItem.subject}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{classItem.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{classItem.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{classItem.room}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/schedule?date=${day.date}`}>View in Schedule</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

