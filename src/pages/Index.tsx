import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/93b9212d-df1c-4b19-af6e-8585f75ff4d2/files/0a7cdae5-ecd3-4720-8597-b840373c7b0f.jpg";
const PANELS_IMG = "https://cdn.poehali.dev/projects/93b9212d-df1c-4b19-af6e-8585f75ff4d2/files/59c51b7d-fc7b-4df0-a269-79e13025a7f2.jpg";
const FENCE_IMG = "https://cdn.poehali.dev/projects/93b9212d-df1c-4b19-af6e-8585f75ff4d2/files/4aa47c0a-2c37-407c-9446-2c533a48e3b7.jpg";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Каталог", href: "#catalog" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const CATALOG_CATEGORIES = [
  {
    id: "fences",
    label: "Ограждения",
    icon: "Shield",
    items: [
      { name: "Секционное ограждение 3D", desc: "Сварная сетка, оцинкованная, с полимерным покрытием", price: "от 890 ₽/м²" },
      { name: "Забор из профнастила", desc: "Высота 1.8–3.0 м, различные цвета RAL", price: "от 1 200 ₽/м²" },
      { name: "Ворота откатные", desc: "Автоматизированные и ручные, до 12 м шириной", price: "от 45 000 ₽" },
      { name: "Промышленное ограждение", desc: "Периметровая защита предприятий, ГОСТ", price: "от 2 100 ₽/м.п." },
    ],
  },
  {
    id: "structures",
    label: "Металлоконструкции",
    icon: "Building2",
    items: [
      { name: "Металлокаркас зданий", desc: "Производственные, складские, торговые объекты", price: "от 3 500 ₽/м²" },
      { name: "Ангары и навесы", desc: "Быстровозводимые конструкции под ключ", price: "от 2 800 ₽/м²" },
      { name: "Лестницы и площадки", desc: "Промышленные, офисные, пожарные", price: "от 18 000 ₽" },
      { name: "Фермы и балки", desc: "Нестандартные сварные металлоконструкции", price: "Расчёт по КМД" },
    ],
  },
  {
    id: "roofing",
    label: "Кровля",
    icon: "Home",
    items: [
      { name: "Металлочерепица", desc: "Монтеррей, Супермонтеррей, Каскад — от 0.45 мм", price: "от 520 ₽/м²" },
      { name: "Профнастил кровельный", desc: "НС-35, НС-44, НС-57 оцинкованный и крашеный", price: "от 480 ₽/м²" },
      { name: "Фальцевая кровля", desc: "Стоячий фальц, алюминий, медь, сталь", price: "от 1 800 ₽/м²" },
      { name: "Кровля под ключ", desc: "Проектирование, материалы, монтаж, гарантия", price: "от 2 200 ₽/м²" },
    ],
  },
  {
    id: "panels",
    label: "Сэндвич-панели",
    icon: "Layers",
    items: [
      { name: "Стеновые панели", desc: "Минвата / PIR, 80–200 мм, RAL любой цвет", price: "от 1 100 ₽/м²" },
      { name: "Кровельные панели", desc: "Скрытое крепление, уклон от 5°", price: "от 1 300 ₽/м²" },
      { name: "Холодильные камеры", desc: "PIR 100–150 мм, класс горючести Г1", price: "от 2 400 ₽/м²" },
      { name: "Монтаж под ключ", desc: "Доставка, подъём, монтаж, герметизация", price: "от 350 ₽/м²" },
    ],
  },
];

const SERVICES = [
  { icon: "Ruler", title: "Проектирование", desc: "Разрабатываем КМД и рабочую документацию. Учитываем нагрузки, климат, нормы ГОСТ." },
  { icon: "Truck", title: "Доставка", desc: "Собственный автопарк — доставим в любой регион. Негабаритные грузы с сопровождением." },
  { icon: "Wrench", title: "Монтаж", desc: "Бригады опытных монтажников. Работаем на объектах любой сложности, сжатые сроки." },
  { icon: "FileText", title: "Тендеры и госзакупки", desc: "Участвуем в тендерах, работаем с юридическими лицами, предоставляем все документы." },
  { icon: "Shield", title: "Гарантия", desc: "Гарантия на материалы — до 30 лет. На монтажные работы — 5 лет письменной гарантии." },
  { icon: "Calculator", title: "Бесплатный расчёт", desc: "Выезд специалиста на объект, замер, смета — бесплатно. Ответ в течение 1 рабочего дня." },
];

