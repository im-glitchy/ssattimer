export function Dialog({ children, open }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center">{children}</div>;
}

export function DialogContent({ children, className = '' }) {
  return <div className={`bg-white p-6 rounded shadow ${className}`}>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function DialogFooter({ children, className = '' }) {
  return <div className={`mt-4 flex gap-2 ${className}`}>{children}</div>;
}
