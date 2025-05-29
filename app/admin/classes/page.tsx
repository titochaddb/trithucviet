'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Class } from "@/lib/type"
import { BookOpen, Edit, FolderPlus, Search, Trash2, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import AdminHeader from "../header"
import toast from "react-hot-toast"

export default function ClassesPage() {  // Sample data - in a real app, this would come from a database
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  const fetchClasses = async () => {
    setLoading(true)
    try {
      // const params = new URLSearchParams()
      // if (searchKeyword) params.set("search", searchKeyword)
      // params.set("page", currentPage.toString())
      // params.set("limit", limit.toString())

      const res = await fetch(`/api/class`)
      // const res = await fetch(`/api/teacher?${params.toString()}`)
      const data = await res.json()

      setClasses(data.classes)
      // setTotalPages(data.totalPages)
    }
    catch (err) {
      console.error("Error fetching classes:", err)
      // showAlert("Lỗi khi tải danh sách thuốc", "error")
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchClasses()
    // fetchTeachers()
  }, [])

  // const getTeacherById = async (id: string) => {
  //   // setLoading(true)
  //   try {
  //     const res = await fetch(`/api/teacher/${id}`)
  //     const data = await res.json()
  //     // seTeacherName(data.teacher.name)
  //     return data.teacher.name
  //   } catch (err) {
  //     console.error("Error fetching teacher:", err)
  //     alert("Không tìm thấy giáo viên")
  //   }
  // }
  const handleDelete = async (thisClass: Class) => {
    try {
      const response = await fetch(`/api/class/${thisClass._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Không thể xóa ")
      }

      fetchClasses()
      // closeMedicineDetailDialog()
      toast.success("Đã xóa thành công")

    } catch (error) {
      toast.error("Lỗi khi xóa")
    }
    // Implement delete functionality here
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quản lý lớp học</h1>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/admin/classes/add">
              <FolderPlus className="mr-2 h-4 w-4" />
              Thêm mới lớp học
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm lớp học ..." className="w-full bg-background pl-8 md:w-[300px]" />
          </div>
          {/* <Button variant="outline" size="sm">
            Filter
          </Button> */}
        </div>

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
                  <TableHead>Môn học</TableHead>
                  <TableHead>Khối</TableHead>
                  <TableHead>Giáo viên</TableHead>
                  {/* <TableHead>Số lượng học sinh</TableHead> */}
                  <TableHead>Room</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem._id?.toString()}>
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
                    <TableCell>{classItem.teacherName}</TableCell>
                    {/* <TableCell>{classItem.teacherName}</TableCell> */}
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {/* <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/classes/${classItem._id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button> */}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/classes/edit/${classItem._id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button onClick={() => handleDelete(classItem)} variant="outline" size="sm" className="text-red-500 hover:text-red-700">
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
