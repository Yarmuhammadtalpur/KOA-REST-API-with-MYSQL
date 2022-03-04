const mysql = require("promise-mysql");

async function query(sql) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "userlist",
  });
  try {
    const result = connection.query(sql);
    connection.end();
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  return await query("select * from employees");
}

async function createData(list) {
  return await query(
    `insert into employees (FirstName,LastName,City) value('${list.fname}', '${list.lastName}', '${list.city}' )`
  );
}
async function updateUser(list) {
  return await query(
    `UPDATE employees 
        SET 
        FirstName = '${list.fname}',
        LastName = '${list.lastName},
        City = ''${list.city}'
        WHERE
        PersonID = '${list.PersonID}'`
  );
}
async function deleteUser(list) {
  return await query(
    `Delete from employees WHERE PersonID = '${list.PersonID}'`
  );
}

module.exports = { getAll, createData, updateUser, deleteUser };
