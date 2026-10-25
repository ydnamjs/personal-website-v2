import { useId, useState, type CSSProperties } from "react";
import styles from "./SkillBars.module.css";
import { skills, domains, skillTypes } from "../data/credentials";
import { formatDuration, monthsBetween } from "../utils/dates";

type View = "domain" | "type";

const viewOptions: readonly { value: View; label: string }[] = [
  { value: "domain", label: "Domain" },
  { value: "type", label: "Type" },
];

// The longest skill overall is a 100%-wide bar in either view, so bars stay
// comparable no matter how the skills are grouped.
const maxSkillMonths = Math.max(
  1,
  ...skills.map((s) => monthsBetween(s.since, s.until))
);

// ---------- Bubbles ----------
// Every bar gets its own bubble pattern. The pattern comes from a seeded
// random number generator, seeded with the skill's name, so:
//  - different skills get different patterns, and
//  - the same skill always gets the same pattern (stable across re-renders,
//    unlike Math.random(), which would reshuffle the bubbles every render).

// Turns a string into a number (the FNV-1a hash).
function hashString(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// A small seeded random number generator (mulberry32). Each call to the
// returned function gives the next number between 0 and 1, always in the
// same order for the same seed.
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Bubble {
  x: string; // horizontal position inside the bar
  y: string; // resting height, used when animations are turned off
  size: string;
  delay: string; // negative, so each bubble starts partway through its rise
  duration: string;
}

function makeBubbles(seedText: string, count: number): Bubble[] {
  const random = seededRandom(hashString(seedText));
  return Array.from({ length: count }, (_, i) => ({
    // One bubble per equal-width slot, jittered inside the slot, so bubbles
    // spread along the bar instead of clumping.
    x: `${Math.round(((i + 0.2 + random() * 0.6) / count) * 100)}%`,
    y: `${Math.round(15 + random() * 55)}%`,
    size: `${(4 + random() * 4).toFixed(1)}px`,
    delay: `-${(random() * 3).toFixed(2)}s`,
    duration: `${(2.2 + random() * 1.6).toFixed(2)}s`,
  }));
}

export default function SkillBars() {
  const [view, setView] = useState<View>("domain");
  const labelId = useId();

  // The same skills, regrouped. Each skill is tagged with both a domain and
  // a type in the data file; the toggle just picks which tag to group by.
  // Within each group, longest-running skills come first.
  const titles: readonly string[] = view === "domain" ? domains : skillTypes;
  const groups = titles
    .map((title) => ({
      title,
      skills: skills
        .filter((s) => (view === "domain" ? s.domain : s.type) === title)
        .sort(
          (a, b) =>
            monthsBetween(b.since, b.until) - monthsBetween(a.since, a.until)
        ),
    }))
    .filter((group) => group.skills.length > 0); // hide empty groups

  return (
    <div>
      <div className={styles.control}>
        <span id={labelId} className={styles.controlLabel}>
          Group by
        </span>
        {/* Buttons with aria-pressed: keyboard-friendly, and announced by
            screen readers as "toggle button, pressed / not pressed". */}
        <div className={styles.toggle} role="group" aria-labelledby={labelId}>
          {viewOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.toggleButton}
              aria-pressed={view === option.value}
              onClick={() => setView(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.groups}>
        {groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <ul className={styles.list}>
              {group.skills.map((skill) => {
                const months = monthsBetween(skill.since, skill.until);
                const percent = Math.round((months / maxSkillMonths) * 100);

                // Longer bars get more bubbles (2 to 8), so the bubble
                // density looks about the same at every length.
                const bubbleCount = Math.max(2, Math.round(percent / 12));

                return (
                  <li key={skill.name} className={styles.skill}>
                    <span className={styles.name}>{skill.name}</span>

                    {/* Everything inside the track is decoration: the
                        duration text carries the information, so screen
                        readers skip the whole bar. */}
                    <div className={styles.track} aria-hidden="true">
                      <div className={styles.fill} style={{ width: `${percent}%` }}>
                        {makeBubbles(skill.name, bubbleCount).map((b, i) => (
                          <span
                            key={i}
                            className={styles.bubble}
                            style={
                              {
                                "--x": b.x,
                                "--y": b.y,
                                "--size": b.size,
                                "--delay": b.delay,
                                "--duration": b.duration,
                              } as CSSProperties
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <span className={styles.duration}>{formatDuration(months)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
