import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { RouteContext, Teacher } from "@/lib/type";

export async function PUT(
    req: Request,
    context: RouteContext
) {
    const { id } = await context.params;
    const { name, address, certifications, bio, education, email, experience, image, phone, specialties, subject, yearOfBirth }: Teacher = await req.json();

    if (!name || !subject) {
        return NextResponse.json({ message: "Missing information" }, { status: 400 });
    }
    try {
        // const body = await req.json();
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("teachers");

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
                    name,
                    address,
                    certifications,
                    bio,
                    education,
                    image,
                    email,
                    experience,
                    phone,
                    specialties,
                    subject,
                    yearOfBirth,
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Update successful" }, { status: 200 });
    } catch (error) {
        console.error("Error updating teacher:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function DELETE(req: Request, context: RouteContext) {
    const { id } = await context.params;

    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("teachers");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Medicine not found" }, { status: 404 });
        }

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
        const collection = db.collection("teachers")

        const teacher = await collection.findOne({ _id: new ObjectId(id) })

        if (!teacher) {
            return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
        }

        return NextResponse.json({ teacher }, { status: 200 })
    } catch (error) {
        console.error("Error fetching teacher:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}