import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Search, Edit, Trash2, Mail, Phone, BookOpen, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JSX, SVGProps } from "react"
import AdminHeader from "../header"

export default function StudentsPage() {
  // Sample data - in a real app, this would come from a database
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 14,
      grade: "9th Grade",
      class: "Mathematics",
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
      grade: "9th Grade",
      class: "Science",
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
      grade: "10th Grade",
      class: "Physics",
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
      grade: "8th Grade",
      class: "English",
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
      grade: "10th Grade",
      class: "Computer Science",
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
      grade: "9th Grade",
      class: "Mathematics",
      parentName: "Thomas & Jennifer Davis",
      parentEmail: "davis@example.com",
      parentPhone: "(555) 678-9012",
      enrollmentDate: "Jan 20, 2025",
      performance: "Excellent",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      name: "Liam Wilson",
      age: 15,
      grade: "10th Grade",
      class: "Physics",
      parentName: "Daniel & Emily Wilson",
      parentEmail: "wilson@example.com",
      parentPhone: "(555) 789-0123",
      enrollmentDate: "Dec 5, 2024",
      performance: "Needs Improvement",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      age: 14,
      grade: "8th Grade",
      class: "History",
      parentName: "Jose & Maria Martinez",
      parentEmail: "martinez@example.com",
      parentPhone: "(555) 890-1234",
      enrollmentDate: "Jan 10, 2025",
      performance: "Good",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

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
      </header> */}
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground">Manage student information and enrollment</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/admin/students/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Student
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search students..." className="w-full bg-background pl-8 md:w-[300px]" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>
                <SelectItem value="8th">8th Grade</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All classes</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All performance</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="satisfactory">Satisfactory</SelectItem>
                <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Parent/Guardian</TableHead>
                  <TableHead>Contact</TableHead>
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
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        {student.class}
                      </div>
                    </TableCell>
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
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/students/${student.id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
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
      </main>
    </div>
  )
}

function GraduationCapIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
