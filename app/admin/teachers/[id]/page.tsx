import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calendar, Clock, Edit, Mail, MapPin, Phone, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AdminHeader from "../../header"

export default function TeacherDetailsPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const teacherId = params.id

  // Get teacher details based on ID
  const teacher = {
    id: teacherId,
    name: "Dr. Sarah Johnson",
    subject: "Mathematics",
    experience: "15 years",
    education: "Ph.D. in Mathematics Education",
    email: "sarah.johnson@excelacademy.edu",
    phone: "(555) 123-4567",
    address: "123 Educator Lane, Teaching City, TC 54321",
    bio: "Dr. Sarah Johnson is an experienced mathematics educator with a passion for making complex concepts accessible to students of all levels. With 15 years of teaching experience and a Ph.D. in Mathematics Education, she specializes in developing innovative teaching methods that engage students and foster a deep understanding of mathematical principles.",
    image: "/placeholder.svg?height=200&width=200",
    joinDate: "January 10, 2020",
    certifications: "National Board Certified Teacher, Advanced Mathematics Instructor",
    specialties: "Algebra, Geometry, Calculus",
  }

  // Sample classes taught by this teacher
  const classes = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "9th Grade",
      description: "Algebra, geometry, and introduction to trigonometry",
      students: 18,
      room: "Room 101",
      schedule: [
        { day: "Monday", time: "3:00 PM - 5:00 PM" },
        { day: "Wednesday", time: "3:00 PM - 5:00 PM" },
      ],
    },
    {
      id: 2,
      subject: "Advanced Mathematics",
      grade: "10th Grade",
      description: "Advanced algebra, trigonometry, and pre-calculus",
      students: 15,
      room: "Room 102",
      schedule: [
        { day: "Tuesday", time: "4:00 PM - 6:00 PM" },
        { day: "Thursday", time: "4:00 PM - 6:00 PM" },
      ],
    },
  ]

  // Sample schedule data
  const schedules = [
    {
      id: 1,
      class: "Mathematics",
      grade: "9th Grade",
      day: "Monday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      room: "Room 101",
    },
    {
      id: 2,
      class: "Mathematics",
      grade: "9th Grade",
      day: "Wednesday",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      room: "Room 101",
    },
    {
      id: 3,
      class: "Advanced Mathematics",
      grade: "10th Grade",
      day: "Tuesday",
      startTime: "4:00 PM",
      endTime: "6:00 PM",
      room: "Room 102",
    },
    {
      id: 4,
      class: "Advanced Mathematics",
      grade: "10th Grade",
      day: "Thursday",
      startTime: "4:00 PM",
      endTime: "6:00 PM",
      room: "Room 102",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href="/admin/teachers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teachers
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                    <Image src={teacher.image || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                  </div>
                  <h1 className="text-2xl font-bold">{teacher.name}</h1>
                  <p className="text-muted-foreground">{teacher.subject} Specialist</p>

                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{teacher.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Joined {teacher.joinDate}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/admin/teachers/edit/${teacherId}`}>
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
                    <CardTitle>Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                        <p>{teacher.experience}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Education</h3>
                        <p>{teacher.education}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Certifications</h3>
                      <p className="text-sm mt-1">{teacher.certifications}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Specialties</h3>
                      <p className="text-sm mt-1">{teacher.specialties}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{teacher.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classes" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Classes Taught</CardTitle>
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
                                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                                  {classItem.grade}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{classItem.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
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
                              <Link href={`/admin/classes/${classItem.id}`}>View Details</Link>
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
                              <Badge variant="outline">{schedule.grade}</Badge>
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

