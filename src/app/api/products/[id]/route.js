import { NextResponse } from "next/server"
import { conn } from "@/libs/mysql"
export async function GET (request,  {params}){

  try {
    const result = await conn.query('SELECT * FROM product WHERE id = ?' , [params.id])
    if (result.length === 0) {
        return NextResponse.json({message: 'Producto no encontrado'}, {status: 404,})
    }
    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({message: message.error
    }, {status: 500,})
  }
}

export function DELETE (){
    return NextResponse.json('eliminando producto')
}

export function PUT (){
    return NextResponse.json('actualizando producto')
}