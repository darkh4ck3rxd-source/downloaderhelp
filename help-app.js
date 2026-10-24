"use strict";

const reel = document.querySelector('.reel');
const stage = document.querySelector('.stage');
const sceneWidth = 1080;
const sceneHeight = 1920;

function fitStage() {
  const scale = Math.min(window.innerWidth / sceneWidth, window.innerHeight / sceneHeight);
  stage.style.setProperty('--fit-scale', scale);
  reel.style.setProperty('--stage-scaled-h', `${sceneHeight * scale}px`);
}

window.addEventListener('resize', fitStage);
window.addEventListener('orientationchange', fitStage);
fitStage();

const tg = window.Telegram && window.Telegram.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

const params = new URLSearchParams(location.search);
const rawLang = params.get('lang')
  || (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code)
  || navigator.language
  || 'en';
const languageAliases = { ars: 'ar', iw: 'he', in: 'id' };
const requestedLang = rawLang.toLowerCase().replace('_', '-').split('-', 1)[0];
const normalizedLang = languageAliases[requestedLang] || requestedLang;
const supportedLanguages = [
  'es', 'en', 'pt', 'ar', 'fr', 'id', 'tr', 'ru', 'uz', 'he',
  'fa', 'it', 'hi', 'de', 'zh', 'nl', 'ms', 'uk', 'th'
];
const lang = supportedLanguages.includes(normalizedLang) ? normalizedLang : 'en';
const isRtl = ['ar', 'he', 'fa'].includes(lang);
document.documentElement.lang = lang;
document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

const requestedBot = (params.get('bot') || 'DPQRbot').replace(/^@/, '');
const botUsername = /^[A-Za-z0-9_]{5,32}$/.test(requestedBot)
  ? requestedBot
  : 'DPQRbot';
const botHandle = `@${botUsername}`;
document.title = `${botHandle} · Telegram Download Guide`;

