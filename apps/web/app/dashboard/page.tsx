"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  
  // States
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 1. Fetch Tasks (Sirf ek baar loading par)
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("nexus_token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:3001/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Task fetch failed", err);
      }
    };
    fetchTasks();
  }, []);

  // 2. Add Task Logic
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("nexus_token");
    try {
      const res = await axios.post(
        "http://localhost:3001/api/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state so UI updates instantly
      setTasks([...tasks, res.data]); 
      setIsOpen(false); 
      setTitle(""); 
      setDescription("");
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };


  const handleDeleteTask = async (taskId: string) => {
    const token = localStorage.getItem("nexus_token");
    try{
        await axios.delete(`http://localhost:3001/api/tasks/${taskId}` , {
            headers: {Authorization: `Bearer ${token}`}
        });
        setTasks(tasks.filter((task:any) => task.id !== taskId));
    }catch(err){
        console.error("Delete fail ho gaya" , err);
    }
  }

  const logout = () => {
    localStorage.removeItem("nexus_token");
    router.push("/login");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header section with Logout and Add Task */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Nexus Dashboard</h1>
        <div className="space-x-4">
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600">+ Add Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4 pt-4">
                <Input 
                  placeholder="What needs to be done?" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
                <Input 
                  placeholder="Brief description (optional)" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
                <Button type="submit" className="w-full">Save Task</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="grid gap-4">
        {tasks.length > 0 ? (
          tasks.map((task: any) => (
            <div key={task.id} className="p-4 border rounded-lg shadow-sm bg-white hover:border-blue-400 transition-all">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description || "No description provided."}</p>

            <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>
                Delete
            </Button>
            </div>
           
          ))
        ) : (
          <div className="text-center p-20 border-2 border-dashed rounded-xl">
            <p className="text-gray-400">No tasks yet. Start by clicking "+ Add Task"</p>
          </div>
        )}
      </div>
    </div>
  );
}