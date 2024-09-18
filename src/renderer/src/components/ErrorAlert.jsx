
import classNames from 'classnames';
const variantStyles = {
  danger: {
    border: 'border-red-500',
    background: 'bg-red-50',
    text: 'text-red-800',
    icon: 'text-red-800',
    iconPath: (
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    ),
    title: "Quelque chose s'est mal passé.",
  },
  warning: {
    border: 'border-yellow-500',
    background: 'bg-yellow-50',
    text: 'text-yellow-800',
    icon: 'text-yellow-800',
    iconPath: (
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    ),
    title: "Avertissement!",
  },
  success: {
    border: 'border-green-500',
    background: 'bg-green-50',
    text: 'text-green-800',
    icon: 'text-green-800',
    iconPath: (
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.293 7.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 011.414-1.414L11 13.586l4.293-4.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    ),
    title: "Succès!",
  },
};

const ErrorAlert = ({ message, variant = 'danger',className }) => {
  const styles = variantStyles[variant];

  return (
    <div role="alert" className={classNames("rounded border-s-4 p-4 ",className,styles.border,styles.background)}>
      <div className={`flex items-center gap-2 ${styles.text}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
          {styles.iconPath}
        </svg>

        <strong className="block font-medium">{styles.title}</strong>
      </div>

      <p className={`mt-2 text-sm ${styles.text}`}>
        {message}
      </p>
    </div>
  );
};

export default ErrorAlert;
