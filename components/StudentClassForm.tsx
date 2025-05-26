import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { Class } from "@/lib/type"

interface PropsClass {
  value: string[]; // Mảng chứa classId
  onChange: (classIds: string[]) => void;
}

export default function StudentClassesForm({ value, onChange }: PropsClass) {
  const [allClasses, setAllClasses] = useState<Class[]>([])
  const [studentClasses, setStudentClasses] = useState<{ id: number; classId: string }[]>([])

  const getAllClasses = async () => {
    try {
      const res = await fetch(`/api/class`)
      const data = await res.json()
      setAllClasses(data.classes)
    } catch (err) {
      console.error("Error fetching classes:", err)
      alert("Không tìm thấy lớp học")
    }
  }

  useEffect(() => {
    getAllClasses()
  }, [])

  // Đồng bộ props.value vào studentClasses khi value thay đổi
  useEffect(() => {
    try {
      console.log(value.length)
    const currentClassIds = studentClasses.map((c) => c.classId).filter(Boolean)

    const isSame =
      currentClassIds.length === value.length &&
      currentClassIds.every((id) => value.includes(id))

    if (!isSame) {
      setStudentClasses(
        value.length > 0
          ? value.map((classId, index) => ({
            id: Date.now() + index,
            classId
          }))
          : [{ id: Date.now(), classId: "" }]
      )
    }
    console.log(value)
    }
    catch (error) {
        console.log('Error in StudentClassesForm:', error)
    }
    
  }, [value])

  // Gọi onChange mỗi khi studentClasses thay đổi
  useEffect(() => {
    const classIds = studentClasses.map((c) => c.classId).filter(Boolean)
    onChange(classIds)
  }, [studentClasses])

  const handleAddClass = () => {
    setStudentClasses([...studentClasses, { id: Date.now(), classId: "" }])
  }

  const handleRemoveClass = (id: number) => {
    setStudentClasses(studentClasses.filter((c) => c.id !== id))
  }

  const handleClassChange = (id: number, classId: string) => {
    setStudentClasses(
      studentClasses.map((c) => (c.id === id ? { ...c, classId } : c))
    )
  }

  return (
    <div className="space-y-4">
      <Label className="text-base">Danh sách các lớp</Label>
      {studentClasses.map((classItem) => (
        <div key={classItem.id} className="flex items-center gap-4">
          <Select
            value={classItem.classId || ""}
            onValueChange={(val) => handleClassChange(classItem.id, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn lớp học" />
            </SelectTrigger>
            <SelectContent>
              {allClasses
                .filter(
                  (c) =>
                    c._id &&
                    (c._id.toString() === classItem.classId ||
                      !studentClasses.some((s) => s.classId === c._id!.toString()))
                )
                .map((c) => (
                  <SelectItem key={c._id!.toString()} value={c._id!.toString()}>
                    {c.subject} ({c.teacherName}) - {c.grade}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {studentClasses.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveClass(classItem.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={handleAddClass}>
        <Plus className="mr-2 h-4 w-4" />
        Thêm lớp
      </Button>
    </div>
  )
}
