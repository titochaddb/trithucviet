import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload } from "lucide-react"

export default function EditStudentPage({ params }: { params: { id: string } }) {
  // Sample data - in a real app, this would come from a database
  const studentId = params.id

  // Get student details based on ID
  const student = {
    id: studentId,
    name: "Alex Johnson",
    age: 14,
    grade: "9th Grade",
    class: "Mathematics",
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

  // Sample classes for dropdown
  const classes = [
    { id: 1, name: "Mathematics", grade: "9th Grade" },
    { id: 2, name: "English", grade: "8th Grade" },
    { id: 3, name: "Science", grade: "9th Grade" },
    { id: 4, name: "History", grade: "8th Grade" },
    { id: 5, name: "Physics", grade: "10th Grade" },
    { id: 6, name: "Computer Science", grade: "10th Grade" },
  ]

  // Performance options
  const performanceOptions = ["Excellent", "Good", "Satisfactory", "Needs Improvement"]

  // Grade options
  const grades = ["7th Grade", "8th Grade", "9th Grade", "10th Grade"]

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

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Student</h1>
            <p className="text-muted-foreground">Update student information</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={student.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" defaultValue={student.age} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue={student.dateOfBirth} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={student.address} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input id="enrollmentDate" type="date" defaultValue={student.enrollmentDate} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input id="parentName" defaultValue={student.parentName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email</Label>
                <Input id="parentEmail" type="email" defaultValue={student.parentEmail} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Phone</Label>
                <Input id="parentPhone" defaultValue={student.parentPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" defaultValue={student.emergencyContact} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select defaultValue={student.grade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select defaultValue="1">
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
                <Label htmlFor="performance">Performance</Label>
                <Select defaultValue={student.performance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select performance level" />
                  </SelectTrigger>
                  <SelectContent>
                    {performanceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Academic Notes</Label>
                <Textarea id="notes" rows={4} defaultValue={student.notes} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalInfo">Medical Notes</Label>
                <Textarea id="medicalInfo" rows={4} defaultValue={student.medicalInfo} />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden">
                  <Image
                    src={student.image || "/placeholder.svg"}
                    alt={student.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Image
                  </Button>
                  <p className="text-xs text-muted-foreground">Recommended: Square image, at least 300x300 pixels.</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
