import { useState, useEffect, useRef } from "react";

/* ─── THEME CONTEXT ─────────────────────────────────────────── */
const useTheme = () => {
  const [dark, setDark] = useState(true);
  return { dark, toggle: () => setDark(d => !d) };
};

/* ─── TYPING ANIMATION HOOK ─────────────────────────────────── */
const useTyping = (words, speed = 90, pause = 1800) => {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setWi(w => w + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wi, words, speed, pause]);
  return text;
};

/* ─── SCROLL HOOK ────────────────────────────────────────────── */
const useScroll = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
};

/* ─── INTERSECTION HOOK ──────────────────────────────────────── */
const useVisible = (threshold = 0.15) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, vis];
};

/* ─── DATA ───────────────────────────────────────────────────── */
const SKILLS = [
  { name: "React / Angular", pct: 90, color: "#38bdf8" },
  { name: "TypeScript / JavaScript", pct: 88, color: "#a78bfa" },
  { name: "Java & Spring Boot", pct: 80, color: "#34d399" },
  { name: "Node.js / Express", pct: 75, color: "#fb923c" },
  { name: "SQL / PostgreSQL", pct: 82, color: "#f472b6" },
  { name: "React Native", pct: 72, color: "#facc15" },
  { name: "Python / AI-ML", pct: 65, color: "#60a5fa" },
  { name: "MongoDB / Firebase", pct: 70, color: "#4ade80" },
];

const TECH_ICONS = [
  { name: "React", bg: "#0ea5e9", icon: "⚛" },
  { name: "Angular", bg: "#ef4444", icon: "🅰" },
  { name: "TypeScript", bg: "#3b82f6", icon: "TS" },
  { name: "Java", bg: "#f97316", icon: "☕" },
  { name: "Spring Boot", bg: "#22c55e", icon: "🍃" },
  { name: "Node.js", bg: "#16a34a", icon: "⬡" },
  { name: "Python", bg: "#eab308", icon: "🐍" },
  { name: "MongoDB", bg: "#15803d", icon: "🍃" },
  { name: "SQL", bg: "#0891b2", icon: "🗄" },
  { name: "Firebase", bg: "#ea580c", icon: "🔥" },
  { name: "React Native", bg: "#7c3aed", icon: "📱" },
  { name: "Git", bg: "#dc2626", icon: "⑂" },
];

const PROJECTS = [
  {
    title: "Developers Stack Web",
    desc: "Modernized LMS rebuilt from legacy system integrating 15 core services: course delivery, assessments, and job postings with improved scalability and UX.",
    techs: ["Angular", "TypeScript", "Spring Boot", "HTML/CSS"],
    cat: "Web",
    color: "#6366f1",
    emoji: "🌐",
  },
  {
    title: "E-medi Hospital System",
    desc: "Hospital management platform for patients, appointments, pharmacy, and admin workflows. Built responsive interfaces as front-end developer in an 8-member Agile team.",
    techs: ["Angular", "React", "Node.js", "Tailwind CSS"],
    cat: "Web",
    color: "#0ea5e9",
    emoji: "🏥",
  },
  {
    title: "Agent Mobile App",
    desc: "Real-world agent app for business registration & ERP integration with on-site data capture, location detection, and secure authentication.",
    techs: ["React Native", "TypeScript", "Spring Boot", "Java"],
    cat: "Mobile",
    color: "#f59e0b",
    emoji: "📱",
  },
  {
    title: "Developer Stack Mobile",
    desc: "Mobile LMS for Sri Lankan Software Engineering Institute offering video lessons, quizzes, code labs, discussions, and progress tracking.",
    techs: ["React Native", "TypeScript", "Spring Boot"],
    cat: "Mobile",
    color: "#10b981",
    emoji: "🎓",
  },
  {
    title: "Future Bound Web App",
    desc: "Centralized educational platform connecting students and teachers with responsive UI, API integrations, and secure role-based access control.",
    techs: ["Angular", "Java", "Spring Boot", "TypeScript"],
    cat: "Web",
    color: "#8b5cf6",
    emoji: "🚀",
  },
  {
    title: "DSMP Course Website",
    desc: "Course introduction website with curriculum overview and enrollment guidance, providing a responsive interactive learning experience built with ASTRO.",
    techs: ["ASTRO", "HTML", "CSS", "JavaScript"],
    cat: "Web",
    color: "#ec4899",
    emoji: "📚",
  },
];

