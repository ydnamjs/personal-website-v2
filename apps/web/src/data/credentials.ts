// Content for the Credentials page. This page is static, so the content lives
// in code instead of a database. Edit the values below; the page updates.
//
// EVERYTHING HERE IS PLACEHOLDER TEXT. Replace it with your real details.
// Dates are "YYYY-MM". Use `end: null` for a current role.

import type { YearMonth } from "../utils/dates";

// ---------- Experience ----------

export interface Role {
  title: string;
  company: string;
  location?: string;
  start: YearMonth;
  end: YearMonth | null; // null = current role
  description: string[]; // one string per paragraph
}

// Newest first.
export const experience: Role[] = [
  {
    title: "Full Stack Developer",
    company: "Company Name",
    location: "City, ST",
    start: "2022-06",
    end: null,
    description: [
      "Describe what the team does and what you were responsible for. Write in paragraphs: the context first, then your contributions and their impact.",
      "A second paragraph can cover a notable project, a technology decision you drove, or how you worked with other teams.",
    ],
  },
  {
    title: "Junior Developer",
    company: "Previous Company",
    location: "City, ST",
    start: "2020-08",
    end: "2022-05",
    description: [
      "Describe this role the same way. Keep it short and specific, and leave the bullet-point detail to the CV.",
    ],
  },
];

// ---------- Education ----------

export interface Education {
  school: string;
  degree: string;
  startYear: number;
  endYear: number;
  gpa?: string; // a string so you can write "3.85" or "3.85 / 4.0"
}

export const education: Education[] = [
  {
    school: "Your University",
    degree: "B.S. in Computer Science",
    startYear: 2016,
    endYear: 2020,
    gpa: "0.00",
  },
];

// ---------- Certifications ----------

export interface Certification {
  name: string;
  issuer: string;
  earned: YearMonth;
  url?: string; // optional verification link
}

export const certifications: Certification[] = [
  {
    name: "CompTIA A+",
    issuer: "CompTIA",
    earned: "2019-05",
  },
];

// ---------- Technology experience ----------
// Each skill is tagged with BOTH a domain and a type, and has a `since` date
// (plus an optional `until` if you stopped using it). The page can group the
// same list either way, computes the length of time, and draws the bar.
// Add a skill by adding one object. To add a domain or type, add it to the
// matching list below and then use it on a skill.

export const domains = ["Frontend", "Backend", "AI", "Cloud & DevOps"] as const;
export const skillTypes = [
  "Languages",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Platforms",
  "Practices & Concepts",
] as const;

export type Domain = (typeof domains)[number];
export type SkillType = (typeof skillTypes)[number];

export interface Skill {
  name: string;
  domain: Domain;
  type: SkillType;
  since: YearMonth;
  until?: YearMonth | null;
}

export const skills: Skill[] = [
  { name: "HTML & CSS", domain: "Frontend", type: "Languages", since: "2016-09" },
  { name: "JavaScript", domain: "Frontend", type: "Languages", since: "2017-01" },
  { name: "TypeScript", domain: "Frontend", type: "Languages", since: "2021-03" },
  { name: "React", domain: "Frontend", type: "Frameworks & Libraries", since: "2021-03" },

  { name: "Python", domain: "Backend", type: "Languages", since: "2016-09" },
  { name: "Node.js", domain: "Backend", type: "Frameworks & Libraries", since: "2020-08" },
  { name: "SQL", domain: "Backend", type: "Databases", since: "2018-01" },

  { name: "LLM APIs", domain: "AI", type: "Tools & Platforms", since: "2023-01" },
  { name: "Prompt engineering", domain: "AI", type: "Practices & Concepts", since: "2023-01" },

  { name: "AWS", domain: "Cloud & DevOps", type: "Tools & Platforms", since: "2022-06" },
  { name: "Docker", domain: "Cloud & DevOps", type: "Tools & Platforms", since: "2021-06" },
  { name: "GitHub Actions", domain: "Cloud & DevOps", type: "Tools & Platforms", since: "2022-01" },
];
