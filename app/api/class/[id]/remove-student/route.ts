import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        console.log("vào đâyy:");
        const { id } = await params;
        console.log("classId:", id);
        const body = await req.json();
        const { studentId } = body;
        console.log("studentId:", studentId);
        if (!studentId) {
            return NextResponse.json({ message: "Missing studentId in request body" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");

        const updateResult = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { studentIds: studentId } }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "No class found or student not in class" }, { status: 404 });
        }

        return NextResponse.json({ message: "Student removed from class successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error removing student from class:", error);
        return NextResponse.json({ message: "Error removing student" }, { status: 500 });
    }
}