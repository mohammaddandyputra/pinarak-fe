import React, { MouseEvent, ReactNode } from 'react';

interface DivActionProps {
  className?: string;
  isDisabled?: boolean;
  handleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

const DivAction: React.FC<DivActionProps> = ({
  className = '',
  handleClick,
  children,
  isDisabled = false,
}) => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleClick?.(e);
  };

  if (isDisabled) {
    return <div className={`${className} cursor-not-allowed`}>{children}</div>;
  }

  return (
    <div role='button' tabIndex={0} className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default DivAction;
