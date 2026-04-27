import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 p-6 bg-rose-500/10 rounded-full text-rose-500"
      >
        <AlertCircle size={64} />
      </motion.div>
      <h1 className="text-6xl font-black tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. 
        Don't worry, even the most productive people get lost sometimes.
      </p>
      <Link to="/">
        <Button className="gap-2 px-8 py-6 text-lg">
          <Home size={20} /> Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
