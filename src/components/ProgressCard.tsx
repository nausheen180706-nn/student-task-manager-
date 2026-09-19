import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TODAY_STR } from '../data/mockTasks';
import { Award, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProgressCard: React.FC = () => {
  const { tasks } = useTaskContext();
  const navigate = useNavigate();

  // Tasks due today
  const todayTasks = tasks.filter((t) => t.dueDate === TODAY_STR);
  const todayTotal = todayTasks.length;
  const todayCompleted = todayTasks.filter((t) => t.completed).length;

  // Percentage calculation
  const percentage = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 100;

  // Encouraging feedback text
  let encouragingText = "You're doing great! Keep going.";
  if (todayTotal === 0) {
    encouragingText = "No urgent tasks for today. Relax or get ahead on upcoming projects!";
  } else if (percentage === 100) {
    encouragingText = "Outstanding! All tasks for today are completed 🎉";
  } else if (percentage >= 70) {
    encouragingText = "Almost there! Finish the last few tasks strong.";
  } else if (percentage >= 40) {
    encouragingText = "Good momentum! Halfway through your day.";
  }

  return (
    <div
      id="today-progress-card"
      className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-lg shadow-indigo-600/15 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Abstract subtle background shapes */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-36 h-36 rounded-full bg-violet-400/15 blur-xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md">
            <Flame className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg tracking-tight">Today's Progress</h3>
            <p className="text-xs text-indigo-100 font-medium">Daily productivity target</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/today')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md transition-all flex items-center gap-1.5"
        >
          View Today <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress metrics */}
      <div className="relative z-10 space-y-3 my-1">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {todayCompleted}/{todayTotal}
            </span>
            <span className="text-xs sm:text-sm text-indigo-200 ml-2 font-medium">
              Completed Tasks
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight">
            {percentage}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
          <div
            id="today-progress-fill"
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Footer Text */}
      <div className="relative z-10 mt-4 pt-3 border-t border-white/15 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
        <p className="text-xs text-indigo-100 font-medium truncate">
          {encouragingText}
        </p>
      </div>
    </div>
  );
};
