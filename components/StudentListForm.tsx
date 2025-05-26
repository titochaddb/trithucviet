'use client'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { Student } from "@/lib/type"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropsStudent {
  value: string[]; // Mảng chứa classId
  onChange: (classIds: string[]) => void;
}

export default function StudentListForm({ value, onChange }: PropsStudent) {
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [classStudents, setClassStudents] = useState<{ id: number; studenId: string }[]>([])

  const getAllStudents = async () => {
    try {
      const res = await fetch(`/api/student`)
      const data = await res.json()
      setAllStudents(data.students)
    } catch (err) {
      console.error("Error fetching classes:", err)
      alert("Không tìm thấy lớp học")
    }
  }
  useEffect(() => {
    getAllStudents()
  }, [])

  useEffect(() => {
    try {
      console.log(value.length)
      const currentClassIds = classStudents.map((c) => c.studenId).filter(Boolean)

      const isSame =
        currentClassIds.length === value.length &&
        currentClassIds.every((id) => value.includes(id))

      if (!isSame) {
        setClassStudents(
          value.length > 0
            ? value.map((studenId, index) => ({
              id: Date.now() + index,
              studenId
            }))
            : [{ id: Date.now(), studenId: "" }]
        )
      }
      console.log(value)
    }
    catch (error) {
      console.log('Error in StudentClassesForm:', error)
    }
  }, [value])

  useEffect(() => {
    const studentIds = classStudents.map((c) => c.studenId).filter(Boolean)
    onChange(studentIds)
  }, [classStudents])


  const handleAddStudent = () => {
    setClassStudents([...classStudents, { id: Date.now(), studenId: "" }])
  }

  const handleRemoveStudent = (id: number) => {
    setClassStudents(classStudents.filter((c) => c.id !== id))
  }

  const handleStudentChange = (id: number, studenId: string) => {
    setClassStudents(
      classStudents.map((c) => (c.id === id ? { ...c, studenId } : c))
    )
  }

  return (
    <div className="space-y-4">
      <Label className="text-base">Danh sách học sinh</Label>
      {classStudents.map((studentItem) => (
        <div key={studentItem.id} className="flex items-center gap-4">
          <Select
            value={studentItem.studenId || ""}
            onValueChange={(val) => handleStudentChange(studentItem.id, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn học sinh" />
            </SelectTrigger>
            <SelectContent>
              {allStudents
                .filter(
                  (c) =>
                    c._id &&
                    (c._id.toString() === studentItem.studenId ||
                      !classStudents.some((s) => s.studenId === c._id!.toString()))
                )
                .map((c) => (
                  <SelectItem key={c._id!.toString()} value={c._id!.toString()}>
                    {c.name} - {c.yearOfBirth}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {classStudents.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveStudent(studentItem.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={handleAddStudent}>
        <Plus className="mr-2 h-4 w-4" />
        Thêm học sinh
      </Button>
    </div>
  )
}