const PORTFOLIO = [
  { img: HERO_IMG, title: "Промышленный комплекс", subtitle: "Ограждение 2,4 км + ворота", tag: "Ограждения" },
  { img: PANELS_IMG, title: "Логистический склад", subtitle: "3 800 м² сэндвич-панелей", tag: "Сэндвич-панели" },
  { img: FENCE_IMG, title: "Производственный цех", subtitle: "Металлокаркас + кровля", tag: "Металлоконструкции" },
  { img: HERO_IMG, title: "Торговый центр", subtitle: "Кровля под ключ 6 200 м²", tag: "Кровля" },
  { img: PANELS_IMG, title: "Агрокомплекс", subtitle: "Ангар 5 000 м²", tag: "Металлоконструкции" },
  { img: FENCE_IMG, title: "Периметр завода", subtitle: "Секционное ограждение", tag: "Ограждения" },
];

const FAQ_ITEMS = [
  { q: "Какие минимальные объёмы для заказа?", a: "Мы работаем как с небольшими заказами от 50 м², так и с крупными промышленными проектами. Минимальный заказ на металлоконструкции — от 1 тонны." },
  { q: "Есть ли доставка в регионы?", a: "Да, доставляем по всей России. Собственный автопарк работает в центральном округе, для дальних регионов — транспортные компании-партнёры. Рассчитываем стоимость индивидуально." },
  { q: "Как долго изготавливаются конструкции?", a: "Стандартные позиции в наличии на складе — отгрузка 1–3 дня. Нестандартные изделия — от 5 до 21 рабочего дня в зависимости от сложности и объёма." },
  { q: "Предоставляете ли документы для тендеров?", a: "Да: сертификаты, паспорта качества, декларации соответствия, исполнительная документация. Работаем по 44-ФЗ и 223-ФЗ." },
  { q: "Возможна ли оплата частями?", a: "Для юридических лиц — отсрочка платежа до 30 дней после согласования договора. Для физических лиц — рассрочка 0% через банки-партнёры." },
  { q: "Как рассчитать стоимость проекта?", a: "Заполните форму или воспользуйтесь онлайн-калькулятором на сайте. Наш инженер свяжется с вами в течение 2 часов и подготовит точную смету бесплатно." },
];

