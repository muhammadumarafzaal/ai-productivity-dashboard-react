import React from 'react';
import { StatCard } from '../components/StatCard';
import { AIInsights } from '../components/AIInsights';
import { useTasks } from '../context/TaskContext';
import { useHabits } from '../context/HabitContext';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  Target,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { state: taskState } = useTasks();
  const { state: habitState } = useHabits();

  const completedTasks = taskState.tasks.filter(t => t.status === 'done').length;
  const pendingTasks = taskState.tasks.filter(t => t.status !== 'done').length;
  const totalStreaks = habitState.habits.reduce((acc, curr) => acc + curr.streak, 0);
  const completionRate = Math.round((completedTasks / (taskState.tasks.length || 1)) * 100);

  const recentTasks = [...taskState.tasks].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Good afternoon, Alex!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your productivity today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/tasks">
            <Button variant="outline" className="gap-2">
              <Plus size={18} /> New Task
            </Button>
          </Link>
          <Button className="gap-2 shadow-primary/20 shadow-lg">
            Complete Daily Habits
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tasks Completed" 
          value={completedTasks} 
          icon={CheckCircle2} 
          trend={12}
          description="Tasks finished this week"
        />
        <StatCard 
          title="Productivity Rate" 
          value={`${completionRate}%`} 
          icon={Target} 
          trend={5}
          description="Overall completion rate"
        />
        <StatCard 
          title="Active Streaks" 
          value={totalStreaks} 
          icon={Flame} 
          trend={2}
          description="Combined habit streaks"
        />
        <StatCard 
          title="Pending Focus" 
          value={pendingTasks} 
          icon={Clock} 
          trend={-8}
          description="Items in your backlog"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AIInsights />
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tasks</CardTitle>
              <Link to="/tasks" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                View All <ArrowRight size={14} />
              </Link>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-rose-500' : 
                      task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mt-0.5">{task.status.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {new Date(task.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-xl">Weekly Goal</CardTitle>
              <CardDescription className="text-primary-foreground/80">You're almost there! 85% reached.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <p className="text-xs mt-4 leading-relaxed opacity-90">
                Complete 5 more tasks to reach your weekly milestone and unlock a new achievement badge.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Habits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {habitState.habits.slice(0, 3).map((habit) => (
                <div key={habit.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: habit.color }}
                    >
                      {habit.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{habit.name}</h4>
                      <p className="text-xs text-muted-foreground">{habit.streak} day streak</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors cursor-pointer
                    ${habit.completedDays.includes(new Date().toISOString().split('T')[0]) 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-border group-hover:border-primary/50'
                    }
                  `}>
                    {habit.completedDays.includes(new Date().toISOString().split('T')[0]) && <CheckCircle2 size={14} />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
