import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Search, Edit, Trash2, BookOpen, User } from "lucide-react"
import AdminHeader from "../header"

export default function ClassesPage() {
  // Sample data - in a real app, this would come from a database
  const classes = [
    {
      id: 1,
      subject: "Mathematics",
      grade: "9th Grade",
      description: "Algebra, geometry, and introduction to trigonometry",
      teacher: "Dr. Sarah Johnson",
      students: 18,
      room: "Room 101",
    },
    {
      id: 2,
      subject: "English",
      grade: "8th Grade",
      description: "Literature analysis, essay writing, and grammar",
      teacher: "Ms. Emily Rodriguez",
      students: 15,
      room: "Room 102",
    },
    {
      id: 3,
      subject: "Science",
      grade: "9th Grade",
      description: "Biology fundamentals and introduction to chemistry",
      teacher: "Prof. Michael Chen",
      students: 20,
      room: "Room 103",
    },
    {
      id: 4,
      subject: "History",
      grade: "8th Grade",
      description: "World history and social studies",
      teacher: "Mrs. Lisa Thompson",
      students: 16,
      room: "Room 104",
    },
    {
      id: 5,
      subject: "Physics",
      grade: "10th Grade",
      description: "Mechanics, waves, and thermodynamics",
      teacher: "Dr. James Wilson",
      students: 14,
      room: "Room 201",
    },
    {
      id: 6,
      subject: "Computer Science",
      grade: "10th Grade",
      description: "Programming fundamentals and computational thinking",
      teacher: "Mr. David Kim",
      students: 12,
      room: "Computer Lab",
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
      </header> */}
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
            <p className="text-muted-foreground">Manage course offerings and class details</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/admin/classes/add">
              <FolderPlus className="mr-2 h-4 w-4" />
              Add New Class
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search classes..." className="w-full bg-background pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        {classItem.subject}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        {classItem.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{classItem.teacher}</TableCell>
                    <TableCell>{classItem.students}</TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/classes/${classItem.id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/classes/edit/${classItem.id}`}>
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
