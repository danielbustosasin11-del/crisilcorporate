import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessScroll } from "@/components/ProcessScroll";
import { TrackOrder } from "@/components/TrackOrder";
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel";
import { StorySection, GlassSteps } from "@/components/StorySection";
import { PathChooser } from "@/components/PathChooser";
import { Reveal } from "@/components/Reveal";
import { CaseStudy } from "@/components/CaseStudy";
import { VideoReel } from "@/components/VideoReel";
import { InstagramPeek, INSTAGRAM_USER } from "@/components/InstagramPeek";
import { categories, products, packagingProducts, type Product } from "@/lib/catalog";
import { OFFERS, WHATSAPP } from "@/lib/offers";
import { WholesaleHooks, WhatsAppFloat } from "@/components/WholesaleHooks";
import { LangProvider, LanguageGate, LangToggle, translateSpec, useLang } from "@/lib/i18n";

const logoAsset = { url: "/images/logo-crisil.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRISIL | Regalos corporativos y vidrio para marcas" },
      { name: "description", content: "Creamos regalos corporativos y soluciones de vidrio artesanal boliviano personalizadas para tu marca." },
      { property: "og:title", content: "CRISIL | Vidrio artesanal para empresas" },
      { property: "og:description", content: "Diseña regalos corporativos y envases de vidrio que representen tu marca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

type FormState = { quantity: string; customization: string; date: string; name: string; company: string; role: string; whatsapp: string; email: string; occasion: string; notes: string };
const initialForm: FormState = { quantity: "", customization: "", date: "", name: "", company: "", role: "", whatsapp: "", email: "", occasion: "", notes: "" };
const WHATSAPP_NUMBER = WHATSAPP;

// Envases: se muestran como una categoría más del mismo catálogo (foto vacío + foto con producto)
const activePackaging: Product[] = packagingProducts
  .filter((p) => p.active)
  .map((p) => ({ ...p, gallery: [p.image, p.filledImage].filter(Boolean) as string[], fit: "contain" as const }));

// Textos del producto según idioma (si falta la versión en inglés, se usa el español)
function useProductText() {
  const { lang } = useLang();
  const en = lang === "en";
  return {
    name: (p: Product) => (en && p.nameEn ? p.nameEn : p.name),
    desc: (p: Product) => (en && p.descriptionEn ? p.descriptionEn : p.description),
    specs: (p: Product) => (en ? p.specificationsEn ?? p.specifications?.map(translateSpec) : p.specifications) ?? [],
    note: (p: Product) => (en && p.footerNoteEn ? p.footerNoteEn : p.footerNote),
  };
}

function Page() {
  return (
    <LangProvider>
      <Index />
      <LanguageGate />
    </LangProvider>
  );
}

function Index() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]?.id ?? "vasos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [details, setDetails] = useState<Product | null>(null);

  const visibleProducts = useMemo(() => (category === "envases" ? activePackaging : products.filter((p) => p.active && p.category === category)), [category]);
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const goTo = (target: string, cat?: string) => {
    if (cat) setCategory(cat);
    setMenuOpen(false);
    window.setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: "smooth" }), 30);
  };
  const chooseProduct = (product: Product) => {
    setSelected(product);
    setStep(1);
    setForm((f) => ({ ...f, quantity: "", customization: "", occasion: "" }));
    window.setTimeout(() => document.querySelector("#configurador")?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  const nav: [string, string, string, string?][] = [
    ["#regalos", "Catálogo", "Catalog", "vasos"],
    ["#regalos", "Envases para tu marca", "Packaging for brands", "envases"],
    ["#historia", "Nuestra historia", "Our story"],
    ["#tracking", "Rastrear pedido", "Track order"],
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-primary-foreground/20 text-primary-foreground">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
          <a href="#inicio" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="CRISIL" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold tracking-[0.18em]">CRISIL</span>
          </a>
          <nav className="hidden items-center gap-7 text-xs font-semibold uppercase lg:flex">
            {nav.map(([href, es, en, cat]) => (
              <a key={es} href={href} className="hover:opacity-70" onClick={(e) => { e.preventDefault(); goTo(href, cat); }}>
                {t(es, en)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LangToggle />
            <Button className="hidden md:inline-flex" onClick={() => goTo("#proyecto")}>
              {t("Iniciar mi proyecto", "Start my project")} <ArrowRight size={15} />
            </Button>
            <Button variant="ghost" className="h-11 w-11 px-0 text-primary-foreground lg:hidden" aria-label={t("Abrir menú", "Open menu")} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-primary-foreground/20 bg-primary px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-sm font-semibold uppercase">
              {nav.map(([href, es, en, cat]) => (
                <a key={es} href={href} onClick={(e) => { e.preventDefault(); goTo(href, cat); }}>
                  {t(es, en)}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* 1. Portada: anuncios con fotos grandes */}
      <AnnouncementCarousel />

      {/* 2. Ganchos para mayoristas: somos fabricantes, precios por mayor */}
      <WholesaleHooks onCatalog={() => goTo("#regalos", "vasos")} />

      {/* 3. ¿Qué buscas crear? (tarjetas con efecto pop, se puede cerrar) */}
      <PathChooser onGifts={() => goTo("#regalos", "vasos")} onPackaging={() => goTo("#regalos", "envases")} nextId="#proceso" />

      {/* 3. Así creamos tu proyecto */}
      <ProcessScroll />

      {/* 4. Impacto social: video, cifras animadas y pilares */}
      <StorySection />

      {/* 5. Rastrear pedido */}
      <TrackOrder />

      {/* 6. Catálogo único: regalos, cristalería y envases */}
      <GiftFlow category={category} setCategory={setCategory} products={visibleProducts} chooseProduct={chooseProduct} viewDetails={setDetails} />

      {selected && <Configurator product={selected} step={step} setStep={setStep} form={form} update={update} />}

      {/* 7. Videos, cómo se hace el vidrio, caso COFAR e Instagram */}
      <VideoReel />
      <GlassSteps />
      <CaseStudy />
      <InstagramPeek />

      <footer className="border-t border-border px-5 py-12 md:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="CRISIL" className="h-12 w-12 object-contain" />
              <p className="text-2xl font-bold tracking-[0.18em] text-primary">CRISIL</p>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("Vidrio artesanal boliviano para empresas y marcas.", "Handcrafted Bolivian glass for companies and brands.")}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>{t("Hecho a mano en Bolivia · 100% vidrio reciclado", "Handmade in Bolivia · 100% recycled glass")}</p>
            <p className="mt-1">{t("Regalos corporativos y desarrollo de envases", "Corporate gifts and packaging development")}</p>
            <a href={`https://www.instagram.com/${INSTAGRAM_USER}/`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-primary hover:underline">
              Instagram @{INSTAGRAM_USER}
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />

      {details && (
        <DetailModal
          product={details}
          close={() => setDetails(null)}
          choose={() => {
            chooseProduct(details);
            setDetails(null);
          }}
        />
      )}
    </main>
  );
}

function ProductImage({ product, alt }: { product: Product; alt: string }) {
  const { t } = useLang();
  if (!product.image)
    return (
      <div className="fine-grid flex h-full min-h-56 w-full items-center justify-center bg-muted">
        <div className="text-center">
          <Sparkles className="mx-auto mb-3 text-primary/50" strokeWidth={1} />
          <p className="text-[10px] font-bold uppercase text-muted-foreground">{t("Fotografía pendiente", "Photo coming soon")}</p>
          <p className="display mt-1 text-xl text-primary">{alt}</p>
        </div>
      </div>
    );
  const contain = product.fit === "contain";
  return (
    <img
      src={product.image}
      alt={alt}
      loading="lazy"
      className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${contain ? "object-contain" : "object-cover"}`}
    />
  );
}

function GiftFlow({ category, setCategory, products, chooseProduct, viewDetails }: { category: string; setCategory: (v: string) => void; products: Product[]; chooseProduct: (p: Product) => void; viewDetails: (p: Product) => void }) {
  const { lang, t } = useLang();
  const pt = useProductText();
  return (
    <section id="regalos" className="scroll-mt-4 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
        <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Catálogo 2026 · Vidrio reciclado soplado a mano", "2026 Catalog · Hand-blown recycled glass")}</p>
        <h2 className="display text-5xl leading-none md:text-6xl">{t("Elige tus piezas", "Choose your pieces")}</h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          {category === "envases"
            ? t("Botellas y frascos de vidrio para tu marca, por docena y desde 20 docenas. Con tapa o corcho, listos para tu etiqueta. Mientras más cantidad, mejor precio.", "Glass bottles and jars for your brand, sold by the dozen, from 20 dozen. With cap or cork, ready for your label. The more you order, the better the price.")
            : t("Regalos corporativos desde 20 unidades, con tu logo en el vidrio y caja con tu marca. Toca un producto para ver fotos y medidas, y cotiza en un minuto.", "Corporate gifts from 20 units, with your logo on the glass and a branded box. Tap a product for photos and measurements, and get a quote in a minute.")}
        </p>
        </Reveal>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-3">
          {categories.map((item) => (
            <Button key={item.id} variant={category === item.id ? "primary" : "outline"} className="shrink-0" onClick={() => setCategory(item.id)}>
              {lang === "en" ? item.nameEn : item.name}
            </Button>
          ))}
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group flex flex-col border border-border bg-card">
              <button type="button" onClick={() => viewDetails(product)} className={`relative aspect-[4/5] overflow-hidden ${product.category === "envases" ? "bg-white" : "bg-[#efebe5]"}`} aria-label={`${t("Ver detalle de", "View details of")} ${pt.name(product)}`}>
                <ProductImage product={product} alt={pt.name(product)} />
                {product.gallery && product.gallery.length > 1 && (
                  <span className="absolute bottom-2 right-2 bg-primary/85 px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    {product.gallery.length} {t("fotos", "photos")}
                  </span>
                )}
              </button>
              <div className="flex flex-1 flex-col p-4 md:p-5">
                {product.code && <p className="font-mono text-[10px] font-bold text-muted-foreground">{product.code}</p>}
                <h3 className="display mt-1 flex-1 text-xl leading-tight md:text-2xl">{pt.name(product)}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button className="h-9 w-full px-3 text-xs sm:w-auto" onClick={() => chooseProduct(product)}>
                    {t("Cotizar", "Quote")} <ArrowRight size={13} />
                  </Button>
                  <Button variant="ghost" className="hidden h-9 px-2 text-xs sm:inline-flex" onClick={() => viewDetails(product)}>
                    {t("Detalle", "Details")}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailModal({ product, close, choose }: { product: Product; close: () => void; choose: () => void }) {
  const { t } = useLang();
  const pt = useProductText();
  const name = pt.name(product);
  const gallery = product.gallery ?? (product.filledImage ? [product.image!, product.filledImage] : product.image ? [product.image] : []);
  const [active, setActive] = useState(0);
  const specs = pt.specs(product);
  const note = pt.note(product);
  const contain = product.fit === "contain" || product.category === "envases";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-primary/70 p-0 backdrop-blur-sm md:items-center md:p-6" onMouseDown={close}>
      <div className="max-h-[92vh] w-full max-w-5xl overflow-auto bg-background" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={name}>
        <div className="grid md:grid-cols-2">
          <div className="bg-[#efebe5] p-3">
            <div className="aspect-[4/5] overflow-hidden">
              {gallery.length ? (
                <img src={gallery[active]} alt={name} className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`} />
              ) : (
                <ProductImage product={product} alt={name} />
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {gallery.map((g, i) => (
                  <button key={g} type="button" onClick={() => setActive(i)} aria-label={`${t("Foto", "Photo")} ${i + 1}`} className={`aspect-square overflow-hidden border-2 ${i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {product.code && <span className="rounded bg-primary px-2 py-0.5 font-mono text-xs font-bold text-primary-foreground">{product.code}</span>}
                <p className="text-xs font-bold uppercase text-primary">{product.category === "envases" ? t("Envase para marca", "Brand packaging") : t("Regalo corporativo", "Corporate gift")}</p>
              </div>
              <Button variant="ghost" className="h-10 w-10 p-0" onClick={close} aria-label={t("Cerrar", "Close")}>
                <X />
              </Button>
            </div>
            <h2 className="display mt-4 text-4xl md:text-5xl">{name}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{pt.desc(product)}</p>
            {specs.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Medidas aproximadas", "Approximate measurements")}</p>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  {specs.map((x) => (
                    <p key={x} className="border-b border-border/50 pb-1">
                      {x}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {note && (
              <div className="mt-5 rounded border border-secondary bg-secondary/30 p-3">
                <p className="text-xs font-medium text-foreground">
                  <strong>{t("Aplicación recomendada:", "Recommended use:")}</strong> {note}
                </p>
              </div>
            )}
            <p className="mt-6 text-xs text-muted-foreground">{product.category === "envases"
                ? t("Venta por docena, desde 20 docenas · Con tapa o corcho, listo para tu etiqueta · Mientras más cantidad, mejor precio", "Sold by the dozen, from 20 dozen · With cap or cork, ready for your label · The more you order, the better the price")
                : t("Desde 20 unidades · Logo grabado en el vidrio y caja con tu marca · Hecho a mano con vidrio 100% reciclado", "From 20 units · Logo engraved on the glass and branded box · Handmade from 100% recycled glass")}</p>
            <Button className="mt-6 w-full sm:w-auto" onClick={choose}>
              {t("Cotizar este modelo", "Quote this model")} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Las opciones se guardan en español porque el mensaje de WhatsApp llega a ventas en español.
// Regalos y envases tienen preguntas distintas (ver OFFERS en lib/offers.ts).
function offerFor(product: Product) {
  return product.category === "envases" ? { key: "envases" as const, ...OFFERS.envases } : { key: "regalos" as const, ...OFFERS.regalos };
}

function Configurator({ product, step, setStep, form, update }: { product: Product; step: number; setStep: (s: number) => void; form: FormState; update: (k: keyof FormState, v: string) => void }) {
  const { lang, t } = useLang();
  const L = lang === "en" ? 1 : 0;
  const pt = useProductText();
  const o = offerFor(product);
  const envases = o.key === "envases";
  const unitEs = o.unit[0];
  const progress: [string, string][] = [["Cantidad", "Quantity"], ["Personalización", "Customization"], [envases ? "Tu producto" : "Ocasión", envases ? "Your product" : "Occasion"], ["Contacto", "Contact"], ["Resumen", "Summary"]];
  const canNext = step === 1 ? Boolean(form.quantity) : step === 2 ? Boolean(form.customization) : step === 3 ? Boolean(form.occasion) : step === 4 ? Boolean(form.name && form.whatsapp) : true;
  const message = `Hola, quisiera una cotización por mayor de CRISIL (${envases ? "envases para mi marca" : "regalo corporativo"}).\n\nProducto: ${product.name}${product.code ? ` (${product.code})` : ""}\nCantidad: ${form.quantity} ${unitEs}\nPersonalización: ${form.customization}\n${envases ? "Lo usaré para" : "Ocasión"}: ${form.occasion}\nPara cuándo: ${form.date || "Sin fecha fija"}\n\nNombre: ${form.name}${form.company ? `\n${envases ? "Marca/Empresa" : "Empresa"}: ${form.company}` : ""}${form.notes ? `\nNotas: ${form.notes}` : ""}`;
  const send = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  const qtyOptions: [string, string][] = [...o.quantities.map((q) => [q, q] as [string, string]), ["Más / otra cantidad", "More / other amount"]];
  return (
    <section id="configurador" className="scroll-mt-4 bg-muted px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <p className="text-xs font-bold uppercase text-primary">
              {envases ? t("Envases para tu marca", "Packaging for your brand") : t("Regalo corporativo", "Corporate gift")} · {pt.name(product)}
            </p>
            <h2 className="display mt-2 text-5xl">{t("Cotiza en 1 minuto", "Get a quote in 1 minute")}</h2>
          </div>
          <span className="self-start border border-border bg-card px-4 py-2 text-xs font-semibold">
            {t("Paso", "Step")} {step} {t("de", "of")} 5
          </span>
        </div>
        <div className="mb-10 grid grid-cols-5 gap-1">
          {progress.map(([es, en], i) => (
            <div key={es}>
              <div className={`h-1 ${i + 1 <= step ? "bg-primary" : "bg-border"}`} />
              <p className="mt-2 hidden text-[10px] font-bold uppercase text-muted-foreground sm:block">{t(es, en)}</p>
            </div>
          ))}
        </div>
        <div className="min-h-[430px] bg-card p-6 md:p-10">
          {step === 1 && (
            <>
              <ChoiceStep
                title={envases ? t("¿Cuántas docenas necesitas?", "How many dozen do you need?") : t("¿Cuántas unidades necesitas?", "How many units do you need?")}
                options={qtyOptions.map(([es, en]) => [es, en])}
                value={form.quantity}
                onChange={(v) => update("quantity", v)}
                suffix={o.unit[L]}
              />
              <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                <p className="border-l-2 border-primary pl-4 text-muted-foreground">
                  <strong className="text-foreground">{t("Pedido mínimo:", "Minimum order:")}</strong> {o.min} {o.unit[L]}.
                  {envases ? t(" Vendemos por docena (12 unidades).", " We sell by the dozen (12 units).") : ""}
                </p>
                <p className="border-l-2 border-secondary pl-4 text-muted-foreground">
                  <strong className="text-foreground">{t("Mientras más pides, más ahorras.", "The more you order, the more you save.")}</strong> {t("Precio directo de fábrica, sin intermediarios.", "Factory-direct price, no middlemen.")}
                </p>
              </div>
            </>
          )}
          {step === 2 && <ChoiceStep title={envases ? t("¿Cómo lo quieres?", "How would you like it?") : t("¿Cómo lo personalizamos?", "How should we customize it?")} options={o.custom} value={form.customization} onChange={(v) => update("customization", v)} />}
          {step === 3 && <ChoiceStep title={envases ? t("¿Qué vas a envasar?", "What will you bottle?") : t("¿Para qué ocasión?", "What's the occasion?")} options={o.use} value={form.occasion} onChange={(v) => update("occasion", v)} />}
          {step === 4 && <ProjectFields form={form} update={update} envases={envases} />}
          {step === 5 && <Summary product={product} form={form} unit={o.unit[L]} envases={envases} />}
        </div>
        <div className="mt-5 flex justify-between">
          <Button variant="outline" disabled={step === 1} onClick={() => setStep(step - 1)}>
            <ArrowLeft size={15} /> {t("Atrás", "Back")}
          </Button>
          {step < 5 ? (
            <Button disabled={!canNext} onClick={() => setStep(step + 1)}>
              {t("Continuar", "Continue")} <ArrowRight size={15} />
            </Button>
          ) : (
            <Button onClick={send}>
              {t("Enviar a CRISIL por WhatsApp", "Send to CRISIL via WhatsApp")} <Send size={15} />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function ChoiceStep({ title, options, value, onChange, suffix }: { title: string; options: [string, string][]; value: string; onChange: (v: string) => void; suffix?: string | undefined }) {
  const { lang, t } = useLang();
  return (
    <div>
      <p className="text-xs font-bold uppercase text-primary">{t("Selecciona una opción", "Choose an option")}</p>
      <h3 className="display mt-3 text-4xl md:text-5xl">{title}</h3>
      <div className="mt-9 grid gap-3 sm:grid-cols-2">
        {options.map(([es, en]) => (
          <Button key={es} variant={value === es ? "primary" : "outline"} className="min-h-16 justify-between text-left" onClick={() => onChange(es)}>
            {lang === "en" ? en : es}
            {suffix && /^\d/.test(es) ? ` ${suffix}` : ""}
            {value === es ? <Check size={17} /> : <ArrowRight size={15} />}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ProjectFields({ form, update, envases }: { form: FormState; update: (k: keyof FormState, v: string) => void; envases: boolean }) {
  const { lang, t } = useLang();
  const fields: [keyof FormState, string, string, string, boolean][] = [
    ["name", "Tu nombre", "Your name", "text", true],
    ["whatsapp", "Tu WhatsApp", "Your WhatsApp", "tel", true],
    ["company", envases ? "Marca o empresa (opcional)" : "Empresa (opcional)", envases ? "Brand or company (optional)" : "Company (optional)", "text", false],
    ["date", "¿Para cuándo? (opcional)", "When do you need it? (optional)", "date", false],
  ];
  return (
    <div>
      <p className="text-xs font-bold uppercase text-primary">{t("Último paso", "Last step")}</p>
      <h3 className="display mt-3 text-4xl">{t("¿A quién le enviamos la cotización?", "Who should we send the quote to?")}</h3>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {fields.map(([key, es, en, type]) => (
          <label key={key} className="text-xs font-bold uppercase text-muted-foreground">
            {lang === "en" ? en : es}
            <input type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base font-normal text-foreground outline-none focus:border-primary" />
          </label>
        ))}
        <label className="text-xs font-bold uppercase text-muted-foreground md:col-span-2">
          {t("¿Algo más? (otros modelos, colores, medidas…)", "Anything else? (other models, colors, sizes…)")}
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 min-h-24 w-full resize-none border border-input bg-background p-4 text-base font-normal text-foreground outline-none focus:border-primary" />
        </label>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">{t("Producción a pedido en 2 a 4 semanas · Stock inmediato en modelos seleccionados · Envíos a todo Bolivia", "Made to order in 2–4 weeks · Immediate stock on selected models · Shipping across Bolivia")}</p>
    </div>
  );
}

function Summary({ product, form, unit, envases }: { product: Product; form: FormState; unit: string; envases: boolean }) {
  const { t } = useLang();
  const pt = useProductText();
  const rows: [string, string][] = [
    [t("Producto", "Product"), pt.name(product)],
    [t("Cantidad", "Quantity"), `${form.quantity} ${unit}`],
    [t("Personalización", "Customization"), form.customization],
    [envases ? t("Para envasar", "To bottle") : t("Ocasión", "Occasion"), form.occasion],
    [t("Para cuándo", "When"), form.date || t("Sin fecha fija", "No fixed date")],
    [t("Contacto", "Contact"), [form.name, form.company].filter(Boolean).join(" · ")],
  ];
  return (
    <div>
      <p className="text-xs font-bold uppercase text-primary">{t("Revisa y envía", "Review and send")}</p>
      <h3 className="display mt-3 text-5xl">{t("Te respondemos con tu precio por mayor", "We'll reply with your wholesale price")}</h3>
      <div className="mt-9 divide-y divide-border border-y border-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-4 text-sm">
            <span className="font-semibold text-muted-foreground">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
