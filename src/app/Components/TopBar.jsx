import React from "react";
import { GraduationCap } from "lucide-react";

export default function TopBar({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">SSAT Practice Session</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
}
