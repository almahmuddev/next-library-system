"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiUser, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router   = useRouter();
  const [form,     setForm]     = useState({ name: "", email: "", photoURL: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const result = await authClient.signUp.email({
        name:     form.name,
        email:    form.email,
        password: form.password,
        image:    form.photoURL || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Account created! Please log in. 🎉");
        router.push("/login");
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

  const FIELDS = [
    { name: "name",     label: "Full Name",           type: "text", placeholder: "John Doe",              Icon: FiUser,  required: true  },
    { name: "email",    label: "Email",               type: "email",placeholder: "you@example.com",        Icon: FiMail,  required: true  },
    { name: "photoURL", label: "Photo URL (optional)",type: "url",  placeholder: "https://your-photo.jpg", Icon: FiImage, required: false },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-base-100">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-content mb-5 shadow-lg shadow-primary/25">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Create Account</h1>
          <p className="text-base-content/55 text-sm mt-1">
            Join Bookshelf and start reading today
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
              or register with email
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-0">
              {FIELDS.map(({ name, label, type, placeholder, Icon, required }) => (
                <div key={name} className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-xs font-semibold uppercase tracking-widest text-base-content/50">
                      {label}
                    </span>
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35 text-sm" />
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={onChange}
                      placeholder={placeholder}
                      required={required}
                      className="input input-bordered w-full pl-10 bg-base-100/60 border-base-300 focus:border-primary h-11 text-sm"
                    />
                  </div>
                </div>
              ))}

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
                    placeholder="Min. 6 characters"
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
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-base-content/50 mt-3">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
