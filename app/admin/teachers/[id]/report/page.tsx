import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Download, Users, BookOpen } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherReportPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const teacherId = params.id

  // Get teacher details based on ID
  const teacher = {
    id: teacherId,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    image: "/placeholder.svg?height=200&width=200",
  }

  // Sample months for the dropdown
  const months = [
    { value: "5", label: "May 2025" },
    { value: "4", label: "April 2025" },
    { value: "3", label: "March 2025" },
    { value: "2", label: "February 2025" },
    { value: "1", label: "January 2025" },
  ]

  // Sample teaching data for the month
  const teachingData = {
    totalDays: 18,
    totalHours: 36,
    totalClasses: 2,
    totalStudents: 33,
    daysPerWeek: [
      { day: "Monday", count: 4, hours: 8 },
      { day: "Wednesday", count: 4, hours: 8 },
      { day: "Friday", count: 1, hours: 2 },
    ],
    classes: [
      {
        id: 1,
        subject: "Mathematics",
        grade: "9th Grade",
        students: 18,
        days: [
          { day: "Monday", time: "3:00 PM - 5:00 PM" },
          { day: "Wednesday", time: "3:00 PM - 5:00 PM" },
        ],
        totalDays: 8,
        totalHours: 16,
      },
      {
        id: 2,
        subject: "Advanced Mathematics",
        grade: "10th Grade",
        students: 15,
        days: [{ day: "Friday", time: "3:30 PM - 5:30 PM" }],
        totalDays: 1,
        totalHours: 2,
      },
    ],
    dailySchedule: [
      {
        date: "May 1, 2025",
        day: "Monday",
        classes: [
          {
            subject: "Mathematics",
            grade: "9th Grade",
            time: "3:00 PM - 5:00 PM",
            room: "Room 101",
            students: 18,
          },
        ],
      },
      {
        date: "May 3, 2025",
        day: "Wednesday",
        classes: [
          {
            subject: "Mathematics",
            grade: "9th Grade",
            time: "3:00 PM - 5:00 PM",
            room: "Room 101",
            students: 18,
          },
        ],
      },
      {
        date: "May 5, 2025",
        day: "Friday",
        classes: [
          {
            subject: "Advanced Mathematics",
            grade: "10th Grade",
            time: "3:30 PM - 5:30 PM",
            room: "Room 102",
            students: 15,
          },
        ],
      },
      // More dates would follow...
    ],
  }

  // Calculate percentage of days taught per weekday
  const totalDays = teachingData.daysPerWeek.reduce((sum, day) => sum + day.count, 0)
  const dayPercentages = teachingData.daysPerWeek.map((day) => ({
    ...day,
    percentage: Math.round((day.count / totalDays) * 100),
  }))

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <GraduationCapIcon className="h-6 w-6" />
          <span>Excel Academy Admin</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/admin" className="text-sm font-medium underline-offset-4 hover:underline">
            Dashboard
          </Link>
          <Link
            href="/admin/teachers"
            className="text-sm font-medium text-purple-600 underline-offset-4 hover:underline"
          >
            Teachers
          </Link>
          <Link href="/admin/classes" className="text-sm font-medium underline-offset-4 hover:underline">
            Classes
          </Link>
          <Link href="/admin/students" className="text-sm font-medium underline-offset-4 hover:underline">
            Students
          </Link>
          <Link href="/admin/schedule" className="text-sm font-medium underline-offset-4 hover:underline">
            Schedule
          </Link>
          <Link href="/admin/reports" className="text-sm font-medium underline-offset-4 hover:underline">
            Reports
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="ml-auto md:hidden">
          <MenuIcon className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
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
              <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{teacher.name} - Teaching Report</h1>
              <p className="text-muted-foreground">{teacher.subject} Specialist</p>
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
              <CardTitle className="text-sm font-medium">Teaching Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachingData.totalDays} days</div>
              <p className="text-xs text-muted-foreground">in May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teaching Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachingData.totalHours} hours</div>
              <p className="text-xs text-muted-foreground">in May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Taught</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachingData.totalClasses}</div>
              <p className="text-xs text-muted-foreground">different classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachingData.totalStudents}</div>
              <p className="text-xs text-muted-foreground">across all classes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Days Distribution</CardTitle>
              <CardDescription>Breakdown of teaching days by weekday</CardDescription>
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
              <CardDescription>Summary of classes taught this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachingData.classes.map((classItem) => (
                  <div key={classItem.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            {classItem.grade}
                          </Badge>
                          <span className="text-sm text-gray-500">{classItem.students} students</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{classItem.totalDays} days</div>
                        <div className="text-sm text-gray-500">{classItem.totalHours} hours</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium">Schedule:</div>
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
            <CardTitle>Daily Teaching Schedule - May 2025</CardTitle>
            <CardDescription>Detailed view of teaching activities by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachingData.dailySchedule.map((day, index) => (
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
                              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                                {classItem.grade}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{classItem.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{classItem.students} students</span>
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

function GraduationCapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
