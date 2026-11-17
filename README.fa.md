# پنل وضعیت تبلیغات Numix

این یک پنل **فقط نمایشی** است. هیچ ورود، رمز، Supabase، API یا آپلودی ندارد. پنل فایل `ads-config.json` را می‌خواند و نشان می‌دهد هر جایگاه چه فایلی دارد.

## فایل‌های پروژه

```text
numix-ad-panel/
├── index.html
├── style.css
├── app.js
├── ads-config.json
└── ads/
    ├── slot-1.jpg
    ├── slot-2.jpg
    ├── slot-3.jpg
    └── slot-4.jpg
```

## انتشار در GitHub Pages

1. ZIP را استخراج کن.
2. تمام محتویات پوشه را داخل ریشه Repository گیت‌هاب قرار بده.
3. پوشه `ads` را هم با فایل‌های تبلیغاتی‌ات در همان Repository قرار بده.
4. از Settings → Pages، شاخه انتشار را انتخاب کن.
5. لینک GitHub Pages را باز کن.

## تغییر تبلیغ

فایل رسانه را دستی در پوشه `ads` جایگزین کن. نام فایل هر جایگاه باید ثابت بماند. برای نمونه:
- `ads/slot-1.jpg`
- `ads/slot-2.jpg`
- `ads/slot-3.jpg`
- `ads/slot-4.jpg`

برای ویدیو می‌توانی از پسوندهای `.mp4` یا `.webm` استفاده کنی. اگر نوع فایل را عوض کردی، مقدار `file` و `type` در `ads-config.json` را هم تغییر بده؛ آدرس فایل همان مسیر ثابت جایگاه است، ولی پسوند باید با فایل واقعی هماهنگ باشد.

## ویرایش وضعیت و یادداشت‌ها

فایل `ads-config.json` را ویرایش کن. نمونه:

```json
{
  "slots": [
    {
      "id": 1,
      "enabled": true,
      "file": "ads/slot-1.jpg",
      "type": "image",
      "uploadDate": "1405/09/01",
      "removeDate": "1405/10/01",
      "label": "تبلیغ فروشگاه نمونه"
    },
    {
      "id": 2,
      "enabled": true,
      "file": "ads/slot-2.mp4",
      "type": "video",
      "uploadDate": "1405/09/02",
      "removeDate": "",
      "label": "ویدیوی معرفی محصول"
    },
    {
      "id": 3,
      "enabled": false,
      "file": "ads/slot-3.jpg",
      "type": "image",
      "uploadDate": "",
      "removeDate": "",
      "label": ""
    },
    {
      "id": 4,
      "enabled": false,
      "file": "ads/slot-4.jpg",
      "type": "image",
      "uploadDate": "",
      "removeDate": "",
      "label": ""
    }
  ]
}
```

- `enabled`: اگر `true` باشد جایگاه در پنل «دارای تبلیغ» نمایش داده می‌شود؛ اگر `false` باشد «خالی» نشان داده می‌شود.
- `file`: مسیر فایل رسانه.
- `type`: مقدار `image` یا `video`.
- `uploadDate` و `removeDate`: فقط یادداشت هستند و هیچ زمان‌بندی خودکاری ایجاد نمی‌کنند.
- `label`: نام یا توضیح دلخواه تبلیغ.

پس از تغییر فایل‌ها یا JSON، تغییرات را در GitHub commit کن. پنل با دکمه «بروزرسانی» اطلاعات جدید را می‌خواند.

## آدرس‌های رسانه برای بازی

فرض کن GitHub Pages تو این آدرس را دارد:

`https://USERNAME.github.io/REPOSITORY/`

آدرس فایل‌ها می‌شود:
- `https://USERNAME.github.io/REPOSITORY/ads/slot-1.jpg`
- `https://USERNAME.github.io/REPOSITORY/ads/slot-2.mp4`
- `https://USERNAME.github.io/REPOSITORY/ads/slot-3.jpg`
- `https://USERNAME.github.io/REPOSITORY/ads/slot-4.jpg`

برای بازی، این آدرس‌ها و وضعیت فعال/غیرفعال را از `ads-config.json` می‌خوانیم. پنل خودش تبلیغ را زمان‌بندی یا حذف نمی‌کند.
