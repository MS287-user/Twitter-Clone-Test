import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(req: Request) {
    const { id, tweet } = await req.json();
    try {
        if (!id || !tweet) {
            if (!id) {
                return NextResponse.json(
                    { success: false, message: "User id not received", status: 400 }
                )
            }
            else if (!tweet) {
                return NextResponse.json(
                    { success: false, message: "Tweet not received", status: 400 }
                )
            }
        }

        const { data, error } = await supabase.from('tweets').insert({ user_id: id, content: tweet }).select('id, user_id, content, created_at, profiles(username)').single();

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message, status: 400 }
            )
        }
        
        return NextResponse.json(
            {
                success: true,
                message: "Tweet posted successfully",
                data,
                status: 200
            }
        )
    }
    catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.response, status: 500 }
        )
    }
}