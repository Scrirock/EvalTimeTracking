import {ChangePage} from "./ChangePage";
import {Utils} from "./Utils";

export class IconClick {

    static deleteIcon(element: HTMLElement): void {
        element.addEventListener("click", ()=>{
            let container: HTMLElement = <HTMLElement>element.parentElement;
            if (container) {
                container = <HTMLElement>container.parentElement
            }
            if (container) {
                localStorage.removeItem(<string>element.dataset.project)
                container.remove()
            }
        })
    }

    static eyeIcon(element: HTMLElement): void {
        element.addEventListener("click", ()=>{
            ChangePage.detailedProject(<string>element.nextElementSibling?.nextElementSibling?.innerHTML)
        })
    }

    static deleteTaskIcon(element: HTMLElement) {
        element.addEventListener("click", ()=>{
            element.parentElement?.parentElement?.remove();
            this.reloadSave();
        })
    }

    static editTaskIcon(element: HTMLElement) {
        element.addEventListener("click", ()=>{
            let task: HTMLElement = <HTMLElement>element.parentElement?.previousElementSibling
                                                ?.previousElementSibling
                                                ?.previousElementSibling;



            let input: HTMLInputElement = document.createElement("input");
            input.className = "editInput"
            input.value = task.innerHTML;
            task.parentElement?.prepend(input);
            task.style.display = "none";

            input.addEventListener("keyup", (e)=>{
                if (e.key === "Enter") {
                    task.innerHTML = input.value;
                    task.style.display = "initial";
                    input.remove();
                    this.reloadSave();
                }
            })
        });
    }

    static reloadSave(){
        let taskName = document.querySelectorAll(".taskName");
        let taskArray: string[] = [];
        for (let i: number = 0; i < taskName.length; i++) {
            taskArray.push(taskName[i].innerHTML);
        }

        let taskTime = document.querySelectorAll(".timeSave");
        let timeArray: string[] = [];
        for (let i: number = 0; i < taskTime.length; i++) {
            timeArray.push(taskTime[i].innerHTML.substring(0, taskTime[i].innerHTML.length - 1));
        }
        console.log(taskArray.length)
        console.log(timeArray.length)

        let saveArray: string[] = [];
        for (let i: number = 0; i < taskArray.length; i++) {
            saveArray.push(JSON.parse(`{
                                    "name": "${taskArray[i]}",
                                     "time": ${timeArray[i]} 
                                    }`));
        }

        Utils.saveProject(<string>document.querySelector(".projectTitle")?.innerHTML, saveArray);
    }
}