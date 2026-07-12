import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sun,
  Moon,
  Github,
  FileDown,
  Linkedin,
  ExternalLink,
  Mail,
  Menu,
  X,
  Instagram,
} from "lucide-react";

type Theme = "dark" | "light";
type Page = "home" | "blog" | "about";

const themeVars: Record<Theme, Record<string, string>> = {
  dark: {
    "--background": "#0c0c0c",
    "--foreground": "#e2e2e2",
    "--card": "#141414",
    "--card-foreground": "#e2e2e2",
    "--muted": "#1c1c1c",
    "--muted-foreground": "#888888",
    "--primary": "#e2e2e2",
    "--primary-foreground": "#0c0c0c",
    "--secondary": "#1c1c1c",
    "--secondary-foreground": "#e2e2e2",
    "--accent": "#7effd4",
    "--accent-foreground": "#0c0c0c",
    "--border": "rgba(255,255,255,0.07)",
    "--ring": "#7effd4",
  },
  light: {
    "--background": "#f3f1ec",
    "--foreground": "#0f0f0f",
    "--card": "#eae8e2",
    "--card-foreground": "#0f0f0f",
    "--muted": "#dddad4",
    "--muted-foreground": "#76746e",
    "--primary": "#0f0f0f",
    "--primary-foreground": "#f3f1ec",
    "--secondary": "#e0ded8",
    "--secondary-foreground": "#0f0f0f",
    "--accent": "#1c3fef",
    "--accent-foreground": "#ffffff",
    "--border": "rgba(0,0,0,0.1)",
    "--ring": "#1c3fef",
  },
};

interface Post {
  id: number;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  featured: boolean;
}

const posts: Post[] = []; // TODO's: Make changes to this after establising API for Post

// const posts = [
//   {
//     id: 1,
//     title: "Ball on Top",
//     date: "Jun 25, 2026",
//     readTime: "9 min",
//     tags: ["Ball", "Job", "Brain-Rot"],
//     excerpt:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, qui expedita sit numquam nisi modi eius porro nulla aspernatur ab?",
//     featured: true,
//   },
// ];

const projects = [
  {
    name: "JPass",
    description:
      "An offline Android password manager that secures data locally. It uses PBKDF2-derived keys and a SQLCipher-encrypted RoomDB. Developed in response to growing cybersecurity concerns.",
    stack: ["Java", "XML", "RoomDB", "SQLCipher", "MVC"],
  },
  {
    name: "ExamDawn",
    description:
      "A comprehensive digital platform designed to support students throughout their academic journey by providing a wide array of essential resources.",
    stack: ["Vue", "HTML", "MarkDown", "TailwindCSS"],
  },
];

const skills = [
  "Python",
  "Java",
  "JavaScript",
  "HTML/CSS",
  "MySQL",
  "Bash",
  "AWS",
  "Docker",
  "AutoCAD",
  "NodeJS",
  "Svelte",
  "Linux",
  "Git",
];

const resumeUrl = new URL("../assets/Resume.pdf", import.meta.url).href;

// ─── Theme Picker ───────────────────────────────────────────────────────────

