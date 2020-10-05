import { resolvable } from "./promise";

export default async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.hidden = true;
    input.setAttribute('webkitdirectory', '');

    const { resolve, promise } = resolvable();
    input.addEventListener('change', (e) => {
        resolve(e.target['files']);
    });
    document.body.appendChild(input);
    input.click();

    promise.then(() => input.remove());

    return promise;
}