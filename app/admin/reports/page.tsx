import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Download, BarChart3, PieChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import AdminHeader from "../header"

export default function ReportsPage() {
  // Sample months for the dropdown
  const months = [
    { value: "5", label: "May 2025" },
    { value: "4", label: "April 2025" },
    { value: "3", label: "March 2025" },
    { value: "2", label: "February 2025" },
    { value: "1", label: "January 2025" },
  ]

  // Sample teacher data with teaching days
  const teacherReports = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      totalDays: 18,
      totalHours: 36,
      totalClasses: 2,
      totalStudents: 33,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
        { day: "Friday", count: 1 },
      ],
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Science",
      totalDays: 16,
      totalHours: 24,
      totalClasses: 2,
      totalStudents: 36,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
      ],
    },
    {
      id: 3,
      name: "Ms. Emily Rodriguez",
      subject: "English",
      totalDays: 16,
      totalHours: 24,
      totalClasses: 2,
      totalStudents: 30,
      daysPerWeek: [
        { day: "Tuesday", count: 4 },
        { day: "Thursday", count: 4 },
      ],
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      subject: "Physics",
      totalDays: 4,
      totalHours: 8,
      totalClasses: 1,
      totalStudents: 14,
      daysPerWeek: [{ day: "Friday", count: 4 }],
    },
    {
      id: 5,
      name: "Mrs. Lisa Thompson",
      subject: "History",
      totalDays: 16,
      totalHours: 24,
      totalClasses: 2,
      totalStudents: 32,
      daysPerWeek: [
        { day: "Tuesday", count: 4 },
        { day: "Thursday", count: 4 },
      ],
    },
    {
      id: 6,
      name: "Mr. David Kim",
      subject: "Computer Science",
      totalDays: 4,
      totalHours: 12,
      totalClasses: 1,
      totalStudents: 12,
      daysPerWeek: [{ day: "Saturday", count: 4 }],
    },
  ]

  // Sample student data with learning days
  const studentReports = [
    {
      id: 1,
      name: "Alex Johnson",
      grade: "9th Grade",
      totalDays: 12,
      totalHours: 24,
      totalClasses: 3,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
        { day: "Friday", count: 4 },
      ],
      subjects: ["Mathematics", "Science", "Physics"],
    },
    {
      id: 2,
      name: "Sophia Chen",
      grade: "9th Grade",
      totalDays: 12,
      totalHours: 24,
      totalClasses: 3,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
        { day: "Friday", count: 4 },
      ],
      subjects: ["Mathematics", "Science", "Physics"],
    },
    {
      id: 3,
      name: "Ethan Williams",
      grade: "10th Grade",
      totalDays: 12,
      totalHours: 24,
      totalClasses: 3,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
        { day: "Friday", count: 4 },
      ],
      subjects: ["Mathematics", "Science", "Physics"],
    },
    {
      id: 4,
      name: "Isabella Rodriguez",
      grade: "8th Grade",
      totalDays: 12,
      totalHours: 18,
      totalClasses: 3,
      daysPerWeek: [
        { day: "Tuesday", count: 4 },
        { day: "Thursday", count: 4 },
        { day: "Saturday", count: 4 },
      ],
      subjects: ["English", "History", "Computer Science"],
    },
    {
      id: 5,
      name: "Noah Kim",
      grade: "10th Grade",
      totalDays: 12,
      totalHours: 18,
      totalClasses: 3,
      daysPerWeek: [
        { day: "Tuesday", count: 4 },
        { day: "Thursday", count: 4 },
        { day: "Saturday", count: 4 },
      ],
      subjects: ["English", "History", "Computer Science"],
    },
  ]

  // Sample class data
  const classReports = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      totalDays: 8,
      totalHours: 16,
      totalStudents: 18,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
      ],
    },
    {
      id: 2,
      subject: "English",
      grade: "8th Grade",
      teacher: "Ms. Emily Rodriguez",
      totalDays: 8,
      totalHours: 12,
      totalStudents: 15,
      daysPerWeek: [
        { day: "Tuesday", count: 4 },
        { day: "Thursday", count: 4 },
      ],
    },
    {
      id: 3,
      subject: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      totalDays: 8,
      totalHours: 12,
      totalStudents: 20,
      daysPerWeek: [
        { day: "Monday", count: 4 },
        { day: "Wednesday", count: 4 },
      ],
    },
    {
      id: 4,
      subject: "History",
      grade: "8th Grade",
      teacher: "Mrs. Lisa Thompson",
      totalDays: 8,
      totalHours: 12,
      totalStudents: 16,
      daysPerWeek: [
        { day: "Tuesday", count: 4 },
        { day: "Thursday", count: 4 },
      ],
    },
    {
      id: 5,
      subject: "Physics",
      grade: "10th Grade",
      teacher: "Dr. James Wilson",
      totalDays: 4,
      totalHours: 8,
      totalStudents: 14,
      daysPerWeek: [{ day: "Friday", count: 4 }],
    },
    {
      id: 6,
      subject: "Computer Science",
      grade: "10th Grade",
      teacher: "Mr. David Kim",
      totalDays: 4,
      totalHours: 12,
      totalStudents: 12,
      daysPerWeek: [{ day: "Saturday", count: 4 }],
    },
  ]

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
          <Link href="/admin/schedule" className="text-sm font-medium underline-offset-4 hover:underline">
            Schedule
          </Link>
          <Link
            href="/admin/reports"
            className="text-sm font-medium text-purple-600 underline-offset-4 hover:underline"
          >
            Reports
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
            <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">View attendance and performance reports</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous month</span>
              </Button>
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
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next month</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Monthly
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Bar Chart
            </Button>
            <Button variant="outline" size="sm">
              <PieChart className="mr-2 h-4 w-4" />
              Pie Chart
            </Button>
          </div>
        </div>

        <Tabs defaultValue="teachers" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Activity Report - May 2025</CardTitle>
                <CardDescription>
                  Summary of teaching days, hours, and classes for each teacher this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Teacher</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Subject</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Teaching Days</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Total Hours</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Classes</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Students</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Days of Week</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacherReports.map((teacher) => (
                          <tr
                            key={teacher.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle font-medium">{teacher.name}</td>
                            <td className="p-4 align-middle">{teacher.subject}</td>
                            <td className="p-4 align-middle text-center">
                              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                                {teacher.totalDays} days
                              </Badge>
                            </td>
                            <td className="p-4 align-middle text-center">{teacher.totalHours} hrs</td>
                            <td className="p-4 align-middle text-center">{teacher.totalClasses}</td>
                            <td className="p-4 align-middle text-center">{teacher.totalStudents}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {teacher.daysPerWeek.map((day) => (
                                  <Badge key={day.day} variant="outline" className="bg-gray-100">
                                    {day.day.substring(0, 3)} ({day.count})
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/teachers/${teacher.id}/report`}>View Details</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Learning Report - May 2025</CardTitle>
                <CardDescription>
                  Summary of learning days, hours, and classes for each student this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Student</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Grade</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Learning Days</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Total Hours</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Classes</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Subjects</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Days of Week</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentReports.map((student) => (
                          <tr
                            key={student.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle font-medium">{student.name}</td>
                            <td className="p-4 align-middle">{student.grade}</td>
                            <td className="p-4 align-middle text-center">
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                {student.totalDays} days
                              </Badge>
                            </td>
                            <td className="p-4 align-middle text-center">{student.totalHours} hrs</td>
                            <td className="p-4 align-middle text-center">{student.totalClasses}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {student.subjects.map((subject) => (
                                  <Badge key={subject} variant="outline" className="bg-blue-100 text-blue-800">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {student.daysPerWeek.map((day) => (
                                  <Badge key={day.day} variant="outline" className="bg-gray-100">
                                    {day.day.substring(0, 3)} ({day.count})
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/students/${student.id}/report`}>View Details</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Activity Report - May 2025</CardTitle>
                <CardDescription>Summary of class sessions, hours, and attendance this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Class</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Grade</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Teacher</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Class Days</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Total Hours</th>
                          <th className="h-12 px-4 text-center align-middle font-medium">Students</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Days of Week</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classReports.map((classItem) => (
                          <tr
                            key={classItem.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle font-medium">{classItem.subject}</td>
                            <td className="p-4 align-middle">{classItem.grade}</td>
                            <td className="p-4 align-middle">{classItem.teacher}</td>
                            <td className="p-4 align-middle text-center">
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                {classItem.totalDays} days
                              </Badge>
                            </td>
                            <td className="p-4 align-middle text-center">{classItem.totalHours} hrs</td>
                            <td className="p-4 align-middle text-center">{classItem.totalStudents}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {classItem.daysPerWeek.map((day) => (
                                  <Badge key={day.day} variant="outline" className="bg-gray-100">
                                    {day.day.substring(0, 3)} ({day.count})
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/classes/${classItem.id}/report`}>View Details</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
