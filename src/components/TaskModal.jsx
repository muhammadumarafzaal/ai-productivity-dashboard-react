import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useTasks } from '../context/TaskContext';

export function TaskModal({ isOpen, onClose, initialStatus = 'todo' }) {
  const { dispatch } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: initialStatus,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      ...formData,
      id: Date.now().toString(),
      date: new Date(formData.date).toISOString()
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: initialStatus,
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Title</label>
          <input
            autoFocus
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="What needs to be done?"
            className="w-full h-11 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add some details..."
            rows={3}
            className="w-full p-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Deadline</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
