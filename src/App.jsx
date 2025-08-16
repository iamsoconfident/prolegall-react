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
  X
} from "lucide-react";

/**
 * ProLegall — Single-File SPA (Tailwind + tiny primitives, no external UI libs beyond framer-motion & lucide-react)
 * Routes: / (Главная), /about, /services, /cases, /contact, /privacy, /terms
 * Routing: hash-based (#/route) — works in this preview and in static hosting (Netlify, GitHub Pages).
 *
 * How to deploy quickly:
 * 1) Create a Vite + React app (npm create vite@latest prolegall -- --template react), replace App.jsx with this file's default export.
 * 2) Add Tailwind (standard 3-step setup) OR use Tailwind CDN if you prefer simplicity for static hosting.
 * 3) Build & deploy to Netlify. Hash routing requires no redirects.
 */

// ======================= Tiny UI primitives =======================
const cx = (...cls) => cls.filter(Boolean).join(" ");

function Button({ children, variant = "primary", className = "", size = "md", as: As = "button", ...props }) {
  const base = "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-2xl";
  const sizes = { sm: "px-3 py-2 text-sm", md: "px-4 py-2", lg: "px-5 py-3 text-base" };
  const variants = {
    primary: "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300",
    secondary: "bg-white/15 text-white border border-white/20 hover:bg-white/25 focus:ring-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
    amber: "bg-amber-500 text-black hover:bg-amber-400 focus:ring-amber-300",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
  };
  return (
    <As className={cx(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </As>
  );
}

function Card({ className = "", children }) {
  return <div className={cx("rounded-2xl bg-white shadow-sm border border-gray-200", className)}>{children}</div>;
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
        "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-400",
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
        "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-400 min-h-[120px]",
        className
      )}
      {...props}
    />
  );
}
function Badge({ children, className = "" }) {
  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", className)}>
      {children}
    </span>
  );
}

// ======================= Animations =======================
const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: 0.5, ease: "easeOut" } },
};
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

// ======================= Shared bits =======================
function Logo() {
  return (
    <a href="#/" className="flex items-center gap-2" aria-label="ProLegall home">
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 shadow-lg grid place-items-center">
        <Scale className="h-5 w-5 text-white" />
      </div>
      <div className="leading-tight">
        <div className="text-lg font-semibold tracking-tight">ProLegall</div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Family Office & Tax</div>
      </div>
    </a>
  );
}

