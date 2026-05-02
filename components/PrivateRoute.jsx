"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiBook } from "react-icons/fi";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <span className="loading loading-spinner loading-lg text-primary" />
          <FiBook className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/50 text-sm" />
        </div>
        <p className="text-base-content/40 text-sm">Checking authentication…</p>
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
