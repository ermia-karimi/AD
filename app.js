(() => {
  const slotsRoot = document.getElementById("slots");
  const refreshBtn = document.getElementById("refreshBtn");

  const fa = value => String(value).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  const safe = value => String(value ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])
  );

  function detectMediaKind(file) {
    const extension = String(file || "").split("?")[0].split("#")[0].split(".").pop().toLowerCase();
    const imageExtensions = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "bmp", "svg"]);
    const videoExtensions = new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]);
    if (imageExtensions.has(extension)) return "image";
    if (videoExtensions.has(extension)) return "video";
    return "unsupported";
  }

  function mediaMarkup(slot) {
    if (!slot.enabled || !slot.file) {
      return `<div class="placeholder"><b>＋</b>برای این جایگاه تبلیغی ثبت نشده است</div>`;
    }

    const path = safe(slot.file);
    const mediaKind = detectMediaKind(slot.file);
    if (mediaKind === "video") {
      return `<video src="${path}" controls muted playsinline preload="metadata" onerror="this.parentElement.innerHTML='<div class=&quot;placeholder&quot;>ویدئو پیدا نشد یا مرورگر قادر به نمایش آن نیست.</div>'"></video>`;
    }
    if (mediaKind === "image") {
      return `<img src="${path}" alt="پیش‌نمایش تبلیغ جایگاه ${fa(slot.id)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;placeholder&quot;>تصویر پیدا نشد؛ نام و مسیر فایل را بررسی کن.</div>'">`;
    }
    return `<div class="placeholder"><b>؟</b>فرمت فایل پشتیبانی نمی‌شود؛ از JPG، PNG، WEBP، GIF یا MP4 و WEBM استفاده کن.</div>`;
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
      const mediaKind = slot.file ? detectMediaKind(slot.file) : "empty";
      const mediaLabel = mediaKind === "image" ? "تصویر" : mediaKind === "video" ? "ویدئو" : mediaKind === "unsupported" ? "فرمت ناشناخته" : "بدون فایل";
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
        <div class="filename">${safe(fileName)} <span>· ${mediaLabel}</span></div>
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