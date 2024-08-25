import * as yup from 'yup';

const recipientSchema = yup.object().shape({
  nama: yup.string().required('Wajib diisi'),
  no_telepon: yup.string().required('Wajib diisi'),
  alamat: yup.string().required('Wajib diisi'),
  kecamatan_id: yup.string().required('Wajib diisi'),
});

export default recipientSchema;
