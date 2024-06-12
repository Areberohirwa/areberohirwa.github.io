// let nav = document.querySelector(".second-nav");
// window.addEventListener('scroll', function () {
//     var viewportHeight = window.innerHeight;

//     var documentHeight = Math.max(
//         document.body.scrollHeight, document.documentElement.scrollHeight,
//         document.body.offsetHeight, document.documentElement.offsetHeight,
//         document.body.clientHeight, document.documentElement.clientHeight
//     );
//     var scrollPosition = window.scrollY;

//     if (documentHeight >= viewportHeight && scrollPosition > 95) {
//         nav.innerHTML = `
//         <div class="container-fluid">
//         <nav class="navbar navbar-expand-lg">
//             <div class="container-fluid">
//                 <button class="navbar-toggler fs-3 fw-bold border border-0" type="button" data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContents" aria-controls="navbarSupportedContents"
//                     aria-expanded="false" aria-label="Toggle navigation">
//                     <i class="bi bi-list text-dark fw-bold bg-success text-white py-2 px-3 rounded"></i>
//                 </button>
//                 <div class="collapse navbar-collapse p-1" id="navbarSupportedContents">
//                 <ul class="navbar-nav mx-auto linking2 border-bottom border-3 border-danger p-2 rounded fixed-top mt-1 z-3 d-flex justify-content-around align-items-center flex-row flex-wrap">
//                     <li class="nav-item me-1 mb-2 mb-lg-0">
//                         <a class="text-decoration-none btn btn-outline-warning fw-bold" aria-current="page" href="../index.html">Home</a>
//                     </li>
//                     <li class="nav-item me-1 mb-2 mb-lg-0">
//                         <a class="text-decoration-none btn btn-outline-warning fw-bold" aria-current="page" href="#">About Me</a>
//                     </li>
//                     <li class="nav-item me-1 mb-2 mb-lg-0">
//                         <a class="text-decoration-none btn btn-outline-warning fw-bold" aria-current="page" href="skill.html">Skills</a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="text-decoration-none btn btn-outline-danger fw-bold" href="project.html">
//                             Projects
//                         </a>
//                     </li>
//                 </ul>
                    
//                 </div>
//             </div>
//         </nav>
//     </div>
//          `;
//     } else {
//         nav.innerHTML = '';
//     }
// });

// copy link to share

const shareBtn = document.querySelector(".share-btn");
const shareInput = document.querySelector(".share-input");
const text = shareInput.value;
shareBtn.addEventListener("click", () => {
    shareInput.select();
    navigator.clipboard.writeText(text);
    shareInput.value = "Link Copied!!";
    setTimeout(() => {
        shareInput.value = text
    }, 5000);
}); 