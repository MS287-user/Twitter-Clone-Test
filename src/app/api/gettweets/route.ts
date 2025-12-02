import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function GET(req: Request) {
    try {
        const { data, error } = await supabase.from('tweets').select('id, user_id, content, created_at, profiles(username)').order('created_at', {ascending: false}) ;

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message, status: 500 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Tweets fetched successfuly",
                tweets: data,
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