function ThemePicker({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const options: { id: Theme; icon: React.ReactNode; label: string }[] = [
    { id: "dark", icon: <Moon size={12} />, label: "Dark" },
    { id: "light", icon: <Sun size={12} />, label: "Light" },
  ];

  return (
    <div className="flex items-center border border-border rounded-none overflow-hidden">
      {options.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          title={label}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors font-['Geist_Mono',monospace] ${
            theme === id
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({
  page,
  setPage,
  theme,
  setTheme,
}: {
  page: Page;
  setPage: (p: Page) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: { id: Page; label: string }[] = [
    { id: "home", label: "home" },
    { id: "blog", label: "blog" },
    { id: "about", label: "about" },
  ];

  const handleNav = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="font-['Geist_Mono',monospace] text-sm font-semibold text-foreground hover:text-accent transition-colors tracking-tight"
        >
          jack<span className="text-red-500">p</span>ots
        </button>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={`px-3 py-1 text-sm font-['Geist_Mono',monospace] transition-colors ${
                page === l.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right side: theme picker + hamburger */}
        <div className="flex items-center gap-2">
          <ThemePicker theme={theme} setTheme={setTheme} />

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 px-6 py-2 flex flex-col">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={`py-2 text-sm text-left font-['Geist_Mono',monospace] transition-colors ${
                page === l.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main className="pt-12">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <p className="font-['Geist_Mono',monospace] text-xs text-accent mb-5 tracking-[0.2em] uppercase">
              Aspiring SDE · Bangalore-IN
            </p>
            <h1 className="font-['Geist_Mono',monospace] text-5xl lg:text-[5.5rem] font-semibold text-foreground leading-none mb-6 tracking-tight">
              Joel
              <br />
              Paul
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Open-source contributor, hardware tinkerer.
              <br /> I like to build{" "}
              <span className="text-foreground font-medium">cool stuff </span>
              and occasionally break things to see how they work.
            </p>
            <div className="flex items-center gap-3 mt-8 flex-wrap">
              <button
                onClick={() => setPage("about")}
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-['Geist_Mono',monospace] hover:opacity-80 transition-opacity"
              >
                About me <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setPage("blog")}
                className="flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground text-sm font-['Geist_Mono',monospace] hover:text-foreground hover:border-foreground transition-colors"
              >
                Read blog
              </button>
            </div>
          </div>

          <div className="flex lg:flex-col gap-4 text-muted-foreground lg:pb-2">
            <a
              href="https://github.com/Jack-Pots/"
              className="flex items-center gap-2 text-sm hover:text-foreground transition-colors"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jack-pots/"
              className="flex items-center gap-2 text-sm hover:text-foreground transition-colors"
            >
              <Linkedin size={14} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-border">
        <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-6 tracking-[0.2em] uppercase">
          Stack
        </p>
        <div className="flex flex-wrap max-w-xl gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="font-['Geist_Mono',monospace] text-sm px-3 py-1 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-border">
        <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-8 tracking-[0.2em] uppercase">
          Projects
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {projects.map((p) => (
            <div key={p.name} className="bg-background p-6 group flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-['Geist_Mono',monospace] text-base font-semibold text-foreground">
                  {p.name}
                </h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="#" // TODO
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github size={13} />
                  </a>
                  <a
                    href="#" // TODO
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-['Geist_Mono',monospace] text-xs px-2 py-0.5 border border-border text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ─── Blog Page ────────────────────────────────────────────────────────────────

function BlogPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  if (posts.length === 0) {
    return (
      <main className="pt-12">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-2 tracking-[0.2em] uppercase">
            Writing
          </p>
          <h1 className="font-['Geist_Mono',monospace] text-3xl font-semibold text-foreground">
            Blog
          </h1>
          <div className="mt-8 text-sm text-muted-foreground">
            No posts yet — check back later.
          </div>
        </div>
      </main>
    );
  }
  if (selected !== null) {
    const post = posts.find((p) => p.id === selected)!;
    return (
      <main className="pt-12">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <button
            onClick={() => setSelected(null)}
            className="font-['Geist_Mono',monospace] text-xs text-muted-foreground hover:text-foreground mb-10 flex items-center gap-2 transition-colors"
          >
            ← back to blog
          </button>
          <div className="flex gap-2 mb-5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="font-['Geist_Mono',monospace] text-xs px-2 py-0.5 border border-border text-accent"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-['Geist_Mono',monospace] text-2xl lg:text-3xl font-semibold text-foreground mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex gap-5 font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-10 pb-8 border-b border-border">
            <span>{post.date}</span>
            <span>{post.readTime} read</span>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{post.excerpt}</p>
            <p>
              Full article content would appear here. This is a portfolio demo —
              each post title and excerpt represents real work-in-progress
              writing.
            </p>
            <p>
              The systems, decisions, and tradeoffs described are drawn from
              real engineering experience across distributed infrastructure,
              developer tooling, and performance work.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-12">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-2 tracking-[0.2em] uppercase">
          Writing
        </p>
        <h1 className="font-['Geist_Mono',monospace] text-3xl font-semibold text-foreground">
          Blog
        </h1>
      </div>

      {/* Featured */}
      <div className="max-w-5xl mx-auto px-6">
        <button
          onClick={() => setSelected(featured.id)}
          className="w-full text-left border border-border p-8 hover:bg-muted hover:border-accent transition-colors group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <span className="font-['Geist_Mono',monospace] text-xs text-accent tracking-[0.2em] uppercase">
              Featured
            </span>
            <div className="flex gap-4 font-['Geist_Mono',monospace] text-xs text-muted-foreground max-sm:mt-3">
              <span>{featured.date}</span>
              <span>{featured.readTime} read</span>
            </div>
          </div>
          <h2 className="font-['Geist_Mono',monospace] text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors leading-snug">
            {featured.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {featured.excerpt}
          </p>
          <div className="flex gap-2 mt-5">
            {featured.tags.map((t) => (
              <span
                key={t}
                className="font-['Geist_Mono',monospace] text-xs px-2 py-0.5 border border-border text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-20 mt-px grid grid-cols-1 md:grid-cols-2 gap-px">
        {rest.map((post) => (
          <button
            key={post.id}
            onClick={() => setSelected(post.id)}
            className="text-left bg-background p-8 hover:bg-muted border-1 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Geist_Mono',monospace] text-xs text-muted-foreground">
                {post.date}
              </span>
              <span className="font-['Geist_Mono',monospace] text-xs text-muted-foreground">
                {post.readTime} read
              </span>
            </div>
            <h3 className="font-['Geist_Mono',monospace] text-sm font-semibold text-foreground mb-2.5 group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex gap-1.5">
              {post.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="font-['Geist_Mono',monospace] text-xs px-2 py-0.5 border border-border text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <main className="pt-12">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
          {/* Left column */}
          <div>
            <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-2 tracking-[0.2em] uppercase">
              About
            </p>
            <h1 className="font-['Geist_Mono',monospace] text-3xl font-semibold text-foreground mb-10">
              Joel Paul
            </h1>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-14 max-w-xl">
              <p>
                I’m a{" "}
                <span className="text-foreground"> final year university </span>{" "}
                student from India. I discovered my passion for programming at
                the age of 15. I love to design and develop stuff and
                occasionally break some! In 2023, I began contributing to
                open-source projects to bridge the gap between theory and
                real-world software development. Beyond my main focus, I have a
                deep interest in hardware and electronics complemented by a
                passion for UI/UX.
              </p>
            </div>

            {/* Experience
            <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-8 tracking-[0.2em] uppercase">
              Experience
            </p>
            <div className="border-l border-border space-y-0">
              {experience.map((e, i) => (
                <div key={i} className="pl-6 pb-9 relative">
                  <div className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-accent -translate-x-[3.5px]" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1.5 gap-1">
                    <span className="font-['Geist_Mono',monospace] text-sm font-semibold text-foreground">
                      {e.role} — {e.company}
                    </span>
                    <span className="font-['Geist_Mono',monospace] text-xs text-muted-foreground shrink-0">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right column */}
          <div>
            <div className="space-y-7">
              <a
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded inline-flex items-center"
                href={resumeUrl}
                download="Resume.pdf"
              >
                <FileDown className="mr-2" />
                <span className="font-semibold">Download Resume</span>
              </a>

              <div>
                <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-3 tracking-[0.2em] uppercase">
                  Education
                </p>
                <p className="text-sm text-foreground">
                  Gopalan College Of Commerce
                </p>
                <p className="text-sm text-muted-foreground">
                  B. Computer Application, 2023
                </p>
              </div>

              <div>
                <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-3 tracking-[0.2em] uppercase">
                  Contact
                </p>
                <a
                  href="mailto:joelpaul688@gmail.com"
                  className="flex items-center gap-2 text-sm text-accent hover:opacity-70 transition-opacity font-['Geist_Mono',monospace]"
                >
                  <Mail size={13} /> joelpaul688@gmail.com
                </a>
              </div>

              <div>
                <p className="font-['Geist_Mono',monospace] text-xs text-muted-foreground mb-3 tracking-[0.2em] uppercase">
                  Links
                </p>
                <div className="space-y-2">
                  <a
                    href="https://github.com/Jack-Pots/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={13} /> Jack-Pots
                  </a>
                  <a
                    href="https://www.instagram.com/jack_potsz/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={13} /> @jack_potsz
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jack-pots/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={13} /> jack-pots
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [page, setPage] = useState<Page>("home");
``
  useEffect(() => {
    const vars = themeVars[theme];
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground font-['Geist',sans-serif]">
      <Nav page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "blog" && <BlogPage />}
      {page === "about" && <AboutPage />}
    </div>
  );
}
