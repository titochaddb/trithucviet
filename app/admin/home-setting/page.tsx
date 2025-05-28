'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Banner, Class, Student, Teacher } from "@/lib/type";
import AdminHeader from "../header";


export default function AdminHomeSettings() {
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([])
    const [allClasses, setAllClasses] = useState<Class[]>([])
    const [selectTeachers, setSelectTeachers] = useState<{ id: number; classId: string }[]>([])
    // Banner state
    const [banners, setBanners] = useState<Banner[]>([]);

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

    const getAllClasses = async () => {
        // setLoading(true)
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

    useEffect(() => {
        getAllTeachers()
        getAllClasses()
        // console.log("All teachers:", allTeachers);
    }, [])

    const selectableTeachers = [
        { id: 1, name: "Nguyễn Văn A", subject: "Toán" },
        { id: 2, name: "Trần Thị B", subject: "Văn" },
        { id: 3, name: "Lê Văn C", subject: "Anh" },
    ];
    const dummyCards = [0, 1, 2];

    // Teachers state (3 teachers)
    // const [teachers, setTeachers] = useState<Teacher[]>([
    //     { id: 1, name: "Nguyễn Văn A", subject: "Toán" },
    //     { id: 2, name: "Trần Thị B", subject: "Văn" },
    //     { id: 3, name: "Lê Văn C", subject: "Anh" },
    // ]);

    // // Classes state (3 classes)
    // const [classes, setClasses] = useState<Class[]>([
    //     { id: 1, name: "Lớp 1A", description: "Lớp tiểu học" },
    //     { id: 2, name: "Lớp 6B", description: "Lớp trung học cơ sở" },
    //     { id: 3, name: "Lớp 9C", description: "Lớp ôn thi lớp 10" },
    // ]);

    // Banner update
    const updateBanner = (id: number, field: keyof Banner, value: string) => {
        // setBanners((prev) =>
        //     prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
        // );
    };

    const handleFileChange = (id: number, file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            // setBanners((prev) =>
            //     prev.map((b) => (b.id === id ? { ...b, localImage: base64 } : b))
            // );
        };
        reader.readAsDataURL(file);
    };

    const addBanner = () => {
        // const newId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
        // setBanners([...banners, { id: newId, title: "", description: "", image: "" }]);
    };

    const removeBanner = (id: number) => {
        // setBanners((prev) => prev.filter(b => b.id !== id));
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <AdminHeader />
            <section className="p-6 space-y-6">
                <div className="space-y-6">
                    {banners.map((banner, index) => (
                        <div key={banner.id} className="border rounded-xl p-5 shadow space-y-3 bg-white">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Banner #{index + 1}</span>
                                <Button variant="destructive" size="sm" onClick={() => removeBanner(index)}>Xóa</Button>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const localUrl = URL.createObjectURL(file);
                                        const updated = [...banners];
                                        updated[index] = {
                                            ...updated[index],
                                            localImage: localUrl,
                                            imageFile: file,
                                        };
                                        setBanners(updated);
                                    }
                                }}
                                className="mb-3"
                            />

                            {(banner.localImage || banner.imageFile) && (
                                <img
                                    src={banner.localImage ?? banner.imageFile}
                                    alt={`Banner ${index + 1}`}
                                    className="w-full max-h-48 object-contain rounded border"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex gap-4">
                    <Button
                        onClick={() => {
                            const newId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
                            setBanners([...banners, { id: newId, localImage: "" }]);
                        }}
                    >
                        ➕ Thêm Banner
                    </Button>

                    <Button onClick={() => {
                        alert("Lưu dữ liệu banner thành công!");
                        console.log("Banners:", banners);
                    }}>
                        💾 Lưu thay đổi
                    </Button>
                </div>
            </section>

            {/* Teacher Section */}
            <section className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-6">👩‍🏫 Cấu hình Giáo viên</h1>
                <div className="grid md:grid-cols-3 gap-4">
                    {dummyCards.map((index) => (
                        <div key={index} className="border rounded-xl p-4 shadow bg-white space-y-2">
                            <span className="font-medium block mb-1">Giáo viên #{index + 1}</span>
                            <Select
                            // value={teacherName}
                            // onValueChange={(val) => handleStudentChange(teacher, val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn giáo viên" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* {allTeachers
                                        .filter((s) => !allTeachers.some((t) => t.id !== teacher && t.name === s.name))
                                        .map((s) => (
                                            <SelectItem key={s.id.toString()} value={s.id.toString()}>
                                                {s.name}
                                            </SelectItem>
                                        ))} */}
                                    {allTeachers.length === 0 ? (
                                        <div className="px-4 py-2 text-sm text-gray-500">Đang tải giáo viên...</div>
                                    ) : (allTeachers
                                        // .filter((s) => !allTeachers.some((t) => t.id !== teacher && t.name === s.name))
                                        .map((s) => (
                                            <SelectItem key={s._id?.toString() ?? ""} value={s._id?.toString() ?? ""}>
                                                {s.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>
            </section>

            {/* Class Section */}
            <section className="p-6 space-y-6">
                <h1 className="text-2xl font-bold mb-6">🏫 Cấu hình Lớp học</h1>
                <div className="grid md:grid-cols-3 gap-4">
                    {dummyCards.map((index) => (
                        <div key={index} className="border rounded-xl p-4 shadow bg-white space-y-3">
                            <label className="block font-medium">Tên lớp</label>
                            <Select
                            // value={cls.id.toString()}
                            // onValueChange={(val) => {
                            //     const selectedClass = allClasses.find(c => c.id.toString() === val);
                            //     if (selectedClass) {
                            //         updateClass(cls.id, "name", selectedClass.name);
                            //         updateClass(cls.id, "description", selectedClass.description);
                            //     }
                            // }}
                            >
                                <SelectTrigger className="w-full border rounded px-3 py-2">
                                    <SelectValue placeholder="Chọn lớp học" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allClasses.length === 0 ? (
                                        <div className="px-4 py-2 text-sm text-gray-500">Đang tải danh sách lớp học ...</div>
                                    ) : (allClasses
                                        // .filter((s) => s.id !== cls.id)
                                        .map((s) => (
                                            <SelectItem key={s._id?.toString() ?? ""} value={s._id?.toString() ?? ""}>
                                                {s.subject} ({s.teacherName}) - {s.grade}
                                            </SelectItem>
                                        )))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
