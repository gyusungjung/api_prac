const express = require('express');
const app = express();
const port = 3000;

const productsRouter = require('./routes/products.router.js');
const connect = require('./schemas');
connect();

app.use(express.json());
app.use('/api', productsRouter); //미들웨어가 많으면 [goodsRouter, usersRouter] 배열로 넣을수 있음

app.get('/favicon.ico', (req, res) => res.status(204));

//제대로 돌아가는지 테스트
app.post('/', (req, res) => {
  console.log(req.body);

  res.send('products 기본 URI에 POST메소드가 정상적으로 실행됨');
});

app.get('/', (req, res) => {
  console.log(req.query);

  //res.send("정상적으로 반환되었습니다");

  const obj = {
    keykey: "it's a products value",
    이름입니다: '이름이래..',
  };

  res.status(400).json(obj); //400으로 변경함
  //res.json(obj); //기본 status 200
});

//id는 경로 매개변수를 나타냄,경로 매개변수는 URL 경로의 일부를 변수로 취급
app.get('/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  res.send(':id 반환됨 products ' + id);
});

app.listen(port, () => {
  console.log(port, '포트로 products 서버가 열렸어요!');
});
