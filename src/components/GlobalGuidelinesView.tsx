import { motion } from "framer-motion";
import {
  FileText, Globe, ShoppingCart, MousePointerClick, FormInput,
  Play, CheckCircle2,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

interface EventGroup {
  category: string;
  icon: any;
  color: string;
  events: { name: string; params: string; required: boolean }[];
}

const eventGroups: EventGroup[] = [
  {
    category: "Core Events", icon: Globe, color: "text-indigo-600",
    events: [
      { name: "page_view", params: "page_url, page_title, page_location", required: true },
      { name: "screen_view", params: "screen_name, screen_class", required: true },
      { name: "user_engagement", params: "engagement_time_msec", required: true },
      { name: "scroll_depth", params: "page_url, scroll_percentage", required: false },
      { name: "click", params: "link_url, link_text, outbound", required: false },
      { name: "file_download", params: "file_name, file_extension, link_url", required: false },
    ],
  },
  {
    category: "Ecommerce Events", icon: ShoppingCart, color: "text-emerald-600",
    events: [
      { name: "product_view", params: "product_id, product_name, category, price", required: true },
      { name: "add_to_cart", params: "product_id, quantity, price, currency", required: true },
      { name: "remove_from_cart", params: "product_id, quantity", required: true },
      { name: "begin_checkout", params: "items, value, currency", required: true },
      { name: "add_payment_info", params: "payment_type, items, value", required: true },
      { name: "purchase", params: "order_id, revenue, currency, items", required: true },
      { name: "refund", params: "order_id, value, currency", required: true },
      { name: "view_item_list", params: "item_list_id, item_list_name, items", required: true },
      { name: "select_item", params: "item_list_id, items", required: true },
    ],
  },
  {
    category: "Engagement Events", icon: MousePointerClick, color: "text-amber-600",
    events: [
      { name: "select_content", params: "content_type, content_id", required: true },
      { name: "share", params: "method, content_type, item_id", required: false },
      { name: "outbound_click", params: "link_url, link_domain", required: true },
      { name: "site_search", params: "search_term, search_results", required: true },
      { name: "generate_lead", params: "value, currency, source", required: false },
      { name: "product_review_submit", params: "product_id, review_rating", required: true },
    ],
  },
  {
    category: "Form Events", icon: FormInput, color: "text-primary",
    events: [
      { name: "form_submit", params: "form_id, form_name, form_type", required: true },
      { name: "newsletter_signup", params: "email_hash, source, campaign", required: true },
      { name: "sign_up", params: "method", required: true },
      { name: "login", params: "method", required: true },
    ],
  },
  {
    category: "Video Events", icon: Play, color: "text-purple-600",
    events: [
      { name: "video_start", params: "video_id, video_title, duration", required: true },
      { name: "video_complete", params: "video_id, video_title, duration", required: true },
      { name: "video_progress", params: "video_id, percent, duration", required: false },
    ],
  },
];

const GlobalGuidelinesView = () => (
  <div className="space-y-6">
    <motion.div {...fade(0)}>
      <div className="flex items-center gap-4 mb-1">
        <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-heading text-2xl font-extrabold">Global Measurement Guidelines</h2>
          <p className="text-sub text-sm">Official measurement plan used across all monitored websites.</p>
        </div>
      </div>
    </motion.div>

    {/* Summary */}
    <motion.div {...fade(0.05)} className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {eventGroups.map((g) => (
        <div key={g.category} className="card-elevated rounded-xl p-3 text-center">
          <g.icon className={`w-5 h-5 ${g.color} mx-auto mb-1`} />
          <div className="text-lg font-extrabold text-heading">{g.events.length}</div>
          <div className="text-[9px] text-sub">{g.category}</div>
        </div>
      ))}
    </motion.div>

    {eventGroups.map((group, gi) => (
      <motion.div key={group.category} {...fade(gi * 0.08 + 0.1)} className="card-float rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-muted/30 border-b border-border">
          <group.icon className={`w-5 h-5 ${group.color}`} />
          <h3 className="text-heading text-sm font-bold">{group.category}</h3>
          <span className="ml-auto text-[10px] text-sub">{group.events.length} events</span>
        </div>
        <div className="divide-y divide-border">
          {group.events.map((event) => (
            <div key={event.name} className="grid grid-cols-[1fr_1fr_60px] gap-4 px-6 py-3 items-center">
              <div className="text-xs font-mono text-heading font-bold">{event.name}</div>
              <div className="text-[10px] text-sub">{event.params}</div>
              <div className="text-center">
                {event.required ? (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Required</span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-sub border border-border">Optional</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

export default GlobalGuidelinesView;
