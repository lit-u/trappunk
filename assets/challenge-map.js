(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const people = JSON.parse($("demoData").textContent);
  const byId = new Map(people.map(p => [p.id, p]));
  // Geographic coordinates are rounded country centroids for illustration, not personal locations.
  const countries = {
    "Lithuania": [55.2,23.9], "Poland":[52.0,19.1], "Germany":[51.2,10.4],
    "Latvia":[56.9,24.6], "Estonia":[58.6,25.0], "France":[46.6,2.2],
    "Spain":[40.4,-3.7], "United Kingdom":[54.0,-2.0], "Finland":[64.0,26.0],
    "Denmark":[56.0,10.0], "Netherlands":[52.1,5.3], "United States":[39.0,-98.0],
    "Japan":[36.2,138.3], "Brazil":[-14.2,-51.9], "South Africa":[-29.0,24.0],
    "Australia":[-25.3,133.8]
  };
  // Simplified coastline from Natural Earth public-domain low-resolution boundaries.
  const LAND = "M283,226L275,229L257,211L212,196L181,156L196,182L188,177L154,131L159,106L128,79L79,76L82,70L60,85L42,90L64,77L41,72L53,59L33,57L51,56L37,49L65,40L233,52L239,39L257,52L262,44L274,48L238,71L244,82L271,88L278,99L287,84L283,67L295,66L312,79L321,73L345,93L316,102L302,112L319,105L321,114L325,115L329,115L332,112L334,115L314,117L288,135L290,145L274,158L277,176L260,161L230,169L234,195L258,187L253,203L268,205L272,224L287,225L301,213L301,223L306,214L328,218L327,221L341,232L357,238L365,254L402,266L386,315L368,323L351,351L338,350L342,359L319,371L317,392L311,404L307,404L303,406L303,408L292,404L290,387L298,375L305,308L274,268L283,226ZM277,63L262,65L258,63L261,57L277,63ZM28,56L0,59L0,47L28,56ZM216,47L185,48L174,44L188,43L168,40L201,35L216,47ZM230,33L224,40L215,36L230,33ZM179,34L150,39L153,31L179,34ZM231,23L252,28L275,27L278,30L243,30L231,23ZM258,16L248,20L231,14L243,11L258,16ZM375,486L360,488L350,487L370,479L375,486ZM305,453L309,462L292,462L300,459L305,453ZM296,409L293,405L302,409L307,404L319,411L296,409ZM475,236L454,214L453,188L484,145L526,140L529,151L553,161L560,153L594,159L600,142L577,142L573,134L615,128L602,117L609,111L594,120L585,113L580,129L563,132L562,143L537,115L551,132L545,138L525,120L509,123L494,142L475,142L474,123L496,121L487,107L523,93L524,82L530,91L555,90L565,76L581,73L559,71L566,56L550,65L544,85L516,78L514,68L553,45L578,41L614,52L592,54L603,62L622,56L621,48L690,50L685,41L694,35L702,38L701,55L707,36L726,39L724,33L790,21L817,27L804,32L853,34L865,42L890,36L1000,47L1000,59L993,60L998,67L954,74L936,100L933,83L957,66L895,76L875,89L893,96L884,114L854,133L859,147L851,149L848,134L836,136L838,130L828,135L840,140L831,147L838,167L822,183L794,192L804,211L792,225L778,211L776,223L790,246L773,227L770,200L762,203L754,183L723,203L715,227L702,187L684,175L633,162L644,179L657,172L666,184L654,199L621,213L590,162L619,215L642,219L609,264L611,297L572,350L551,350L542,330L524,236L475,236ZM309,194L302,198L293,196L297,191L309,194ZM276,182L294,191L264,186L276,182ZM345,98L353,113L335,109L345,98ZM481,88L481,96L472,98L473,92L481,88ZM448,63L432,57L462,58L448,63ZM276,38L328,53L311,55L316,68L282,60L296,50L249,38L271,33L276,38ZM442,7L411,8L466,11L444,14L451,14L440,25L446,31L427,43L438,44L389,57L380,73L357,63L350,52L359,44L348,45L357,42L337,28L296,20L333,9L442,7ZM246,9L298,5L328,7L276,26L251,25L264,22L259,14L273,13L246,9ZM0,499L102,500L73,496L64,489L93,486L69,483L60,476L97,471L309,465L313,447L325,440L339,436L318,450L331,467L285,476L295,479L283,483L338,495L421,486L401,480L481,459L607,455L651,444L691,450L694,463L744,445L875,442L976,461L954,474L964,482L944,488L1000,499L1000,515L0,515L0,499ZM492,91L484,80L492,78L504,99L484,102L492,91ZM560,18L538,22L529,16L560,18ZM637,285L631,323L622,323L623,298L637,285ZM818,276L801,273L793,270L808,269L818,276ZM789,265L782,258L765,234L788,250L795,259L789,265ZM824,257L806,259L803,249L825,230L831,247L824,257ZM691,25L662,31L654,37L660,42L643,40L655,29L691,25ZM772,18L753,14L778,15L772,18ZM978,370L974,385L963,386L978,370ZM987,373L980,352L996,361L987,373ZM865,343L820,351L816,316L868,283L879,285L876,294L889,302L896,281L927,333L917,360L906,365L865,343ZM902,261L919,281L882,275L883,266L863,253L902,261ZM834,249L843,252L841,267L836,258L832,266L833,250L848,246L834,249ZM851,232L839,229L851,223L851,232ZM835,196L845,213L835,209L835,196ZM890,147L875,148L864,150L863,159L859,152L893,128L890,147ZM888,125L894,116L904,119L898,126L888,125ZM902,106L894,112L896,90L902,106Z";
  const colors = { invited: "#89c9ef", gifted: "#ffc27c", passed: "#8beaab" };
  const kindLabels = { invited: "Challenge invitation", gifted: "New device gifted", passed: "Own device passed on" };
  const $svg = $("connectionsSvg");
  const $kind = $("mapType");
  const $country = $("mapCountry");
  const $routes = $("mapRoutes");
  const $info = $("mapInfo");
  let zoom = "world";

  const reports = [];
  for (const person of people) {
    for (const [field, kind] of [["invitedBy","invited"],["giftFrom","gifted"],["passedOnFrom","passed"]]) {
      const source = byId.get(person[field]);
      if (!source || source.country === person.country || !countries[source.country] || !countries[person.country]) continue;
      reports.push({ from: source.country, to: person.country, kind, who: person.id });
    }
  }
  const countryNames = [...new Set(people.map(p => p.country))].filter(name => countries[name]).sort();
  for (const name of countryNames) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    $country.append(option);
  }

  const node = (tag, attrs = {}, text) => {
    const item = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [key,value] of Object.entries(attrs)) item.setAttribute(key, String(value));
    if (text !== undefined) item.textContent = String(text);
    return item;
  };
  const htmlNode = (tag, cls, text) => {
    const item = document.createElement(tag);
    if (cls) item.className = cls;
    if (text !== undefined) item.textContent = String(text);
    return item;
  };
  function projection(name) {
    const point = countries[name];
    return { x: (point[1] + 180) / 360 * 1000, y: (85 - point[0]) / 170 * 500 };
  }
  function routes() {
    const kind = $kind.value;
    const focus = $country.value;
    const visible = reports.filter(r =>
      (kind === "all" || r.kind === kind) &&
      (focus === "all" || r.from === focus || r.to === focus));
    const aggregated = new Map();
    for (const r of visible) {
      const key = r.from + "|" + r.to + "|" + r.kind;
      if (!aggregated.has(key)) aggregated.set(key, { ...r, count: 0 });
      aggregated.get(key).count++;
    }
    return { list: [...aggregated.values()].sort((a,b) => b.count - a.count || a.from.localeCompare(b.from)), total: visible.length };
  }
  function mapArc(a, b, kind) {
    const from = projection(a), to = projection(b);
    const gap = Math.abs(to.x - from.x);
    const lift = Math.min(102, Math.max(13, gap * .20));
    const bend = kind === "gifted" ? -12 : kind === "passed" ? 16 : 0;
    const cx = (from.x + to.x) / 2 + bend;
    const cy = (from.y + to.y) / 2 - lift + bend;
    return "M" + from.x.toFixed(1) + " " + from.y.toFixed(1) +
      " Q" + cx.toFixed(1) + " " + cy.toFixed(1) + " " +
      to.x.toFixed(1) + " " + to.y.toFixed(1);
  }
  function render() {
    const focus = $country.value;
    const { list, total } = routes();
    $svg.replaceChildren();
    const bg = node("rect", {x:0,y:0,width:1000,height:500,fill:"#081c28"});
    $svg.append(bg);
    // Latitude/longitude graticule.
    for (let x = 0; x <= 1000; x += 125) $svg.append(node("path", {d:"M"+x+" 0V500",fill:"none",stroke:"#244554","stroke-width":".7"}));
    for (let y = 0; y <= 500; y += 73.53) $svg.append(node("path", {d:"M0 "+y.toFixed(1)+"H1000",fill:"none",stroke:"#244554","stroke-width":".7"}));
    $svg.append(node("path", { d:LAND, fill:"#1b4245",stroke:"#427073","stroke-width":"1.2","stroke-linejoin":"round" }));
    for (const route of list) {
      const path = node("path", { d:mapArc(route.from,route.to,route.kind), fill:"none", stroke:colors[route.kind],
        "stroke-width":Math.min(5,1.7+Math.sqrt(route.count)*1.2),opacity:".82", "stroke-linecap":"round",
        "stroke-dasharray":route.kind === "invited"?"7 6":"none" });
      path.append(node("title", {}, route.from+" → "+route.to+": "+route.count+" "+kindLabels[route.kind].toLowerCase()+(route.count>1?"s":"")));
      $svg.append(path);
    }
    const visibleCountries = focus === "all" ? countryNames : countryNames.filter(name => name === focus || list.some(r=>r.from===name||r.to===name));
    for (const name of visibleCountries) {
      const pt = projection(name);
      const n = people.filter(p => p.country === name).length;
      const selected = name === focus;
      const g = node("g",{role:"button",tabindex:"0","aria-label":name+", "+n+" demo shooter"+(n===1?"":"s")+". Focus country.",style:"cursor:pointer"});
      g.append(node("title",{},name+" · "+n+" demo shooter"+(n===1?"":"s")));
      g.append(node("circle",{cx:pt.x,cy:pt.y,r:selected?11:7+Math.sqrt(n),fill:selected?"#ffd190":"#9ee5b9",opacity:".22"}));
      g.append(node("circle",{cx:pt.x,cy:pt.y,r:selected?5.8:4.3,fill:selected?"#ffd190":"#d1f6d3",stroke:"#0e343a","stroke-width":"1.6"}));
      if(selected){
        const label = node("text",{x:pt.x+10,y:pt.y-11,fill:"#ffda9b","font-size":"15","font-weight":"850",
           style:"paint-order:stroke;stroke:#081c28;stroke-width:4"},name);
        g.append(label);
      }
      const choose=()=>{$country.value=name;render()};
      g.addEventListener("click",choose);
      g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose();}});
      $svg.append(g);
    }
    $svg.setAttribute("viewBox",zoom==="europe"?"421 9 245 205":"0 0 1000 500");
    const pc = countryNames.length;
    const panelHeadline = focus === "all" ? "Across borders" : focus;
    $info.replaceChildren(htmlNode("span","map-info-kicker","DEMO · COUNTRY CONNECTIONS"),
      htmlNode("h3","",panelHeadline),htmlNode("strong","map-info-value",String(total)),
      htmlNode("p","", "reported cross-border link"+(total===1?"":"s")+" shown"));
    if(focus !== "all"){
      $info.append(htmlNode("p","",people.filter(p=>p.country===focus).length+" demo shooters in "+focus+"."));
      const button=htmlNode("button","challenge-soft-btn","Show all countries");
      button.type="button";button.addEventListener("click",()=>{$country.value="all";render()});
      $info.append(button);
    }else $info.append(htmlNode("p","",pc+" countries in the demo dataset. Links can include both an invitation and a device gift."));
    $info.append(htmlNode("p","map-note","Only reported links. The real chain may be larger than this map."));
    $routes.replaceChildren(htmlNode("h4","","Reported country-to-country routes"));
    if(!list.length){
      $routes.append(htmlNode("p","small","No example cross-border links match this filter."));
    }else{
      const box=htmlNode("div","route-grid");
      list.slice(0,12).forEach(r=>{
        const button=htmlNode("button","route-chip",r.from+" → "+r.to+" · "+r.count);
        button.type="button";
        const mark=htmlNode("i","route-mark "+r.kind);
        button.prepend(mark);
        button.title=kindLabels[r.kind];
        button.addEventListener("click",()=>{$country.value=r.to;render()});
        box.append(button);
      });
      $routes.append(box);
    }
    document.querySelectorAll("[data-mapzoom]").forEach(button=>{
      button.setAttribute("aria-pressed",String(button.dataset.mapzoom===zoom));
    });
  }
  $kind.addEventListener("change",render);
  $country.addEventListener("change",render);
  for(const button of document.querySelectorAll("[data-mapzoom]"))button.addEventListener("click",()=>{
    zoom=button.dataset.mapzoom;render();
  });
  render();
})();
