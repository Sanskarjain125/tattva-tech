import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Users,
  FolderGit2,
  Layers,
  BookOpen,
  LogOut,
  Globe,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Bell,
} from 'lucide-react';

export default function AdminLayout({
  activeTab,
  setActiveTab,
  adminUser,
  onLogout,
  onBackToPublicSite,
  children,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'contacts', label: 'Client Enquiries', icon: MessageSquare },
    { id: 'products', label: 'Products Management', icon: Layers },
    { id: 'projects', label: 'Work & Projects', icon: FolderGit2 },
    { id: 'insights', label: 'Insights & Case Studies', icon: BookOpen },
    { id: 'jobs', label: 'Job Vacancies', icon: Briefcase },
    { id: 'applications', label: 'Candidate Applications', icon: Users },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex-shrink-0 justify-between">
        <div>
          {/* Logo & Brand */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src="/t-logo.png" alt="Tattvaa Tech Logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <div className="text-base font-black text-white tracking-wide">TATTVAA ADMIN</div>
              <div className="text-[9px] tracking-widest text-blue-400 font-bold uppercase">MANAGEMENT CONSOLE</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <button
            onClick={onBackToPublicSite}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>View Public Website</span>
          </button>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-900/60 text-blue-300 flex items-center justify-center text-xs font-bold border border-blue-700/50">
                {adminUser?.name?.charAt(0) || 'A'}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white truncate max-w-[100px]">{adminUser?.name || 'Admin'}</div>
                <div className="text-[10px] text-slate-500">Super Admin</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/t-logo.png" alt="Tattvaa Tech" className="w-8 h-8 object-contain" />
          </div>
          <span className="font-extrabold text-sm tracking-wide">TATTVAA ADMIN</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToPublicSite}
            className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-cyan-400 font-medium"
          >
            Public Site
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded bg-slate-800 text-slate-300"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 z-30">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">{adminUser?.email}</span>
            <button onClick={onLogout} className="text-xs text-rose-400 font-bold flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200/90 px-6 py-4 flex items-center justify-between shadow-2xs">
          <div>
            <h1 className="text-xl font-black text-slate-900 capitalize">
              {menuItems.find((m) => m.id === activeTab)?.label || 'Dashboard'}
            </h1>
            {/* <p className="text-xs text-slate-500">Live MongoDB synchronization</p> */}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPublicSite}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Public Website</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                {adminUser?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-bold text-slate-900">{adminUser?.name || 'Administrator'}</div>
                <div className="text-[10px] text-slate-400">{adminUser?.email}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
