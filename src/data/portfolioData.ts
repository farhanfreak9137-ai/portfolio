import { PersonalInfo, Project, Service, SkillGroup } from '../types';
import farhanProfilePhoto from '../assets/images/farhan_profile_photo_1786384718164.png';
import farhanSuitPhoto from '../assets/images/mysuit.png';
import atlasDashboardImg from '../assets/images/atlas_dashboard_screenshot_1786388879362.jpg';
import atlasTasksImg from '../assets/images/atlas_tasks_screenshot_1786388896832.jpg';
import atlasHabitsImg from '../assets/images/atlas_habits_screenshot_1786388911101.jpg';
import atlasGoalsImg from '../assets/images/atlas_goals_screenshot_1786388924881.jpg';
import gymRoutineImg from '../assets/images/gym_routine_builder_1786459599744.jpg';
import gymLoggerImg from '../assets/images/gym_active_logger_1786459623444.jpg';
import gymAnalyticsImg from '../assets/images/gym_analytics_charts_1786459645960.jpg';
import hscAiDashboardImg from '../assets/images/hsc_ai_dark_dashboard.png';
import hscAiTutorImg from '../assets/images/hsc_ai_dark_tutor.png';
import hscAiExamsImg from '../assets/images/hsc_ai_dark_exams.png';
import hscAiQuestionBankImg from '../assets/images/hsc_ai_dark_question_bank.png';
import agentHqCanvasImg from '../assets/images/agent_hq_workspace_canvas.png';
import agentHqEmailCrmImg from '../assets/images/agent_hq_email_crm_modal.png';
import agentHqWorkbenchImg from '../assets/images/agent_hq_crm_workbench.png';
import agentHqProfileImg from '../assets/images/agent_hq_profile_outreach_config.png';

export const personalInfo: PersonalInfo = {
  name: "Md Farhan Hossain",
  title: "Frontend Developer & AI Builder",
  avatarUrl: farhanProfilePhoto,
  suitPhotoUrl: farhanSuitPhoto,
  shortPositioning: "I build modern web applications, dashboards, and AI-powered tools.",
  heroSupportingText: "I turn ideas into practical, responsive digital products with clean interfaces and thoughtful functionality.",
  bioHeading: "Crafting modern web applications & AI tools with speed and precision.",
  bioParagraphs: [
    "I'm Md Farhan Hossain, a frontend developer and AI builder based in Dhaka, Bangladesh. With a solid academic foundation in Science from MDC Model Institute (SSC 2025) and Milestone College (Science Stream), I bridge computational foundations with modern, hands-on web application development.",
    "My journey in code gained momentum when I embraced Artificial Intelligence as a force-multiplier in software engineering. What began as curiosity quickly grew into constructing full-featured, real-world tools—from autonomous multi-agent orchestration engines (Agent HQ) to personal productivity operating systems (Atlas) and curriculum-grounded study intelligence platforms (HSC AI System).",
    "I specialize in building highly responsive user interfaces using React, Next.js, TypeScript, and Tailwind CSS, coupled with intelligent AI features using the Google Gemini API. I focus on sub-100ms state updates, modular architecture, clean typography, and zero visual bloat.",
    "Whether architecting interactive dashboards or crafting custom workflows, my focus remains constant: converting complex user problems into elegant, production-ready software experiences."
  ],
  education: [
    {
      institution: "Milestone College",
      degree: "HSC",
      field: "Science Stream",
      result: "Enrolled",
      duration: "2025 – Present"
    },
    {
      institution: "MDC Model Institute",
      degree: "SSC",
      field: "Science",
      result: "SSC 2025",
      duration: "2025"
    }
  ],
  location: "Dhaka, Bangladesh",
  availability: "Open for web apps & AI projects",
  email: "farhan.sajid1896@gmail.com",
  githubUrl: "https://github.com/farhanfreak9137-ai"
};

// Easy configuration arrays for project assets as requested in Section 7 & Section 20
export const atlasScreenshots = [
  atlasDashboardImg,
  atlasTasksImg,
  atlasHabitsImg,
  atlasGoalsImg,
];

