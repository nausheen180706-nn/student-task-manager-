import React, { useState, useRef, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  User,
  RotateCcw,
  Sparkles,
  CheckCircle,
  Laptop
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileSidebar }) => {
  const {
    searchTerm,
    setSearchTerm,
    theme,
    toggleTheme,
    notifications,
    resetDemoData,
    tasks
  } = useTaskContext();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle outside click for profile dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // If user starts typing on another page, they might want to view results in My Tasks
    if (value.trim() && location.pathname !== '/tasks' && location.pathname !== '/') {
      navigate('/tasks');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <header
      id="top-navigation-bar"
      className="h-16 px-4 lg:px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-30 flex items-center justify-between gap-4"
    >
      {/* Left: Mobile hamburger & Search input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          id="btn-hamburger-mobile"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="global-search-tasks-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks by title, category, description..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Button */}
        <button
          id="btn-theme-toggle"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark and light theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-zinc-700 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="btn-notification-toggle"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
            )}
          </button>
          <NotificationDropdown
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            id="btn-profile-avatar-menu"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
            aria-label="Open student profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
              SU
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-zinc-700 dark:text-zinc-200 pr-1">
              Student User
            </span>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div
              id="profile-dropdown-panel"
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Student User</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  B.Tech in AI & Data Science
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Semester 2 • CS101 Demo
                </p>
              </div>

              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <User className="w-4 h-4 text-zinc-400" />
                  Account & Preferences
                </button>

                <button
                  onClick={() => {
                    resetDemoData();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Webinar Demo Tasks
                </button>
              </div>

              <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400">
                <span>TaskFlow v1.0 • React + Vite</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
