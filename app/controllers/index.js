const getMyEle = (ele) => document.getElementById(ele);
var productService = new ProductService();

//api danh sach
const getProductList = () => {
  productService.getList().then((response) => {
    renderProductList(response.data);
  });
};

const renderProductList = (data) => {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<tr>
    <td>${i + 1}</td>
    <td>${data[i].name}</td>
    <td>${data[i].price}</td>
    <td>${data[i].screen}</td>
    <td>${data[i].backCamera}</td>
    <td>${data[i].frontCamera}</td>
    <td>${data[i].img}</td>
    <td>${data[i].desc}</td>
    <td>${data[i].type}</td>
    <td>
      <button class="btn btn-danger" onclick="deleteProduct('${
        data[i].id
      }')">Xoá</button>
      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="openUpdateModel('${
        data[i].id
      }')" >Sửa</button>
    </td>
  </tr>`;
    getMyEle("tblDanhSachSP").innerHTML = html;
  }
};

//Khi load vao du lieu dc cap nhat lien
window.onload = () => {
  getProductList();
};

//Hien modal bam them SP
getMyEle("btnThemSP").addEventListener("click", () => {
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick="addProduct()" class="btn btn-primary">Thêm</button>`;
});

//Them san pham
const addProduct = () => {
  const isValid = validateForm();
  if (!isValid) return;

  const name = getMyEle("TenSP").value;
  const price = getMyEle("GiaSP").value;
  const img = getMyEle("HinhSP").value;
  const description = getMyEle("MoTa").value;
  const screen = getMyEle("ManHinh").value;
  const backCamera = getMyEle("CameraSau").value;
  const frontCamera = getMyEle("CameraTruoc").value;
  const type = getMyEle("loaiSP").value;

  const products = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    description,
    type
  );

  productService.addProduct(products).then(() => {
    document.querySelector(".close").click();
    alert("Thêm sản phẩm thành công");
    getProductList();
  });
};

const openUpdateModel = (id) => {
  document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick="updateProduct(${id})" class="btn btn-primary">Sửa</button>`;

  productService.getById(id).then((response) => {
    getMyEle("TenSP").value = response.data.name;
    getMyEle("GiaSP").value = response.data.price;
    getMyEle("ManHinh").value = response.data.screen;
    getMyEle("CameraSau").value = response.data.backCamera;
    getMyEle("CameraTruoc").value = response.data.frontCamera;
    getMyEle("HinhSP").value = response.data.img;
    getMyEle("MoTa").value = response.data.desc;

    getMyEle("loaiSP").value = response.data.type;
  });
};

const updateProduct = (id) => {
  const isValid = validateForm();
  if (!isValid) return;
  const name = getMyEle("TenSP").value;
  const price = getMyEle("GiaSP").value;
  const img = getMyEle("HinhSP").value;
  const description = getMyEle("MoTa").value;
  const screen = getMyEle("ManHinh").value;
  const backCamera = getMyEle("CameraSau").value;
  const frontCamera = getMyEle("CameraTruoc").value;
  const type = getMyEle("loaiSP").value;

  const products = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    description,
    type
  );

  productService.updateProduct(id, products).then(() => {
    document.querySelector(".close").click();
    alert("Sửa sản phẩm thành công");
    getProductList();
  });
};

const deleteProduct = (id) => {
  productService.deleteProduct(id).then(() => {
    alert("Xoá sản phẩm thành công");
    getProductList();
  });
};

/**********VALIDATE FORM ***********/
function validateForm() {
  var name = getMyEle("TenSP").value;
  var price = getMyEle("GiaSP").value;
  var img = getMyEle("HinhSP").value;
  var description = getMyEle("MoTa").value;
  var screen = getMyEle("ManHinh").value;
  var backCamera = getMyEle("CameraSau").value;
  var frontCamera = getMyEle("CameraTruoc").value;
  var type = getMyEle("loaiSP").value;

  var isValid = true;

  isValid &= required(name, "txtTenSp", "*Vui lòng nhập tên sản phẩm");
  isValid &=
    required(price, "txtGiaSp", "*Vui lòng nhập giá sản phẩm") &&
    checkNumber(price, "txtGiaSp", "*Giá sản phẩm phải là số");
  isValid &= required(description, "txtDesc", "*Vui lòng nhập mô tả sản phẩm");

  isValid &= required(img, "txtImg", "*Vui lòng nhập hình ảnh sản phẩm");
  isValid &= required(
    screen,
    "txtScreen",
    "*Vui lòng nhập kích thước màn hình"
  );
  isValid &= required(img, "txtImg", "*Vui lòng nhập hình ảnh sản phẩm");

  isValid &= required(
    frontCamera,
    "txtFC",
    "*Vui lòng nhập kích thước màn Camera trước"
  );
  isValid &= required(
    backCamera,
    "txtBC",
    "*Vui lòng nhập kích thước màn Camera sau"
  );
  isValid &= required(type, "txtType", "*Vui lòng nhập loại");
  // isValid &= required(type, "txtType", "*Vui lòng chọn loại ");
  //neu isValid = true => dung va nguoc lai
  return isValid;
}

function required(value, spanId, alert) {
  if (value.length == "" && value.length === 0) {
    getMyEle(spanId).innerHTML = alert;
    return false;
  }
  getMyEle(spanId).innerHTML = "";
  return true;
}

function checkNumber(value, spanId, alert) {
  var parttern = /^[0-9]+$/;
  if (parttern.test(value)) {
    getMyEle(spanId).innerHTML = "";
    return true;
  }
  getMyEle(spanId).innerHTML = alert;
  return false;
}
