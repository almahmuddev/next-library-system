"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router   = useRouter();
  const [form,     setForm]     = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authClient.signIn.email({
        email:       form.email,
        password:    form.password,
        callbackURL: "/",
      });
      if (result?.error) {
        toast.error(result.error.message || "Invalid email or password");
      } else {
        toast.success("Welcome back! 👋");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed.");
      setGLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-base-100">

      {/* Card */}
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-content mb-5 shadow-lg shadow-primary/25">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-base-content/55 text-sm mt-1">
            Sign in to your Bookshelf account
          </p>
        </div>

        <div className="card bg-base-200 border border-base-300 shadow-2xl">
          <div className="card-body p-7">

            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={gLoading}
              className="btn btn-outline w-full gap-2.5 border-base-300 hover:border-primary mb-5 h-11"
            >
              {gLoading
                ? <span className="loading loading-spinner loading-sm" />
                : <FcGoogle className="text-xl" />
              }
              Continue with Google
            </button>

            <div className="divider text-xs text-base-content/40 my-0">
              or sign in with email
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-0">

              {/* Email */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold uppercase tracking-widest text-base-content/50">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35 text-sm" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                    className="input input-bordered w-full pl-10 bg-base-100/60 border-base-300 focus:border-primary h-11 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold uppercase tracking-widest text-base-content/50">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35 text-sm" />
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Your password"
                    required
                    className="input input-bordered w-full pl-10 pr-11 bg-base-100/60 border-base-300 focus:border-primary h-11 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/35 hover:text-base-content transition-colors"
                  >
                    {showPass ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full h-11 gap-2 shadow-lg shadow-primary/20"
              >
                {loading && <span className="loading loading-spinner loading-sm" />}
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-base-content/50 mt-3">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
