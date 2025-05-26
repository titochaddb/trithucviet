'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import AdminHeader from "@/app/admin/header"
import StudentListForm from "@/components/StudentListForm"
import { useEffect, useState } from "react"
import { Class } from "@/lib/type"
import { useParams, useRouter } from "next/navigation"

export default function EditClassPage({ params }: { params: { id: string } }) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const router = useRouter()
  const param = useParams()
  const classId = param?.id as string
  const [thisClass, setThisClass] = useState<Class | null>(null)
  // Sample data - in a real app, this would come from a database
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [room, setRoom] = useState("")

  // Get class details based on ID

  const getClassById = async (id: string) => {
    // setLoading(true)
    try {
      const res = await fetch(`/api/class/${id}`)
      const data = await res.json()
      setThisClass(data.thisClass)
      setInfo(data.thisClass)
    } catch (err) {
      console.error("Error fetching teacher:", err)
      alert("Không tìm thấy lớp học")
    }
  }

  useEffect(() => {
    if (classId) {
      getClassById(classId)
    }
  }, [classId])

  const setInfo = (thisClass: Class) => {
    setSubject(thisClass.subject)
    setGrade(thisClass.grade)
    setTeacherName(thisClass.teacherName)
    setRoom(thisClass.room)
    setSelectedStudents(thisClass.studentIds || []);
  }
  // Sample teachers for dropdown
  const handleSave = async () => {
    if (!grade || !subject || !teacherName) {
      alert("Nhập tên giáo viên và môn học");
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

      const response = await fetch(`/api/class/${thisClass?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      })

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi sửa giáo viên")
      }
      // closeAddMedicineDialog()
      alert("Đã sửa thành công")
      router.push("/admin/classes")
      clearForm()

      // console.log(data.result.insertedId)
      updateClassIdToStudent(thisClass?._id?.toString() || ""); ;
    } catch (error) {
      console.error("Lỗi sửa", error);
    }
  }

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
            <h1 className="text-2xl font-bold tracking-tight">Sửa thông tin lớp học</h1>
          </div>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
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
            <CardHeader>
              <CardTitle>Danh sách học sinh của lớp</CardTitle>
            </CardHeader>
            <CardContent className="h-[600] overflow-y-auto">
              <StudentListForm value={selectedStudents} 
              onChange={(updatedStudents) => setSelectedStudents(updatedStudents)} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

