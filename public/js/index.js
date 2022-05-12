import '@babel/polyfill';
import { showAlert } from './alerts';
import { addBill, addProduct, addBillProducts } from './addItems';
import { updateProduct, updateBill } from './updateItems';
import { deleteProduct, deleteBill, deleteBillProduct } from './deleteItems';

$(document).ready(function () {
  $('#toggler-btn').on('click', function () {
    $('#clpse-icon').toggleClass('fa-arrow-up-animated');
  });
});
const navBar = document.querySelector('#mainNav');

const bodyClassName = document.querySelector('body').className;
const bodyClassNameArray = bodyClassName.split(' ');

const billContainerDiv = document.querySelector('.billContainer');

const addProductForm = document.querySelector('.addProductForm');
const addBillForm = document.querySelector('.addBillForm');
const billAddButton = document.querySelector('.billAddButton');
const addBillProductsButton = document.querySelector('.addBillProductsButton');

const updateProductForm = document.querySelector('.updateProductForm');
const updateBillForm = document.querySelector('.updateBillForm');

const delProductForms = document.querySelectorAll('.delProductForm');
const delBillForms = document.querySelectorAll('.delBillForm');
let delBillProductButtons = document.querySelectorAll('.delBillProductButton');

if (bodyClassNameArray.includes('indexPage')) {
  navBar.style.display = 'none';
}

// helper functions
const getProducts = async function () {
  try {
    const foundProducts = await axios({
      method: 'GET',
      url: '/api/products',
    });
    return foundProducts;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
const deleteBillProductListner = function (delBillProductButtons) {
  delBillProductButtons.forEach(function (delBillProductButton) {
    delBillProductButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (this.getAttribute('delBillProductURL')) {
        deleteBillProduct(this.getAttribute('delBillProductURL'));
      }
      this.parentElement.parentElement.remove();
    });
  });
};
const billProductHTML = async function () {
  let billId = addBillForm
    ? window.location.pathname.split('/').slice(-1)
    : window.location.pathname.split('/').slice(-2)[0];
  const foundProducts = await getProducts();
  const prodNamesListHtml = function () {
    let tempHTMLHolder = '';
    if (foundProducts.data) {
      foundProducts.data.foundProducts.forEach(function (foundProduct) {
        if (foundProduct.number <= 0) return tempHTMLHolder;
        tempHTMLHolder =
          tempHTMLHolder +
          `<option value="${foundProduct.name}">
              ${foundProduct.name}
            </option>`;
      });
      return tempHTMLHolder;
    }
  };

  const html = function () {
    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = `
        <div class="form-group col-sm-3">
              <label class="billFormsInputLabel">Product Price</label>
              <input class="form-control text-right price" type="text" />
        </div>
        <div class="form-group col-sm-3">
              <label for="bill" class="billFormsInputLabel">Product Name</label>
              <select class="form-control text-right name" type="text" >
                ${prodNamesListHtml()}
              </select>
        </div>
        <div class="form-group col-sm-3">
              <label class="billFormsInputLabel">Number of Items</label>
              <input class="form-control text-right number" type="number" value = 1 />
        </div>
        <div class="form-group" >
              <button class=" form-control btn delBillProductButton util-btn-del" type="button">D</button>
        </div>
        <div class="form-group" style = "display:none" >
              <input class="form-control text-right billId" type="text"  value = "${billId}" />
        </div>
        `;
    htmlElement.classList.add('form-row');
    htmlElement.classList.add('billFormsForm');
    return htmlElement;
  };
  return html();
};

