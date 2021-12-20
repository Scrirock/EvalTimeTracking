// @ts-ignore
import {CreateInput} from "./CreateInput.ts";

let groupContainer: HTMLElement;
let fixHeightDiv: HTMLElement;

export class CreateGroup{

    static createCreate(element: string, className: string, appendTo: HTMLElement): HTMLElement {
        let htmlElement = document.createElement(element);
        htmlElement.className = className
        appendTo.append(htmlElement)

        return htmlElement;
    }

    static createGroupContainer() {
        groupContainer = this.createCreate("div", "groupContainer", document.body);
    }

    static createAddProject() {
        let addProjectDiv: HTMLElement = this.createCreate("div", "group", groupContainer);
        this.createCreate("i", "far fa-plus-square", addProjectDiv);

        let text: HTMLElement = this.createCreate("p", "addProjectParagraph", addProjectDiv);
        text.innerHTML = "Ajouter un projet";

        addProjectDiv.addEventListener("click", CreateInput.createProjectInput());
    }

    static addProject(title: string) {
        let addProjectDiv: HTMLElement = this.createCreate("div", "group", groupContainer);
        let headlineDiv: HTMLElement = this.createCreate("div", "headline", addProjectDiv);
        let eyeIcon: HTMLElement = this.createCreate("i", "far fa-eye", headlineDiv);
        eyeIcon.title = "Voir le projet en détail"

        let projectTitle: HTMLParagraphElement = document.createElement("p");
        projectTitle.innerHTML = title;
        headlineDiv.append(projectTitle);

        let trashIcon: HTMLElement = this.createCreate("i", "far fa-trash-alt", headlineDiv);
        trashIcon.title = "Supprimer le projet"
        let contentDiv: HTMLElement = this.createCreate("div", "content", addProjectDiv);
        let infoDiv: HTMLElement = this.createCreate("div", "info", contentDiv);

        let clockDiv: HTMLElement =  this.createCreate("div", "clockDivv", infoDiv);
        let clockIcon: HTMLElement = this.createCreate("i", "far fa-clock", clockDiv);
        clockIcon.title = "Temps total d'heures sur le projet"
        let clockTime: HTMLElement = this.createCreate("p", "time", clockDiv);
        clockTime.innerHTML = "0 heures"
        clockTime.dataset.type = "clock";

        let calendarDiv: HTMLElement =  this.createCreate("div", "calendarDiv", infoDiv);
        let calendarIcon: HTMLElement = this.createCreate("i", "far fa-calendar-alt", calendarDiv);
        calendarIcon.title = "Dernière modification"
        let calendarTime: HTMLElement =  this.createCreate("p", "time", calendarDiv);
        calendarTime.innerHTML = "il y a 0 heures"
        calendarTime.dataset.type = "calendar";

        let taskContainer: HTMLElement = this.createCreate("div", "taskContainer", contentDiv);
        fixHeightDiv = this.createCreate("div", "fixHeight", taskContainer);

        let addTaskButton: HTMLElement = this.createCreate("div", "addTask", taskContainer);
        addTaskButton.innerHTML = "Ajouter une tâche";
        addTaskButton.dataset.project = title;

        addTaskButton.addEventListener("click", CreateInput.createTaskInput)
    }

    static addTask(taskName: string) {
        let taskLine = this.createCreate("div", "taskLine", fixHeightDiv);

        let task = this.createCreate("p", "task", taskLine);
        task.innerHTML = taskName;

        let stopwatch: HTMLElement = this.createCreate("i", "fas fa-stopwatch", taskLine);
        stopwatch.dataset.task = taskName;
    }
}