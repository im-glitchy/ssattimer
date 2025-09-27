export function Progress({ value = 0, className = '' }) {
  return (
    <div className={`w-full bg-gray-200 rounded overflow-hidden ${className}`}>
      <div style={{ width: `${Math.max(0, Math.min(100, value))}%` }} className="bg-blue-500 h-2" />
    </div>
  );
}