export const atlasScreenshotMetadata = [
  {
    title: "1. Command Dashboard",
    description: "Personal OS command center with daily progress snapshot, task counters, habit streak overview, productivity gauge, and Atlas insight tips."
  },
  {
    title: "2. Task Management Matrix",
    description: "Organized task list with priority badges (High Priority, Medium Priority), due dates, status filters, and quick task creation form."
  },
  {
    title: "3. Habit Tracking Grid",
    description: "Daily habit builder with target goal counters, icon selection grid, streak maintenance tracking, and quick completion buttons."
  },
  {
    title: "4. Goals & Progress Tracker",
    description: "Long-term goal management with category badges (Fitness, Study), progress bars, target deadline tracking, and incremental updates."
  }
];

export const hscAiScreenshots = [
  hscAiDashboardImg,
  hscAiTutorImg,
  hscAiExamsImg,
  hscAiQuestionBankImg,
];

export const hscAiScreenshotMetadata = [
  {
    title: "1. Priority Intelligence Dashboard",
    description: "Evidence-based study prioritization showing top-priority topic scoring, board exam frequency (e.g. 18x Carnot Engine), and weakness radar indicators."
  },
  {
    title: "2. Socratic AI Tutor & LaTeX Solver",
    description: "Interactive AI study lab decomposing complex Physics and Math formulas with KaTeX rendering, step-by-step reasoning, and textbook grounding."
  },
  {
    title: "3. Timed Mock Tests & Exam Simulator",
    description: "Full-length board exam simulation with countdown timers, model question generation, and instant performance diagnostics."
  },
  {
    title: "4. All-Board Question Bank",
    description: "Comprehensive repository of creative (CQ) and MCQ questions categorized by board (Dhaka, Chattogram, Rajshahi, etc.), year, and difficulty."
  }
];

export const gymTrackerScreenshots = [
  gymRoutineImg,
  gymLoggerImg,
  gymAnalyticsImg,
];

export const gymTrackerScreenshotMetadata = [
  {
    title: "1. Workout Routine Builder",
    description: "Design custom workout splits with targeted exercise selections, weights, and set goals."
  },
  {
    title: "2. Live Set & Rep Logger",
    description: "Track active weights, completed reps, and rest timers with one-tap controls during workouts."
  },
  {
    title: "3. Progressive Overload & Volume Analytics",
    description: "Analyze strength growth trends, personal records, and muscle group volume distribution over time."
  }
];

export const agentHqScreenshots = [
  agentHqCanvasImg,
  agentHqEmailCrmImg,
  agentHqWorkbenchImg,
  agentHqProfileImg,
];

export const agentHqScreenshotMetadata = [
  {
    title: "1. 2D Multi-Agent Operating Canvas",
    description: "Interactive real-time canvas visualizing specialized agent nodes (Boss, Atlas, Sentinel, Nova, Outreach, Strategist), active DAG task dependencies, system telemetry, and event bus state."
  },
  {
    title: "2. Cold Outreach Engine & Staged Outbox",
    description: "Automated job application dispatcher generating customized pitches from job workbooks, attaching real XLSX and Markdown deliverables, with 20s anti-spam delivery pacing."
  },
  {
    title: "3. Recruiter Replies CRM & AI Workbench",
    description: "IMAP inbox listener classifying recruiter responses into Interview Invites, Questions, and Rejections with pre-drafted follow-ups and 1-click dispatch."
  },
  {
    title: "4. Authoritative Profile & Discord Alerting",
    description: "Profile master database linking Google App Password SMTP/IMAP credentials with instant real-time Discord webhook push alerts for recruiter responses."
  }
];

