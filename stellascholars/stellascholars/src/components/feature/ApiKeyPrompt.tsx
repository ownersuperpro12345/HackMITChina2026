import { useState } from "react";
import { setDeepSeekKey } from "../../lib/deepseek";

interface Props {
  onKeySet: () => void;
  context?: string;
}

export default function ApiKeyPrompt({ onKeySet, context }: Props) {
  const [key, setKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (key.trim().length < 20) {
      setError("That doesn&apos;t look like a valid key. DeepSeek API keys are usually 35+ characters.");
      return;
    }
    setSaving(true);
    setError("");
    setDeepSeekKey(key.trim());
    setTimeout(() => {
      setSaving(false);
      onKeySet();
    }, 400);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="bg-white border-2 border-purple-300 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center mx-auto mb-5">
          <i className="ri-robot-2-line text-purple-600 text-3xl" />
        </div>
        <h2 className="font-orbitron font-bold text-xl text-slate-900 mb-2">DeepSeek API Key Required</h2>
        <p className="text-slate-500 text-sm mb-2 leading-relaxed">
          {context ?? "This feature uses DeepSeek AI to power the experience."}
        </p>
        <p className="text-slate-400 text-xs mb-6 leading-relaxed">
          Get your free API key at{" "}
          <a
            href="https://platform.deepseek.com"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-purple-600 underline"
          >
            platform.deepseek.com
          </a>
          . Your key is stored only in your browser — never sent anywhere else.
        </p>
        <div className="text-left mb-4">
          <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Your DeepSeek API Key</label>
          <input
            type="password"
            value={key}
            onChange={(e) => { setKey(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            placeholder="sk-..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-purple-400 transition-all text-sm"
          />
          {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
        </div>
        <button
          onClick={handleSave}
          disabled={saving || key.trim().length < 5}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
        >
          {saving ? "Saving..." : "Save Key & Continue"}
        </button>
      </div>
    </div>
  );
}
