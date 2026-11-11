(() => {
  const v2 = document.getElementById("confirm-v2");
  const backup = document.getElementById("confirm-backup");
  const controls = document.getElementById("install-controls");
  const note = document.getElementById("install-gate-note");
  if (!v2 || !backup || !controls || !note) return;
  function update() {
    const unlocked = v2.checked && backup.checked;
    controls.hidden = !unlocked;
    note.textContent = unlocked ? "Confirm your USB port when prompted." : "Confirm both boxes to activate the USB installer.";
  }
  v2.addEventListener("change", update);
  backup.addEventListener("change", update);
  update();
})();
