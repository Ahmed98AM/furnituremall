import { showAlert } from './alerts';
export const deleteProduct = async function (url) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/${url}`,
      data: {},
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Product deleted');
      location.assign(`/products`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Something went wrong');
  }
};
export const deleteBill = async function (url) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/${url}`,
      data: {},
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Bill deleted');
      location.assign(`/bills`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Something went wrong');
  }
};
export const deleteBillProduct = async function (url) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/${url}`,
      data: {},
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Product deleted');
      location.reload();
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Something went wrong');
  }
};
