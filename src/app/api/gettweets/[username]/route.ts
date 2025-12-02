import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function GET(req: Request, { params }: { params: Promise<{ username: string }>  } ) {
    try{
        const { username }  = await params;
        if(!username){
            return NextResponse.json(
            { succes: false, message: "Username not found", status: 400 }
        )
        }

        const { data, error } = await supabase.from('tweets').select(`id, user_id, content, created_at, profiles!inner (username)`).eq('profiles.username', username).order('created_at', { ascending: false });

        if(error){
            return NextResponse.json(
            { succes: false, message: error.message, status: 400 }
        )
        }

        return NextResponse.json(
            { succes: true, tweets: data, status: 200 }
        )
    }
    catch(err: any){
        return NextResponse.json(
            { success: false, message: err.response, status: 500 }
        )
    }
}