import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, Clock, MapPin, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClassDetailsPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const classId = params.id

  // Get class details based on ID
  const classDetails = {
    id: classId,
    subject: "Mathematics",
    grade: "9th Grade",
    description: "Algebra, geometry, and introduction to trigonometry",
    teacher: "Dr. Sarah Johnson",
    students: 18,
    room: "Room 101",
    maxStudents: 20,
    materials: "Textbook: Advanced Algebra 9th Edition, Scientific Calculator",
    syllabus: "Week 1-4: Algebra Review\nWeek 5-8: Geometry Fundamentals\nWeek 9-12: Introduction to Trigonometry",
  }

  // Sample students data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 14,
      parentName: "Robert & Mary Johnson",
      parentEmail: "johnson@example.com",
      parentPhone: "(555) 123-4567",
      enrollmentDate: "Jan 15, 2025",
      performance: "Excellent",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Sophia Chen",
      age: 14,
      parentName: "David & Lisa Chen",
      parentEmail: "chen@example.com",
      parentPhone: "(555) 234-5678",
      enrollmentDate: "Feb 3, 2025",
      performance: "Good",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Ethan Williams",
      age: 15,
      parentName: "Michael Williams",
      parentEmail: "williams@example.com",
      parentPhone: "(555) 345-6789",
      enrollmentDate: "Dec 10, 2024",
      performance: "Satisfactory",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Isabella Rodriguez",
      age: 14,
      parentName: "Carlos & Anna Rodriguez",
      parentEmail: "rodriguez@example.com",
      parentPhone: "(555) 456-7890",
      enrollmentDate: "Jan 5, 2025",
      performance: "Excellent",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Noah Kim",
      age: 15,
      parentName: "James & Sarah Kim",
      parentEmail: "kim@example.com",
      parentPhone: "(555) 567-8901",
      enrollmentDate: "Feb 15, 2025",
      performance: "Good",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Emma Davis",
      age: 14,
      parentName: "Thomas & Jennifer Davis",
      parentEmail: "davis@example.com",
      parentPhone: "(555) 678-9012",
      enrollmentDate: "Jan 20, 2025",
      performance: "Excellent",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Sample schedule data
  const schedules = [
    {
      id: 1,
      day: "Monday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      room: "Room 101",
    },
    {
      id: 2,
      day: "Wednesday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      room: "Room 101",
    },
  ]

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
          <Link href="/admin/teachers" className="text-sm font-medium underline-offset-4 hover:underline">
            Teachers
          </Link>
          <Link
            href="/admin/classes"
            className="text-sm font-medium text-purple-600 underline-offset-4 hover:underline"
          >
            Classes
          </Link>
          <Link href="/admin/students" className="text-sm font-medium underline-offset-4 hover:underline">
            Students
          </Link>
          <Link href="/admin/schedule" className="text-sm font-medium underline-offset-4 hover:underline">
            Schedule
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="ml-auto md:hidden">
          <MenuIcon className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href="/admin/classes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Classes
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {classDetails.subject} - {classDetails.grade}
            </h1>
            <p className="text-muted-foreground">{classDetails.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/classes/edit/${classId}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Class
              </Link>
            </Button>
            <Button variant="outline" className="text-red-500 hover:text-red-700">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Class
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Class Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                      <p>{classDetails.subject}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Grade</h3>
                      <p>{classDetails.grade}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Teacher</h3>
                      <p>{classDetails.teacher}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Room</h3>
                      <p>{classDetails.room}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Students</h3>
                      <p>
                        {classDetails.students} / {classDetails.maxStudents}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="text-sm mt-1">{classDetails.description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Required Materials</h3>
                    <p className="text-sm mt-1">{classDetails.materials}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm">{classDetails.syllabus}</pre>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <Calendar className="h-4 w-4" />
                            <span>{schedule.day}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{schedule.room}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Students Enrolled</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search students..."
                      className="w-full bg-background pl-8 md:w-[300px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Parent/Guardian</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Enrollment Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                  <Image
                                    src={student.image || "/placeholder.svg"}
                                    alt={student.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                                {student.name}
                              </div>
                            </TableCell>
                            <TableCell>{student.age}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                                {student.performance}
                              </Badge>
                            </TableCell>
                            <TableCell>{student.parentName}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-gray-500" />
                                  <span className="text-xs">{student.parentEmail}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3 text-gray-500" />
                                  <span className="text-xs">{student.parentPhone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.enrollmentDate}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/admin/students/edit/${student.id}`}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Class Schedule</CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-purple-100 text-purple-800">
                            {schedule.day}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          <MapPin className="h-4 w-4" />
                          <span>{schedule.room}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{classDetails.teacher}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

function Plus(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function Search(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
