'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Search, Edit, Trash2, Mail, Phone, BookOpen, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JSX, SVGProps, useEffect, useState } from "react"
import AdminHeader from "../header"
import { Student, Teacher } from "@/lib/type"

export default function StudentsPage() {
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState<Student[]>([])
  // Sample data - in a real app, this would come from a database
  const fetchStudents = async () => {
    setLoading(true)
    try {
      // const params = new URLSearchParams()
      // if (searchKeyword) params.set("search", searchKeyword)
      // params.set("page", currentPage.toString())
      // params.set("limit", limit.toString())

      const res = await fetch(`/api/student`)
      // const res = await fetch(`/api/teacher?${params.toString()}`)
      const data = await res.json()

      setStudents(data.students)
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
    fetchStudents()
  }, [])
  const handleDelete = async (student: Student) => {
    try {
      const response = await fetch(`/api/student/${student._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Không thể xóa học sinh")
      }

      fetchStudents()
      // closeMedicineDetailDialog()
      alert("Đã xóa thành công")

    } catch (error) {
      alert("Lỗi khi xóa")
    }
    // Implement delete functionality here
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quản lý học sinh</h1>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/admin/students/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Thêm mới học sinh
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Tìm kiếm học sinh ..." className="w-full bg-background pl-8 md:w-[300px]" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Khối</SelectItem>
                <SelectItem value="8th">Lớp 8</SelectItem>
                <SelectItem value="9th">Lớp 9</SelectItem>
                {/* <SelectItem value="10th">10th Grade</SelectItem> */}
              </SelectContent>
            </Select>
            {/* <Select defaultValue="all">
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
            </Select> */}
            {/* <Select defaultValue="all">
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
            </Select> */}
          </div>
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
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Khối</TableHead>
                  {/* <TableHead>Class</TableHead> */}
                  {/* <TableHead>Performance</TableHead> */}
                  <TableHead>Phụ huynh</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id?.toString()}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {/* <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={student.image || "/placeholder.svg"}
                            alt={student.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div> */}
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        {student.grade}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        {student.class}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPerformanceBadgeColor(student.performance)}>
                        {student.performance}
                      </Badge>
                    </TableCell> */}
                    <TableCell>{student.parentName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {/* <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-500" />
                          <span className="text-xs">{student.parentEmail}</span>
                        </div> */}
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-500" />
                          <span className="text-xs">{student.parentPhone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/students/${student._id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/students/edit/${student._id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button onClick={() => handleDelete(student)} variant="outline" size="sm" className="text-red-500 hover:text-red-700">
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

