import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessScroll } from "@/components/ProcessScroll";
import { TrackOrder } from "@/components/TrackOrder";
import { FernetStock } from "@/components/FernetStock";
import { HalloweenPromo } from "@/components/HalloweenPromo";
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel";
import { StorySection } from "@/components/StorySection";
import { categories, products, packagingImage, packagingProducts, type Product } from "@/lib/catalog";
import { LangProvider, LanguageGate, LangToggle, translateSpec, useLang } from "@/lib/i18n";

const logoAsset = { url: "/images/logo-crisil.png" };
const giftsPathAsset = { url: "/images/regalos-fernetera.jpg" };
const packagingPathAsset = { url: "/images/envases-marca.png" };

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
const WHATSAPP_NUMBER = "59169218942";

const activePackaging = packagingProducts.filter((p) => p.active);

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

  const visibleProducts = useMemo(() => products.filter((p) => p.active && p.category === category), [category]);
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const goTo = (target: string) => {
    setMenuOpen(false);
    window.setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: "smooth" }), 30);
  };
  const chooseProduct = (product: Product) => {
    setSelected(product);
    setStep(1);
    window.setTimeout(() => document.querySelector("#configurador")?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  const nav: [string, string, string][] = [
    ["#regalos", "Catálogo", "Catalog"],
    ["#envases", "Vidrio para tu marca", "Glass for your brand"],
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
            {nav.map(([href, es, en]) => (
              <a key={href} href={href} className="hover:opacity-70">
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
              {nav.map(([href, es, en]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
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
              text={t("Vasos, copas, jarras y sets personalizados para tus clientes, colaboradores, invitados o VIPs.", "Custom glasses, goblets, pitchers and sets for your clients, team, guests or VIPs.")}
              image={giftsPathAsset.url}
              imageClassName="object-bottom"
              action={t("Ver el catálogo", "See the catalog")}
              onClick={() => goTo("#regalos")}
            />
            <SolutionCard
              index="02"
              title={t("Vidrio para tu marca", "Glass for your brand")}
              text={t("Botellas, frascos y envases de vidrio personalizados para tu producto.", "Custom bottles, jars and glass packaging for your product.")}
              image={packagingPathAsset.url}
              imageClassName="object-center"
              action={t("Explorar envases de vidrio", "Explore glass packaging")}
              onClick={() => goTo("#envases")}
            />
          </div>
        </div>
      </section>

      {/* 3. Catálogo */}
      <GiftFlow category={category} setCategory={setCategory} products={visibleProducts} chooseProduct={chooseProduct} viewDetails={setDetails} />

      {/* 4. Ofertas del momento */}
      <HalloweenPromo whatsapp={WHATSAPP_NUMBER} />
      <FernetStock whatsapp={WHATSAPP_NUMBER} />

      {/* 5. Envases para marcas */}
      <PackagingFlow chooseProduct={chooseProduct} viewDetails={setDetails} />

      {selected && <Configurator product={selected} step={step} setStep={setStep} form={form} update={update} />}

      {/* 6. Cómo funciona e historia */}
      <ProcessScroll />
      <StorySection />

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
        <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Catálogo 2026 · Vidrio soplado a mano", "2026 Catalog · Hand-blown glass")}</p>
        <h2 className="display text-5xl leading-none md:text-6xl">{t("Elige tus piezas", "Choose your pieces")}</h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          {t("Todas se pueden personalizar con el logo de tu empresa. Abre cada producto para ver sus fotos y medidas.", "Every piece can be customized with your company logo. Open each product to see its photos and measurements.")}
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
              <button type="button" onClick={() => viewDetails(product)} className="relative aspect-[4/5] overflow-hidden bg-[#efebe5]" aria-label={`${t("Ver detalle de", "View details of")} ${pt.name(product)}`}>
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

function JarCard({ jar, chooseProduct, viewDetails }: { jar: Product; chooseProduct: (p: Product) => void; viewDetails: (p: Product) => void }) {
  const { t } = useLang();
  const pt = useProductText();
  const [slide, setSlide] = useState<0 | 1>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  return (
    <article className="group flex flex-col overflow-hidden border border-border bg-card">
      <div
        className="relative aspect-[3/4] w-full select-none overflow-hidden bg-white touch-pan-y"
        onTouchStart={(e) => setTouchStart(e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - (e.changedTouches[0]?.clientX ?? touchStart);
          if (diff > 40) setSlide(1);
          else if (diff < -40) setSlide(0);
          setTouchStart(null);
        }}
      >
        <div className={`absolute inset-0 flex items-center justify-center bg-white p-6 transition-opacity duration-300 ${slide === 0 ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}>
          <img src={jar.image} alt={`${pt.name(jar)} ${t("vacío", "empty")}`} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
        {jar.filledImage && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${slide === 1 ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}>
            <img src={jar.filledImage} alt={`${pt.name(jar)} ${t("con contenido", "filled")}`} loading="lazy" className="h-full w-full object-cover object-center" />
          </div>
        )}
        <span className="absolute left-3 top-3 z-20 rounded bg-primary/90 px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
          {slide === 0 ? t("Envase vacío", "Empty jar") : t("Ejemplo en uso", "In use")}
        </span>
        {jar.filledImage && (
          <>
            <button type="button" onClick={() => setSlide(0)} aria-label={t("Ver envase vacío", "View empty jar")} className={`absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-opacity hover:bg-background ${slide === 0 ? "cursor-default opacity-30" : "opacity-90 hover:opacity-100"}`}>
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={() => setSlide(1)} aria-label={t("Ver con producto", "View with product")} className={`absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-opacity hover:bg-background ${slide === 1 ? "cursor-default opacity-30" : "opacity-90 hover:opacity-100"}`}>
              <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="inline-block rounded bg-primary px-2.5 py-1 font-mono text-xs font-bold text-primary-foreground">{jar.code}</span>
            <span className="text-[10px] font-bold uppercase text-muted-foreground">{t("Mín. 50 uds.", "Min. 50 units")}</span>
          </div>
          <h4 className="display text-2xl text-primary md:text-3xl">{pt.name(jar)}</h4>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
          <Button onClick={() => chooseProduct(jar)} className="flex-1">
            {t("Cotizar envase", "Quote this jar")} <ArrowRight size={14} />
          </Button>
          <Button variant="ghost" onClick={() => viewDetails(jar)} className="px-3">
            {t("Detalle", "Details")}
          </Button>
        </div>
      </div>
    </article>
  );
}

function PackagingFlow({ chooseProduct, viewDetails }: { chooseProduct: (p: Product) => void; viewDetails: (p: Product) => void }) {
  const { t } = useLang();
  const tags: [string, string][] = [
    ["Frascos con tapa", "Jars with lids"],
    ["Mermeladas y dulces", "Jams & sweets"],
    ["Miel y salsas", "Honey & sauces"],
    ["Especias y condimentos", "Spices & seasonings"],
    ["Personalización", "Customization"],
    ["Venta mayorista", "Wholesale"],
  ];
  return (
    <section id="envases" className="scroll-mt-4 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Vidrio para tu marca", "Glass for your brand")}</p>
            <h2 className="display text-5xl leading-none md:text-6xl">{t("Envases diseñados alrededor de tu producto.", "Packaging designed around your product.")}</h2>
            <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
              {t(
                "Desarrollamos frascos, botellas y soluciones especiales en vidrio artesanal boliviano con tapa metálica hermética para alimentos gourmet, confitería, mieles, salsas y cosmética.",
                "We develop jars, bottles and special solutions in handcrafted Bolivian glass with airtight metal lids for gourmet food, confectionery, honey, sauces and cosmetics.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map(([es, en]) => (
                <span key={es} className="border border-border bg-card px-4 py-2 text-xs font-semibold">
                  {t(es, en)}
                </span>
              ))}
            </div>
            <Button className="mt-10" onClick={() => document.querySelector("#catalogo-envases")?.scrollIntoView({ behavior: "smooth" })}>
              {t("Ver catálogo de frascos", "See jar catalog")} <ArrowRight size={15} />
            </Button>
          </div>
          <div className="min-h-96">
            <img src={packagingImage} alt={t("Botellas y frascos CRISIL", "CRISIL bottles and jars")} loading="lazy" className="h-full w-full object-contain p-2" />
          </div>
        </div>

        <div id="catalogo-envases" className="mt-24 border-t border-border pt-16">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-primary">{t("Línea de frascos artesanales", "Handcrafted jar line")}</p>
              <h3 className="display text-4xl md:text-5xl">{t("Elige el envase para tu producto", "Choose the jar for your product")}</h3>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              {t("Desliza o usa las flechas para ver el envase vacío y con producto. ¿Buscas otro modelo? Tenemos más en catálogo: escríbenos.", "Swipe or use the arrows to see each jar empty and filled. Looking for another model? We have more: message us.")}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activePackaging.map((jar) => (
              <JarCard key={jar.id} jar={jar} chooseProduct={chooseProduct} viewDetails={viewDetails} />
            ))}
          </div>
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
