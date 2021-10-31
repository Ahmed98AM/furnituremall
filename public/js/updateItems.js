import { showAlert } from './alerts';

export const updateProduct = async function (url, name, image, priceA, priceB, priceC, number) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/${url}`,
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
      showAlert('success', 'Product updated');
      location.assign(`/products`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Something went wrong');
  }
};
export const updateBill = async function (url, dataObj) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/${url}`,
      data: dataObj,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Bill updated');
      location.assign(`/bills`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
