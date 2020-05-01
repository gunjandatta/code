import { edit } from "ace-builds";
import { Components } from "gd-sprest-bs";
import * as HTML from "./index.html";
import * as HTMLFlip from "./flip.html";

// Make the components available globally
window["Components"] = Components;

// Set the module url
window["ace"].config.setModuleUrl("ace/mode/javascript_worker", "./dist/worker-javascript.js");

// Main Method
window["CodeEditor"] = (el: HTMLElement, flip: boolean = false) => {
    // Render the html
    el.innerHTML = (flip ? HTMLFlip : HTML) as any;

    // Create the run button
    let btn = Components.Button({
        el: el.querySelector("#btnRun"),
        text: "Run",
        onClick: () => {
            let output = el.querySelector("#output");

            // Get the JS
            var code = editor.getValue();

            // Clear the output
            while (output.firstChild) { output.firstChild.remove(); }

            // Create the default element
            let app = document.createElement("div");
            app.id = "app";
            output.appendChild(app);

            // Make it global
            window["app"] = app;

            // Create the script element
            var elScript = document.createElement("script");
            elScript.innerHTML = code;
            output.appendChild(elScript);
        }
    });

    // Create the code editor
    var editor = edit("editor");
    editor.setOptions({
        enableBasicAutocompletion: true
    });
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    // Return the editor
    return editor;
}