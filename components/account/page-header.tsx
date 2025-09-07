interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>
      {description && (
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}