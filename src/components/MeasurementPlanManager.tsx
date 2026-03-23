import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Plus, Edit3, XCircle, CheckCircle2, Save, Trash2,
  Upload, ChevronDown, Settings2, ToggleLeft, ToggleRight,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

interface MeasurementEvent {
  id: number;
  name: string;
  description: string;
  parameters: string;
  triggerCondition: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  category: "Core" | "Ecommerce" | "Engagement" | "Form" | "Video";
  required: boolean;
  active: boolean;
}

const defaultEvents: MeasurementEvent[] = [
  { id: 1, name: "page_view", description: "Fires on every page load", parameters: "page_url, page_title, page_location", triggerCondition: "All pages", priority: "Critical", category: "Core", required: true, active: true },
  { id: 2, name: "product_view", description: "Product detail page view", parameters: "product_id, product_name, category, price", triggerCondition: "Product detail pages", priority: "Critical", category: "Ecommerce", required: true, active: true },
  { id: 3, name: "add_to_cart", description: "Item added to cart", parameters: "product_id, quantity, price, currency", triggerCondition: "Add to cart button click", priority: "Critical", category: "Ecommerce", required: true, active: true },
  { id: 4, name: "purchase", description: "Purchase completed", parameters: "order_id, revenue, currency, items", triggerCondition: "Order confirmation page", priority: "Critical", category: "Ecommerce", required: true, active: true },
  { id: 5, name: "video_start", description: "Video playback started", parameters: "video_id, video_title, duration", triggerCondition: "Video play button click", priority: "High", category: "Video", required: true, active: true },
  { id: 6, name: "video_complete", description: "Video playback completed", parameters: "video_id, video_title, duration", triggerCondition: "Video ended", priority: "High", category: "Video", required: true, active: true },
  { id: 7, name: "form_submit", description: "Form submission", parameters: "form_id, form_name, form_type", triggerCondition: "Form submit event", priority: "High", category: "Form", required: true, active: true },
  { id: 8, name: "newsletter_signup", description: "Newsletter signup", parameters: "email_hash, source, campaign", triggerCondition: "Newsletter form submit", priority: "Medium", category: "Form", required: true, active: true },
  { id: 9, name: "product_review_submit", description: "Product review submitted", parameters: "product_id, review_rating, review_length", triggerCondition: "Review submit button click", priority: "Medium", category: "Engagement", required: true, active: true },
  { id: 10, name: "scroll_depth", description: "User scroll milestone", parameters: "page_url, scroll_percentage", triggerCondition: "25%, 50%, 75%, 100% scroll", priority: "Low", category: "Engagement", required: false, active: true },
];

const priorityColors = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-amber-50 text-amber-700 border-amber-200",
  Medium: "bg-primary/5 text-primary border-primary/20",
  Low: "bg-muted text-sub border-border",
};

const categoryColors = {
  Core: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Ecommerce: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Engagement: "bg-amber-50 text-amber-700 border-amber-200",
  Form: "bg-primary/5 text-primary border-primary/20",
  Video: "bg-purple-50 text-purple-700 border-purple-200",
};

const categories = ["All", "Core", "Ecommerce", "Engagement", "Form", "Video"] as const;

const MeasurementPlanManager = () => {
  const [events, setEvents] = useState<MeasurementEvent[]>(defaultEvents);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "", description: "", parameters: "", triggerCondition: "",
    priority: "Medium" as MeasurementEvent["priority"],
    category: "Core" as MeasurementEvent["category"],
    required: true,
  });

  const filteredEvents = filterCategory === "All" ? events : events.filter((e) => e.category === filterCategory);

  const addEvent = () => {
    if (!newEvent.name.trim()) return;
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now(), active: true }]);
    setNewEvent({ name: "", description: "", parameters: "", triggerCondition: "", priority: "Medium", category: "Core", required: true });
    setShowAddForm(false);
  };

  const toggleActive = (id: number) => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, active: !e.active } : e));
  };

  const removeEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div {...fade(0)}>
        <div className="flex items-center gap-4 mb-1">
          <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-heading text-2xl font-extrabold">Measurement Plan Management</h2>
            <p className="text-sub text-sm">Define and manage global tracking guidelines across all websites.</p>
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </motion.div>

      {/* Add form */}
      {showAddForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="card-float rounded-2xl p-6">
          <h3 className="text-heading text-sm font-bold mb-4">Add New Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">Event Name</label>
              <input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/30" placeholder="e.g. wishlist_add" />
            </div>
            <div>
              <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">Description</label>
              <input value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/30" placeholder="Description" />
            </div>
            <div>
              <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">Parameters</label>
              <input value={newEvent.parameters} onChange={(e) => setNewEvent({ ...newEvent, parameters: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/30" placeholder="param1, param2" />
            </div>
            <div>
              <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">Trigger Condition</label>
              <input value={newEvent.triggerCondition} onChange={(e) => setNewEvent({ ...newEvent, triggerCondition: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:border-primary/30" placeholder="When to fire" />
            </div>
            <div>
              <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">Category</label>
              <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading focus:outline-none focus:border-primary/30">
                {["Core", "Ecommerce", "Engagement", "Form", "Video"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-sub uppercase tracking-wider mb-1 block">Priority</label>
              <select value={newEvent.priority} onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-heading focus:outline-none focus:border-primary/30">
                {["Critical", "High", "Medium", "Low"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addEvent} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Add Event
            </button>
            <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-sm font-medium text-sub hover:text-heading transition-colors">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Category filters */}
      <motion.div {...fade(0.05)} className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterCategory === cat ? "bg-primary/10 text-primary border border-primary/20" : "bg-card border border-border text-sub hover:text-heading"}`}>
            {cat} {cat !== "All" && <span className="ml-1 opacity-60">({events.filter((e) => e.category === cat).length})</span>}
          </button>
        ))}
      </motion.div>

      {/* Events table */}
      <motion.div {...fade(0.1)} className="card-float rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_80px_80px_50px] gap-2 px-6 py-3 bg-muted/50 border-b border-border text-[10px] font-semibold text-sub uppercase tracking-wider">
          <span>Event</span><span>Parameters</span><span>Priority</span><span>Category</span><span className="text-center">Active</span>
        </div>
        <div className="divide-y divide-border">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`grid grid-cols-[1fr_100px_80px_80px_50px] gap-2 px-6 py-3 items-center ${!event.active ? "opacity-50" : ""}`}>
              <div>
                <div className="text-xs text-heading font-mono font-bold">{event.name}</div>
                <div className="text-[10px] text-sub mt-0.5">{event.description}</div>
              </div>
              <div className="text-[10px] text-sub truncate" title={event.parameters}>{event.parameters}</div>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border w-fit ${priorityColors[event.priority]}`}>{event.priority}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border w-fit ${categoryColors[event.category]}`}>{event.category}</span>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => toggleActive(event.id)} className="text-muted-foreground hover:text-primary transition-colors">
                  {event.active ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div {...fade(0.15)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Events", value: events.length, color: "text-heading" },
          { label: "Active", value: events.filter((e) => e.active).length, color: "text-emerald-600" },
          { label: "Required", value: events.filter((e) => e.required).length, color: "text-primary" },
          { label: "Inactive", value: events.filter((e) => !e.active).length, color: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="card-elevated rounded-xl p-4 text-center">
            <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-sub mt-0.5">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="flex justify-end">
        <button onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Measurement Plan"}
        </button>
      </div>
    </div>
  );
};

export default MeasurementPlanManager;
