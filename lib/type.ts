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

export interface Student {
    _id?: string | ObjectId  // string trên frontend, ObjectId trên backend
    name: string
    grade: string
    yearOfBirth: string       // Năm sinh
    address: string           // Địa chỉ
    parentName: string // Giới thiệu bản thân
    parentPhone: string // Điện thoại
    classIds: string[];// Danh sách lớp học
    createdAt?: string
    updatedAt?: string
}

export interface Class {
    _id?: string | ObjectId
    subject: string;
    grade: string;
    teacherName: string;
    room: string;
    studentIds?: string[];
}

export interface Banner {
    id: number;
    localImage?: string;
    imageFile?: File;
}

export interface PageSettings {
    _id?: string | ObjectId;
    urlImage?: string[];
    teacherIds?: string[];
    classIds?: string[];
}

export interface TeacherSetting {
    _id?: string | ObjectId
    teacherId: string;
}