import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const results = await conn.query('SELECT * FROM product')

        return NextResponse.json(results)
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        }
            ,
            { status: 500, })
    }
}

export async function POST(resquest) {
    try {
        const { name, description, price } = await resquest.json()
        const result = await conn.query('INSERT INTO product SET ?', {
            name,
            description,
            price
        })
        console.log(result)
        return NextResponse.json({ name, description, price, id: result.insertId })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error.message
        }, { status: 500 })
    }
}