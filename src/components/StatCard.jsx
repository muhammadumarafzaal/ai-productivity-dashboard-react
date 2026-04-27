import React from 'react';
import { Card } from './ui/Card';
import { motion } from 'framer-motion';

export function StatCard({ title, value, icon: Icon, trend, description }) {
  return (
    <Card className="p-6 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-1 tracking-tight">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend >= 0 ? '+' : ''}{trend}% from last week
            </p>
          )}
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} />
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 text-primary/5 group-hover:text-primary/10 transition-colors">
        <Icon size={120} />
      </div>
    </Card>
  );
}
