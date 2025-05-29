import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // sửa đường dẫn tùy dự án
import { RouteContext } from "@/lib/type";


export async function GET(req: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        console.log("Fetching classes for studentId:", id);
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");

        // Tìm các class mà trong mảng students có studentId
        const query = { studentIds: id };
        const classes = await collection.find(query).toArray();

        return NextResponse.json({
            classes: classes.map(cls => ({
                ...cls,
                id: cls._id.toString(),
                _id: undefined
            })),
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching classes by studentId:", error);
        return NextResponse.json({ message: "Error fetching classes" }, { status: 500 });
    }
}