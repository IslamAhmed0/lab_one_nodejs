const fs = require('fs');



//read
function readTodos(pathName) {
    const todos = fs.readFileSync(pathName, 'utf8');
    return JSON.parse(todos)

}
//path
const path="./todo.json";
//write
function writeTodos(data) {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync('todo.json', jsonData)

}

//add
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


//edit
function edit(data) {
    let todo = readTodos(path);
    todo.forEach((ele, index) => {
        if (ele.id == data.id) {
            editObject(todo, data, index);
            console.log(`updated Succesfully ${data.id} `);
            writeTodos(todo);

        } else {
            console.log(`fail ${data.id} `);
        }
    });

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

 function  editObject (old_data, new_data, index) {
     old_data[index].title = new_data.title;
     old_data[index].checked = true;
    console.log(old_data);
    writeTodos( old_data);
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

//argument
function argument(args) {
    const [, , command, ...options] = args;
    //console.log(options);
    const parsedoptions = options.reduce((cum, elm) => {
        const [optionName, optinValue] = elm.split('=');
        cum[optionName] = optinValue;
        return cum;
    }, {})
    parsedoptions.command = command;
    return parsedoptions;

}
checkFile = (pathName) => {
    if (!fs.existsSync(pathName)) {
        fs.writeFileSync(pathName, '[]');
    }
}

    const parsedArgs = argument(process.argv);
    switch (parsedArgs.command) {
        case 'add':
            add(parsedArgs)
            break;

        case 'edit':
            edit(parsedArgs)
            break;
        case 'remove':
            remove(parsedArgs);
            break;
        case 'list':
            list();
            break;
        case 'checked':
            checkedTodo();
            break;
        case 'unchecked':
            uncheckedTodo();
            break;
        default:
            console.log("not valid")
            break;
    }



checkFile('todo.json');
