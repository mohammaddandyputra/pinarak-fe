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
});

export default orderSchema;
