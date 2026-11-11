(() => {
  const v2 = document.getElementById("confirm-v2");
  const controls = document.getElementById("install-controls");
  const note = document.getElementById("install-gate-note");
  if (!v2 || !controls || !note) return;
  function update() {
    controls.hidden = !v2.checked;
    note.hidden = v2.checked;
  }
  v2.addEventListener("change", update);
  update();
})();
