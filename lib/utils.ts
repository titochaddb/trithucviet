import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const uploadImageToCloudinary = async (imageFile: File): Promise<string> => {
  if (!imageFile) return "";

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "Note-preset"); // thay bằng preset thực tế của bạn

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dxtkqurf4/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data.secure_url) {
    return data.secure_url;
  }

  throw new Error("Upload ảnh thất bại");
};