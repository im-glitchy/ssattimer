export function Card({ children, className = '' }) {
  return <div className={`rounded bg-white shadow ${className}`}>{children}</div>;
}
export function CardHeader({ children, className = '' }) {
  return <div className={`border-b p-4 ${className}`}>{children}</div>;
}
export function CardTitle({ children, className = '' }) {
  return <h4 className={`font-semibold ${className}`}>{children}</h4>;
}
export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
