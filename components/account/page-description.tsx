interface PageDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageDescription({ children, className = "" }: PageDescriptionProps) {
  return (
    <p className={`text-sm text-gray-700 dark:text-gray-300 mt-2 ${className}`}>
      {children}
    </p>
  );
}