const SERVICES = [
  { icon: "💻", title: "Frontend Development", desc: "Modern responsive UIs using React, Angular, and TypeScript with pixel-perfect designs and smooth animations." },
  { icon: "⚙️", title: "Backend Development", desc: "Scalable REST APIs and microservices with Java, Spring Boot, and Node.js backed by SQL and NoSQL databases." },
  { icon: "📱", title: "Mobile Development", desc: "Cross-platform mobile apps with React Native delivering native-feel experiences on iOS and Android." },
  { icon: "🗄️", title: "Database Design", desc: "Efficient data modeling, query optimization, and management across PostgreSQL, MySQL, MongoDB, and Firebase." },
  { icon: "🤖", title: "AI / ML Integration", desc: "Integrating AI and machine learning capabilities into web and mobile applications for intelligent features." },
  { icon: "🎨", title: "UI/UX Design", desc: "User-centered design with Figma prototyping, wireframing, and translating designs into polished interfaces." },
];

const CERTS = [
  "Full-Stack Master Developer — Developer Stack",
  "Trainee Software Developer — Developer Stack",
  "ICET Master Developer — Institute of Computer Engineering Technology",
  "Comprehensive Master Java Developer — Institute of Software Engineering",
  "Python Programming — Evotech Education",
];

/* ─── NAV ────────────────────────────────────────────────────── */
function Navbar({ dark, toggle }) {
  const scrollY = useScroll();
  const [open, setOpen] = useState(false);
  const links = ["About", "Skills", "Projects", "Services", "Contact"];
  const scrollTo = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  const bg = dark
    ? scrollY > 60 ? "rgba(10,10,20,0.92)" : "transparent"
    : scrollY > 60 ? "rgba(255,255,255,0.92)" : "transparent";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: bg,
      backdropFilter: scrollY > 60 ? "blur(16px)" : "none",
      borderBottom: scrollY > 60 ? `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "none",
      transition: "all 0.3s ease",
      padding: "0 clamp(1rem, 5vw, 3rem)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, background: "linear-gradient(135deg,#38bdf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -0.5 }}>
          SU.
        </span>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)", transition: "color 0.2s", letterSpacing: 0.3, fontFamily: "inherit" }}
              onMouseEnter={e => e.target.style.color = "#38bdf8"}
              onMouseLeave={e => e.target.style.color = dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)"}
            >{l}</button>
          ))}
          <button onClick={toggle} style={{
            background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            border: "none", borderRadius: 50, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s"
          }}>{dark ? "☀️" : "🌙"}</button>
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="mobile-nav">
          <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>{dark ? "☀️" : "🌙"}</button>
          <button onClick={() => setOpen(o => !o)} style={{
            background: "none", border: `1.5px solid ${dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}`,
            borderRadius: 6, width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
            color: dark ? "#fff" : "#000"
          }}>{open ? "✕" : "☰"}</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: dark ? "rgba(10,10,20,0.97)" : "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          padding: "1rem 2rem 2rem",
          display: "flex", flexDirection: "column", gap: 4,
          borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)", padding: "10px 0", textAlign: "left", fontFamily: "inherit" }}
            >{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero({ dark }) {
  const typed = useTyping(["Full-Stack Developer", "Software Engineer", "React & Angular Dev", "Spring Boot Expert", "AI/ML Enthusiast"]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: dark
        ? "linear-gradient(135deg,#050510 0%,#0a0a1a 40%,#0d0d25 100%)"
        : "linear-gradient(135deg,#f0f4ff 0%,#e8f0fe 40%,#f5f0ff 100%)",
      padding: "6rem clamp(1rem, 5vw, 3rem) 4rem",
    }}>
      {/* Background blobs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.12) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.12) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="hero-grid">
        {/* Text */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: dark ? "rgba(56,189,248,0.1)" : "rgba(56,189,248,0.15)",
            border: `1px solid rgba(56,189,248,0.3)`,
            borderRadius: 50, padding: "6px 16px", marginBottom: 24,
            fontSize: 13, color: "#38bdf8", fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", display: "inline-block", animation: "pulse 2s infinite" }} />
            Available for opportunities
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: 12, color: dark ? "#fff" : "#0f172a", letterSpacing: -1 }}>
            Hi, I'm<br />
            <span style={{ background: "linear-gradient(135deg,#38bdf8,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Sameera Udesh
            </span>
          </h1>

          <div style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 600, marginBottom: 20, color: dark ? "rgba(255,255,255,0.85)" : "#1e293b", minHeight: 40, fontFamily: "'Syne', sans-serif" }}>
            <span style={{ color: "#38bdf8" }}>{typed}</span>
            <span style={{ animation: "blink 1s step-end infinite", color: "#38bdf8" }}>|</span>
          </div>

          <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", lineHeight: 1.75, color: dark ? "rgba(255,255,255,0.6)" : "#475569", maxWidth: 540, marginBottom: 36 }}>
            Enthusiastic Full-Stack Developer with strong experience in React, Angular, and TypeScript. Passionate about AI, ML, and data science. Building responsive, user-friendly interfaces with clean and maintainable code.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "linear-gradient(135deg,#38bdf8,#6366f1)",
                border: "none", borderRadius: 12, padding: "13px 28px",
                color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer",
                boxShadow: "0 8px 32px rgba(56,189,248,0.35)", transition: "all 0.25s",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(56,189,248,0.5)"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 8px 32px rgba(56,189,248,0.35)"; }}
            >View Projects →</button>

            <a href="/Sameera_Udesh_CV.pdf" download
              style={{
                background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                borderRadius: 12, padding: "13px 28px",
                color: dark ? "#fff" : "#0f172a", fontWeight: 600, fontSize: 15,
                textDecoration: "none", transition: "all 0.25s", display: "inline-block",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.transform = ""; }}
            >⬇ Download CV</a>

            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "none", border: `1.5px solid rgba(167,139,250,0.5)`, borderRadius: 12, padding: "13px 28px",
                color: "#a78bfa", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "all 0.25s", fontFamily: "inherit"
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(167,139,250,0.1)"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "none"; e.target.style.transform = ""; }}
            >Hire Me</button>
          </div>

          {/* Social Links */}
          <div style={{ display: "flex", gap: 14, marginTop: 32 }}>
            {[
              { label: "GitHub", href: "#", icon: "git" },
              { label: "LinkedIn", href: "https://linkedin.com/in/sameera-udesh-460448273", icon: "in" },
              { label: "Email", href: "mailto:sameeraudesh75@gmail.com", icon: "@" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: dark ? "rgba(255,255,255,0.7)" : "#475569",
                  textDecoration: "none", fontSize: 15, fontWeight: 700, transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.15)"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)"; e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"; e.currentTarget.style.color = dark ? "rgba(255,255,255,0.7)" : "#475569"; e.currentTarget.style.transform = ""; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center" }} className="hero-avatar">
          <div style={{ position: "relative" }}>
            {/* Outer glow ring */}
            <div style={{
              width: 240, height: 240, borderRadius: "50%",
              background: "conic-gradient(#38bdf8,#6366f1,#a78bfa,#f472b6,#38bdf8)",
              padding: 3, 
              //animation: "spin 6s linear infinite",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: dark ? "#0a0a1a" : "#f0f4ff",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img
                  src="/profile.jpg"
                  alt="Sameera Udesh"
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              </div>
            </div>
            {/* Floating badges */}
            <div style={{ position: "absolute", bottom: 20, left: -20, background: dark ? "rgba(10,10,30,0.9)" : "rgba(255,255,255,0.95)", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 12, padding: "8px 14px", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 600 }}>⭐ 1+ Year Exp</div>
            </div>
            <div style={{ position: "absolute", top: 20, right: -24, background: dark ? "rgba(10,10,30,0.9)" : "rgba(255,255,255,0.95)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 12, padding: "8px 14px", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600 }}>🚀 6 Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", fontSize: 12, animation: "bounce 2s infinite" }}>
        <span>scroll</span>
        <span>↓</span>
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About({ dark }) {
  const [ref, vis] = useVisible();
  const c = dark ? "rgba(255,255,255,0.65)" : "#475569";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <section id="about" ref={ref} style={{
      padding: "7rem clamp(1rem, 5vw, 3rem)",
      background: dark ? "#07071a" : "#f8faff",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: "all 0.7s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader dark={dark} label="Who I Am" title="About Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "3rem" }} className="two-col">
          {/* Left */}
          <div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: c, marginBottom: 20 }}>
              I'm <strong style={{ color: dark ? "#fff" : "#0f172a" }}>Sameera Udesh</strong>, an enthusiastic Full-Stack Developer based in Waskaduwa, Sri Lanka. I specialize in building modern web and mobile applications with clean, maintainable code.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: c, marginBottom: 28 }}>
              Currently working as an <strong style={{ color: "#38bdf8" }}>Associate Software Engineer at Seekers Cloud</strong>, I bring hands-on experience across the full stack — from RESTful API development with Spring Boot to crafting responsive UIs with React and Angular.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: c, marginBottom: 32 }}>
              I'm passionate about <strong style={{ color: "#a78bfa" }}>AI/ML</strong> and constantly exploring new technologies. I'm a quick learner with a self-motivated mindset and thrive in Agile team environments.
            </p>

            {/* Info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["📧 Email", "sameeraudesh75@gmail.com"],
                ["📞 Phone", "0776314894"],
                ["📍 Location", "Waskaduwa, Sri Lanka"],
                ["💼 Status", "Open to Work"],
                ["🎓 Degree", "B.IT — Uni of Moratuwa"],
                ["🌐 Languages", "English, Sinhala"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 600, marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, color: dark ? "#e2e8f0" : "#1e293b", fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Education & Experience */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>🎓 Education</h3>
            {[
              { deg: "B.IT (Diploma Level Completed)", uni: "University of Moratuwa", yr: "Mar 2024 – Present", gpa: "GPA 3.23", color: "#38bdf8" },
              { deg: "Advanced Level — Science Stream", uni: "Nalanda College Colombo 10", yr: "Mar 2012 – Aug 2014", color: "#a78bfa" },
            ].map(e => (
              <div key={e.deg} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 18px", borderLeft: `3px solid ${e.color}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginBottom: 4 }}>{e.deg}</div>
                <div style={{ fontSize: 13, color: e.color, marginBottom: 4 }}>{e.uni}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: c }}>
                  <span>{e.yr}</span>
                  {e.gpa && <span style={{ background: `${e.color}22`, color: e.color, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{e.gpa}</span>}
                </div>
              </div>
            ))}

            <h3 style={{ fontSize: 18, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginTop: 8, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>💼 Experience</h3>
            {[
              { role: "Associate Software Engineer", co: "Seekers Cloud", yr: "Mar 2025 – Present", color: "#10b981", tag: "Current" },
              { role: "Intern Software Developer", co: "Seekers Cloud", yr: "Sep 2024 – Mar 2025", color: "#f59e0b" },
            ].map(e => (
              <div key={e.role} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 18px", borderLeft: `3px solid ${e.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#0f172a" }}>{e.role}</div>
                  {e.tag && <span style={{ background: `${e.color}22`, color: e.color, fontSize: 11, padding: "2px 8px", borderRadius: 6, fontWeight: 600, whiteSpace: "nowrap" }}>{e.tag}</span>}
                </div>
                <div style={{ fontSize: 13, color: e.color, marginBottom: 4 }}>{e.co}</div>
                <div style={{ fontSize: 12, color: c }}>{e.yr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────── */
function Skills({ dark }) {
  const [ref, vis] = useVisible(0.1);
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <section id="skills" ref={ref} style={{
      padding: "7rem clamp(1rem, 5vw, 3rem)",
      background: dark ? "#050510" : "#fff",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: "all 0.7s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader dark={dark} label="What I Use" title="Technical Skills" />

        {/* Progress Bars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "3rem", marginBottom: "3rem" }} className="two-col">
          {SKILLS.map((s, i) => (
            <div key={s.name} style={{ animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: dark ? "#e2e8f0" : "#1e293b" }}>{s.name}</span>
                <span style={{ fontSize: 13, color: s.color, fontWeight: 700 }}>{s.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: `linear-gradient(90deg,${s.color}88,${s.color})`,
                  width: vis ? `${s.pct}%` : "0%",
                  transition: `width 1.2s ease ${i * 0.1}s`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Icon Grid */}
        <h3 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>Technologies & Tools</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {TECH_ICONS.map(t => (
            <div key={t.name} style={{
              background: cardBg, border: `1px solid ${border}`, borderRadius: 12,
              padding: "12px 20px", display: "flex", alignItems: "center", gap: 10,
              transition: "all 0.25s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${t.bg}22`; e.currentTarget.style.borderColor = `${t.bg}66`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 6, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff" }}>{t.icon}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: dark ? "#e2e8f0" : "#1e293b" }}>{t.name}</span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>🏅 Certifications</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {CERTS.map(c => (
              <div key={c} style={{
                background: cardBg, border: `1px solid rgba(167,139,250,0.2)`, borderRadius: 10,
                padding: "10px 18px", fontSize: 13, color: dark ? "#d8b4fe" : "#7c3aed", fontWeight: 500,
              }}>🎖 {c}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────── */
function Projects({ dark }) {
  const [ref, vis] = useVisible(0.05);
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Web", "Mobile"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <section id="projects" ref={ref} style={{
      padding: "7rem clamp(1rem, 5vw, 3rem)",
      background: dark ? "#07071a" : "#f8faff",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: "all 0.7s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader dark={dark} label="My Work" title="Featured Projects" />

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "2.5rem 0" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              background: filter === c ? "linear-gradient(135deg,#38bdf8,#6366f1)" : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"),
              border: `1px solid ${filter === c ? "transparent" : border}`,
              borderRadius: 50, padding: "8px 22px", color: filter === c ? "#fff" : (dark ? "rgba(255,255,255,0.7)" : "#475569"),
              fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.25s", fontFamily: "inherit"
            }}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.5rem" }}>
          {filtered.map((p, i) => (
            <div key={p.title} style={{
              background: cardBg, border: `1px solid ${border}`, borderRadius: 18,
              overflow: "hidden", transition: "all 0.3s", cursor: "default",
              animationDelay: `${i * 0.1}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 40px ${p.color}22`; e.currentTarget.style.borderColor = `${p.color}44`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = border; }}
            >
              {/* Card header */}
              <div style={{ height: 140, background: `linear-gradient(135deg,${p.color}33,${p.color}11)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
                {p.emoji}
                <div style={{ position: "absolute", top: 14, right: 14, background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: p.color, fontWeight: 600 }}>{p.cat}</div>
              </div>

              <div style={{ padding: "20px 22px 22px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: dark ? "rgba(255,255,255,0.6)" : "#475569", marginBottom: 16 }}>{p.desc}</p>

                {/* Techs */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                  {p.techs.map(t => (
                    <span key={t} style={{ fontSize: 11, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, borderRadius: 6, padding: "3px 9px", color: dark ? "#94a3b8" : "#64748b", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: 10 }}>
                  <a href="#" style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, fontSize: 13, color: dark ? "#94a3b8" : "#64748b", textDecoration: "none", fontWeight: 500, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.12)"; e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"; e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"; }}
                  >⑂ GitHub</a>
                  <a href="#" style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8, background: `${p.color}18`, border: `1px solid ${p.color}44`, fontSize: 13, color: p.color, textDecoration: "none", fontWeight: 600, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${p.color}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${p.color}18`; }}
                  >↗ Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ───────────────────────────────────────────────── */
function Services({ dark }) {
  const [ref, vis] = useVisible(0.1);
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const colors = ["#38bdf8", "#a78bfa", "#10b981", "#f59e0b", "#f472b6", "#60a5fa"];

  return (
    <section id="services" ref={ref} style={{
      padding: "7rem clamp(1rem, 5vw, 3rem)",
      background: dark ? "#050510" : "#fff",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: "all 0.7s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader dark={dark} label="What I Offer" title="Services" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem", marginTop: "3rem" }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} style={{
              background: cardBg, border: `1px solid ${border}`, borderRadius: 18,
              padding: "28px 26px", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `${colors[i]}44`; e.currentTarget.style.boxShadow = `0 16px 40px ${colors[i]}18`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = border; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${colors[i]}18`, border: `1px solid ${colors[i]}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: dark ? "#fff" : "#0f172a", marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: dark ? "rgba(255,255,255,0.6)" : "#475569" }}>{s.desc}</p>
              <div style={{ marginTop: 18, fontSize: 13, color: colors[i], fontWeight: 600 }}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact({ dark }) {
  const [ref, vis] = useVisible(0.1);
  const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" });
  const [sent, setSent] = useState(false);
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const inputStyle = {
    width: "100%", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${border}`, borderRadius: 10, padding: "12px 16px",
    color: dark ? "#e2e8f0" : "#1e293b", fontSize: 14, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  const submit = () => { setSent(true); setForm({ name: "", email: "", subject: "", msg: "" }); setTimeout(() => setSent(false), 3000); };

  return (
    <section id="contact" ref={ref} style={{
      padding: "7rem clamp(1rem, 5vw, 3rem)",
      background: dark ? "#07071a" : "#f8faff",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)",
      transition: "all 0.7s ease",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader dark={dark} label="Get In Touch" title="Contact Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem", marginTop: "3rem" }} className="two-col">
          {/* Left info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.65)" : "#475569", marginBottom: 8 }}>
              I'm always open to discussing new opportunities, interesting projects, or just a friendly chat about technology. Feel free to reach out!
            </p>
            {[
              { icon: "📧", label: "Email", value: "sameeraudesh75@gmail.com", color: "#38bdf8" },
              { icon: "📞", label: "Phone", value: "0776314894", color: "#10b981" },
              { icon: "📍", label: "Location", value: "Waskaduwa, Sri Lanka", color: "#a78bfa" },
              { icon: "💼", label: "LinkedIn", value: "sameera-udesh-460448273", color: "#f59e0b" },
            ].map(i => (
              <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 14, background: cardBg, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 18px" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${i.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{i.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: i.color, fontWeight: 600, marginBottom: 2 }}>{i.label}</div>
                  <div style={{ fontSize: 13, color: dark ? "#e2e8f0" : "#1e293b", fontWeight: 500 }}>{i.value}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {[
                { label: "GitHub", icon: "⑂", color: "#fff" },
                { label: "LinkedIn", icon: "in", color: "#0ea5e9" },
                { label: "Twitter", icon: "𝕏", color: "#fff" },
              ].map(s => (
                <a key={s.label} href="#" style={{
                  flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10,
                  background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${border}`, fontSize: 16, color: dark ? "#94a3b8" : "#64748b",
                  textDecoration: "none", fontWeight: 700, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.1)"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; e.currentTarget.style.color = "#38bdf8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = border; e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: "32px 28px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#10b981", marginBottom: 8 }}>Message Sent!</div>
                <div style={{ color: dark ? "rgba(255,255,255,0.6)" : "#475569" }}>Thank you, I'll get back to you soon.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: dark ? "rgba(255,255,255,0.5)" : "#64748b", display: "block", marginBottom: 6 }}>YOUR NAME</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Sameera Udesh" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#38bdf8"}
                      onBlur={e => e.target.style.borderColor = border}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: dark ? "rgba(255,255,255,0.5)" : "#64748b", display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#38bdf8"}
                      onBlur={e => e.target.style.borderColor = border}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: dark ? "rgba(255,255,255,0.5)" : "#64748b", display: "block", marginBottom: 6 }}>SUBJECT</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Project Inquiry / Collaboration..." style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#38bdf8"}
                    onBlur={e => e.target.style.borderColor = border}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: dark ? "rgba(255,255,255,0.5)" : "#64748b", display: "block", marginBottom: 6 }}>MESSAGE</label>
                  <textarea value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} placeholder="Hi Sameera, I'd love to discuss..." rows={5}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = "#38bdf8"}
                    onBlur={e => e.target.style.borderColor = border}
                  />
                </div>
                <button onClick={submit} style={{
                  background: "linear-gradient(135deg,#38bdf8,#6366f1)",
                  border: "none", borderRadius: 12, padding: "14px 0",
                  color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(56,189,248,0.3)", transition: "all 0.25s",
                  fontFamily: "inherit", width: "100%",
                }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 32px rgba(56,189,248,0.45)"; }}
                  onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 8px 24px rgba(56,189,248,0.3)"; }}
                >Send Message →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer({ dark }) {
  const links = ["About", "Skills", "Projects", "Services", "Contact"];
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{
      background: dark ? "#03030e" : "#0f172a",
      padding: "3rem clamp(1rem, 5vw, 3rem) 2rem",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, background: "linear-gradient(135deg,#38bdf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SU.</span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500, transition: "color 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => e.target.style.color = "#38bdf8"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
              >{l}</button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>© 2026 Sameera Udesh. All rights reserved.</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Built with React & Tailwind CSS ✦ Designed in 2026</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCROLL TO TOP ──────────────────────────────────────────── */
function ScrollTop({ dark }) {
  const y = useScroll();
  if (y < 400) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 90,
        width: 44, height: 44, borderRadius: "50%",
        background: "linear-gradient(135deg,#38bdf8,#6366f1)",
        border: "none", cursor: "pointer", color: "#fff", fontSize: 18,
        boxShadow: "0 8px 24px rgba(56,189,248,0.4)",
        transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
    >↑</button>
  );
}

/* ─── SECTION HEADER ─────────────────────────────────────────── */
function SectionHeader({ dark, label, title }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#38bdf8", marginBottom: 12 }}>{label}</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: dark ? "#fff" : "#0f172a", letterSpacing: -0.5, marginBottom: 6 }}>
        {title.split(" ").map((w, i, arr) =>
          i === arr.length - 1
            ? <span key={i} style={{ background: "linear-gradient(135deg,#38bdf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{" " + w}</span>
            : w + " "
        )}
      </h2>
      <div style={{ width: 60, height: 3, background: "linear-gradient(90deg,#38bdf8,#a78bfa)", borderRadius: 99, margin: "12px auto 0" }} />
    </div>
  );
}

/* ─── GLOBAL STYLES ──────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-avatar { display: none !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .desktop-nav { display: none !important; }
      .mobile-nav { display: flex !important; }
    }
    @media (min-width: 769px) {
      .mobile-nav { display: none !important; }
      .desktop-nav { display: flex !important; }
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #38bdf8; border-radius: 99px; }
  `}</style>
);

/* ─── APP ────────────────────────────────────────────────────── */
export default function Portfolio() {
  const { dark, toggle } = useTheme();

  return (
    <div style={{ background: dark ? "#050510" : "#f8faff", minHeight: "100vh", color: dark ? "#e2e8f0" : "#1e293b" }}>
      <GlobalStyles />
      <Navbar dark={dark} toggle={toggle} />
      <Hero dark={dark} />
      <About dark={dark} />
      <Skills dark={dark} />
      <Projects dark={dark} />
      <Services dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
      <ScrollTop dark={dark} />
    </div>
  );
}
