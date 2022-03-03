const koa = require("koa")
const bodyParser = require("koa-bodyparser")
const KoaRouter = require("koa-router")
var mysql = require('koa-mysql');

//require function here
const app = new koa();
const router = new KoaRouter();

const port = process.env.PORT || 5000

// middle adding here
app.use(bodyParser())


var Data = [
    {"id": 1, "name": "Jhon"},
    {"id": 2, "name": "Alis"},
]

//router
router.get('/', IndexApp)
router.post('/add', GetQuery)
router.put('/update', updateQuery)
router.delete('/delete', removeQuery)

//functions
async function IndexApp(ctx){
    ctx.body = Data
    
    }

async function GetQuery(ctx){
    let UserData = ctx.request.body
    Data.push(UserData)
    ctx.body = "Data Received and Saved, Thankyou"
}

async function updateQuery(ctx){

      let UserData = ctx.request.body
    let checkedRecord = Data.findIndex((e)=> e.id === UserData.id)
        var message;

    if(checkedRecord === -1){
        Data.push(UserData)
        message = "Record not Found, Now added in database"
    } else{
        Data[checkedRecord] = UserData;
        message = "Record Found and and Updated.."
    }
    ctx.body = message
}

async function removeQuery(ctx){
    let UserData = ctx.request.body
    let checkedRecord = Data.findIndex((checkRecord)=> checkRecord.id === UserData.id)
    var message;
    if(checkedRecord === -1){
        message = "Record not Found,"
    } else{
        delete Data[checkedRecord];
        message = "Record Removed"
    }

    ctx.body = message
}

app.use(router.routes()).use(router.allowedMethods())
app.listen(port, ()=>console.log("Server Running on Port: "+port))