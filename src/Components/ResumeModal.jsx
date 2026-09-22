import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Code2, Globe } from "lucide-react";
import {
  personalInfo,
  experienceData,
  skillCategories,
  projectsData,
  educationData,
} from "../data/portfolioData";

/* ─────────────────────────────────────────────────────────
   Build a standalone HTML string for printing.
   This is injected into a popup window so none of the
   site's Tailwind / React styles interfere.
───────────────────────────────────────────────────────── */
function buildPrintHTML() {
  const expRows = experienceData
    .map(
      (exp) => `
      <div class="exp-block">
        <div class="row-between">
          <strong>${exp.role} <span class="muted">@ ${exp.company}</span></strong>
          <span class="accent mono">${exp.period} · ${exp.duration}</span>
        </div>
        <ul>
          ${exp.responsibilities.map((r) => `<li>${r}</li>`).join("")}
        </ul>
        <div class="tags">
          ${exp.skills.map((s) => `<span class="tag">${s}</span>`).join("")}
        </div>
      </div>`
    )
    .join("");

  const projRows = projectsData
    .map(
      (p) => `
      <div class="proj-block">
        <div class="row-between">
          <strong>${p.title}</strong>
          <span class="muted mono">${p.category}</span>
        </div>
        <p class="small">${p.description}</p>
        <div class="tags">
          ${p.stack.map((s) => `<span class="tag cyan">${s}</span>`).join("")}
        </div>
      </div>`
    )
    .join("");

  const skillRows = skillCategories
    .map(
      (cat) => `
      <div class="skill-box">
        <strong>${cat.title}</strong>
        <span class="mono muted">${cat.skills.map((s) => s.name).join(" · ")}</span>
      </div>`
    )
    .join("");

  const eduHighlights = (educationData.highlights || [])
    .map((h) => `<li>${h}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>PiyushVishwakarmaResume</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 14mm; }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 9.5pt;
      color: #1e293b;
      background: white;
      line-height: 1.45;
    }

    /* ── Typography ── */
    h1  { font-size: 20pt; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    h2  { font-size: 10pt; font-weight: 700; color: #0e7490; text-transform: uppercase;
          letter-spacing: .08em; margin-bottom: 6px; border-bottom: 1px solid #e2e8f0;
          padding-bottom: 3px; }
    strong { font-weight: 700; }
    p, li { color: #334155; }
    .mono  { font-family: 'Courier New', monospace; font-size: 8.5pt; }
    .muted { color: #64748b; font-weight: 400; }
    .accent { color: #0e7490; }
    .small  { font-size: 9pt; }

    /* ── Layout ── */
    .header {
      border-bottom: 2.5px solid #06b6d4;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }

    .role-line {
      font-size: 10.5pt;
      font-weight: 600;
      color: #0e7490;
      margin: 2px 0 5px;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 18px;
      font-size: 8pt;
      color: #475569;
      font-family: 'Courier New', monospace;
      margin-top: 4px;
    }

    .section { margin-bottom: 10px; }

    .exp-block, .proj-block {
      margin-bottom: 7px;
      padding-bottom: 7px;
      border-bottom: 1px solid #f1f5f9;
    }
    .exp-block:last-child, .proj-block:last-child { border-bottom: none; margin-bottom: 0; }

    .row-between {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 3px;
    }

    ul { padding-left: 14px; margin: 3px 0; }
    ul li { font-size: 9pt; margin-bottom: 1.5px; }

    /* ── Tags ── */
    .tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 4px; }
    .tag {
      font-size: 7.5pt;
      font-family: 'Courier New', monospace;
      padding: 1px 6px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #e2e8f0;
    }
    .tag.cyan {
      background: #ecfeff;
      color: #164e63;
      border-color: #a5f3fc;
    }

    /* ── Skills grid ── */
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
    }
    .skill-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4px 7px;
    }
    .skill-box strong {
      display: block;
      font-size: 9pt;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .skill-box span {
      font-size: 8pt;
      color: #64748b;
      line-height: 1.4;
    }

    /* ── Page break ── */
    .page-break { page-break-after: always; }
    .page2-header {
      display: flex;
      justify-content: space-between;
      font-size: 8.5pt;
      color: #94a3b8;
      font-family: 'Courier New', monospace;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }

    /* ── Education ── */
    .edu-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 8px 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }
    .edu-box h3 { font-size: 10pt; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
    .edu-box .sub { font-size: 8.5pt; color: #64748b; margin-bottom: 4px; }
    .edu-right { text-align: right; flex-shrink: 0; }
    .edu-right .grade { font-size: 10pt; font-weight: 700; color: #0e7490; }
    .edu-right .period { font-size: 8pt; color: #94a3b8; font-family: 'Courier New', monospace; }

    /* ── Declaration ── */
    .declaration {
      margin-top: 18px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      font-size: 8.5pt;
      color: #94a3b8;
      font-style: italic;
    }
    .sign-row {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      font-size: 8.5pt;
      color: #64748b;
      font-family: 'Courier New', monospace;
    }
    .sign-row .name { font-weight: 700; color: #1e293b; }
  </style>
</head>
<body>

  <!-- ═══ PAGE 1 ═══ -->
  <!-- Header -->
  <div class="header">
    <h1>${personalInfo.name}</h1>
    <p class="role-line">${personalInfo.role}</p>
    <div class="contact-row">
      <span>✉ ${personalInfo.email}</span>
      <span>📞 ${personalInfo.formattedPhone}</span>
      <span>📍 ${personalInfo.location}</span>
      <span>⬡ github.com/Piyush9794</span>
      <span>in linkedin.com/in/piyush-vishwakarma-93b971259</span>
    </div>
  </div>

  <!-- Summary -->
  <div class="section">
    <h2>Professional Summary</h2>
    <p>${personalInfo.summary}</p>
  </div>

  <!-- Experience -->
  <div class="section">
    <h2>Work Experience</h2>
    ${expRows}
  </div>

  <!-- Projects -->
  <div class="section">
    <h2>Featured Projects</h2>
    ${projRows}
  </div>

  <!-- ═══ PAGE BREAK ═══ -->
  <div class="page-break"></div>

  <!-- ═══ PAGE 2 ═══ -->
  <div class="page2-header">
    <span>${personalInfo.name} · ${personalInfo.role}</span>
    <span>Page 2 / 2</span>
  </div>

  <!-- Skills -->
  <div class="section">
    <h2>Skills &amp; Technologies</h2>
    <div class="skills-grid">
      ${skillRows}
    </div>
  </div>

  <!-- Education -->
  <div class="section">
    <h2>Education</h2>
    <div class="edu-box">
      <div>
        <h3>${educationData.degree}</h3>
        <p class="sub">${educationData.institution}, ${educationData.location}</p>
        <ul>${eduHighlights}</ul>
      </div>
      <div class="edu-right">
        <div class="grade">${educationData.grade}</div>
        <div class="period">${educationData.period}</div>
      </div>
    </div>
  </div>

  <!-- Declaration -->
  <div class="declaration">
    I hereby declare that all the information provided above is true and accurate to the best of my knowledge.
    <div class="sign-row">
      <span>${personalInfo.location}</span>
      <span class="name">${personalInfo.name}</span>
    </div>
  </div>

</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  /* Open a clean popup window, write the HTML, then print */
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("Please allow popups for this site to use the print feature.");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(buildPrintHTML());
    printWindow.document.close();
    // Wait for fonts/layout to settle before triggering print dialog
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/PiyushVishwakarmaResume.pdf";
    link.download = "PiyushVishwakarmaResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {/* Full-screen flex container — scrollable on mobile */}
      <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-0 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#0f1117] border-0 sm:border border-slate-200 dark:border-white/15 sm:rounded-3xl shadow-2xl z-10 my-0 sm:my-6 text-slate-900 dark:text-zinc-100 overflow-hidden flex flex-col"
          style={{
            minHeight: "var(--modal-height, 100svh)",
            maxHeight: "var(--modal-height, 100svh)",
          }}
        >
          {/* ─── Action Bar ─── */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0f1117]/95 backdrop-blur-md z-20">
            {/* Title */}
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-semibold">
                Official Curriculum Vitae
              </span>
              <h2 className="font-display font-bold text-base sm:text-xl text-slate-900 dark:text-white leading-tight truncate">
                {personalInfo.name}
              </h2>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-[11px] sm:text-xs font-mono text-emerald-800 dark:text-emerald-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden xs:inline">Download</span>
                <span className="xs:hidden">PDF</span>
              </motion.button>

              {/* Print Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-500/30 text-[11px] sm:text-xs font-mono text-cyan-800 dark:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Print</span>
              </motion.button>

              {/* Close */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* ─── Scrollable Preview ─── */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* ── PAGE 1 PREVIEW ── */}
            <div className="px-4 sm:px-8 py-5 sm:py-7">
              {/* Header */}
              <div className="mb-4 pb-4 border-b-2 border-cyan-500">
                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-cyan-700 dark:text-cyan-400 mt-0.5">
                  {personalInfo.role}
                </p>
                <div className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-1.5 mt-2 text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />{personalInfo.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-sky-600 dark:text-sky-400 flex-shrink-0" />{personalInfo.formattedPhone}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />{personalInfo.location}</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-500 flex-shrink-0" />github.com/Piyush9794</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-500 flex-shrink-0" />linkedin.com/in/piyush-vishwakarma-93b971259</span>
                </div>
              </div>

              {/* Summary */}
              <Section title="Professional Summary">
                <p className="text-[11px] sm:text-[11.5px] text-slate-700 dark:text-zinc-300 leading-relaxed">{personalInfo.summary}</p>
              </Section>

              {/* Experience */}
              <Section title="Work Experience" icon={<Briefcase className="w-3.5 h-3.5" />}>
                <div className="space-y-4">
                  {experienceData.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                        <span className="text-[11px] sm:text-[12px] font-bold text-slate-900 dark:text-white">
                          {exp.role} <span className="font-normal text-slate-600 dark:text-zinc-400">@ {exp.company}</span>
                        </span>
                        <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 shrink-0">{exp.period} · {exp.duration}</span>
                      </div>
                      <ul className="mt-1 space-y-0.5">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-[10.5px] text-slate-700 dark:text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />{r}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {exp.skills.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-white/10">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Projects */}
              <Section title="Featured Projects" icon={<Code2 className="w-3.5 h-3.5" />}>
                <div className="space-y-3">
                  {projectsData.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-1">
                        <span className="text-[11px] sm:text-[12px] font-bold text-slate-900 dark:text-white">{proj.title}</span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 shrink-0">{proj.category}</span>
                      </div>
                      <p className="text-[10px] sm:text-[10.5px] text-slate-700 dark:text-zinc-300 leading-relaxed mt-0.5 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.stack.map((st) => (
                          <span key={st} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20">{st}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* ── PAGE 2 PREVIEW ── */}
            <div className="px-4 sm:px-8 py-5 sm:py-7 border-t-4 border-dashed border-slate-300 dark:border-white/10">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/10 gap-1">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white">{personalInfo.name}</span>
                  <span className="mx-2 text-slate-400">·</span>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400">{personalInfo.role}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 flex-shrink-0">Page 2 / 2</span>
              </div>

              {/* Skills */}
              <Section title="Skills & Technologies">
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                  {skillCategories.map((cat) => (
                    <div key={cat.id} className="p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-zinc-200 block mb-0.5">{cat.title}:</span>
                      <span className="text-[9px] sm:text-[9.5px] font-mono text-slate-600 dark:text-zinc-400 leading-snug">{cat.skills.map((s) => s.name).join(" · ")}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Education */}
              <Section title="Education" icon={<GraduationCap className="w-3.5 h-3.5" />}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-1 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                  <div className="min-w-0">
                    <h4 className="text-[11px] sm:text-[12px] font-bold text-slate-900 dark:text-white">{educationData.degree}</h4>
                    <p className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-zinc-400 mt-0.5">{educationData.institution}, {educationData.location}</p>
                    <ul className="mt-1.5 space-y-0.5">
                      {(educationData.highlights || []).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[9.5px] sm:text-[10px] text-slate-600 dark:text-zinc-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-300">{educationData.grade}</span>
                    <span className="block text-[10px] font-mono text-slate-500 dark:text-zinc-500">{educationData.period}</span>
                  </div>
                </div>
              </Section>

              {/* Declaration */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 italic">
                  I hereby declare that all the information provided above is true and accurate to the best of my knowledge.
                </p>
                <div className="mt-4 flex justify-between text-[10px] font-mono text-slate-500 dark:text-zinc-500">
                  <span>{personalInfo.location}</span>
                  <span className="font-semibold text-slate-700 dark:text-zinc-300">{personalInfo.name}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─── Reusable Section helper ─── */
function Section({ title, icon, children }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 mb-2">
        {icon && <span className="text-cyan-600 dark:text-cyan-400">{icon}</span>}
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          {title}
        </h3>
        <div className="flex-1 h-px bg-slate-200 dark:bg-white/10 ml-1" />
      </div>
      {children}
    </div>
  );
}
