import { useId, useState, type ReactNode } from "react";
import styles from "./Collapsible.module.css";

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

// A page section whose heading is a button that opens and closes the content.
//
// Accessibility pattern (the "disclosure" pattern):
//  - The heading contains a real <button>, so Tab, Enter, and Space work.
//  - aria-expanded tells screen readers whether the section is open.
//  - aria-controls points the button at the panel it controls.
export default function Collapsible({
  title,
  defaultOpen = true,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  // useId gives each instance unique ids, so several Collapsibles can
  // share a page without their ids clashing.
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const panelId = `${baseId}-panel`;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.heading}>
        <button
          type="button"
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span>{title}</span>
          <span className={styles.chevron} aria-hidden="true" />
        </button>
      </h2>

      {/* Three nested elements make the height animation work; see the
          comments in Collapsible.module.css. */}
      <div
        id={panelId}
        className={open ? `${styles.panel} ${styles.open}` : styles.panel}
      >
        <div className={styles.panelInner}>
          <div className={styles.panelContent}>{children}</div>
        </div>
      </div>
    </section>
  );
}
