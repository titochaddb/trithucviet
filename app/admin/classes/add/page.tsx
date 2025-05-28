'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import AdminHeader from "../../header"
import StudentListForm from "@/components/StudentListForm"
import { useState } from "react"

export default function AddClassPage() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [room, setRoom] = useState("")
  // Sample teachers for dropdown
  const handleAdd = async () => {
    if (!subject || !grade || !teacherName) {
      alert("Nhập môn học, khối và tên giáo viên");
      return;
    }
    try {
      const newClass = {
        subject: subject,
        grade: grade,
        teacherName: teacherName,
        room: room,
        studentIds: selectedStudents,
      };
      console.log(newClass)

      const response = await fetch(`/api/class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      })



      if (!response.ok) {
        throw new Error("Không thể thêm lớp học")
      }
      
      // closeAddMedicineDialog()
      alert("Đã thêm thành công")

      clearForm()
      const data = await response.json()
      console.log(data.result.insertedId)
      updateClassIdToStudent(data.result.insertedId);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const updateClassIdToStudent = async (classId: string) => {
    try {
      const updatePromises = selectedStudents.map((studentId) =>

        fetch(`/api/student/${studentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classId }),
        })
      );

      const results = await Promise.all(updatePromises);

      const hasError = results.some((res) => !res.ok);
      if (hasError) {
        alert("Có lỗi xảy ra khi cập nhật học sinh với classId.");
      } else {
        console.log("Cập nhật classId cho học sinh thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật classId cho học sinh:", error);
      alert("Lỗi khi cập nhật classId cho học sinh.");
    }
  }

  const clearForm = () => {
    setSubject("");
    setGrade("");
    setTeacherName("");
    setRoom("");
    setSelectedStudents([]);
    // setAddress("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href="/admin/classes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Trở lại danh sách lớp học
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Thêm mới lớp học</h1>
          </div>
          <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
            <Save className="mr-2 h-4 w-4" />
            Lưu thông tin
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Môn học</Label>
                <Input id="subject" placeholder="Nhập môn học" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Khối</Label>
                <Input id="grade" placeholder="Nhập khối" value={grade} onChange={(e) => setGrade(e.target.value)} />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter class description" />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="teacher">Giáo viên</Label>
                <Input id="teacher" placeholder="Nhập tên giáo viên" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Phòng học</Label>
                <Input id="room" placeholder="Nhập phòng học" value={room} onChange={(e) => setRoom(e.target.value)} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-[600] overflow-y-auto">
              <StudentListForm value={selectedStudents} onChange={(updatedStudents) => setSelectedStudents(updatedStudents)} />
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader>
              <CardTitle>Enrollment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Maximum Students</Label>
                <Input id="maxStudents" type="number" placeholder="Enter maximum number of students" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Required Materials</Label>
                <Textarea id="materials" placeholder="Enter required materials for the class" />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Syllabus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="syllabus">Course Syllabus</Label>
                <Textarea id="syllabus" rows={8} placeholder="Enter course syllabus and weekly breakdown" />
              </div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  )
}

