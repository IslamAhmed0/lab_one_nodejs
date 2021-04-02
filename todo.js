const fs = require('fs');
const rr = require('./functions');


//argument
function parseCmdArgs(args) {
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

function main(cmdArgs) {

    const parsedArgs = parseCmdArgs(cmdArgs);
    switch (parsedArgs.command) {
        case 'add':
            rr.add(parsedArgs)
            return;

        case 'edit':
            rr.edit(parsedArgs)
            return;
        case 'remove':
            rr.remove(parsedArgs);
            return;
        case 'list':
            rr.list();
            return;
        case 'checked':
            rr.checkedTodo();
            return;
        case 'unchecked':
            rr.uncheckedTodo();
            return;
        default:
            return;
    }

}

checkFile('todo.json');
main(process.argv)