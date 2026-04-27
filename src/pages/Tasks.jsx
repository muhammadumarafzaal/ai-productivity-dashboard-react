import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { TaskCard } from '../components/TaskCard';
import { Button } from '../components/ui/Button';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { TaskModal } from '../components/TaskModal';

function KanbanColumn({ id, title, tasks, onAddTask }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col w-full min-w-[300px] h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{title}</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-xs font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div ref={setNodeRef} className="kanban-column flex-1 overflow-y-auto custom-scrollbar">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-muted-foreground hover:text-primary h-auto py-3"
          onClick={() => onAddTask(id)}
        >
          <Plus size={16} /> Add Task
        </Button>
      </div>
    </div>
  );
}

export default function Tasks() {
  const { state, dispatch } = useTasks();
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialStatus, setModalInitialStatus] = useState('todo');

  const openModal = (status = 'todo') => {
    setModalInitialStatus(status);
    setIsModalOpen(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  const filteredTasks = state.tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Logic for moving task between columns
      // If over is a column ID
      const newStatus = over.id;
      if (['todo', 'in-progress', 'done'].includes(newStatus)) {
        dispatch({
          type: 'MOVE_TASK',
          payload: { id: active.id, status: newStatus },
        });
      }
    }
    setActiveId(null);
  };

  const activeTask = state.tasks.find((t) => t.id === activeId);

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your projects and individual tasks.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 h-10 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} /> Filter
          </Button>
          <Button className="gap-2" onClick={() => openModal('todo')}>
            <Plus size={18} /> Create Task
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto pb-4">
        <DndContext 
          sensors={sensors} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full min-h-[600px]">
            {columns.map((col) => (
              <KanbanColumn 
                key={col.id} 
                id={col.id} 
                title={col.title} 
                tasks={filteredTasks.filter(t => t.status === col.id)} 
                onAddTask={openModal}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.5',
                },
              },
            }),
          }}>
            {activeId ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialStatus={modalInitialStatus}
      />
    </div>
  );
}
