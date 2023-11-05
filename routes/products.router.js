const express = require("express");
const router = express.Router();

//기본세팅을 하나 여기서 할수 있나?

//상품 등록

const Products = require("../schemas/products.schema.js");
router.post("/products", async (req, res) => {
  const { productsId, title, content, author, password, status } = req.body;

  const products = await Products.find({ productsId });
  if (products.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 ID입니다" });
  }

  const createdProducts = await Products.create({
    productsId,
    title,
    content,
    author,
    password,
    status,
    createdAt: new Date(),
  });

  res.json({ products: createdProducts });
});

//상품목록 조회 API
router.get("/products", async (req, res) => {
  const products = await Products.find()
    .select("-content")
    .sort({ createdAt: -1 });
  res.status(200).json({ products });
});

//상품 상세 조회API(id로 조회하기)
router.get("/products/:productsId", async (req, res) => {
  const { productsId } = req.params;

  const product = await Products.findOne({ productsId: productsId });
  res.status(200).json({ product });
});

//상품 정보 수정
//
router.put("/products/", async (req, res) => {
  const { productsId, title, content, status, author, password } = req.body;

  const product = await Products.findOne({ productsId });
  if (product) {
    if (product.password === password) {
      await Products.updateOne(
        { productsId: productsId },
        {
          $set: {
            title: title,
            content: content,
            status: status,
            author: author,
            password: password,
          },
        }
      );
      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, errorMessage: "비밀번호가 틀렸습니다." });
    }
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: "상품 조회에 실패하였습니다." });
  }
});

//상품 삭제

router.delete("/products", async (req, res) => {
  const { productsId, password } = req.body;

  const product = await Products.findOne({ productsId });
  if (product) {
    if (product.password === password) {
      await Products.deleteOne({ productsId });
      res.json({ result: "success", message: "상품을 삭제하였습니다." });
    } else {
      res
        .status(400)
        .json({ success: false, errorMessage: "비밀번호가 틀렸습니다." });
    }
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: "존재하지 않는 상품입니다." });
  }
});

//상품 장바구니 담기
const List = require("../schemas/products.schema.js");
router.post("/goods/:productsId", async (req, res) => {
  const { productsId } = req.params;

  const existList = await List.find({ productsId });
  if (existList.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 등록된 상품입니다.",
    });
  }

  //만약에 형식이 올바르지 않다면 오류가 되도록도 설정해야함 위 if문안에 넣어서 and가 되도록 해도 좋을듯

  await List.create({ productsId });
  res.json({ result: "success" });
});

module.exports = router;
