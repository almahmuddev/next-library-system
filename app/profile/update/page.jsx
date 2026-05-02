"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FiArrowLeft, FiUser, FiImage, FiSave } from "react-icons/fi";

function UpdateContent() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  // Populate form once session is available (session loads async)
  useEffect(() => {
    if (session?.user) {
      setForm({
        name:  session.user.name  || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Name cannot be empty"); return; }
    setLoading(true);
    try {
      const result = await authClient.updateUser({
        name:  form.name.trim(),
        image: form.image.trim() || undefined,
      });
      if (result?.error) {
        toast.error(result.error.message || "Update failed");
      } else {
        toast.success("Profile updated! ✨");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-primary mb-8 transition-colors"
      >
        <FiArrowLeft /> Back to Profile
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight mb-1">
          Update Profile
        </h1>
        <p className="text-base-content/55 text-sm">
          Change your display name and profile photo
        </p>
      </div>

      <div className="card bg-base-200 border border-base-300 shadow-xl">
        <div className="card-body p-7">

          {/* Live preview */}
          <div className="flex items-center gap-4 p-4 bg-base-300/40 rounded-2xl border border-base-300 mb-6">
            {form.image ? (
              <div className="avatar">
                <div className="w-14 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1">
                  <img
                    src={form.image}
                    alt="preview"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-14">
                  <span className="text-xl font-extrabold">
                    {form.name?.[0]?.toUpperCase() || "?"}
                  </span>
                </div>
              </div>
            )}
            <div>
              <p className="font-semibold">{form.name || "Your Name"}</p>
              <p className="text-xs text-base-content/40">
                {session?.user?.email}
              </p>
              <p className="text-xs text-primary/60 mt-0.5">Live preview</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase tracking-widest text-base-content/50">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your full name"
                  required
                  className="input input-bordered w-full pl-10 bg-base-100/60 border-base-300 focus:border-primary h-11 text-sm"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold uppercase tracking-widest text-base-content/50">
                  Photo URL
                </span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35 text-sm" />
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={onChange}
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full pl-10 bg-base-100/60 border-base-300 focus:border-primary h-11 text-sm"
                />
              </div>
              <label className="label py-1">
                <span className="label-text-alt text-base-content/40">
                  Paste a direct image URL (optional)
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-11 gap-2 shadow-lg shadow-primary/20"
            >
              {loading
                ? <span className="loading loading-spinner loading-sm" />
                : <FiSave />
              }
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function UpdateProfilePage() {
  return <PrivateRoute><UpdateContent /></PrivateRoute>;
}
