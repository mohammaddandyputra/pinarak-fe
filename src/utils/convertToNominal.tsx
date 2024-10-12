const convertToNominal = (value: string | number): string => {
  const stringValue = value.toString();
  const cleanValue = stringValue.replace(/\D/g, '');

  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default convertToNominal;
