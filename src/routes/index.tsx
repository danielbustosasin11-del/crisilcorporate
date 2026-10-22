import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessScroll } from "@/components/ProcessScroll";
import { TrackOrder } from "@/components/TrackOrder";
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel";
import { StorySection } from "@/components/StorySection";
import { CaseStudy } from "@/components/CaseStudy";
import { VideoReel } from "@/components/VideoReel";
import { InstagramPeek, INSTAGRAM_USER } from "@/components/InstagramPeek";
import { categories, products, packagingProducts, type Product } from "@/lib/catalog";
import { WHATSAPP } from "@/lib/offers";
import { LangProvider, LanguageGate, LangToggle, translateSpec, useLang } from "@/lib/i18n";

const logoAsset = { url: "/images/logo-crisil.png" };
const giftsPathAsset = { url: "/images/cofar/entrega.webp" };
const packagingPathAsset = { url: "/images/marcas/del-valle-gondola.webp" };

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

type FormState = { quantity: string; customization: string; packaging: string; date: string; name: string; company: string; role: string; whatsapp: string; email: string; occasion: string; notes: string };
const initialForm: FormState = { quantity: "", customization: "", packaging: "", date: "", name: "", company: "", role: "", whatsapp: "", email: "", occasion: "", notes: "" };
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

      {/* 2. ¿Qué buscas crear? */}
      <section id="proyecto" className="scroll-mt-4 bg-primary px-5 py-20 text-primary-foreground md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="mb-3 text-xs font-bold uppercase text-secondary">{t("Comencemos", "Let's begin")}</p>
          <h2 className="display max-w-3xl text-5xl leading-none md:text-6xl">{t("¿Qué estás buscando crear?", "What would you like to create?")}</h2>
          <p className="mt-5 text-primary-foreground/65">{t("Elige el camino que mejor describe tu proyecto.", "Choose the path that best fits your project.")}</p>
          <div className="mt-12 grid gap-px bg-primary-foreground/20 md:grid-cols-2">
            <SolutionCard
              index="01"
              title={t("Regalos corporativos", "Corporate gifts")}
              text={t("Vasos, copas, jarras y sets con tu logo, en caja de regalo, para clientes, colaboradores o fechas especiales. Como los que entregamos a médicos de todo el país para Laboratorios COFAR.", "Glasses, goblets, pitchers and sets with your logo, in a gift box, for clients, staff or special dates. Like the ones we delivered to doctors nationwide for COFAR Laboratories.")}
              image={giftsPathAsset.url}
              imageClassName="object-[50%_70%]"
              action={t("Ver regalos corporativos", "See corporate gifts")}
              onClick={() => goTo("#regalos", "vasos")}
            />
            <SolutionCard
              index="02"
              title={t("Vidrio para tu marca", "Glass for your brand")}
              text={t("Tu proveedor de botellas y frascos de vidrio para marcas de alimentos, bebidas, cosmética y restaurantes. Marcas como Del Valle ya llegan a la góndola en nuestros envases.", "Your supplier of glass bottles and jars for food, beverage and cosmetics brands, and restaurants. Brands like Del Valle already reach store shelves in our packaging.")}
              image={packagingPathAsset.url}
              imageClassName="object-center"
              action={t("Ver botellas y frascos", "See bottles and jars")}
              onClick={() => goTo("#regalos", "envases")}
            />
          </div>
        </div>
      </section>

      {/* 3. Catálogo único: regalos, cristalería y envases */}
      <GiftFlow category={category} setCategory={setCategory} products={visibleProducts} chooseProduct={chooseProduct} viewDetails={setDetails} />

      {selected && <Configurator product={selected} step={step} setStep={setStep} form={form} update={update} />}

      {/* 4. Caso real y videos */}
      <CaseStudy />
      <VideoReel />

      {/* 5. Cómo funciona, historia y redes */}
      <ProcessScroll />
      <StorySection />
      <InstagramPeek />

      <TrackOrder />

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

