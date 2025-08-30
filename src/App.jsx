import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Globe2,
  ShieldCheck,
  FileText,
  Building2,
  Gavel,
  Landmark,
  ScrollText,
  Users2,
  Award,
  ChevronRight,
  Check,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

function setFavicon() {
  // SVG that matches the header logo: purple→orange gradient + white scale
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="10" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7C3AED"/>
      <stop offset="0.55" stop-color="#7C3AED"/>
      <stop offset="1" stop-color="#F97316"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#g)"/>
  <g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 12v22M20 20h24M20 50h24"/>
    <path d="M26 20l-6 12M38 20l6 12"/>
  </g>
  <path d="M14 32h12l-6 8-6-8z" fill="#fff"/>
  <path d="M38 32h12l-6 8-6-8z" fill="#fff"/>
</svg>`;
  const url = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);

  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', ['ru','en','lt','az'].includes(lang) ? lang : 'en');
  }, [lang]);
  const t = (key, fallback) => (I18N[lang] && I18N[lang][key]) ?? fallback;
  return { lang, setLang, t };
}
  

function LangSelect({ lang, setLang, className = "" }) {
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className={cx(
        "rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-2 text-sm",
        className
      )}
      aria-label="Language"
      title="Language"
    >
      <option value="ru">RU</option>
      <option value="en">EN</option>
      <option value="lt">LT</option>
      <option value="az">AZ</option>
    </select>
  );
}

// English/Lithuanian/Azerbaijani translations used by t()
const I18N = {
  en: {
    // nav + common
    nav_services: "Services",
    nav_about: "About",
    nav_cases: "Cases",
    nav_contact: "Contact",
    nav_privacy: "Privacy",
    nav_consult: "Consultation",
    more: "More",
    confidential: "Confidential",

    // hero
    hero_badge: "European perspective • Middle East • UAE",
    hero_title: "International structuring, inheritance and company registration —",
    hero_title_em: " simple and safe",
    hero_p:
      "We help entrepreneurs open and protect business in the UAE, Europe and beyond. Fast, transparent and risk-aware.",
    hero_start: "Start project",
    hero_services_btn: "Services & pricing",
    hero_sla: "Reply within 24 hours on business days",
    hero_b1: "Compliance-by-design",
    hero_b2: "20+ jurisdictions",
    hero_b3: "100+ successful cases",
    hero_quick: "Quick request",
    hero_name: "Your name",
    hero_email: "Email",
    hero_phone: "Phone / WhatsApp",
    hero_task: "Briefly about the task (e.g., DMCC holding)",
    hero_send: "Send",
    hero_consent: "By sending, you agree to the privacy policy.",

    // value props (cards)
    vp1_title: "Legal safety",
    vp1_text: "We comply with KYC/AML and regulator requirements from day one.",
    vp2_title: "International reach",
    vp2_text:
      "UAE, Cyprus, Europe, Saudi Arabia and other jurisdictions.",
    vp3_title: "Tailored approach",
    vp3_text: "Solutions for the owner’s goals, not for templates.",
    vp4_title: "Reputation & speed",
    vp4_text: "Short timelines without compromising quality.",

    // services section title
    services_title: "Our services",
    // services grid (6 cards)
    svc_incorp_title: "Company incorporation",
    svc_incorp_desc:
      "Opening, bank, substance, ongoing support.",
    svc_family_title: "Family & inheritance law",
    svc_family_desc:
      "Prenups, trusts, foundations, succession matters.",
    svc_contracts_title: "Contracts & support",
    svc_contracts_desc:
      "Cross-border contracts, compliance, corporate law.",
    svc_tax_title: "Structures & taxes",
    svc_tax_desc: "Holdings, funds, incentives, DTTs.",
    svc_disputes_title: "Mediation & disputes",
    svc_disputes_desc: "Pre-action and commercial mediation.",
    svc_compliance_title: "Compliance support",
    svc_compliance_desc:
      "Policies, procedures, audit readiness.",

    // stats
    stats_juris: "Jurisdictions",
    stats_cases: "Cases",
    stats_saved: "Saved for clients",
    stats_first: "First reply",

    // quiz
    quiz_title: "Jurisdiction in One Minute",
    quiz_desc:
      "Answer 6–8 simple questions and get a first route: suitable zones, ballpark fees and substance requirements.",
    quiz_step1: "Jurisdiction",
    quiz_step2: "Tax goal",
    quiz_step3: "Bank",
    quiz_step4: "Timing",
    quiz_take: "Take the test",
    quiz_example: "See example",
    quiz_preview: "Preview result",
    quiz_suitable: "Suitable: DMCC, IFZA",
    quiz_uae: "UAE",
    quiz_fees: "Fee estimate",
    quiz_fees_line: "Incorporation: $3.5–6k • Bank: 2–4 weeks",
    quiz_req: "Requirements",
    quiz_r1: "Substance: flex (office on demand)",
    quiz_r2: "Resident director: not required",
    quiz_r3: "KYC: standard",
    quiz_get: "Get detailed report",

    // cases
    cases_title: "Recent projects",
    case1_tag: "DMCC",
    case1_title: "E-commerce holding",
    case1_text: "EU VAT + PSP, compliance, bank accounts.",
    case2_tag: "Foundation",
    case2_title: "Family foundation for succession",
    case2_text: "Ownership across 3 countries, control and protection.",
    case3_tag: "M&A",
    case3_title: "Cross-border transaction",
    case3_text: "SPA, sanctions clauses, escrow.",

    // testimonials
    reviews_title: "Testimonials",
    rev1_text:
      "In practice — very fast and precise, checklist-driven. Bank opened with zero stress.",
    rev1_name: "Alina, IT agency owner",
    rev2_text:
      "They helped with UAE structure and EU VAT. We’re scaling now.",
    rev2_name: "Oleg, e-commerce",
    rev3_text:
      "Succession scenarios were carefully prepared in advance.",
    rev3_name: "N. Family Office",

    // cta
    cta_title:
      "Ready to start? We’ll discuss your task and propose a route within 24 hours",
    cta_text: "No pushy sales. Confidential.",
    send: "Send",

    // footer
    footer_contacts: "Contacts",
    footer_nav: "Navigation",
    footer_legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    footer_intro:
      "International tax planning, inheritance law and company registration. Offices: Vilnius • Baku.",
    contacts_title: "Contacts",
    write_us: "Write to us",
    details_contact: "Details & contact",
  },

  lt: {
    nav_services: "Paslaugos",
    nav_about: "Apie mus",
    nav_cases: "Projektai",
    nav_contact: "Kontaktai",
    nav_privacy: "Privatumas",
    nav_consult: "Konsultacija",
    more: "Daugiau",
    confidential: "Konfidencialu",

    hero_badge: "Europietiškas požiūris • Artimieji Rytai • JAE",
    hero_title: "Tarptautinė struktūra, paveldėjimas ir įmonių registracija —",
    hero_title_em: " paprasta ir saugu",
    hero_p:
      "Padedame verslininkams atidaryti ir apsaugoti verslą JAE, Europoje ir už jos ribų. Greitai, skaidriai ir valdant rizikas.",
    hero_start: "Pradėti projektą",
    hero_services_btn: "Paslaugos ir kainos",
    hero_sla: "Atsakymas per 24 val. darbo dienomis",
    hero_b1: "Atitiktis iš anksto",
    hero_b2: "20+ jurisdikcijų",
    hero_b3: "100+ sėkmingų bylų",
    hero_quick: "Greita užklausa",
    hero_name: "Vardas",
    hero_email: "El. paštas",
    hero_phone: "Telefonas / WhatsApp",
    hero_task: "Trumpai apie užduotį (pvz., DMCC holdingas)",
    hero_send: "Siųsti",
    hero_consent: "Siųsdami sutinkate su privatumo politika.",

    vp1_title: "Teisinis saugumas",
    vp1_text:
      "KYC/AML ir reguliuotojų reikalavimus taikome nuo pirmo žingsnio.",
    vp2_title: "Tarptautinė aprėptis",
    vp2_text:
      "JAE, Kipras, Europa, Saudo Arabija ir kitos jurisdikcijos.",
    vp3_title: "Individualus požiūris",
    vp3_text: "Sprendimai savininko tikslams, o ne šablonams.",
    vp4_title: "Reputacija ir greitis",
    vp4_text: "Greiti terminai neaukojant kokybės.",

    services_title: "Mūsų paslaugos",
    svc_incorp_title: "Įmonių steigimas",
    svc_incorp_desc: "Atidarymas, bankas, substancija, palaikymas.",
    svc_family_title: "Šeimos ir paveldėjimo teisė",
    svc_family_desc: "Vedybų sutartys, fondai, paveldėjimas.",
    svc_contracts_title: "Sutartys ir palyda",
    svc_contracts_desc: "Tarptautinės sutartys, atitiktis, korporatyvinė teisė.",
    svc_tax_title: "Struktūros ir mokesčiai",
    svc_tax_desc: "Holdingo struktūros, fondai, lengvatos, DTT.",
    svc_disputes_title: "Mediacija ir ginčai",
    svc_disputes_desc: "Ikiteisminė ir komercinė mediacija.",
    svc_compliance_title: "Atitikties palaikymas",
    svc_compliance_desc: "Politikos, procedūros, pasirengimas patikroms.",

    stats_juris: "Jurisdikcijos",
    stats_cases: "Bylos",
    stats_saved: "Sutaupyta klientams",
    stats_first: "Pirmas atsakymas",

    quiz_title: "Jurisdikcija per minutę",
    quiz_desc:
      "Atsakykite į 6–8 paprastus klausimus ir gaukite pirminį maršrutą: tinkamos zonos, preliminarūs mokesčiai ir substancijos reikalavimai.",
    quiz_step1: "Jurisdikcija",
    quiz_step2: "Mokesčių tikslas",
    quiz_step3: "Bankas",
    quiz_step4: "Terminai",
    quiz_take: "Pradėti testą",
    quiz_example: "Peržiūrėti pavyzdį",
    quiz_preview: "Rezultato peržiūra",
    quiz_suitable: "Tinka: DMCC, IFZA",
    quiz_uae: "JAE",
    quiz_fees: "Mokesčių įvertis",
    quiz_fees_line: "Registracija: $3.5–6k • Bankas: 2–4 savaitės",
    quiz_req: "Reikalavimai",
    quiz_r1: "Substancija: lanksti (biuras pagal poreikį)",
    quiz_r2: "Rezidentas direktorius: nereikalingas",
    quiz_r3: "KYC: standartinis",
    quiz_get: "Gauti išsamų raportą",

    cases_title: "Naujausi projektai",
    case1_tag: "DMCC",
    case1_title: "E-komercijos holdingas",
    case1_text: "ES PVM + mokėjimų teikėjai, atitiktis, sąskaitos.",
    case2_tag: "Fondas",
    case2_title: "Šeimos fondas paveldėjimui",
    case2_text: "Valdymas 3 šalyse, kontrolė ir apsauga.",
    case3_tag: "M&A",
    case3_title: "Tarpvalstybinis sandoris",
    case3_text: "SPA, sankcijų sąlygos, escrow.",

    reviews_title: "Atsiliepimai",
    rev1_text:
      "Praktiškai — labai greitai ir tiksliai, pagal kontrolinį sąrašą. Bankas atidarytas be streso.",
    rev1_name: "Alina, IT agentūra",
    rev2_text:
      "Padėjo su JAE struktūra ir ES PVM. Dabar plečiamės.",
    rev2_name: "Olegas, e-komercija",
    rev3_text:
      "Paveldėjimo scenarijai parengti kruopščiai ir iš anksto.",
    rev3_name: "N. Family Office",

    cta_title:
      "Pasiruošę pradėti? Aptarsime užduotį ir pasiūlysime maršrutą per 24 val.",
    cta_text: "Be agresyvių pardavimų. Konfidencialu.",
    send: "Siųsti",

    footer_contacts: "Kontaktai",
    footer_nav: "Navigacija",
    footer_legal: "Teisinė informacija",
    privacy: "Privatumo politika",
    terms: "Paslaugų sąlygos",
    footer_intro:
      "Tarptautinis mokesčių planavimas, paveldėjimo teisė ir įmonių registracija. Biurai: Vilnius • Baku.",
    contacts_title: "Kontaktai",
    write_us: "Parašykite mums",
    details_contact: "Rekvizitai ir ryšys",
  },

  az: {
    nav_services: "Xidmətlər",
    nav_about: "Haqqımızda",
    nav_cases: "Layihələr",
    nav_contact: "Əlaqə",
    nav_privacy: "Məxfilik",
    nav_consult: "Konsultasiya",
    more: "Daha çox",
    confidential: "Konfidensial",

    hero_badge: "Avropa baxışı • Yaxın Şərq • BƏƏ",
    hero_title: "Beynəlxalq strukturlaşdırma, irs və şirkət qeydiyyatı —",
    hero_title_em: " sadə və təhlükəsiz",
    hero_p:
      "Sahibkarlara BƏƏ-də, Avropada və ondan kənarda biznes açmağa və qorumağa kömək edirik. Sürətli, şəffaf və riskləri nəzərə alaraq.",
    hero_start: "Layihəyə başla",
    hero_services_btn: "Xidmətlər və qiymətlər",
    hero_sla: "İş günlərində 24 saat ərzində cavab",
    hero_b1: "Uyğunluq əvvəlcədən",
    hero_b2: "20+ yurisdiksiya",
    hero_b3: "100+ uğurlu iş",
    hero_quick: "Sürətli sorğu",
    hero_name: "Adınız",
    hero_email: "Email",
    hero_phone: "Telefon / WhatsApp",
    hero_task: "Tapşırıq barədə qısa (məs., DMCC holding)",
    hero_send: "Göndər",
    hero_consent: "Göndərməklə məxfilik siyasəti ilə razılaşırsınız.",

    vp1_title: "Hüquqi təhlükəsizlik",
    vp1_text:
      "KYC/AML və tənzimləyici tələblərə ilk gündən əməl edirik.",
    vp2_title: "Beynəlxalq əhatə",
    vp2_text:
      "BƏƏ, Kipr, Avropa, Səudiyyə Ərəbistanı və digər yurisdiksiyalar.",
    vp3_title: "Fərdi yanaşma",
    vp3_text: "Şablon deyil, sahibin məqsədlərinə uyğun həllər.",
    vp4_title: "Nüfuz və sürət",
    vp4_text: "Keyfiyyətdən güzəşt etmədən qısa müddətlər.",

    services_title: "Xidmətlərimiz",
    svc_incorp_title: "Şirkət qeydiyyatı",
    svc_incorp_desc: "Açılış, bank, substansiya, dəstək.",
    svc_family_title: "Ailə və irs hüququ",
    svc_family_desc: "Nigah müqavilələri, trastlar, fondlar, irs işləri.",
    svc_contracts_title: "Müqavilələr və müşayiət",
    svc_contracts_desc: "Sərhədlərarası müqavilələr, compliance, korporativ hüquq.",
    svc_tax_title: "Strukturlar və vergilər",
    svc_tax_desc: "Holdinqlər, fondlar, güzəştlər, DTT.",
    svc_disputes_title: "Mediya­siya və mübahisələr",
    svc_disputes_desc: "Müqavilədən əvvəl və kommersiya mediasiyası.",
    svc_compliance_title: "Uyğunluğun müşayiəti",
    svc_compliance_desc: "Siyasətlər, prosedurlar, yoxlamalara hazırlıq.",

    stats_juris: "Yurisdiksiyalar",
    stats_cases: "İşlər",
    stats_saved: "Müştərilər üçün qənaət",
    stats_first: "İlkin cavab",

    quiz_title: "Bir dəqiqəyə yurisdiksiya",
    quiz_desc:
      "6–8 sadə suala cavab verin və ilkin marşrut alın: uyğun zonalar, təxmini rüsumlar və substansiya tələbləri.",
    quiz_step1: "Yurisdiksiya",
    quiz_step2: "Vergi məqsədi",
    quiz_step3: "Bank",
    quiz_step4: "Müddətlər",
    quiz_take: "Testə başla",
    quiz_example: "Nümunəyə bax",
    quiz_preview: "Nəticənin ön baxışı",
    quiz_suitable: "Uyğundur: DMCC, IFZA",
    quiz_uae: "BƏƏ",
    quiz_fees: "Rüsumların qiymətləndirilməsi",
    quiz_fees_line: "Qeydiyyat: $3.5–6k • Bank: 2–4 həftə",
    quiz_req: "Tələblər",
    quiz_r1: "Substansiya: çevik (tələb üzrə ofis)",
    quiz_r2: "Rezident direktor: tələb olunmur",
    quiz_r3: "KYC: standart",
    quiz_get: "Ətraflı hesabat al",

    cases_title: "Son layihələr",
    case1_tag: "DMCC",
    case1_title: "E-commerce holdinqi",
    case1_text: "Aİ ƏDV + ödəniş provayderləri, uyğunluq, hesablar.",
    case2_tag: "Fond",
    case2_title: "İrs üçün ailə fondu",
    case2_text: "3 ölkədə aktivlər, nəzarət və müdafiə.",
    case3_tag: "M&A",
    case3_title: "Sərhədlərarası əqdlər",
    case3_text: "SPA, sanksiya bəndləri, escrow.",

    reviews_title: "Rəylər",
    rev1_text:
      "Praktikada — çox sürətli və dəqiq, çek-listlə. Bank əsəbsiz açıldı.",
    rev1_name: "Alina, İT agentliyi sahibi",
    rev2_text:
      "BƏƏ strukturu və Aİ ƏDV ilə kömək etdilər. İndi genişlənirik.",
    rev2_name: "Oleq, e-commerce",
    rev3_text:
      "İrs ssenariləri diqqətlə və əvvəlcədən hazırlanıb.",
    rev3_name: "N. Family Office",

    cta_title:
      "Hazırsınız? Tapşırığınızı müzakirə edib 24 saata marşrut təklif edək",
    cta_text: "Aqressiv satış yoxdur. Məhfidir.",
    send: "Göndər",

    footer_contacts: "Əlaqə",
    footer_nav: "Naviqasiya",
    footer_legal: "Hüquqi məlumat",
    privacy: "Məxfilik siyasəti",
    terms: "Xidmət şərtləri",
    footer_intro:
      "Beynəlxalq vergi planlaşdırması, irs hüququ və şirkət qeydiyyatı. Ofislər: Vilnüs • Bakı.",
    contacts_title: "Əlaqə",
    write_us: "Bizə yazın",
    details_contact: "Rekvizitlər və əlaqə",
  },
};

/* -----------------------------------------------------------
   Tiny UI primitives
----------------------------------------------------------- */
const cx = (...cls) => cls.filter(Boolean).join(" ");

function Button({
  children,
  variant = "primary",
  className = "",
  size = "md",
  as: As = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-2xl";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-base",
  };
  const variants = {
    primary:
      "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300",
    secondary:
      "bg-white/15 text-white border border-white/20 hover:bg-white/25 focus:ring-white",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
    amber:
      "bg-amber-500 text-black hover:bg-amber-400 focus:ring-amber-300",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
  };
  return (
    <As
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </As>
  );
}

function Card({ className = "", children }) {
  return (
    <div
      className={cx(
        "rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {children}
    </div>
  );
}
function CardHeader({ children, className = "" }) {
  return <div className={cx("px-6 pt-6", className)}>{children}</div>;
}
function CardTitle({ children, className = "" }) {
  return <h4 className={cx("font-semibold", className)}>{children}</h4>;
}
function CardContent({ children, className = "" }) {
  return <div className={cx("px-6 pb-6", className)}>{children}</div>;
}
function Input({ className = "", ...props }) {
  return (
    <input
      className={cx(
        "w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
}
function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cx(
        "w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 dark:text-gray-100 min-h-[120px]",
        className
      )}
      {...props}
    />
  );
}
function Badge({ children, className = "" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

/* -----------------------------------------------------------
   Animations
----------------------------------------------------------- */
const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, duration: 0.5, ease: "easeOut" },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* -----------------------------------------------------------
   Shared bits
----------------------------------------------------------- */
function Logo() {
  return (
    <a href="#/" className="flex items-center gap-2" aria-label="ProLegall home">
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 shadow-lg grid place-items-center">
        <Scale className="h-5 w-5 text-white" />
      </div>
      <div className="leading-tight">
        <div className="text-lg font-semibold tracking-tight">ProLegall</div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
          Family Office &amp; Tax
        </div>
      </div>
    </a>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const toggle = () => {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    el.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

function TopNav({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const hash = useHashRoute();
  const route = (hash.replace(/^#/, "") || "/").split("?")[0];

  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const NAV = [
    { href: "#/services", label: t("nav_services", "Услуги") },
    { href: "#/about", label: t("nav_about", "О компании") },
    { href: "#/cases", label: t("nav_cases", "Проекты") },
    { href: "#/contact", label: t("nav_contact", "Контакты") },
  ];

  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 dark:bg-gray-900/70 border-b dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((n) => {
              const isActive = n.href.replace(/^#/, "") === `#${route}`;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className={cx(
                    "hover:text-purple-700",
                    isActive && "text-purple-700 font-medium"
                  )}
                >
                  {n.label}
                </a>
              );
            })}
            <a
              href="#/privacy"
              className={cx(
                "hover:text-purple-700",
                route === "/privacy" && "text-purple-700 font-medium"
              )}
            >
              {t("nav_privacy", "Политика")}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button as="a" href="#/contact" className="rounded-2xl">
              {t("nav_consult", "Консультация")}
            </Button>
            <ThemeToggle />
            <LangSelect lang={lang} setLang={setLang} />
          </div>

          <button
            className="md:hidden p-2 rounded-xl border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-3 grid gap-2 text-sm">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#/privacy"
              className="rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              {t("nav_privacy", "Политика")}
            </a>

            <div className="flex gap-2 pt-2">
              <Button as="a" href="#/contact" className="flex-1">
                {t("nav_consult", "Консультация")}
              </Button>
              <ThemeToggle />
              <LangSelect lang={lang} setLang={setLang} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Page({ children }) {
  return <div className="min-h-[60vh]">{children}</div>;
}

