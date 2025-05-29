import clientPromise from "@/lib/mongodb";
import { RouteContext, Student } from "@/lib/type";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(
    req: Request,
    context: RouteContext
) {
    const { id } = await context.params;
    const {
        name,
        grade,
        parentName,
        parentPhone,
        yearOfBirth,
        address,
        classIds
    }: Student = await req.json();

    if (!name || !yearOfBirth) {
        return NextResponse.json({ message: "Missing information" }, { status: 400 });
    }
    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("students");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    grade,
                    address,
                    yearOfBirth,
                    parentName,
                    parentPhone,
                    classIds: classIds || [],
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Update successful" }, { status: 200 });
    }
    catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: Request, context: RouteContext) {
    const { id } = await context.params;

    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("students");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        await db.collection("classes").updateMany(
            { studentIds: id }, // studentIds là string[]
            { $pull: { studentIds: id } } as any
        );

        return NextResponse.json({ message: "Delete successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting medicine" }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    context: RouteContext
) {
    try {
        // console.log("params:", params);
        const { id } = await context.params

        const client = await clientPromise
        const db = client.db("trithucviet")
        const collection = db.collection("students");

        const student = await collection.findOne({ _id: new ObjectId(id) })

        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 })
        }

        return NextResponse.json({ student }, { status: 200 })
    } catch (error) {
        console.error("Error fetching student:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(req: Request, context: RouteContext) {
    const { id } = await context.params;

    try {
        const { classId } = await req.json();

        if (!classId) {
            return NextResponse.json({ message: "Thiếu classId" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("students");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: { classIds: classId } } // Thêm vào mảng nếu chưa có
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