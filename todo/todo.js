const { log } = require('console');
const fs = require('fs');
const filePath = './tasks.json';

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataJSON)
}
const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log('Task added',task);
}

const listTask = () => {
    const tasks = loadTasks();
    tasks.forEach((task,index) => console.log(`${index+1} - ${task.task}`));
}

const removeTask = (argument) => {
    const tasks = loadTasks();
    const newList = tasks.filter((task, i) => i !== argument - 1);
    saveTasks(newList);
    console.log(newList);
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === 'add') {
    addTask(argument);
} else if (command === 'list') {
    listTask();
} else if (command === 'remove') {
    removeTask(parseInt(argument))
} else {
    console.log("Command not found");
}

