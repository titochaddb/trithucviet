'use client'

import AdminHeader from "@/app/admin/header"
import StudentClassesForm from "@/components/StudentClassForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Student } from "@/lib/type"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EditStudentPage() {

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [student, setStudent] = useState<Student | null>(null)
  const [name, setName] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [yearofbirth, setYearOfBirth] = useState("")
  const [address, setAddress] = useState("")
  const [grade, setGrade] = useState("")
  const [parentName, setParentName] = useState("")
  // Sample data - in a real app, this would come from a database
  // const studentId = params.id
  const router = useRouter()
  const { id: studentId } = useParams<{ id: string }>()

  // Get student details based on ID
  const getStudentById = async (id: string) => {
    // setLoading(true)
    try {
      const res = await fetch(`/api/student/${id}`)
      const data = await res.json()
      // setStudent(data.student as Student)

      // console.log("Fetched student:", student)
      setInfo(data.student)
    } catch (err) {
      console.error("Error fetching teacher:", err)
      toast.error("Không tìm thấy giáo viên")
    }
  }

  const setInfo = (student: Student) => {
    setStudent(student || null);
    setName(student.name || "");
    setYearOfBirth(student.yearOfBirth || "");;
    setAddress(student.address || "");
    setGrade(student.grade || "");
    setParentName(student.parentName || "");
    setParentPhone(student.parentPhone || "");
    setSelectedClasses(student.classIds || []);
  }

  useEffect(() => {
    if (studentId) {
      getStudentById(studentId)
    }
  }, [studentId])

  const handleSave = async () => {
    if (!name || !yearofbirth) {
      toast.error("Nhập tên học sinh và năm sinh");
      return;
    }
    // console.log("student:", student);
    try {
      const newStudent = {
        name: name,
        yearOfBirth: yearofbirth,
        address: address,
        grade: grade,
        parentName: parentName,
        parentPhone: parentPhone,
        classIds: selectedClasses, // Assuming selectedClasses is an array of class IDs
      };
      // console.log("----------------", student?._id)
      if (student === null || student?._id === undefined) {
        toast.error("Không tìm thấy học sinh để sửa");
        return;
      }
      // console.log("----------------", student._id)
      const response = await fetch(`/api/student/${student._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      })

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi sửa giáo viên")
      }
      // closeAddMedicineDialog()
      toast.success("Đã sửa thành công")
      router.push("/admin/students")
      clearForm()
      // console.log("----------------", student._id)
      updateStudentIdToClass(student._id.toString() || ""); // Update class IDs for the student
    } catch (error) {
      console.error("Lỗi sửa", error);
    }
  }

  const updateStudentIdToClass = async (studentId: string) => {
    try {
      // console.log("link api ", studentId);
      // Bước 1: Lấy tất cả các lớp hiện tại học sinh đã tham gia
      const res = await fetch(`/api/class/student/${studentId}`);
      const data = await res.json(); // [{ _id: "abc", name: "Toán 6A", ... }, ...]
      const currentClasses = data.classes || [];
      console.log("Current classes:", currentClasses);
      const currentClassIds = currentClasses.map((cls: any) => cls.id);
      console.log("Current currentClassIds:", currentClassIds);
      // Bước 2: Tìm ra những lớp cần xóa (không còn được chọn)
      const classesToRemove = currentClassIds.filter(
        (id: string) => !selectedClasses.includes(id)
      );


      // Bước 3: Tìm những lớp cần thêm
      const classesToAdd = selectedClasses.filter(
        (id: string) => !currentClassIds.includes(id)
      );
      console.log("Classes to remove:", classesToRemove);
      // Bước 4: Xóa studentId khỏi các lớp không còn liên quan
      let removePromises: Promise<Response>[] = [];
      if (classesToRemove.length > 0) {
        removePromises = classesToRemove.map((classId: any) =>
          fetch(`/api/class/${classId}/remove-student`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentId }),
          })
        );
      }
      let addPromises: Promise<Response>[] = [];
      if (classesToAdd.length > 0) {
        addPromises = classesToAdd.map((classId) => {
          return fetch(`/api/class/${classId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId }),
          });
        });
      } else {
        addPromises = [];
      }

      const results = await Promise.all([...removePromises, ...addPromises]);

      const hasError = results.some((res) => !res.ok);
      if (hasError) {
        toast.error("Có lỗi xảy ra khi cập nhật học sinh vào các lớp.");
      } else {
        console.log("Cập nhật thành công.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật lớp học:", error);
      toast.error("Lỗi khi cập nhật lớp học.");
    }

    //   const updatePromises = selectedClasses.map((classId) =>

    //     fetch(`/api/class/${classId}`, {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ studentId }),
    //     })
    //   );

    //   const results = await Promise.all(updatePromises);

    //   const hasError = results.some((res) => !res.ok);
    //   if (hasError) {
    //     alert("Có lỗi xảy ra khi cập nhật học sinh với classId.");
    //   } else {
    //     console.log("Cập nhật classId cho học sinh thành công");
    //   }
    // } catch (error) {
    //   console.error("Lỗi khi cập nhật classId cho học sinh:", error);
    //   alert("Lỗi khi cập nhật classId cho học sinh.");
    // }
  }

  const clearForm = () => {
    setName("");
    setYearOfBirth("");
    setAddress("");
    setGrade("");
    setParentName("");
    setParentPhone("");
    setSelectedClasses([]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href="/admin/students">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Trở lại danh sách học sinh
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sửa thông tin học sinh</h1>
          </div>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="mr-2 h-4 w-4" />
            Lưu thông tin
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Năm sinh</Label>
                <Input id="age" type="number" value={yearofbirth} onChange={(e) => setYearOfBirth(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Khối</Label>
                <Input id="grade" type="number" value={grade} onChange={(e) => setGrade(e.target.value)} />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue={student.dateOfBirth} />
              </div> */}

              {/* <div className="space-y-2">
                <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                <Input id="enrollmentDate" type="date" defaultValue={student.enrollmentDate} />
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phụ huynh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Tên phụ huynh</Label>
                <Input id="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="parentEmail">Email</Label>
                <Input id="parentEmail" type="email" defaultValue={student.parentEmail} />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Điện thoại</Label>
                <Input id="parentPhone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" defaultValue={student.emergencyContact} />
              </div> */}
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Danh sách các lớp học sinh tham gia</CardTitle>
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
          </Card> */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách các lớp học sinh tham gia</CardTitle>
            </CardHeader>
            <CardContent>
              <StudentClassesForm value={selectedClasses}
                onChange={(updatedClasses) => setSelectedClasses(updatedClasses)} />
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalInfo">Medical Notes</Label>
                <Textarea id="medicalInfo" rows={4} defaultValue={student.medicalInfo} />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="md:col-span-2">
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
          </Card> */}
        </div>
      </main>
    </div>
  )
}


