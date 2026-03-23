import {
  ScanSearch, Tags, HeartPulse, AlertTriangle,
  FileText, Database, CheckSquare, Lightbulb,
  Activity, BarChart3, TrendingUp, Brain, Bell,
  Shield, Radio, BadgeCheck, Scale, Megaphone,
  Layers, Cpu, UserCheck, LayoutDashboard, Briefcase,
  GitCompareArrows, Search, Ticket, Code,
  Eye, Radar, ShieldCheck, Sparkles, Microscope, Wrench,
  MonitorCheck, AlertCircle, Network, Target, FileCode,
  Clock, RefreshCw, Mail, Zap, Rocket, Gauge, Bug,
  ClipboardCheck, Settings, CircuitBoard, Workflow,
} from "lucide-react";

export interface FlowStep {
  title: string;
  description: string;
  icon: any;
  detail?: string[];
}

export interface EngineData {
  id: string;
  title: string;
  shortTitle: string;
  icon: any;
  description: string;
  purpose: string;
  observes: string[];
  status: "Active" | "Running" | "Monitoring";
  group: "monitoring" | "analysis" | "action" | "lifecycle";
  steps: FlowStep[];
}

export const engines: EngineData[] = [
  // ── Monitoring & Validation ──────────────────────────────
  {
    id: "data-validation",
    title: "Data Validation Agent",
    shortTitle: "Data Validation",
    icon: ClipboardCheck,
    description: "Validates dataLayer and event payloads to ensure required parameters and correct formats.",
    purpose: "Scans dataLayer pushes and GA4 event payloads across all monitored websites, checking for required parameters, correct data types, and formatting compliance.",
    observes: ["dataLayer pushes", "GA4 event payloads", "Tag firing logs"],
    status: "Active",
    group: "monitoring",
    steps: [
      { title: "Scan Website Pages", description: "Automated crawlers scan website pages and capture all dataLayer pushes and tag firing events.", icon: Eye },
      { title: "Extract Event Payloads", description: "Extracts structured event payloads from dataLayer and GA4 event streams for validation.", icon: Database },
      { title: "Validate Parameters", description: "Checks each event payload against expected schema — required parameters, types, and formats.", icon: Tags, detail: ["Missing: currency param", "Type error: price is string", "Format: date invalid"] },
      { title: "Flag Violations", description: "Flags events with missing or malformed parameters and generates prioritized violation reports.", icon: AlertCircle },
      { title: "Issue Handoff", description: "Sends validated issues to Root Cause Analyzer for deeper investigation.", icon: Network, detail: ["12 violations detected", "3 critical", "Handoff to Root Cause"] },
    ],
  },
  {
    id: "consent-compliance",
    title: "Consent & Compliance Monitor",
    shortTitle: "Consent & Compliance",
    icon: Shield,
    description: "Ensures compliance with consent frameworks (OneTrust, GDPR, CCPA) and validates tag firing behavior.",
    purpose: "Monitors consent management platforms and validates that tags only fire when appropriate user consent has been granted across all regions.",
    observes: ["OneTrust signals", "Tag firing", "Cookie categories"],
    status: "Monitoring",
    group: "monitoring",
    steps: [
      { title: "Detect Consent Platform", description: "Automatically detects consent management platforms like OneTrust, Cookiebot, and custom solutions.", icon: Shield },
      { title: "Listen for Consent Signals", description: "Captures consent signals across all user touchpoints, tracking opt-in and opt-out patterns.", icon: Radio },
      { title: "Validate Tag Firing", description: "Verifies tags only fire when appropriate consent has been granted for each category.", icon: BadgeCheck },
      { title: "Check GDPR / CCPA / LGPD", description: "Validates implementations against regional privacy regulations with automated audit trails.", icon: Scale, detail: ["GDPR: Compliant", "CCPA: 2 violations", "LGPD: Pending review"] },
      { title: "Compliance Alert", description: "Escalates violations with priority-based alerts and stakeholder notifications.", icon: Ticket, detail: ["GDPR violation risk", "Meta Pixel firing before consent", "Priority: Critical"] },
    ],
  },
  {
    id: "measurement-governance",
    title: "Measurement Governance Engine",
    shortTitle: "Measurement Governance",
    icon: GitCompareArrows,
    description: "Validates implementation against the global measurement plan including event naming and parameter coverage.",
    purpose: "Compares expected events, parameters, and naming conventions from the global measurement plan against actual GTM implementations to detect drift.",
    observes: ["Global measurement plan", "GTM containers", "Event naming conventions"],
    status: "Active",
    group: "monitoring",
    steps: [
      { title: "Load Measurement Plan", description: "Loads the centralized event schema defining all required events, parameters, and naming conventions.", icon: FileText },
      { title: "Extract Implemented Events", description: "Extracts all configured events from GTM containers for schema comparison.", icon: Database },
      { title: "Schema Comparison", description: "Compares expected vs actual events, parameters, and naming conventions to identify drift.", icon: Brain, detail: ["Expected: product_view", "Detected: productview", "Type: Naming drift"] },
      { title: "Compliance Scoring", description: "Generates a compliance score per site based on event coverage, naming accuracy, and parameter completeness.", icon: Gauge },
      { title: "Generate Recommendations", description: "Produces actionable recommendations for fixing drift with specific correction instructions.", icon: Lightbulb, detail: ["Compliance score: 87%", "3 naming violations", "2 missing parameters"] },
    ],
  },

  // ── Analysis ─────────────────────────────────────────────
  {
    id: "root-cause",
    title: "Root Cause Analyzer",
    shortTitle: "Root Cause Analyzer",
    icon: Microscope,
    description: "Analyzes detected issues and identifies the most probable cause using GTM changes, deployments, and data patterns.",
    purpose: "Receives issue alerts from monitoring components and investigates GTM container changes, site deployments, and tag firing logs to determine root causes.",
    observes: ["GTM container changes", "Site deployments", "Tag firing logs"],
    status: "Active",
    group: "analysis",
    steps: [
      { title: "Receive Issue Alert", description: "Receives investigation request from Data Validation, Governance, or Compliance monitors with issue details.", icon: Bell },
      { title: "Analyze GTM Changes", description: "Reviews recent GTM container changes and publish timestamps to correlate with detected issues.", icon: Database },
      { title: "Analyze Site Deployments", description: "Investigates recent deployments, template changes, and code releases for correlation.", icon: Code },
      { title: "Check Tag Firing Logs", description: "Analyzes tag firing patterns, success rates, and timing to identify broken tags.", icon: MonitorCheck },
      { title: "Determine Root Cause", description: "Synthesizes findings to determine the most likely root cause with confidence scoring.", icon: Search, detail: ["Purchase events dropped 35%", "Cause: Checkout template update", "Confidence: 92%"] },
      { title: "Investigation Summary", description: "Provides comprehensive summary with root cause, evidence, and recommended remediation path.", icon: FileText, detail: ["Root cause identified", "Evidence documented", "Remediation suggested"] },
    ],
  },
  {
    id: "analytics-insights",
    title: "Analytics Insights Engine",
    shortTitle: "Analytics Insights",
    icon: Sparkles,
    description: "Generates business insights from analytics data such as GA4 trends, funnel performance, and campaign impact.",
    purpose: "Aggregates and analyzes traffic trends, conversion funnels, campaign performance, and engagement signals to produce actionable business insights.",
    observes: ["GA4 trends", "Funnel performance", "Campaign data"],
    status: "Running",
    group: "analysis",
    steps: [
      { title: "Aggregate Analytics Data", description: "Collects and normalizes analytics data from GA4, BigQuery, and custom data warehouses.", icon: Layers },
      { title: "Analyze Performance Trends", description: "Identifies patterns, correlations, and trends across traffic, conversion, and campaign metrics.", icon: TrendingUp },
      { title: "Generate AI Insights", description: "Uses LLM reasoning to produce meaningful business insights with supporting data and recommendations.", icon: Brain, detail: ["Add-to-cart increased 42% in 7 days", "Cause: New promotional campaign", "Revenue impact: +$125K"] },
      { title: "Human Validation", description: "Analysts review and validate AI-generated insights before distribution to stakeholders.", icon: UserCheck },
      { title: "Publish to Dashboard", description: "Publishes validated insights to brand dashboards and stakeholder notification channels.", icon: LayoutDashboard },
    ],
  },

  // ── Action ───────────────────────────────────────────────
  {
    id: "automation-copilot",
    title: "Automation Copilot",
    shortTitle: "Automation Copilot",
    icon: Wrench,
    description: "Suggests fixes for tracking issues including GTM tag configurations and implementation guidance.",
    purpose: "Analyzes root cause findings and measurement plan requirements to generate specific GTM tag configurations, trigger setups, and implementation guidance.",
    observes: ["Root cause reports", "Measurement plans", "GTM configurations"],
    status: "Active",
    group: "action",
    steps: [
      { title: "Receive Root Cause Report", description: "Receives confirmed root cause analysis with evidence and recommended remediation path.", icon: FileText },
      { title: "Analyze Measurement Plan", description: "Reviews the global measurement plan to understand required events and parameters for the fix.", icon: Database },
      { title: "Generate Fix Suggestion", description: "Creates specific GTM tag configurations including triggers, variables, and data layer requirements.", icon: FileCode, detail: ["Event: product_review_submit", "Trigger: Click review submit button", "Params: product_id, review_rating"] },
      { title: "Review & Approve", description: "Presents suggested fix for human review and approval before execution.", icon: UserCheck },
      { title: "Handoff to Remediation", description: "Sends approved fix configuration to Auto-Remediation Engine for deployment.", icon: Zap, detail: ["Fix approved", "Sent to Auto-Remediation", "Awaiting deployment"] },
    ],
  },
  {
    id: "auto-remediation",
    title: "Auto-Remediation Engine",
    shortTitle: "Auto-Remediation",
    icon: RefreshCw,
    description: "Executes approved fixes automatically via GTM and validates the implementation.",
    purpose: "Deploys approved fix configurations via GTM API, validates the fix is working, and notifies stakeholders of the resolution.",
    observes: ["Approved fixes", "GTM API", "Validation results"],
    status: "Active",
    group: "action",
    steps: [
      { title: "Receive Approved Fix", description: "Receives approved fix configuration from Automation Copilot with full deployment instructions.", icon: AlertCircle },
      { title: "Self-Healing Check", description: "Verifies self-healing mode is enabled for the affected site in monitoring settings.", icon: Shield },
      { title: "Deploy via GTM API", description: "Automatically creates or updates tags, triggers, and variables in the GTM workspace via API.", icon: Zap, detail: ["Auto-create tag in GTM", "Configure trigger", "Set parameters"] },
      { title: "Validation Scan", description: "Rescans affected pages to confirm the fix is working and events are firing correctly.", icon: MonitorCheck, detail: ["Page scan complete", "Event firing confirmed", "No errors detected"] },
      { title: "Notify & Close", description: "Email notification sent to all configured recipients. Issue marked as resolved in dashboard.", icon: Mail, detail: ["Email sent to team", "Issue auto-resolved", "Dashboard updated"] },
    ],
  },

  // ── Lifecycle ────────────────────────────────────────────
  {
    id: "launch-readiness",
    title: "Launch Readiness Validator",
    shortTitle: "Launch Readiness",
    icon: Rocket,
    description: "Validates new websites before launch against the measurement plan and provides readiness score.",
    purpose: "Ensures new websites meet analytics implementation standards by scanning pages, comparing against the measurement plan, and generating a launch readiness score.",
    observes: ["Measurement plan", "dataLayer", "GA4 events"],
    status: "Monitoring",
    group: "lifecycle",
    steps: [
      { title: "Website Registration", description: "User registers a new site with name, domain, region, brand, and environment details.", icon: FileText },
      { title: "Measurement Plan Retrieval", description: "Loads the global measurement plan defined in the system for comparison.", icon: Database },
      { title: "Website Scan", description: "Scans website pages and captures dataLayer pushes, tag firing, and GA4 events.", icon: Eye },
      { title: "Implementation Validation", description: "Compares detected events with measurement plan to identify gaps and mismatches.", icon: Brain },
      { title: "Readiness Report", description: "Generates launch readiness score with detailed issue breakdown and coverage analysis.", icon: FileCode, detail: ["Readiness score: 78%", "4 missing events", "2 parameter issues"] },
      { title: "Recommendation Engine", description: "Suggests specific fixes required before launch with priority ordering.", icon: Lightbulb },
      { title: "Launch Approval", description: "Determines launch readiness based on threshold score and provides go/no-go decision.", icon: CheckSquare },
    ],
  },
];

