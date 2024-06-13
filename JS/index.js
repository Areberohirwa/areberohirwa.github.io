const input = document.querySelector('.review-input');
const button = document.querySelector('.add-button');
const reviewList = document.querySelector('#review-list');
const shareBtn = document.querySelector(".share-btn");
const shareInput = document.querySelector(".share-input");
let app = document.querySelector('#app');
let nav = document.querySelector(".second-nav");
window.addEventListener('scroll', function () {
    // Get the height of the viewport
    var viewportHeight = window.innerHeight;
    // Get the height of the document
    var documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    // Get the current scroll position
    var scrollPosition = window.scrollY;

    // Check if the document height is greater than or equal to the viewport height
    if (documentHeight >= viewportHeight && scrollPosition > 95) {
        // Add your desired HTML content after the threshold
        nav.innerHTML = `
        <div class="container-fluid">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler fs-3 fw-bold border border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContents" aria-controls="navbarSupportedContents"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i class="bi bi-list text-dark fw-bold bg-success text-white py-2 px-3 rounded"></i>
                </button>
                <div class="collapse navbar-collapse p-1" id="navbarSupportedContents">
                <ul class="navbar-nav mx-auto linking2 border-bottom border-3 border-danger p-2 rounded fixed-top mt-1 z-3 d-flex justify-content-around align-items-center flex-row flex-wrap">
                    <li class="nav-item me-1 mb-2 mb-lg-0">
                        <a class="text-decoration-none btn btn-outline-danger fw-bold" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item me-1 mb-2 mb-lg-0">
                        <a class="text-decoration-none btn btn-outline-warning fw-bold" aria-current="page" href="about.html">About Me</a>
                    </li>
                    <li class="nav-item me-1 mb-2 mb-lg-0">
                        <a class="text-decoration-none btn btn-outline-warning fw-bold" aria-current="page" href="skill.html">Skills</a>
                    </li>
                    <li class="nav-item me-1 mb-2 mb-lg-0">
                                <a class="text-decoration-none btn btn-outline-warning fw-bold" aria-current="page" href="project.html">
                                    Projects</a>
                     </li>
                </ul>
                    
                </div>
            </div>
        </nav>
    </div>
         `;

        // Append the navbar HTML content to the body
    } else {
        nav.innerHTML = '';
    }

    // Display the height of the viewport on the page
    // document.getElementById('heightDisplay').innerText = 'Viewport Height: ' + viewportHeight + 'px';
});

// copy link to share

const text = shareInput.value;
shareBtn.addEventListener("click", () => {
    shareInput.select();
    navigator.clipboard.writeText(text);
    shareInput.value = "Link Copied!!";
    setTimeout(() => {
        shareInput.value = text
    }, 5000);
});


let typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('<strong>WELCOME</strong>')
    .pauseFor(2500)
    .deleteAll()
    .typeString('<strong>PORTFOLIO</strong>')
    .pauseFor(2500)
    .deleteAll()
    .typeString('<strong>COLLABORATION</strong>')
    .pauseFor(2500)
    .start();


document.addEventListener('DOMContentLoaded', (event) => {

    input.addEventListener('input', () => {
        button.disabled = input.value.trim() === '';
    });

    button.addEventListener('click', () => {
        if (input.value.trim() !== '') {
            const li = document.createElement('li');
            li.className = 'list-group-item bg-black text-white py-1 fw-bold text-lowercase d-flex justify-content-between align-items-center flex-row';

            const divText = document.createElement('div');
            divText.className = 'align-self-center ms-1 me-auto';
            divText.textContent = input.value;

            const divIcons = document.createElement('div');
            divIcons.className = 'align-self-center d-flex justify-content-around align-items-center flex-row';

            const divDelete = document.createElement('div');
            divDelete.className = 'd-flex justify-content-between align-items-center flex-row align-self-stretch';
            const inputDelete = document.createElement('input');
            inputDelete.type = 'checkbox';
            inputDelete.className = 'btn-check';
            inputDelete.id = `danger-outlined-${Date.now()}`;
            const labelDelete = document.createElement('label');
            labelDelete.className = 'btn btn-outline-danger';
            labelDelete.htmlFor = inputDelete.id;
            labelDelete.innerHTML = '<i class="bi bi-trash-fill"></i>';
            labelDelete.addEventListener('click', () => {
                li.remove();
            });
            divDelete.appendChild(inputDelete);
            divDelete.appendChild(labelDelete);

            divIcons.appendChild(divDelete);

            li.appendChild(divText);
            li.appendChild(divIcons);

            reviewList.appendChild(li);

            input.value = '';
            button.disabled = true;
        }
    });
});

button.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const message = input.value;
    (async () => {
        const rawResponse = await fetch('/add-message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: message })
        });

        const content = await rawResponse.json();
        if (content.cheeseAdded) {
            alert('Message sent to Database to be checked.');
        } else {
            alert('There is something wrong with the adding of the message');
        }
    })();
});

fetch('/objects').then((res) => res.json()).then(
    (objects) => {
        for (let i = 0; i < objects.length; i++) {
            const htmlCode = createCard(objects[i]);
            reviewList.innerHTML += htmlCode;
        }
    }
);

function createCard(data) {
    const htmlCode = `
                     <li
                        class="list-group-item bg-black text-white py-1 fw-bold text-lowercase d-flex justify-content-between align-items-center flex-row">
                        <div class="align-self-center ms-1 me-auto">
                            ${data.message}
                        </div>
                    </li>
    `;
    return htmlCode;
}