import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkSession() {
            const { data } = await supabase.auth.getSession();
            const session = data.session;
            if (session) {
                router.replace("/");
            }
            else{
                setLoading(false);
            }
        }
        checkSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                router.replace("/");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-lg font-semibold">
                Loading...
            </div>
        );
    }
    else{
        return <> {children} </>
    }
}