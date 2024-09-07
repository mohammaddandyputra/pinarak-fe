import * as yup from 'yup';

const orderSchema = yup.object().shape({
  pengirim_nama: yup.string().required('Wajib diisi'),
  pengirim_no_telepon: yup.string().required('Wajib diisi'),
  pengirim_alamat: yup.string().required('Wajib diisi'),
  pengirim_kecamatan_id: yup.string().required('Wajib diisi'),
  penerima_nama: yup.string().required('Wajib diisi'),
  penerima_no_telepon: yup.string().required('Wajib diisi'),
  penerima_alamat: yup.string().required('Wajib diisi'),
  penerima_kecamatan_id: yup.string().required('Wajib diisi'),
  penerima_jenis_alamat: yup.string().required('Wajib diisi'),
  barang: yup
    .array()
    .of(
      yup.object().shape({
        berat_barang: yup.string().required('Wajib diisi'),
        panjang: yup.string().required('Wajib diisi'),
        lebar: yup.string().required('Wajib diisi'),
        tinggi: yup.string().required('Wajib diisi'),
      })
    )
    .min(1, 'Minimal 1 data Barang wajib diisi')
    .default([]),
  jenis_pengiriman: yup.string().required('Wajib diisi'),
  metode_pembayaran: yup.string().required('Wajib diisi'),
});

export default orderSchema;
