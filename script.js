let progress = 0;
let timeLeft = 1200;

const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");

function playSuccess() {
    successSound.currentTime = 0;
    successSound.play();
}

function playError() {
    errorSound.currentTime = 0;
    errorSound.play();
}

function updateProgress() {
    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressBar").textContent = progress + "%";
}

function unlock(id) {
    document.getElementById(id).classList.remove("locked");
}

function showMessage(id, text, success) {
    const el = document.getElementById(id);

    el.textContent = text;

    if (success) {
        el.className = "message success";
    } else {
        el.className = "message error";
    }
}

/* HÁDANKA 1 */

function checkQuiz() {

    const answer =
        document.getElementById("quizAnswer").value;

    if (answer === "Louis Armstrong") {

        playSuccess();

        showMessage(
            "quizMessage",
            "Správně! Louis Armstrong je považován za krále jazzu.",
            true
        );

        progress = 25;
        updateProgress();

        unlock("puzzle2");

    } else {

        playError();

        showMessage(
            "quizMessage",
            "Nesprávná odpověď.",
            false
        );
    }
}

/* HÁDANKA 2 */

function checkMatching() {

    const jazz =
        document.getElementById("jazzInput")
        .value.toLowerCase();

    const swing =
        document.getElementById("swingInput")
        .value.toLowerCase();

    const improv =
        document.getElementById("improvInput")
        .value.toLowerCase();

    const okJazz =
        jazz.includes("žánr") ||
        jazz.includes("hudeb");

    const okSwing =
        swing.includes("rytm") ||
        swing.includes("tan");

    const okImprov =
        improv.includes("spont") ||
        improv.includes("okamž");

    if(okJazz && okSwing && okImprov){

        playSuccess();

        showMessage(
            "matchMessage",
            "Výborně!",
            true
        );

        progress = 50;
        updateProgress();

        unlock("puzzle3");

    } else {

        playError();

        showMessage(
            "matchMessage",
            "Zkus významy upřesnit.",
            false
        );
    }
}

/* HÁDANKA 3 */

function checkCipher(){

    const answer =
        document.getElementById("cipherInput")
        .value
        .trim()
        .toUpperCase();

    if(answer === "JAZZ"){

        playSuccess();

        showMessage(
            "cipherMessage",
            "Správně!",
            true
        );

        progress = 75;
        updateProgress();

        unlock("puzzle4");

    }else{

        playError();

        showMessage(
            "cipherMessage",
            "To není správné slovo.",
            false
        );
    }
}

/* HÁDANKA 4 */

function checkTimeline(){

    const answer =
        document.getElementById("timelineInput")
        .value
        .trim();

    if(answer === "1-3-2"){

        playSuccess();

        showMessage(
            "timelineMessage",
            "Časová osa je správně.",
            true
        );

        progress = 100;
        updateProgress();

        unlock("finalPuzzle");

    }else{

        playError();

        showMessage(
            "timelineMessage",
            "Pořadí není správné.",
            false
        );
    }
}

/* FINÁLE */

function checkFinalCode(){

    const code =
        document.getElementById("finalCodeInput")
        .value;

    if(code === "1927"){

        playSuccess();

        document
            .getElementById("doorContainer")
            .classList
            .remove("hidden");

        document.getElementById(
            "finalMessage"
        ).innerHTML =
            "🎉 Gratulujeme! Úspěšně jste unikli z jazzového klubu roku 1927.";

        document.getElementById(
            "finalMessage"
        ).className =
            "message success";

    }else{

        playError();

        showMessage(
            "finalMessage",
            "Špatný kód.",
            false
        );
    }
}

/* ČASOVAČ */

const timer = setInterval(() => {

    timeLeft--;

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById("time")
        .textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2,"0")}`;

    if(timeLeft <= 0){

        clearInterval(timer);

        alert(
            "Vypršel čas! Jazzový klub zůstává uzamčen."
        );

        location.reload();
    }

},1000);

/* NÁPOVĚDA */

document
.getElementById("hintBtn")
.addEventListener("click", () => {

    alert(`
Nápověda:

1. Král jazzu je slavný trumpetista.
2. Swing souvisí s rytmem a tancem.
3. Přeskládej písmena na známý hudební styl.
4. Nejdříve vznikl jazz, potom Jazz Age a nakonec swing.
`);
});