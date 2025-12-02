import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    try{
        if(!email || !password){
            return NextResponse.json(
                { success: false, message: "Missing email and password", status: 400 }
            )
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if(error) {
            return NextResponse.json(
                { success: false, message: error.message, status: 400 }
            )
        }
        const currentUserSession = data.session;
        if(!currentUserSession){
            return NextResponse.json(
                { success: false, message: "Current User Session Not Created", status: 500 }
            )
        }

        return NextResponse.json(
            {
                success: true, 
                message: "Signin Successfully",
                currentUserSession, 
                status: 200,
            }
        )
    }
    catch(err: any) {
        return NextResponse.json(
            { success: false, message: err.response, status: 500 }
        )
    }
}