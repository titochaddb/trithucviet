import { ObjectId } from "mongodb"
export interface Teacher {
    _id?: string | ObjectId  // string trên frontend, ObjectId trên backend
    name: string
    subject: string
    experience: string
    education: string
    email: string
    phone: string
    image: string
    yearOfBirth: string       // Năm sinh
    address: string           // Địa chỉ
    certifications: string // Các chứng chỉ
    specialties: string    // Các chuyên môn
    bio: string               // Giới thiệu bản thân
    createdAt?: string
    updatedAt?: string
}