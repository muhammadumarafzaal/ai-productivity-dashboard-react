import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { useTasks } from '../context/TaskContext';
import { useHabits } from '../context/HabitContext';
import { Sparkles, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIInsights() {
  const { state: taskState } = useTasks();
  const { state: habitState } = useHabits();

  const insights = useMemo(() => {
    const pendingHighPriority = taskState.tasks.filter(t => t.priority === 'high' && t.status !== 'done');
    const completedToday = habitState.habits.filter(h => h.completedDays.includes(new Date().toISOString().split('T')[0]));
    const missedHabits = habitState.habits.filter(h => !h.completedDays.includes(new Date().toISOString().split('T')[0]));

    const list = [];

    if (pendingHighPriority.length > 0) {
      list.push({
        type: 'action',
        icon: AlertCircle,
        color: 'text-rose-500',
        title: 'Priority Focus',
        text: `You have ${pendingHighPriority.length} high-priority tasks pending. Start with "${pendingHighPriority[0].title}" to maximize productivity.`,
      });
    }

    if (missedHabits.length > 0) {
      list.push({
        type: 'habit',
        icon: Sparkles,
        color: 'text-indigo-500',
        title: 'Habit Routine',
        text: `It's not too late to complete your "${missedHabits[0].name}" habit!`,
      });
    }

    if (completedToday.length === habitState.habits.length && habitState.habits.length > 0) {
      list.push({
        type: 'success',
        icon: CheckCircle2,
        color: 'text-emerald-500',
        title: 'Perfect Streak',
        text: "Amazing work! You've completed all your habits for today. You're in the top 5% of productive users.",
      });
    }

    list.push({
      type: 'insight',
      icon: TrendingUp,
      color: 'text-amber-500',
      title: 'Trend Analysis',
      text: "Based on your activity, you're most productive between 9 AM and 11 AM. Schedule your deep work then.",
    });

    return list;
  }, [taskState.tasks, habitState.habits]);

  return (
    <Card className="h-full border-primary/20 bg-primary/[0.02]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="text-primary fill-primary/20" size={20} />
          AI Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-border/50"
            >
              <div className={`mt-1 ${insight.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{insight.text}</p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
