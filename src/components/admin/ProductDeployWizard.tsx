"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, GitBranch, Key, Server, Database } from "lucide-react";

export default function ProductDeployWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    repoUrl: "",
    sshCommand: "",
    vercelProjectName: "",
    vercelTeamId: "",
    supabaseUrl: "",
    supabaseAnonKey: "",
    supabaseServiceRole: "",
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDeploying(false);
    setDeploymentSuccess(true);
  };

  return (
    <div className="w-full border border-zinc-800 bg-zinc-900/30 p-6 rounded-xl mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-white mb-2">
          Clone & Deploy Noctra Ops
        </h2>
        <p className="text-zinc-400 text-sm">
          Wizard to automate the cloning of the product for a new client instance.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`h-1 w-full rounded-full transition-colors ${
                step >= i ? "bg-white" : "bg-zinc-800"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-white mb-4">
                <GitBranch className="w-5 h-5 text-zinc-400" />
                <h3 className="font-semibold">Repository Details</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.repoUrl}
                    onChange={(e) => updateForm("repoUrl", e.target.value)}
                    placeholder="https://github.com/Noctra-Studio/noctra-ops"
                    className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500">
                    SSH Clone Command
                  </label>
                  <input
                    type="text"
                    value={formData.sshCommand}
                    onChange={(e) => updateForm("sshCommand", e.target.value)}
                    placeholder="git clone git@github.com:..."
                    className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none font-mono"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-white mb-4">
                <Server className="w-5 h-5 text-zinc-400" />
                <h3 className="font-semibold">Vercel Configuration</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Vercel Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.vercelProjectName}
                    onChange={(e) => updateForm("vercelProjectName", e.target.value)}
                    placeholder="ops-client-name"
                    className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Vercel Team ID
                  </label>
                  <input
                    type="text"
                    value={formData.vercelTeamId}
                    onChange={(e) => updateForm("vercelTeamId", e.target.value)}
                    placeholder="team_xxxx"
                    className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-white mb-4">
                <Database className="w-5 h-5 text-zinc-400" />
                <h3 className="font-semibold">Supabase Configuration</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={formData.supabaseUrl}
                    onChange={(e) => updateForm("supabaseUrl", e.target.value)}
                    placeholder="https://xxxx.supabase.co"
                    className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">
                      Anon Key
                    </label>
                    <input
                      type="password"
                      value={formData.supabaseAnonKey}
                      onChange={(e) => updateForm("supabaseAnonKey", e.target.value)}
                      placeholder="eyJhbG..."
                      className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">
                      Service Role Key
                    </label>
                    <input
                      type="password"
                      value={formData.supabaseServiceRole}
                      onChange={(e) => updateForm("supabaseServiceRole", e.target.value)}
                      placeholder="eyJhbG..."
                      className="w-full bg-black border border-zinc-800 p-3 rounded text-sm text-white focus:border-white outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-white mb-4">
                <Key className="w-5 h-5 text-zinc-400" />
                <h3 className="font-semibold">Review & Deploy</h3>
              </div>
              
              {deploymentSuccess ? (
                <div className="p-6 bg-green-900/20 border border-green-800 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <h4 className="text-lg font-bold text-green-400">Deployment Triggered!</h4>
                  <p className="text-sm text-green-500/80">
                    The repository is being cloned and Vercel/Supabase environments are being provisioned.
                  </p>
                </div>
              ) : (
                <div className="bg-black border border-zinc-800 p-4 rounded-lg space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Target Repo</span>
                    <span className="text-white font-mono truncate max-w-[200px]">{formData.repoUrl || 'Missing'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Vercel Project</span>
                    <span className="text-white">{formData.vercelProjectName || 'Missing'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Supabase Configured</span>
                    <span className="text-white">{formData.supabaseUrl ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-zinc-800">
        <button
          onClick={prevStep}
          disabled={step === 1 || deploymentSuccess}
          className="px-6 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-white text-black text-sm font-bold rounded hover:bg-zinc-200 transition-colors flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleDeploy}
            disabled={isDeploying || deploymentSuccess}
            className="px-6 py-2 bg-white text-black text-sm font-bold rounded hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isDeploying ? "Deploying..." : deploymentSuccess ? "Deployed" : "Trigger Deployment"}
          </button>
        )}
      </div>
    </div>
  );
}
