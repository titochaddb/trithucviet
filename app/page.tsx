import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { BookOpen, GraduationCap, Users, Calendar } from "lucide-react"
import clientPromise from "@/lib/mongodb"
import { Class, PageSettings, Teacher } from "@/lib/type"
import { ObjectId } from "mongodb";
import { SiteHeader } from "@/components/SiteHeader"



// export async function getServerSideProps() {
//   // Ở đây giả lập dữ liệu lấy từ database hoặc API
//   try {
//     const client = await clientPromise;
//     const db = client.db("trithucviet");  // tên database của bạn

//     // Lấy dữ liệu từ collection banners, teachers, classes

//     const pageSettings = await db.collection("pagesetting").find({}).toArray();

//     // Mongo trả về _id là ObjectId, bạn nên convert sang string để truyền props
//     const pageSettingsClean = pageSettings.map(({ _id, ...rest }) => ({
//       id: _id.toString(),
//       ...rest,
//     }));

//     return {
//       props: {
//         pageSettings: pageSettingsClean,
//       },
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       props: {
//         pageSettings: [],
//       },
//     };
//   }
// }
// interface Props {
//   pageSettings: PageSettings;
// }
export const revalidate = 0;
export default async function Home() {

  const getPageSettings = async () => {
    try {
      const client = await clientPromise;
      const db = client.db("trithucviet");

      const pageSettings = await db.collection("pagesetting").find({}).toArray();

      const pageSettingsData: PageSettings = pageSettings[0] || {};
      return pageSettingsData;
    }
    catch (error) {
      console.error("Error fetching page settings:", error);
      return {};
    }
  }

  const getTeacherData = async (teacherID: string) => {
    try {
      const client = await clientPromise;
      const db = client.db("trithucviet");
      const teacherData = await db.collection("teachers").findOne({ _id: new ObjectId(teacherID) });
      if (!teacherData) {
        throw new Error(`Teacher with ID ${teacherID} not found`);
      }
      return teacherData;
    } catch (error) {
      console.error("Error fetching teacher data:", error);
      return null;
    }
  }



  const getClassData = async (classID: string) => {
    try {
      const client = await clientPromise;
      const db = client.db("trithucviet");
      const classData = await db.collection("classes").findOne({ _id: new ObjectId(classID) });
      if (!classData) {
        throw new Error(`Class with ID ${classID} not found`);
      }
      return classData;
    } catch (error) {
      console.error("Error fetching class data:", error);
      return null;
    }
  }

  const pageSettingsData: PageSettings = await getPageSettings();

  const teacherDataPromises = pageSettingsData.teacherIds?.map((teacherId) => getTeacherData(teacherId)) || [];
  const teacherData = await Promise.all(teacherDataPromises);
  const validTeacherData = teacherData.filter((teacher) => teacher !== null) as Teacher[];

  const classDataPromises = pageSettingsData.classIds?.map((classId) => getClassData(classId)) || [];
  const classData = await Promise.all(classDataPromises);
  const validClassData = classData.filter((cls) => cls !== null) as Class[];

  // Sample data - in a real app, this would come from a database



  return (
    <main className="flex min-h-screen w-full flex-col">
      <SiteHeader />

      {/* Banner Carousel */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container max-w-none w-full px-4 md:px-6">
          <Carousel className="w-full">
            <CarouselContent>
              {pageSettingsData.urlImage?.map((banner, index) => (
                <CarouselItem key={index}>
                  {/* <div className="relative group h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
                    <Image
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div> */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10 bg-white">
                    <Image
                      src={banner || "/placeholder.svg"}
                      alt={banner}
                      fill
                      className="object-contain"
                    />
                  </div>

                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>


      {/* Features */}
      <section className="w-full py-12 md:py-16 bg-gray-50">
        <div className="container max-w-none w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tại sao phụ huynh, học sinh chọn chúng tôi</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Trung tâm gia sư của chúng tôi cung cấp hỗ trợ giáo dục toàn diện tập trung vào kết quả.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <GraduationCap className="h-8 w-8 text-purple-600" />
                <CardTitle>Các thầy cô giáo chất lượng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Đội ngũ giáo viên có trình độ cao và nhiều năm kinh nghiệm trong khu vực.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-purple-600" />
                <CardTitle>Một lớp có ít học sinh</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Giới hạn số học sinh trong một lớp để đạt hiệu quả tối đa trong giảng dạy.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <CardTitle>Chương trình giảng dạy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Tài liệu học tập được thiết kế phù hợp với yêu cầu của trường.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-purple-600" />
                <CardTitle>Lịch học linh hoạt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Có nhiều khung giờ và giáo viên để học sinh lựa chọn.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="w-full py-12 md:py-16 lg:py-20">
        <div className="container max-w-none w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Các lớp học của chúng tôi</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Các lớp học của chúng tôi được thiết kế để nâng cao kiến thức của từng học sinh.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {validClassData.map((classItem) => (
              <Card key={classItem._id?.toString()} className="overflow-hidden">
                <CardHeader>
                  <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800 mb-2">
                    {classItem.subject || "Môn học"}
                  </div>
                  <CardTitle>{classItem.teacherName}</CardTitle>
                  <CardDescription>{classItem.grade}</CardDescription>
                </CardHeader>
                {/* <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem chi tiết
                  </Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>
          {/* <div className="flex justify-center mt-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Xem các lớp đang có
            </Button>
          </div> */}
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container max-w-none w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Các giáo viên đang trực tiếp giảng dạy</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Gặp gỡ đội ngũ giáo viên tận tâm của chúng tôi, những người cam kết giúp con bạn thành công trong học tập.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {validTeacherData.map((teacher) => (
              <Card key={teacher._id?.toString()} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={teacher.image || "/placeholder.svg"}
                    alt={teacher.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{teacher.name}</CardTitle>
                  <CardDescription>{teacher.subject} </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-500">Kinh nghiệm: {teacher.experience}</p>
                  <p className="text-sm text-gray-500">Trình độ: {teacher.education}</p>
                </CardContent>
                {/* <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem thông tin chi tiết
                  </Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-16 lg:py-20">
        <div className="container max-w-none w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Liên hệ với chúng tôi</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nếu phụ huynh, học sinh có thắc mắc hãy liên hệ với đội ngũ của chúng tôi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Điện thoại</h3>
              <p className="text-gray-500 text-center">0976.141.148</p>
              <p className="text-gray-500 text-center mt-1">Tất cả các ngày trong tuần</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-600"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-500 text-center">trithucvietedu247@gmail.com</p>
              <p className="text-gray-500 text-center mt-1">Tất cả các ngày trong tuần</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="rounded-full bg-purple-100 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-600"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
              <p className="text-gray-500 text-center">Lộng Khê 1 xã An Khê</p>
              <p className="text-gray-500 text-center">Huyện Quỳnh Phụ tỉnh Thái Bình</p>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <a href="https://forms.gle/Tf4M3MM3AZYinAyL6" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Đăng kí học ngay
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-gray-100 py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">© 2025 Trung tâm trí thức việt. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/profile.php?id=61573030996580" target="blank" className="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>

            {/* <Link href="#" className="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link> */}
          </div>
        </div>
      </footer>
    </main>

  )
}
