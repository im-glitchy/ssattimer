export function Button({ children, className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center px-3 py-2 rounded transition';

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const vclass = variants[variant] || variants.default;

  return (
    <button className={`${base} ${vclass} ${className}`} {...props}>
      {children}
    </button>
  );
}
