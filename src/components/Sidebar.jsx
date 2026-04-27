import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  RefreshCcw, 
  BarChart3, 
  Calendar, 
  Settings,
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: RefreshCcw, label: 'Habits', path: '/habits' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="h-screen sticky top-0 border-r bg-background/50 backdrop-blur-xl flex flex-col z-50 transition-colors"
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 font-bold text-xl tracking-tight"
          >
            <div className="bg-primary p-2 rounded-lg text-primary-foreground">
              <BrainCircuit size={24} />
            </div>
            <span>Nova AI</span>
          </motion.div>
        )}
        {collapsed && (
          <div className="bg-primary p-2 rounded-lg text-primary-foreground mx-auto">
            <BrainCircuit size={24} />
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              <Icon size={collapsed ? 24 : 20} className={collapsed ? "mx-auto" : ""} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
              {!collapsed && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-current opacity-0 group-[.active]:opacity-100"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
        >
          {collapsed ? <PanelLeftOpen size={24} className="mx-auto" /> : (
            <>
              <PanelLeftClose size={20} />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
