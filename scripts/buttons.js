document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("mousedown", function () {
        btn.classList.add("pressed");
    });
    btn.addEventListener("mouseup", function () {
        btn.classList.remove("pressed");
    });
});

document.addEventListener('mouseup', function () {
    document.querySelectorAll(".btn.pressed").forEach(function (btn) {
        btn.classList.remove("pressed");
    });
})