export interface ComponentGroup {
  key: string;
  title: string;
  icon: any;
  description: string;
  engineIds: string[];
}

export const componentGroups: ComponentGroup[] = [
  {
    key: "monitoring",
    title: "Monitoring & Validation",
    icon: Eye,
    description: "Continuous monitoring of data quality, consent compliance, and measurement governance",
    engineIds: ["data-validation", "consent-compliance", "measurement-governance"],
  },
  {
    key: "analysis",
    title: "Analysis",
    icon: Microscope,
    description: "Root cause investigation and business intelligence generation",
    engineIds: ["root-cause", "analytics-insights"],
  },
  {
    key: "action",
    title: "Action",
    icon: Zap,
    description: "Fix suggestion and automated remediation of tracking issues",
    engineIds: ["automation-copilot", "auto-remediation"],
  },
  {
    key: "lifecycle",
    title: "Lifecycle",
    icon: Rocket,
    description: "Pre-launch validation and readiness assessment for new websites",
    engineIds: ["launch-readiness"],
  },
];

export interface UserGroup {
  title: string;
  icon: any;
  widgets: string[];
}

export const userGroups: UserGroup[] = [
  { title: "Brand Teams", icon: Briefcase, widgets: ["Business Insights", "Campaign Impact"] },
  { title: "Analytics Teams", icon: BarChart3, widgets: ["Tracking Health", "Data Quality"] },
  { title: "Engineering", icon: Code, widgets: ["Issues & Fixes", "Implementation Drift"] },
  { title: "Leadership", icon: UserCheck, widgets: ["Overall Health", "Compliance Status"] },
];

export const workflowSteps = [
  { label: "Data Validation / Governance / Compliance", icon: ClipboardCheck, color: "primary" },
  { label: "Issue Detection", icon: AlertCircle, color: "amber" },
  { label: "Root Cause Analyzer", icon: Microscope, color: "primary" },
  { label: "Automation Copilot (suggest fix)", icon: Wrench, color: "secondary" },
  { label: "Auto-Remediation Engine (execute fix)", icon: RefreshCw, color: "emerald" },
  { label: "Validation", icon: MonitorCheck, color: "primary" },
  { label: "Insights Engine (business impact)", icon: Sparkles, color: "secondary" },
];

export const agentCollaboration = {
  title: "Component Workflow",
  description: "Components work together in a defined sequence from detection to resolution to insight.",
  steps: [
    "Data Validation / Governance / Compliance detects issue",
    "Root Cause Analyzer investigates",
    "Automation Copilot suggests fix",
    "Auto-Remediation Engine deploys fix",
    "Validation confirms resolution",
    "Analytics Insights Engine reports business impact",
  ],
};
