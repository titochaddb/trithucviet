import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { BookOpen, GraduationCap, Users, Calendar } from "lucide-react"

export default function Home() {
  // Sample data - in a real app, this would come from a database
  const classes = [
    {
      id: 1,
      title: "Toán",
      description: "Xây dựng nền tảng vững chắc về toán học",
      level: "Lớp 9",
    },
    {
      id: 2,
      title: "Anh",
      description: "Nâng cao từ vựng và ngữ pháp",
      level: "Lớp 9",
    },
    {
      id: 3,
      title: "Văn",
      description: "Phát triển kỹ năng viết và phân tích văn bản",
      level: "Lớp 9",
    },
  ]

  const teachers = [
    {
      id: 1,
      name: "Thầy Cường",
      subject: "Toán",
      experience: "15 years",
      education: "Ph.D. in Mathematics Education",
      image: "/logo.jpg",
    },
    {
      id: 2,
      name: "Thầy Hùng",
      subject: "Toán",
      experience: "12 years",
      education: "M.Sc. in Physics",
      image: "/logo.jpg",
    },
    {
      id: 3,
      name: "Cô Hạnh",
      subject: "Tiếng Anh",
      experience: "8 years",
      education: "B.A. in English Literature",
      image: "/logo.jpg",
    },
  ]

  const banners = [
    {
      id: 1,
      title: "Summer Intensive Programs",
      description: "Prepare for the upcoming school year with our focused summer courses",
      image: "/banner.jpg",
    },
    {
      id: 2,
      title: "Personalized Learning",
      description: "Small class sizes ensure individual attention for maximum academic improvement",
      image: "/banner.jpg",
    },
    {
      id: 3,
      title: "Entrance Exam Success",
      description: "90% of our students pass their target school entrance exams",
      image: "/banner.jpg",
    },
  ]

  return (
    <main className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      {/* <section className="relative w-full bg-gradient-to-r from-purple-50 to-blue-50 py-12 md:py-24">
        <div className="container max-w-none w-full px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Trung tâm Trí Thức Việt
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Trung tâm chuyên đào tạo học sinh từ tiểu học đến trung học cơ sở và đặc biệt là kỳ thi tuyển sinh lớp 10.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#classes">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Explore Classes
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/logo.jpg"
                width={600}
                height={400}
                alt="Students learning"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Banner Carousel */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container max-w-none w-full px-4 md:px-6">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  {/* <div className="relative group h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
                    <Image
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div> */}
                  <div className="relative w-full aspect-[1958/745] overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10 bg-white">
                    <Image
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
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
            {classes.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden">
                <CardHeader>
                  <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800 mb-2">
                    {classItem.level}
                  </div>
                  <CardTitle>{classItem.title}</CardTitle>
                  <CardDescription>{classItem.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem chi tiết
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Xem các lớp đang có
            </Button>
          </div>
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
            {teachers.map((teacher) => (
              <Card key={teacher.id} className="overflow-hidden">
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
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem thông tin chi tiết
                  </Button>
                </CardFooter>
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
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Xem lịch học
            </Button>
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
