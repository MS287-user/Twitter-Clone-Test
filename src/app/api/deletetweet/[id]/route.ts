import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json(
            { success: false, message: "Error deleting tweet", status: 400 }
        )
    }
    try {
        const { data, error } = await supabase.from('tweets').delete().eq('id', id);

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message, status: 400 }
            )
        }
        return NextResponse.json(
            { success: true, message: "Tweet deleted successfully", status: 200 }
        )
    }
    catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.response, status: 500 }
        )
    }
}