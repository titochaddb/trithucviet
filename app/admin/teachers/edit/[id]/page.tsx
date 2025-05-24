"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Upload } from "lucide-react"
import AdminHeader from "@/app/admin/header"
import { useEffect, useState } from "react"
import { Teacher } from "@/lib/type"
import { useParams } from "next/navigation"
import { uploadImageToCloudinary } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function EditTeacherPage({ params }: { params: { id: string } }) {
  const [teacher, seTeacher] = useState<Teacher | null>(null)

  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [experience, setExperience] = useState("")
  const [education, setEducation] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [yearofbirth, setYearOfBirth] = useState("")
  const [address, setAddress] = useState("")
  const [certifications, setCertifications] = useState("")
  const [specialties, setSpecialties] = useState("")
  const [bio, setBio] = useState("")
  // Sample data - in a real app, this would come from a database
  const param = useParams()
  const teacherId = param?.id as string

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // tạo URL preview từ file local
    }
  };

  const setInfo = (teacher: Teacher) => {
    setName(teacher.name)
    setSubject(teacher.subject)
    setExperience(teacher.experience)
    setEducation(teacher.education)
    setEmail(teacher.email)
    setPhone(teacher.phone)
    setYearOfBirth(teacher.yearOfBirth)
    setAddress(teacher.address)
    setCertifications(teacher.certifications)
    setSpecialties(teacher.specialties)
    setBio(teacher.bio)
    setPreviewUrl(teacher.image)
  }

  const router = useRouter()

  const getTeacherById = async (id: string) => {
    // setLoading(true)
    try {
      const res = await fetch(`/api/teacher/${id}`)
      const data = await res.json()
      seTeacher(data.teacher)
      setInfo(data.teacher)
    } catch (err) {
      console.error("Error fetching teacher:", err)
      alert("Không tìm thấy giáo viên")
    }
  }

  useEffect(() => {
    if (teacherId) {
      getTeacherById(teacherId)
    }
  }, [teacherId])

  const handleSave = async () => {
    if (!name || !subject) {
      alert("Nhập tên giáo viên và môn học");
      return;
    }

    try {
      let uploadedImageUrl = teacher?.image || "";

      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
      }
      const newTeacher = {
        name: name,
        subject: subject,
        experience: experience,
        education: education,
        email: email,
        phone: phone,
        image: uploadedImageUrl,
        yearOfBirth: yearofbirth,
        address: address,
        certifications: certifications,
        specialties: specialties,
        bio: bio,
      };

      const response = await fetch(`/api/teacher/${teacher?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      })

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi sửa giáo viên")
      }
      // closeAddMedicineDialog()
      alert("Đã sửa thành công")
      router.push("/admin/teachers")
      clearForm()
    } catch (error) {
      console.error("Lỗi sửa", error);
    }
  }

  const clearForm = () => {
    setName("");
    setSubject("");
    setEducation("");
    setExperience("");
    setPhone("");
    setEmail("");
    setImageFile(null);
    setPreviewUrl("");
    setYearOfBirth("");
    setAddress("");
    setPhone("");
    setCertifications("");
    setSpecialties("");
    setBio("");
  };
  // Get teacher details based on ID
  // const teacher = {
  //   id: teacherId,
  //   name: "Dr. Sarah Johnson",
  //   subject: "Mathematics",
  //   experience: "15 years",
  //   education: "Ph.D. in Mathematics Education",
  //   email: "sarah.johnson@excelacademy.edu",
  //   phone: "(555) 123-4567",
  //   address: "123 Educator Lane, Teaching City, TC 54321",
  //   bio: "Dr. Sarah Johnson is an experienced mathematics educator with a passion for making complex concepts accessible to students of all levels. With 15 years of teaching experience and a Ph.D. in Mathematics Education, she specializes in developing innovative teaching methods that engage students and foster a deep understanding of mathematical principles.",
  //   image: "/placeholder.svg?height=200&width=200",
  //   joinDate: "January 10, 2020",
  //   certifications: "National Board Certified Teacher, Advanced Mathematics Instructor",
  //   specialties: "Algebra, Geometry, Calculus",
  // }
  if (!teacher) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2 text-gray-600">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span>Đang tải thông tin giáo viên...</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-2">
            <Link href="/admin/teachers">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Trở lại trang giáo viên
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sửa thông tin giáo viên</h1>
            </div>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              <Save className="mr-2 h-4 w-4" />
              Lưu thông tin giáo viên
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên giáo viên</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearofbirth">Năm sinh</Label>
                  <Input value={yearofbirth} onChange={(e) => setYearOfBirth(e.target.value)} id="yearofbirth" placeholder="Nhập năm sinh" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Điện thoại</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} id="address" placeholder="Enter address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Enter email address" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin nâng cao</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Môn học</Label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} id="subject" placeholder="Nhập môn giảng dạy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Kinh nghiệm</Label>
                  <Input value={experience} onChange={(e) => setExperience(e.target.value)} id="experience" placeholder="Kinh nghiệm giảng dạy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Học vấn</Label>
                  <Input value={education} onChange={(e) => setEducation(e.target.value)} id="education" placeholder="Trình độ cao nhất" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">Chứng chỉ</Label>
                  <Input value={certifications} onChange={(e) => setCertifications(e.target.value)} id="certifications" placeholder="Nhập chứng chỉ" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialties">Chuyên nghành</Label>
                  <Input value={specialties} onChange={(e) => setSpecialties(e.target.value)} id="specialties" placeholder="Nhập chuyên nghành" />
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Hình ảnh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="imageUpload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer inline-flex items-center px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-100">
                      <Upload className="mr-2 h-4 w-4" />
                      Chọn ảnh
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Gợi ý ảnh vuông ít nhất 300x300 pixels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Tiểu sử</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea value={bio} onChange={(e) => setBio(e.target.value)} id="bio" rows={5} placeholder="Nhập tiểu sử giáo viên" />
                </div>
              </CardContent>
            </Card>


          </div>
        </main>
      </div>
    )
  }
}


