(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const people = JSON.parse($("demoData").textContent);
  const byId = new Map(people.map((person) => [person.id, person]));
  const statusLabels = { invited: "Challenge sent", accepted: "Accepted", delivered: "Device received", recorded: "Result recorded" };
  const params = new URLSearchParams(window.location.search);
  let selectedId = byId.has(params.get("person")) ? params.get("person") : people[0].id;
  let activeView = ["forest", "tree", "path"].includes(params.get("view")) ? params.get("view") : "forest";

  function parentOf(person) {
    if (person.invitedBy && byId.has(person.invitedBy)) return person.invitedBy;
    if (person.giftFrom && byId.has(person.giftFrom)) return person.giftFrom;
    return null;
  }
  const children = new Map(people.map((person) => [person.id, []]));
  people.forEach((person) => {
    const parent = parentOf(person);
    if (parent && parent !== person.id) children.get(parent).push(person);
  });
  const roots = people.filter((person) => parentOf(person) === null);
  const countryCount = new Set(people.map((person) => person.country)).size;
  const giftedCount = people.filter((person) => person.giftFrom).length;

  function ancestry(id) {
    const result = [];
    const seen = new Set();
    let current = byId.get(id);
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      result.unshift(current);
      current = byId.get(parentOf(current));
    }
    return result;
  }
  function rootFor(id) {
    const path = ancestry(id);
    return path.length ? path[0].id : roots[0].id;
  }
  function descendants(id, seen = new Set()) {
    if (seen.has(id)) return 0;
    seen.add(id);
    let total = 0;
    for (const child of children.get(id) || []) total += 1 + descendants(child.id, seen);
    return total;
  }
  function el(tag, className, content) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (content !== undefined && content !== null) item.textContent = String(content);
    return item;
  }
  function svgEl(tag, attrs = {}, value) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([name, val]) => node.setAttribute(name, String(val)));
    if (value !== undefined) node.textContent = String(value);
    return node;
  }
  function updateAddress() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("view", activeView);
      url.searchParams.set("person", selectedId);
      window.history.replaceState(null, "", url);
    } catch (_) { /* Local previews may not allow history updates. */ }
  }
  function selectPerson(id, view) {
    if (!byId.has(id)) return;
    selectedId = id;
    $("personSelect").value = id;
    $("treeRoot").value = rootFor(id);
    if (view) activeView = view;
    render();
  }
  function renderStats() {
    $("statShooters").textContent = String(people.length);
    $("statTrees").textContent = String(roots.length);
    $("statCountries").textContent = String(countryCount);
    $("statGifts").textContent = String(giftedCount);
    const peopleSelect = $("personSelect");
    const rootSelect = $("treeRoot");
    people.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach((person) => {
      const opt = document.createElement("option");
      opt.value = person.id;
      opt.textContent = person.name + " · " + person.country;
      peopleSelect.append(opt);
    });
    roots.forEach((person) => {
      const opt = document.createElement("option");
      opt.value = person.id;
      opt.textContent = person.name + "'s tree";
      rootSelect.append(opt);
    });
  }
  function miniTree() {
    const art = svgEl("svg", { viewBox: "0 0 240 94", "aria-hidden": "true", class: "forest-mini" });
    const branch = svgEl("path", {
      d: "M120 15V35Q120 43 104 43H61Q47 43 47 53V67 M120 35Q120 43 136 43H179Q193 43 193 53V67 M47 67V78 M193 67V78",
      fill: "none", stroke: "#b5e3b5", "stroke-width": "2.6", "stroke-linecap": "round"
    });
    art.append(branch);
    [[120, 13, 9, "#ffd38e"], [47, 68, 8, "#b9ebc0"], [193, 68, 8, "#b9ebc0"],
      [47, 85, 5, "#8dcfb0"], [193, 85, 5, "#8dcfb0"]].forEach(([cx, cy, r, fill]) =>
      art.append(svgEl("circle", { cx, cy, r, fill, stroke: "#18392f", "stroke-width": "2" }))
    );
    return art;
  }
  function renderForest() {
    const query = $("searchInput").value.trim().toLocaleLowerCase();
    const grid = $("forestGrid");
    grid.replaceChildren();
    const matches = roots.filter((root) => {
      const members = people.filter((person) => rootFor(person.id) === root.id);
      return !query || members.some((person) =>
        (person.name + " " + person.country).toLocaleLowerCase().includes(query));
    }).sort((a, b) => descendants(b.id) - descendants(a.id));
    for (const root of matches) {
      const card = el("button", "forest-tile");
      card.type = "button";
      const topline = el("div", "forest-topline");
      topline.append(el("span", "", "INDEPENDENT START"), el("span", "", "●"));
      card.append(topline, miniTree(), el("strong", "", root.name + "'s Tree"));
      card.append(el("span", "forest-meta", root.country + " · " + (descendants(root.id) + 1) + " shooters"));
      card.append(el("span", "forest-visit", "Explore this tree →"));
      card.addEventListener("click", () => selectPerson(root.id, "tree"));
      grid.append(card);
    }
    if (!matches.length) grid.append(el("p", "forest-empty", "No demo trees match that search. Try a different name or country."));
  }
  function drawTree() {
    const root = byId.get(rootFor(selectedId));
    const svg = $("treeSvg");
    svg.replaceChildren();
    $("treeTitle").textContent = root.name + "'s challenge tree";
    $("treeCount").textContent = (descendants(root.id) + 1) + " connected shooters in this example";
    $("treeRoot").value = root.id;

    const visible = new Map();
    const maxDepth = 3;
    let nodeCount = 0;
    function collect(person, depth) {
      nodeCount += 1;
      if (depth >= maxDepth || nodeCount >= 90) { visible.set(person.id, []); return; }
      const next = (children.get(person.id) || []).slice(0, 7);
      visible.set(person.id, next);
      next.forEach((child) => collect(child, depth + 1));
    }
    collect(root, 0);

    const coords = new Map();
    let leaf = 0;
    function position(person, depth) {
      const kids = visible.get(person.id) || [];
      let x;
      if (!kids.length) { x = 122 + 198 * leaf; leaf += 1; }
      else {
        kids.forEach((child) => position(child, depth + 1));
        x = (coords.get(kids[0].id).x + coords.get(kids[kids.length - 1].id).x) / 2;
      }
      coords.set(person.id, { x, y: 76 + depth * 144 });
    }
    position(root, 0);
    const width = Math.max(660, 245 + 198 * (leaf - 1));
    const height = Math.max(285, ...Array.from(coords.values()).map(({y}) => y + 78));
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.style.width = width + "px";

    for (const [id, kids] of visible) {
      for (const child of kids) {
        const a = coords.get(id);
        const b = coords.get(child.id);
        const warm = child.giftFrom === id;
        const path = svgEl("path", {
          d: "M" + a.x + " " + (a.y + 44) + " C" + a.x + " " + (a.y + 97) +
             " " + b.x + " " + (b.y - 93) + " " + b.x + " " + (b.y - 44),
          fill: "none",
          stroke: warm ? "#ffc47b" : "#8accf1",
          "stroke-width": "3.3", "stroke-dasharray": warm ? "none" : "7 5",
          "stroke-linecap": "round"
        });
        svg.append(path);
      }
    }
    for (const [id, xy] of coords) {
      const person = byId.get(id);
      const selected = id === selectedId;
      const g = svgEl("g", { tabindex: "0", role: "button", "aria-label": person.name + ", " + person.country + ". Select participant.", style: "cursor:pointer" });
      g.append(svgEl("title", {}, person.name + " · " + person.country));
      g.append(svgEl("rect", { x: xy.x - 84, y: xy.y - 44, width: "168", height: "89", rx: "13",
        fill: selected ? "#254a3d" : "#16313b", stroke: selected ? "#ffca85" : "#52796d",
        "stroke-width": selected ? "3" : "1.6" }));
      g.append(svgEl("circle", { cx: xy.x - 61, cy: xy.y - 15, r: "15",
        fill: id === root.id ? "#b6e59b" : "#39685b", stroke: "#8fd1b7", "stroke-width": "1.5" }));
      g.append(svgEl("text", { x: xy.x - 61, y: xy.y - 10, fill: "#0a2025", "font-size": "12", "font-weight": "900", "text-anchor": "middle" },
        person.name.charAt(0).toUpperCase()));
      const name = person.name.length > 14 ? person.name.slice(0, 12) + "…" : person.name;
      g.append(svgEl("text", { x: xy.x - 39, y: xy.y - 12, fill: "#f4faf7", "font-size": "15", "font-weight": "750" }, name));
      g.append(svgEl("text", { x: xy.x - 70, y: xy.y + 15, fill: "#b1cbd0", "font-size": "11.5" },
        person.country.length > 21 ? person.country.slice(0, 19) + "…" : person.country));
      const note = person.score ? "Score " + person.score : statusLabels[person.status] || "Participant";
      g.append(svgEl("text", { x: xy.x - 70, y: xy.y + 32, fill: person.score ? "#ffcb86" : "#a4dfbf", "font-size": "11", "font-weight": "650" }, note));
      g.addEventListener("click", () => selectPerson(person.id, "tree"));
      g.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectPerson(person.id, "tree"); }
      });
      svg.append(g);
    }
    renderPersonPanel();
    const focus = coords.get(selectedId);
    if (focus) {
      const scroll = svg.parentElement;
      scroll.scrollLeft = Math.max(0, focus.x - scroll.clientWidth / 2);
    }
  }
  function renderPersonPanel() {
    const person = byId.get(selectedId);
    const panel = $("personPanel");
    panel.replaceChildren(el("div", "person-avatar", person.name.charAt(0).toUpperCase()),
      el("h3", "", person.name), el("p", "person-place", person.country));
    const dl = el("dl");
    function detail(label, value) {
      const row = el("div");
      row.append(el("dt", "", label), el("dd", "", value));
      dl.append(row);
    }
    detail("Challenge status", statusLabels[person.status] || "Joined");
    detail("Invited by", person.invitedBy && byId.has(person.invitedBy) ? byId.get(person.invitedBy).name : "Independent start");
    detail("Reported gift from", person.giftFrom && byId.has(person.giftFrom) ? byId.get(person.giftFrom).name : "Not reported");
    detail("Score", person.score || "No result recorded");
    detail("People in their branch", String(descendants(person.id)));
    panel.append(dl);
    const button = el("button", "challenge-soft-btn", "Follow this person's path");
    button.type = "button";
    button.addEventListener("click", () => { activeView = "path"; render(); });
    panel.append(button);
  }
  function renderPath() {
    const person = byId.get(selectedId);
    const trail = $("pathTrail");
    trail.replaceChildren();
    const path = ancestry(person.id);
    path.forEach((member, i) => {
      if (i) {
        const previous = path[i - 1];
        const given = member.giftFrom === previous.id;
        const join = el("div", "path-connector" + (given ? "" : " invite"), given ? "GIFT →" : "INVITE →");
        trail.append(join);
      }
      const card = el("div", "path-card" + (member.id === person.id ? " current" : ""));
      card.append(el("span", "path-index", i === 0 ? "TREE ORIGIN" : "GENERATION " + (i + 1)));
      card.append(el("strong", "", member.name), el("small", "", member.country));
      if (member.score) card.append(el("small", "", "Score: " + member.score));
      trail.append(card);
    });
    const summary = $("pathSummary");
    summary.replaceChildren(el("h3", "", person.name + "'s story"));
    const note = person.giftFrom && byId.has(person.giftFrom)
      ? "Device gifted by " + byId.get(person.giftFrom).name + ". "
      : "No device gift reported. ";
    summary.append(el("p", "", "Generation " + path.length + " of " + path[0].name +
      "'s tree. " + note + "Direct descendants: " + descendants(person.id) + "."));
    summary.append(el("p", "", "Click a person below to follow another path:"));
    const list = el("div", "path-descendants");
    const direct = children.get(person.id) || [];
    if (!direct.length) list.append(el("span", "small", "No next participant in this example yet."));
    direct.forEach((child) => {
      const button = el("button", "", child.name);
      button.type = "button";
      button.addEventListener("click", () => selectPerson(child.id, "path"));
      list.append(button);
    });
    summary.append(list);
  }
  function render() {
    for (const tab of document.querySelectorAll("[data-view]")) {
      const current = tab.dataset.view === activeView;
      tab.setAttribute("aria-selected", current ? "true" : "false");
      $(tab.dataset.view + "View").hidden = !current;
    }
    $("personSelect").value = selectedId;
    renderForest();
    if (activeView === "tree") drawTree();
    if (activeView === "path") renderPath();
    updateAddress();
  }
  function inform(text) { $("copyStatus").textContent = text; }
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      inform("Copied. Paste the message into email or Facebook.");
    } catch (_) {
      const input = document.createElement("textarea");
      input.value = value;
      document.body.append(input);
      input.select();
      try {
        if (document.execCommand("copy")) inform("Copied. Paste it into a private message.");
        else inform("Copy was blocked. Please select the invitation text and copy it manually.");
      } catch (error) { inform("Copy was blocked. Please copy the message manually."); }
      input.remove();
    }
  }

  renderStats();
  document.querySelectorAll("[data-view]").forEach((tab) => tab.addEventListener("click", () => {
    activeView = tab.dataset.view;
    render();
  }));
  $("personSelect").addEventListener("change", (event) => selectPerson(event.target.value, "path"));
  $("treeRoot").addEventListener("change", (event) => selectPerson(event.target.value, "tree"));
  $("searchInput").addEventListener("input", () => { if (activeView === "forest") renderForest(); });
  $("searchInput").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const text = event.target.value.trim().toLocaleLowerCase();
    const match = people.find((person) => (person.name + " " + person.country).toLocaleLowerCase().includes(text));
    if (match) selectPerson(match.id, "path");
  });
  $("shareView").addEventListener("click", () => copyText(window.location.href));
  $("copyInvite").addEventListener("click", () => copyText(
    "I challenge you to try Olympic Trap with TRAPPUNK! Can you beat my score? Try it first. If you enjoy it, give your device to a friend, buy a ready-to-play one for someone else, or simply invite them to try. Nothing is required. If you want, tell us who challenged whom so the chain appears in our forest. Explore: https://lit-u.github.io/trappunk/challenge.html"
  ));
  $("copyGift").addEventListener("click", () => copyText(
    "Hello! I'd like to buy a ready-to-play TRAPPUNK device as a gift for another shooter. Could you tell me the total price, including shipping, and how payment works? The recipient can send their delivery details directly to you privately."
  ));
  render();
})();
