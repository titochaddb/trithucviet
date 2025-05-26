"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Search, Edit, Trash2, User } from "lucide-react"
import AdminHeader from "../header"
import { useEffect, useState } from "react"
import { Teacher } from "@/lib/type"

export default function TeachersPage() {
  // const [loading, setLoading] = useState(true)
  const [teachers, seTeachers] = useState<Teacher[]>([])
  // const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)


  const fetchTeachers = async () => {
    // setLoading(true)
    try {
      // const params = new URLSearchParams()
      // if (searchKeyword) params.set("search", searchKeyword)
      // params.set("page", currentPage.toString())
      // params.set("limit", limit.toString())

      const res = await fetch(`/api/teacher`)
      // const res = await fetch(`/api/teacher?${params.toString()}`)
      const data = await res.json()

      seTeachers(data.teachers)
      // setTotalPages(data.totalPages)
    } 
    catch (err) {
      console.error("Error fetching medicines:", err)
      // showAlert("Lỗi khi tải danh sách thuốc", "error")
    } 
    // finally {
    //   setLoading(false)
    // }
  }
  useEffect(() => {
    fetchTeachers()
  }, [])
  // Sample data - in a real app, this would come from a database
  // const teachers = [
  //   {
  //     id: 1,
  //     name: "Dr. Sarah Johnson",
  //     subject: "Mathematics",
  //     experience: "15 years",
  //     education: "Ph.D. in Mathematics Education",
  //     email: "sarah.johnson@excelacademy.edu",
  //     phone: "(555) 123-4567",
  //     image: "/placeholder.svg?height=200&width=200",
  //   },
  //   {
  //     id: 2,
  //     name: "Prof. Michael Chen",
  //     subject: "Science",
  //     experience: "12 years",
  //     education: "M.Sc. in Physics",
  //     email: "michael.chen@excelacademy.edu",
  //     phone: "(555) 234-5678",
  //     image: "/placeholder.svg?height=200&width=200",
  //   },
  //   {
  //     id: 3,
  //     name: "Ms. Emily Rodriguez",
  //     subject: "English",
  //     experience: "8 years",
  //     education: "B.A. in English Literature",
  //     email: "emily.rodriguez@excelacademy.edu",
  //     phone: "(555) 345-6789",
  //     image: "/placeholder.svg?height=200&width=200",
  //   },
  //   {
  //     id: 4,
  //     name: "Dr. James Wilson",
  //     subject: "Physics",
  //     experience: "10 years",
  //     education: "Ph.D. in Theoretical Physics",
  //     email: "james.wilson@excelacademy.edu",
  //     phone: "(555) 456-7890",
  //     image: "/placeholder.svg?height=200&width=200",
  //   },
  //   {
  //     id: 5,
  //     name: "Mrs. Lisa Thompson",
  //     subject: "History",
  //     experience: "14 years",
  //     education: "M.A. in History",
  //     email: "lisa.thompson@excelacademy.edu",
  //     phone: "(555) 567-8901",
  //     image: "/placeholder.svg?height=200&width=200",
  //   },
  //   {
  //     id: 6,
  //     name: "Mr. David Kim",
  //     subject: "Computer Science",
  //     experience: "7 years",
  //     education: "M.S. in Computer Science",
  //     email: "david.kim@excelacademy.edu",
  //     phone: "(555) 678-9012",
  //     image: "/placeholder.svg?height=200&width=200",
  //   },
  // ]

  const handleDelete = async (teacher: Teacher) => {

    try {
      const response = await fetch(`/api/teacher/${teacher._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Không thể thuốc")
      }

      fetchTeachers()
      // closeMedicineDetailDialog()
      alert("Đã xóa thành công")

    } catch (error) {
      alert("Lỗi khi xóa thuốc")
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
            <h1 className="text-2xl font-bold tracking-tight">Giáo viên</h1>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/admin/teachers/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Thêm mới giáo viên
            </Link>
          </Button>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search teachers..." className="w-full bg-background pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div> */}

        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên giáo viên</TableHead>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Kinh nghiệm</TableHead>
                  <TableHead>Học vấn</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher._id?.toString()}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={teacher.image || "/placeholder.svg"}
                            alt={teacher.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        {teacher.name}
                      </div>
                    </TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.experience}</TableCell>
                    <TableCell>{teacher.education}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/teachers/${teacher._id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/teachers/edit/${teacher._id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button onClick={() => handleDelete(teacher)} variant="outline" size="sm" className="text-red-500 hover:text-red-700">
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

// function GraduationCapIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
//       <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
//     </svg>
//   )
// }

// function MenuIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   )
// }
