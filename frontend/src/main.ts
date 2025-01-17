import 'htmx.org';
import 'hyperscript.org';
import * as _hyperscript from "hyperscript.org";
import hotkeys from "hotkeys-js";

_hyperscript.browserInit();

export const doing_something = () => {
    console.log("Hello world");
}

hotkeys.filter = function (event) {
    // @ts-ignore
    let tagName = event.target.tagName;
    hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
    return true;
}

// function isElementInViewport(el: HTMLElement) {
//     let rect = el.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
//     );
// }
//
//
// document.addEventListener('scroll', function (event) {
//     let topBar = document.getElementById('main-action-bar');
//     if (!isElementInViewport(topBar)) {
//         topBar.classList.add('fixed', 'top-0', 'z-100');
//     } else {
//         topBar.classList.remove('fixed', 'top-0', 'z-100');
//     }
// });

function focus_text_input(event) {
    let ss = document.getElementById('task-details-inp');
    if (ss !== null) {
        event.preventDefault()
        ss.focus();
    } else {
        document.getElementById('cmd-inp').focus();
    }
}

hotkeys('ctrl+shift+K', function (event, handler) {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault()
    focus_text_input(event);
    return false;
});

document.addEventListener('click', function (event) {
    let element = document.getElementsByTagName('html')[0];
    if (event.target !== element) {
        return;
    }
    focus_text_input(event);
})

document.addEventListener("DOMContentLoaded", function () {
    let n = setInterval(
        () => {
            let which_one = 1;
            let dd = document.getElementById('active-timer');
            if (dd === undefined || dd === null) {
                return
            }
            let s = dd.children[which_one].textContent.split(":");
            let second = parseInt(s.pop());
            let minute = parseInt(s.pop());
            if (isNaN(minute)) {
                minute = 0;
            }
            let hour = parseInt(s.pop());
            if (isNaN(hour)) {
                hour = 0;
            }
            second += 1;
            if (second >= 60) {
                second = 0;
                minute += 1;
                if (minute > 60) {
                    hour += 1;
                }
            }
            dd.children[which_one].textContent = hour.toString()
                    // @ts-ignore
                    .padStart(2, "0") + ":" +
                minute.toString()
                    // @ts-ignore
                    .padStart(2, "0") + ":" +
                second.toString()
                    // @ts-ignore
                    .padStart(2, "0");
        }, 1000
    )
    let day_progress = setInterval(
        () => {
            const dd = document.getElementById('time_of_the_day');
            if (dd === undefined || dd === null) {
                return
            }
            // <progress id="time_of_the_day" class="fill-amber-200 bg-blue-900 w-full shadow-inner shadow-blue-950" max="100" value=""></progress>
            const now = new Date();
            const total_minutes_passed = now.getMinutes() + (now.getHours() * 60);
            const total_minutes_in_day = 24 * 60;
            const hours_left = 24 - now.getHours();
            dd.style.width = total_minutes_passed * 100 / total_minutes_in_day + "%";
            dd.children[0].children[0].innerHTML =  hours_left + "h";
        }, 1000
    )
});