function Footer({ t }) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
              {t(
                "footer_intro",
                "Международное налоговое планирование, наследственное право и регистрация компаний. Офисы: Вильнюс • Баку."
              )}
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3">
              {t("footer_contacts", "Контакты")}
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@prolegall.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> WhatsApp / Telegram: +370 xxx
                xxxx
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Вильнюс, Литва
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">
              {t("footer_nav", "Навигация")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#/services" className="hover:text-purple-700">
                  {t("nav_services", "Услуги")}
                </a>
              </li>
              <li>
                <a href="#/about" className="hover:text-purple-700">
                  {t("nav_about", "О компании")}
                </a>
              </li>
              <li>
                <a href="#/cases" className="hover:text-purple-700">
                  {t("nav_cases", "Кейсы")}
                </a>
              </li>
              <li>
                <a href="#/privacy" className="hover:text-purple-700">
                  {t("nav_privacy", "Политика")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">
              {t("footer_legal", "Юридическое")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#/privacy" className="hover:text-purple-700">
                  {t("privacy", "Политика конфиденциальности")}
                </a>
              </li>
              <li>
                <a href="#/terms" className="hover:text-purple-700">
                  {t("terms", "Условия оказания услуг")}
                </a>
              </li>
              <li>© {new Date().getFullYear()} ProLegall</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -----------------------------------------------------------
   Pages
----------------------------------------------------------- */
function HomeHero({ t }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-orange-600" />
      <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-32 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-12 gap-10 items-center"
        >
          <motion.div variants={item} className="lg:col-span-7 text-white">
            <Badge className="bg-amber-500/90 text-black mb-4">
              {t("hero_badge", "Европейский взгляд • Ближний Восток • ОАЭ")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              {t(
                "hero_title",
                "Международное структурирование, наследование и регистрация компаний —"
              )}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-white">
                {t("hero_title_em", " просто и безопасно")}
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/90 max-w-2xl">
              {t(
                "hero_p",
                "Помогаем предпринимателям открыть и защитить бизнес в ОАЭ, Европе и за их пределами. Работаем быстро, прозрачно и бережно к рискам."
              )}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                as="a"
                href="#/contact"
                size="lg"
                variant="amber"
                className="rounded-2xl"
              >
                {t("hero_start", "Начать проект")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                as="a"
                href="#/services"
                size="lg"
                variant="secondary"
                className="rounded-2xl"
              >
                {t("hero_services_btn", "Услуги и цены")}
              </Button>
              <div className="text-sm text-white/80">
                {t("hero_sla", "Ответ за 24 часа в будни")}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> {t("hero_b1", "Комплаенс-by-design")}
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4" /> {t("hero_b2", "20+ юрисдикций")}
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" /> {t("hero_b3", "100+ успешных кейсов")}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">
                  {t("hero_quick", "Быстрый запрос")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input
                    placeholder={t("hero_name", "Ваше имя")}
                    className="bg-white/95"
                    aria-label={t("hero_name", "Ваше имя")}
                  />
                  <Input
                    placeholder={t("hero_email", "Email")}
                    type="email"
                    className="bg-white/95"
                    aria-label="Email"
                  />
                  <Input
                    placeholder={t("hero_phone", "Телефон / WhatsApp")}
                    className="bg-white/95"
                    aria-label="Телефон"
                  />
                  <Input
                    placeholder={t(
                      "hero_task",
                      "Кратко о задаче (напр. DMCC холдинг)"
                    )}
                    className="bg-white/95"
                    aria-label="Задача"
                  />
                  <Button className="w-full rounded-2xl bg-amber-500 text-black hover:bg-amber-400">
                    {t("hero_send", "Отправить")}
                  </Button>
                  <p className="text-xs text-white/80">
                    {t(
                      "hero_consent",
                      "Отправляя, вы соглашаетесь с политикой конфиденциальности."
                    )}
                  </p>
                </div>
              </CardContent>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueProps({ t }) {
  const items = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: t("vp1_title", "Юридическая безопасность"),
      text: t(
        "vp1_text",
        "Соблюдаем KYC/AML и требования регуляторов с первого шага."
      ),
    },
    {
      icon: <Globe2 className="h-5 w-5" />,
      title: t("vp2_title", "Международный охват"),
      text: t(
        "vp2_text",
        "ОАЭ, Кипр, Европа, Саудовская Аравия и другие юрисдикции."
      ),
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      title: t("vp3_title", "Индивидуальный подход"),
      text: t(
        "vp3_text",
        "Решения под задачи владельца, а не под шаблон."
      ),
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: t("vp4_title", "Репутация и скорость"),
      text: t(
        "vp4_text",
        "Быстрые сроки без компромисса к качеству."
      ),
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-2xl bg-purple-600/10 text-purple-700 grid place-items-center mb-4">
                  {it.icon}
                </div>
                <div className="font-semibold mb-1">{it.title}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {it.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ t }) {
  const items = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: t("svc_incorp_title", "Регистрация компаний"),
      text: t(
        "svc_incorp_desc",
        "Открытие, банк, субстанция, сопровождение."
      ),
      href: "#/services?tab=incorporation",
    },
    {
      icon: <ScrollText className="h-5 w-5" />,
      title: t("svc_family_title", "Семейное и наследственное право"),
      text: t(
        "svc_family_desc",
        "Брачные контракты, трасты, наследственные дела."
      ),
      href: "#/services?tab=family",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: t("svc_contracts_title", "Договоры и сопровождение"),
      text: t(
        "svc_contracts_desc",
        "Договоры МВЭД, комплаенс, корпоративное право."
      ),
      href: "#/services?tab=contracts",
    },
    {
      icon: <Landmark className="h-5 w-5" />,
      title: t("svc_tax_title", "Структуры и налоги"),
      text: t("svc_tax_desc", "Холдинги, фонды, льготы, ДИДН."),
      href: "#/services?tab=tax",
    },
    {
      icon: <Gavel className="h-5 w-5" />,
      title: t("svc_disputes_title", "Медиация и споры"),
      text: t(
        "svc_disputes_desc",
        "Преддоговорная и коммерческая медиация."
      ),
      href: "#/services?tab=disputes",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: t("svc_compliance_title", "Комплаенс сопровождение"),
      text: t(
        "svc_compliance_desc",
        "Политики, процедуры, подготовка к проверкам."
      ),
      href: "#/services?tab=compliance",
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {t("services_title", "Наши услуги")}
          </h2>
          <Button
            as="a"
            href="#/services"
            variant="ghost"
            className="hidden md:inline-flex rounded-xl"
          >
            {t("more", "Подробнее")} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-orange-600 grid place-items-center">
                    {it.icon}
                  </div>
                  <div className="font-semibold">{it.title}</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {it.text}
                </p>
                <Button as="a" href={it.href} variant="ghost" className="rounded-xl px-3">
                  {t("more", "Подробнее")}{" "}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ t }) {
  const stats = [
    { k: "20+", v: t("stats_juris", "Юрисдикций") },
    { k: "100+", v: t("stats_cases", "Кейсов") },
    { k: "$1.3M", v: t("stats_saved", "Сэкономлено клиентам") },
    { k: "24h", v: t("stats_first", "На первый ответ") },
  ];
  return (
    <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-orange-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
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

function QuizTeaser({ t }) {
  const steps = [
    t("quiz_step1", "Юрисдикция"),
    t("quiz_step2", "Налоговая цель"),
    t("quiz_step3", "Банк"),
    t("quiz_step4", "Сроки"),
  ];
  return (
    <section id="quiz" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl font-semibold">
              {t("quiz_title", "Jurisdiction in One Minute")}
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl">
              {t(
                "quiz_desc",
                "Ответьте на 6–8 простых вопросов и получите первичный маршрут: подходящие зоны, ориентировочные сборы и требования к субстанции."
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl px-3 py-2 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700"
                >
                  <Check className="h-4 w-4 text-green-600" /> {s}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button as="a" href="#/services" className="rounded-2xl">
                {t("quiz_take", "Пройти тест")}
              </Button>
              <Button variant="ghost" className="rounded-2xl">
                {t("quiz_example", "Смотреть пример")}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card className="dark:bg-gray-900 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-gray-100">
                  {t("quiz_preview", "Превью результата")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30">
                  <div className="flex items-center gap-2 font-medium text-purple-700 dark:text-purple-200">
                    <Building2 className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                    {t("quiz_suitable", "Подойдут: DMCC, IFZA")}
                  </div>
                  <Badge className="bg-amber-200 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200">
                    {t("quiz_uae", "ОАЭ")}
                  </Badge>
                </div>

                <div className="p-3 rounded-xl bg-orange-50 dark:bg-amber-900/20">
                  <div className="font-medium mb-1 text-amber-900/80 dark:text-amber-100">
                    {t("quiz_fees", "Оценка сборов")}
                  </div>
                  <div className="text-gray-600 dark:text-gray-200">
                    {t("quiz_fees_line", "Регистрация: $3.5–6k • Банк: 2–4 недели")}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/70">
                  <div className="font-medium mb-1 text-gray-900/80 dark:text-gray-100">
                    {t("quiz_req", "Требования")}
                  </div>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-200">
                    <li>{t("quiz_r1", "Субстанция: flex (офис по требованию)")}</li>
                    <li>{t("quiz_r2", "Директор-резидент: не требуется")}</li>
                    <li>{t("quiz_r3", "KYC: стандартный")}</li>
                  </ul>
                </div>

                <Button className="w-full rounded-2xl">
                  {t("quiz_get", "Получить подробный отчёт")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesList({ t }) {
  const items = [
    {
      tag: t("case1_tag", "DMCC"),
      title: t("case1_title", "Холдинг для e-commerce в ОАЭ"),
      text: t(
        "case1_text",
        "Оптимизация НДС ЕС, платёжные провайдеры, комплаенс-процедуры."
      ),
    },
    {
      tag: t("case2_tag", "Фонд"),
      title: t("case2_title", "Семейный фонд для наследования"),
      text: t(
        "case2_text",
        "Структура владения активами в 3 странах, контроль и защита."
      ),
    },
    {
      tag: t("case3_tag", "M&A"),
      title: t("case3_title", "Сделка по трансграничному контракту"),
      text: t(
        "case3_text",
        "Договорная база, санкционные проверки, KYC контрагента."
      ),
    },
  ];
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {t("cases_title", "Недавние проекты")}
          </h2>
          <Button
            as="a"
            href="#/cases"
            variant="ghost"
            className="hidden md:inline-flex rounded-xl"
          >
            {t("more", "Все кейсы")} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm px-2 py-1 rounded-full bg-amber-100 text-amber-900">
                    {it.tag}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t("confidential", "Конфиденциально")}
                  </div>
                </div>
                <div className="font-semibold mb-1">{it.title}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {it.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ t }) {
  const items = [
    { name: t("rev1_name", "Алина, владелец IT-агентства"), text: t("rev1_text", "На практике — очень быстро и чётко, по чек-листу. Банк открыли без нервов.") },
    { name: t("rev2_name", "Олег, e-commerce"), text: t("rev2_text", "Помогли со структурой в ОАЭ и Европейским НДС. Теперь масштабируемся.") },
    { name: t("rev3_name", "N. Family Office"), text: t("rev3_text", "Проработали наследственные сценарии, всё аккуратно и заранее.") },
  ];
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {t("reviews_title", "Отзывы")}
        </h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  “{it.text}”
                </p>
                <div className="mt-4 text-sm font-medium">{it.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ t }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900 via-purple-800 to-orange-600" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 items-center gap-8 text-white">
          <div className="lg:col-span-8">
            <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">
              {t(
                "cta_title",
                "Готовы начать? Обсудим вашу задачу и предложим маршрут за 24 часа"
              )}
            </h3>
            <p className="mt-2 text-white/90">
              {t("cta_text", "Без навязчивых продаж. Конфиденциально.")}
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-2 flex gap-2">
              <Input placeholder="Email" className="bg-white/95" />
              <Button variant="amber" className="rounded-xl">
                {t("send", "Отправить")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   Routes
----------------------------------------------------------- */
function HomePage({ t }) {
  return (
    <Page>
      <HomeHero t={t} />
      <ValueProps t={t} />
      <ServicesGrid t={t} />
      <Stats t={t} />
      <QuizTeaser t={t} />
      <CasesList t={t} />
      <Testimonials t={t} />
      <CTA t={t} />
    </Page>
  );
}

function AboutPage() {
  const highlights = [
    { k: "20+", v: "юрисдикций работы" },
    { k: "100+", v: "успешных кейсов" },
    { k: "10+", v: "лет практики" },
  ];
  return (
    <Page>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-semibold">
              О компании ProLegall
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Мы — бутиковая юридическая команда, фокус на международных
              структурах, семейном праве и сопровождении бизнеса в ОАЭ и
              Европе. Работаем прозрачно, соблюдая требования банков и
              регуляторов с первого шага.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-8">
                  <div className="text-3xl font-semibold">{h.k}</div>
                  <div className="text-gray-600 dark:text-gray-300">{h.v}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Подход</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300 space-y-3 text-sm">
                <p>
                  • Аналитика перед стартом: проверяем санкционные риски,
                  банковскую приемлемость и требования к субстанции.
                </p>
                <p>
                  • Комплаенс-by-design: документы и структура готовятся с
                  учётом будущих проверок.
                </p>
                <p>
                  • Работаем блоками: быстрый MVP-результат, затем
                  масштабирование.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Команда</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300 text-sm">
                Небольшая кросс-юрисдикционная команда, привлекаем локальных
                консультантов там, где нужен лицензированный представитель.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Page>
  );
}

function ServicesPage() {
  const tabs = [
    { id: "incorporation", title: "Регистрация компаний", icon: <Building2 className="h-4 w-4" /> },
    { id: "tax", title: "Структуры и налоги", icon: <Landmark className="h-4 w-4" /> },
    { id: "family", title: "Семейное/наследственное", icon: <ScrollText className="h-4 w-4" /> },
    { id: "contracts", title: "Договоры и сопровождение", icon: <FileText className="h-4 w-4" /> },
    { id: "compliance", title: "Комплаенс", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "disputes", title: "Медиация/споры", icon: <Gavel className="h-4 w-4" /> },
  ];
  const getTabFromHash = () =>
    new URLSearchParams((window.location.hash.split("?")[1]) || "").get("tab") ||
    "incorporation";
  const [tab, setTab] = useState(getTabFromHash());
  useEffect(() => {
    const onHash = () => setTab(getTabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const content = useMemo(
    () => ({
      incorporation: {
        lead:
          "Открытие компаний в ОАЭ (DMCC, IFZA, RAKEZ), Кипр и ЕС. Полный цикл: учредительные, банк, субстанция, отчётность.",
        price: "от $3.5k",
        bullets: [
          "Подбор юрисдикции и зоны",
          "Комплект учредительных",
          "Открытие счёта (личн./корп.)",
          "Локальные провайдеры и адрес",
        ],
      },
      tax: {
        lead:
          "Проектируем холдинги, фонды, кросс-границ. Комбинируем договоры об избежании двойного налогообложения и местные льготы.",
        price: "проектно",
        bullets: [
          "Холдинговые структуры",
          "Налоговое резидентство",
          "ВНЖ/субстанция",
          "НДС ЕС и OSS",
        ],
      },
      family: {
        lead:
          "Брачные контракты, трасты, family foundation в ОАЭ, наследование активов в нескольких странах.",
        price: "от €1.5к",
        bullets: ["Брачные договоры", "Трасты/фонды", "Завещания", "Опека и контроль"],
      },
      contracts: {
        lead:
          "Договоры МВЭД, корпораты, KYC-пакеты, санкционные оговорки. Рус/Eng.",
        price: "от €900",
        bullets: ["Поставка/агентские", "NDA/NCA", "SHA/SPA", "Политики и процедуры"],
      },
      compliance: {
        lead:
          "KYC/AML, риск-политики, внутренний контроль, подготовка к проверкам банков/регуляторов.",
        price: "под задачу",
        bullets: ["KYC/AML фреймворк", "Риск-оценка", "Коммуникации с банками", "Тренинг команды"],
      },
      disputes: {
        lead:
          "Досудебная медиация, коммерческие переговоры, арбитражные оговорки.",
        price: "помесячно",
        bullets: ["Оценка позиций", "Стратегия переговоров", "Арбитражные форумы", "Settlement"],
      },
    }),
    []
  );

  const active = content[tab];

  return (
    <Page>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Услуги</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <a
                key={t.id}
                href={`#/services?tab=${t.id}`}
                className={cx(
                  "px-3 py-2 rounded-xl text-sm border inline-flex items-center",
                  tab === t.id
                    ? "bg-purple-700 text-white border-purple-700"
                    : "bg-white hover:bg-gray-50"
                )}
              >
                {t.icon}
                <span className="ml-2">{t.title}</span>
              </a>
            ))}
          </div>
          <Card className="mt-6">
            <CardContent className="p-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="text-lg font-medium">{active.lead}</div>
                <ul className="mt-4 list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  {active.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/30 p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-200">
                    Ориентировочная стоимость
                  </div>
                  <div className="text-2xl font-semibold mt-1">{active.price}</div>
                  <Button as="a" href="#/contact" className="w-full mt-4">
                    Запросить смету
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Page>
  );
}

function CasesPage() {
  return <HomePage t={(k, f) => f} />; // keep simple demo here
}

function ContactPage({ t }) {
  return (
    <Page>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            {t("contacts_title", "Контакты")}
          </h1>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("write_us", "Напишите нам")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Имя" aria-label="Имя" />
                  <Input placeholder="Email" type="email" aria-label="Email" />
                </div>
                <Input
                  placeholder="Телефон / Telegram / WhatsApp"
                  aria-label="Телефон"
                />
                <Textarea placeholder="Кратко опишите задачу" aria-label="Сообщение" />
                <div className="flex items-center gap-3">
                  <Button className="rounded-2xl">{t("send", "Отправить")}</Button>
                  <span className="text-xs text-gray-500">
                    Отправляя, вы соглашаетесь с политикой конфиденциальности.
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("details_contact", "Реквизиты и связь")}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> info@prolegall.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> +370 xxx xxxx (TG/WA)
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Вильнюс, Литва
                </div>
                <a className="inline-flex items-center gap-2 hover:underline" href="#/">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Page>
  );
}

function PrivacyPage() {
  return (
    <Page>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Политика конфиденциальности
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Эта политика описывает, какие данные мы собираем, как используем и как
            обеспечиваем их безопасность.
          </p>
          <div className="mt-8 space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="font-semibold">1. Сбор данных</h2>
              <p>
                Мы собираем контактные данные (имя, email, телефон) и сведения о
                проекте, которые вы указываете в формах.
              </p>
            </section>
            <section>
              <h2 className="font-semibold">2. Использование</h2>
              <p>
                Данные используются для коммуникации, подготовки предложений и
                оказания услуг. Не передаются третьим лицам без правового
                основания.
              </p>
            </section>
            <section>
              <h2 className="font-semibold">3. Хранение и безопасность</h2>
              <p>
                Применяем организационные и технические меры защиты. Сроки хранения
                соответствуют требованиям договора и закона.
              </p>
            </section>
            <section>
              <h2 className="font-semibold">4. Ваши права</h2>
              <p>
                Вы можете запросить доступ, исправление или удаление данных:{" "}
                <a href="#/contact" className="text-purple-700 underline">
                  связаться с нами
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </Page>
  );
}

function TermsPage() {
  return (
    <Page>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Условия оказания услуг</h1>
          <div className="mt-6 space-y-6 text-sm text-gray-700 dark:text-gray-300">
            <p>
              Настоящие условия регулируют порядок оказания юридических услуг
              ProLegall.
            </p>
            <section>
              <h2 className="font-semibold">1. Предмет</h2>
              <p>
                Мы оказываем консультационные и представительные услуги по
                согласованному ТЗ и смете.
              </p>
            </section>
            <section>
              <h2 className="font-semibold">2. Оплата</h2>
              <p>Фиксированная стоимость или почасовая ставка. Аванс обязателен до начала работ.</p>
            </section>
            <section>
              <h2 className="font-semibold">3. Конфиденциальность</h2>
              <p>
                Информация, полученная от клиента, не раскрывается без его
                согласия, за исключением предусмотренных законом случаев.
              </p>
            </section>
            <section>
              <h2 className="font-semibold">4. Ответственность</h2>
              <p>
                Ответственность ограничивается размером фактически уплаченного
                вознаграждения за соответствующий этап работ.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Page>
  );
}

function NotFoundPage() {
  return (
    <Page>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="text-6xl font-bold">404</div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Страница не найдена
        </p>
        <div className="mt-6">
          <Button as="a" href="#/">
            На главную
          </Button>
        </div>
      </div>
    </Page>
  );
}

/* -----------------------------------------------------------
   App (Router)
----------------------------------------------------------- */
export default function ProLegallApp() {
  const hash = useHashRoute();
  const route = (hash.replace(/^#/, "") || "/").split("?")[0];
  const PageEl =
    {
      "/": HomePage,
      "/about": AboutPage,
      "/services": ServicesPage,
      "/cases": HomePage, // simple reuse
      "/contact": ContactPage,
      "/privacy": PrivacyPage,
      "/terms": TermsPage,
    }[route] || NotFoundPage;

  const { lang, setLang, t } = useLang();

  // apply saved theme on first load (for CDN setup)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  useEffect(() => {
    setFavicon();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <TopNav t={t} lang={lang} setLang={setLang} />
      <PageEl t={t} />
      <Footer t={t} />
    </div>
  );
}