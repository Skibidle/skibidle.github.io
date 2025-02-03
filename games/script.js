const cu = document.createElement("iframe");
cu.src = "https://test123.waesesesesef.repl.co";
cu.classList.add("counter-frame");
document.body.appendChild(cu);

window.onmessage = function (e) {
  if (e.origin == "https://test123.waesesesesef.repl.co") {
    document.getElementById("user-count").innerText = e.data;
  }
};

if (localStorage.getItem("plink") === null) {
  console.log("null");
  localStorage.setItem("plink", "*WEBSITE*");
}

if (localStorage.getItem("plink") == "https://test123.waesesesesef.repl.co") {
  localStorage.setItem("plink", "*WEBSITE*");
}