import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ToastContainer } from './components/Toast';
import { AddTaskModal } from './components/AddTaskModal';
import { EditTaskModal } from './components/EditTaskModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { TaskDetailModal } from './components/TaskDetailModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Today } from './pages/Today';
import { Upcoming } from './pages/Upcoming';
import { Completed } from './pages/Completed';
import { Categories } from './pages/Categories';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

/**
 * Main Layout with responsive desktop sidebar and mobile slide-out drawer
 */
const AppLayout: React.FC = () => {
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useTaskContext();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col antialiased">
      {/* Background subtle abstract gradient accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-1 h-screen overflow-hidden">
        {/* Desktop Fixed Sidebar */}
        <div className="hidden lg:block shrink-0 h-full">
          <Sidebar />
        </div>

        {/* Mobile Slide-out Drawer */}
        {isMobileSidebarOpen && (
          <div
            id="mobile-sidebar-drawer-backdrop"
            className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div
              id="mobile-sidebar-drawer"
              onClick={(e) => e.stopPropagation()}
              className="w-72 max-w-[80vw] h-full bg-white dark:bg-zinc-900 shadow-2xl animate-in slide-in-from-left duration-250"
            >
              <Sidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header */}
          <Topbar onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />

          {/* Main Scrollable View */}
          <main
            id="main-scroll-container"
            className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/today" element={<Today />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Global Modals & Toasts */}
      <AddTaskModal />
      <EditTaskModal />
      <DeleteConfirmModal />
      <TaskDetailModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppLayout />
      </TaskProvider>
    </BrowserRouter>
  );
}
