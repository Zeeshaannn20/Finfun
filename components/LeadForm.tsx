"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { validateLead, type LeadType } from "@/lib/leads";
import { track } from "@/lib/track";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select" | "checkbox";
  options?: { value: string; label: string }[];
  required?: boolean;
  autoComplete?: string;
  full?: boolean;
  defaultValue?: string;
  checkboxLabel?: ReactNode;
};

type Props = {
  type: LeadType;
  fields: Field[];
  submitLabel: string;
  /** Called after a successful save; return a URL to go to (defaults to /thank-you). */
  onSuccess?: (data: Record<string, string>, res: { reportUrl?: string | null }) => string | void;
  footer?: ReactNode;
};

export default function LeadForm({ type, fields, submitLabel, onSuccess, footer }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<ReactNode>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => (data[k] = String(v).trim()));
    const err = validateLead(type, data);
    if (err) return setError(err);
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, data }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      track("form_submit", { form: type });
      const next = onSuccess?.(data, json);
      if (next === "") {
        setDone(json.reportUrl ? <>Thanks! <a href={json.reportUrl} download>Download the impact report</a>.</> : "Thanks! We’ll email the report to you shortly.");
        setBusy(false);
      } else if (next && /^https?:/.test(next)) window.location.href = next;
      else router.push(next ?? `/thank-you?from=${type}`);
    } catch (e) {
      setError((e as Error).message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (done) return <p className="form-msg ok" role="status">{done}</p>;

  const rows: Field[][] = [];
  for (const f of fields) {
    const last = rows[rows.length - 1];
    if (!f.full && last && last.length === 1 && !last[0].full) last.push(f);
    else rows.push([f]);
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      {rows.map((row, i) => (
        <div className={row.length > 1 ? "form-row" : undefined} key={i}>
          {row.map((f) => (
            <FieldInput key={f.name} f={f} id={`${type}-${f.name}`} />
          ))}
        </div>
      ))}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
        <label>
          Leave empty <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p className="form-msg err" role="alert">
          {error}
        </p>
      )}
      <div>
        <button className="btn btn-blue btn-lg" type="submit" disabled={busy}>
          {busy ? "Sending…" : submitLabel}
        </button>
      </div>
      {footer}
    </form>
  );
}

function FieldInput({ f, id }: { f: Field; id: string }) {
  const req = f.required !== false;
  const label = (
    <label htmlFor={id}>
      {f.label} {!req && <span className="opt">(optional)</span>}
    </label>
  );
  if (f.type === "checkbox")
    return (
      <div className="check">
        <input id={id} type="checkbox" name={f.name} value="yes" required={req} />
        <label htmlFor={id}>{f.checkboxLabel ?? f.label}</label>
      </div>
    );
  if (f.type === "textarea")
    return (
      <div className="field">
        {label}
        <textarea id={id} name={f.name} required={req} defaultValue={f.defaultValue} />
      </div>
    );
  if (f.type === "select")
    return (
      <div className="field">
        {label}
        <select id={id} name={f.name} required={req} defaultValue={f.defaultValue ?? ""}>
          <option value="" disabled>
            Select…
          </option>
          {f.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  return (
    <div className="field">
      {label}
      <input id={id} name={f.name} type={f.type ?? "text"} required={req} autoComplete={f.autoComplete} defaultValue={f.defaultValue} inputMode={f.type === "number" ? "numeric" : undefined} min={f.type === "number" ? 1 : undefined} />
    </div>
  );
}