const NAV = [
  { href: "#/services", label: "Услуги" },
  { href: "#/about", label: "О компании" },
  { href: "#/cases", label: "Проекты" },
  { href: "#/contact", label: "Контакты" },
];

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/" );
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function TopNav() {
  const [open, setOpen] = useState(false);
  const hash = useHashRoute();
  const route = (hash.replace(/^#/, "") || "/").split("?")[0];

  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b">
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
            <a href="#/privacy" className={cx("hover:text-purple-700", route === "/privacy" && "text-purple-700 font-medium")}>Политика</a>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button as="a" href="#/" variant="ghost" className="rounded-xl" aria-label="Switch language to English">EN</Button>
            <Button as="a" href="#/contact" className="rounded-2xl">Консультация</Button>
          </div>
          <button className="md:hidden p-2 rounded-xl border" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-3 grid gap-2 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="rounded-xl px-3 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>{n.label}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button as="a" href="#/contact" className="flex-1">Консультация</Button>
              <Button as="a" href="#/" variant="outline" className="flex-1">EN</Button>
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

function Footer() {
  return (
    <footer id="contact" className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-gray-600 max-w-xs">
              Международное налоговое планирование, наследственное право и регистрация компаний. Офисы: Вильнюс • Баку.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3">Контакты</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> info@prolegall.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> WhatsApp / Telegram: +370 xxx xxxx</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Вильнюс, Литва</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Навигация</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#/services" className="hover:text-purple-700">Услуги</a></li>
              <li><a href="#/about" className="hover:text-purple-700">О компании</a></li>
              <li><a href="#/cases" className="hover:text-purple-700">Кейсы</a></li>
              <li><a href="#/privacy" className="hover:text-purple-700">Политика</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Юридическое</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#/privacy" className="hover:text-purple-700">Политика конфиденциальности</a></li>
              <li><a href="#/terms" className="hover:text-purple-700">Условия оказания услуг</a></li>
              <li>© {new Date().getFullYear()} ProLegall</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ======================= Pages =======================
function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-orange-600" />
      <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-32 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div variants={item} className="lg:col-span-7 text-white">
            <Badge className="bg-amber-500/90 text-black mb-4">Европейский взгляд • Ближний Восток • ОАЭ</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              Международное структурирование, наследование и регистрация компаний —
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-white"> просто и безопасно</span>
            </h1>
            <p className="mt-5 text-lg text-white/90 max-w-2xl">
              Помогаем предпринимателям открыть и защитить бизнес в ОАЭ, Европе и за их пределами. Работаем быстро, прозрачно и бережно к рискам.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button as="a" href="#/contact" size="lg" variant="amber" className="rounded-2xl">
                Начать проект <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button as="a" href="#/services" size="lg" variant="secondary" className="rounded-2xl">
                Услуги и цены
              </Button>
              <div className="text-sm text-white/80">Ответ за 24 часа в будни</div>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Комплаенс-by-design</div>
              <div className="flex items-center gap-2"><Globe2 className="h-4 w-4" /> 20+ юрисдикций</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4" /> 100+ успешных кейсов</div>
            </div>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Быстрый запрос</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Ваше имя" className="bg-white/95" aria-label="Ваше имя" />
                  <Input placeholder="Email" type="email" className="bg-white/95" aria-label="Email" />
                  <Input placeholder="Телефон / WhatsApp" className="bg-white/95" aria-label="Телефон" />
                  <Input placeholder="Кратко о задаче (напр. DMCC холдинг)" className="bg-white/95" aria-label="Задача" />
                  <Button className="w-full rounded-2xl bg-amber-500 text-black hover:bg-amber-400">Отправить</Button>
                  <p className="text-xs text-white/80">Отправляя, вы соглашаетесь с политикой конфиденциальности.</p>
                </div>
              </CardContent>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { icon: <ShieldCheck className="h-5 w-5" />, title: "Юридическая безопасность", text: "Соблюдаем KYC/AML и требования регуляторов с первого шага." },
    { icon: <Globe2 className="h-5 w-5" />, title: "Международный охват", text: "ОАЭ, Кипр, Европа, Саудовская Аравия и другие юрисдикции." },
    { icon: <Users2 className="h-5 w-5" />, title: "Индивидуальный подход", text: "Решения под задачи владельца, а не под шаблон." },
    { icon: <Award className="h-5 w-5" />, title: "Репутация и скорость", text: "Быстрые сроки без компромисса к качеству." },
  ];
  return (
    <section id="why" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-2xl bg-purple-600/10 text-purple-700 grid place-items-center mb-4">
                  {it.icon}
                </div>
                <div className="font-semibold mb-1">{it.title}</div>
                <p className="text-sm text-gray-600">{it.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const items = [
    { icon: <Building2 className="h-5 w-5" />, title: "Регистрация компаний", text: "Открытие, банк, субстанция, сопровождение.", href: "#/services?tab=incorporation" },
    { icon: <ScrollText className="h-5 w-5" />, title: "Семейное и наследственное право", text: "Брачные контракты, трасты, наследственные дела.", href: "#/services?tab=family" },
    { icon: <FileText className="h-5 w-5" />, title: "Договоры и сопровождение", text: "Договоры МВЭД, комплаенс, корпоративное право.", href: "#/services?tab=contracts" },
    { icon: <Landmark className="h-5 w-5" />, title: "Структуры и налоги", text: "Холдинги, фонды, льготы, ДИДН.", href: "#/services?tab=tax" },
    { icon: <Gavel className="h-5 w-5" />, title: "Медиация и споры", text: "Преддоговорная и коммерческая медиация.", href: "#/services?tab=disputes" },
    { icon: <ShieldCheck className="h-5 w-5" />, title: "Комплаенс сопровождение", text: "Политики, процедуры, подготовка к проверкам.", href: "#/services?tab=compliance" },
  ];
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">Наши услуги</h2>
          <Button as="a" href="#/services" variant="ghost" className="hidden md:inline-flex rounded-xl">
            Все услуги <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-orange-600 grid place-items-center">{it.icon}</div>
                  <div className="font-semibold">{it.title}</div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{it.text}</p>
                <Button as="a" href={it.href} variant="ghost" className="rounded-xl px-3">
                  Подробнее <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "20+", v: "Юрисдикций" },
    { k: "100+", v: "Кейсов" },
    { k: "$1.3M", v: "Сэкономлено клиентам" },
    { k: "24h", v: "На первый ответ" },
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

function QuizTeaser() {
  const steps = ["Юрисдикция", "Налоговая цель", "Банк", "Сроки"];
  return (
    <section id="quiz" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl font-semibold">Jurisdiction in One Minute</h3>
            <p className="mt-3 text-gray-600 max-w-xl">
              Ответьте на 6–8 простых вопросов и получите первичный маршрут: подходящие зоны, ориентировочные сборы и требования к субстанции.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-white rounded-xl px-3 py-2 shadow-sm">
                  <Check className="h-4 w-4 text-green-600" /> {s}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button as="a" href="#/services" className="rounded-2xl">Пройти тест</Button>
              <Button variant="ghost" className="rounded-2xl">Смотреть пример</Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Card>
              <CardHeader>
                <CardTitle>Превью результата</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50">
                  <div className="flex items-center gap-2 font-medium"><Building2 className="h-4 w-4 text-purple-700"/> Подойдут: DMCC, IFZA</div>
                  <Badge className="bg-amber-200 text-amber-900">ОАЭ</Badge>
                </div>
                <div className="p-3 rounded-xl bg-orange-50">
                  <div className="font-medium mb-1">Оценка сборов</div>
                  <div className="text-gray-600">Регистрация: $3.5–6k • Банк: 2–4 недели</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <div className="font-medium mb-1">Требования</div>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Субстанция: flex (офис по требованию)</li>
                    <li>Директор-резидент: не требуется</li>
                    <li>KYC: стандартный</li>
                  </ul>
                </div>
                <Button className="w-full rounded-2xl">Получить подробный отчёт</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function CasesList() {
  const items = [
    { title: "Холдинг для e‑commerce в ОАЭ", text: "Оптимизация НДС ЕС, платёжные провайдеры, комплаенс-процедуры.", tag: "DMCC" },
    { title: "Семейный фонд для наследования", text: "Структура владения активами в 3 странах, контроль и защита.", tag: "Фонд" },
    { title: "Сделка по трансграничному контракту", text: "Договорная база, санкционные проверки, KYC контрагента.", tag: "M&A" },
  ];
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold">Недавние проекты</h2>
          <Button as="a" href="#/cases" variant="ghost" className="hidden md:inline-flex rounded-xl">Все кейсы <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm px-2 py-1 rounded-full bg-amber-100 text-amber-900">{it.tag}</div>
                  <div className="text-xs text-gray-500">Конфиденциально</div>
                </div>
                <div className="font-semibold mb-1">{it.title}</div>
                <p className="text-sm text-gray-600">{it.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Алина, владелец IT‑агентства", text: "На практике — очень быстро и чётко, по чек‑листу. Банк открыли без нервов." },
    { name: "Олег, e‑commerce", text: "Помогли со структурой в ОАЭ и Европейским НДС. Теперь масштабируемся." },
    { name: "N. Family Office", text: "Проработали наследственные сценарии, всё аккуратно и заранее." },
  ];
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold">Отзывы</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">“{it.text}”</p>
                <div className="mt-4 text-sm font-medium">{it.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900 via-purple-800 to-orange-600" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 items-center gap-8 text-white">
          <div className="lg:col-span-8">
            <h3 className="text-2xl sm:text-3xl font-semibold leading-tight">Готовы начать? Обсудим вашу задачу и предложим маршрут за 24 часа</h3>
            <p className="mt-2 text-white/90">Без навязчивых продаж. Конфиденциально.</p>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-2 flex gap-2">
              <Input placeholder="Email" className="bg-white/95" />
              <Button variant="amber" className="rounded-xl">Отправить</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- ROUTE: HOME ----
function HomePage() {
  return (
    <Page>
      <HomeHero />
      <ValueProps />
      <ServicesGrid />
      <Stats />
      <QuizTeaser />
      <CasesList />
      <Testimonials />
      <CTA />
    </Page>
  );
}

// ---- ROUTE: ABOUT ----
function AboutPage() {
  const highlights = [
    { k: "20+", v: "юрисдикций работы" },
    { k: "100+", v: "успешных кейсов" },
    { k: "10+", v: "лет практики" },
  ];
  return (
    <Page>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-semibold">О компании ProLegall</h1>
            <p className="mt-4 text-gray-600">Мы — бутиковая юридическая команда, фокус на международных структурах, семейном праве и сопровождении бизнеса в ОАЭ и Европе. Работаем прозрачно, соблюдая требования банков и регуляторов с первого шага.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-8">
                  <div className="text-3xl font-semibold">{h.k}</div>
                  <div className="text-gray-600">{h.v}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Подход</CardTitle></CardHeader>
              <CardContent className="text-gray-600 space-y-3 text-sm">
                <p>• Аналитика перед стартом: проверяем санкционные риски, банковскую приемлемость и требования к субстанции.</p>
                <p>• Комплаенс-by-design: документы и структура готовятся с учётом будущих проверок.</p>
                <p>• Работаем блоками: быстрый MVP-результат, затем масштабирование.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Команда</CardTitle></CardHeader>
              <CardContent className="text-gray-600 text-sm">
                Небольшая кросс‑юрисдикционная команда, привлекаем локальных консультантов там, где нужен лицензированный представитель.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Page>
  );
}

// ---- ROUTE: SERVICES ----
function ServicesPage() {
  const tabs = [
    { id: "incorporation", title: "Регистрация компаний", icon: <Building2 className="h-4 w-4"/> },
    { id: "tax", title: "Структуры и налоги", icon: <Landmark className="h-4 w-4"/> },
    { id: "family", title: "Семейное/наследственное", icon: <ScrollText className="h-4 w-4"/> },
    { id: "contracts", title: "Договоры и сопровождение", icon: <FileText className="h-4 w-4"/> },
    { id: "compliance", title: "Комплаенс", icon: <ShieldCheck className="h-4 w-4"/> },
    { id: "disputes", title: "Медиация/споры", icon: <Gavel className="h-4 w-4"/> },
  ];
  const getTabFromHash = () => new URLSearchParams((window.location.hash.split("?")[1]) || "").get("tab") || "incorporation";
  const [tab, setTab] = useState(getTabFromHash());
  useEffect(() => {
    const onHash = () => setTab(getTabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const content = useMemo(() => ({
    incorporation: {
      lead: "Открытие компаний в ОАЭ (DMCC, IFZA, RAKEZ), Кипр и ЕС. Полный цикл: учредительные, банк, субстанция, отчётность.",
      price: "от $3.5k",
      bullets: ["Подбор юрисдикции и зоны", "Комплект учредительных", "Открытие счёта (личн./корп.)", "Локальные провайдеры и адрес"],
    },
    tax: {
      lead: "Проектируем холдинги, фонды, кросс‑границ. Комбинируем договоры об избежании двойного налогообложения и местные льготы.",
      price: "проектно",
      bullets: ["Холдинговые структуры", "Налоговое резидентство", "ВНЖ/субстанция", "НДС ЕС и OSS"],
    },
    family: {
      lead: "Брачные контракты, трасты, family foundation в ОАЭ, наследование активов в нескольких странах.",
      price: "от €1.5к",
      bullets: ["Брачные договоры", "Трасты/фонды", "Завещания", "Опека и контроль"],
    },
    contracts: {
      lead: "Договоры МВЭД, корпораты, KYC‑пакеты, санкционные оговорки. Рус/Eng.",
      price: "от €900",
      bullets: ["Поставка/агентские", "NDA/NCA", "SHA/SPA", "Политики и процедуры"],
    },
    compliance: {
      lead: "KYC/AML, риск‑политики, внутренний контроль, подготовка к проверкам банков/регуляторов.",
      price: "под задачу",
      bullets: ["KYC/AML фреймворк", "Риск‑оценка", "Коммуникации с банками", "Тренинг команды"],
    },
    disputes: {
      lead: "Досудебная медиация, коммерческие переговоры, арбитражные оговорки.",
      price: "помесячно",
      bullets: ["Оценка позиций", "Стратегия переговоров", "Арбитражные форумы", "Settlement"],
    },
  }), []);

  const active = content[tab];

  return (
    <Page>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Услуги</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map(t => (
              <a key={t.id} href={`#/services?tab=${t.id}`} className={cx("px-3 py-2 rounded-xl text-sm border inline-flex items-center", tab===t.id?"bg-purple-700 text-white border-purple-700":"bg-white hover:bg-gray-50")}>{t.icon}<span className="ml-2">{t.title}</span></a>
            ))}
          </div>
          <Card className="mt-6">
            <CardContent className="p-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="text-lg font-medium">{active.lead}</div>
                <ul className="mt-4 list-disc pl-5 text-gray-600 text-sm space-y-1">
                  {active.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
                </ul>
              </div>
              <div>
                <div className="rounded-2xl bg-purple-50 p-4">
                  <div className="text-sm text-gray-600">Ориентировочная стоимость</div>
                  <div className="text-2xl font-semibold mt-1">{active.price}</div>
                  <Button as="a" href="#/contact" className="w-full mt-4">Запросить смету</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Page>
  );
}

// ---- ROUTE: CASES ----
function CasesPage() {
  const items = [
    { tag: "DMCC", title: "Холдинг для e‑commerce", text: "EU VAT + PSP, комплаенс, счета." },
    { tag: "Фонд", title: "Семейный foundation", text: "Передача активов и контроль в 3 странах." },
    { tag: "M&A", title: "Кросс‑бордер сделка", text: "SPA, санкционные оговорки, escrow." },
  ];
  return (
    <Page>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Кейсы</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">Описания обезличены. Полные материалы предоставляем после NDA.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {items.map((it, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm px-2 py-1 rounded-full bg-amber-100 text-amber-900">{it.tag}</div>
                    <div className="text-xs text-gray-500">Конфиденциально</div>
                  </div>
                  <div className="font-semibold mb-1">{it.title}</div>
                  <p className="text-sm text-gray-600">{it.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button as="a" href="#/contact" variant="outline">Обсудить ваш кейс</Button>
          </div>
        </div>
      </section>
    </Page>
  );
}

// ---- ROUTE: CONTACT ----
function ContactPage() {
  return (
    <Page>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Контакты</h1>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Напишите нам</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Имя" aria-label="Имя" />
                  <Input placeholder="Email" type="email" aria-label="Email" />
                </div>
                <Input placeholder="Телефон / Telegram / WhatsApp" aria-label="Телефон" />
                <Textarea placeholder="Кратко опишите задачу" aria-label="Сообщение" />
                <div className="flex items-center gap-3">
                  <Button className="rounded-2xl">Отправить</Button>
                  <span className="text-xs text-gray-500">Отправляя, вы соглашаетесь с политикой конфиденциальности.</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Реквизиты и связь</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> info@prolegall.com</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +370 xxx xxxx (TG/WA)</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Вильнюс, Литва</div>
                <a className="inline-flex items-center gap-2 hover:underline" href="#/"><Linkedin className="h-4 w-4"/> LinkedIn</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Page>
  );
}

// ---- ROUTE: PRIVACY ----
function PrivacyPage() {
  return (
    <Page>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Политика конфиденциальности</h1>
          <p className="mt-4 text-gray-600">Эта политика описывает, какие данные мы собираем, как используем и как обеспечиваем их безопасность.</p>
          <div className="mt-8 space-y-6 text-sm text-gray-700">
            <section>
              <h2 className="font-semibold">1. Сбор данных</h2>
              <p>Мы собираем контактные данные (имя, email, телефон) и сведения о проекте, которые вы указываете в формах.</p>
            </section>
            <section>
              <h2 className="font-semibold">2. Использование</h2>
              <p>Данные используются для коммуникации, подготовки предложений и оказания услуг. Не передаются третьим лицам без правового основания.</p>
            </section>
            <section>
              <h2 className="font-semibold">3. Хранение и безопасность</h2>
              <p>Применяем организационные и технические меры защиты. Сроки хранения соответствуют требованиям договора и закона.</p>
            </section>
            <section>
              <h2 className="font-semibold">4. Ваши права</h2>
              <p>Вы можете запросить доступ, исправление или удаление данных: <a href="#/contact" className="text-purple-700 underline">связаться с нами</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </Page>
  );
}

// ---- ROUTE: TERMS ----
function TermsPage() {
  return (
    <Page>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold">Условия оказания услуг</h1>
          <div className="mt-6 space-y-6 text-sm text-gray-700">
            <p>Настоящие условия регулируют порядок оказания юридических услуг ProLegall.</p>
            <section>
              <h2 className="font-semibold">1. Предмет</h2>
              <p>Мы оказываем консультационные и представительные услуги по согласованному ТЗ и смете.</p>
            </section>
            <section>
              <h2 className="font-semibold">2. Оплата</h2>
              <p>Фиксированная стоимость или почасовая ставка. Аванс обязателен до начала работ.</p>
            </section>
            <section>
              <h2 className="font-semibold">3. Конфиденциальность</h2>
              <p>Информация, полученная от клиента, не раскрывается без его согласия, за исключением предусмотренных законом случаев.</p>
            </section>
            <section>
              <h2 className="font-semibold">4. Ответственность</h2>
              <p>Ответственность ограничивается размером фактически уплаченного вознаграждения за соответствующий этап работ.</p>
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
        <p className="mt-2 text-gray-600">Страница не найдена</p>
        <div className="mt-6"><Button as="a" href="#/">На главную</Button></div>
      </div>
    </Page>
  );
}

// ======================= App (Router) =======================
export default function ProLegallApp() {
  const hash = useHashRoute();
  const route = (hash.replace(/^#/, "") || "/").split("?")[0];
  const PageEl = {
    "/": HomePage,
    "/about": AboutPage,
    "/services": ServicesPage,
    "/cases": CasesPage,
    "/contact": ContactPage,
    "/privacy": PrivacyPage,
    "/terms": TermsPage,
  }[route] || NotFoundPage;

  // Scroll to top on route change for better UX
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopNav />
      <PageEl />
      <Footer />
    </div>
  );
}
