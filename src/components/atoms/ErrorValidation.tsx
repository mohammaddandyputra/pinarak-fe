interface ErrorValidationProps {
  message: string;
  className?: string;
}

const ErrorValidation = ({ message, className }: ErrorValidationProps) => {
  return (
    <span
      className={`text-atlasian-red mt-1 text-xs ${className ? className : ''}`}
    >
      {message}
    </span>
  );
};

export default ErrorValidation;