const CALC_PRODUCTS = [
  { id: "fence_3d", label: "Секционное ограждение 3D", unit: "м²", price: 890 },
  { id: "fence_profile", label: "Забор из профнастила", unit: "м²", price: 1200 },
  { id: "roofing_tile", label: "Металлочерепица", unit: "м²", price: 520 },
  { id: "roofing_prof", label: "Профнастил кровельный", unit: "м²", price: 480 },
  { id: "sandwich_wall", label: "Сэндвич-панели стеновые", unit: "м²", price: 1100 },
  { id: "sandwich_roof", label: "Сэндвич-панели кровельные", unit: "м²", price: 1300 },
  { id: "frame", label: "Металлокаркас здания", unit: "м²", price: 3500 },
];

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fences");
  const [calcProduct, setCalcProduct] = useState(CALC_PRODUCTS[0].id);
  const [calcArea, setCalcArea] = useState(100);
  const [calcInstall, setCalcInstall] = useState(false);
  const [calcDelivery, setCalcDelivery] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const selectedProduct = CALC_PRODUCTS.find(p => p.id === calcProduct)!;
  const materialCost = selectedProduct.price * calcArea;
  const installCost = calcInstall ? materialCost * 0.35 : 0;
  const deliveryCost = calcDelivery ? Math.min(Math.max(calcArea * 25, 5000), 45000) : 0;
  const totalCost = materialCost + installCost + deliveryCost;

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const activeCategory = CATALOG_CATEGORIES.find(c => c.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md"
        style={{ background: "rgba(10, 11, 15, 0.92)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-amber-500 flex items-center justify-center" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                <Icon name="Zap" size={14} className="text-gray-900" />
              </div>
              <span className="font-display text-lg font-semibold tracking-wider text-white">МЕТАЛЛ<span className="text-amber-500">СТРОЙ</span></span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
              ))}
            </div>

            <a href="tel:+78001234567" className="hidden md:flex items-center gap-2 btn-primary px-4 py-2 text-sm">
              <Icon name="Phone" size={14} />
              +7 800 123-45-67
            </a>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-amber-500">
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 px-4 py-4 space-y-3" style={{ background: "rgba(10, 11, 15, 0.98)" }}>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className="block nav-link py-2 text-sm">{link.label}</a>
            ))}
            <a href="tel:+78001234567" className="btn-primary block text-center px-4 py-2 mt-4 text-sm">
              +7 800 123-45-67
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img src={HERO_IMG} alt="МеталлСтрой" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,11,15,0.92) 0%, rgba(10,11,15,0.7) 50%, rgba(10,11,15,0.5) 100%)" }} />
          <div className="absolute inset-0 metal-texture opacity-30" />
        </div>

        <div className="absolute inset-0 grid-lines opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <div className="h-px w-12 bg-amber-500" />
              <span className="font-body text-amber-500 text-sm tracking-widest uppercase">Металлоконструкции под ключ</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white mb-6 animate-fade-in-up delay-100">
              СТАЛЬ.
              <br />
              <span className="text-amber-500 text-glow">НАДЁЖНОСТЬ.</span>
              <br />
              РЕЗУЛЬТАТ.
            </h1>
            <p className="font-body text-base sm:text-lg text-gray-400 mb-10 max-w-xl leading-relaxed animate-fade-in-up delay-200">
              Поставка и монтаж ограждений, металлоконструкций, кровли и сэндвич-панелей.
              Более 500 объектов по всей России. Рассчитайте стоимость за 2 минуты.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <a href="#calculator" className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 justify-center">
                <Icon name="Calculator" size={18} />
                Рассчитать стоимость
              </a>
              <a href="#contacts" className="btn-outline-metal px-8 py-4 text-base inline-flex items-center gap-2 justify-center">
                <Icon name="Phone" size={18} />
                Получить консультацию
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border/50"
          style={{ background: "rgba(10,11,15,0.85)", backdropFilter: "blur(10px)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-border/50">
            {[
              { num: "500+", label: "Объектов завершено" },
              { num: "15", label: "Лет на рынке" },
              { num: "48 ч", label: "Выезд специалиста" },
              { num: "30 лет", label: "Гарантия на материалы" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:px-6">
                <div className="font-display text-2xl md:text-3xl font-semibold text-amber-500">{stat.num}</div>
                <div className="font-body text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 relative diagonal-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-amber-500 text-xs tracking-widest uppercase font-body">О компании</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                МЫ СТРОИМ<br />
                <span className="text-amber-500">НА ДЕСЯТИЛЕТИЯ</span>
              </h2>
              <p className="font-body text-gray-400 leading-relaxed mb-6">
                МеталлСтрой — федеральный поставщик и подрядчик в сфере металлоконструкций.
                С 2009 года мы реализуем проекты для промышленных предприятий, логистических
                комплексов, агрохолдингов и государственных структур.
              </p>
              <p className="font-body text-gray-400 leading-relaxed mb-10">
                Собственное производство, склад 8 000 м², аттестованные сварщики,
                проектный отдел — всё необходимое для выполнения заказов любой сложности
                в установленные сроки.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Factory", label: "Собственное производство" },
                  { icon: "Award", label: "Сертификаты ISO 9001" },
                  { icon: "Users", label: "280 сотрудников" },
                  { icon: "MapPin", label: "Офисы в 8 городах" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-amber-500" fallback="CheckCircle" />
                    </div>
                    <span className="font-body text-sm text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-amber-500/5 border border-amber-500/10" style={{ transform: "rotate(2deg)" }} />
              <img src={PANELS_IMG} alt="Производство МеталлСтрой" className="relative w-full aspect-video object-cover border border-border/50" />
              <div className="absolute bottom-4 left-4 right-4 p-4 border border-amber-500/30"
                style={{ background: "rgba(10,11,15,0.9)", backdropFilter: "blur(10px)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" size={18} className="text-gray-900" />
                  </div>
                  <div>
                    <div className="font-display text-sm text-white">Рост 2024 года</div>
                    <div className="font-body text-xs text-gray-500">+38% к объёму производства</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CATALOG */}
      <section id="catalog" className="py-24 relative grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs tracking-widest uppercase font-body">Каталог</span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">НАША ПРОДУКЦИЯ</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATALOG_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 text-sm font-display tracking-wider uppercase transition-all duration-200 ${activeTab === cat.id ? "tab-active" : "tab-inactive"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCategory.items.map((item, i) => (
              <div key={i} className="card-metal p-5">
                <div className="w-8 h-0.5 bg-amber-500 mb-4" />
                <h3 className="font-display text-base font-medium text-white mb-2">{item.name}</h3>
                <p className="font-body text-xs text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                <div className="font-display text-amber-500 text-sm font-medium">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#contacts" className="btn-outline-metal px-8 py-3 text-sm inline-flex items-center gap-2">
              <Icon name="Download" size={16} />
              Скачать полный прайс-лист
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section id="services" className="py-24 relative diagonal-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs tracking-widest uppercase font-body">Услуги</span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">ЧТО МЫ ДЕЛАЕМ</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <div key={i} className="card-metal p-6 counter-card">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5">
                  <Icon name={service.icon} size={22} className="text-amber-500" fallback="Settings" />
                </div>
                <h3 className="font-display text-lg font-medium text-white mb-3">{service.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs tracking-widest uppercase font-body">Портфолио</span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">НАШИ ОБЪЕКТЫ</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map((item, i) => (
              <div key={i} className="portfolio-item aspect-video cursor-pointer group">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)" }}>
                  <div className="mb-2">
                    <span className="font-body text-xs text-amber-500 tracking-wider uppercase border border-amber-500/50 px-2 py-0.5">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-white">{item.title}</h3>
                  <p className="font-body text-xs text-gray-400 mt-1">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 relative grid-lines">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs tracking-widest uppercase font-body">Калькулятор</span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">РАССЧИТАЙТЕ СТОИМОСТЬ</h2>
            <p className="font-body text-gray-500 mt-3 text-sm">Ориентировочный расчёт. Точная смета — после осмотра объекта.</p>
          </div>

          <div className="card-metal p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="font-display text-xs tracking-widest uppercase text-gray-500 block mb-3">Вид продукции</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CALC_PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setCalcProduct(p.id)}
                      className={`px-4 py-3 text-left text-sm transition-all duration-200 border ${
                        calcProduct === p.id
                          ? "border-amber-500 bg-amber-500/10 text-amber-500"
                          : "border-border/50 text-gray-500 hover:border-amber-500/50"
                      }`}
                    >
                      <div className="font-body text-xs">{p.label}</div>
                      <div className={`font-display text-sm mt-0.5 ${calcProduct === p.id ? "text-amber-400" : "text-gray-600"}`}>
                        {p.price.toLocaleString()} ₽/{p.unit}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-display text-xs tracking-widest uppercase text-gray-500 block mb-3">
                  Площадь / объём ({selectedProduct.unit}) — <span className="text-amber-500">{calcArea}</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={5000}
                  step={10}
                  value={calcArea}
                  onChange={e => setCalcArea(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between font-body text-xs text-gray-600 mt-1">
                  <span>10</span>
                  <span>1 000</span>
                  <span>2 500</span>
                  <span>5 000</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setCalcInstall(!calcInstall)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all ${
                    calcInstall ? "bg-amber-500 border-amber-500" : "border-gray-600 group-hover:border-amber-500"
                  }`}>
                    {calcInstall && <Icon name="Check" size={12} className="text-gray-900" />}
                  </div>
                  <div>
                    <div className="font-body text-sm text-gray-300">Монтаж (+35%)</div>
                    <div className="font-body text-xs text-gray-600">Выезд бригады, установка</div>
                  </div>
                </div>
                <div
                  onClick={() => setCalcDelivery(!calcDelivery)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all ${
                    calcDelivery ? "bg-amber-500 border-amber-500" : "border-gray-600 group-hover:border-amber-500"
                  }`}>
                    {calcDelivery && <Icon name="Check" size={12} className="text-gray-900" />}
                  </div>
                  <div>
                    <div className="font-body text-sm text-gray-300">Доставка</div>
                    <div className="font-body text-xs text-gray-600">По Москве и МО</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="font-body text-xs text-gray-600 uppercase tracking-wider mb-1">Ориентировочная стоимость</div>
                    <div className="font-display text-4xl md:text-5xl font-semibold text-amber-500">
                      {totalCost.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="mt-2 space-y-0.5">
                      <div className="font-body text-xs text-gray-600">Материалы: {materialCost.toLocaleString("ru-RU")} ₽</div>
                      {calcInstall && <div className="font-body text-xs text-gray-600">Монтаж: {installCost.toLocaleString("ru-RU")} ₽</div>}
                      {calcDelivery && <div className="font-body text-xs text-gray-600">Доставка: {deliveryCost.toLocaleString("ru-RU")} ₽</div>}
                    </div>
                  </div>
                  <a href="#contacts" className="btn-primary px-8 py-4 text-sm inline-flex items-center gap-2 flex-shrink-0">
                    <Icon name="Send" size={16} />
                    Получить точную смету
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section id="faq" className="py-24 relative diagonal-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs tracking-widest uppercase font-body">FAQ</span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">ЧАСТЫЕ ВОПРОСЫ</h2>
          </div>

          <div className="space-y-0">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-display text-base font-normal text-white tracking-wide">{item.q}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={18}
                    className={`flex-shrink-0 transition-colors ${openFaq === i ? "text-amber-500" : "text-gray-600"}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="pb-5">
                    <p className="font-body text-sm text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-500 text-xs tracking-widest uppercase font-body">Контакты</span>
              <div className="h-px w-8 bg-amber-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">ОСТАВЬТЕ ЗАЯВКУ</h2>
            <p className="font-body text-gray-500 mt-3 text-sm">Ответим в течение 2 часов в рабочее время</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="card-metal p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-amber-500/10 border border-amber-500 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-amber-500" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">Заявка отправлена!</h3>
                  <p className="font-body text-sm text-gray-500">Наш менеджер свяжется с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-display text-xs tracking-wider uppercase text-gray-500 block mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Петров"
                      className="input-metal w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs tracking-wider uppercase text-gray-500 block mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="input-metal w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs tracking-wider uppercase text-gray-500 block mb-2">Описание проекта</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите о вашем объекте, площади, сроках..."
                      rows={4}
                      className="input-metal w-full px-4 py-3 text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-4 text-sm inline-flex items-center justify-center gap-2">
                    <Icon name="Send" size={16} />
                    Отправить заявку
                  </button>
                  <p className="font-body text-xs text-gray-600 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg text-white mb-5 tracking-wide">НАШИ КОНТАКТЫ</h3>
                <div className="space-y-4">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 800 123-45-67", sub: "Бесплатно по России" },
                    { icon: "Mail", label: "Email", value: "info@metallstroy.ru", sub: "Ответ в течение 2 часов" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Промышленная, 14", sub: "Пн–Пт: 8:00–19:00" },
                  ].map(contact => (
                    <div key={contact.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={contact.icon} size={16} className="text-amber-500" fallback="Phone" />
                      </div>
                      <div>
                        <div className="font-display text-xs text-gray-600 tracking-wider uppercase">{contact.label}</div>
                        <div className="font-body text-sm text-white mt-0.5">{contact.value}</div>
                        <div className="font-body text-xs text-gray-600">{contact.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/50 pt-6">
                <h4 className="font-display text-xs text-gray-500 tracking-widest uppercase mb-4">Почему выбирают нас</h4>
                <div className="space-y-3">
                  {[
                    "Собственное производство — без посредников",
                    "Выезд инженера на объект бесплатно",
                    "Смета за 24 часа",
                    "Работаем с НДС и без НДС",
                    "Гарантия на все виды работ",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 flex-shrink-0" />
                      <span className="font-body text-sm text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-amber-500 flex items-center justify-center" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                <Icon name="Zap" size={10} className="text-gray-900" />
              </div>
              <span className="font-display text-sm tracking-wider text-white">МЕТАЛЛ<span className="text-amber-500">СТРОЙ</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.slice(0, 5).map(link => (
                <a key={link.href} href={link.href} className="font-body text-xs text-gray-600 hover:text-amber-500 transition-colors uppercase tracking-wider">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="font-body text-xs text-gray-700">
              © 2024 МеталлСтрой. Все права защищены.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <a href="tel:+78001234567" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm orange-glow">
          <Icon name="Phone" size={18} />
          Позвонить бесплатно
        </a>
      </div>
    </div>
  );
}