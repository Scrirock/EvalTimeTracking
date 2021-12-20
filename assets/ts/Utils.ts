export class Utils {

    static createCreate(element: string, className: string, appendTo: HTMLElement): HTMLElement {
        let htmlElement = document.createElement(element);
        htmlElement.className = className
        appendTo.append(htmlElement)

        return htmlElement;
    }
}