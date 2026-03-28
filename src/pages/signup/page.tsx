import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username.trim() || username.length < 3) return "Username must be at least 3 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers and underscores.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    if (!agreed) return "Please agree to the terms to continue.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validError = validate();
    if (validError) { setError(validError); return; }
    setError("");
    setLoading(true);
    const result = await signup({ username: username.trim(), password });
    setLoading(false);
    if (result.success) {
      navigate("/onboarding");
    } else {
      setError(result.error ?? "Sign up failed. Please try again.");
    }
  };

  const strengthScore = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) ? 3
    : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;
  const strengthLabel = ["", "Weak", "Fair", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-400", "bg-emerald-400"];

  return (
    <div className="min-h-screen bg-[#05051a] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md my-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <i className="ri-star-fill text-white text-sm" />
            </div>
            <span className="font-orbitron font-bold text-xl text-white">
              Stella<span className="text-gradient-cyan">Scholars</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-3">Create your free account and start studying smarter</p>
        </div>

        <div className="space-card p-8">
          <h2 className="font-orbitron font-bold text-xl text-white text-center mb-7">Create Account</h2>

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. StargazerJamie"
                className="w-full rounded-xl px-4 py-3 text-sm border border-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              <p className="text-xs text-slate-500 mt-1">Letters, numbers, underscores only.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm border border-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <i className={showPassword ? "ri-eye-off-line text-sm" : "ri-eye-line text-sm"} />
                </button>
              </div>
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strengthScore ? strengthColor[strengthScore] : "bg-white/10"}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${strengthScore === 3 ? "text-emerald-400" : strengthScore === 2 ? "text-yellow-400" : "text-red-400"}`}>
                    {strengthLabel[strengthScore]}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-all ${confirm && confirm !== password ? "border-red-400 focus:ring-red-400/20" : "border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20"}`}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${agreed ? "bg-cyan-500 border-cyan-500" : "border-white/20 bg-white/4"}`}
              >
                {agreed && <i className="ri-check-line text-white text-xs" />}
              </div>
              <span className="text-xs text-slate-400 leading-relaxed">
                I agree to the <span className="text-cyan-400 cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-cyan-400 cursor-pointer">Privacy Policy</span>. I understand that my progress is saved locally.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line text-sm animate-spin" /> Creating Account...
                </span>
              ) : "Launch My Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
