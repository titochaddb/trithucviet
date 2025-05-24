import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react"

export default function DashboardSchedule() {
  // Sample schedule data - in a real app, this would come from a database
  const todaySchedules = [
    {
      id: 1,
      class: "Mathematics",
      grade: "9th Grade",
      teacher: "Dr. Sarah Johnson",
      room: "Room 101",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
    },
    {
      id: 5,
      class: "Science",
      grade: "9th Grade",
      teacher: "Prof. Michael Chen",
      room: "Room 103",
      startTime: "4:30 PM",
      endTime: "6:00 PM",
    },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Monday, May 22, 2025</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous day</span>
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
            <span className="sr-only">Calendar view</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next day</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {todaySchedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Calendar className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-muted-foreground">No classes scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todaySchedules.map((schedule) => (
              <div key={schedule.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      {schedule.grade}
                    </Badge>
                    <h3 className="font-semibold">{schedule.class}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <span>{schedule.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{schedule.room}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>
                    {schedule.startTime} - {schedule.endTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <Button variant="link" asChild>
            <Link href="/admin/schedule">View all schedules</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
