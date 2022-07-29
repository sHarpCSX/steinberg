/* //Variables
const main = document.querySelector("main");
const header = document.querySelector("header");
const headerContainer = document.getElementById("header-container");
const loader = document.querySelector(".loader-wrapper");

// functions
async function start() {
  loader.style.display = "block";
  setTimeout(() => {
    main.style.display = "block";
    header.style.display = "none";
    loader.style.display = "none";
  }, 9000);
}

//Listeners
headerContainer.addEventListener("click", start);
 */
