"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { setUser } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/store";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkSession() {

            const { data } = await supabase.auth.getSession();
            const session = data.session;

            if (!session) {
                router.replace("/login");
            } 
                
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single();
                if (profile) {
                    dispatch(setUser(
                        {
                            id: session?.user.id,
                            email: session?.user.email,
                            username: profile.username,
                        }
                    ));
                }

                setLoading(false);
        }
        checkSession();
    }, [router]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-lg font-semibold">
                Loading...
            </div>
        );
    }

    return <> {children} </>;
}