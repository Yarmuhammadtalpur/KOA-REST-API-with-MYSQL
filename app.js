const koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const mysql = require("promise-mysql");
const bodyParser = require("koa-bodyparser");
const { getAll, createData, updateUser, deleteUser } = require("./db");

//require function here
const app = new koa();
const router = new KoaRouter();

const port = process.env.PORT || 5000;

app.use(json());
//connecting to mysql database
// var connection = mysql.createConnection({
//   user: "root",
//   password: "12345",
//   host: "localhost",
//   database: "userlist",
//   insecureAuth: true,
// });

// middle adding here
app.use(bodyParser());

// router.get("/", IndexApp);
// router.post("/add", GetQuery);
// router.put("/update", updateQuery);
// router.delete("/delete", removeQuery);

//functions
router.get("/", async function (ctx) {
  const data = await getAll();
  ctx.body = data;
});

router.post("/add", async function (ctx) {
  const list = ctx.request.body;
  await createData(list);
  ctx.body = "Data Received, Thank you";
});

router.put("/update", async function (ctx) {
  const list = ctx.request.body;
  await updateUser(list);
  ctx.body = "User Updated";
});
router.delete("/delete", async function (ctx) {
  const list = ctx.request.body;
  await deleteUser(list);
  ctx.body = "User Removed";
});

// async function IndexApp(ctx) {
//   let response = {};
//   await connection.execute(
//     "select * from employees",
//     function (error, results, fields) {
//       if (error) throw error;
//       response = results;
//       console.log(results);
//     }
//   );
//   ctx.body = response;
// }

async function GetQuery(ctx) {
  let UserData = ctx.request.body;
  Data.push(UserData);
  ctx.body = "Data Received and Saved, Thankyou";
}

async function updateQuery(ctx) {
  let UserData = ctx.request.body;
  let checkedRecord = Data.findIndex((e) => e.id === UserData.id);
  var message;

  if (checkedRecord === -1) {
    Data.push(UserData);
    message = "Record not Found, Now added in database";
  } else {
    Data[checkedRecord] = UserData;
    message = "Record Found and and Updated..";
  }
  ctx.body = message;
}

async function removeQuery(ctx) {
  let UserData = ctx.request.body;
  let checkedRecord = Data.findIndex(
    (checkRecord) => checkRecord.id === UserData.id
  );
  var message;
  if (checkedRecord === -1) {
    message = "Record not Found,";
  } else {
    delete Data[checkedRecord];
    message = "Record Removed";
  }

  ctx.body = message;
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log("Server Running on Port: " + port));
