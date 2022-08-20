import { showAlert } from './alerts';

export const addProduct = async function (name, image, priceA, priceB, priceC, number) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/products',
      data: {
        name: name,
        image: image,
        priceA: priceA,
        priceB: priceB,
        priceC: priceC,
        number: number,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Product added');
      location.assign(`/products`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const addBill = async function () {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/bills',
      data: {},
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Bill added');
      location.assign(`/bills/new/${res.data.data._id}`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const addBillProducts = async function (dataObj) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/billProducts',
      data: dataObj,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Bill product added');
      location.assign(`/bills`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
