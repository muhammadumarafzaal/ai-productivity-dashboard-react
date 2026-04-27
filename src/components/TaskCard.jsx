import React from 'react';
import { Card } from './ui/Card';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical, Calendar, Tag, Trash2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export function TaskCard({ task }) {
  const { dispatch } = useTasks();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const priorityColors = {
    high: 'text-rose-500 bg-rose-500/10',
    medium: 'text-amber-500 bg-amber-500/10',
    low: 'text-emerald-500 bg-emerald-500/10',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
      <Card className="p-4 mb-3 card-hover border-border/50 group">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <button 
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <h4 className="font-semibold text-sm leading-tight mb-2 group-hover:text-primary transition-colors">
          {task.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
          {task.description}
        </p>
        <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground border-t border-border/50 pt-3">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(task.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-card" />
            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[8px] border-2 border-card">
              +1
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