const fallback = {
  guideTitle: 'How to download',
  guideLead: 'Send a public link, wait for the bot, then use the available action buttons.',
  step1Title: 'Copy the link',
  step1Text: 'Use a public link from TikTok, Instagram, X/Twitter, YouTube, Facebook, or supported websites.',
  step2Title: 'Send it to the bot',
  step2Text: 'No commands are needed. Paste the link and the bot starts processing automatically.',
  step3Title: 'Wait for the file',
  step3Text: 'The bot fetches details, downloads the media, then uploads it to Telegram.',
  step4Title: 'Use the buttons',
  step4Text: 'Extract audio, request HD, or retry if the link fails.',
  featureQualityTitle: 'Quality choices',
  featureQualityText: 'For YouTube and X/Twitter, choose from the qualities that are available for that video.',
  featureAlbumTitle: 'Albums',
  featureAlbumText: 'When a post contains several photos or videos, the bot sends them as an album when Telegram allows it.',
  featurePremiumTitle: 'Premium',
  featurePremiumText: 'Premium unlocks larger files, more websites, multi-link downloads, and better priority.',
  featurePrivacyTitle: 'Public links',
  featurePrivacyText: 'Private, deleted, expired, or login-only content may fail. Send the original public link when possible.',
  note: 'If a download fails, press Retry or send the original public link without extra text.'
};
const translations = {
  ar: {
    guideTitle: 'طريقة التحميل',
    guideLead: 'أرسل رابطاً عاماً، انتظر تجهيز الملف، ثم استخدم الأزرار المتاحة تحت الفيديو.',
    step1Title: 'انسخ الرابط',
    step1Text: 'استخدم رابطاً عاماً من TikTok أو Instagram أو X/Twitter أو YouTube أو Facebook أو المواقع المدعومة.',
    step2Title: 'أرسله للبوت',
    step2Text: 'لا تحتاج أوامر. الصق الرابط فقط وسيبدأ البوت المعالجة تلقائياً.',
    step3Title: 'انتظر الملف',
    step3Text: 'البوت يجلب البيانات، يحمل الوسائط، ثم يرفعها إلى تيليجرام.',
    step4Title: 'استخدم الأزرار',
    step4Text: 'استخرج الصوت، اطلب HD، أو أعد المحاولة إذا فشل الرابط.',
    featureQualityTitle: 'اختيار الجودة',
    featureQualityText: 'في YouTube و X/Twitter اختر من الجودات المتاحة للفيديو نفسه.',
    featureAlbumTitle: 'الألبومات',
    featureAlbumText: 'إذا كان المنشور يحتوي صوراً أو فيديوهات متعددة، يرسلها البوت كألبوم عندما يسمح تيليجرام.',
    featurePremiumTitle: 'البريميوم',
    featurePremiumText: 'البريميوم يفتح الملفات الكبيرة، مواقع أكثر، التحميل المتعدد، وأولوية أفضل.',
    featurePrivacyTitle: 'الروابط العامة',
    featurePrivacyText: 'المحتوى الخاص أو المحذوف أو المنتهي أو الذي يحتاج تسجيل دخول قد يفشل. أرسل الرابط العام الأصلي قدر الإمكان.',
    note: 'إذا فشل التحميل، اضغط إعادة المحاولة أو أرسل الرابط العام الأصلي بدون نص إضافي.'
  },
  es: {
    guideTitle: 'Cómo descargar',
    guideLead: 'Envía un enlace público, espera al bot y usa los botones disponibles debajo del video.',
    step1Title: 'Copia el enlace',
    step1Text: 'Usa un enlace público de TikTok, Instagram, X/Twitter, YouTube, Facebook o sitios compatibles.',
    step2Title: 'Envíalo al bot',
    step2Text: 'No necesitas comandos. Pega el enlace y el bot empieza automáticamente.',
    step3Title: 'Espera el archivo',
    step3Text: 'El bot obtiene datos, descarga el contenido y lo sube a Telegram.',
    step4Title: 'Usa los botones',
    step4Text: 'Extrae audio, pide HD o reintenta si falla el enlace.',
    featureQualityTitle: 'Calidades',
    featureQualityText: 'En YouTube y X/Twitter elige entre las calidades disponibles para ese video.',
    featureAlbumTitle: 'Álbumes',
    featureAlbumText: 'Si el post tiene varias fotos o videos, el bot los envía como álbum cuando Telegram lo permite.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium desbloquea archivos grandes, más sitios, descargas múltiples y mejor prioridad.',
    featurePrivacyTitle: 'Enlaces públicos',
    featurePrivacyText: 'Contenido privado, eliminado, vencido o con inicio de sesión puede fallar. Envía el enlace público original.',
    note: 'Si falla una descarga, pulsa Reintentar o envía el enlace público original sin texto extra.'
  },
  pt: {
    guideTitle: 'Como baixar',
    guideLead: 'Envie um link público, aguarde o bot e use os botões disponíveis abaixo do vídeo.',
    step1Title: 'Copie o link',
    step1Text: 'Use um link público do TikTok, Instagram, X/Twitter, YouTube, Facebook ou sites compatíveis.',
    step2Title: 'Envie ao bot',
    step2Text: 'Não precisa de comandos. Cole o link e o bot começa automaticamente.',
    step3Title: 'Aguarde o arquivo',
    step3Text: 'O bot busca os dados, baixa a mídia e envia para o Telegram.',
    step4Title: 'Use os botões',
    step4Text: 'Extraia áudio, peça HD ou tente novamente se falhar.',
    featureQualityTitle: 'Qualidades',
    featureQualityText: 'No YouTube e X/Twitter, escolha uma das qualidades disponíveis para o vídeo.',
    featureAlbumTitle: 'Álbuns',
    featureAlbumText: 'Quando o post tem várias fotos ou vídeos, o bot envia como álbum quando o Telegram permite.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium libera arquivos grandes, mais sites, downloads múltiplos e prioridade melhor.',
    featurePrivacyTitle: 'Links públicos',
    featurePrivacyText: 'Conteúdo privado, removido, expirado ou que exige login pode falhar. Envie o link público original.',
    note: 'Se o download falhar, toque em Tentar novamente ou envie o link público original sem texto extra.'
  },
  fr: {
    guideTitle: 'Comment télécharger',
    guideLead: 'Envoyez un lien public, attendez le bot, puis utilisez les boutons sous la vidéo.',
    step1Title: 'Copiez le lien',
    step1Text: 'Utilisez un lien public de TikTok, Instagram, X/Twitter, YouTube, Facebook ou des sites pris en charge.',
    step2Title: 'Envoyez-le au bot',
    step2Text: 'Aucune commande nécessaire. Collez le lien et le bot démarre automatiquement.',
    step3Title: 'Attendez le fichier',
    step3Text: 'Le bot récupère les détails, télécharge le média, puis l’envoie sur Telegram.',
    step4Title: 'Utilisez les boutons',
    step4Text: 'Extrayez l’audio, demandez HD ou réessayez si le lien échoue.',
    featureQualityTitle: 'Qualités',
    featureQualityText: 'Pour YouTube et X/Twitter, choisissez parmi les qualités disponibles.',
    featureAlbumTitle: 'Albums',
    featureAlbumText: 'Si une publication contient plusieurs éléments, le bot les envoie en album quand Telegram le permet.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium débloque les gros fichiers, plus de sites, le multi-lien et une meilleure priorité.',
    featurePrivacyTitle: 'Liens publics',
    featurePrivacyText: 'Le contenu privé, supprimé, expiré ou nécessitant une connexion peut échouer.',
    note: 'Si un téléchargement échoue, appuyez sur Réessayer ou envoyez le lien public original sans texte en plus.'
  },
  id: {
    guideTitle: 'Cara mengunduh',
    guideLead: 'Kirim tautan publik, tunggu bot, lalu gunakan tombol yang tersedia di bawah video.',
    step1Title: 'Salin tautan',
    step1Text: 'Gunakan tautan publik dari TikTok, Instagram, X/Twitter, YouTube, Facebook, atau situs yang didukung.',
    step2Title: 'Kirim ke bot',
    step2Text: 'Tidak perlu perintah. Tempel tautan dan bot mulai otomatis.',
    step3Title: 'Tunggu file',
    step3Text: 'Bot mengambil detail, mengunduh media, lalu mengirimnya ke Telegram.',
    step4Title: 'Gunakan tombol',
    step4Text: 'Ambil audio, minta HD, atau coba lagi jika tautan gagal.',
    featureQualityTitle: 'Pilihan kualitas',
    featureQualityText: 'Untuk YouTube dan X/Twitter, pilih kualitas yang tersedia untuk video tersebut.',
    featureAlbumTitle: 'Album',
    featureAlbumText: 'Jika posting berisi beberapa foto atau video, bot mengirimnya sebagai album jika Telegram mengizinkan.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium membuka file besar, lebih banyak situs, multi-link, dan prioritas lebih baik.',
    featurePrivacyTitle: 'Tautan publik',
    featurePrivacyText: 'Konten privat, dihapus, kedaluwarsa, atau butuh login mungkin gagal.',
    note: 'Jika unduhan gagal, tekan Coba lagi atau kirim tautan publik asli tanpa teks tambahan.'
  },
  tr: {
    guideTitle: 'Nasıl indirilir',
    guideLead: 'Herkese açık bir bağlantı gönderin, botu bekleyin ve videonun altındaki düğmeleri kullanın.',
    step1Title: 'Bağlantıyı kopyalayın',
    step1Text: 'TikTok, Instagram, X/Twitter, YouTube, Facebook veya desteklenen sitelerden herkese açık bağlantı kullanın.',
    step2Title: 'Bota gönderin',
    step2Text: 'Komut gerekmez. Bağlantıyı yapıştırın, bot otomatik başlar.',
    step3Title: 'Dosyayı bekleyin',
    step3Text: 'Bot ayrıntıları alır, medyayı indirir ve Telegram’a yükler.',
    step4Title: 'Düğmeleri kullanın',
    step4Text: 'Ses çıkarın, HD isteyin veya bağlantı başarısız olursa tekrar deneyin.',
    featureQualityTitle: 'Kalite seçenekleri',
    featureQualityText: 'YouTube ve X/Twitter için videoda mevcut olan kalitelerden seçim yapın.',
    featureAlbumTitle: 'Albümler',
    featureAlbumText: 'Gönderide birden fazla fotoğraf veya video varsa, Telegram izin verirse bot album olarak gönderir.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium büyük dosyalar, daha fazla site, çoklu bağlantı ve daha iyi öncelik açar.',
    featurePrivacyTitle: 'Herkese açık bağlantılar',
    featurePrivacyText: 'Özel, silinmiş, süresi dolmuş veya giriş isteyen içerikler başarısız olabilir.',
    note: 'İndirme başarısız olursa Tekrar dene’ye basın veya orijinal herkese açık bağlantıyı gönderin.'
  },
  ru: {
    guideTitle: 'Как скачать',
    guideLead: 'Отправьте публичную ссылку, дождитесь бота и используйте кнопки под видео.',
    step1Title: 'Скопируйте ссылку',
    step1Text: 'Используйте публичную ссылку из TikTok, Instagram, X/Twitter, YouTube, Facebook или поддерживаемых сайтов.',
    step2Title: 'Отправьте боту',
    step2Text: 'Команды не нужны. Вставьте ссылку, и бот начнёт автоматически.',
    step3Title: 'Дождитесь файла',
    step3Text: 'Бот получает данные, скачивает медиа и отправляет его в Telegram.',
    step4Title: 'Используйте кнопки',
    step4Text: 'Извлеките аудио, запросите HD или повторите, если ссылка не сработала.',
    featureQualityTitle: 'Выбор качества',
    featureQualityText: 'Для YouTube и X/Twitter выбирайте качество, доступное для этого видео.',
    featureAlbumTitle: 'Альбомы',
    featureAlbumText: 'Если пост содержит несколько фото или видео, бот отправляет их альбомом, когда Telegram позволяет.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium открывает большие файлы, больше сайтов, несколько ссылок и лучший приоритет.',
    featurePrivacyTitle: 'Публичные ссылки',
    featurePrivacyText: 'Приватный, удалённый, истёкший или требующий входа контент может не скачаться.',
    note: 'Если загрузка не удалась, нажмите Повторить или отправьте оригинальную публичную ссылку без лишнего текста.'
  },
  he: {
    guideTitle: 'איך מורידים',
    guideLead: 'שלח קישור ציבורי, המתן לבוט ואז השתמש בכפתורים שמתחת לסרטון.',
    step1Title: 'העתק את הקישור',
    step1Text: 'השתמש בקישור ציבורי מ-TikTok, Instagram, X/Twitter, YouTube, Facebook או אתרים נתמכים.',
    step2Title: 'שלח לבוט',
    step2Text: 'אין צורך בפקודות. הדבק את הקישור והבוט מתחיל אוטומטית.',
    step3Title: 'המתן לקובץ',
    step3Text: 'הבוט מביא פרטים, מוריד את המדיה ושולח אותה לטלגרם.',
    step4Title: 'השתמש בכפתורים',
    step4Text: 'חלץ אודיו, בקש HD או נסה שוב אם הקישור נכשל.',
    featureQualityTitle: 'בחירת איכות',
    featureQualityText: 'ב-YouTube וב-X/Twitter בחר מהאיכויות הזמינות לסרטון.',
    featureAlbumTitle: 'אלבומים',
    featureAlbumText: 'כאשר פוסט מכיל כמה תמונות או סרטונים, הבוט שולח אותם כאלבום כאשר Telegram מאפשר.',
    featurePremiumTitle: 'Premium',
    featurePremiumText: 'Premium פותח קבצים גדולים, יותר אתרים, הורדה מרובה ועדיפות טובה יותר.',
    featurePrivacyTitle: 'קישורים ציבוריים',
    featurePrivacyText: 'תוכן פרטי, מחוק, שפג תוקפו או דורש התחברות עלול להיכשל.',
    note: 'אם הורדה נכשלת, לחץ נסה שוב או שלח את הקישור הציבורי המקורי ללא טקסט נוסף.'
  },
  fa: {
    guideTitle: 'روش دانلود',
    guideLead: 'یک لینک عمومی بفرستید، منتظر ربات بمانید و سپس از دکمه‌های زیر ویدیو استفاده کنید.',
    step1Title: 'لینک را کپی کنید',
    step1Text: 'از لینک عمومی TikTok، Instagram، X/Twitter، YouTube، Facebook یا سایت‌های پشتیبانی‌شده استفاده کنید.',
    step2Title: 'آن را برای ربات بفرستید',
    step2Text: 'نیازی به دستور نیست. لینک را جای‌گذاری کنید تا ربات به‌صورت خودکار شروع کند.',
    step3Title: 'منتظر فایل بمانید',
    step3Text: 'ربات اطلاعات را دریافت می‌کند، رسانه را دانلود می‌کند و سپس آن را به تلگرام می‌فرستد.',
    step4Title: 'از دکمه‌ها استفاده کنید',
    step4Text: 'صدا را استخراج کنید، نسخه HD بخواهید یا دوباره تلاش کنید.',
    featureQualityTitle: 'انتخاب کیفیت',
    featureQualityText: 'برای YouTube و X/Twitter یکی از کیفیت‌های موجود همان ویدیو را انتخاب کنید.',
    featureAlbumTitle: 'آلبوم‌ها',
    featureAlbumText: 'اگر یک پست چند عکس یا ویدیو داشته باشد، ربات در صورت امکان آن‌ها را به‌صورت آلبوم می‌فرستد.',
    featurePremiumTitle: 'پریمیوم',
    featurePremiumText: 'پریمیوم فایل‌های بزرگ‌تر، سایت‌های بیشتر، دانلود چندلینکی و اولویت بهتر را فعال می‌کند.',
    featurePrivacyTitle: 'لینک‌های عمومی',
    featurePrivacyText: 'محتوای خصوصی، حذف‌شده، منقضی یا نیازمند ورود ممکن است دانلود نشود. تا حد امکان لینک عمومی اصلی را بفرستید.',
    note: 'اگر دانلود ناموفق بود، روی تلاش دوباره بزنید یا لینک عمومی اصلی را بدون متن اضافی بفرستید.'
  }
};
Object.assign(translations, window.EXTENDED_HELP_TRANSLATIONS || {});
const selected = translations[lang] || fallback;
document.querySelectorAll('[data-i18n]').forEach((node) => {
  const key = node.dataset.i18n;
  node.textContent = selected[key] || fallback[key] || node.textContent;
});

const demoFallback = (window.HELP_DEMO_TRANSLATIONS || {}).en || {};
const demoSelected = (window.HELP_DEMO_TRANSLATIONS || {})[lang] || demoFallback;
const interpolate = (template, values) => Object.entries(values).reduce(
  (text, [name, value]) => text.replaceAll(`{${name}}`, value),
  template
);
document.querySelectorAll('[data-demo-i18n]').forEach((node) => {
  const key = node.dataset.demoI18n;
  const template = demoSelected[key] || demoFallback[key] || node.textContent;
  node.textContent = interpolate(template, {
    bot: botHandle,
    platform: node.dataset.platform || '',
    seconds: node.dataset.seconds || ''
  });
});
document.querySelectorAll('[data-bot-initial]').forEach((node) => {
  node.textContent = botUsername.charAt(0).toUpperCase();
});
