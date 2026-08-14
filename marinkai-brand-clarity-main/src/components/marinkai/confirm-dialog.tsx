import { type ReactNode } from "react";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="panel relative z-10 w-full max-w-md p-6"
        style={{ boxShadow: "var(--shadow-panel)" }}
      >
        <h2 id="confirm-dialog-title" className="text-[20px] text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="control-base px-4 text-[13px] font-medium" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className="rounded-[12px] px-4 py-2 text-[13px] font-medium"
            style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DialogActions({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex flex-wrap gap-2">{children}</div>;
}
