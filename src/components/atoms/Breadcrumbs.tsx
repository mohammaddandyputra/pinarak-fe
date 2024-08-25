import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbData {
  page: string;
  path: string;
}

interface BreadcrumbsFieldProps {
  data: BreadcrumbData[];
}

const Breadcrumbs: React.FC<BreadcrumbsFieldProps> = ({ data }) => {
  return data.length ? (
    <div className='justify-start mb-4 flex text-atlasian-gray-dark'>
      {data?.map((v, i) => {
        return (
          <div className='text-sm mx-0 flex items-center' key={i}>
            {i >= 1 && (
              <div className='mx-1'>
                <ChevronRight size={22} />
              </div>
            )}
            <Link
              className='no-underline hover:no-underline text-base'
              href={v?.path}
            >
              {v?.page}
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    ''
  );
};

export default Breadcrumbs;
