import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Plus, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HabitModal } from '../components/HabitModal';

export default function Habits() {
  const { state, dispatch } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const toggleHabit = (id) => {
    dispatch({ type: 'TOGGLE_HABIT', payload: id });
  };

  const deleteHabit = (id) => {
    if (confirm('Are you sure you want to stop tracking this habit?')) {
      dispatch({ type: 'DELETE_HABIT', payload: id });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
          <p className="text-muted-foreground mt-1">Consistency is key to long-term success.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add New Habit
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {state.habits.map((habit) => (
          <Card key={habit.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: habit.color }}>
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                      style={{ backgroundColor: habit.color, boxShadow: `0 8px 16px ${habit.color}33` }}
                    >
                      {habit.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{habit.name}</h3>
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                        <Flame size={16} fill="currentColor" />
                        {habit.streak} Day Streak
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteHabit(habit.id)}
                    className="text-muted-foreground hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    <span>Weekly Progress</span>
                    <span>{Math.round((habit.completedDays.length / 30) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (habit.completedDays.length / 30) * 100)}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 bg-slate-50/30 dark:bg-slate-900/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">Activity</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm"><ChevronLeft size={16} /></Button>
                    <span className="text-xs font-medium">This Week</span>
                    <Button variant="ghost" size="sm"><ChevronRight size={16} /></Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-3">
                  {days.map((day) => {
                    const isCompleted = habit.completedDays.includes(day);
                    const isToday = day === new Date().toISOString().split('T')[0];
                    const dateObj = new Date(day);
                    
                    return (
                      <div key={day} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">
                          {dateObj.toLocaleDateString(undefined, { weekday: 'short' })}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => isToday && toggleHabit(habit.id)}
                          className={`
                            w-full aspect-square rounded-xl flex items-center justify-center transition-all border-2
                            ${isCompleted 
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                              : isToday 
                                ? 'border-primary border-dashed bg-primary/5 text-primary' 
                                : 'bg-white dark:bg-slate-900 border-border text-muted-foreground/30'
                            }
                          `}
                        >
                          {isCompleted ? <CheckCircle2 size={24} /> : isToday ? <Plus size={20} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                        </motion.button>
                        <span className="text-[10px] font-medium">
                          {dateObj.getDate()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        ))}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-semibold">Create a new habit</span>
          <p className="text-sm mt-1">Start tracking a new daily goal</p>
        </button>
      </div>

      <HabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
