import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Globe2, ShieldCheck, FileText, Building2, Gavel, Landmark, ScrollText, Users2, Award, ChevronRight, Check, ArrowRight, Mail, Phone, MapPin, Linkedin, Menu, X, Sun, Moon } from "lucide-react";

/* -------------------- utils & i18n -------------------- */
const cx = (...cls) => cls.filter(Boolean).join(" ");
function setFavicon() {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="10" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#7C3AED"/><stop offset="0.55" stop-color="#7C3AED"/><stop offset="1" stop-color="#F97316"/></linearGradient></defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#g)"/>
  <g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 12v22M20 20h24M20 50h24"/><path d="M26 20l-6 12M38 20l6 12"/></g>
  <path d="M14 32h12l-6 8-6-8z" fill="#fff"/><path d="M38 32h12l-6 8-6-8z" fill="#fff"/>
</svg>`;
  const url = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  let link = document.querySelector('link[rel="icon"]');
  if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
  link.href = url;
}
function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  useEffect(() => { localStorage.setItem("lang", lang); document.documentElement.setAttribute("lang", ["ru", "en"].includes(lang) ? lang : "en"); }, [lang]);
  const t = (key, fallback) => (I18N[lang] && I18N[lang][key]) ?? fallback;
  return { lang, setLang, t };
}
function LangSelect({ lang, setLang, className = "" }) {
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value)}
      className={cx("rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-2 text-sm", className)}
      aria-label="Language" title="Language">
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
}

const BLOGS = {
  "startup-visa-lithuania": {
    en:{title:"Lithuania’s Startup Visa: an entry point for non-EU founders",lead:"Lithuania is one of the few EU countries with a Startup Visa program for innovative founders.",body:[
      "Lithuania is one of the few EU countries offering a dedicated Startup Visa program, designed to help innovative founders establish their business and secure a residence permit in Europe.",
      "What the Startup Visa offers",
      "• Temporary residence permit for up to 2 years (extendable to 5).",
      "• The right to bring family members.",
      "• Access to the EU market and Lithuania’s growing startup ecosystem.",
      "What is required",
      "• A business idea or MVP.",
      "• A clear Pitch Deck (10–12 slides presenting your startup).",
      "• Proof of sufficient funds to cover living and business expenses.",
      "• Company registration (MB or UAB) within 120 days of arrival.",
      "Typical challenges",
      "Many founders underestimate the complexity of preparing the right documents and financial plans. Even strong projects risk rejection if the submission is incomplete or does not meet formal criteria.",
      "How we assist",
      "We provide end-to-end support: preparing your Pitch Deck, structuring your business plan, registering your company, and handling all communication with Lithuanian authorities. With our guidance, you can focus on building your business while we take care of the legal and administrative side."
    ]},
    ru:{title:"Startup-виза в Литве: возможность для предпринимателей из-за пределов ЕС",lead:"Литва — одна из немногих стран ЕС со специальной Startup-визой для основателей.",body:[
      "Литва остаётся одной из немногих стран ЕС, где можно получить вид на жительство, развивая собственный стартап. Программа Startup Visa Lithuania создана специально для основателей инновационных проектов, которые хотят выйти на европейский рынок.",
      "Что даёт стартап-виза",
      "• ВНЖ до 2 лет, с возможностью продления до 5.",
      "• Возможность привезти семью.",
      "• Выход на рынок ЕС и доступ к инвестиционной экосистеме.",
      "Что потребуется",
      "• Идея или MVP.",
      "• Pitch Deck — презентация проекта (10–12 слайдов).",
      "• Средства на жизнь и запуск.",
      "• Регистрация фирмы (MB или UAB) в течение 120 дней после приезда.",
      "С какими трудностями сталкиваются",
      "На практике сложности — в подготовке документов, бизнес-плана, юр. регистрации и коммуникации с госорганами. Отказы часто — из-за формальных ошибок.",
      "Как мы помогаем",
      "Сопровождаем на каждом этапе: от Pitch Deck и структуры бизнеса до регистрации компании и миграционных документов — вы строите продукт, мы закрываем формальности."
    ]},
  },
  "uae-for-eu-it": {
    en:{title:"UAE as a Gateway for European IT Companies: From Startup to Global Scale",lead:"A practical route for EU IT & SaaS founders to scale in the Gulf with reputation and banking.",body:[
      "For European IT businesses, expanding beyond the EU often means searching for a hub that combines innovation, tax efficiency, and global access. The UAE has become a leading destination for IT companies, SaaS providers, and digital startups from Europe.",
      "Why IT chooses the UAE",
      "• Free zones for technology (DIC, IFZA, DMCC, ADGM for fintech).",
      "• 100% foreign ownership.",
      "• Tax advantages: 0% up to AED 375k profit; treaty network with the EU.",
      "• Talent & visas: fast-track residency for founders and teams.",
      "Registration process",
      "1) Choose a free zone; 2) Submit docs; 3) Incorporate (5–10 business days); 4) Bank & visas.",
      "Why work with ProLegall",
      "We guide founders through zone selection, tax-efficient structuring, banking, compliance, and visas so you can focus on growth."
    ]},
    ru:{title:"ОАЭ как платформа для европейских IT-компаний: от стартапа до глобального роста",lead:"Понятный путь для IT и SaaS из ЕС: репутация, банки и быстрый масштаб в Персидском заливе.",body:[
      "Для европейских IT-компаний выход за пределы ЕС — это поиск юрисдикции с инновациями, налоговой эффективностью и доступом к глобальным рынкам. ОАЭ стали одним из ведущих направлений для IT-бизнеса и стартапов.",
      "Почему IT выбирает ОАЭ",
      "• Тех-свободные зоны: DIC, IFZA, DMCC, ADGM (для финтеха).",
      "• 100% иностранное владение.",
      "• Налоговые преимущества и сеть DTT.",
      "• Быстрые визы для основателей и команды.",
      "Процесс регистрации",
      "1) Выбор зоны; 2) Документы; 3) Регистрация (5–10 раб. дней); 4) Банк и визы.",
      "Почему ProLegall",
      "Берём на себя выбор зоны, структуру, банки, комплаенс и визы — вы растёте, мы закрываем операцию."
    ]},
  },
  "bahrain-holdings": {
    en:{title:"Bahrain for European Holding and Investment Companies: A Cost-Effective Gateway to the Gulf",lead:"An efficient, lower-cost alternative in the Gulf for holdings and investment platforms.",body:[
      "When European businesses consider the Gulf, the UAE often comes first. Yet Bahrain is becoming an attractive alternative for holding and investment companies seeking efficiency and lower operating costs.",
      "Why Bahrain?",
      "• Cost-effective setup and maintenance.",
      "• Common law environment.",
      "• Strategic access to Saudi Arabia via GCC.",
      "• Focus on fintech and investment platforms.",
      "Registration process",
      "1) Select vehicle; 2) Provide docs; 3) Incorporation (7–14 business days); 4) Basic substance & filings.",
      "Why ProLegall",
      "We deliver end-to-end incorporation and administration in Bahrain with legal and tax clarity."
    ]},
    ru:{title:"Бахрейн для европейских холдингов и инвесткомпаний: доступный вход в Персидский залив",lead:"Экономичный вариант в регионе Залива для холдингов и инвестиционных компаний.",body:[
      "Часто на первом месте — ОАЭ, но Бахрейн становится привлекательной альтернативой для холдингов и инвестструктур с упором на эффективность и низкие издержки.",
      "Почему Бахрейн?",
      "• Более низкие стоимость регистрации и сопровождения.",
      "• Англо-правовая система.",
      "• Доступ к Саудовской Аравии через соглашения GCC.",
      "• Фокус на финтех и инвестиции.",
      "Процесс регистрации",
      "1) Выбор формы; 2) Документы; 3) Регистрация (7–14 раб. дней); 4) Базовый substance и отчётность.",
      "Почему ProLegall",
      "Мы обеспечиваем полную прозрачность и администрирование холдингов в Бахрейне от А до Я."
    ]},
  },
};

const I18N = {
  en:{send:"Send",contact_consent:"By sending, you agree to the privacy policy.",about_title:"About ProLegall",about_intro:"We are a boutique legal firm focused on international business structuring, family & inheritance law, migration and compliance. We support clients in Europe and the Gulf, creating transparent, bank-ready solutions from day one.",about_highlight_juris:"jurisdictions",about_highlight_cases:"successful cases",about_highlight_years:"years of practice",about_approach_title:"Approach",about_approach_b1:"Pre-start analysis: we check sanctions risks, bank acceptability and substance requirements.",about_approach_b2:"Compliance-by-design: documents and structure are prepared to pass future checks.",about_approach_b3:"Step-by-step delivery: fast task execution and ongoing support.",about_team_title:"Team",about_team_text:"A compact cross-jurisdiction team; we involve local licensed advisors where required.",
    nav_services:"Services",nav_blog:"Blog",nav_about:"About",nav_cases:"Blog",nav_contact:"Contact",nav_privacy:"Privacy",nav_consult:"Consultation",more:"More",confidential:"Confidential",
    terms_title:"Terms of Service",terms_intro:"These terms govern the provision of legal services by ProLegall.",terms_1_title:"1. Subject",terms_1_text:"We provide consulting and representative services according to the agreed scope and estimate.",terms_2_title:"2. Payment",terms_2_text:"Fixed fee or hourly rate. Advance payment is required before work begins.",terms_3_title:"3. Confidentiality",terms_3_text:"Information received from the client will not be disclosed without consent, except as required by law.",terms_4_title:"4. Liability",terms_4_text:"Liability is limited to the amount of fees actually paid for the relevant stage of work.",
    privacy_title:"Privacy Policy",privacy_intro:"This policy describes what data we collect, how we use it, and how we ensure its security.",privacy_1_title:"1. Data collection",privacy_1_text:"We collect contact details (name, email, phone) and project information you provide in forms.",privacy_2_title:"2. Use",privacy_2_text:"The data is used for communication, preparing proposals, and providing services. It is not shared with third parties without legal basis.",privacy_3_title:"3. Storage and security",privacy_3_text:"We apply organizational and technical security measures. Retention periods comply with contract and law requirements.",privacy_4_title:"4. Your rights",privacy_4_text:"You can request access, correction, or deletion of your data: ",privacy_contact:"contact us",
    hero_badge:"European perspective • Middle East Growth • Asian Opportunities",hero_title:"International structuring, inheritance and company registration —",hero_title_em:" simple and safe",hero_p:"We help entrepreneurs open and protect business in the Europe, Middle East And beyond. Fast, transparent and risk-aware.",hero_start:"Start project",hero_services_btn:"Services & pricing",hero_sla:"Reply within 2 hours on business days",hero_b1:"Compliance-by-design",hero_b2:"20+ jurisdictions",hero_b3:"50+ successful cases",hero_quick:"Quick request",hero_name:"Your name",hero_email:"Email",hero_phone:"Phone / WhatsApp",hero_task:"Briefly about the task (e.g., DMCC holding)",hero_send:"Send",hero_consent:"By sending, you agree to the privacy policy.",
    vp1_title:"Legal safety",vp1_text:"We comply with KYC/AML and regulator requirements from day one.",vp2_title:"International reach",vp2_text:"Lithuania, Cyprus, UAE, Bahrain, Singapore, Hong Kong and other jurisdictions.",vp3_title:"Tailored approach",vp3_text:"Solutions for the owner’s goals, not for templates.",vp4_title:"Reputation & speed",vp4_text:"Short timelines without compromising quality.",
    services_title:"Our services",
    svc_incorp_title:"Company incorporation",svc_incorp_desc:"Opening, bank, substance, ongoing support.",svc_family_title:"Family & inheritance law",svc_family_desc:"Prenups, trusts, foundations, succession matters.",svc_contracts_title:"Contracts & support",svc_contracts_desc:"Cross-border contracts, compliance, corporate law.",svc_tax_title:"Holdings & Foundations",svc_tax_desc:"Holdings, funds, incentives, DTTs.",svc_disputes_title:"Migration services",svc_disputes_desc:"Residency and visa support for enterpreneurs.",svc_compliance_title:"Compliance support",svc_compliance_desc:"Policies, procedures, audit readiness.",
    stats_juris:"Jurisdictions",stats_cases:"Cases",stats_saved:"Saved for clients",stats_first:"First reply",
    quiz_title:"Jurisdiction in One Minute",quiz_desc:"Answer 6–8 simple questions and get a first route: suitable zones, ballpark fees and substance requirements.",quiz_step1:"Jurisdiction",quiz_step2:"Tax goal",quiz_step3:"Bank",quiz_step4:"Timing",quiz_take:"Take the test",quiz_example:"See example",quiz_preview:"Preview result",quiz_suitable:"Suitable: DMCC, IFZA",quiz_uae:"UAE",quiz_fees:"Fee estimate",quiz_fees_line:"Incorporation: $3.5–6k • Bank: 2–4 weeks",quiz_req:"Requirements",quiz_r1:"Substance: flex (office on demand)",quiz_r2:"Resident director: not required",quiz_r3:"KYC: standard",quiz_get:"Get detailed report",
    cases_title:"Recent projects",case1_tag:"DMCC",case1_title:"E-commerce holding",case1_text:"EU VAT + PSP, compliance, bank accounts.",case2_tag:"Foundation",case2_title:"Family foundation for succession",case2_text:"Ownership across 3 countries, control and protection.",case3_tag:"M&A",case3_title:"Cross-border transaction",case3_text:"SPA, sanctions clauses, escrow.",
    reviews_title:"Blog",rev1_text:"In practice — very fast and precise, checklist-driven. Bank opened with zero stress.",rev1_name:"Alina, IT agency owner",rev2_text:"They helped with UAE structure and EU VAT. We’re scaling now.",rev2_name:"Oleg, e-commerce",rev3_text:"Succession scenarios were carefully prepared in advance.",rev3_name:"N. Family Office",
    footer_contacts:"Contacts",footer_nav:"Navigation",footer_legal:"Legal",privacy:"",terms:"Terms of Service",footer_intro:"International company structuring, family wealth and inheritance planning, global mobility solutions.",contacts_title:"Contacts",write_us:"Write to us",details_contact:"Details & contact",location_vilnius:"Vilnius, Lithuania",
  },
  ru:{send:"Отправить",contact_consent:"Отправляя, вы соглашаетесь с политикой конфиденциальности.",about_title:"О компании ProLegall",about_intro:"Мы — бутиковая юридическая компания, оказывающая услуги в области международного структурирования бизнеса, семейного и наследственного права, миграции и комплаенса. Мы сопровождаем клиентов в Европе и странах Персидского залива, создавая прозрачные решения, соответствующие требованиям банков и регуляторов с самого первого шага.",about_highlight_juris:"юрисдикций",about_highlight_cases:"успешных кейсов",about_highlight_years:"лет практики",about_approach_title:"Подход",about_approach_b1:"Аналитика перед стартом: проверяем санкционные риски, банковскую приемлемость и требования к substance.",about_approach_b2:"Комплаенс-by-design: документы и структура готовятся с учётом будущих проверок.",about_approach_b3:"Наш подход — шаг за шагом: быстрое решение задач и комплексное сопровождение.",about_team_title:"Команда",about_team_text:"Небольшая кросс-юрисдикционная команда, привлекаем локальных консультантов там, где нужен лицензированный представитель.",
    nav_blog:"Блог",quiz_title:"Юрисдикция за одну минуту",location_vilnius:"Вильнюс, Литва",
    privacy_title:"Политика конфиденциальности",privacy_intro:"Эта политика описывает, какие данные мы собираем, как используем и как обеспечиваем их безопасность.",privacy_1_title:"1. Сбор данных",privacy_1_text:"Мы собираем контактные данные (имя, email, телефон) и сведения о проекте, которые вы указываете в формах.",privacy_2_title:"2. Использование",privacy_2_text:"Данные используются для коммуникации, подготовки предложений и оказания услуг. Не передаются третьим лицам без правового основания.",privacy_3_title:"3. Хранение и безопасность",privacy_3_text:"Применяем организационные и технические меры защиты. Сроки хранения соответствуют требованиям договора и закона.",privacy_4_title:"4. Ваши права",privacy_4_text:"Вы можете запросить доступ, исправление или удаление данных: ",privacy_contact:"связаться с нами",
    terms_title:"Условия оказания услуг",terms_intro:"Настоящие условия регулируют порядок оказания юридических услуг ProLegall.",terms_1_title:"1. Предмет",terms_1_text:"Мы оказываем консультационные и представительные услуги по согласованному ТЗ и смете.",terms_2_title:"2. Оплата",terms_2_text:"Фиксированная стоимость или почасовая ставка. Аванс обязателен до начала работ.",terms_3_title:"3. Конфиденциальность",terms_3_text:"Информация, полученная от клиента, не раскрывается без его согласия, за исключением предусмотренных законом случаев.",terms_4_title:"4. Ответственность",terms_4_text:"Ответственность ограничивается размером фактически уплаченного вознаграждения за соответствующий этап работ.",
    nav_services:"Услуги",nav_about:"О компании",nav_cases:"Блог",nav_contact:"Контакты",nav_privacy:"Политика",nav_consult:"Консультация",more:"Подробнее",confidential:"Конфиденциально",
    hero_badge:"Европейская Перспектива • Рост Ближнего Востока • Возможности Азии",hero_title:"Международное структурирование, наследование и регистрация компаний —",hero_title_em:" просто и безопасно",hero_p:"Мы помогаем предпринимателям открыть и защитить бизнес как в Европе, так и в странах Персидского залива. Работаем быстро, прозрачно и с вниманием к рискам.",hero_start:"Начать проект",hero_services_btn:"Услуги и цены",hero_sla:"Ответим в течение 2 часов в будни",hero_b1:"Комплаенс-by-design",hero_b2:"20+ юрисдикций",hero_b3:"50+ успешных кейсов",hero_quick:"Быстрый запрос",hero_name:"Ваше имя",hero_email:"Email",hero_phone:"Телефон / WhatsApp",hero_task:"Кратко о задаче (напр. DMCC холдинг)",hero_send:"Отправить",hero_consent:"Отправляя, вы соглашаетесь с политикой конфиденциальности.",
    vp1_title:"Юридическая безопасность",vp1_text:"Соблюдаем KYC/AML и требования регуляторов с первого шага.",vp2_title:"Международный охват",vp2_text:"Литва, Кипр, ОАЭ, Бахрейн, Сингапур, Гонконг и другие юрисдикции.",vp3_title:"Индивидуальный подход",vp3_text:"Решения под задачи клиентa, а не под шаблон.",vp4_title:"Репутация и скорость",vp4_text:"Быстрые сроки без компромисса к качеству.",
    services_title:"Наши услуги",
    svc_incorp_title:"Регистрация компаний",svc_incorp_desc:"Регистрация компании, банковское сопровождение, substance и поддержка.",svc_family_title:"Семейное и наследственное право",svc_family_desc:"Брачные контракты, трасты, наследственные дела.",svc_contracts_title:"Договоры и сопровождение",svc_contracts_desc:"Разрабатываем и адаптируем договоры для международной торговли и корпоративных проектов на русском и английском языках.",svc_tax_title:"Структуры и налоги",svc_tax_desc:"Создание фондов и холдингов, международные налоговые решения.",svc_disputes_title:"Миграция",svc_disputes_desc:"Миграционные решения: ВНЖ, золотые и стартап-визы",svc_compliance_title:"Комплаенс сопровождение",svc_compliance_desc:"Политики, процедуры, подготовка к проверкам.",
    stats_juris:"Юрисдикций",stats_cases:"Кейсов",stats_saved:"Сэкономлено клиентам",stats_first:"На первый ответ",
    quiz_desc:"Ответьте на 6–8 простых вопросов и получите первичный маршрут: подходящие зоны, ориентировочные сборы и требования к substance.",quiz_step1:"Юрисдикция",quiz_step2:"Налоговая цель",quiz_step3:"Банк",quiz_step4:"Сроки",quiz_take:"Пройти тест",quiz_example:"Смотреть пример",quiz_preview:"Превью результата",quiz_suitable:"Подойдут: DMCC, IFZA",quiz_uae:"ОАЭ",quiz_fees:"Оценка сборов",quiz_fees_line:"Регистрация: $3.5–6k • Банк: 2–4 недели",quiz_req:"Требования",quiz_r1:"Substance: flex (офис по требованию)",quiz_r2:"Директор-резидент: не требуется",quiz_r3:"KYC: стандартный",quiz_get:"Получить подробный отчёт",
    cases_title:"Недавние проекты",case1_tag:"DMCC",case1_title:"Холдинг для e-commerce в ОАЭ",case1_text:"Оптимизация НДС ЕС, платёжные провайдеры, комплаенс-процедуры.",case2_tag:"Фонд",case2_title:"Семейный фонд для наследования",case2_text:"Структура владения активами в 3 странах, контроль и защита.",case3_tag:"M&A",case3_title:"Сделка по трансграничному контракту",case3_text:"Договорная база, санкционные проверки, KYC контрагента.",
    reviews_title:"Блог",
    cta_title:"",cta_text:"",send:"Отправить",
    footer_contacts:"Контакты",footer_nav:"Навигация",footer_legal:"Юридическое",privacy:"",terms:"Условия оказания услуг",footer_intro:"Международное структурирование компаний, планирование семейного капитала и наследства, решения для глобальной мобильности.",contacts_title:"Контакты",write_us:"Напишите нам",details_contact:"Реквизиты и связь",
  },
};

/* -------------------- SEO utilities -------------------- */
function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content || "");
}
function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}
function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = id; document.head.appendChild(el); }
  el.textContent = JSON.stringify(data);
}
function removeJsonLd(id) { const el = document.getElementById(id); if (el) el.remove(); }

function SEO({ title, description, path = "/", lang = "en", type = "website", image, robots }) {
  const loc = typeof window !== "undefined" ? window.location : { origin: "https://prolegall.com" };
  const url = (loc.origin || "https://prolegall.com") + path;
  const site = "ProLegall";
  const img = image || (loc.origin ? `${loc.origin}/og-default.jpg` : "https://prolegall.com/og-default.jpg");
  const locale = lang === "ru" ? "ru_RU" : "en_US";

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots || "index,follow");

    upsertLink("canonical", url);

    // Open Graph
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", site);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:locale", locale);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, lang, type, image, robots]);
  return null;
}


/* -------------------- UI primitives -------------------- */
function Button({ children, variant="primary", className="", size="md", as:As="button", ...props }) {
  const base="inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-2xl";
  const sizes={sm:"px-3 py-2 text-sm",md:"px-4 py-2",lg:"px-5 py-3 text-base"};
  const variants={
    primary:"bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300",
    secondary:"border bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-300 dark:bg-white/15 dark:text-white dark:border-white/20 dark:hover:bg-white/25 dark:focus:ring-white",
    ghost:"bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
    amber:"bg-amber-500 text-black hover:bg-amber-400 focus:ring-amber-300",
    outline:"border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
  };
  return <As className={cx(base,sizes[size],variants[variant],className)} {...props}>{children}</As>;
}
function Card({ className="", children }) { return <div className={cx("rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700",className)}>{children}</div>; }
const CardHeader=({children,className=""})=><div className={cx("px-6 pt-6",className)}>{children}</div>;
const CardTitle=({children,className=""})=><h4 className={cx("font-semibold",className)}>{children}</h4>;
const CardContent=({children,className=""})=><div className={cx("px-6 pb-6",className)}>{children}</div>;
const Input=({className="",...p})=><input className={cx("w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 dark:text-gray-100",className)} {...p} />;
const Textarea=({className="",...p})=><textarea className={cx("w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 dark:text-gray-100 min-h-[120px]",className)} {...p} />;
const Badge=({children,className=""})=><span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",className)}>{children}</span>;

/* -------------------- animations -------------------- */
const container={hidden:{opacity:0,y:12},show:{opacity:1,y:0,transition:{staggerChildren:0.06,duration:0.5,ease:"easeOut"}}};
const item={hidden:{opacity:0,y:10},show:{opacity:1,y:0,transition:{duration:0.4}}};

/* -------------------- shared -------------------- */
function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="ProLegall home">
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 shadow-lg grid place-items-center"><Scale className="h-5 w-5 text-white"/></div>
      <div className="leading-tight">
        <div className="text-lg font-semibold tracking-tight">PROLEGALL</div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Global Legal Advisory</div>
      </div>
    </Link>
  );
}
function ThemeToggle() {
  const [isDark,setIsDark]=useState(()=>document.documentElement.classList.contains("dark"));
  const toggle=()=>{const el=document.documentElement;const next=!el.classList.contains("dark");el.classList.toggle("dark",next);localStorage.setItem("theme",next?"dark":"light");setIsDark(next);};
  return (
    <button onClick={toggle} className="p-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label={isDark?"Switch to light mode":"Switch to dark mode"} title={isDark?"Light mode":"Dark mode"}>
      {isDark?<Sun className="h-5 w-5"/>:<Moon className="h-5 w-5"/>}
    </button>
  );
}
function TopNav({ t, lang, setLang }) {
  const [open,setOpen]=useState(false);
  const { pathname }=useLocation();
  useEffect(()=>{setOpen(false);},[pathname]);
  useEffect(()=>{const onResize=()=>setOpen(false);window.addEventListener("resize",onResize);return()=>window.removeEventListener("resize",onResize);},[]);
  const NAV=[{to:"/services",label:t("nav_services","Услуги")},{to:"/about",label:t("nav_about","О компании")},{to:"/blog",label:t("nav_blog","Блог")},{to:"/contact",label:t("nav_contact","Контакты")}];
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 dark:bg-gray-900/70 border-b dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <Logo/>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map(n=>(
              <NavLink key={n.to} to={n.to} className={({isActive})=>cx("hover:text-purple-700",isActive&&"text-purple-700 font-medium")}>{n.label}</NavLink>
            ))}
            <NavLink to="/privacy" className={({isActive})=>cx("hover:text-purple-700",isActive&&"text-purple-700 font-medium")}>{t("nav_privacy","Политика")}</NavLink>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button as={Link} to="/contact" className="rounded-2xl">{t("nav_consult","Консультация")}</Button>
            <ThemeToggle/><LangSelect lang={lang} setLang={setLang}/>
          </div>
          <button className="md:hidden p-2 rounded-xl border" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">{open?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}</button>
        </div>
        {open&&(
          <div className="md:hidden mt-3 grid gap-2 text-sm">
            {NAV.map(n=>(
              <Link key={n.to} to={n.to} className="rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">{n.label}</Link>
            ))}
            <Link to="/privacy" className="rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">{t("nav_privacy","Политика")}</Link>
            <div className="flex gap-2 pt-2">
              <Button as={Link} to="/contact" className="flex-1">{t("nav_consult","Консультация")}</Button>
              <ThemeToggle/><LangSelect lang={lang} setLang={setLang}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const Page=({children})=><div className="min-h-[60vh]">{children}</div>;

function Footer({ t }) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div><Logo/><p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs">{t("footer_intro","Международное структурирование компаний, планирование семейного капитала и наследства, решения для глобальной мобильности.")}</p></div>
          <div>
            <div className="font-semibold mb-3">{t("footer_contacts","Контакты")}</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> info@prolegall.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> WhatsApp / Telegram: +370 619 70610</li>
              <a href="https://www.linkedin.com/company/prolegall/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4"/><span>LinkedIn</span></a>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {t("location_vilnius","Vilnius, Lithuania")}</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">{t("footer_nav","Навигация")}</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-purple-700">{t("nav_services","Услуги")}</Link></li>
              <li><Link to="/about" className="hover:text-purple-700">{t("nav_about","О компании")}</Link></li>
              <li><Link to="/blog" className="hover:text-purple-700">{t("nav_cases","Блог")}</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-700">{t("nav_privacy","Политика")}</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">{t("footer_legal","Юридическое")}</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-purple-700">{t("privacy","")}</Link></li>
              <li><Link to="/terms" className="hover:text-purple-700">{t("terms","Условия оказания услуг")}</Link></li>
              <li>© {new Date().getFullYear()} ProLegall</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- sections & pages -------------------- */
function HomeHero({ t }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-orange-600"/>
      <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl"/>
      <div className="absolute -bottom-24 -left-32 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div variants={item} className="lg:col-span-7 text-gray-900 dark:text-white">
            <Badge className="bg-amber-500/90 text-black mb-4">{t("hero_badge","Европейская Перспектива • Рост Ближнего Востока • Возможности Азии")}</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              {t("hero_title","Международное структурирование, наследование и регистрация компаний —")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-gray-900 dark:from-amber-300 dark:to-white">
                {t("hero_title_em"," просто и безопасно")}
              </span>
            </h1>
            <p className="mt-5 text-lg text-gray-700 dark:text-white/90 max-w-2xl">{t("hero_p","Мы помогаем предпринимателям открыть и защитить бизнес как в Европе, так и в странах Персидского залива. Работаем быстро, прозрачно и с вниманием к рискам.")}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/contact" size="lg" variant="amber" className="rounded-2xl">{t("hero_start","Начать проект")} <ArrowRight className="ml-2 h-4 w-4"/></Button>
              <Button as={Link} to="/services" size="lg" variant="secondary" className="rounded-2xl">{t("hero_services_btn","Услуги и цены")}</Button>
              <div className="text-sm text-gray-600 dark:text-white/80">{t("hero_sla","Ответим в течение 2 часов в будни")}</div>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-gray-700 dark:text-white/80">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> {t("hero_b1","Комплаенс-by-design")}</div>
              <div className="flex items-center gap-2"><Globe2 className="h-4 w-4"/> {t("hero_b2","20+ юрисдикций")}</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4"/> {t("hero_b3","50+ успешных кейсов")}</div>
            </div>
          </motion.div>
          <motion.div variants={item} className="lg:col-span-5">
            <div className="rounded-2xl border bg-white text-gray-900 backdrop-blur-md border-gray-200 dark:border-white/20 dark:bg-white/10 dark:text-white">
              <CardHeader><CardTitle className="text-gray-900 dark:text-white">{t("hero_quick","Быстрый запрос")}</CardTitle></CardHeader>
              <CardContent>
                <form action="https://formsubmit.co/info@prolegall.com" method="POST" className="space-y-3">
                  <input type="hidden" name="_subject" value="Quick request: prolegall.com"/><input type="hidden" name="_captcha" value="false"/><input type="hidden" name="_template" value="table"/>
                  <input type="hidden" name="_next" value={(typeof window!=="undefined"?window.location.origin:"")+"/contact?sent=1"}/>
                  <Input name="name" required placeholder={t("hero_name","Ваше имя")} className="bg-white/95" aria-label={t("hero_name","Ваше имя")}/>
                  <Input name="email" required type="email" placeholder={t("hero_email","Email")} className="bg-white/95" aria-label="Email"/>
                  <Input name="phone" placeholder={t("hero_phone","Телефон / WhatsApp")} className="bg-white/95" aria-label="Телефон"/>
                  <Input name="message" placeholder={t("hero_task","Кратко о задаче (напр. DMCC холдинг)")} className="bg-white/95" aria-label="Задача"/>
                  <Button type="submit" className="w-full rounded-2xl bg-amber-500 text-black hover:bg-amber-400">{t("hero_send","Отправить")}</Button>
                  <p className="text-xs text-gray-600 dark:text-white/80">{t("hero_consent","Отправляя, вы соглашаетесь с политикой конфиденциальности.")}</p>
                </form>
              </CardContent>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
function ValueProps({ t }) {
  const items=[{icon:<ShieldCheck className="h-5 w-5"/>,title:t("vp1_title","Юридическая безопасность"),text:t("vp1_text","Соблюдаем KYC/AML и требования регуляторов с первого шага.")},
    {icon:<Globe2 className="h-5 w-5"/>,title:t("vp2_title","Международный охват"),text:t("vp2_text","Литва, Кипр, ОАЭ, Бахрейн, Сингапур, Гонконг и другие юрисдикции.")},
    {icon:<Users2 className="h-5 w-5"/>,title:t("vp3_title","Индивидуальный подход"),text:t("vp3_text","Решения под задачи клиентa, а не под шаблон.")},
    {icon:<Award className="h-5 w-5"/>,title:t("vp4_title","Репутация и скорость"),text:t("vp4_text","Быстрые сроки без компромисса к качеству.")}];
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-4">
          {items.map((it,i)=>(
            <Card key={i}><CardContent className="p-6">
              <div className="h-10 w-10 rounded-2xl bg-purple-600/10 text-purple-700 grid place-items-center mb-4">{it.icon}</div>
              <div className="font-semibold mb-1">{it.title}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{it.text}</p>
            </CardContent></Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function ServicesGrid({ t }) {
  const items=[
    {icon:<Building2 className="h-5 w-5"/>,title:t("svc_incorp_title","Регистрация компаний"),text:t("svc_incorp_desc","Регистрация компании, банковское сопровождение, substance и поддержка."),to:"/services?tab=incorporation"},
    {icon:<ScrollText className="h-5 w-5"/>,title:t("svc_family_title","Семейное и наследственное право"),text:t("svc_family_desc","Брачные контракты, трасты, наследственные дела."),to:"/services?tab=family"},
    {icon:<FileText className="h-5 w-5"/>,title:t("svc_contracts_title","Договоры и сопровождение"),text:t("svc_contracts_desc","Разрабатываем и адаптируем договоры для международной торговли и корпоративных проектов на русском и английском языках."),to:"/services?tab=contracts"},
    {icon:<Landmark className="h-5 w-5"/>,title:t("svc_tax_title","Структуры и налоги"),text:t("svc_tax_desc","Создание фондов и холдингов, международные налоговые решения."),to:"/services?tab=tax"},
    {icon:<Gavel className="h-5 w-5"/>,title:t("svc_disputes_title","Миграция"),text:t("svc_disputes_desc","Миграционные решения: ВНЖ, золотые и стартап-визы"),to:"/services?tab=disputes"},
    {icon:<ShieldCheck className="h-5 w-5"/>,title:t("svc_compliance_title","Комплаенс сопровождение"),text:t("svc_compliance_desc","Политики, процедуры, подготовка к проверкам."),to:"/services?tab=compliance"},
  ];
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("services_title","Наши услуги")}</h2>
          <Button as={Link} to="/services" variant="ghost" className="hidden md:inline-flex rounded-xl">{t("more","Подробнее")} <ChevronRight className="ml-1 h-4 w-4"/></Button>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it,i)=>(
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-orange-600 grid place-items-center">{it.icon}</div>
                  <div className="font-semibold">{it.title}</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{it.text}</p>
                <Button as={Link} to={it.to} variant="ghost" className="rounded-xl px-3">{t("more","Подробнее")} <ChevronRight className="ml-1 h-4 w-4"/></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function Stats({ t }) {
  const stats=[{k:"20+",v:t("stats_juris","Юрисдикций")},{k:"50+",v:t("stats_cases","Кейсов")},{k:"$1.3M",v:t("stats_saved","Сэкономлено клиентам")},{k:"2h",v:t("stats_first","На первый ответ")}];
  return (
    <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-orange-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s,i)=>(
            <div key={i} className="text-center">
              <div className="text-3xl font-semibold">{s.k}</div>
              <div className="text-sm text-white/90">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function SecretPage() {
  const [count,setCount]=useState(null); const [err,setErr]=useState("");
  useEffect(()=>{const COUNT_NS=window.location.hostname.endsWith("prolegall.com")?"prolegall.com":"prolegall.dev";
    const getCount=()=>fetch(`https://api.countapi.xyz/get/${COUNT_NS}/site_visits`,{mode:"cors",credentials:"omit",cache:"no-store"})
      .then(r=>r.ok?r.json():Promise.reject(r)).then(d=>setCount(typeof d.value==="number"?d.value:0));
    getCount().catch(()=>fetch(`https://api.countapi.xyz/create?namespace=${COUNT_NS}&key=site_visits&value=0`,{mode:"cors",credentials:"omit",cache:"no-store"}).then(()=>getCount()).catch(()=>setErr("N/A")));
  },[]);
  return (<Page><div className="min-h-[60vh] grid place-items-center"><div className="text-center"><div className="text-7xl font-bold tabular-nums">{count??(err||"…")}</div></div></div></Page>);
}
function QuizTeaser({ t }) {
  const steps=[t("quiz_step1","Юрисдикция"),t("quiz_step2","Налоговая цель"),t("quiz_step3","Банк"),t("quiz_step4","Сроки")];
  return (
    <section id="quiz" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl font-semibold">{t("quiz_title","Jurisdiction in One Minute")}</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl">{t("quiz_desc","Ответьте на 6–8 простых вопросов и получите первичный маршрут: подходящие зоны, ориентировочные сборы и требования к substance.")}</p>
            <div className="mt-6 flex flex-wrap gap-2">{steps.map((s,i)=>(
              <div key={i} className="flex items-center gap-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl px-3 py-2 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700">
                <Check className="h-4 w-4 text-green-600"/> {s}
              </div>
            ))}</div>
            <div className="mt-6 flex gap-3"><Button as={Link} to="/quiz" className="rounded-2xl">{t("quiz_take","Пройти тест")}</Button><Button variant="ghost" className="rounded-2xl">{t("quiz_example","Смотреть пример")}</Button></div>
          </div>
          <div className="lg:col-span-6">
            <Card className="dark:bg-gray-900 dark:border-gray-800">
              <CardHeader><CardTitle className="dark:text-gray-100">{t("quiz_preview","Превью результата")}</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30">
                  <div className="flex items-center gap-2 font-medium text-purple-700 dark:text-purple-200"><Building2 className="h-4 w-4 text-purple-700 dark:text-purple-300"/>{t("quiz_suitable","Подойдут: DMCC, IFZA")}</div>
                  <Badge className="bg-amber-200 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200">{t("quiz_uae","ОАЭ")}</Badge>
                </div>
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-amber-900/20">
                  <div className="font-medium mb-1 text-amber-900/80 dark:text-amber-100">{t("quiz_fees","Оценка сборов")}</div>
                  <div className="text-gray-600 dark:text-gray-200">{t("quiz_fees_line","Регистрация: $3.5–6k • Банк: 2–4 недели")}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/70">
                  <div className="font-medium mb-1 text-gray-900/80 dark:text-gray-100">{t("quiz_req","Требования")}</div>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-200">
                    <li>{t("quiz_r1","Substance: flex (офис по требованию)")}</li>
                    <li>{t("quiz_r2","Директор-резидент: не требуется")}</li>
                    <li>{t("quiz_r3","KYC: стандартный")}</li>
                  </ul>
                </div>
                <Button as={Link} to="/contact" className="w-full rounded-2xl">{t("quiz_get","Получить подробный отчёт")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
function CasesList({ t }) {
  const items=[{tag:t("case1_tag","DMCC"),title:t("case1_title","Холдинг для e-commerce в ОАЭ"),text:t("case1_text","Оптимизация НДС ЕС, платёжные провайдеры, комплаенс-процедуры.")},
    {tag:t("case2_tag","Фонд"),title:t("case2_title","Семейный фонд для наследования"),text:t("case2_text","Структура владения активами в 3 странах, контроль и защита.")},
    {tag:t("case3_tag","M&A"),title:t("case3_title","Сделка по трансграничному контракту"),text:t("case3_text","Договорная база, санкционные проверки, KYC контрагента.")}];
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">{t("cases_title","Недавние проекты")}</h2>
          <Button as={Link} to="/cases" variant="ghost" className="hidden md:inline-flex rounded-xl">{t("more","Все кейсы")} <ChevronRight className="ml-1 h-4 w-4"/></Button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {items.map((it,i)=>(
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm px-2 py-1 rounded-full bg-amber-100 text-amber-900">{it.tag}</div>
                  <div className="text-xs text-gray-500">{t("confidential","Конфиденциально")}</div>
                </div>
                <div className="font-semibold mb-1">{it.title}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{it.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
function LHelper(lang){return (en,ru)=>lang==="ru"?ru:en;}
function JurisdictionInOneMinute({ t, lang }) {
  const L=LHelper(lang);
  const steps=[{key:"goal",label:L("Registration goal","Цель регистрации"),required:true,options:[
      {value:"operate",label:L("Operating company (services/trading)","Операционная компания (услуги/торговля)")},
      {value:"holding",label:L("Holding / investments","Холдинг / инвестиции")},
      {value:"fintech",label:L("Fintech / regulated services","Финтех / регулируемые услуги")},
      {value:"consulting",label:L("Consulting / IT / digital","Консалтинг / IT / цифровые услуги")},
    ]},
    {key:"region",label:L("Preferred region","Предпочтительный регион"),required:true,options:[
      {value:"eu",label:L("Europe","Европа")},{value:"gulf",label:L("Gulf (UAE, Bahrain, Oman, Qatar)","Персидский залив (ОАЭ, Бахрейн, Оман, Катар)")},
      {value:"asia",label:L("Asia (Singapore, Malaysia)","Азия (Сингапур, Малайзия)")},{value:"cis",label:L("CIS countries","Страны СНГ")} ]},
    {key:"priority",label:L("Key priority","Ключевой приоритет"),required:true,options:[
      {value:"tax",label:L("Tax efficiency","Налоговая эффективность")},{value:"reputation",label:L("Reputation & bank access","Репутация и доступ к банкам")},
      {value:"speed",label:L("Speed & simplicity","Скорость и простота запуска")},{value:"eu_access",label:L("EU access & transparency","Доступ к ЕС и прозрачность")} ]},
    {key:"presence",label:L("On-site presence/staff?","Планируете сотрудников/присутствие на месте?"),required:true,options:[
      {value:"none",label:L("No, fully remote","Нет, полностью удалённо")},{value:"few",label:L("1–3 people / minimal presence","1–3 человека / минимальное присутствие")},{value:"many",label:L("4+ staff / office","4+ сотрудников / офис")} ]},
    {key:"timeline",label:L("Launch timing","Сроки запуска"),required:true,options:[
      {value:"fast",label:L("Up to 2 weeks","До 2 недель")},{value:"normal",label:L("2–6 weeks","2–6 недель")},{value:"flex",label:L("OK to wait 6+ weeks","Готов ждать более 6 недель")} ]},
    {key:"industry",label:L("Industry","Сфера деятельности"),required:true,options:[
      {value:"it",label:L("IT / digital services","IT / цифровые услуги")},{value:"trading",label:L("Trading / logistics","Торговля / логистика")},{value:"manufacturing",label:L("Manufacturing / equipment","Производство / оборудование")},{value:"investments",label:L("Investments / holding","Инвестиции / холдинг")} ]},
    {key:"banking",label:L("Banking need","Банковская потребность"),required:true,options:[
      {value:"local",label:L("Need local bank account","Нужен местный банковский счёт")},{value:"fintech_ok",label:L("Fintech/international is OK","Подойдёт финтех/междунар. банк")},{value:"external",label:L("Account opened abroad","Счёт открыт за рубежом")} ]},
    {key:"budget",label:L("Budget for setup + first year","Бюджет на запуск и первый год сопровождения"),required:true,options:[
      {value:"5-10",label:"€5 000 – €10 000"},{value:"10-20",label:"€10 000 – €20 000"},{value:"20-40",label:"€20 000 – €40 000"},{value:"40+",label:"€40 000+"} ]},
  ];
  const JURIS={eu:{lite:[{code:"LT-MB",name:L("Lithuania (MB)","Литва (MB)"),why:L("EU access, transparency, fast for IT/services","Доступ к ЕС, прозрачность, быстрый запуск для услуг и IT"),budget:"€5k–€10k"},
      {code:"EE-OU",name:L("Estonia (OÜ)","Эстония (OÜ)"),why:L("E-governance, convenient for remote IT/consulting","Электронное управление, удобно для удалённых IT/консалтинга"),budget:"€5k–€10k"}],
    plus:[{code:"CY-LTD",name:L("Cyprus (LTD)","Кипр (LTD)"),why:L("Holdings, dividends, treaty network, reputation","Холдинги, дивиденды, договорная сеть, хорошая репутация"),budget:"€10k–€20k"}]},
    gulf:{lite:[{code:"UAE-FZ",name:L("UAE (Free Zone: IFZA / RAKEZ / Meydan)","ОАЭ (Free Zone: IFZA / RAKEZ / Meydan)"),why:L("Fast launch for services & e-commerce, flexible","Быстрый запуск услуг и e-commerce, гибкость"),budget:"€5k–€10k"},
      {code:"BHR-CR",name:L("Bahrain (CR)","Бахрейн (CR)"),why:L("Reputable for finance/investment structures, local banks","Репутация для финансовых/инвест. структур, локальные банки"),budget:"€10k–€20k"}],
    plus:[{code:"UAE-DMCC",name:L("UAE (DMCC)","ОАЭ (DMCC)"),why:L("Trading/commodities, prestige, ecosystem","Торговля/коммодитиз, престиж, экосистема"),budget:"€10k–€20k"},
      {code:"OMN-LLC",name:L("Oman (LLC)","Оман (LLC)"),why:L("For physical presence and manufacturing","При физическом присутствии и производстве"),budget:"€20k–€40k"},
      {code:"QAT-LLC",name:L("Qatar (LLC)","Катар (LLC)"),why:L("Projects with local presence, contracting","Проекты с местным присутствием, контрактинг"),budget:"€20k–€40k"}]},
    asia:{lite:[{code:"MYS-SDN",name:L("Malaysia (Sdn Bhd)","Малайзия (Sdn Bhd)"),why:L("Cheaper than Singapore, services & trading","Бюджетнее Сингапура, услуги и трейдинг"),budget:"€10k–€20k"}],
      plus:[{code:"SG-PTE",name:L("Singapore (Pte Ltd)","Сингапур (Pte Ltd)"),why:L("High reputation, banking, holdings & IT","Высокая репутация, банки, холдинги и IT"),budget:"€20k–€40k"}]},
    cis:{lite:[{code:"KZ-LLP",name:L("Kazakhstan (LLP / AIFC)","Казахстан (ТОО / AIFC)"),why:L("Flexible jurisdiction for trading and IT","Гибкая юрисдикция для торговли и IT"),budget:"€5k–€10k"},
      {code:"AM-LLC",name:L("Armenia (LLC)","Армения (LLC)"),why:L("Good for services/IT, moderate requirements","Подходит для услуг/IT, умеренные требования"),budget:"€5k–€10k"}],plus:[]},
  };
  const computeRecommendation=(answers)=>{const {goal,region,priority,presence,timeline,industry,banking,budget}=answers;const picks=[];
    if(region==="eu"){if(goal==="holding"||priority==="reputation")picks.push(JURIS.eu.plus[0]); if(industry==="it"||goal==="consulting"||priority==="eu_access"||timeline==="fast")picks.push(...JURIS.eu.lite);}
    if(region==="gulf"){if(priority==="speed"||goal==="consulting"||industry==="it")picks.push(JURIS.gulf.lite[0]); if(priority==="reputation"||goal==="holding"||banking==="local")picks.push(JURIS.gulf.lite[1]); if(industry==="trading"||goal==="operate")picks.push(JURIS.gulf.plus[0]); if(presence!=="none"||industry==="manufacturing"){picks.push(JURIS.gulf.plus[1]);picks.push(JURIS.gulf.plus[2]);}}
    if(region==="asia"){if(priority==="reputation"||banking==="local")picks.push(JURIS.asia.plus[0]); if(priority==="tax"||priority==="speed"||budget==="10-20")picks.push(JURIS.asia.lite[0]);}
    if(region==="cis"){picks.push(...JURIS.cis.lite);}
    const uniq=[];const seen=new Set();for(const j of picks){if(!j)continue;if(!seen.has(j.code)){uniq.push(j);seen.add(j.code);}}
    const order=["5-10","10-20","20-40","40+"];const idx=Math.max(order.indexOf(answers.budget??"5-10"),0);
    const userBudgetText={ "5-10":L("from €5,000","от €5 000"),"10-20":L("from €10,000","от €10 000"),"20-40":L("from €20,000","от €20 000"),"40+":L("from €40,000","от €40 000")}[order[idx]];
    return { recommendations: uniq.slice(0,3), userBudgetText };
  };
  const [current,setCurrent]=useState(0); const [answers,setAnswers]=useState({}); const [showResult,setShowResult]=useState(false);
  const progress=Math.round((current/steps.length)*100);
  const canNext=useMemo(()=>{const step=steps[current];if(!step)return false;return !step.required||Boolean(answers[step.key]);},[current,answers]);
  const onPick=(k,v)=>setAnswers(p=>({...p,[k]:v})); const next=()=>{if(!canNext)return;if(current<steps.length-1){setCurrent(c=>c+1);window.scrollTo({top:0,behavior:"smooth"});}else{setShowResult(true);window.scrollTo({top:0,behavior:"smooth"});}};
  const back=()=>current>0&&setCurrent(c=>c-1); const reset=()=>{setCurrent(0);setAnswers({});setShowResult(false);};
  const result=useMemo(()=>computeRecommendation(answers),[answers]);
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold">{t("quiz_title","Юрисдикция за одну минуту")}</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">{t("quiz_desc","Ответьте на 8 коротких вопросов — получите 2–3 подходящие юрисдикции с ориентировочным бюджетом (от €5 000).")}</p>
      </div>
      {!showResult&&(
        <>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6"><div className="bg-indigo-600 h-2 rounded-full transition-all" style={{width:`${progress}%`}}/></div>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}} className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-5">
              <div className="mb-1 text-xs text-gray-500">{(lang==="ru"?"Вопрос":"Question")} {current+1} {(lang==="ru"?"из":"of")} {steps.length}</div>
              <h2 className="text-lg font-medium mb-4">{steps[current].label}</h2>
              <div className="space-y-3">
                {steps[current].options.map(opt=>(
                  <label key={opt.value} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${answers[steps[current].key]===opt.value?"border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20":"hover:border-gray-400"}`}>
                    <input type="radio" name={steps[current].key} className="form-radio accent-indigo-600" checked={answers[steps[current].key]===opt.value} onChange={()=>onPick(steps[current].key,opt.value)}/>
                    <span className="text-sm md:text-base">{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800" onClick={back} disabled={current===0}>{L("Back","Назад")}</button>
                <button className={`px-5 py-2.5 rounded-xl text-white ${canNext?"bg-indigo-600 hover:bg-indigo-700":"bg-gray-300 cursor-not-allowed"}`} onClick={next} disabled={!canNext}>
                  {current===steps.length-1?L("View result","Посмотреть результат"):L("Next","Далее")}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
      {showResult&&(
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.2}} className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xl font-semibold mb-2">{L("Your preliminary results","Ваши предварительные результаты")}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {L("Based on your answers we suggest options. Estimated budget ","На основе ответов мы подобрали варианты. Бюджет ориентировочно ")}
            {result.userBudgetText}
            {L(" (includes incorporation and basic first-year support)."," (включая регистрацию и базовое сопровождение на первый год).")}
          </p>
          <div className="grid gap-4">
            {result.recommendations.length===0&&(<div className="p-4 border rounded-2xl text-gray-700 dark:text-gray-200">
              {L("No exact matches yet. Try changing region/priority or contact us — we’ll tailor a route manually.","Пока нет точных совпадений. Попробуйте изменить регион или приоритеты, либо свяжитесь с нами — подберём решение вручную.")}
            </div>)}
            {result.recommendations.map(j=>(
              <div key={j.code} className="p-4 border rounded-2xl">
                <div className="flex items-center justify-between gap-3">
                  <div><div className="text-base md:text-lg font-medium">{j.name}</div><div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{j.why}</div></div>
                  <div className="text-sm md:text-base font-semibold whitespace-nowrap">{j.budget}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            <button className="px-4 py-3 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800" onClick={reset}>{L("Restart quiz","Пройти заново")}</button>
            <Link to="/contact" className="px-4 py-3 rounded-xl text-center text-white bg-indigo-600 hover:bg-indigo-700">{L("Get detailed estimate and timeline","Получить детальный расчёт и таймлайн")}</Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">{L("*This result is preliminary and not legal advice. Final scope, timing and cost depend on activity type, KYC/AML and banking procedures.","*Данный результат носит ориентировочный характер и не является юридической консультацией. Итоговые сроки, стоимость и требования зависят от вида деятельности, KYC/AML и банковских процедур.")}</p>
        </motion.div>
      )}
    </div>
  );
}
function Blog({ t, lang }) {
  const posts=[{slug:"startup-visa-lithuania"},{slug:"uae-for-eu-it"},{slug:"bahrain-holdings"}].map(p=>({...p,...BLOGS[p.slug][lang]}));
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">{t("reviews_title","Блог")}</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4 items-stretch">
          {posts.map(it=>(
            <Card key={it.slug} className="flex flex-col">
              <CardContent className="p-6 flex flex-col gap-3 grow">
                <div className="font-semibold text-lg">{it.title}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{it.lead}</p>
                <Link to={`/post?slug=${it.slug}`} className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 via-purple-700 to-orange-500 hover:opacity-90 transition">
                  {t("more","Подробнее")}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogRoute({ t, lang }) {
  return (
    <Page>
      <SEO
        title="Blog — International Structuring, UAE Free Zones, Startup Visa | ProLegall"
        description="Guides on EU & Gulf company formation, UAE free zones (DMCC, IFZA), Bahrain holdings, and Lithuania Startup Visa."
        path="/blog"
        lang={lang}
      />
      <Blog t={t} lang={lang} />
    </Page>
  );
}

function QuizPage({ t, lang }) { return (<Page><SEO
        title="Jurisdiction Quiz — Get a First Route in 1 Minute | ProLegall"
        description="Answer a few questions and get suggested jurisdictions, ballpark fees, and substance requirements."
        path="/quiz"
        lang={lang}
      /><section className="bg-gray-50 dark:bg-gray-900"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"><JurisdictionInOneMinute t={t} lang={lang}/></div></section></Page>); }
function CTA(){return null;}

function HomePage({ t, lang }) {
  // JSON-LD for the organization (home only)
  useEffect(() => {
    setJsonLd("ld-org", {
      "@context":"https://schema.org",
      "@type":"LegalService",
      "name":"ProLegall",
      "url":window.location.origin + "/",
      "logo":window.location.origin + "/logo.png",
      "address":{"@type":"PostalAddress","addressLocality":"Vilnius","addressCountry":"LT"},
      "email":"info@prolegall.com",
      "telephone":"+37061970610",
      "sameAs":["https://www.linkedin.com/company/prolegall/"]
    });
    return () => removeJsonLd("ld-org");
  }, []);

  return (
    <Page>
      <SEO
        title="International Company Formation, Holdings & Inheritance | ProLegall"
        description="Legal advisory for international structuring across EU & the Gulf: company incorporation, holdings, banking, inheritance & migration. Fast, compliant, bank-ready."
        path="/"
        lang={lang}
      />
      <HomeHero t={t}/>
      <ValueProps t={t}/>
      <ServicesGrid t={t}/>
      <Stats t={t}/>
      <QuizTeaser t={t}/>
      <CasesList t={t}/>
      <Blog t={t} lang={lang}/>
      <CTA t={t}/>
    </Page>
  );
}

function PostPage({ lang, t }) {
  const { search }=useLocation(); 
  const qs=new URLSearchParams(search); 
  const slug=qs.get("slug"); 
  const data=slug&&BLOGS[slug]?BLOGS[slug][lang]:null;
useEffect(() => {
    if (!data) { removeJsonLd("ld-article"); return; }
    const url = window.location.origin + `/post?slug=${slug}`;
    setJsonLd("ld-article", {
      "@context":"https://schema.org",
      "@type":"Article",
      "headline": data.title,
      "description": data.lead,
      "mainEntityOfPage": url,
      "author": {"@type":"Organization","name":"ProLegall"},
      "publisher":{"@type":"Organization","name":"ProLegall","logo":{"@type":"ImageObject","url":window.location.origin + "/logo.png"}},
      "inLanguage": lang === "ru" ? "ru" : "en"
    });
        return () => removeJsonLd("ld-article");
  }, [slug, lang, data]);



  if(!data) return <NotFoundPage/>;
  return (
    <Page>
         <SEO
        title={`${data.title} | ProLegall`}
        description={data.lead}
        path={`/post?slug=${slug}`}
        lang={lang}
        type="article"
      />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/blog" className="text-purple-700 hover:underline text-sm">← {t("reviews_title","Блог")}</Link>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">{data.title}</h1>
          <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"><div className="text-sm text-gray-600 dark:text-gray-300">{BLOGS[slug][lang].lead}</div></div>
          <div className="mt-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
            {data.body.map((p,i)=>p.startsWith("•")?(<p key={i} className="pl-4">• {p.replace(/^•\s?/,"")}</p>):(<p key={i}>{p}</p>))}
          </div>
          <div className="mt-8"><Link to="/blog" className="text-purple-700 hover:underline">← {t("reviews_title","Блог")}</Link></div>
        </div>
      </section>
    </Page>
  );
}
function AboutPage({ t }) {
    const { lang } = useLang(); // add this

  const highlights=[{k:"20+",v:t("about_highlight_juris","юрисдикций")},{k:"50+",v:t("about_highlight_cases","успешных кейсов")},{k:"5+",v:t("about_highlight_years","лет практики")}];
  return (
    <Page>
        <SEO
        title="About ProLegall — Global Legal Advisory"
        description="Boutique legal firm for international structuring, holdings, inheritance and migration across EU & the Gulf."
        path="/about"
        lang={lang}
      />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-semibold">{t("about_title","О компании ProLegall")}</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{t("about_intro","Мы — бутиковая юридическая компания, оказывающая услуги в области международного структурирования бизнеса, семейного и наследственного права, миграции и комплаенса. Мы сопровождаем клиентов в Европе и странах Персидского залива, создавая прозрачные решения, соответствующие требованиям банков и регуляторов с самого первого шага.")}</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {highlights.map((h,i)=>(<Card key={i} className="text-center"><CardContent className="p-8"><div className="text-3xl font-semibold">{h.k}</div><div className="text-gray-600 dark:text-gray-300">{h.v}</div></CardContent></Card>))}
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <Card><CardHeader><CardTitle>{t("about_approach_title","Подход")}</CardTitle></CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300 space-y-3 text-sm">
                <p>• {t("about_approach_b1","Аналитика перед стартом: проверяем санкционные риски, банковскую приемлемость и требования к substance.")}</p>
                <p>• {t("about_approach_b2","Комплаенс-by-design: документы и структура готовятся с учётом будущих проверок.")}</p>
                <p>• {t("about_approach_b3","Наш подход — шаг за шагом: быстрое решение задач и комплексное сопровождение.")}</p>
              </CardContent>
            </Card>
            <Card><CardHeader><CardTitle>{t("about_team_title","Команда")}</CardTitle></CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300 text-sm">{t("about_team_text","Небольшая кросс-юрисдикционная команда, привлекаем локальных консультантов там, где нужен лицензированный представитель.")}</CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Page>
  );
}
function ServicesPage({ t, lang }) {
  const navigate=useNavigate(); const { search }=useLocation(); const params=new URLSearchParams(search);
  const getTab=()=>params.get("tab")||"incorporation"; const [tab,setTab]=useState(getTab()); useEffect(()=>setTab(getTab()),[search]);
  const setTabQuery=(id)=>{const p=new URLSearchParams(search); p.set("tab",id); navigate({pathname:"/services",search:p.toString()},{replace:false});};
  const tabs=[{id:"incorporation",title:t("svc_incorp_title","Регистрация компаний"),icon:<Building2 className="h-4 w-4"/>},
    {id:"tax",title:t("svc_tax_title","Структуры и налоги"),icon:<Landmark className="h-4 w-4"/>},
    {id:"family",title:t("svc_family_title","Семейное/наследственное"),icon:<ScrollText className="h-4 w-4"/>},
    {id:"contracts",title:t("svc_contracts_title","Договоры и сопровождение"),icon:<FileText className="h-4 w-4"/>},
    {id:"compliance",title:t("svc_compliance_title","Комплаенс"),icon:<ShieldCheck className="h-4 w-4"/>},
    {id:"disputes",title:t("svc_disputes_title","Миграция"),icon:<Gavel className="h-4 w-4"/>}];
  const L=LHelper(lang);
  const content=useMemo(()=>({
    incorporation:{lead:L("Company incorporations in Europe, the Gulf and Asia. Key lines: Lithuania, Netherlands, Estonia, Germany, UK, UAE, Bahrain, Qatar, Singapore, Hong Kong, etc.","Регистрация компаний в Европе, на Ближнем Востоке и в Азии. Основные направления: Литва, Нидерланды, Эстония, Германия, Великобритания, ОАЭ, Бахрейн, Катар, Сингапур, Гонконг и др."),price:L("from €3k","от €3k"),bullets:[L("Jurisdiction selection","Подбор юрисдикции"),L("Corporate documents issuance","Выпуск корпоративных документов"),L("Bank account opening","Oткрытие банковского счёта"),L("Registered address & substance if needed","Юридический адрес и substance при необходимости")]},
    tax:{lead:L("We design corporate structures for asset protection and tax efficiency, aligned with treaties and local rules.","Разрабатываем корпоративные структуры для защиты активов и оптимизации налогообложения с учётом международных соглашений и местных правил."),price:L("project-based","проектно"),bullets:[L("Holding design & setup","Cоздание и проектирование холдингов"),L("Foundations / funds","Учреждение фондов"),L("Substance & corporate administration","Substance и корпоративное администрирование"),L("Restructuring & redomiciliation","Pеструктуризация и редомициляция компаний")]},
    family:{lead:L("Solutions for asset protection and succession planning across jurisdictions.","Решения для защиты капитала и планирования наследства в разных странах."),price:L("from €1.5k","от €1.5к"),bullets:[L("Prenuptial agreements","Брачные договоры"),L("Trusts & family foundations","Трасты и семейные фонды"),L("Wills","Завещания"),L("Guardianship & asset control","Опека и контроль активов")]},
    contracts:{lead:L("We draft contracts and corporate docs in a clear, modern format.","Готовим договоры и корпоративные документы в современном и удобном формате."),price:L("from €250","от €250"),bullets:[L("Cross-border contract drafting","Разработка международных договоров"),L("Legal-design style documents","Договоры в стиле legal design"),L("Internal policies (incl. Data Privacy/GDPR)","Внутренние политики и процедуры компаний (включая Data Privacy и GDPR)"),L("M&A / corporate deal documentation","Договоры для M&A и корпоративных сделок")]},
    compliance:{lead:L("We build processes to work smoothly with banks and regulators.","Помогаем компаниям выстроить процессы для работы с банками и регуляторами."),price:L("case-based","под задачу"),bullets:[L("KYC/AML framework","KYC/AML framework"),L("Risk assessment & internal policies","Риск-оценка и внутренние политики"),L("Readiness for bank/regulator checks","Подготовка к проверкам банков и регуляторов"),L("Bank communications","Коммуникации с банками")]},
    disputes:{lead:L("We help obtain long-term visas and residence permits in Europe and the Gulf.","Помогаем получить долгосрочные визы и виды на жительство в странах Европы и Персидского залива."),price:L("from €2.3k","от €2.3к"),bullets:[L("Golden / investor visas","Golden Visa / Инвесторские визы"),L("Freelancer visas in the Gulf","Freelancer Visa в странах Персидского залива"),L("Startup visas in Europe (LT, PT, etc.)","Startup Visa в странах Европы (Литва, Португалия и др.)"),L("Residence via company setup","ВНЖ через регистрацию компании")]},
  }),[lang]);
  const active=content[tab];
  return (
    <Page>
        <SEO
      title="Services — Company Incorporation, Holdings, Compliance, Migration | ProLegall"
      description="Company setup in EU/Gulf/Asia, holdings & foundations, contracts, compliance/AML, and migration support. Get a tailored, bank-ready structure."
      path="/services"
      lang={lang}
    />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">{t("services_title","Услуги")}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map(tt=>(
              <button key={tt.id} onClick={()=>setTabQuery(tt.id)}
                className={cx("px-3 py-2 rounded-xl text-sm border inline-flex items-center",
                  tab===tt.id?"bg-purple-700 text-white border-purple-700":"bg-white text-gray-900 hover:bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:border-gray-700")}>
                {tt.icon}<span className="ml-2">{tt.title}</span>
              </button>
            ))}
          </div>
          <Card className="mt-6">
            <CardContent className="p-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="text-lg font-medium">{active.lead}</div>
                <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm space-y-1">{active.bullets.map((b,i)=>(<li key={i}>{b}</li>))}</ul>
              </div>
              <div>
                <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/30 p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-200">{L("Estimated price","Ориентировочная стоимость")}</div>
                  <div className="text-2xl font-semibold mt-1">{active.price}</div>
                  <Button as={Link} to="/contact" className="w-full mt-4">{L("Request estimate","Запросить смету")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Page>
  );
}
function CasesPage(){ return <HomePage t={(k,f)=>f}/>; }
function ContactSuccessBanner(){
  const { search }=useLocation(); const params=new URLSearchParams(search); const show=params.get("sent")==="1";
  if(!show) return null;
  return (<div className="mb-3 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-200">
    Message sent. We’ll get back to you shortly.
  </div>);
}
function ContactPage({ t }){
    const { lang } = useLang();
  return (
    <Page>
       <SEO
        title="Contact ProLegall — Global Legal Advisory"
        description="Write to info@prolegall.com or WhatsApp/Telegram +370 619 70610. Offices in Vilnius; work across EU and the Gulf."
        path="/contact"
        lang={lang}
      />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">{t("contacts_title","Контакты")}</h1>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>{t("write_us","Напишите нам")}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <ContactSuccessBanner/>
                <form action="https://formsubmit.co/info@prolegall.com" method="POST" className="space-y-3">
                  <input type="hidden" name="_subject" value="Contact form: prolegall.com"/><input type="hidden" name="_captcha" value="false"/><input type="hidden" name="_template" value="table"/>
                  <input type="hidden" name="_next" value={(typeof window!=="undefined"?window.location.origin:"")+"/contact?sent=1"}/>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input name="name" required placeholder={t("hero_name","Имя")} aria-label={t("hero_name","Имя")}/>
                    <Input name="email" required type="email" placeholder={t("hero_email","Email")} aria-label="Email"/>
                  </div>
                  <Input name="phone" placeholder={t("hero_phone","Телефон / Telegram / WhatsApp")} aria-label={t("hero_phone","Телефон")}/>
                  <Textarea name="message" required placeholder={t("hero_task","Кратко опишите задачу")} aria-label={t("hero_task","Сообщение")}/>
                  <div className="flex items-center gap-3">
                    <Button type="submit" className="rounded-2xl">{t("send","Send")}</Button>
                    <span className="text-xs text-gray-500">{t("contact_consent","By sending, you agree to the privacy policy.")}</span>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>{t("details_contact","Реквизиты и связь")}</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> info@prolegall.com</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +370 619 70610 (TG/WA)</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {t("location_vilnius","Vilnius, Lithuania")}</div>
                <a href="https://www.linkedin.com/company/prolegall/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4"/><span>LinkedIn</span></a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Page>
  );
}
function PrivacyPage({ t }) {
    const { lang } = useLang();
  return (
    <Page>
      <SEO
        title="Privacy Policy | ProLegall"
        description="How ProLegall collects, uses and protects your data."
        path="/privacy"
        lang={lang}
        robots="noindex,follow"
      />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">{t("privacy_title","Privacy Policy")}</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t("privacy_intro","This policy describes what data we collect, how we use it, and how we ensure its security.")}</p>
          <div className="mt-8 space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <section><h2 className="font-semibold">{t("privacy_1_title","1. Data collection")}</h2><p>{t("privacy_1_text","We collect contact details...")}</p></section>
            <section><h2 className="font-semibold">{t("privacy_2_title","2. Use")}</h2><p>{t("privacy_2_text","The data is used for communication...")}</p></section>
            <section><h2 className="font-semibold">{t("privacy_3_title","3. Storage and security")}</h2><p>{t("privacy_3_text","We apply organizational and technical measures...")}</p></section>
            <section><h2 className="font-semibold">{t("privacy_4_title","4. Your rights")}</h2><p>{t("privacy_4_text","You can request access, correction, or deletion of your data:")} <Link to="/contact" className="text-purple-700 underline">{t("privacy_contact","contact us")}</Link></p></section>
          </div>
        </div>
      </section>
    </Page>
  );
}
function TermsPage({ t }) {
    const { lang } = useLang();
  return (
    <Page>
      <SEO
        title="Terms of Service | ProLegall"
        description="Terms governing the provision of legal services by ProLegall."
        path="/terms"
        lang={lang}
        robots="noindex,follow"
      />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">{t("terms_title","Terms of Service")}</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t("terms_intro","These terms govern the provision of legal services by ProLegall.")}</p>
          <div className="mt-6 space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <section><h2 className="font-semibold">{t("terms_1_title","1. Subject")}</h2><p>{t("terms_1_text","We provide consulting and representative services according to the agreed scope and estimate.")}</p></section>
            <section><h2 className="font-semibold">{t("terms_2_title","2. Payment")}</h2><p>{t("terms_2_text","Fixed fee or hourly rate. Advance payment is required before work begins.")}</p></section>
            <section><h2 className="font-semibold">{t("terms_3_title","3. Confidentiality")}</h2><p>{t("terms_3_text","Information received from the client will not be disclosed without consent, except as required by law.")}</p></section>
            <section><h2 className="font-semibold">{t("terms_4_title","4. Liability")}</h2><p>{t("terms_4_text","Liability is limited to the amount of fees actually paid for the relevant stage of work.")}</p></section>
          </div>
        </div>
      </section>
    </Page>
  );
}
function NotFoundPage(){
  return (<Page>      <SEO title="404 — Page Not Found | ProLegall" description="Page not found." path={typeof window!=="undefined" ? window.location.pathname : "/404"} lang={lang} robots="noindex,follow" />
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center"><div className="text-6xl font-bold">404</div><p className="mt-2 text-gray-600 dark:text-gray-300">Страница не найдена</p><div className="mt-6"><Button as={Link} to="/">На главную</Button></div></div></Page>);
}

/* -------------------- Root App -------------------- */
function Shell() {
  const { lang, setLang, t } = useLang();
  const PageEl=({Comp,props})=> <Comp {...props} />;
  useEffect(()=>{const saved=localStorage.getItem("theme"); if(saved)document.documentElement.classList.toggle("dark",saved==="dark");},[]);
  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[useLocation().pathname]);
  useEffect(()=>{setFavicon();},[]);
  useEffect(()=>{if(typeof window==="undefined")return; const PROD=window.location.hostname.endsWith("prolegall.com")||window.location.hostname==="localhost"; const key="site-visit-counted"; if(PROD&&sessionStorage.getItem(key)!=="1"){fetch("https://api.countapi.xyz/hit/prolegall.com/site_visits").catch(()=>{}); sessionStorage.setItem(key,"1");}},[]);
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <TopNav t={t} lang={lang} setLang={setLang}/>
      <Routes>
        <Route path="/" element={<PageEl Comp={HomePage} props={{t,lang}}/>}/>
        <Route path="/about" element={<PageEl Comp={AboutPage} props={{t}}/>}/>
        <Route path="/services" element={<PageEl Comp={ServicesPage} props={{t,lang}}/>}/>
        <Route path="/blog" element={<PageEl Comp={BlogRoute} props={{t,lang}}/>}/>
        <Route path="/post" element={<PageEl Comp={PostPage} props={{t,lang}}/>}/>
        <Route path="/contact" element={<PageEl Comp={ContactPage} props={{t}}/>}/>
        <Route path="/privacy" element={<PageEl Comp={PrivacyPage} props={{t}}/>}/>
        <Route path="/terms" element={<PageEl Comp={TermsPage} props={{t}}/>}/>
        <Route path="/quiz" element={<PageEl Comp={QuizPage} props={{t,lang}}/>}/>
        <Route path="/secret" element={<PageEl Comp={SecretPage} props={{}}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer t={t}/>
    </div>
  );
}
export default function ProLegallApp(){
  return (<BrowserRouter><Shell/></BrowserRouter>);
}