// Handling adding a product input element to a bill
if (addBillForm || updateBillForm) {
  let updateDeleteBillProductButtonsCounter = 0;
  if (updateBillForm) {
    updateDeleteBillProductButtonsCounter = delBillProductButtons.length;
    deleteBillProductListner(delBillProductButtons);
  }
  addBillProductsButton.addEventListener('click', async function (e) {
    e.preventDefault();
    billContainerDiv.append(await billProductHTML());
    delBillProductButtons = document.querySelectorAll('.delBillProductButton');
    deleteBillProductListner(
      Array.prototype.slice.call(delBillProductButtons).slice(updateDeleteBillProductButtonsCounter)
    );
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// adding items
if (billAddButton)
  billAddButton.addEventListener('click', function (e) {
    e.preventDefault();
    addBill();
  });

if (addProductForm)
  addProductForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const prodName = document.querySelector('.prodName');
    const prodImg = document.querySelector('.prodImg');
    const prodPriceA = document.querySelector('.prodPriceA');
    const prodPriceB = document.querySelector('.prodPriceB');
    const prodPriceC = document.querySelector('.prodPriceC');
    const prodNumber = document.querySelector('.prodNumber');
    addProduct(prodName.value, prodImg.value, prodPriceA.value, prodPriceB.value, prodPriceC.value, prodNumber.value);
  });

if (addBillForm) {
  addBillForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const dataArr = [];
    const dataNamesArr = [];
    const prices = document.querySelectorAll('.price');
    const names = document.querySelectorAll('.name');
    const numbers = document.querySelectorAll('.number');
    const billIds = document.querySelectorAll('.billId');
    for (let i = 0; i < billIds.length; i++) {
      dataNamesArr.push(names[i].value);
      dataArr.push({
        price: prices[i].value,
        name: names[i].value,
        number: numbers[i].value,
        billId: billIds[i].value,
      });
    }
    const dataObj = { ...dataArr };
    if (dataNamesArr.length === new Set(dataNamesArr).size) addBillProducts(dataObj);
    else showAlert('error', 'There is a Field With Duplicated Name! Please Enter a New Name or Delete the Field!');
  });
}

// updating items
if (updateProductForm)
  updateProductForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const prodName = document.querySelector('.prodName');
    const prodImg = document.querySelector('.prodImg');
    const prodPriceA = document.querySelector('.prodPriceA');
    const prodPriceB = document.querySelector('.prodPriceB');
    const prodPriceC = document.querySelector('.prodPriceC');
    const prodNumber = document.querySelector('.prodNumber');
    updateProduct(
      this.getAttribute('action'),
      prodName.value,
      prodImg.value,
      prodPriceA.value,
      prodPriceB.value,
      prodPriceC.value,
      prodNumber.value
    );
  });

if (updateBillForm)
  updateBillForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const dataArr = [];
    const dataNamesArr = [];
    const prices = document.querySelectorAll('.price');
    const names = document.querySelectorAll('.name');
    const numbers = document.querySelectorAll('.number');
    const billIds = document.querySelectorAll('.billId');
    const billProductIds = document.querySelectorAll('.billProductId');
    if (billProductIds)
      for (let i = 0; i < billProductIds.length; i++) {
        dataNamesArr.push(names[i].value);
        dataArr.push({
          price: prices[i].value,
          name: names[i].value,
          number: numbers[i].value,
          billProductId: billProductIds[i].value,
        });
      }
    for (let i = 0; i < billIds.length; i++) {
      dataNamesArr.push(names[i + billProductIds.length].value);
      dataArr.push({
        price: prices[i + billProductIds.length].value,
        name: names[i + billProductIds.length].value,
        number: numbers[i + billProductIds.length].value,
        billId: billIds[i].value,
      });
    }
    const dataObj = { ...dataArr };
    if (dataNamesArr.length === new Set(dataNamesArr).size) updateBill(this.getAttribute('action'), dataObj);
    else showAlert('error', 'There is a field with duplicated name please enter a new name or delete the field');
  });

// deleting items
if (delProductForms)
  delProductForms.forEach(function (delProductForm) {
    delProductForm.addEventListener('submit', function (e) {
      e.preventDefault();
      deleteProduct(this.getAttribute('action'));
    });
  });
if (delBillForms)
  delBillForms.forEach(function (delBillForm) {
    delBillForm.addEventListener('submit', function (e) {
      e.preventDefault();
      deleteBill(this.getAttribute('action'));
    });
  });
