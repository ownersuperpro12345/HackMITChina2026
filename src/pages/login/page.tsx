import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!identifier.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const result = await login(identifier.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error ?? "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#05051a] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <i className="ri-star-fill text-white text-sm" />
            </div>
            <span className="font-orbitron font-bold text-xl text-white">
              Stella<span className="text-gradient-cyan">Scholars</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-4">Your GCSE revision universe awaits</p>
        </div>

        <div className="space-card p-8">
          <h2 className="font-orbitron font-bold text-xl text-white text-center mb-7">Sign In</h2>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-red-400 text-sm" />
              </div>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Username</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl px-4 py-3 text-sm border border-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm border border-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  <i className={showPassword ? "ri-eye-off-line text-sm" : "ri-eye-line text-sm"} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line text-sm animate-spin" /> Signing In...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-700 mt-6">
          Progress saves locally offline · Syncs to cloud when connected
        </p>
      </div>
    </div>
  );
}
