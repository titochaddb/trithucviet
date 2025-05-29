'use client'

import StudentClassesForm from "@/components/StudentClassForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import AdminHeader from "../../header"
import toast from "react-hot-toast"

export default function AddStudentPage() {
  // Sample data - in a real app, this would come from a databaseconst [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [name, setName] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [yearofbirth, setYearOfBirth] = useState("")
  const [address, setAddress] = useState("")
  const [grade, setGrade] = useState("")
  const [parentName, setParentName] = useState("")


  const handleAdd = async () => {
    if (!name || !yearofbirth) {
      toast.error("Nhập tên học sinh và năm sinh");
      return;
    }
    try {
      const newStudent = {
        name: name,
        parentPhone: parentPhone,
        yearofbirth: yearofbirth,
        address: address,
        yearOfBirth: yearofbirth,
        grade: grade,
        parentName: parentName,
        classIds: selectedClasses,
      };

      const response = await fetch(`/api/student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      })

      if (!response.ok) {
        throw new Error("Không thể thêm học sinh")
      }
      // closeAddMedicineDialog()
      toast.success("Đã thêm thành công")
      clearForm()
      const data = await response.json()
      console.log(data.result.insertedId)
      updateStudentIdToClass(data.result.insertedId);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const updateStudentIdToClass = async (studentId: string) => {
    try {
      const updatePromises = selectedClasses.map((classId) =>

        fetch(`/api/class/${classId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId }),
        })
      );

      const results = await Promise.all(updatePromises);

      const hasError = results.some((res) => !res.ok);
      if (hasError) {
        toast.error("Có lỗi xảy ra khi cập nhật học sinh với classId.");
      } else {
        console.log("Cập nhật classId cho học sinh thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật classId cho học sinh:", error);
      toast.error("Lỗi khi cập nhật classId cho học sinh.");
    }
  }
  const clearForm = () => {
    setName("");
    setParentPhone("");
    setParentName("");
    setYearOfBirth("");
    setAddress("");
    setSelectedClasses([]);
  };
  // Sample classes for dropdown

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
            <h1 className="text-2xl font-bold tracking-tight">Thêm mới học sinh</h1>
          </div>
          <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
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
                <Label htmlFor="grade">Khối</Label>
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
                <Textarea
                  id="medicalInfo"
                  rows={4}
                  placeholder="Enter any medical information, allergies, or special needs"
                />
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
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
