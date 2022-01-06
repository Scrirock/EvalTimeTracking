import {Utils} from "./Utils";
import {CreateGroup} from "./CreateGroup";

let formAddTask: HTMLElement;

export class CreateInput {

    static createProjectInput(): void{
        let groupContainer: HTMLDivElement = <HTMLDivElement>document.querySelector(".groupContainer")
        if (groupContainer){
            groupContainer.style.filter = "blur(4px)";
        }

        let container: HTMLElement = Utils.createCreate("div", "addProjectContainer", document.body);
        let littleSquare: HTMLElement = Utils.createCreate("div", "littleSquare", container);

        let formTitle: HTMLElement = Utils.createCreate("p", "formTitle", littleSquare);
        formTitle.innerHTML = "Ajouter un projet";

        let projectLabel: HTMLLabelElement = document.createElement("label");
        projectLabel.innerHTML = "Nom du projet";
        projectLabel.htmlFor = "projectName";
        littleSquare.append(projectLabel);

        let projectInput: HTMLInputElement = document.createElement("input");
        projectInput.type = "text";
        projectInput.id = "projectName";
        littleSquare.append(projectInput);

        let formTitle2: HTMLElement = Utils.createCreate("p", "formTitle", littleSquare);
        formTitle2.innerHTML = "Ajouter des tâches";

        let taskLabel: HTMLLabelElement = document.createElement("label");
        taskLabel.innerHTML = "Nom de la tâche";
        taskLabel.htmlFor = "taskName";
        littleSquare.append(taskLabel);

        let taskInput: HTMLInputElement = document.createElement("input");
        taskInput.type = "text";
        taskInput.id = "taskName";
        littleSquare.append(taskInput);

        let confirmIcon: HTMLElement = Utils.createCreate("i", "far fa-check-circle", littleSquare);
        confirmIcon.title = "Confirmer";

        confirmIcon.addEventListener("click", ()=>{
            let taskLine = Utils.createCreate("p", "task", formAddTask)
            taskLine.innerHTML = taskInput.value;
            taskInput.value = "";
        });

        formAddTask = Utils.createCreate("div", "formAddTask", littleSquare);

        let buttonContainer = Utils.createCreate("div", "buttonContainer", littleSquare)

        let button: HTMLElement =  Utils.createCreate("div", "confirmAdd", buttonContainer);
        button.innerHTML = "Ajouter";

        let cancel: HTMLElement =  Utils.createCreate("div", "cancel", buttonContainer);
        cancel.innerHTML = "Annuler";

        cancel.addEventListener("click", ()=>{
            groupContainer.style.filter = "blur(0)";
            container.remove();
        })

        button.addEventListener("click", ()=>{
            if (projectInput.value.length > 0) {
                let elementOfTaskContainer: HTMLCollection = formAddTask.children;
                if (elementOfTaskContainer.length > 0) {
                    let taskArray: string[] = [];
                    for (let i: number = 0; i < elementOfTaskContainer.length; i++) {
                        taskArray.push(elementOfTaskContainer[i].innerHTML);
                    }
                    CreateGroup.addProject(projectInput.value, taskArray);
                }
                else {
                    CreateGroup.addProject(projectInput.value, null);
                }
                groupContainer.style.filter = "blur(0)";
                container.remove();
            }
            else {
                let errorMessage: HTMLElement = Utils.createCreate("p", "errorMessage", littleSquare);
                errorMessage.innerHTML = "N'oublie pas de nommer votre projet";
            }
        })
    }

    static createTaskInput(clickedButton: HTMLElement): void{
        let groupContainer: HTMLDivElement = <HTMLDivElement>document.querySelector(".groupContainer")
        if (groupContainer){
            groupContainer.style.filter = "blur(4px)";
        }

        let container: HTMLElement = Utils.createCreate("div", "addProjectContainer", document.body);
        let littleSquare: HTMLElement = Utils.createCreate("div", "littleSquare", container);

        let formTitle2: HTMLElement = Utils.createCreate("p", "formTitle", littleSquare);
        formTitle2.innerHTML = "Ajouter des tâches";

        let taskLabel: HTMLLabelElement = document.createElement("label");
        taskLabel.innerHTML = "Nom de la tâche";
        taskLabel.htmlFor = "taskName";
        littleSquare.append(taskLabel);

        let taskInput: HTMLInputElement = document.createElement("input");
        taskInput.type = "text";
        taskInput.id = "taskName";
        littleSquare.append(taskInput);

        let confirmIcon: HTMLElement = Utils.createCreate("i", "far fa-check-circle", littleSquare);
        confirmIcon.title = "Confirmer";

        confirmIcon.addEventListener("click", ()=>{
            let taskLine = Utils.createCreate("p", "newTask", formAddTask)
            taskLine.innerHTML = taskInput.value;
            taskInput.value = "";
        });

        formAddTask = Utils.createCreate("div", "formAddTask", littleSquare);

        let buttonContainer = Utils.createCreate("div", "buttonContainer", littleSquare)

        let button: HTMLElement =  Utils.createCreate("div", "confirmAdd", buttonContainer);
        button.innerHTML = "Ajouter";

        let cancel: HTMLElement =  Utils.createCreate("div", "cancel", buttonContainer);
        cancel.innerHTML = "Annuler";

        cancel.addEventListener("click", ()=>{
            if (groupContainer) groupContainer.style.filter = "blur(0)";
            container.remove();
        })

        button.addEventListener("click", ()=>{
            if (formAddTask.children.length > 0) {
                let taskName: string[] = [];
                let elementOfTaskContainer: HTMLCollection = formAddTask.children;
                for (let i: number = 0; i < elementOfTaskContainer.length; i++) {
                    taskName.push(elementOfTaskContainer[i].innerHTML);
                    console.log("newTask: "+taskName)
                }
                console.log("JE DONNE TOUT: "+taskName)
                CreateGroup.addTask(taskName, clickedButton, 3)
                if (groupContainer) groupContainer.style.filter = "blur(0)";
                container.remove();
            }
            else {
                let errorMessage: HTMLElement = Utils.createCreate("p", "errorMessage", littleSquare);
                errorMessage.innerHTML = "Il n'y a aucune tâche à ajouter";
            }
        })
    }
}