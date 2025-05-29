"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Teacher } from "@/lib/type"
import { Edit, Trash2, User, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import AdminHeader from "../header"
import toast from "react-hot-toast"

export default function TeachersPage() {
  const [loading, setLoading] = useState(true)
  const [teachers, seTeachers] = useState<Teacher[]>([])
  // const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)


  const fetchTeachers = async () => {
    setLoading(true)
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
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchTeachers()
  }, [])

  const handleDelete = async (teacher: Teacher) => {

    try {
      const response = await fetch(`/api/teacher/${teacher._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Không thể xóa")
      }

      fetchTeachers()
      // closeMedicineDetailDialog()
      toast.success("Đã xóa thành công")

    } catch (error) {
      toast.error("Lỗi khi xóa")
    }

  }

  return (
    <div className="flex min-h-screen w-full flex-col">
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

        {loading ? (
          <div className="py-6 px-4">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 border-b pb-3"
                >
                  <div className="w-10 h-4 bg-gray-200 rounded" />
                  <div className="w-48 h-4 bg-gray-200 rounded" />
                  <div className="w-64 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (<div className="rounded-md border">
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
                        {/* <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/teachers/${teacher._id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button> */}
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
        </div>)}
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