function SolutionCard({ index, title, text, action, image, imageClassName = "object-center", onClick }: { index: string; title: string; text: string; action: string; image: string; imageClassName?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group flex w-full min-w-0 flex-col bg-primary p-5 text-left transition-colors hover:bg-navy-soft sm:p-7 md:p-10">
      <span className="text-xs text-secondary">{index}</span>
      <div className="my-6 aspect-[4/3] w-full overflow-hidden border border-primary-foreground/15 md:my-8">
        <img src={image} alt={title} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`} />
      </div>
      <h3 className="display text-3xl sm:text-4xl">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/65">{text}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
        {action}
        <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
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
        <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Catálogo 2026 · Vidrio reciclado soplado a mano", "2026 Catalog · Hand-blown recycled glass")}</p>
        <h2 className="display text-5xl leading-none md:text-6xl">{t("Elige tus piezas", "Choose your pieces")}</h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          {t("Regalos corporativos, cristalería y envases para tu marca, todo en un solo lugar. Todas las piezas se pueden personalizar con tu logo. Toca un producto para ver sus fotos y medidas.", "Corporate gifts, glassware and packaging for your brand, all in one place. Every piece can carry your logo. Tap a product to see its photos and measurements.")}
        </p>
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
            <p className="mt-6 text-xs text-muted-foreground">{t("Personalizable con el logo de tu empresa · Hecho a mano con vidrio 100% reciclado", "Customizable with your company logo · Handmade from 100% recycled glass")}</p>
            <Button className="mt-6 w-full sm:w-auto" onClick={choose}>
              {t("Cotizar este modelo", "Quote this model")} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Las opciones se guardan en español porque el mensaje de WhatsApp llega a ventas en español
const QTY = ["25", "50", "100", "250", "500", "1000+", "Otra cantidad"];
const CUSTOM: [string, string][] = [["Sí, con logo", "Yes, with logo"], ["Sí, con mensaje", "Yes, with a message"], ["Otra personalización", "Other customization"], ["No", "No"], ["Necesito asesoramiento", "I need advice"]];
const PACK: [string, string][] = [["Estándar", "Standard"], ["Corporativo", "Corporate"], ["Premium", "Premium"], ["A medida / Necesito asesoramiento", "Custom / I need advice"]];
const OCCASIONS: [string, string][] = [["Regalos para clientes", "Client gifts"], ["Regalos para colaboradores", "Team gifts"], ["Evento corporativo", "Corporate event"], ["Fin de año", "Year-end"], ["Aniversario", "Anniversary"], ["Lanzamiento de producto", "Product launch"], ["Regalos VIP", "VIP gifts"], ["Otro", "Other"]];

function Configurator({ product, step, setStep, form, update }: { product: Product; step: number; setStep: (s: number) => void; form: FormState; update: (k: keyof FormState, v: string) => void }) {
  const { t } = useLang();
  const pt = useProductText();
  const progress: [string, string][] = [["Cantidad", "Quantity"], ["Personalización", "Customization"], ["Empaque", "Packaging"], ["Proyecto", "Project"], ["Propuesta", "Proposal"]];
  const canNext = step === 1 ? Boolean(form.quantity) : step === 2 ? Boolean(form.customization) : step === 3 ? Boolean(form.packaging) : step === 4 ? Boolean(form.date && form.name && form.company && form.whatsapp) : true;
  const message = `Hola, quisiera solicitar una propuesta de CRISIL.\n\nProducto: ${product.name}${product.code ? ` (${product.code})` : ""}\nCantidad: ${form.quantity} unidades\nPersonalización: ${form.customization}\nEmpaque: ${form.packaging}\nOcasión: ${form.occasion || "Por definir"}\nFecha requerida: ${form.date}\n\nEmpresa: ${form.company}\nNombre: ${form.name}\n\nQuisiera recibir una propuesta.`;
  const send = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  return (
    <section id="configurador" className="scroll-mt-4 bg-muted px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <p className="text-xs font-bold uppercase text-primary">
              {t("Tu proyecto", "Your project")} · {pt.name(product)}
            </p>
            <h2 className="display mt-2 text-5xl">{t("Configuremos tu pedido", "Let's set up your order")}</h2>
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
          {step === 1 && <ChoiceStep title={t("¿Cuántas unidades necesitas?", "How many units do you need?")} options={QTY.map((q) => [q, q === "Otra cantidad" ? "Other amount" : q])} value={form.quantity} onChange={(v) => update("quantity", v)} />}
          {step === 2 && <ChoiceStep title={t("¿Quieres personalizar el producto?", "Would you like to customize it?")} options={CUSTOM} value={form.customization} onChange={(v) => update("customization", v)} />}
          {step === 3 && (
            <>
              <ChoiceStep title={t("¿Cómo quieres presentarlo?", "How would you like it presented?")} options={PACK} value={form.packaging} onChange={(v) => update("packaging", v)} />
              <p className="mt-8 border-l-2 border-secondary pl-4 text-xs leading-5 text-muted-foreground">
                {t("Los ejemplos de empaque son referenciales. La disponibilidad, materiales, dimensiones y precio dependen del producto, cantidad y proyecto.", "Packaging examples are for reference. Availability, materials, dimensions and price depend on the product, quantity and project.")}
              </p>
            </>
          )}
          {step === 4 && <ProjectFields form={form} update={update} />}
          {step === 5 && <Summary product={product} form={form} />}
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

function ChoiceStep({ title, options, value, onChange }: { title: string; options: [string, string][]; value: string; onChange: (v: string) => void }) {
  const { lang, t } = useLang();
  return (
    <div>
      <p className="text-xs font-bold uppercase text-primary">{t("Selecciona una opción", "Choose an option")}</p>
      <h3 className="display mt-3 text-4xl md:text-5xl">{title}</h3>
      <div className="mt-9 grid gap-3 sm:grid-cols-2">
        {options.map(([es, en]) => (
          <Button key={es} variant={value === es ? "primary" : "outline"} className="min-h-16 justify-between text-left" onClick={() => onChange(es)}>
            {lang === "en" ? en : es}
            {value === es ? <Check size={17} /> : <ArrowRight size={15} />}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ProjectFields({ form, update }: { form: FormState; update: (k: keyof FormState, v: string) => void }) {
  const { lang, t } = useLang();
  const fields: [keyof FormState, string, string, string][] = [
    ["name", "Nombre", "Name", "text"],
    ["company", "Empresa", "Company", "text"],
    ["role", "Cargo", "Role", "text"],
    ["whatsapp", "WhatsApp", "WhatsApp", "tel"],
    ["email", "Correo electrónico", "Email", "email"],
    ["date", "¿Cuándo lo necesitas?", "When do you need it?", "date"],
  ];
  return (
    <div>
      <p className="text-xs font-bold uppercase text-primary">{t("Datos de contacto", "Contact details")}</p>
      <h3 className="display mt-3 text-4xl">{t("Cuéntanos sobre tu proyecto", "Tell us about your project")}</h3>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {fields.map(([key, es, en, type]) => (
          <label key={key} className="text-xs font-bold uppercase text-muted-foreground">
            {lang === "en" ? en : es}
            <input type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base font-normal text-foreground outline-none focus:border-primary" />
          </label>
        ))}
        <label className="text-xs font-bold uppercase text-muted-foreground">
          {t("Ocasión", "Occasion")}
          <div className="relative">
            <select value={form.occasion} onChange={(e) => update("occasion", e.target.value)} className="mt-2 h-12 w-full appearance-none border border-input bg-background px-4 text-base font-normal text-foreground outline-none focus:border-primary">
              <option value="">{t("Seleccionar", "Select")}</option>
              {OCCASIONS.map(([es, en]) => (
                <option key={es} value={es}>
                  {lang === "en" ? en : es}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-5" size={16} />
          </div>
        </label>
        <label className="text-xs font-bold uppercase text-muted-foreground">
          {t("Notas adicionales", "Additional notes")}
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 min-h-28 w-full resize-none border border-input bg-background p-4 text-base font-normal text-foreground outline-none focus:border-primary" />
        </label>
      </div>
    </div>
  );
}

function Summary({ product, form }: { product: Product; form: FormState }) {
  const { t } = useLang();
  const pt = useProductText();
  const rows: [string, string][] = [
    [t("Producto", "Product"), pt.name(product)],
    [t("Cantidad", "Quantity"), `${form.quantity} ${t("unidades", "units")}`],
    [t("Personalización", "Customization"), form.customization],
    [t("Empaque", "Packaging"), form.packaging],
    [t("Ocasión", "Occasion"), form.occasion || t("Por definir", "To be defined")],
    [t("Fecha requerida", "Required date"), form.date],
    [t("Empresa", "Company"), form.company],
    [t("Contacto", "Contact"), form.name],
  ];
  return (
    <div>
      <p className="text-xs font-bold uppercase text-primary">{t("Tu proyecto", "Your project")}</p>
      <h3 className="display mt-3 text-5xl">{t("Listo para solicitar tu propuesta", "Ready to request your proposal")}</h3>
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
