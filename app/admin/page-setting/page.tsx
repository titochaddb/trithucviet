"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Upload, Plus, Trash2, Edit, Eye, ImageIcon, GraduationCap } from "lucide-react"
import AdminHeader from "../header"
import { Class, PageSettings, Teacher } from "@/lib/type"
import { uploadImageToCloudinary } from "@/lib/utils"

export default function PageSettingsPage() {
    const [pageSettings, setPageSettings] = useState<PageSettings | null>(null)
    const [loading, setLoading] = useState(true)
    // const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
    // const [selectedClasses, setSelectedClasses] = useState<string[]>([])
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([])
    const [allClasses, setAllClasses] = useState<Class[]>([])
    const [emptyFiles, setEmptyFiles] = useState<File[]>([
        new File([], ""),
        new File([], ""),
        new File([], "")
    ])
    const [isSaving, setIsSaving] = useState(false);

    const getAllClasses = async () => {
        setLoading(true)
        try {
            // const params = new URLSearchParams()
            // if (searchKeyword) params.set("search", searchKeyword)
            // params.set("page", currentPage.toString())
            // params.set("limit", limit.toString())

            const res = await fetch(`/api/class`)
            // const res = await fetch(`/api/teacher?${params.toString()}`)
            const data = await res.json()

            setAllClasses(data.classes)
            // setTotalPages(data.totalPages)
        }
        catch (err) {
            console.error("Error fetching classes:", err)
            // showAlert("Lỗi khi tải danh sách thuốc", "error")
        }
        // finally {
        //     setLoading(false)
        // }

    }
    const getPageSettings = async () => {
        // setLoading(true)
        try {
            // const params = new URLSearchParams()
            // if (searchKeyword) params.set("search", searchKeyword)
            // params.set("page", currentPage.toString())
            // params.set("limit", limit.toString())

            const res = await fetch(`/api/page-setting`)
            // const res = await fetch(`/api/teacher?${params.toString()}`)
            const data = await res.json()
            setPageSettings(data.pageSettings[0])
            // setTotalPages(data.totalPages)
        }
        catch (err) {
            console.error("Error fetching medicines:", err)
            // showAlert("Lỗi khi tải danh sách thuốc", "error")
        }
        finally {
            setLoading(false)
            // console.log("Page settings:", pageSettings)
        }

    }

    const getAllTeachers = async () => {
        // setLoading(true)
        try {
            // const params = new URLSearchParams()
            // if (searchKeyword) params.set("search", searchKeyword)
            // params.set("page", currentPage.toString())
            // params.set("limit", limit.toString())

            const res = await fetch(`/api/teacher`)
            // const res = await fetch(`/api/teacher?${params.toString()}`)
            const data = await res.json()
            // console.log("All teachers data:", data)
            setAllTeachers(data.teachers)
            // setTotalPages(data.totalPages)
        }
        catch (err) {
            console.error("Error fetching medicines:", err)
            // showAlert("Lỗi khi tải danh sách thuốc", "error")
        }
        // finally {
        //     setLoading(false)
        // }

    }
    // Sample data - in a real app, this would come from a database
    const banners = [
        1, 2, 3
    ]

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, bannerId: number) => {
        const file = event.target.files?.[0]
        if (file) {
            setEmptyFiles(prevFiles => {
                const newFiles = [...prevFiles];
                newFiles[bannerId - 1] = file;
                return newFiles;
            });

            const reader = new FileReader()
            reader.onload = (e) => {
                // if (!pageSettings) {
                //     setPageSettings({ urlImage: [] })
                // }
                const updatedImages = [...(pageSettings?.urlImage || [])]
                updatedImages[bannerId - 1] = e.target?.result as string
                setPageSettings({
                    ...pageSettings,
                    urlImage: updatedImages,
                })

                // setSelectedImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllTeachers();
                await getAllClasses();
                await getPageSettings();                // Gọi sau khi hai cái trên hoàn tất
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
            }
        };

        fetchData();
        // console.log("All teachers:", allTeachers);
    }, [])

    useEffect(() => {
        if (isSaving) {
            (async () => {
                try {
                    const response = await fetch(`/api/page-setting`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(pageSettings),
                    });
                    if (!response.ok) throw new Error("Lỗi lưu cài đặt");
                    alert("Lưu thành công!");
                } catch (error) {
                    alert("Lỗi khi lưu cài đặt trang");
                } finally {
                    setIsSaving(false);
                }
            })();
        }
    }, [isSaving, pageSettings]);

    const handleTeacherSelection = (teacherId: string, checked: boolean) => {
        const updatedTeacher = [...(pageSettings?.teacherIds || [])]
        if (checked) {
            updatedTeacher.push(teacherId)
            setPageSettings({
                ...pageSettings,
                teacherIds: updatedTeacher,
            })

            // setSelectedTeachers([...selectedTeachers, teacherId])
        } else {
            updatedTeacher.splice(updatedTeacher.indexOf(teacherId), 1)
            setPageSettings({
                ...pageSettings,
                teacherIds: updatedTeacher,
            })
            // setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId))
        }
    }

    const handleClassSelection = (classId: string, checked: boolean) => {
        const updatedClasses = [...(pageSettings?.classIds || [])]
        if (checked) {
            updatedClasses.push(classId)
            setPageSettings({
                ...pageSettings,
                classIds: updatedClasses,
            })
            // setSelectedClasses([...selectedClasses, classId])
        } else {
            updatedClasses.splice(updatedClasses.indexOf(classId), 1)
            setPageSettings({
                ...pageSettings,
                classIds: updatedClasses,
            })
            // setSelectedClasses(selectedClasses.filter((id) => id !== classId))
        }
    }

    const handleSave = async () => {
        let updatedImages = [...(pageSettings?.urlImage || [])];
        if (emptyFiles.every(file => file.size === 0)) {
            console.log("Tất cả các file đều rỗng.");
        } else {

            for (let i = 0; i < emptyFiles.length; i++) {
                const file = emptyFiles[i];
                if (file.size > 0) {
                    try {
                        const imageUrl = await uploadImageToCloudinary(file);
                        console.log(`Image URL for banner ${i + 1}:`, imageUrl);
                        // const updatedImages = [...(pageSettings?.urlImage || [])];
                        updatedImages[i] = imageUrl;

                    } catch (error) {
                        console.error("Error uploading image:", error);
                        alert("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
                    }
                }
            }
        }
        setPageSettings(prev => ({
            ...prev,
            urlImage: updatedImages,
        }));

        // try {
        //     const response = await fetch(`/api/page-setting`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(pageSettings),
        //     });

        //     if (!response.ok) {
        //         throw new Error("Có lỗi xảy ra khi lưu cài đặt trang");
        //     }

        //     alert("Cài đặt trang đã được lưu thành công!");
        // } catch (error) {
        //     console.error("Lỗi khi lưu cài đặt trang:", error);
        //     alert("Lỗi khi lưu cài đặt trang. Vui lòng thử lại sau.");
        // }
        setIsSaving(true);
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AdminHeader />

            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Page Settings</h1>
                        <p className="text-muted-foreground">Manage content displayed on your homepage</p>
                    </div>
                    <div className="flex gap-2">
                        {/* <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview Page
                        </Button> */}
                        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                            <Save className="mr-2 h-4 w-4" />
                            Lưu Cài Đặt
                        </Button>
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
                ) : (<Tabs defaultValue="banners" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="banners">Banners</TabsTrigger>
                        <TabsTrigger value="teachers">Giáo viên</TabsTrigger>
                        <TabsTrigger value="classes">Lớp học</TabsTrigger>
                    </TabsList>

                    <TabsContent value="banners" className="mt-6">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">Quản lý banner</h3>
                                    {/* <p className="text-sm text-muted-foreground">Manage the rotating banners on your homepage</p> */}
                                </div>
                                {/* <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Banner
                                </Button> */}
                            </div>

                            <div className="grid gap-6">
                                {banners.map((banner) => (
                                    <Card key={banner}>
                                        <CardContent className="p-6">
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {/* <span className="text-sm text-muted-foreground">Banner {banner}</span> */}
                                                        <Label>Banner {banner}</Label>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    {/* Banner Content */}
                                                    {/* <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`banner-title-${banner.id}`}>Title</Label>
                                                            <Input id={`banner-title-${banner.id}`} defaultValue={'banner.title'} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`banner-description-${banner.id}`}>Description</Label>
                                                            <Textarea
                                                                id={`banner-description-${banner.id}`}
                                                                defaultValue={'banner.description'}
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </div> */}

                                                    {/* Image Upload and Preview */}
                                                    <div className="lg:col-span-5 space-y-4">
                                                        <Label>Banner Image</Label>
                                                        <div className="space-y-4">
                                                            {/* Image Preview */}
                                                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10 bg-white">
                                                                {pageSettings?.urlImage && pageSettings.urlImage[banner - 1] ? (
                                                                    <Image
                                                                        src={pageSettings.urlImage[banner - 1] || ''}
                                                                        alt={'banner.title'}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full">
                                                                        <div className="text-center">
                                                                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                                                            <p className="text-sm text-gray-500">No image selected</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Upload Controls */}
                                                            <div className="flex gap-2">
                                                                <div className="flex-1">
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleImageUpload(e, banner)}
                                                                        className="hidden"
                                                                        id={`image-upload-${banner}`}
                                                                    />
                                                                    <Label
                                                                        htmlFor={`image-upload-${banner}`}
                                                                        className="flex items-center justify-center w-full h-10 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                                                                    >
                                                                        <Upload className="mr-2 h-4 w-4" />
                                                                        Upload Image
                                                                    </Label>
                                                                </div>
                                                                {/* {pageSettings?.urlImage && pageSettings.urlImage[banner - 1] && (
                                                                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                                                                        Clear
                                                                    </Button>
                                                                )} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="teachers" className="mt-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold">Chọn giáo viên để hiển thị</h3>
                                {/* <p className="text-sm text-muted-foreground">
                                    Choose which teachers to feature on the homepage ({selectedTeachers.length} selected)
                                </p> */}
                            </div>

                            <div className="grid gap-4">
                                {allTeachers.map((teacher) => (
                                    <Card
                                        key={teacher._id?.toString()}
                                        className={pageSettings?.teacherIds?.includes(teacher?._id?.toString() ?? "") ? "ring-2 ring-purple-500" : ""}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <Checkbox
                                                    id={`teacher-${teacher._id}`}
                                                    checked={pageSettings?.teacherIds?.includes(teacher?._id?.toString() ?? "")}
                                                    onCheckedChange={(checked) => handleTeacherSelection(teacher._id?.toString() ?? "", checked as boolean)}
                                                />
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                                            <Image
                                                                src={teacher.image || ""}
                                                                alt={teacher.name}
                                                                width={64}
                                                                height={64}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold">{teacher.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Experience</p>
                                                        <p className="text-sm text-muted-foreground">{teacher.experience}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Education</p>
                                                        <p className="text-sm text-muted-foreground">{teacher.education}</p>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <Badge variant={pageSettings?.teacherIds?.includes(teacher?._id?.toString() ?? "") ? "default" : "secondary"}>
                                                            {pageSettings?.teacherIds?.includes(teacher?._id?.toString() ?? "") ? "Selected" : "Not Selected"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="classes" className="mt-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold">Chọn lớp học để hiển thị</h3>
                                {/* <p className="text-sm text-muted-foreground">
                                    Choose which classes to feature on the homepage ({selectedClasses.length} selected)
                                </p> */}
                            </div>

                            <div className="grid gap-4">
                                {allClasses.map((classItem) => (
                                    <Card
                                        key={classItem._id?.toString()}
                                        className={pageSettings?.classIds?.includes(classItem?._id?.toString() ?? "") ? "ring-2 ring-purple-500" : ""}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <Checkbox
                                                    id={`class-${classItem._id}`}
                                                    checked={pageSettings?.classIds?.includes(classItem?._id?.toString() ?? "")}
                                                    onCheckedChange={(checked) => handleClassSelection(classItem._id?.toString() ?? "", checked as boolean)}
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-semibold">{classItem.subject}</h4>
                                                            <Badge variant="outline">{classItem.grade}</Badge>
                                                        </div>
                                                        <Badge variant={pageSettings?.classIds?.includes(classItem?._id?.toString() ?? "") ? "default" : "secondary"}>
                                                            {pageSettings?.classIds?.includes(classItem?._id?.toString() ?? "") ? "Selected" : "Not Selected"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{classItem.teacherName}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>)}
            </main>
        </div>
    )
}
