import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { useTasks } from '../context/TaskContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskModal } from '../components/TaskModal';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state: taskState } = useTasks();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const getTasksForDay = (day) => {
    return taskState.tasks.filter(task => isSameDay(new Date(task.date), day));
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">Schedule and organize your upcoming deadlines.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border rounded-lg p-1">
            <Button variant="ghost" size="sm" onClick={prevMonth}><ChevronLeft size={18} /></Button>
            <span className="px-4 font-bold min-w-[140px] text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="ghost" size="sm" onClick={nextMonth}><ChevronRight size={18} /></Button>
          </div>
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add Event
          </Button>
        </div>
      </header>

      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
          {calendarDays.map((day, idx) => {
            const dayTasks = getTasksForDay(day);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, monthStart);

            return (
              <div 
                key={idx} 
                className={`
                  min-h-[120px] p-2 border-r border-b border-border/30 transition-colors
                  ${!isCurrentMonth ? 'bg-slate-50/30 dark:bg-slate-900/10 text-muted-foreground/30' : 'bg-white dark:bg-slate-950'}
                  ${isToday ? 'bg-primary/[0.02]' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`
                    text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full
                    ${isToday ? 'bg-primary text-primary-foreground' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.map(task => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={task.id} 
                      className={`
                        text-[10px] p-1.5 rounded border border-transparent font-medium truncate
                        ${task.priority === 'high' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                          task.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                          'bg-emerald-50 text-emerald-600 border-emerald-100'}
                        dark:bg-opacity-10
                      `}
                    >
                      {task.title}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