export const projects: Project[] = [
  {
    id: "agent-hq",
    name: "Agent HQ",
    category: "Autonomous Multi-Agent Orchestration & Operations Platform",
    tagline: "Local-first multi-agent orchestration engine with DAG task scheduling, persistent SQLite memory, provider fallback cascade, and automated Gmail outreach CRM.",
    description: "A full-featured multi-agent operations platform built for autonomous task planning, multi-agent collaboration (Boss, Atlas, Sentinel, Nova, Outreach, Strategist), directed acyclic graph (DAG) scheduling, and cold outreach automation via Gmail SMTP/IMAP with real-time Discord mobile push alerts.",
    problem: "Modern AI applications often rely on single-prompt scripts or unmanaged chat sessions that lack persistent operational memory, cannot coordinate multiple specialized roles, fail under API rate limits, and cannot interface with real-world operating systems, filesystems, and email protocols.",
    solution: "Architected a local-first multi-agent operating engine with a reactive DAG scheduler, persistent SQLite storage, dynamic multi-provider rotation (Gemini, Groq, OpenAI, Antigravity CLI), live Server-Sent Events (SSE) telemetry, and end-to-end cold outreach with automated recruiter reply classification and mobile push alerts.",
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "SQLite (better-sqlite3)",
      "Gemini 2.0 API",
      "Groq / Llama 3.3",
      "OpenAI GPT-4o",
      "Google Antigravity CLI",
      "Tailwind CSS 4",
      "Vite",
      "Nodemailer",
      "ImapFlow"
    ],
    screenshots: agentHqScreenshots,
    screenshotTitles: agentHqScreenshotMetadata.map(m => m.title),
    screenshotDescriptions: agentHqScreenshotMetadata.map(m => m.description),
    liveUrl: "https://github.com/farhanfreak9137-ai/agent-hq",
    githubUrl: "https://github.com/farhanfreak9137-ai/agent-hq",
    isFeatured: true,
    caseStudy: {
      architectureOverview: "Agent HQ is architected around a decoupled client-server model: a responsive React 19 / Tailwind 2D workspace communicating over REST and Server-Sent Events (SSE) with an Express/Node.js runtime. The core orchestration layer implements a hierarchical DAG planner, a persistent SQLite database using WAL mode for transactional integrity, and a multi-provider AI cascade.",
      componentHierarchy: [
        "WorkspaceCanvas (2D Infinite Canvas, Agent Nodes, Live Telemetry & Event Stream)",
        "BossOrchestrator (Mission Decomposition, Intent Parsing & Delegation)",
        "Scheduler & BackpressureEnforcer (Dependency Resolution, Concurrency Throttling)",
        "ProviderCascadeManager (Gemini API Pool, Groq, OpenAI, Antigravity CLI Bridge)",
        "EmailIntegrationHub (Gmail SMTP Outbox, Staggered Batching & XLSX Attachment Resolver)",
        "ReplyListenerService (IMAP Idle/Poll, Deterministic Intent Classifier & CRM Workbench)",
        "NotificationService (Discord Webhook Delivery & Formatted Embed Card Synthesis)"
      ],
      stateStrategy: "Employs an event-driven architecture with SQLite WAL persistence for agent state, mission graphs, outreach emails, and recruiter replies, synchronized to the React frontend via Server-Sent Events (SSE) for sub-50ms reactive updates.",
      technicalChallenges: [
        {
          challenge: "Coordinating multi-step agent workflows without deadlocks or unbounded queue saturation during concurrent missions.",
          solution: "Engineered a topological DAG scheduler with an active BackpressureEnforcer enforcing per-provider limits, queue depth bounds, and task lifecycle guarantees."
        },
        {
          challenge: "Delivering real-time mobile push notifications for incoming email replies without requiring paid push servers or custom mobile apps.",
          solution: "Implemented a zero-cost Discord Webhook pipeline sending rich color-coded embeds directly to the user's mobile device with instant recruiter intent categorization."
        },
        {
          challenge: "Mitigating LLM rate limits and API quota exhaustion across multi-agent mission executions.",
          solution: "Built a key-rotation pool for Gemini Flash combined with multi-provider fallbacks to Groq Llama 3.3 and local Antigravity CLI."
        }
      ],
      outcomes: [
        "Autonomous mission completion with multi-agent DAG task decomposition and verifiable workspace deliverables.",
        "Integrated cold outreach system with zero-token recruiter intent classification and instant mobile Discord push alerts.",
        "Resilient multi-provider architecture ensuring 99.9% uptime with zero operational cost."
      ]
    },
    features: [
      {
        title: "Autonomous DAG Task Scheduler",
        description: "Decomposes complex human missions into dependency-ordered Directed Acyclic Graphs with backpressure concurrency controls and automated retry loops."
      },
      {
        title: "Specialized Multi-Agent Roster",
        description: "Role-segregated agent team (Boss Commander, Atlas Researcher, Sentinel Security Auditor, Nova Creative Synthesizer, Outreach Agent, and Strategist) with private and shared memory."
      },
      {
        title: "Multi-Provider LLM Rotation & Fallback",
        description: "Resilient inference engine pooling Google Gemini 2.0 Flash, Groq (Llama 3.3-70b), OpenAI GPT-4o, and local Google Antigravity CLI with automatic failover."
      },
      {
        title: "Direct Gmail Outreach Engine",
        description: "Nodemailer SMTP integration with configurable anti-spam pacing (20s delay), automated XLSX/Markdown attachment resolution, and outbox staging."
      },
      {
        title: "Recruiter Reply Listening & CRM",
        description: "Background IMAP listener (imap.gmail.com:993) classifying recruiter responses into Interview Invites, Questions, and Rejections, pre-drafting tailored responses with zero token cost."
      },
      {
        title: "Instant Discord Mobile Alerts",
        description: "Real-time webhook notifications delivering rich color-coded status cards directly to iOS/Android mobile Discord apps when recruiters respond."
      }
    ]
  },
  {
    id: "hsc-ai-system",
    name: "HSC AI Study Intelligence System",
    category: "AI EdTech & Automated Study Intelligence",
    tagline: "Evidence-based study prioritization, Socratic AI tutoring, and question pattern intelligence for HSC Science.",
    description: "An AI-powered study intelligence ecosystem engineered for HSC Science curriculum (Physics, Chemistry, Higher Math, Biology, ICT). Features evidence-based topic prioritization, Socratic AI doubt solving with LaTeX math rendering, automated model question generation, and all-board question banks.",
    problem: "HSC Science students struggle with passive rote learning, fragmented board question papers, and lack immediate step-by-step guidance for complex mathematical and creative questions (CQ) without costly coaching centers.",
    solution: "Architected an intelligent study OS that calculates topic priority scores from board frequency analytics, provides real-time Socratic AI tutoring with KaTeX formula rendering, and generates printable model exams.",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "KaTeX / Math Renderer", "Gemini 2.0 API", "Capacitor", "Zustand"],
    screenshots: hscAiScreenshots,
    screenshotTitles: hscAiScreenshotMetadata.map(m => m.title),
    screenshotDescriptions: hscAiScreenshotMetadata.map(m => m.description),
    liveUrl: "https://hsc-ai.vercel.app/",
    githubUrl: "https://github.com/farhanfreak9137-ai",
    isFeatured: true,
    caseStudy: {
      architectureOverview: "HSC AI Study Intelligence System is architected with a multi-model LLM provider layer (Gemini 2.0 / OpenRouter), custom LaTeX math preprocessing pipeline (mathPreprocessor.ts), question synthesis engine (questionSynthesizer.ts), and high-performance KaTeX math rendering.",
      componentHierarchy: [
        "IntelligenceDashboard (Topic Priority Scoring, Weakness Index & Next Best Action)",
        "SocraticAITutor (Textbook-Grounded Step-by-Step Prompt Orchestration)",
        "MathRenderer (KaTeX Formula Pipeline & Bangla/English Script Support)",
        "QuestionBankHub (Board CQ/MCQ Filters by Board, Year & Chapter)",
        "ExamSimulator (Timed Mock Tests & Model Paper PDF Generator)",
        "MistakeVault (Active Weakness Tracking & Revision Remediation)"
      ],
      stateStrategy: "Employs typed Zustand stores for chapter syllabus progress, study sessions, exam results, and mistake tracking with local and cloud synchronization.",
      technicalChallenges: [
        {
          challenge: "Rendering mixed-script Bangla and complex STEM mathematical equations reliably without layout shifts.",
          solution: "Built a dedicated MathRenderer component integrating KaTeX with a custom mathPreprocessor to normalize LaTeX delimiters and Bengali script tokens."
        },
        {
          challenge: "Ensuring AI question generation strictly adheres to National Curriculum & Textbook Board (NCTB) syllabus standards.",
          solution: "Implemented strict prompt synthesis schemas and few-shot board exam exemplars with multi-model validation pipelines."
        }
      ],
      outcomes: [
        "Automated priority scoring analyzing past board question frequency (e.g. 18x Carnot Engine exam appearances).",
        "Instant Socratic doubt resolution with step-by-step formula explanations for Physics and Higher Math.",
        "Comprehensive question bank covering all major education boards in Bangladesh."
      ]
    },
    features: [
      {
        title: "Evidence-Based Study Prioritization",
        description: "Priority scoring algorithm (e.g. 74/100) combining board recurrence data with personal weakness indexes."
      },
      {
        title: "Socratic AI Tutor & LaTeX Solver",
        description: "Interactive AI study lab decomposing complex Physics and Math formulas with KaTeX rendering and step-by-step guidance."
      },
      {
        title: "Question Pattern Intelligence",
        description: "Analyzes board exam trends across Dhaka, Chattogram, Rajshahi, and other boards to predict high-yield exam topics."
      },
      {
        title: "Timed Mock Tests & PDF Generator",
        description: "Full-length board exam simulation with countdown timers and printable model question paper generation."
      },
      {
        title: "Mistake Vault & Weakness Remediation",
        description: "Automatically saves incorrect attempts into a dedicated vault and generates targeted practice sets."
      },
      {
        title: "Handwritten Paper & Diagram Scanner",
        description: "Scans handwritten answer sheets for AI rubric grading and mistake diagnosis."
      }
    ]
  },
  {
    id: "atlas",
    name: "Atlas",
    category: "Personal AI OS & Life Management",
    tagline: "Cross-platform personal AI operating system and digital discipline platform.",
    description: "Atlas unifies daily task execution, habit building, goal progress, study sessions, gym workouts, and sports performance into a single dark glassmorphism dashboard, paired with AI camera motion tracking for physical screen-time discipline.",
    problem: "Personal productivity was breaking down due to fragmented life-tracking tools and pervasive smartphone addiction ('doom scrolling'). Existing app blockers were easily bypassed, lacking meaningful friction or personal context to curb digital distractions.",
    solution: "Atlas unifies life tracking into one workspace and pairs native Android screen-time limits with an AI-powered physical barrier: users must perform verified camera pushups to unlock temporary phone time.",
    technologies: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "Zustand 5", "Supabase", "Firebase", "OpenRouter AI", "Capacitor 8", "Java"],
    screenshots: atlasScreenshots,
    screenshotTitles: atlasScreenshotMetadata.map(m => m.title),
    screenshotDescriptions: atlasScreenshotMetadata.map(m => m.description),
    liveUrl: "https://atlas-aa7q.vercel.app/",
    githubUrl: "https://github.com/farhanfreak9137-ai/Atlas",
    isFeatured: true,
    caseStudy: {
      architectureOverview: "Atlas features a 4-layer architecture: Next.js 16 App Router frontend with 15 Zustand domain stores, AI & WebRTC intelligence layer, multi-provider storage persistence (Supabase + Firestore + LocalStorage), and a native Android Capacitor bridge plugin (AtlasPhoneControlPlugin.java).",
      componentHierarchy: [
        "AtlasWorkspaceLayout (Navigation Sidebar & Multi-Module Switcher)",
        "CommandDashboard (KPI Cards, Activity Gauges & Atlas AI Insights)",
        "PersonalAICompanion (System Context Ingestion & OpenRouter Cascade)",
        "MotionTrackingPushupEngine (WebRTC + Canvas Luminance Analysis)",
        "AndroidPhoneControlBridge (Capacitor Plugin & UsageStatsManager)",
        "LifeManagementModules (Tasks, Habits, Goals, Study, Gym, Football, Journal)"
      ],
      stateStrategy: "Utilizes 15 typed Zustand domain stores backed by a unified BaseRepository pattern supporting optimistic UI updates with background synchronization across LocalStorage, Supabase PostgreSQL, and Cloud Firestore.",
      technicalChallenges: [
        {
          challenge: "Preventing app blockers from being easily bypassed during impulse doom scrolling sessions.",
          solution: "Implemented native Android UsageStatsManager monitoring with SYSTEM_ALERT_WINDOW full-screen overlay locking unlocked only by completing verified camera pushup reps."
        },
        {
          challenge: "Injecting comprehensive personal context into AI responses without exceeding token windows or model timeouts.",
          solution: "Architected a dynamic Atlas Context Ingestion Service paired with an OpenRouter model cascade (Gemini 2.0 / Llama 3.3)."
        }
      ],
      outcomes: [
        "Physical pushup verification created an effective friction barrier against impulse screen time.",
        "Live web deployment at atlas-aa7q.vercel.app used daily by creator and inner circle of friends.",
        "Native Android packaging with Capacitor 8 and custom Java system permission plugins."
      ]
    },
    features: [
      {
        title: "Personal AI Companion",
        description: "Dynamic context ingestion compiling profile, tasks, habits, goals, study, gym, and journal data into OpenRouter AI responses."
      },
      {
        title: "AI Motion-Tracking Pushup Engine",
        description: "WebRTC camera frame analysis requiring verified pushups to unlock temporary emergency phone access."
      },
      {
        title: "Native Android App Control",
        description: "Capacitor 8 bridge accessing UsageStatsManager and SYSTEM_ALERT_WINDOW for hardware-level app limits."
      },
      {
        title: "Task & Priority Matrix",
        description: "Organize tasks with priority levels, deadline tracking, custom tags, and completion analytics."
      },
      {
        title: "Habit Streak Builder",
        description: "Track daily habit routines, streak calculations, and productivity index contributions."
      },
      {
        title: "Study Hub & GPA Tracker",
        description: "Subject organizer, timed study sessions with 1-5 focus ratings, exam grade logger, and streak analytics."
      },
      {
        title: "Gym & Workout Logger",
        description: "Exercise library, set/rep/weight tracking, personal records, and weekly volume metrics."
      },
      {
        title: "Football Performance Tracker",
        description: "Match logger (goals, assists, 1-10 rating, result), training duration logs, and win rate analytics."
      }
    ]
  },
  {
    id: "gym-tracker",
    name: "Gym Tracker",
    category: "Fitness & Analytics",
    tagline: "Organize workout routines, log training sets, and monitor fitness progress.",
    description: "A fitness tracking web application designed to help users organize workouts and monitor training progress.",
    problem: "Logging workouts on paper notes or clumsy spreadsheets makes it difficult to track progressive overload, exercise history, and workout split volume over time.",
    solution: "Gym Tracker provides an intuitive digital workout logger with customizable exercise templates, weight/reps tracking, rest timers, and volume progress analytics.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    screenshots: gymTrackerScreenshots,
    screenshotTitles: gymTrackerScreenshotMetadata.map(m => m.title),
    screenshotDescriptions: gymTrackerScreenshotMetadata.map(m => m.description),
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: false,
    caseStudy: {
      architectureOverview: "Gym Tracker is designed as an offline-friendly, high-performance training companion optimized for fast interaction during active workouts. Built with React and TypeScript, it utilizes a client-side database adapter with lightweight time-series aggregation for volume charts.",
      componentHierarchy: [
        "WorkoutSplitManager (Routine Selector & Exercise Catalog)",
        "ActiveSessionLogger (Exercise Card, Weight/Rep Steppers & Rest Timer)",
        "RestTimerOverlay (Countdown Ring, Audio Ping & Quick Add Seconds)",
        "AnalyticsDashboard (Volume Bar Charts, Strength PR Trends & Muscle Radar)"
      ],
      stateStrategy: "Uses local key-value state persistence with atomic session log commits. Workout logs are appended chronologically and indexed by exercise ID for instant history lookups.",
      technicalChallenges: [
        {
          challenge: "Keeping rest timers accurate when mobile browsers background the tab during rest intervals.",
          solution: "Calculated elapsed rest times using absolute timestamp deltas (`Date.now() - timerStartTimestamp`) rather than depending on unreliable `setInterval` ticks."
        },
        {
          challenge: "Rendering clean, responsive volume progress charts without dragging down low-power mobile devices.",
          solution: "Implemented lightweight custom SVG bar and trend line renders with memoized data calculations."
        }
      ],
      outcomes: [
        "Instant one-tap set logging designed for touch screens during gym sessions.",
        "Zero latency history lookups comparing current sets to previous personal records.",
        "Reliable rest timer notifications that persist across tab switches."
      ]
    },
    features: [
      {
        title: "Workout Organizer",
        description: "Create and customize push/pull/legs or custom workout split routines."
      },
      {
        title: "Active Log Assistant",
        description: "Log sets, reps, and weights during workouts with built-in rest timer notifications."
      },
      {
        title: "Progressive Overload Tracking",
        description: "Compare current set performance with previous personal best records."
      },
      {
        title: "Visual Fitness Analytics",
        description: "Clean charts showing weekly training volume and exercise progress over time."
      }
    ]
  }
];

