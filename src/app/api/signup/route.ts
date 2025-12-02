import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password, username } = await req.json();

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            return NextResponse.json(
                { success: false, message: error.message, status: 400 }
            );
        }
        const user = data.user;
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User was not inserted", status: 500 }
            );
        }
        const { error: pErr } = await supabase.from('profiles').upsert({
            id: user.id,
            username
        });

        if (pErr) {
            return NextResponse.json(
                { success: false, message: pErr.message, status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Signup Successfully",
                user,
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