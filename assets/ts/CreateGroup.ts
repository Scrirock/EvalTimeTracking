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

    static getProject(): void {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const data: any[] = JSON.parse(xhr.responseText);
            let projectArray: string[] = [];

            data.forEach(data => {
                let projectName: string = data.projectName;

                if (!projectArray.includes(projectName)) {
                    projectArray.push(projectName);

                    let addProjectDiv: HTMLElement = Utils.createCreate("div", "group", groupContainer);
                    let headlineDiv: HTMLElement = Utils.createCreate("div", "headline", addProjectDiv);
                    let eyeIcon: HTMLElement = Utils.createCreate("i", "far fa-eye", headlineDiv);
                    eyeIcon.title = "Voir le projet en détail";
                    eyeIcon.dataset.project = projectName;
                    IconClick.eyeIcon(eyeIcon);

                    let projectTitle: HTMLElement = Utils.createCreate("p", "projectTitle", headlineDiv);
                    projectTitle.innerHTML = projectName;

                    let trashIcon: HTMLElement = Utils.createCreate("i", "far fa-trash-alt", headlineDiv);
                    trashIcon.title = "Supprimer le projet";
                    trashIcon.dataset.project = projectName;
                    let contentDiv: HTMLElement = Utils.createCreate("div", "content", addProjectDiv);
                    let infoDiv: HTMLElement = Utils.createCreate("div", "info", contentDiv);
                    IconClick.deleteIcon(trashIcon);

                    let clockDiv: HTMLElement =  Utils.createCreate("div", "clockDiv", infoDiv);
                    let clockIcon: HTMLElement = Utils.createCreate("i", "far fa-clock", clockDiv);
                    clockIcon.title = "Temps total d'heures sur le projet"
                    let clockTime: HTMLElement = Utils.createCreate("p", "time", clockDiv);

                    let totalHour: number = 0;

                    let xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        const data: any[] = JSON.parse(xhr.responseText);
                        data.forEach(data => {
                            if (data.projectName === projectName) {
                                totalHour += parseInt(data.time);
                            }
                            clockTime.innerHTML = Utils.formatDuration(totalHour);
                        });
                    };

                    xhr.open('GET', '../../api/taskAPI.php?get=task');
                    xhr.send();

                    clockTime.dataset.type = "clock";

                    let calendarDiv: HTMLElement =  Utils.createCreate("div", "calendarDiv", infoDiv);
                    let calendarIcon: HTMLElement = Utils.createCreate("i", "far fa-calendar-alt", calendarDiv);
                    calendarIcon.title = "Dernière modification"
                    let calendarTime: HTMLElement =  Utils.createCreate("p", "time", calendarDiv);
                    calendarTime.innerHTML = "il y a 0 heures"
                    calendarTime.dataset.type = "calendar";

                    let taskContainer: HTMLElement = Utils.createCreate("div", "taskContainer", contentDiv);
                    let fixHeight: HTMLElement = Utils.createCreate("div", "fixHeight", taskContainer);
                    fixHeight.dataset.project = projectName;

                    let addTaskButton: HTMLElement = Utils.createCreate("div", "addTask", taskContainer);
                    addTaskButton.innerHTML = "Ajouter une tâche";
                    addTaskButton.dataset.project = data.projectId;

                    addTaskButton.addEventListener("click", ()=>{
                        CreateInput.createTaskInput(addTaskButton)
                    });
                }
            });
            CreateGroup.getTask();
        };

        xhr.open('GET', '../../api/taskAPI.php?get=project');
        xhr.send();
    }

    static getTask(): void {

        let allFixHeight: NodeListOf<HTMLElement> = document.querySelectorAll(".fixHeight");
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const data: any[] = JSON.parse(xhr.responseText);

            data.forEach(data => {
                for (let i: number = 0; i < allFixHeight.length; i++) {
                    if (allFixHeight[i].dataset.project === data.projectName) {
                        let taskLine = Utils.createCreate("div", "taskLine", allFixHeight[i]);

                        let task = Utils.createCreate("p", "task", taskLine);
                        task.innerHTML = data.taskName;

                        let stopwatch: HTMLElement = Utils.createCreate("i", "fas fa-stopwatch", taskLine);
                        stopwatch.dataset.task = data.taskName;
                        Utils.stopwatchClick(stopwatch);
                    }
                }
            });
        };

        xhr.open('GET', '../../api/taskAPI.php?get=task');
        xhr.send();
    }
}