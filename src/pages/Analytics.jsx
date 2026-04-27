import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useTasks } from '../context/TaskContext';
import { useHabits } from '../context/HabitContext';
import { TrendingUp, Award, Zap, Activity } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/ui/Button';

const data = [
  { name: 'Mon', completed: 4, goal: 5 },
  { name: 'Tue', completed: 3, goal: 5 },
  { name: 'Wed', completed: 6, goal: 5 },
  { name: 'Thu', completed: 8, goal: 5 },
  { name: 'Fri', completed: 5, goal: 5 },
  { name: 'Sat', completed: 2, goal: 5 },
  { name: 'Sun', completed: 3, goal: 5 },
];

const habitPerformance = [
  { name: 'Meditation', score: 85, color: '#6366f1' },
  { name: 'Reading', score: 60, color: '#8b5cf6' },
  { name: 'Workout', score: 95, color: '#ec4899' },
  { name: 'Coding', score: 75, color: '#06b6d4' },
];

export default function Analytics() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Productivity Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your performance metrics and trends.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Best Day" value="Thursday" icon={Award} trend={15} description="8 tasks completed" />
        <StatCard title="Focus Score" value="78/100" icon={Zap} trend={4} description="Based on deep work hours" />
        <StatCard title="Weekly Volume" value="31 Tasks" icon={TrendingUp} trend={12} description="Higher than average" />
        <StatCard title="Activity Level" value="High" icon={Activity} trend={0} description="Steady consistency" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Task Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                  <Area type="monotone" dataKey="goal" stroke="#cbd5e1" strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Habit Consistency (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={habitPerformance} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={32}>
                    {habitPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="bg-primary/10 p-3 rounded-xl text-primary h-fit">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold">Peak Performance Detected</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You are 25% more likely to complete "High Priority" tasks when you tackle them before 10 AM. 
                  Try scheduling your most difficult task as the first item of the day tomorrow.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <div className="bg-amber-500/10 p-3 rounded-xl text-amber-600 h-fit">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="font-bold">Consistency Warning</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your "Reading" habit completion rate has dropped by 15% this week. 
                  Consider reducing your daily goal from 20 pages to 10 pages to rebuild the momentum.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Monthly Milestone</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-8 border-primary/30 flex items-center justify-center mb-6 relative">
              <div className="text-3xl font-bold text-primary">72%</div>
              <svg className="absolute -inset-2 w-36 h-36 rotate-[-90deg]">
                <circle
                  cx="72" cy="72" r="64"
                  fill="none" stroke="currentColor" strokeWidth="8"
                  className="text-primary"
                  strokeDasharray={402}
                  strokeDashoffset={402 * (1 - 0.72)}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4 className="font-bold text-xl mb-2">Almost Diamond Level</h4>
            <p className="text-sm text-slate-400">
              Complete 12 more tasks this month to reach the Diamond productivity tier.
            </p>
            <Button className="w-full mt-6 bg-white text-slate-900 hover:bg-slate-100">
              Share Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
