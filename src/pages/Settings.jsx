import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Moon, 
  Sun, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Laptop,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Laptop, label: 'System' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and application appearance.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette size={20} className="text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how Nova AI looks on your device.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {themes.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`
                      flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all
                      ${theme === t.id 
                        ? 'border-primary bg-primary/[0.02] text-primary' 
                        : 'border-border hover:border-border/80'
                      }
                    `}
                  >
                    <Icon size={24} />
                    <span className="text-sm font-semibold">{t.label}</span>
                  {theme === t.id && (
                    <motion.div layoutId="active-theme" className="absolute top-2 right-2 text-primary">
                      <Check size={16} />
                    </motion.div>
                  )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} className="text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Rivera"
                  className="w-full h-10 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alex@nova-ai.io"
                  className="w-full h-10 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} className="text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Task Reminders', desc: 'Get notified when a task deadline is approaching.' },
              { label: 'Daily Digest', desc: 'Receive a morning summary of your planned habits.' },
              { label: 'Productivity Milestones', desc: 'Alerts when you hit a streak or complete a project.' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-slate-50/50 dark:bg-slate-900/50">
                <div>
                  <h4 className="font-semibold">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-rose-500/20 bg-rose-500/[0.01]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-500">
              <Shield size={20} />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Delete all your tasks, habits, and application data.</p>
            <Button variant="destructive">Reset All Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
