'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Upload } from "lucide-react"
import AdminHeader from "../../header"
import { useState } from "react"
import { uploadImageToCloudinary } from "@/lib/utils"

export default function AddTeacherPage() {
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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // tạo URL preview từ file local
    }
  };

  // const uploadImageToCloudinary = async (): Promise<string> => {
  //   if (!imageFile) return "";

  //   const formData = new FormData();
  //   formData.append("file", imageFile);
  //   formData.append("upload_preset", "Note-preset"); // đổi thành preset của bạn

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/dxtkqurf4/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );

  //   const data = await res.json();

  //   if (data.secure_url) {
  //     return data.secure_url;
  //   }
  //   throw new Error("Upload ảnh thất bại");
  // };

  const clearForm = () => {
    setName("");
    setSubject("");
    setEducation("");
    setExperience("");
    setPhone("");
    setEmail("");
    setImageFile(null);
    setPreviewUrl(null);
    setYearOfBirth("");
    setAddress("");
    setPhone("");
    setCertifications("");
    setSpecialties("");
    setBio("");
  };

  const handleAdd = async () => {
    if (!name || !subject) {
      alert("Nhập tên giáo viên và môn học");
      return;
    }
    try {
      let uploadedImageUrl = "";

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

      const response = await fetch(`/api/teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      })

      if (!response.ok) {
        throw new Error("Không thể thêm thuốc")
      }
      // closeAddMedicineDialog()
      alert("Đã thêm thành công")
      clearForm()
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
            <h1 className="text-2xl font-bold tracking-tight">Thêm giáo viên</h1>
          </div>
          <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
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