export const services: Service[] = [
  {
    id: "web-apps",
    title: "Web Applications",
    description: "Responsive dashboards, productivity tools, trackers, calculators, and custom web applications.",
    deliverables: [
      "Custom React / Next.js web applications",
      "Interactive analytics & admin dashboards",
      "Complex data input forms & state managers",
      "Responsive layout for mobile, tablet, and desktop"
    ],
    icon: "Layout",
    badge: "Dashboards & Web Apps"
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Practical AI features, API integrations, assistants, automation, and intelligent functionality for web applications.",
    deliverables: [
      "LLM & Gemini API backend integration",
      "AI text summarization & prompt tools",
      "Smart content generator & task breakdown assistants",
      "Secure key handling & server-side proxy routes"
    ],
    icon: "Sparkles",
    badge: "AI Features & APIs"
  },
  {
    id: "frontend-dev",
    title: "Frontend Development",
    description: "Modern responsive interfaces, UI improvements, bug fixes, and frontend development using React, Next.js, JavaScript, and TypeScript.",
    deliverables: [
      "Figma / Design-to-code conversions",
      "UI bug fixes, speed & accessibility optimizations",
      "Tailwind CSS styling & custom component libraries",
      "Clean TypeScript codebases ready for production"
    ],
    icon: "Code2",
    badge: "UI & Component Build"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Core",
    description: "Modern JavaScript ecosystems and UI rendering technologies.",
    skills: [
      { name: "TypeScript", highlight: true },
      { name: "React 19", highlight: true },
      { name: "Next.js", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "HTML5 & Semantic Markup" },
      { name: "CSS3 & Modern Layouts" }
    ]
  },
  {
    category: "Styling & UI Architecture",
    description: "Utility-first design systems, responsive engineering, and animations.",
    skills: [
      { name: "Tailwind CSS", highlight: true },
      { name: "Responsive Mobile Engineering", highlight: true },
      { name: "Lucide Icons" },
      { name: "Framer / Motion Animations" },
      { name: "Accessible UI (WCAG)" },
      { name: "Glassmorphism & Dark UI Systems" }
    ]
  },
  {
    category: "Tools, APIs & AI Integration",
    description: "Development tools, state handling, and intelligent API extensions.",
    skills: [
      { name: "Multi-Agent Systems & DAGs", highlight: true },
      { name: "Google Gemini & LLM APIs", highlight: true },
      { name: "Git & GitHub Workflow", highlight: true },
      { name: "SQLite & Local-First State" },
      { name: "REST APIs & JSON Services" },
      { name: "Node.js & Express" },
      { name: "Vite / Build Tooling" }
    ]
  }
];
