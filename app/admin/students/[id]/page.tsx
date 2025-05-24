import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Calendar, Clock, MapPin, BookOpen, User } from "lucide-react"

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const studentId = params.id

  // Get student details based on ID
  const student = {
    id: studentId,
    name: "Alex Johnson",
    age: 14,
    grade: "9th Grade",
    dateOfBirth: "2011-05-15",
    parentName: "Robert & Mary Johnson",
    parentEmail: "johnson@example.com",
    parentPhone: "(555) 123-4567",
    address: "456 Family Street, Learning City, LC 12345",
    emergencyContact: "Mary Johnson - (555) 987-6543",
    enrollmentDate: "2025-01-15",
    performance: "Excellent",
    notes:
      "Alex shows exceptional aptitude for mathematics, particularly in geometry. He actively participates in class discussions and helps other students.",
    medicalInfo: "No allergies or medical conditions",
    image: "/placeholder.svg?height=100&width=100",
  }

  // Sample classes for this student
  const classes = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      room: "Room 101",
      performance: "Excellent",
      schedule: [
        { day: "Monday", time: "3:00 PM - 5:00 PM" },
        { day: "Wednesday", time: "3:00 PM - 5:00 PM" },
      ],
    },
    {
      id: 3,
      subject: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      room: "Room 103",
      performance: "Good",
      schedule: [
        { day: "Monday", time: "4:30 PM - 6:00 PM" },
        { day: "Wednesday", time: "4:30 PM - 6:00 PM" },
      ],
    },
    {
      id: 9,
      subject: "Physics",
      grade: "9th Grade",
      teacher: "Dr. James Wilson",
      room: "Room 201",
      performance: "Excellent",
      schedule: [{ day: "Friday", time: "3:30 PM - 5:30 PM" }],
    },
  ]

  // Sample schedule data
  const schedules = [
    {
      id: 1,
      class: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      day: "Monday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      room: "Room 101",
    },
    {
      id: 2,
      class: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      day: "Wednesday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      room: "Room 101",
    },
    {
      id: 5,
      class: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      day: "Monday",
      startTime: "4:30 PM",
      endTime: "6:00 PM",
      room: "Room 103",
    },
    {
      id: 6,
      class: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      day: "Wednesday",
      startTime: "4:30 PM",
      endTime: "6:00 PM",
      room: "Room 103",
    },
    {
      id: 9,
      class: "Physics",
      grade: "9th Grade",
      teacher: "Dr. James Wilson",
      day: "Friday",
      startTime: "3:30 PM",
      endTime: "5:30 PM",
      room: "Room 201",
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

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
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
          <Link href="/admin/classes" className="text-sm font-medium underline-offset-4 hover:underline">
            Classes
          </Link>
          <Link
            href="/admin/students"
            className="text-sm font-medium text-purple-600 underline-offset-4 hover:underline"
          >
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
          <Link href="/admin/students">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Students
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                    <Image src={student.image || "/placeholder.svg"} alt={student.name} fill className="object-cover" />
                  </div>
                  <h1 className="text-2xl font-bold">{student.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      {student.grade}
                    </Badge>
                    <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                      {student.performance}
                    </Badge>
                  </div>

                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        Age: {student.age} (DOB: {formatDate(student.dateOfBirth)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Enrolled: {formatDate(student.enrollmentDate)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/admin/students/edit/${studentId}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-500 hover:text-red-700">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="classes">Classes</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Parent/Guardian Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Parent/Guardian</h3>
                        <p>{student.parentName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
                        <p>{student.emergencyContact}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p>{student.parentEmail}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                        <p>{student.parentPhone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p className="text-sm mt-1">{student.address}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                        <p className="text-sm mt-1">{student.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{student.medicalInfo}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classes" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrolled Classes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {classes.map((classItem) => (
                        <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-purple-600" />
                                <h3 className="font-medium">{classItem.subject}</h3>
                                <Badge variant="outline" className={getPerformanceBadgeColor(classItem.performance)}>
                                  {classItem.performance}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3 text-gray-500" />
                                  <span>{classItem.teacher}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-gray-500" />
                                  <span>{classItem.room}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-gray-500" />
                                  <span>{classItem.schedule.map((s) => s.day).join(", ")}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/classes/${classItem.id}`}>View Class</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
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
                              <h3 className="font-semibold">{schedule.class}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {schedule.startTime} - {schedule.endTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                              <User className="h-4 w-4" />
                              <span>{schedule.teacher}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span>{schedule.room}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/schedule?class=${schedule.class}&day=${schedule.day}`}>
                                View in Schedule
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
