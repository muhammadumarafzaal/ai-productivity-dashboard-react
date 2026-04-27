import React, { createContext, useContext, useReducer, useEffect } from 'react';

const HabitContext = createContext();

const initialState = {
  habits: JSON.parse(localStorage.getItem('habits')) || [
    { id: '1', name: 'Morning Meditation', streak: 5, completedDays: [new Date().toISOString().split('T')[0]], color: '#6366f1' },
    { id: '2', name: 'Read 20 Pages', streak: 3, completedDays: [], color: '#8b5cf6' },
    { id: '3', name: 'Workout', streak: 12, completedDays: [new Date().toISOString().split('T')[0]], color: '#ec4899' },
  ],
};

function habitReducer(state, action) {
  switch (action.type) {
    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] };
    case 'TOGGLE_HABIT':
      const today = new Date().toISOString().split('T')[0];
      return {
        ...state,
        habits: state.habits.map(habit => {
          if (habit.id === action.payload) {
            const isCompletedToday = habit.completedDays.includes(today);
            const newCompletedDays = isCompletedToday
              ? habit.completedDays.filter(d => d !== today)
              : [...habit.completedDays, today];
            
            // Simple streak calculation (mock)
            const newStreak = isCompletedToday ? Math.max(0, habit.streak - 1) : habit.streak + 1;
            
            return { ...habit, completedDays: newCompletedDays, streak: newStreak };
          }
          return habit;
        }),
      };
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload),
      };
    default:
      return state;
  }
}

export function HabitProvider({ children }) {
  const [state, dispatch] = useReducer(habitReducer, initialState);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(state.habits));
  }, [state.habits]);

  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
}

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabits must be used within a HabitProvider');
  return context;
};
