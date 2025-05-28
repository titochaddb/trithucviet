import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Teacher } from "@/lib/type";

export async function POST(req: Request) {
    const {
        name,
        subject,
        experience,
        education,
        email,
        phone,
        image,
        yearOfBirth,
        address,
        certifications,
        specialties,
        bio,
    }: Teacher = await req.json();

    if (!name || !subject) {
        return NextResponse.json({ message: "Missing required information" }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("teachers");
        const result = await collection.insertOne({
            name,
            subject,
            experience,
            education,
            email,
            phone,
            image: image || null,
            yearOfBirth: yearOfBirth || null,
            address: address || null,
            certifications: certifications || "",
            specialties: specialties || "",
            bio: bio || "",
        });
        // console.log(NextResponse.json({ result: result }, { status: 200 }))
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error adding teacher" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const keyword = searchParams.get("search")?.toLowerCase() || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("teachers");
        const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
        const result = await collection
            .find(query)
            .sort({ name: 'asc' })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        // const totalMedicines = await collection.countDocuments(query);
        // const totalPages = Math.ceil(totalMedicines / limit);
        return NextResponse.json({
            teachers: result,

        }, { status: 200 });
        // return NextResponse.json({
        //     medicines: result,
        //     totalPages,
        //     totalMedicines
        // }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching medicines" }, { status: 500 });
    }
}
