import {CreateInput} from "./CreateInput";
import {Utils} from "./Utils";
import {IconClick} from "./IconClick";

let groupContainer: HTMLElement;

export class CreateGroup {

    static createGroupContainer(): void {
        groupContainer = Utils.createCreate("div", "groupContainer", document.body);
    }

    static createAddProject(): void {
        let addProjectDiv: HTMLElement = Utils.createCreate("div", "group", groupContainer);
        Utils.createCreate("i", "far fa-plus-square", addProjectDiv);

        let text: HTMLElement = Utils.createCreate("p", "addProjectParagraph", addProjectDiv);
        text.innerHTML = "Ajouter un projet";

        addProjectDiv.addEventListener("click", CreateInput.createProjectInput);
    }

    static addProject(title: string, task: string[] | null): void {
        let addProjectDiv: HTMLElement = Utils.createCreate("div", "group", groupContainer);
        let headlineDiv: HTMLElement = Utils.createCreate("div", "headline", addProjectDiv);
        let eyeIcon: HTMLElement = Utils.createCreate("i", "far fa-eye", headlineDiv);
        eyeIcon.title = "Voir le projet en détail";
        eyeIcon.dataset.project = title;
        IconClick.eyeIcon(eyeIcon);

        let projectTitle: HTMLElement = Utils.createCreate("p", "projectTitle", headlineDiv);
        projectTitle.innerHTML = title;

        let trashIcon: HTMLElement = Utils.createCreate("i", "far fa-trash-alt", headlineDiv);
        trashIcon.title = "Supprimer le projet";
        trashIcon.dataset.project = title;
        let contentDiv: HTMLElement = Utils.createCreate("div", "content", addProjectDiv);
        let infoDiv: HTMLElement = Utils.createCreate("div", "info", contentDiv);
        IconClick.deleteIcon(trashIcon);

        let clockDiv: HTMLElement =  Utils.createCreate("div", "clockDiv", infoDiv);
        let clockIcon: HTMLElement = Utils.createCreate("i", "far fa-clock", clockDiv);
        clockIcon.title = "Temps total d'heures sur le projet"
        let clockTime: HTMLElement = Utils.createCreate("p", "time", clockDiv);

        let totalHour: number = 0;
        for (let i: number = 0; i < JSON.parse(localStorage[title]).length; i++) {
            totalHour += JSON.parse(localStorage[title])[i].time;
        }
        clockTime.innerHTML = Utils.formatDuration(totalHour);
        clockTime.dataset.type = "clock";

        let calendarDiv: HTMLElement =  Utils.createCreate("div", "calendarDiv", infoDiv);
        let calendarIcon: HTMLElement = Utils.createCreate("i", "far fa-calendar-alt", calendarDiv);
        calendarIcon.title = "Dernière modification"
        let calendarTime: HTMLElement =  Utils.createCreate("p", "time", calendarDiv);
        calendarTime.innerHTML = "il y a 0 heures"
        calendarTime.dataset.type = "calendar";

        let taskContainer: HTMLElement = Utils.createCreate("div", "taskContainer", contentDiv);
        let fixHeight: HTMLElement = Utils.createCreate("div", "fixHeight", taskContainer);
        fixHeight.dataset.project = title;

        let addTaskButton: HTMLElement = Utils.createCreate("div", "addTask", taskContainer);
        addTaskButton.innerHTML = "Ajouter une tâche";
        addTaskButton.dataset.project = title;

        addTaskButton.addEventListener("click", ()=>{
            CreateInput.createTaskInput(addTaskButton)
        });

        if (task !== null) {
            this.addTask(task, addTaskButton);
        }
    }

    static addTask(taskName: string[], clickedButton: HTMLElement): void {
        let allFixHeight: NodeListOf<HTMLElement> = document.querySelectorAll(".fixHeight");
        let oldTask = document.querySelectorAll(".task");
        let taskArray: string[] = [];
        let timeTest:number[] = [];

        for (let i: number = 0; i < allFixHeight.length; i++) {
            if (allFixHeight[i].dataset.project === clickedButton.dataset.project) {
                for (let ii:number = 0; ii < taskName.length; ii++){
                    let taskLine = Utils.createCreate("div", "taskLine", allFixHeight[i]);

                    let task = Utils.createCreate("p", "task", taskLine);
                    task.innerHTML = taskName[ii];

                    if (localStorage !== null && localStorage.length > allFixHeight.length-1){
                        for (let i: number = 0; i < JSON.parse(localStorage[<string>clickedButton.dataset.project]).length; i++) {
                            let json = JSON.parse(localStorage[<string>clickedButton.dataset.project])[i];
                            if (json.name === taskName[ii]) {
                                timeTest.push(json.time);
                            }
                            else {
                                for (let b: number = 0; b < oldTask.length; b++) {
                                    if (json.name === oldTask[b].innerHTML) {
                                        timeTest.push(json.time);
                                    }
                                }
                            }
                        }
                    }

                    let stopwatch: HTMLElement = Utils.createCreate("i", "fas fa-stopwatch", taskLine);
                    stopwatch.dataset.task = taskName[ii];
                    Utils.stopwatchClick(stopwatch);

                    if (allFixHeight[i].children && allFixHeight[i].children.length >= taskName.length) {
                        for (let j: number = 0; j < allFixHeight[i].children.length; j++) {
                            timeTest.length > j ? true : timeTest.push(0);
                            if (allFixHeight[i].children[j].children[0].tagName === "P") {
                                let now = new Date();
                                taskArray.push(JSON.parse(`{
                                    "name": "${allFixHeight[i].children[j].children[0].innerHTML}",
                                    "time": ${timeTest[j]},
                                    "lastInteraction" : "${now.getDate()} / ${now.getMonth()+1} / ${now.getFullYear()}"  
                                }`));

                            }
                        }
                    }
                }
            }
        }
        Utils.saveProject(<string>clickedButton.dataset.project, taskArray);
    }
}