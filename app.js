(() => {
  const slotsRoot = document.getElementById("slots");
  const refreshBtn = document.getElementById("refreshBtn");

  const fa = value => String(value).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  const safe = value => String(value ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])
  );

  function mediaMarkup(slot) {
    if (!slot.enabled || !slot.file) {
      return `<div class="placeholder"><b>＋</b>برای این جایگاه تبلیغی ثبت نشده است</div>`;
    }
    const path = safe(slot.file);
    const type = String(slot.type || "").toLowerCase();
    if (type === "video" || /\.(mp4|webm|mov|m4v)$/i.test(slot.file)) {
      return `<video src="${path}" controls muted playsinline preload="metadata"></video>`;
    }
    return `<img src="${path}" alt="پیش‌نمایش تبلیغ جایگاه ${fa(slot.id)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;placeholder&quot;>فایل تبلیغ پیدا نشد؛ نام و مسیر فایل را بررسی کن.</div>'">`;
  }

  function render(config) {
    const slots = Array.isArray(config.slots) ? config.slots : [];
    const ordered = [1,2,3,4].map(id => slots.find(s => Number(s.id) === id) || {
      id, enabled:false, file:"", type:"image", uploadDate:"", removeDate:"", label:""
    });
    const active = ordered.filter(s => s.enabled && s.file).length;
    document.getElementById("totalCount").textContent = fa("4");
    document.getElementById("activeCount").textContent = fa(String(active));
    document.getElementById("emptyCount").textContent = fa(String(4-active));

    slotsRoot.innerHTML = ordered.map(slot => {
      const activeSlot = Boolean(slot.enabled && slot.file);
      const fileName = slot.file ? slot.file.split("/").pop() : "—";
      return `<article class="slot">
        <div class="slot-head">
          <span class="slot-title">جایگاه تبلیغ ${fa(slot.id)}</span>
          <span class="slot-id">SLOT 0${slot.id}</span>
          <span class="status ${activeSlot ? "active" : "empty"}">${activeSlot ? "دارای تبلیغ" : "خالی"}</span>
        </div>
        <div class="media">${mediaMarkup(slot)}</div>
        <div class="meta">
          <div class="meta-item"><span>تاریخ آپلود (یادآوری)</span><strong>${safe(slot.uploadDate || "ثبت نشده")}</strong></div>
          <div class="meta-item"><span>تاریخ انلود (یادآوری)</span><strong>${safe(slot.removeDate || "ثبت نشده")}</strong></div>
        </div>
        <div class="filename">${safe(fileName)}</div>
        ${slot.label ? `<div class="ad-label">${safe(slot.label)}</div>` : ""}
      </article>`;
    }).join("");
    document.getElementById("lastUpdated").textContent = "آخرین دریافت: " + new Date().toLocaleString("fa-IR");
  }

  async function load() {
    slotsRoot.innerHTML = `<div class="loading">در حال خواندن اطلاعات تبلیغات…</div>`;
    try {
      const response = await fetch(`ads-config.json?v=${Date.now()}`, {cache:"no-store"});
      if (!response.ok) throw new Error("ads-config.json پیدا نشد.");
      const config = await response.json();
      render(config);
    } catch (error) {
      slotsRoot.innerHTML = `<div class="error">خطا در خواندن فایل تنظیمات: ${safe(error.message)}<br>مطمئن شو ads-config.json کنار index.html قرار دارد.</div>`;
    }
  }
  refreshBtn.addEventListener("click", load);
  load();
})();