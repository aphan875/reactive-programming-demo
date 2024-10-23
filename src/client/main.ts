import {fromEvent, map, tap, merge, shareReplay} from "rxjs";

const form = document.getElementById("form")!;
const userMessages$ = fromEvent<FormDataEvent>(form, 'submit');

userMessages$.pipe(
    tap((e: FormDataEvent) => {
        e.preventDefault();
    }),
    map((e: FormDataEvent): Message => {
        const messageInput: HTMLInputElement = ((e.currentTarget as HTMLFormElement).querySelector('input[name="message"]')!);
        const message = messageInput.value;
        messageInput.value = ""; /*Note: this is a side-effect!*/
        return {data: message, action: "sent", timestamp: new Date()};
    })
).subscribe(message => {
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <div>
            <p class="message-text">${message.data}</p>
            <p class="message-date">${message.action} ${new Date(message.timestamp).toLocaleString()}</p>
        </div>
    `;
    newMessage.classList.add(message.action);
    document.getElementById("messages")!.appendChild(newMessage);
});