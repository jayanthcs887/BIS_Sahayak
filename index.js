const kb = [
    { keys: ["certification", "product certification", "license", "licence"], title: "BIS Product Certification", text: "BIS Product Certification is a conformity assessment mechanism through which manufacturers can demonstrate that products conform to applicable Indian Standards. The certification process can involve application, assessment, testing and surveillance requirements depending on the product and applicable scheme.", doc: "BIS Product Certification overview", clause: "Certification process / applicable product standard", tag: "Certification" },

    { keys: ["isi", "isi mark"], title: "ISI Mark", text: "The ISI Mark is associated with BIS product certification for products covered under the relevant certification requirements. The applicable standard, scheme and licensing requirements depend on the specific product.", doc: "BIS Product Certification / Marking guidance", clause: "Marking and certification requirements", tag: "Standards & Certification" },

    { keys: ["hallmark", "hallmarking", "gold", "silver"], title: "BIS Hallmarking", text: "BIS hallmarking is a system for recording the purity of precious-metal articles such as gold and silver through prescribed requirements and processes. Specific obligations depend on the article, purity grade and applicable BIS requirements.", doc: "BIS Hallmarking information", clause: "Hallmarking requirements", tag: "Hallmarking" },

    { keys: ["standard", "indian standard", "applicable standard", "find a standard"], title: "Finding an Applicable Indian Standard", text: "To identify an applicable Indian Standard, the product or service should first be defined clearly, including its type, intended use and relevant technical characteristics. The production system can then retrieve matching standards from an authorized BIS knowledge base and present the supporting document and clause.", doc: "BIS Standards catalogue / authorized standards documents", clause: "Relevant standard and clause selected from retrieved document", tag: "Standards" }
];


function match(q) {
    q = q.toLowerCase();
    let best = null, score = 0;
    for (const item of kb) { let s = item.keys.reduce((n, k) => n + (q.includes(k) ? 2 : 0), 0); if (s > score) { score = s; best = item } } return best || kb[3]
}

function addUser(q) {
    let d = document.createElement("div");
    d.className = "msg user";
    d.innerHTML = `<div class="bubble">${escapeHtml(q)}</div>`;
    chat.appendChild(d)
}

function addBot(item) {
    let d = document.createElement("div");
    d.className = "msg";
    d.innerHTML = `<div class="assistant"><div class="label">BIS INTELLIGENT ASSISTANT</div><p><b>${item.title}</b></p><p>${item.text}</p><div class="source"><strong>📄 Supporting source</strong><div>${item.doc}</div><div>📌 Reference: ${item.clause}</div></div><span class="confidence">✓ Retrieved knowledge • ${item.tag}</span></div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight
}

function ask(q) {
    addUser(q);
    setTimeout(() => addBot(match(q)), 350)
}

function send() {
    let q = document.getElementById("q").value.trim(); if (!q) return;
    document.getElementById("q").value = "";
    ask(q)
}

function escapeHtml(s) {
    return s.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]))
}
