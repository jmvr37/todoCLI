const readline = require("readline")
const chalk = require('chalk')
const fs = require("fs");
const file = "todoTask.json"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })


rl.setPrompt(">")
 console.log(chalk.yellow("TO-DO List CLI"));
 console.log("---------------------------------------------------")
 console.log("Welcome to your Todo List\n");

const readFile = fileName => {
    try {
      return JSON.parse(fs.readFileSync(fileName));
    } catch (e) {
      return [];
    }
  };
  
  const writeFile = (fileName, content) => {
    try {
      fs.writeFileSync(fileName, JSON.stringify(content));
      console.log("task added successfully");
    } catch (e) {
      console.log(e);
    }
  };
let todoTasks = readFile(file);

const checkAnswer = answer => {
  let command = answer.charAt(0);
    
    if (command === "v"){
      if(todoTasks.length === 0){
        console.log(`empty list`)
        rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>`, checkAnswer);
      } else{
        todoTasks.forEach(function (task, index){
          console.log(`${index}${task}`)
        });
        rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>`, checkAnswer);
      }
        
    }   else if (command === 'n'){
      rl.question(`What?\n>`, task => {
      todoTasks.push(` [ ] ${task}`)
      console.log(`${task} has been added`)
      rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>`, checkAnswer);  
      });

  } else if (command === 'c'){
    let indexNum = parseInt(answer.slice(1));
        for (let i=0; i < todoTasks.length; i++){
            if (i === indexNum){
                    todoTasks[i] = todoTasks[i].replace('[ ]', '[✓]');
                    console.log(`${todoTasks[i]} has been checked`)
            } else {
                    todoTasks[i] = todoTasks[i]
            }
        }
    rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>`, checkAnswer);
    }   else if (command === 'd'){
  
      let indexNum = parseInt(answer.slice(1));
              todoTasks.forEach((element, index) => {
                  if(index === indexNum){
                       todoTasks.splice(index, 1)
                       console.log(`${element} has been deleted.`)
                  } 
              })
  
              
              
              rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>`, checkAnswer);
      } 
    
    else {
        if (command === 'q'){
          rl.close()
            console.log('see you soon! 😁');
            
    }}
    
}


rl.question(`\nWelcome to Todo CLI! (v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>`, checkAnswer)