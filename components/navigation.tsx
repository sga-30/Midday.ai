"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    (async ()=>{
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    })();
  },[]);

  const signOut = async ()=>{
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold">Midday Clone</Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/features">Features</Link>
        </div>
      </div>

      <div className="md:hidden">
        <button aria-label="Toggle menu" onClick={()=>setOpen(!open)} className="p-2 border rounded">☰</button>
      </div>

      <div className="hidden md:flex items-center space-x-3">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <Link href="/dashboard"><button className="px-3 py-1 border rounded">Dashboard</button></Link>
            <button onClick={signOut} className="px-3 py-1 border rounded">Sign out</button>
          </>
        ) : (
          <>
            <Link href="/(auth)/sign-in"><button className="px-3 py-1 border rounded">Sign in</button></Link>
            <Link href="/(auth)/sign-up"><button className="px-3 py-1 border rounded">Sign up</button></Link>
          </>
        )}
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden absolute right-4 top-16 bg-white border p-4 rounded shadow-md">
          <div className="flex flex-col space-y-2">
            <Link href="/pricing">Pricing</Link>
            <Link href="/features">Features</Link>
            {user ? (
              <>
                <span className="text-sm">{user.email}</span>
                <Link href="/dashboard"><button className="px-3 py-1 border rounded">Dashboard</button></Link>
                <button onClick={signOut} className="px-3 py-1 border rounded">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/(auth)/sign-in"><button className="px-3 py-1 border rounded">Sign in</button></Link>
                <Link href="/(auth)/sign-up"><button className="px-3 py-1 border rounded">Sign up</button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
