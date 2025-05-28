import clientPromise from "@/lib/mongodb"
import { Class } from "@/lib/type"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    try {
        // console.log("params:", params);
        const { id } = await context.params

        const client = await clientPromise
        const db = client.db("trithucviet")
        const collection = db.collection("classes")

        const thisClass = await collection.findOne({ _id: new ObjectId(id) })

        if (!thisClass) {
            return NextResponse.json({ message: "Class not found" }, { status: 404 })
        }

        return NextResponse.json({ thisClass }, { status: 200 })
    } catch (error) {
        console.error("Error fetching class:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const { subject, grade, teacherName, room, studentIds }: Class = await req.json();

    if (!subject || !grade || !teacherName) {
        return NextResponse.json({ message: "Missing information" }, { status: 400 });
    }
    try {
        // const body = await req.json();
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");

        // const updateData: Partial<Teacher> = {
        //     name: body.name,
        //     subject: body.subject,
        //     image: body.imageUrl,
        // };

        // const result = await collection.updateOne(
        //     { _id: new ObjectId(id) },
        //     { $set: updateData }
        // );
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    subject: subject,
                    grade: grade,
                    teacherName: teacherName,
                    room: room || null,
                    studentIds: studentIds || [], // Ensure studentIds is an array
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Class not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Update successful" }, { status: 200 });
    } catch (error) {
        console.error("Error updating class:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Class not found" }, { status: 404 });
        }

        await db.collection("students").updateMany(
            { classIds: id },
            { $pull: { classIds: id } } as any
        );

        return NextResponse.json({ message: "Delete successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting medicine" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        const { studentId } = await req.json();

        if (!studentId) {
            return NextResponse.json({ message: "Thiếu studentId" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: { studentIds: studentId } } // Thêm vào mảng nếu chưa có
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Không tìm thấy học sinh" }, { status: 404 });
        }

        return NextResponse.json({ message: "Cập nhật thành công" }, { status: 200 });
    } catch (error) {
        console.error("Error in PATCH /students/[id]:", error);
        return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
    }
}