import styles from "./Credentials.module.css";
import Collapsible from "../components/Collapsible";
import SkillBars from "../components/SkillBars";
import { experience, education, certifications } from "../data/credentials";
import { formatDuration, formatMonthYear, monthsBetween } from "../utils/dates";

// Put your CV in apps/web/public/ with this exact file name. Anything in
// public/ is served from the site root.
const CV_URL = "/Michael-Snead-CV.pdf";

export default function Credentials() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>Credentials</h1>
        <p>
          A quick overview of my experience, education, and technical skills.
          The CV has the full detail.
        </p>
        <a
        className={styles.cvLink}
        href={CV_URL}
        target="_blank"
        rel="noopener noreferrer"
        >
        View my CV (PDF) <span aria-hidden="true">↗</span>
        </a>
      </header>

      {/* Collapsible renders the <section>, the <h2> button, and the animated
          panel. Everything between its tags is the panel's content. */}
      <Collapsible title="Experience">
        <ol className={styles.list}>
          {experience.map((role) => (
            <li key={`${role.company}-${role.start}`} className={styles.entry}>
              <h3 className={styles.entryTitle}>{role.title}</h3>
              <p className={styles.entryMeta}>
                {role.company}
                {role.location ? ` · ${role.location}` : ""}
              </p>
              <p className={styles.entryDates}>
                <time dateTime={role.start}>{formatMonthYear(role.start)}</time>
                {" – "}
                {role.end ? (
                  <time dateTime={role.end}>{formatMonthYear(role.end)}</time>
                ) : (
                  "Present"
                )}
                {" · "}
                {formatDuration(monthsBetween(role.start, role.end))}
              </p>
              {role.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </li>
          ))}
        </ol>
      </Collapsible>

      <Collapsible title="Education & Certifications">
        <h3 className={styles.subheading}>Education</h3>
        <ul className={styles.list}>
          {education.map((ed) => (
            <li key={`${ed.school}-${ed.degree}`} className={styles.entry}>
              <h4 className={styles.entryTitle}>{ed.degree}</h4>
              <p className={styles.entryMeta}>{ed.school}</p>
              <p className={styles.entryDates}>
                {ed.startYear} – {ed.endYear}
                {ed.gpa ? ` · GPA ${ed.gpa}` : ""}
              </p>
            </li>
          ))}
        </ul>

        <h3 className={styles.subheading}>Certifications</h3>
        <ul className={styles.list}>
          {certifications.map((cert) => (
            <li key={`${cert.name}-${cert.earned}`} className={styles.entry}>
              <h4 className={styles.entryTitle}>{cert.name}</h4>
              <p className={styles.entryMeta}>{cert.issuer}</p>
              <p className={styles.entryDates}>
                Earned{" "}
                <time dateTime={cert.earned}>{formatMonthYear(cert.earned)}</time>
                {cert.url && (
                  <>
                    {" · "}
                    <a href={cert.url} target="_blank" rel="noopener noreferrer">
                      Verify
                    </a>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="Technology experience">
        <p className={styles.sectionNote}>
          Time since I first used each technology, calculated automatically.
        </p>
        <SkillBars />
      </Collapsible>
    </div>
  );
}
