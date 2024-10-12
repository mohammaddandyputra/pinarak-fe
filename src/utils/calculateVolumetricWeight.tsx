const calculateVolumetricWeight = (
  jenis_pengiriman: 'reguler' | 'express' | 'trucking',
  panjang: number,
  lebar: number,
  tinggi: number
) => {
  let divisor = 1;

  if (['express', 'reguler', 'lite'].includes(jenis_pengiriman)) {
    divisor = 6;
  } else if (jenis_pengiriman === 'trucking') {
    divisor = 3;
  } else {
    divisor = 0;
  }

  const volumetricWeight = (panjang * lebar * tinggi) / divisor;

  if (!isFinite(volumetricWeight) || volumetricWeight <= 0) {
    return 0;
  }

  return volumetricWeight;
};

export default calculateVolumetricWeight;
