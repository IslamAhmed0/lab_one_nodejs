const fs = require('fs');




function readTodos(pathName) {
    const todos = fs.readFileSync(pathName, 'utf8');
    return JSON.parse(todos)

}

const path="./todo.json";

function writeTodos(data) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync('todo.json', jsonData)

}

function add(options) {
    console.log(options);
    let data={};
     data.title = options.title;
    let todo = readTodos(path);
    data.id = getLastId(todo);
    data.checked = false;
    todo.push(data);
    writeTodos(todo);

}

function edit(data) {
    let todo = readTodos(path);
    let result;
    todo.forEach((ele, index) => {
        if (ele.id == data.id) {
            editObject(todo, data, index);
            result = `obj with id ${data.id} updated Succesfully`;
            writeTodos(todo);

        } else {
            result = `obj with id ${data.id} not Exist`;
        }
    });
    console.log(result);

}

//length of obj
getLastId = (data) => {
    //console.log(data)
    if (!data.length) {
        return 1;
    } else {
        let lastId = data[data.length - 1].id;
       // console.log(lastId)
        return lastId + 1;
    }
}

editObject = (existData, newData, index) => {
    existData[index].title = newData.title;
    existData[index].checked = true;
    console.log(existData);
    writeTodos(existData);
}

function remove(data) {
    let fileData = readTodos(path);
    fileData.forEach((ele, index) => {
        if (ele.id == data.id) {
            console.log(`removed Succesfully${data.id}`)
            fileData.splice(index, 1);
        } else {
            console.log(`fail ${data.id}`);
        }
    });
    writeTodos(fileData);
}
function list()
{
    listData=readTodos(path)
    console.log(listData);

}
function checkedTodo(){
    const items=readTodos(path)

}
function uncheckedTodo(){
    const items=readTodos(path)


}
module.exports = {
    add,
    edit,
    remove,
    list,
    checkedTodo,
    uncheckedTodo,



};