"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { formatPrice, type Currency } from "@/lib/currency";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
  variant: string;
  year: number;
  price: number;
  colorHex: string;
  currency: Currency;
}

export default function InvoiceModal({
  isOpen,
  onClose,
  vehicleName,
  variant,
  year,
  price,
  colorHex,
  currency,
}: InvoiceModalProps) {
  const isMobile = useIsMobile();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setName(""); setEmail(""); setPhone(""); setMessage("");
        setStatus("idle"); setErrorMsg("");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, vehicleName, variant, year, price, colorHex }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to send request");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const content = (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Request Invoice
          </span>
          <h2 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: "8px 0 4px", lineHeight: 1.1 }}>
            {vehicleName} <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>{year}</span>
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>{variant}</p>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--text-muted)", flexShrink: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M14 4L4 14M4 4L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Vehicle summary */}
      <div style={{ background: "var(--bg-soft)", border: "1px solid var(--border-divider)", padding: "12px 16px", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: colorHex, border: "1px solid var(--border)", flexShrink: 0 }} />
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{variant}</span>
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
          {formatPrice(price, currency)}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", padding: "24px 0 8px" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.5 9L7.5 13L14.5 5.5" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>Request Sent</p>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "28px" }}>We'll be in touch within 24 hours.</p>
            <button
              onClick={onClose}
              style={{ padding: "12px 40px", background: "var(--text-primary)", color: "var(--bg)", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Close
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <FieldInput label="Full Name"       value={name}    onChange={setName}    type="text"  required />
            <FieldInput label="Email Address"   value={email}   onChange={setEmail}   type="email" required />
            <FieldInput label="Phone Number"    value={phone}   onChange={setPhone}   type="tel"   required />

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                Message <span style={{ opacity: 0.45 }}>(optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Any questions or notes…"
                style={{ background: "none", border: "none", borderBottom: "1px solid var(--border)", outline: "none", resize: "none", fontSize: "14px", color: "var(--text-primary)", padding: "8px 0", fontFamily: "inherit", transition: "border-color 0.2s ease" }}
              />
            </div>

            {status === "error" && (
              <p style={{ fontSize: "12px", color: "#E53E3E", margin: "-8px 0 0" }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              style={{ marginTop: "4px", padding: "14px", background: status === "loading" ? "var(--text-muted)" : "var(--text-primary)", color: "var(--bg)", border: "none", cursor: status === "loading" ? "default" : "pointer", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 0.2s ease" }}
            >
              {status === "loading" ? "Sending…" : "Send Request"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, backdropFilter: "blur(3px)" }}
          />

          {/* Mobile: slide up from bottom */}
          {isMobile ? (
            <motion.div
              key="panel-mobile"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201, background: "var(--bg)", borderRadius: "16px 16px 0 0", padding: "28px 24px 48px", maxHeight: "92vh", overflowY: "auto" }}
            >
              {/* Drag handle indicator */}
              <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "var(--border)", margin: "0 auto 24px" }} />
              {content}
            </motion.div>
          ) : (
            /* Desktop: scale + fade in, centered */
            <motion.div
              key="panel-desktop"
              initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1,    x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.96,    x: "-50%", y: "-50%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "fixed", top: "50%", left: "50%", zIndex: 201, background: "var(--bg)", width: "520px", padding: "44px 48px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}
            >
              {content}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function FieldInput({
  label, value, onChange, type, required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{ background: "none", border: "none", borderBottom: "1px solid var(--border)", outline: "none", fontSize: "14px", color: "var(--text-primary)", padding: "8px 0", fontFamily: "inherit", transition: "border-color 0.2s ease" }}
      />
    </div>
  );
}
