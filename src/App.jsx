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
    en:{title:"Bahrain for European Holding and Investment Companies: A Cost-Effective Gateway to the Gulf",
        lead:"An efficient, lower-cost alternative in the Gulf for holdings and investment platforms.",
        body:[
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
    ru:{title:"Бахрейн для европейских холдингов и инвесткомпаний: доступный вход в Персидский залив",
        lead:"Экономичный вариант в регионе Залива для холдингов и инвестиционных компаний.",
        body:[
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
  "residency-tax-optimization": {
    en:{title:"Residence Permit and Tax Residency: How to Legally Optimize Taxes When Moving Abroad",
        lead:"Legal overview of how residence permits differ from tax residency, and how to relocate efficiently while remaining compliant.",
        body: [
  `<div style="font-size: 1.1rem; line-height: 1.8;">
  <h2>Introduction</h2>
  <p>In today’s global world, more and more people are asking themselves: “Where can I move to live comfortably and reduce my tax burden?”</p>

  <p>In this context, two legal concepts become key — <strong>residence permit</strong> and <strong>tax residency</strong>.</p>

  <p>At first glance, they may seem connected, but in fact, they are very different. Understanding these differences is what allows you to legally optimize your taxes.</p>

  <p>The goal of this article is to give a clear legal analysis of what residence permit and tax residency mean, and to outline a practical plan for relocation from a tax perspective.</p>

  <br/><hr/><br/>

  <h2>What Is a Residence Permit?</h2>
  <p>A residence permit is an administrative status that gives a foreigner the right to legally stay (and often work or do business) in a certain country.</p>
  <p>The rules, procedures, and benefits of residence permits vary depending on the national law of each country.</p>
  <p>A residence permit does not automatically mean that you become a tax resident of that country, although in practice, these two statuses sometimes overlap.</p>
  <p>From a legal perspective, it’s important to separate two aspects:</p>
  <ul>
    <li><strong>Immigration/administrative</strong> — a residence permit as permission to stay;</li>
    <li><strong>Tax/legal</strong> — tax residency status, which determines where your income is taxed.</li>
  </ul>
  <p>It’s possible to have a residence permit in Country A but still be a tax resident of Country B. Understanding how and why this happens is crucial for tax planning.</p>

  <br/><hr/><br/>

  <h2>What Is Tax Residency</h2>
  <p>A tax resident is a person who, under the laws of a country, is considered liable to pay taxes there because of their personal or economic ties — such as place of living, business activity, or family connections.</p>
  <p>Internationally, the main guidance comes from <strong>Article 4 of the OECD Model Tax Convention</strong> and national tax practices.</p>

  <h3>Key Criteria</h3>
  <ol>
    <li><strong>Days of stay</strong> — most countries use the “183 days per year” rule: if you spend at least 183 days in a country, you are considered a resident.</li>
    <li><strong>Permanent home</strong> — if you have housing available for your use at any time, this may indicate residency.</li>
    <li><strong>Center of vital interests</strong> — where your family, business, property, or main social ties are.</li>
    <li><strong>Habitual abode</strong> — if you regularly return to the same country, it may be considered your habitual residence.</li>
    <li><strong>Citizenship</strong> — used only as a last criterion when others don’t determine the result (usually in double tax treaties).</li>
  </ol>
  <p>When a person can potentially be considered a resident in two countries, a <strong>tie-breaker test</strong> is applied under Double Tax Treaties (DTTs) to determine which country’s residency takes priority.</p>

  <br/><hr/><br/>

  <h2>Legal Tax Optimization When Moving</h2>
  <p>Tax optimization is not tax evasion. It’s lawful planning — using existing legal tools to organize your affairs efficiently.</p>

  <h3>Step 1. Choose the target country of tax residency</h3>
  <p>Before relocating, select the country where you intend to become a tax resident. Key points to consider:</p>
  <ul>
    <li>Tax structure (income tax, capital gains, dividend tax);</li>
    <li>Available preferential regimes (for example, special rules for new residents);</li>
    <li>And most importantly — how this country defines tax residency.</li>
  </ul>

  <h3>Step 2. Cut ties with your previous country</h3>
  <p>If you plan to change tax residency, you need to reduce or eliminate the factors that make you a resident of your former country: limit days of stay, move your family or business, close local accounts, etc.</p>
  <p>Otherwise, your previous country might still treat you as its tax resident, causing double taxation or disputes.</p>

  <h3>Step 3. Strengthen your ties with the new country</h3>
  <p>Once you relocate, make sure you have a permanent home, registration (if required), local bank accounts, health insurance, and participation in the local community.</p>
  <p>These actions demonstrate that your center of life has shifted to the new country — reducing the risk of challenges from your former tax authority.</p>

  <h3>Step 4. Use available special tax regimes</h3>
  <p>Many countries offer beneficial tax programs — such as regimes for highly qualified professionals or exemptions on foreign income.</p>
  <p>However, such regimes often have deadlines or conditions (e.g., arrival before a certain date, minimum stay, or proof that you are no longer a tax resident elsewhere).</p>

  <h3>Step 5. Keep in mind new international rules</h3>
  <p>For instance, starting in 2026, the <strong>EU DAC8 Directive</strong> will require crypto platforms to share client data with tax authorities.</p>
  <p>This means crypto and DeFi income will no longer stay “off the radar.” If part of your assets or income is related to crypto, include this in your tax planning.</p>

  <br/><hr/><br/>

  <h2>Practical Examples</h2>

  <h3>Example 1: Moving from Lithuania to the UAE</h3>
  <p>If you spent more than 183 days in Lithuania (or meet the 280/90 rule — 280 days over two years and at least 90 in one of them), Lithuania may still treat you as its tax resident.</p>
  <p>If you obtained a UAE residence permit but did not reduce your presence in Lithuania or move your family and business to the UAE — you risk double residency.</p>
  <p>To avoid this: spend fewer days in Lithuania, move your assets and family to the UAE, and obtain a UAE tax residency certificate.</p>

  <h3>Example 2: Residence permit without lifestyle change</h3>
  <p>You received a residence permit in another country but continue to live mostly in your old one — same home, same habits. In this case, the new country may not recognize you as a tax resident, while the old one still does.</p>

  <h3>Example 3: Beneficial tax regime in a new country</h3>
  <p>You found a country offering a 10-year tax exemption on foreign income for new residents. If you meet all conditions — required stay, non-residency elsewhere — the optimization is legal. If not, the benefits can be withdrawn, and your old country may still treat you as its tax resident.</p>

  <br/><hr/><br/>

  <h2>Conclusion</h2>
  <p>Tax optimization through relocation is not simply about obtaining a residence permit. The key is moving your center of life and ensuring your actual circumstances match the legal criteria of tax residency.</p>
  <p>The right strategy follows this sequence:<br/>
  <strong>Choose your new country → Cut ties with the old one → Strengthen ties with the new → Apply available tax regimes → Consider global updates.</strong></p>
  <p>If these steps are properly structured, the risk of double residency is minimal, and your tax burden will be legally optimized.</p>

  <br/><hr/><br/>

  <h2>Disclaimer</h2>
  <p>This article is for informational purposes only and does not constitute legal advice.</p>
  <p>If you are planning to relocate or change your tax residency, you can contact <strong>PROLEGALL</strong>. We will analyze your situation, review the applicable laws, and propose the most effective and lawful solution in line with international agreements and tax implications.</p>
  </div>`
]},

    ru:{title:"ВНЖ и налоговый резидент: как легально оптимизировать налоги при переезде",lead:"Юридический анализ различий между ВНЖ и налоговым резидентством и практическая схема налогового планирования при переезде.",
    body: [
  `<div style="font-size: 1.1rem; line-height: 1.8;">
  <h2>Введение</h2>
  <p>В условиях глобализации и мобильности частных лиц всё чаще возникает задача: «куда переехать, чтобы и жить комфортно, и налогового бремени избежать либо минимизировать?»</p>
  <p>В этом контексте две юридические конструкции выходят на первый план: получение <strong>вида на жительство (ВНЖ)</strong> и определение <strong>налогового резидентства</strong>. На первый взгляд они связаны, но между ними имеются существенные различия — и именно знание этих различий даёт возможность законно оптимизировать налоги.</p>
  <p>Цель этой статьи — провести глубокий аналитический юридический обзор понятий «вид на жительство», «налоговый резидент», а также предложить практическую схему планирования переезда с точки зрения налогового резидентства.</p>

  <br/><hr/><br/>

  <h2>Понятие «вид на жительство» (ВНЖ)</h2>
  <p>«Вид на жительство» — это административно-правовой статус, который предоставляет иностранцу право легально находиться (и, нередко, работать или вести бизнес) в данной стране. Правовые основания, процедуры получения и привилегии ВНЖ зависят от национального законодательства конкретной страны.</p>
  <p>ВНЖ сам по себе не означает автоматическое признание налогового резидента той страны, хотя часто они совпадают.</p>
  <p>С точки зрения налогового права важно различать два аспекта:</p>
  <ul>
    <li><strong>Иммиграционный/административный</strong> — вид на жительство как разрешение пребывания;</li>
    <li><strong>Налогово-правовой</strong> — статус налогового резидента как лица, облагаемого налогами по правилам страны.</li>
  </ul>
  <p>Между ними возможна ситуация: вы получили ВНЖ в стране А, но фактически остаетесь налоговым резидентом страны B. Такое совпадение или несовпадение — именно предмет анализа.</p>

  <br/><hr/><br/>

  <h2>Понятие налогового резидентства</h2>
  <p>Налоговый резидент — лицо, которое в стране определено как подлежащее налогообложению по её законам на основании своих личных связей с этой страной (проживание, экономическая деятельность, центр интересов и др.).</p>
  <p>Основные международные ориентиры — положения <strong>Статьи 4 Модели конвенции ОЭСР (Model Tax Convention)</strong> и соответствующая национальная практика.</p>

  <h3>Основные критерии</h3>
  <ol>
    <li><strong>Количество дней пребывания</strong> — большинство стран используют правило «183 дней в календарном году»: если пребываете в стране ≥183 дней, становитесь резидентом.</li>
    <li><strong>Постоянное жилище</strong> — наличие жилья, пригодного для проживания в любое время, может указывать на резидентство.</li>
    <li><strong>Центр жизненных интересов</strong> — семья, бизнес-активность, имущество, социальные связи.</li>
    <li><strong>Обычное место проживания</strong> — если лицо постоянно возвращается в эту страну, она рассматривается как «обычное место проживания».</li>
    <li><strong>Гражданство</strong> — используется лишь как вспомогательный критерий, если предыдущие не дали ответа (обычно в налоговых конвенциях).</li>
  </ol>
  <p>Когда между двумя странами возможно претендовать на статус резидента — применяется <strong>tie-breaker</strong> (порядок определения при конфликте) в рамках Договоров об избежание двойного налогообложения (DTT). Это важный механизм — если вы попадаете под правила двух стран, нужно, чтобы один из критериев «победил».</p>

  <br/><hr/><br/>

  <h2>Законная налоговая оптимизация при переезде</h2>
  <p>Оптимизация — не уклонение, не сокрытие доходов, а предварительное планирование с использованием правовых возможностей. Рассмотрим шаги.</p>

  <h3>Шаг 1. Выбор целевой страны-резидента</h3>
  <p>Прежде чем переезжать, нужно выбрать страну, где вы намерены стать налоговым резидентом. При этом учитываются следующие моменты:</p>
  <ul>
    <li>Структура налогов (НДФЛ, налоги на капитал, дивиденды);</li>
    <li>Наличие льготных режимов (например, специальные режимы для новых резидентов);</li>
    <li>А также прежде всего — критерии признания резидента в этой стране.</li>
  </ul>

  <h3>Шаг 2. Прекращение связей с прежней страной-резидентом</h3>
  <p>Если вы хотите сменить налоговое резидентство, необходимо минимизировать признаки, по которым прежняя страна считает вас резидентом: сократить/прекратить дни пребывания, отделить семейные/экономические связи. Иначе прежняя страна может продолжать рассматривать вас как своего налогового резидента, что создаст двойное налогообложение или споры.</p>

  <h3>Шаг 3. Укрепление связей с новой страной-резидентом</h3>
  <p>После переезда — обеспечьте наличие постоянного жилья, регистрацию (если требуется), активность (работа или бизнес), банковские счета, медицинскую страховку, членство в обществе. Всё это служит признаком центра жизненных интересов. Это помогает «закрепить» налоговое резидентство новой страны и уменьшить риск оспаривания прежней.</p>

  <h3>Шаг 4. Использование льготных режимов</h3>
  <p>Многие страны предлагают льготные режимы: например, резидентство для высокооплачиваемых специалистов, освобождение от налогов на зарубежные доходы, льготные ставки на дивиденды/капитал. Но важно: такие режимы часто требуют временных дедлайнов — например, приезд до определённой даты, минимальный срок проживания, отказ от налогового резидентства прежней страны.</p>

  <h3>Шаг 5. Учитывайте новые международные правила</h3>
  <p>Например, с 2026 года в ЕС вступает в силу <strong>директива DAC8</strong>, по которой крипто-платформы обязаны передавать данные о клиентах налоговым органам. Это означает: доходы из криптовалют и DeFi больше не останутся «в тени». Поэтому, если часть ваших активов или доходов связана с крипто-рынком, это должно войти в налоговое планирование.</p>

  <br/><hr/><br/>

  <h2>Интерактивная таблица-калькулятор</h2>
  <p>В приложении (Excel-файл) представлена таблица, позволяющая на основе ваших вводных (страна, дни пребывания, постоянное жильё, центр интересов, гражданство, наличие DTT) получить предварительный вывод: «в какой стране вы, скорее всего, окажетесь налоговым резидентом».</p>
  <p>Этот инструмент — вспомогательный, не заменяет профессиональной консультации, но помогает визуализировать анализ.</p>

  <br/><hr/><br/>

  <h2>Практические ситуации</h2>

  <h3>Ситуация 1: Переезд из Литвы в ОАЭ</h3>
  <p>Вы провели в Литве более 183 дней либо подпадаете под правило 280/90 (сумма дней за два года и минимум 90 дней в одном из них) — тогда Литва вправе считать вас резидентом. Если вы получили ВНЖ в ОАЭ, но не сократили пребывание в Литве и не перенесли центр интересов в ОАЭ — существует риск двойного резидентства.</p>
  <p>Чтобы избежать его: уменьшите пребывание в Литве, переведите бизнес/семью/активы в ОАЭ, получите сертификат резидентства ОАЭ.</p>

  <h3>Ситуация 2: Получили ВНЖ в стране, но не изменили привычки жизни</h3>
  <p>Вы переехали, оформили ВНЖ, но продолжаете проводить целый год в прежней стране, держите дом там, не меняете привычный образ жизни. В этом случае новая страна может не признать вас резидентом, а прежняя — всё ещё считает.</p>

  <h3>Ситуация 3: Льготный режим в новой стране</h3>
  <p>Вы нашли страну с льготным налоговым режимом для новых резидентов (например, 10 лет освобождения от налогов на зарубежные доходы). Вы следуете предписаниям: проживание минимум X дней, не быть резидентом другой страны. Если всё выполнено — налоговая оптимизация законна. Если же выполнить не получается — льготы могут отменить, а прежняя страна может заявить, что вы всё ещё её резидент.</p>

  <br/><hr/><br/>

  <h2>Вывод</h2>
  <p>Налоговая оптимизация через переезд — это не про «сама по себе» смена ВНЖ. Ключевое — переезд центра жизни, изменение фактических обстоятельств, приведение в соответствие с критериями налогового резидентства.</p>
  <p>Правильная стратегия требует:<br/>
  <strong>Выбор страны-резидента → Прекращение связей с прежней страной → Укрепление связей с новой → Использование льготных режимов → Учёт международных нововведений.</strong></p>
  <p>Если все этапы выстроены грамотно — риск двойного резидентства минимален, налоговая нагрузка оптимальна и легальна.</p>

  <br/><hr/><br/>

  <h2>Дисклеймер</h2>
  <p>Настоящая статья подготовлена исключительно в информационных целях и не является юридической консультацией.</p>
  <p>Если вы планируете переезд или изменение налогового резидентства, вы можете обратиться к специалистам <strong>PROLEGALL</strong>. Мы детально изучим вашу ситуацию, проанализируем применимое законодательство и предложим оптимальное решение с учётом международных соглашений и налоговых последствий.</p>
  </div>`
]
},
  },
  "uae-property-taxes": {
  ru: {
    title: "Купили недвижимость в ОАЭ: какие налоги платить и как отчитываться",
    lead: "Полный юридический и налоговый обзор владения недвижимостью в ОАЭ: налоги при покупке, владении, продаже и рекомендации по законной оптимизации.",
    body: [
      `<div style="font-size: 1.1rem; line-height: 1.8;">

      <h2>Введение</h2>
      <p>ОАЭ давно считаются одной из самых привлекательных юрисдикций для инвесторов в недвижимость. Отсутствие налога на доходы физических лиц, гибкая визовая политика и высокий уровень правовой защиты собственности сделали рынок недвижимости Дубая и Абу-Даби точкой притяжения для частных и корпоративных покупателей со всего мира.</p>
      <p>Однако в последние годы налоговая система ОАЭ стала более комплексной. Введён корпоративный налог, действует НДС, а международные стандарты финансовой прозрачности (CRS, FATF, UBO) — обязывают инвесторов осознанно подходить к структуре владения и отчётности.</p>
      <p>Разберём, какие налоги реально существуют при покупке, владении и продаже недвижимости в ОАЭ, и как правильно выстроить юридическую и налоговую стратегию, чтобы избежать рисков и сохранить статус “чистого инвестора”.</p>

      <br/><hr/><br/>

      <h2>1. Налог на недвижимость в ОАЭ: миф или реальность</h2>
      <p>Главное преимущество ОАЭ — отсутствие ежегодного налога на недвижимость. Это принципиально отличает эмираты от большинства стран Европы и СНГ.</p>
      <p>После регистрации собственности владелец не обязан платить ежегодный налог на имущество. Вместо этого существуют единовременные сборы и коммунальные платежи, которые не имеют налогового характера.</p>
      <p><strong>Основные расходы при покупке:</strong></p>
      <ul>
        <li>Регистрационный сбор Dubai Land Department (DLD) — 4% от стоимости сделки.</li>
        <li>Административный сбор — от 500 до 5 000 дирхамов, в зависимости от типа объекта.</li>
      </ul>
      <p>Эти платежи оплачиваются при оформлении права собственности и не повторяются ежегодно.</p>

      <br/><hr/><br/>

      <h2>2. НДС (VAT): где скрыта тонкость</h2>
      <p>В 2018 году в ОАЭ введён налог на добавленную стоимость (VAT) по ставке 5%. Для недвижимости правила следующие:</p>
      <ul>
        <li>Первая продажа нового жилья от застройщика облагается НДС 5%.</li>
        <li>Перепродажа жилой недвижимости освобождена от НДС.</li>
        <li>Коммерческая недвижимость (офисы, склады, торговые площади) облагается НДС 5% независимо от того, первая это продажа или последующая.</li>
      </ul>
      <p>При этом:</p>
      <ul>
        <li>Сдача жилой недвижимости в аренду освобождена от НДС.</li>
        <li>Сдача коммерческой недвижимости в аренду — облагается НДС по ставке 5%.</li>
      </ul>
      <p>Если вы сдаёте объект самостоятельно, налоговым агентом становится арендодатель. Если через агентство — оно удерживает и перечисляет налог.</p>

      <br/><hr/><br/>

      <h2>3. Корпоративный налог: когда недвижимость превращается в бизнес</h2>
      <p>С июня 2023 года в ОАЭ действует корпоративный налог (Corporate Tax) в соответствии с Федеральным законом №47/2022. Ставка — 9% на прибыль свыше 375 000 AED.</p>
      <p>Физические лица, владеющие недвижимостью, не облагаются корпоративным налогом, если не ведут систематическую коммерческую деятельность. Но если недвижимость оформлена на компанию (например, Free Zone Entity) и она регулярно получает доход от аренды, власти могут квалифицировать это как бизнес-деятельность.</p>
      <p><strong>Ключевой критерий:</strong> регулярное получение прибыли, наличие нескольких объектов, ведение рекламной деятельности и заключение множества арендных договоров — всё это признаки коммерческой деятельности.</p>

      <br/><hr/><br/>

      <h2>4. Налоги при продаже недвижимости</h2>
      <p>Продажа недвижимости в ОАЭ не облагается налогом на прирост капитала.</p>
      <p>Если вы купили квартиру за 2 млн AED, а продали за 3 млн — налог с разницы платить не нужно.</p>
      <p><strong>Однако при продаже взимаются:</strong></p>
      <ul>
        <li>Регистрационный сбор (DLD) — около 4% от цены сделки.</li>
        <li>Комиссия агентства — 2–3%.</li>
      </ul>
      <p>Если продажей занимается компания, получающая прибыль на систематической основе, — возможно применение корпоративного налога.</p>

      <br/><hr/><br/>

      <h2>5. Владение через компанию или на физическое лицо: в чём разница</h2>
      <p>Многие инвесторы оформляют недвижимость на юридическое лицо, особенно если:</p>
      <ul>
        <li>планируют сдавать несколько объектов;</li>
        <li>хотят использовать недвижимость для бизнеса;</li>
        <li>стремятся защитить активы или получить корпоративный резидентский статус.</li>
      </ul>
      <p>Однако владение через компанию приводит к появлению налоговой и отчётной нагрузки:</p>
      <ul>
        <li>ежегодная отчётность;</li>
        <li>подтверждение экономического присутствия (Economic Substance);</li>
        <li>раскрытие бенефициаров (UBO);</li>
        <li>применение корпоративного налога.</li>
      </ul>
      <p>Если недвижимость приобретена на физическое лицо, отчётность проще, но статус владельца (резидент/нерезидент) может повлиять на налоговые обязательства в других странах.</p>

      <br/><hr/><br/>

      <h2>6. Международные аспекты: CRS, UBO и налоговое резидентство</h2>
      <p>ОАЭ участвуют в системе автоматического обмена налоговой информацией (CRS). Это означает, что банки и органы власти могут передавать сведения о владельцах недвижимости и банковских счетов в страну их налогового резидентства.</p>
      <p>Поэтому важно:</p>
      <ul>
        <li>правильно определить налоговый статус (Tax Residency);</li>
        <li>при необходимости получить Tax Residency Certificate (TRC) — официальный документ, подтверждающий, что вы являетесь налоговым резидентом ОАЭ.</li>
      </ul>
      <p>TRC выдаётся Министерством финансов ОАЭ при соблюдении условий (обычно — пребывание в стране 183+ дней, наличие жилья, банковского счёта, аренды или бизнеса). Этот сертификат используется для применения соглашений об избежании двойного налогообложения (DTT) между ОАЭ и другими странами.</p>

      <br/><hr/><br/>

      <h2>7. Как правильно отчитываться</h2>
      <p>Если вы налоговый резидент ОАЭ, но не ведёте бизнес — отчитываться о недвижимости не нужно.</p>
      <p>Если недвижимость сдаётся через компанию — подаётся корпоративная декларация.</p>
      <p>Если же вы являетесь налоговым резидентом другой страны (например, России, Литвы или Германии), то:</p>
      <ul>
        <li>вы обязаны задекларировать доход от аренды в своей стране;</li>
        <li>а также указать владение иностранными активами (в зависимости от местного законодательства).</li>
      </ul>

      <br/><hr/><br/>

      <h2>8. Практические рекомендации</h2>
      <ol>
        <li>Проверьте статус сделки по НДС — новая, коммерческая или перепродажа.</li>
        <li>Оформляйте владение стратегически: на физическое лицо — если цель личная; на компанию — если планируется бизнес.</li>
        <li>Получите TRC, если планируете использовать соглашения об избежании двойного налогообложения.</li>
        <li>Ведите учёт расходов и платежей — это упростит отчётность.</li>
        <li>Избегайте “пассивного бизнеса” без лицензии. Если вы системно сдаёте жильё, получите соответствующую лицензию и учитывайте корпоративный налог.</li>
      </ol>

      <br/><hr/><br/>

      <h2>9. Заключение</h2>
      <p>Система налогообложения недвижимости в ОАЭ остаётся одной из самых благоприятных в мире. Отсутствие налога на имущество и на прирост капитала делает страну привлекательной для частных инвесторов, а гибкая корпоративная среда — для профессиональных девелоперов.</p>
      <p>Тем не менее, при международном владении важно учитывать налоговое резидентство, соглашения DTT и стандарты прозрачности. Грамотное структурирование владения позволяет не только минимизировать риски, но и обеспечить полную налоговую легальность вашего статуса.</p>

      <br/><hr/><br/>

      <h2>Дисклеймер</h2>
      <p>Настоящая статья подготовлена исключительно в информационных целях и не является юридической консультацией.</p>
      <p>Для получения индивидуальной консультации вы можете обратиться к специалистам <strong>PROLEGALL</strong>, которые проведут анализ вашей ситуации и разработают стратегию владения и отчётности по недвижимости в ОАЭ с учётом международного законодательства.</p>

      </div>`
    ]
  },

  en: {
    title: "Bought Property in the UAE: What Taxes You Pay and How to Report",
    lead: "Comprehensive legal and tax analysis of real estate ownership in the UAE — taxes at purchase, during ownership, and at sale, plus compliance and reporting strategy.",
    body: [
      `<div style="font-size: 1.1rem; line-height: 1.8;">

      <h2>Introduction</h2>
      <p>The United Arab Emirates has long been one of the most attractive jurisdictions for real estate investors. The absence of personal income tax, flexible residency routes, and strong legal protection for property have made the markets of Dubai and Abu Dhabi a global magnet for private and corporate buyers.</p>
      <p>In recent years, however, the UAE tax framework has become more sophisticated. Corporate tax was introduced, VAT is in place, and international transparency standards (CRS, FATF, UBO) require investors to be deliberate about ownership structures and reporting.</p>
      <p>This article explains the actual taxes that may apply when you buy, hold, and sell property in the UAE—and how to design a compliant legal and tax strategy that avoids risk and preserves your status as a “clean investor.”</p>

      <br/><hr/><br/>

      <h2>1. Property Tax in the UAE: Myth or Reality</h2>
      <p>One of the UAE’s key advantages is the absence of an annual property (real estate) tax. This sets the Emirates apart from most European and CIS countries.</p>
      <p>After registering your title, you do not pay a yearly property tax simply for owning the asset. Instead, there are one-time government fees and ongoing maintenance charges that are not taxes.</p>
      <p><strong>Main costs on purchase include:</strong></p>
      <ul>
        <li>Dubai Land Department (DLD) registration/transfer fee — typically 4% of the property value.</li>
        <li>Administrative fee — roughly AED 500 to AED 5,000, depending on the case.</li>
      </ul>
      <p>These are due at the time of title transfer and are not recurring annually.</p>

      <br/><hr/><br/>

      <h2>2. VAT: The Subtle but Important Detail</h2>
      <p>Since 2018, the UAE has applied Value Added Tax (VAT) at 5%. For real estate, the general rules are:</p>
      <ul>
        <li>The first sale of <em>new</em> residential property by a developer is subject to 5% VAT.</li>
        <li>Resale of residential property is VAT-exempt.</li>
        <li>Commercial property (offices, warehouses, retail) is subject to 5% VAT on both first and subsequent sales.</li>
      </ul>
      <p>Additionally:</p>
      <ul>
        <li>Residential leases are VAT-exempt.</li>
        <li>Commercial leases are subject to 5% VAT.</li>
      </ul>
      <p>If you rent out directly, you (as landlord) are generally responsible for VAT registration/collection when required. If a management company or agency handles the lease, it typically administers VAT compliance per the arrangement.</p>

      <br/><hr/><br/>

      <h2>3. Corporate Tax: When Property Becomes a Business</h2>
      <p>From June 2023, the UAE introduced corporate tax under Federal Decree-Law No. 47 of 2022. The standard rate is <strong>9%</strong> on taxable profits exceeding <strong>AED 375,000</strong>.</p>
      <p>Individuals owning property are not subject to corporate tax unless their activities amount to carrying on a business. However, where real estate is owned through a company (e.g., a free zone or mainland entity) that regularly earns rental income, the activity may be classified as a business and fall under corporate taxation.</p>
      <p><strong>Key indicators:</strong> sustained profit generation, multiple units under management, advertising, and a regular flow of rental contracts—all point to commercial activity.</p>
      <p><strong>Free zone entities:</strong> certain “qualifying income” may be taxed at 0% if the entity meets all free zone requirements; non-qualifying income is typically taxed at 9%.</p>

      <br/><hr/><br/>

      <h2>4. Taxes on Sale of Property</h2>
      <p>The UAE does not impose a capital gains tax on the sale of real estate.</p>
      <p>Thus, if you bought for AED 2 million and sold for AED 3 million, the gain is not subject to a capital gains tax in the UAE.</p>
      <p><strong>However, on sale you should account for:</strong></p>
      <ul>
        <li>DLD transfer fee — about 4% of the sale price (often shared/allocated per contract).</li>
        <li>Agency commission — typically 2–3%.</li>
      </ul>
      <p>Where sales are made by a company on a business-like, ongoing basis, profits may be taxed under the corporate tax regime.</p>

      <br/><hr/><br/>

      <h2>5. Holding via Company vs. Individual Name</h2>
      <p>Many investors acquire property through a legal entity, especially where they:</p>
      <ul>
        <li>own or plan to acquire several units,</li>
        <li>intend to use the asset in a broader business model,</li>
        <li>seek asset protection or corporate residency options.</li>
      </ul>
      <p>Note that corporate ownership brings additional obligations:</p>
      <ul>
        <li>annual accounting and corporate tax filings (as applicable),</li>
        <li>Economic Substance reporting where relevant,</li>
        <li>UBO (ultimate beneficial owner) disclosure,</li>
        <li>potential exposure to corporate tax.</li>
      </ul>
      <p>Ownership in a personal name generally involves lighter reporting in the UAE, but your personal <em>foreign</em> tax residency may create obligations in your home country.</p>

      <br/><hr/><br/>

      <h2>6. International Aspects: CRS, UBO, and Tax Residency</h2>
      <p>The UAE participates in the Common Reporting Standard (CRS). Banks and authorities may exchange financial and ownership data with your country of tax residence.</p>
      <p>Accordingly, it is important to:</p>
      <ul>
        <li>determine your tax residency status correctly; and</li>
        <li>obtain a UAE <strong>Tax Residency Certificate (TRC)</strong> from the Ministry of Finance where you qualify.</li>
      </ul>
      <p>The TRC confirms UAE tax residency and allows application of Double Tax Treaties (DTTs). Typical eligibility includes 183+ days of presence per year, accommodation, a UAE bank account, and valid immigration/economic ties.</p>

      <br/><hr/><br/>

      <h2>7. Reporting Obligations</h2>
      <p>If you are a UAE tax resident and do not run a business, you typically do not file a property tax return in the UAE (there is no annual property tax).</p>
      <p>Where property is held via a company, corporate filings (and possibly VAT filings) may be required.</p>
      <p>If you remain a tax resident of another country (e.g., Russia, Lithuania, Germany), you usually must:</p>
      <ul>
        <li>declare your UAE rental income at home per domestic rules; and</li>
        <li>report foreign assets where required by local law—even if no income is currently generated.</li>
      </ul>

      <br/><hr/><br/>

      <h2>8. Practical Recommendations</h2>
      <ol>
        <li>Confirm the VAT profile of your transaction — new build, resale, or commercial.</li>
        <li>Choose ownership form strategically:
          <ul>
            <li>Personal name — for private use or passive investment;</li>
            <li>Company — for business models or multiple units.</li>
          </ul>
        </li>
        <li>Obtain a UAE TRC if you plan to rely on tax treaties.</li>
        <li>Keep complete records of all payments, contracts, and fees to simplify compliance.</li>
        <li>Avoid operating as an “unlicensed business.” If you rent systematically, secure the correct permits and consider corporate tax/VAT registration where applicable.</li>
      </ol>

      <br/><hr/><br/>

      <h2>9. Conclusion</h2>
      <p>The UAE remains one of the world’s most investor-friendly real estate tax environments. No annual property tax and no capital gains tax—combined with straightforward ownership—make it attractive for private and institutional investors alike.</p>
      <p>Nevertheless, international transparency and the corporate tax regime require diligence. A well-structured ownership model preserves compliance, protects assets, and maintains full legal and tax transparency.</p>

      <br/><hr/><br/>

      <h2>Disclaimer</h2>
      <p>This article is for informational purposes only and does not constitute legal advice.</p>
      <p>For personalized guidance, contact <strong>PROLEGALL</strong> — we will review your specific circumstances and develop a compliant legal and tax strategy for your UAE real estate, aligned with international standards.</p>

      </div>`
    ]
  }
  },
  "bahrain-fintech-registration": {
  ru: {
    title: "Регистрация финтех-компании в Бахрейне: пошаговый гайд, лицензирование и налоговые преимущества",
    lead: "Пошаговое руководство по регистрации финтех-компании в Бахрейне, получению лицензии Центрального банка (CBB) и использованию налоговых преимуществ юрисдикции.",
    body: [
      `<div style="font-size: 1.1rem; line-height: 1.8;">
      
      <h2>Введение</h2>
      <p>Бахрейн уверенно закрепился как финансово-технологический (финтех) хаб Ближнего Востока, конкурируя с ОАЭ и Саудовской Аравией. Небольшое королевство стало одним из первых государств региона, внедривших регулирование финтеха на уровне Центрального банка (CBB) и создавших уникальные возможности для международных стартапов, инвесторов и компаний, работающих в сфере цифровых финансов, платежных решений и блокчейн-технологий.</p>
      <p>В этой статье мы подробно разберем:</p>
      <ul>
        <li>как получить финтех-лицензию в Бахрейне;</li>
        <li>какие требования предъявляет Central Bank of Bahrain (CBB);</li>
        <li>особенности налогообложения и корпоративного регулирования;</li>
        <li>и почему Бахрейн становится оптимальной юрисдикцией для регистрации финтех-компаний в 2025 году.</li>
      </ul>

      <br/><hr/><br/>

      <h2>Почему Бахрейн стал центром финтех-инноваций</h2>
      <p>В отличие от большинства государств Персидского залива, Бахрейн рано осознал потенциал финансовых технологий. Еще в 2017 году CBB запустил регуляторную песочницу (FinTech Sandbox) — контролируемое пространство, где компании могут тестировать инновационные продукты до получения лицензии.</p>
      <p><strong>Главные преимущества Бахрейна как юрисдикции:</strong></p>
      <ol>
        <li>Открытое и гибкое регулирование. CBB активно сотрудничает с финтех-компаниями, предоставляя индивидуальные решения.</li>
        <li>Низкая стоимость ведения бизнеса. Регистрация и сопровождение компании обходятся дешевле, чем в Дубае или Абу-Даби.</li>
        <li>Доступ к финансовому сектору GCC. Бахрейн — один из старейших банковских центров региона, с прямым доступом к Саудовской Аравии и Катару.</li>
        <li>Современная правовая база. Финансовое законодательство Бахрейна основано на принципах английского права, что делает его предсказуемым и понятным для международных инвесторов.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Регистрация финтех-компании в Бахрейне: шаг за шагом</h2>

      <h3>1. Определение бизнес-модели и лицензии</h3>
      <p>В первую очередь важно определить, к какой категории финтеха относится проект. Central Bank of Bahrain выделяет несколько типов лицензий:</p>
      <ul>
        <li>Payment Services Provider (PSP) — поставщики платежных решений;</li>
        <li>Crowdfunding Platforms — краудфандинговые сервисы;</li>
        <li>Crypto-asset Services — обмен и хранение цифровых активов;</li>
        <li>Open Banking Solutions — API-платформы для банков;</li>
        <li>Robo-Advisory и InsurTech — цифровые инвестиционные и страховые сервисы.</li>
      </ul>
      <p>Каждый тип деятельности регулируется отдельным разделом Rulebook CBB, который содержит требования к капиталу, корпоративной структуре, IT-безопасности и управлению рисками.</p>

      <h3>2. Создание юридического лица</h3>
      <p>Для большинства финтех-компаний подходит форма W.L.L. (With Limited Liability) — аналог европейского ООО. Регистрация проводится в Ministry of Industry and Commerce (MOIC) и занимает в среднем 5–7 рабочих дней. После регистрации компания получает:</p>
      <ul>
        <li>Certificate of Incorporation — свидетельство о регистрации;</li>
        <li>Commercial Registration (CR) — разрешение на ведение деятельности;</li>
        <li>и далее подает заявку в Central Bank of Bahrain на получение лицензии.</li>
      </ul>

      <h3>3. Получение лицензии в Central Bank of Bahrain (CBB)</h3>
      <p>CBB рассматривает заявку в среднем 60–90 дней. Компания должна представить:</p>
      <ul>
        <li>бизнес-план и описание продукта;</li>
        <li>корпоративную структуру и данные о директорах;</li>
        <li>внутренние политики AML/KYC;</li>
        <li>подтверждение источников капитала.</li>
      </ul>
      <p>Важно, что CBB внимательно оценивает систему внутреннего контроля и комплаенс, даже для стартапов в песочнице.</p>

      <h3>4. FinTech Sandbox: тестирование перед лицензией</h3>
      <p>Если проект инновационный и еще не имеет устойчивой практики, можно подать заявку в CBB FinTech Sandbox.</p>
      <p><strong>Преимущества режима:</strong></p>
      <ul>
        <li>временная регистрация без лицензии (на 9–12 месяцев);</li>
        <li>упрощенные требования к капиталу;</li>
        <li>возможность тестировать решения с участием реальных пользователей;</li>
        <li>после успешного тестирования — упрощенный переход на полноценную лицензию.</li>
      </ul>

      <br/><hr/><br/>

      <h2>Налогообложение финтех-компаний в Бахрейне</h2>
      <p>Одно из ключевых преимуществ Бахрейна — отсутствие налога на прибыль и дивиденды.</p>
      <p><strong>Основные принципы налогового режима:</strong></p>
      <ul>
        <li>Корпоративный налог — 0% (за исключением нефтегазового сектора);</li>
        <li>НДС (VAT) — 10%, применяется к ограниченному кругу операций;</li>
        <li>Отсутствует налог на дивиденды, прирост капитала и репатриацию прибыли;</li>
        <li>Отсутствие валютного контроля — свободное движение капитала.</li>
      </ul>
      <p>Благодаря этому финтех-компании получают уникальную налоговую среду для международных расчетов и кросс-граничных транзакций.</p>

      <br/><hr/><br/>

      <h2>Регулирование цифровых активов и блокчейн-проектов</h2>
      <p>Бахрейн стал первой страной в регионе, где Центральный банк утвердил правила для криптоактивов (Crypto-Asset Module). Эти правила регулируют:</p>
      <ul>
        <li>биржи криптовалют;</li>
        <li>кастодиальные сервисы;</li>
        <li>провайдеров токенизации и STO;</li>
        <li>блокчейн-инфраструктуры.</li>
      </ul>
      <p>Регулирование соответствует принципам FATF и IOSCO, что делает юрисдикцию совместимой с международными стандартами AML/KYC.</p>

      <br/><hr/><br/>

      <h2>Почему стоит выбрать Бахрейн для финтеха в 2025 году</h2>
      <ol>
        <li>Гибкое регулирование и инновационность. CBB активно внедряет новые механизмы надзора и цифрового комплаенса.</li>
        <li>Прозрачная система лицензирования. Все требования опубликованы в открытом доступе, процесс понятен и прогнозируем.</li>
        <li>Налоговая нейтральность. Полное отсутствие корпоративных налогов создает конкурентное преимущество по сравнению с ОАЭ, Сингапуром и ЕС.</li>
        <li>Сильная финансовая инфраструктура. Бахрейн имеет один из самых устойчивых банковских секторов региона.</li>
        <li>Возможность международного роста. Финтех-компания из Бахрейна может без ограничений предоставлять услуги клиентам из GCC, Африки и Азии.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Заключение</h2>
      <p>Бахрейн сегодня — это реальный центр притяжения для финтех-компаний и инвесторов, ищущих сочетание правовой определенности, прозрачного регулирования и налоговых преимуществ. Благодаря активной позиции Центрального банка и поддержке инноваций со стороны государства, регистрация финтех-компании в Бахрейне стала не просто возможностью, а стратегическим шагом для развития бизнеса на Ближнем Востоке.</p>

      <br/><hr/><br/>

      <h2>Дисклеймер</h2>
      <p>Настоящая статья подготовлена исключительно в информационных целях и не является юридической консультацией.</p>
      <p>Для получения индивидуальных рекомендаций вы можете обратиться к специалистам <strong>PROLEGALL</strong> — мы оценим вашу структуру, требования к лицензии и предложим оптимальное решение под ваш бизнес.</p>

      </div>`
    ]
  },

  en: {
    title: "Registering a FinTech Company in Bahrain: Step-by-Step Guide, Licensing, and Tax Advantages",
    lead: "A comprehensive guide on obtaining a fintech license in Bahrain, meeting Central Bank (CBB) requirements, and leveraging tax advantages for 2025.",
    body: [
      `<div style="font-size: 1.1rem; line-height: 1.8;">
      
      <h2>Introduction</h2>
      <p>Bahrain has firmly established itself as a fintech hub in the Middle East, competing with the UAE and Saudi Arabia. The kingdom was one of the first in the region to implement fintech regulation under the Central Bank of Bahrain (CBB), creating unique opportunities for startups, investors, and digital finance companies.</p>
      <p>This article explains:</p>
      <ul>
        <li>how to obtain a fintech license in Bahrain;</li>
        <li>CBB regulatory requirements;</li>
        <li>taxation and corporate framework;</li>
        <li>and why Bahrain is the optimal jurisdiction for fintech registration in 2025.</li>
      </ul>

      <br/><hr/><br/>

      <h2>Why Bahrain is a FinTech Innovation Center</h2>
      <p>Unlike most Gulf states, Bahrain recognized the potential of financial technologies early. In 2017, the CBB launched the <strong>FinTech Regulatory Sandbox</strong> — a controlled environment allowing companies to test new solutions before full licensing.</p>
      <p><strong>Key advantages of Bahrain as a fintech jurisdiction:</strong></p>
      <ol>
        <li>Flexible and open regulation — the CBB collaborates directly with fintech innovators.</li>
        <li>Low business costs — setup and compliance are significantly cheaper than in Dubai or Abu Dhabi.</li>
        <li>Access to GCC financial markets — Bahrain is a historic banking hub with direct access to Saudi Arabia and Qatar.</li>
        <li>English law foundation — a predictable and investor-friendly legal framework.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Step-by-Step Registration of a FinTech Company</h2>

      <h3>1. Define Your Business Model and License Type</h3>
      <p>First, identify your fintech category. The CBB issues licenses for several types of activities:</p>
      <ul>
        <li>Payment Services Provider (PSP);</li>
        <li>Crowdfunding Platforms;</li>
        <li>Crypto-asset Services;</li>
        <li>Open Banking Solutions;</li>
        <li>Robo-Advisory and InsurTech services.</li>
      </ul>
      <p>Each type is governed by a separate section of the CBB Rulebook, covering capital requirements, corporate structure, IT security, and risk management.</p>

      <h3>2. Incorporate Your Company</h3>
      <p>The most common structure is <strong>W.L.L.</strong> (With Limited Liability), equivalent to a limited liability company. Registration with the Ministry of Industry and Commerce (MOIC) takes about 5–7 business days. After registration, the company receives:</p>
      <ul>
        <li>Certificate of Incorporation;</li>
        <li>Commercial Registration (CR);</li>
        <li>and may then apply for a CBB license.</li>
      </ul>

      <h3>3. Obtain a License from the Central Bank of Bahrain (CBB)</h3>
      <p>Review time is typically 60–90 days. The application must include:</p>
      <ul>
        <li>a business plan and product overview;</li>
        <li>corporate structure and directors’ information;</li>
        <li>AML/KYC internal policies;</li>
        <li>proof of capital sources.</li>
      </ul>
      <p>The CBB pays close attention to governance, internal controls, and compliance frameworks — even for startups in the sandbox.</p>

      <h3>4. FinTech Sandbox: Testing Before Full Licensing</h3>
      <p>If the project is innovative and not yet market-proven, you can apply to the <strong>CBB FinTech Sandbox</strong>.</p>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Temporary operation approval (9–12 months) without full licensing;</li>
        <li>Reduced capital requirements;</li>
        <li>Real-user testing under supervision;</li>
        <li>Simplified transition to full license after success.</li>
      </ul>

      <br/><hr/><br/>

      <h2>Taxation of FinTech Companies in Bahrain</h2>
      <p>Bahrain’s tax environment is one of the most favorable in the Middle East.</p>
      <p><strong>Main features:</strong></p>
      <ul>
        <li>Corporate tax — 0% (except oil & gas sector);</li>
        <li>VAT — 10%, limited to specific transactions;</li>
        <li>No tax on dividends, capital gains, or profit repatriation;</li>
        <li>No foreign exchange restrictions — full capital mobility.</li>
      </ul>
      <p>This setup allows fintech companies to operate internationally with optimal tax efficiency and regulatory transparency.</p>

      <br/><hr/><br/>

      <h2>Digital Assets and Blockchain Regulation</h2>
      <p>Bahrain was the first country in the Gulf to introduce a <strong>Crypto-Asset Module</strong> under the CBB Rulebook. It regulates:</p>
      <ul>
        <li>cryptocurrency exchanges;</li>
        <li>custody providers;</li>
        <li>tokenization and STO platforms;</li>
        <li>blockchain infrastructure operators.</li>
      </ul>
      <p>The framework aligns with FATF and IOSCO principles, ensuring international AML/KYC compliance.</p>

      <br/><hr/><br/>

      <h2>Why Choose Bahrain for FinTech in 2025</h2>
      <ol>
        <li>Innovative and flexible regulation — CBB embraces new technologies and digital compliance tools.</li>
        <li>Transparent licensing — requirements are public and the process is predictable.</li>
        <li>Tax neutrality — zero corporate tax offers an advantage over the UAE, Singapore, and EU jurisdictions.</li>
        <li>Strong financial sector — Bahrain’s banks provide a stable and integrated regional base.</li>
        <li>Cross-border reach — Bahrain-based fintechs can serve clients across GCC, Africa, and Asia seamlessly.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Conclusion</h2>
      <p>Bahrain is now a genuine fintech hub for entrepreneurs seeking legal clarity, transparent oversight, and exceptional tax conditions. With active Central Bank support and a pro-innovation government, establishing a fintech company in Bahrain is not just feasible but strategically advantageous for long-term Middle East growth.</p>

      <br/><hr/><br/>

      <h2>Disclaimer</h2>
      <p>This article is for informational purposes only and does not constitute legal advice.</p>
      <p>For personalized recommendations, contact <strong>PROLEGALL</strong> — we will assess your corporate structure, licensing needs, and propose the optimal solution for your fintech business.</p>

      </div>`
    ]
  }
  },
  "legal-design-business": {
  ru: {
    title: "Legal Design: почему современный бизнес должен переосмыслить оформление своих юридических документов",
    lead: "Legal Design — это новая философия юридической коммуникации, которая делает договоры понятными, визуально структурированными и удобными для восприятия клиентами и партнёрами.",
    body: [
      `<div style="font-size: 1.1rem; line-height: 1.8;">
      
      <h2>Введение</h2>
      <p>Юридический документ — это не просто набор формулировок и ссылок на нормы закона. Это инструмент коммуникации между людьми. Сегодня, когда бизнес стал глобальным, а контракты заключаются в разных юрисдикциях и языках, способ подачи юридического текста становится не менее важным, чем его содержание.</p>
      <p>Именно поэтому на первый план выходит подход <strong>Legal Design</strong> — новая философия работы с юридическими документами, сочетающая право, визуальную коммуникацию и пользовательский опыт.</p>

      <br/><hr/><br/>

      <h2>Что такое Legal Design?</h2>
      <p><strong>Legal Design</strong> — это методология, которая ставит в центр понимание клиента и пользователя. Её цель — сделать юридические документы:</p>
      <ul>
        <li>понятными,</li>
        <li>логичными,</li>
        <li>визуально структурированными,</li>
        <li>и, самое главное, удобными для восприятия.</li>
      </ul>
      <p>Другими словами, Legal Design — это <em>дизайн мышления, применённый к праву</em>. Принцип прост: если бизнес не может понять свой собственный договор, то его нельзя считать эффективным инструментом защиты.</p>

      <br/><hr/><br/>

      <h2>Почему традиционные документы больше не работают</h2>
      <p>Большинство договоров и политик, с которыми сталкивается бизнес, выглядят одинаково:</p>
      <ul>
        <li>длинные предложения на полстраницы,</li>
        <li>юридические термины без пояснений,</li>
        <li>отсутствие структуры, заголовков и визуальных акцентов.</li>
      </ul>
      <p>В итоге такие документы:</p>
      <ul>
        <li>отпугивают клиентов,</li>
        <li>создают риски непонимания,</li>
        <li>и часто не выполняют свою защитную функцию.</li>
      </ul>
      <p>Современный пользователь хочет быстро понять суть, а не тратить время на расшифровку канцеляризмов. Именно это Legal Design помогает решить.</p>

      <br/><hr/><br/>

      <h2>Принципы Legal Design: как выглядит современный договор</h2>

      <h3>1. Структура и визуальная логика</h3>
      <p>Каждый раздел должен иметь заголовок, подзаголовок и выделения ключевых пунктов. Например, вместо сплошного текста:</p>
      <blockquote>“The Parties shall undertake to…”</blockquote>
      <p>можно оформить так:</p>
      <p><strong>Обязательства сторон:</strong></p>
      <ul>
        <li>Поставщик обязуется…</li>
        <li>Клиент обеспечивает…</li>
      </ul>
      <p>Это делает документ читаемым и удобным для обсуждения.</p>

      <h3>2. Простота языка</h3>
      <p>Legal Design не означает «упрощение права» — он означает <strong>упрощение коммуникации</strong>. Текст должен быть профессиональным, но написанным человеческим языком.</p>

      <h3>3. Визуальные элементы</h3>
      <p>Схемы, инфографика, таймлайны, чеклисты — всё это помогает визуализировать процесс исполнения договора и сократить риск споров.</p>

      <h3>4. Пользовательский фокус</h3>
      <p>Каждый документ должен отвечать на вопрос: “Кто будет его читать и что он должен понять?” Контракт, написанный для предпринимателя, и договор для банка не могут выглядеть одинаково.</p>

      <br/><hr/><br/>

      <h2>Как Legal Design помогает бизнесу</h2>
      <ol>
        <li><strong>Экономит время и снижает ошибки.</strong> Чёткая структура помогает быстрее согласовывать документы и минимизировать недопонимание.</li>
        <li><strong>Укрепляет доверие клиентов.</strong> Прозрачный и понятный договор повышает репутацию компании и демонстрирует уважение к партнёрам.</li>
        <li><strong>Облегчает международные сделки.</strong> Legal Design особенно важен при cross-border контрактах, где стороны говорят на разных языках. Хорошо структурированный текст — универсален.</li>
        <li><strong>Снижает юридические риски.</strong> Половина судебных споров возникает из-за разного толкования условий. Legal Design делает их однозначными.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Legal Design в действии</h2>
      <p>Крупные международные компании (<strong>PwC, EY, IBM, SAP, Shell</strong>) уже внедрили Legal Design:</p>
      <ul>
        <li>контракты оформляются в виде интерактивных PDF с гиперссылками и иконками;</li>
        <li>compliance-политики содержат схемы и инфографику;</li>
        <li>NDA и соглашения с партнёрами стали короче и понятнее.</li>
      </ul>
      <p>Юридическая работа может быть эффективной и человечной одновременно — Legal Design это доказывает.</p>

      <br/><hr/><br/>

      <h2>Как внедрить Legal Design в своей компании</h2>
      <ol>
        <li><strong>Провести аудит документов.</strong> Определите, какие чаще всего вызывают вопросы или задержки.</li>
        <li><strong>Определить целевую аудиторию.</strong> Кто читает документы — юристы, менеджеры, клиенты или регуляторы?</li>
        <li><strong>Переписать текст с учётом UX.</strong> Разбейте абзацы, добавьте подзаголовки, удалите лишние обороты.</li>
        <li><strong>Создать шаблонный набор Legal Design-документов.</strong> NDA, договоры, политики — всё в едином стиле.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Пример: как это выглядит на практике</h2>
      <p><strong>До:</strong></p>
      <blockquote>Настоящим стороны пришли к соглашению, что Исполнитель обязуется оказать услуги надлежащего качества, в срок, предусмотренный Договором...</blockquote>
      <p><strong>После:</strong></p>
      <ul>
        <li>Исполнитель выполняет услуги в срок;</li>
        <li>Соблюдает стандарты качества;</li>
        <li>Информирует Заказчика о ходе выполнения.</li>
      </ul>
      <p>Тот же смысл, но в разы понятнее.</p>

      <br/><hr/><br/>

      <h2>Что делает PROLEGALL</h2>
      <p>Команда <strong>PROLEGALL</strong> внедряет Legal Design в корпоративные документы клиентов, помогая:</p>
      <ul>
        <li>адаптировать шаблоны под международные стандарты;</li>
        <li>визуализировать юридические процессы;</li>
        <li>обновить договоры, политики и внутренние регламенты;</li>
        <li>повысить доверие партнёров и регуляторов.</li>
      </ul>
      <p>Мы создаём юридические документы нового поколения — понятные, эстетичные и функциональные.</p>

      <br/><hr/><br/>

      <h2>Чеклист: применяет ли ваш бизнес Legal Design?</h2>
      <ul>
        <li>Документы структурированы и читаемы</li>
        <li>Используются подзаголовки и визуальные блоки</li>
        <li>Текст без избыточных формулировок</li>
        <li>Единый корпоративный стиль договоров</li>
        <li>Команда понимает содержание без «перевода юриста»</li>
      </ul>
      <p>Если хотя бы на один пункт ответ «нет» — пора внедрять Legal Design.</p>

      <br/><hr/><br/>

      <h2>Дисклеймер</h2>
      <p>Материал носит информационный характер и не является юридической консультацией.</p>
      <p>Для разработки Legal Design-документов под вашу отрасль обращайтесь к экспертам <strong>PROLEGALL</strong>. Мы проведём аудит и предложим современные решения под ваш бизнес.</p>

      </div>`
    ]
  },

  en: {
    title: "Legal Design: Why Modern Businesses Should Rethink How They Draft Legal Documents",
    lead: "Legal Design combines law, design, and user experience — transforming contracts into clear, visual, and user-friendly communication tools.",
    body: [
      `<div style="font-size: 1.1rem; line-height: 1.8;">

      <h2>Introduction</h2>
      <p>A legal document is not just a set of legal clauses — it is a communication tool between people. In the global business environment, where contracts span multiple jurisdictions and languages, how a legal text is presented is as important as what it says.</p>
      <p>This is where <strong>Legal Design</strong> comes in — a new philosophy of working with legal documents that combines law, visual communication, and user experience.</p>

      <br/><hr/><br/>

      <h2>What Is Legal Design?</h2>
      <p><strong>Legal Design</strong> is a user-centered methodology that aims to make legal documents:</p>
      <ul>
        <li>understandable,</li>
        <li>logical,</li>
        <li>visually structured,</li>
        <li>and easy to navigate.</li>
      </ul>
      <p>In short, Legal Design is <em>design thinking applied to law</em>. The core principle: if your business cannot clearly understand its own contract, that contract fails its purpose.</p>

      <br/><hr/><br/>

      <h2>Why Traditional Legal Documents No Longer Work</h2>
      <p>Most traditional contracts and policies suffer from the same issues:</p>
      <ul>
        <li>long, complex sentences spanning half a page,</li>
        <li>dense legal jargon without clarification,</li>
        <li>lack of headings and visual hierarchy.</li>
      </ul>
      <p>As a result, such documents:</p>
      <ul>
        <li>discourage clients,</li>
        <li>increase misunderstanding,</li>
        <li>and often fail to protect the business effectively.</li>
      </ul>
      <p>Modern users expect clarity, structure, and fast comprehension — exactly what Legal Design delivers.</p>

      <br/><hr/><br/>

      <h2>Core Principles of Legal Design</h2>

      <h3>1. Structure and Visual Logic</h3>
      <p>Each section must have clear headings, subheadings, and highlighted key points. Instead of:</p>
      <blockquote>“The Parties shall undertake to…”</blockquote>
      <p>Use structured layout:</p>
      <p><strong>Responsibilities of the Parties:</strong></p>
      <ul>
        <li>The Provider shall…</li>
        <li>The Client shall…</li>
      </ul>

      <h3>2. Plain Language</h3>
      <p>Legal Design does not mean oversimplifying the law — it means simplifying communication. The text remains professional but accessible to non-lawyers.</p>

      <h3>3. Visual Elements</h3>
      <p>Diagrams, flowcharts, and checklists help visualize obligations and reduce ambiguity.</p>

      <h3>4. User Focus</h3>
      <p>Every document must answer: “Who is going to read this, and what do they need to understand?” Contracts for entrepreneurs and banks cannot look the same.</p>

      <br/><hr/><br/>

      <h2>How Legal Design Benefits Business</h2>
      <ol>
        <li><strong>Saves time and reduces errors.</strong> Structured texts make negotiations faster and more accurate.</li>
        <li><strong>Builds trust.</strong> Transparent contracts improve reputation and client relationships.</li>
        <li><strong>Facilitates international deals.</strong> Cross-border contracts become easier to understand and negotiate.</li>
        <li><strong>Reduces legal risk.</strong> Clear language minimizes misinterpretation and disputes.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Legal Design in Practice</h2>
      <p>Global companies like <strong>PwC, EY, IBM, SAP, Shell</strong> already use Legal Design:</p>
      <ul>
        <li>Interactive PDF contracts with hyperlinks and icons;</li>
        <li>Compliance policies with flowcharts and visual diagrams;</li>
        <li>NDAs and partner agreements rewritten in plain, structured language.</li>
      </ul>
      <p>Legal Design shows that legal work can be efficient, transparent, and human-centered.</p>

      <br/><hr/><br/>

      <h2>How to Implement Legal Design in Your Company</h2>
      <ol>
        <li><strong>Audit existing documents.</strong> Identify those causing delays or confusion.</li>
        <li><strong>Define your audience.</strong> Tailor design and tone to readers — lawyers, managers, or clients.</li>
        <li><strong>Rewrite with UX principles.</strong> Break text into smaller parts, use headings and visuals.</li>
        <li><strong>Create Legal Design templates.</strong> Develop reusable NDAs, policies, and service agreements.</li>
      </ol>

      <br/><hr/><br/>

      <h2>Example: Before and After</h2>
      <p><strong>Before:</strong></p>
      <blockquote>The Parties hereby agree that the Contractor shall provide services of proper quality within the timeframe set in the Agreement…</blockquote>
      <p><strong>After:</strong></p>
      <ul>
        <li>Contractor delivers services on time;</li>
        <li>Meets quality standards;</li>
        <li>Keeps the Client informed on progress.</li>
      </ul>
      <p>Same meaning — vastly clearer communication.</p>

      <br/><hr/><br/>

      <h2>What PROLEGALL Does</h2>
      <p>At <strong>PROLEGALL</strong>, we apply Legal Design principles to transform our clients’ legal documents:</p>
      <ul>
        <li>adapting templates to international standards;</li>
        <li>visualizing legal workflows;</li>
        <li>updating contracts, policies, and regulations;</li>
        <li>strengthening partner and regulator trust.</li>
      </ul>
      <p>We create next-generation legal documents — clear, consistent, and visually engaging.</p>

      <br/><hr/><br/>

      <h2>Legal Design Checklist</h2>
      <ul>
        <li>Documents are structured and readable</li>
        <li>Headings, bullet points, and visual elements are used</li>
        <li>Text avoids excessive legal jargon</li>
        <li>Consistent corporate document style</li>
        <li>Teams understand documents without translation</li>
      </ul>
      <p>If you answered “no” to any — it’s time to implement Legal Design.</p>

      <br/><hr/><br/>

      <h2>Disclaimer</h2>
      <p>This article is for informational and educational purposes only and does not constitute legal advice.</p>
      <p>To develop Legal Design documents tailored to your business, contact <strong>PROLEGALL</strong>. We will audit your materials and create modern, customized legal solutions.</p>

      </div>`
    ]
  }
  },

}

const I18N = {
  en:{send:"Send",contact_consent:"By sending, you agree to the privacy policy.",about_title:"About PROLEGALL",about_intro:"We are a boutique legal firm focused on international business structuring, family & inheritance law, migration and compliance. We support clients in Europe and the Gulf, creating transparent, bank-ready solutions from day one.",about_highlight_juris:"jurisdictions",about_highlight_cases:"successful cases",about_highlight_years:"years of practice",about_approach_title:"Approach",about_approach_b1:"Pre-start analysis: we check sanctions risks, bank acceptability and substance requirements.",about_approach_b2:"Compliance-by-design: documents and structure are prepared to pass future checks.",about_approach_b3:"Step-by-step delivery: fast task execution and ongoing support.",about_team_title:"Team",about_team_text:"A compact cross-jurisdiction team; we involve local licensed advisors where required.",
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
    footer_contacts:"Contacts",footer_nav:"Navigation",footer_legal:"Legal",privacy:"",terms:"Terms of Service",footer_intro:"International company structuring, family wealth and inheritance planning, global mobility solutions.",contacts_title:"Contacts",write_us:"Write to us",details_contact:"Details & contact",location_vilnius:"Vilnius, Lithuania", location_baku:"Baku, Azerbaijan",
  },
  ru:{send:"Отправить",contact_consent:"Отправляя, вы соглашаетесь с политикой конфиденциальности.",about_title:"О компании PROLEGALL",about_intro:"Мы — бутиковая юридическая компания, оказывающая услуги в области международного структурирования бизнеса, семейного и наследственного права, миграции и комплаенса. Мы сопровождаем клиентов в Европе и странах Персидского залива, создавая прозрачные решения, соответствующие требованиям банков и регуляторов с самого первого шага.",about_highlight_juris:"юрисдикций",about_highlight_cases:"успешных кейсов",about_highlight_years:"лет практики",about_approach_title:"Подход",about_approach_b1:"Аналитика перед стартом: проверяем санкционные риски, банковскую приемлемость и требования к substance.",about_approach_b2:"Комплаенс-by-design: документы и структура готовятся с учётом будущих проверок.",about_approach_b3:"Наш подход — шаг за шагом: быстрое решение задач и комплексное сопровождение.",about_team_title:"Команда",about_team_text:"Небольшая кросс-юрисдикционная команда, привлекаем локальных консультантов там, где нужен лицензированный представитель.",
    nav_blog:"Блог",quiz_title:"Юрисдикция за одну минуту",location_vilnius:"Вильнюс, Литва", location_baku:"Баку, Азербайджан",
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
    cta_title:"",cta_text:"",
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

function SEO({ title, description, path = "/", lang = "en", type = "website", image = null, robots }) {
  const loc = typeof window !== "undefined" ? window.location : { origin: "https://prolegall.com" };
  const url = (loc.origin || "https://prolegall.com") + path;
  const site = "ProLegall";
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
    upsertMeta("property", "og:locale", locale);

    // Twitter basics
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    // Image (only if provided)
    const removeIfExists = (sel) => { const el = document.head.querySelector(sel); if (el) el.remove(); };
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    } else {
      removeIfExists('meta[property="og:image"]');
      removeIfExists('meta[name="twitter:image"]');
    }
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
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> WhatsApp / Telegram: +99450 5616306</li>
              <a href="https://www.linkedin.com/company/prolegall/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4"/><span>LinkedIn</span></a>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {t("location_baku","Baku, Azerbaijan")}</li>
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
              <li>© {new Date().getFullYear()} PROLEGALL</li>
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
          <Button as={Link} to="/blog" variant="ghost" className="hidden md:inline-flex rounded-xl">{t("more","Все кейсы")} <ChevronRight className="ml-1 h-4 w-4"/></Button>
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
  const posts=[{slug:"startup-visa-lithuania"},{slug:"uae-for-eu-it"},{slug:"bahrain-holdings"},{slug:"residency-tax-optimization"},{ slug: "uae-property-taxes" },{ slug: "bahrain-fintech-registration" },{ slug: "legal-design-business" }].map(p=>({...p,...BLOGS[p.slug][lang]}));
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
      "telephone":"+99450 5616306",
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
         <div className="mt-6 prose dark:prose-invert max-w-none text-sm">
  {data.body.map((p, i) => (
    <div key={i}
         dangerouslySetInnerHTML={{ __html: p }} />
  ))}
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
        description="Write to info@prolegall.com or WhatsApp/Telegram +99450 561 63 06. Office in Baku; work across EU and the Gulf."
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
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +99450 5616306 (TG/WA)</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {t("location_baku","Baku, Azerbaijan")}</div>
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
function useGA4(measurementId = "G-MD53313395") {
  const loc = useLocation();
  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("config", measurementId, {
      page_path: loc.pathname + loc.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [loc.pathname, loc.search, measurementId]);
}

function Shell() {
    useGA4("G-MD53313395");
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
