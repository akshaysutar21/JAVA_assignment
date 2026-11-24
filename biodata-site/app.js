(function () {
  "use strict";

  /* ---------------- formats ---------------- */
  var FORMATS = [
    { id: "classic", mr: "पारंपरिक लाल", en: "Classic Red", bg: "#fff", a: "#9b1c1c", b: "#d4a017" },
    { id: "royal", mr: "राजेशाही", en: "Royal Maroon", bg: "#fff8ec", a: "#5c1a33", b: "#c9a14a" },
    { id: "modern", mr: "मॉडर्न", en: "Modern Teal", bg: "#fff", a: "#0f766e", b: "#0f766e" },
    { id: "floral", mr: "फुलांची नक्षी", en: "Floral Pink", bg: "#fff5fa", a: "#be185d", b: "#fbcfe8" },
    { id: "saffron", mr: "केशरी उत्सव", en: "Saffron Festive", bg: "#fff7ed", a: "#c2410c", b: "#f59e0b" },
    { id: "navy", mr: "निळा-सोनेरी", en: "Navy & Gold", bg: "#fff", a: "#1e3a8a", b: "#d4a017" },
    { id: "green", mr: "हिरवी पाने", en: "Green Leaf", bg: "#fff", a: "#166534", b: "#bbf7d0" },
    { id: "minimal", mr: "साधा", en: "Minimal", bg: "#fff", a: "#111827", b: "#d1d5db" }
  ];

  var GOD = {
    ganesh: "॥ श्री गणेशाय नमः ॥",
    om: "ॐ",
    swastik: "卐 शुभ विवाह 卐",
    none: ""
  };

  /* ---------------- default data ---------------- */
  function defaults(lang) {
    if (lang === "en") {
      return {
        heading: "BIODATA",
        sections: [
          { title: "Personal Details", fields: [
            ["Name", ""], ["Date of Birth", ""], ["Birth Time", ""], ["Birth Place", ""],
            ["Height", ""], ["Complexion", ""], ["Religion / Caste", ""], ["Gotra", ""],
            ["Rashi / Nakshatra", ""], ["Education", ""], ["Occupation", ""], ["Annual Income", ""]
          ] },
          { title: "Family Details", fields: [
            ["Father's Name", ""], ["Father's Occupation", ""], ["Mother's Name", ""],
            ["Mother's Occupation", ""], ["Brothers", ""], ["Sisters", ""], ["Maternal Uncle", ""]
          ] },
          { title: "Contact Details", fields: [
            ["Address", ""], ["Mobile Number", ""]
          ] }
        ]
      };
    }
    return {
      heading: "बायोडाटा",
      sections: [
        { title: "वैयक्तिक माहिती", fields: [
          ["नाव", ""], ["जन्म तारीख", ""], ["जन्म वेळ", ""], ["जन्म स्थळ", ""],
          ["उंची", ""], ["वर्ण", ""], ["धर्म / जात", ""], ["गोत्र", ""],
          ["रास / नक्षत्र", ""], ["शिक्षण", ""], ["नोकरी / व्यवसाय", ""], ["वार्षिक उत्पन्न", ""]
        ] },
        { title: "कौटुंबिक माहिती", fields: [
          ["वडिलांचे नाव", ""], ["वडिलांचा व्यवसाय", ""], ["आईचे नाव", ""],
          ["आईचा व्यवसाय", ""], ["भाऊ", ""], ["बहीण", ""], ["मामा", ""]
        ] },
        { title: "संपर्क", fields: [
          ["पत्ता", ""], ["मोबाईल नंबर", ""]
        ] }
      ]
    };
  }

  /* ---------------- UI strings ---------------- */
  var I18N = {
    mr: {
      brand: "विवाह बायोडाटा मेकर", navFormat: "फॉरमॅट", navDetails: "माहिती", navPreview: "प्रिव्ह्यू",
      heroTitle: "काही मिनिटांत सुंदर लग्नाचा बायोडाटा बनवा",
      heroSub: "फॉरमॅट निवडा, माहिती भरा आणि PDF किंवा इमेज म्हणून डाउनलोड करा — पूर्णपणे मोफत.",
      heroCta: "सुरू करा", step1: "फॉरमॅट निवडा", step2: "तुमची माहिती भरा", step3: "प्रिव्ह्यू व डाउनलोड",
      topSection: "शीर्षक", godImage: "देवाचे चिन्ह", headingText: "मथळा", photo: "फोटो",
      removePhoto: "फोटो काढा", addSection: "नवीन विभाग जोडा", reset: "सर्व रीसेट करा",
      dlPdf: "PDF डाउनलोड करा", dlImg: "इमेज डाउनलोड करा", print: "प्रिंट",
      privacy: "तुमची माहिती फक्त तुमच्या ब्राउझरमध्ये राहते; ती कुठेही पाठवली जात नाही.",
      addField: "+ माहिती जोडा", label: "शीर्षक", value: "माहिती", newSection: "उदा. इतर माहिती",
      confirmReset: "सर्व माहिती पुसून टाकायची?", working: "तयार होत आहे…",
      switchLang: "English", swapFields: "फील्डची नावे मराठीत बदलायची? (भरलेली माहिती पुसली जाईल)"
    },
    en: {
      brand: "Vivah Biodata Maker", navFormat: "Formats", navDetails: "Details", navPreview: "Preview",
      heroTitle: "Create a beautiful marriage biodata in minutes",
      heroSub: "Pick a format, fill in your details and download as PDF or image — completely free.",
      heroCta: "Get started", step1: "Select format", step2: "Fill your details", step3: "Preview & download",
      topSection: "Header", godImage: "God symbol", headingText: "Heading", photo: "Photo",
      removePhoto: "Remove photo", addSection: "Add a new section", reset: "Reset everything",
      dlPdf: "Download PDF", dlImg: "Download image", print: "Print",
      privacy: "Your details stay in your browser and are never uploaded anywhere.",
      addField: "+ Add field", label: "Label", value: "Value", newSection: "e.g. Other details",
      confirmReset: "Clear all details?", working: "Preparing…",
      switchLang: "मराठी", swapFields: "Switch field labels to English? (filled values will be cleared)"
    }
  };

  /* ---------------- state ---------------- */
  var STORE_KEY = "vivah-biodata-v1";
  var state = load() || { lang: "mr", format: "classic", god: "ganesh", photo: "", data: defaults("mr") };

  function load() {
    try { var s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
  }
  function t(key) { return I18N[state.lang][key] || key; }

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- format picker ---------------- */
  function renderFormats() {
    var grid = $("formatGrid");
    grid.innerHTML = "";
    FORMATS.forEach(function (f) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "format-card" + (state.format === f.id ? " active" : "");
      var lines = "";
      for (var i = 0; i < 6; i++) {
        lines += '<div class="t-line" style="top:' + (38 + i * 9) + '%;background:' + f.a + ';width:' + (i % 2 ? 50 : 64) + '%"></div>';
      }
      b.innerHTML =
        '<div class="format-thumb" style="background:' + f.bg + ';border:4px solid ' + f.b + ';box-shadow:inset 0 0 0 2px ' + f.a + '">' +
        '<div class="t-line" style="top:10%;left:30%;right:30%;height:6px;background:' + f.b + ';opacity:1"></div>' +
        '<div class="t-line" style="top:18%;left:22%;right:22%;height:10px;background:' + f.a + ';opacity:.9"></div>' +
        lines + "</div><span>" + esc(f[state.lang]) + "</span>";
      b.addEventListener("click", function () {
        state.format = f.id; save(); renderFormats(); renderSheet();
        if (window.innerWidth < 960) $("details").scrollIntoView();
      });
      grid.appendChild(b);
    });
  }

  /* ---------------- form ---------------- */
  function renderForm() {
    $("godSymbol").value = state.god;
    $("headingText").value = state.data.heading;
    $("newSectionName").placeholder = t("newSection");
    var wrap = $("sections");
    wrap.innerHTML = "";
    state.data.sections.forEach(function (sec, si) {
      var card = document.createElement("div");
      card.className = "card";
      var html =
        '<h3><input type="text" data-s="' + si + '" data-role="title" value="' + esc(sec.title) + '">' +
        '<span class="section-tools">' +
        '<button type="button" class="icon-btn" data-act="up" data-s="' + si + '" title="↑">↑</button>' +
        '<button type="button" class="icon-btn" data-act="down" data-s="' + si + '" title="↓">↓</button>' +
        '<button type="button" class="icon-btn" data-act="delsec" data-s="' + si + '" title="✕">✕</button>' +
        "</span></h3>";
      sec.fields.forEach(function (f, fi) {
        html +=
          '<div class="field-row">' +
          '<input type="text" placeholder="' + esc(t("label")) + '" data-s="' + si + '" data-f="' + fi + '" data-role="k" value="' + esc(f[0]) + '">' +
          '<input type="text" placeholder="' + esc(t("value")) + '" data-s="' + si + '" data-f="' + fi + '" data-role="v" value="' + esc(f[1]) + '">' +
          '<button type="button" class="icon-btn" data-act="delfield" data-s="' + si + '" data-f="' + fi + '" title="✕">✕</button>' +
          "</div>";
      });
      html += '<button type="button" class="btn btn-ghost small add-field" data-act="addfield" data-s="' + si + '">' + esc(t("addField")) + "</button>";
      card.innerHTML = html;
      wrap.appendChild(card);
    });
  }

  $("sections").addEventListener("input", function (e) {
    var el = e.target, s = +el.dataset.s, f = +el.dataset.f;
    if (el.dataset.role === "title") state.data.sections[s].title = el.value;
    else if (el.dataset.role === "k") state.data.sections[s].fields[f][0] = el.value;
    else if (el.dataset.role === "v") state.data.sections[s].fields[f][1] = el.value;
    else return;
    save(); renderSheet();
  });

  $("sections").addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var secs = state.data.sections, s = +b.dataset.s, f = +b.dataset.f;
    switch (b.dataset.act) {
      case "addfield": secs[s].fields.push(["", ""]); break;
      case "delfield": secs[s].fields.splice(f, 1); break;
      case "delsec": secs.splice(s, 1); break;
      case "up": if (s > 0) secs.splice(s - 1, 0, secs.splice(s, 1)[0]); break;
      case "down": if (s < secs.length - 1) secs.splice(s + 1, 0, secs.splice(s, 1)[0]); break;
    }
    save(); renderForm(); renderSheet();
  });

  $("addSectionBtn").addEventListener("click", function () {
    var name = $("newSectionName").value.trim();
    if (!name) { $("newSectionName").focus(); return; }
    state.data.sections.push({ title: name, fields: [["", ""]] });
    $("newSectionName").value = "";
    save(); renderForm(); renderSheet();
  });

  $("godSymbol").addEventListener("change", function () { state.god = this.value; save(); renderSheet(); });
  $("headingText").addEventListener("input", function () { state.data.heading = this.value; save(); renderSheet(); });

  $("photoInput").addEventListener("change", function () {
    var file = this.files && this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      // downscale so it fits in localStorage and keeps the PDF small
      var img = new Image();
      img.onload = function () {
        var max = 600, w = img.width, h = img.height, r = Math.min(1, max / Math.max(w, h));
        var c = document.createElement("canvas");
        c.width = Math.round(w * r); c.height = Math.round(h * r);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        state.photo = c.toDataURL("image/jpeg", 0.88);
        save(); renderSheet();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  $("removePhoto").addEventListener("click", function () {
    state.photo = ""; $("photoInput").value = ""; save(); renderSheet();
  });

  $("resetBtn").addEventListener("click", function () {
    if (!confirm(t("confirmReset"))) return;
    state = { lang: state.lang, format: state.format, god: "ganesh", photo: "", data: defaults(state.lang) };
    $("photoInput").value = "";
    save(); renderAll();
  });

  /* ---------------- sheet ---------------- */
  function renderSheet() {
    var sheet = $("sheet");
    sheet.className = "sheet f-" + state.format;
    var secsHtml = state.data.sections.map(function (sec) {
      var rows = sec.fields.filter(function (f) { return f[0].trim() || f[1].trim(); }).map(function (f) {
        return '<tr><td class="k">' + esc(f[0]) + '</td><td class="c">:</td><td>' + esc(f[1]) + "</td></tr>";
      }).join("");
      if (!rows && !sec.title.trim()) return "";
      return '<div class="sec">' + (sec.title.trim() ? '<div class="sec-title">' + esc(sec.title) + "</div>" : "") +
        "<table>" + rows + "</table></div>";
    });
    // put first section beside the photo, rest full-width below
    var first = secsHtml.shift() || "";
    var god = GOD[state.god];
    sheet.innerHTML =
      '<div class="frame"></div>' +
      (god ? '<div class="god">' + esc(god) + "</div>" : "") +
      (state.data.heading.trim() ? '<h1 class="title">' + esc(state.data.heading) + "</h1>" : "") +
      '<div class="top"><div class="content">' + first + "</div>" +
      (state.photo ? '<img class="photo" alt="" src="' + state.photo + '">' : "") + "</div>" +
      secsHtml.join("");
    fitPreview();
  }

  function fitPreview() {
    var scroller = document.querySelector(".preview-scroller");
    var holder = $("sheetHolder"), sheet = $("sheet");
    var scale = Math.min(1, scroller.clientWidth / 794);
    holder.style.transform = "scale(" + scale + ")";
    holder.style.height = "0";
    scroller.style.height = sheet.offsetHeight * scale + "px";
  }
  window.addEventListener("resize", fitPreview);

  /* ---------------- export ---------------- */
  function fileName(ext) {
    var name = "";
    var s0 = state.data.sections[0];
    if (s0 && s0.fields[0]) name = s0.fields[0][1].trim();
    return (name ? name.replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "_") + "_" : "") + "biodata." + ext;
  }

  function capture() {
    // render an unscaled clone off-screen so the output is always full A4 resolution
    var clone = $("sheet").cloneNode(true);
    clone.removeAttribute("id");
    clone.style.boxShadow = "none";
    var box = document.createElement("div");
    box.style.cssText = "position:fixed;left:-10000px;top:0;";
    box.appendChild(clone);
    document.body.appendChild(box);
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    return ready.then(function () {
      return html2canvas(clone, { scale: 2, useCORS: true, backgroundColor: null });
    }).then(function (canvas) {
      document.body.removeChild(box);
      return canvas;
    }, function (err) {
      document.body.removeChild(box);
      throw err;
    });
  }

  function busy(btn, fn) {
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = t("working");
    fn().catch(function (e) { alert("Error: " + e.message); })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  }

  $("pngBtn").addEventListener("click", function () {
    var btn = this;
    busy(btn, function () {
      return capture().then(function (canvas) {
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = fileName("png");
        document.body.appendChild(a); a.click(); a.remove();
      });
    });
  });

  $("pdfBtn").addEventListener("click", function () {
    var btn = this;
    busy(btn, function () {
      return capture().then(function (canvas) {
        var pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
        var pageW = 210, pageH = 297;
        var pagePx = Math.floor(canvas.width * pageH / pageW); // canvas px per A4 page
        for (var y = 0, page = 0; y < canvas.height; y += pagePx, page++) {
          var h = Math.min(pagePx, canvas.height - y);
          var slice = document.createElement("canvas");
          slice.width = canvas.width; slice.height = h;
          slice.getContext("2d").drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);
          if (page) pdf.addPage();
          pdf.addImage(slice.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pageW, h * pageW / canvas.width);
        }
        pdf.save(fileName("pdf"));
      });
    });
  });

  $("printBtn").addEventListener("click", function () { window.print(); });

  /* ---------------- language ---------------- */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $("langToggle").textContent = t("switchLang");
  }

  $("langToggle").addEventListener("click", function () {
    var next = state.lang === "mr" ? "en" : "mr";
    var untouched = JSON.stringify(state.data) === JSON.stringify(defaults(state.lang));
    state.lang = next;
    if (untouched || confirm(t("swapFields"))) state.data = defaults(next);
    save(); renderAll();
  });

  function renderAll() { applyI18n(); renderFormats(); renderForm(); renderSheet(); }

  $("year").textContent = new Date().getFullYear();
  renderAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitPreview);
})();
