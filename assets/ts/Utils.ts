import {CreateGroup} from "./CreateGroup";

export class Utils {

    static createCreate(element: string, className: string, appendTo: HTMLElement): HTMLElement {
        let htmlElement = document.createElement(element);
        htmlElement.className = className;
        appendTo.append(htmlElement);

        return htmlElement;
    }

    static saveProject(title: string, task: string[]) {
        localStorage.setItem(title, task.toString());
    }

    static searchProject() {
        if (localStorage !== null) {
            for (let i:number = 0; i < localStorage.length; i++) {
                let title: string = <string>localStorage.key(i);
                let task: string[] = localStorage[title].split(",");
                CreateGroup.addProject(title, task);
            }
        }
    }
}