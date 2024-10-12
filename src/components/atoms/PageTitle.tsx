import React from 'react';

interface PageTitleProps {
  text: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ text, className }) => {
  return (
    <div className='flex-1'>
      <p className={`text-3xl font-bold ${className || ''}`}>{text}</p>
    </div>
  );
};

export default PageTitle;
