import { ErrorValidation } from '@/components/atoms';

interface FormLabelProps {
  label: string;
  form: any;
  labelPositionTop?: boolean;
  widthLabel?: string;
  widthForm?: string;
  classNameLabel?: string;
  classNameForm?: string;
  errors?: string;
}

const FormLabel = ({
  label,
  form,
  labelPositionTop,
  widthLabel,
  widthForm,
  classNameLabel,
  classNameForm,
  errors,
}: FormLabelProps) => {
  return (
    <>
      <div className={`${labelPositionTop ? `` : `flex`}`}>
        <div
          className={`${widthLabel ? widthLabel : ''} ${
            classNameLabel ? classNameLabel : ''
          } ${labelPositionTop ? `ml-1` : ``} text-sm text-brisma font-semibold`}
        >
          {label}
        </div>
        <div
          className={`${widthForm} ${classNameForm ? classNameForm : ''} ${labelPositionTop ? 'mt-1.5' : 'ml-2'}`}
        >
          {form}
        </div>
      </div>
      {errors && (
        <div className='-mt-4'>
          <ErrorValidation message={errors} />
        </div>
      )}
    </>
  );
};

export default FormLabel;
