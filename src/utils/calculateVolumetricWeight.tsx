const calculateVolumetricWeight = (
  jenis_pengiriman: 'reguler' | 'express' | 'trucking',
  panjang: number,
  lebar: number,
  tinggi: number
) => {
  let divisor = 1;

  if (jenis_pengiriman === 'express' || jenis_pengiriman === 'reguler') {
    divisor = 6;
  } else if (jenis_pengiriman === 'trucking') {
    divisor = 3;
  }

  return (panjang * lebar * tinggi) / divisor;
};

export default calculateVolumetricWeight;
