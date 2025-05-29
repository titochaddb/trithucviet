"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Class } from "@/lib/type"
import { BookOpen, Edit, FolderPlus, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import AdminHeader from "../header"
import toast from "react-hot-toast"

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  const fetchClasses = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/class`)
      const data = await res.json()
      setClasses(data.classes)
    } catch (err) {
      console.error("Error fetching classes:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleDelete = async (thisClass: Class) => {
    try {
      const response = await fetch(`/api/class/${thisClass._id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Không thể xóa")
      fetchClasses()
      toast.success("Đã xóa thành công")
    } catch (error) {
      toast.error("Lỗi khi xóa")
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Quản lý lớp học</h1>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto" asChild>
            <Link href="/admin/classes/add">
              <FolderPlus className="mr-2 h-4 w-4" />
              Thêm mới lớp học
            </Link>
          </Button>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm lớp học ..."
            className="w-full pl-10"
          />
        </div>

        {loading ? (
          <div className="py-6 px-4">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 border-b pb-3">
                  <div className="w-10 h-4 bg-gray-200 rounded" />
                  <div className="w-48 h-4 bg-gray-200 rounded" />
                  <div className="w-64 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Khối</TableHead>
                  <TableHead>Giáo viên</TableHead>
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
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        {classItem.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{classItem.teacherName}</TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/classes/edit/${classItem._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          onClick={() => handleDelete(classItem)}
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  )
}
