import {CreateInput} from "./CreateInput";
import {Utils} from "./Utils";
import {IconClick} from "./IconClick";

let groupContainer: HTMLElement;
let fixHeightDiv: HTMLElement;

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
        eyeIcon.title = "Voir le projet en détail"

        let projectTitle: HTMLElement = Utils.createCreate("p", "projectTitle", headlineDiv)
        projectTitle.innerHTML = title;

        let trashIcon: HTMLElement = Utils.createCreate("i", "far fa-trash-alt", headlineDiv);
        trashIcon.title = "Supprimer le projet"
        let contentDiv: HTMLElement = Utils.createCreate("div", "content", addProjectDiv);
        let infoDiv: HTMLElement = Utils.createCreate("div", "info", contentDiv);
        IconClick.deleteIcon(trashIcon);

        let clockDiv: HTMLElement =  Utils.createCreate("div", "clockDivv", infoDiv);
        let clockIcon: HTMLElement = Utils.createCreate("i", "far fa-clock", clockDiv);
        clockIcon.title = "Temps total d'heures sur le projet"
        let clockTime: HTMLElement = Utils.createCreate("p", "time", clockDiv);
        clockTime.innerHTML = "0 heures"
        clockTime.dataset.type = "clock";

        let calendarDiv: HTMLElement =  Utils.createCreate("div", "calendarDiv", infoDiv);
        let calendarIcon: HTMLElement = Utils.createCreate("i", "far fa-calendar-alt", calendarDiv);
        calendarIcon.title = "Dernière modification"
        let calendarTime: HTMLElement =  Utils.createCreate("p", "time", calendarDiv);
        calendarTime.innerHTML = "il y a 0 heures"
        calendarTime.dataset.type = "calendar";

        let taskContainer: HTMLElement = Utils.createCreate("div", "taskContainer", contentDiv);
        fixHeightDiv = Utils.createCreate("div", "fixHeight", taskContainer);

        let addTaskButton: HTMLElement = Utils.createCreate("div", "addTask", taskContainer);
        addTaskButton.innerHTML = "Ajouter une tâche";
        addTaskButton.dataset.project = title;

        addTaskButton.addEventListener("click", CreateInput.createTaskInput)

        if (task !== null) {
            for (let i: number = 0; i < task.length; i++) {
                this.addTask(task[i]);
            }
        }
    }

    static addTask(taskName: string): void {
        let taskLine = Utils.createCreate("div", "taskLine", fixHeightDiv);

        let task = Utils.createCreate("p", "task", taskLine);
        task.innerHTML = taskName;

        let stopwatch: HTMLElement = Utils.createCreate("i", "fas fa-stopwatch", taskLine);
        stopwatch.dataset.task = taskName;
    }
}