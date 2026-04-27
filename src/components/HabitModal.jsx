import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useHabits } from '../context/HabitContext';

export function HabitModal({ isOpen, onClose }) {
  const { dispatch } = useHabits();
  const [formData, setFormData] = useState({
    name: '',
    color: '#6366f1',
    streak: 0,
    completedDays: []
  });

  const colors = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#3b82f6', // Blue
    '#f43f5e'  // Rose
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newHabit = {
      ...formData,
      id: Date.now().toString(),
    };

    dispatch({ type: 'ADD_HABIT', payload: newHabit });
    setFormData({
      name: '',
      color: '#6366f1',
      streak: 0,
      completedDays: []
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start New Habit">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Habit Name</label>
          <input
            autoFocus
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Morning Yoga, Read 10 mins"
            className="w-full h-11 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Theme Color</label>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-10 h-10 rounded-full transition-all border-4 ${
                  formData.color === color ? 'border-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Start Habit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
