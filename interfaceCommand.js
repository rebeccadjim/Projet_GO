import inquirer from "inquirer";
import { exec,spawn  } from "child_process";

console.log("Bienvenu(e) dans ce CLI, tapez Commandes pour connaitre les commandes disponibles")
   
function exitCommand(){ //Permet de quitter le programme en appuyant sur ctrl+P
    var stdin=process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data',key =>{
      if(key=='\u0010') {
        process.exit();
        running=false;
        console.log('bug');
      }
   })
}
async function asyncCall(){ 
    let result = await inquirer.prompt([{  //Fonction récupérée sur Internet permettant d'entrer les commandes
        name: 'version',
        type: 'input',
        message: 'commande',
        validate: function (version) {
        return !!version;
        }
    }]);  

    if (result.version=="exit"){  //Autre méthode pour quitter le shell
        
        exec('shell.exit(1)',
        function (error, stdout,  ) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }
    if (result.version.substr(0,5)=="run "){        //Exécute un programme en premier plan
        var a=result.version.substr(4).toString()
        exec(a,
        function (error, stdout) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }

    if (result.version=="lp"){      //Liste des processus
        
        exec('ps -aux',
        function (error, stdout) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }

    // Trois commandes pour tuer, mettre en pause, ou reprendre un process

    if (result.version.substr(0,8)=="bing -k "){ 
        
        var a="kill -9 "+result.version.substr(8).toString()
        exec(a,
        function (error, stdout ) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }

    if (result.version.substr(0,8)=="bing -p "){ 
        
        var a="sudo kill -SIGSTOP "+result.version.substr(8).toString()
        exec(a,
        function (error, stdout,  ) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }

    if (result.version.substr(0,8)=="bing -c "){ 
        
        var a="sudo kill -SIGCONT"+result.version.substr(8).toString()
        exec(a,
        function (error, stdout) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }

    if (result.version.substr(0,5)=="!run "){   //Exécution d'une tâche en arrière-plan
        var a=result.version.substr(4).toString()+ "&"
        exec(a,
        function (error, stdout) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }

    if (result.version.substr(0,5)=="keep "){   //Détacher certains processus
        var a="disown "+result.version.substr(4)
        exec(a,
        function (error, stdout,  ) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
                return
            }
        });
    }


    else if (result.version=="Commandes") { //Liste les diffÃ©rentes commandes.
        console.log("Les commandes sont :")
        console.log("ctrl+P: exit")
        console.log("lp : liste des processus") 
        console.log("ls : liste des fichiers contenus dans le dossier") 
        console.log("bing [-k|-p|-c] <processId>: Pouvoir tuer, mettre en pause ou reprendre un processus")
        console.log("nom_programme + !: exÃ©cuter tÃ¢che en fond d'un programme")
        console.log("keep + num PID : DÃ©tacher le processus du CLIi")
  
    } 
}

while(true){
    exitCommand();
    await asyncCall();
}
