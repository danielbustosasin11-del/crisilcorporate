import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, Package, PenTool, Send, Sparkles, X } from "lucide-react";
import heroAsset from "@/assets/crisil-portada.jpg.asset.json";
import logoAsset from "@/assets/crisil-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { categories, products, packagingImage, type Product } from "@/lib/catalog";

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
  component: Index,
});

type ProjectType = "gifts" | "packaging" | null;
type FormState = { quantity: string; customization: string; packaging: string; date: string; name: string; company: string; role: string; whatsapp: string; email: string; occasion: string; notes: string };
const initialForm: FormState = { quantity: "", customization: "", packaging: "", date: "", name: "", company: "", role: "", whatsapp: "", email: "", occasion: "", notes: "" };
const WHATSAPP_NUMBER = "";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [category, setCategory] = useState("individuales");
  const [selected, setSelected] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [details, setDetails] = useState<Product | null>(null);

  const visibleProducts = useMemo(() => products.filter((product) => product.category === category), [category]);
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const begin = (type: ProjectType) => {
    setProjectType(type);
    window.setTimeout(() => document.querySelector("#proyecto")?.scrollIntoView({ behavior: "smooth" }), 30);
  };
  const chooseProduct = (product: Product) => {
    setSelected(product);
    setStep(1);
    window.setTimeout(() => document.querySelector("#configurador")?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-primary-foreground/20 text-primary-foreground">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#inicio" className="text-2xl font-bold tracking-[0.18em]">CRISIL</a>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase md:flex">
            <a href="#proceso" className="hover:opacity-70">Cómo funciona</a><a href="#proyecto" className="hover:opacity-70">Regalos corporativos</a><a href="#proyecto" className="hover:opacity-70">Vidrio para tu marca</a>
          </nav>
          <Button className="hidden md:inline-flex" onClick={() => begin(null)}>Iniciar mi proyecto <ArrowRight size={15} /></Button>
          <Button variant="ghost" className="h-11 w-11 px-0 text-primary-foreground md:hidden" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-primary-foreground/20 bg-primary px-5 py-6 md:hidden"><div className="flex flex-col gap-5 text-sm font-semibold uppercase"><a href="#proceso" onClick={() => setMenuOpen(false)}>Cómo funciona</a><a href="#proyecto" onClick={() => setMenuOpen(false)}>Regalos corporativos</a><a href="#proyecto" onClick={() => setMenuOpen(false)}>Vidrio para tu marca</a></div></nav>}
      </header>

      <section id="inicio" className="relative flex min-h-[92vh] items-end bg-primary text-primary-foreground">
        <img src={heroAsset.url} alt="Colección de envases y piezas de vidrio artesanal CRISIL" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-8 px-5 pb-12 pt-32 md:px-10 md:pb-16 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div className="reveal max-w-4xl"><p className="mb-5 text-xs font-semibold uppercase text-secondary">Vidrio artesanal boliviano · Desde hace más de 30 años</p><h1 className="display text-5xl leading-[.94] sm:text-7xl lg:text-[6.6rem]">Regalos corporativos que representan tu marca.</h1></div>
          <div className="reveal max-w-lg lg:justify-self-end"><p className="mb-7 text-base leading-7 text-primary-foreground/85 md:text-lg">Vidrio artesanal, personalización y empaque unidos para crear regalos memorables para tus clientes, colaboradores y eventos.</p><div className="flex flex-wrap gap-3"><Button onClick={() => begin(null)}>Crear mi proyecto <ArrowRight size={15} /></Button><Button variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:border-primary-foreground hover:text-primary-foreground" onClick={() => document.querySelector("#proceso")?.scrollIntoView({ behavior: "smooth" })}>Ver cómo funciona</Button></div></div>
        </div>
      </section>

      <section id="proceso" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]"><div className="mb-14 grid gap-6 md:grid-cols-2"><div><p className="mb-3 text-xs font-bold uppercase text-primary">Una idea, hecha en vidrio</p><h2 className="display text-5xl leading-none md:text-6xl">Así creamos tu proyecto</h2></div><p className="max-w-md self-end text-muted-foreground">Un proceso acompañado de principio a fin, pensado para que elegir sea simple y el resultado sea verdaderamente propio.</p></div>
          <div className="relative grid border-y border-border md:grid-cols-4">
            {[{ n:"01", t:"Elige", d:"Elige qué quieres regalar.", icon: Sparkles }, { n:"02", t:"Personaliza", d:"Añade tu marca y define la presentación.", icon: PenTool }, { n:"03", t:"Creamos tu propuesta", d:"Cuéntanos cantidad, ocasión y requisitos.", icon: Package }, { n:"04", t:"Recibe", d:"Tus regalos, listos para representar tu marca.", icon: Check }].map(({n,t,d,icon:Icon}) => <article key={n} className="group min-h-64 border-b border-border p-7 last:border-0 md:border-b-0 md:border-r"><div className="mb-14 flex items-start justify-between"><span className="text-xs font-bold text-primary">{n}</span><Icon className="text-primary transition-transform group-hover:-translate-y-1" size={25} strokeWidth={1.4}/></div><h3 className="display mb-2 text-3xl">{t}</h3><p className="text-sm leading-6 text-muted-foreground">{d}</p></article>)}
          </div><div className="mt-7 inline-flex items-center gap-2 border border-secondary bg-secondary/35 px-4 py-2 text-xs font-semibold text-primary"><Check size={14}/> Pedido corporativo mínimo: 25 unidades</div>
        </div>
      </section>

      <section id="proyecto" className="bg-primary px-5 py-20 text-primary-foreground md:px-10 md:py-28">
        <div className="mx-auto max-w-[1320px]"><p className="mb-3 text-xs font-bold uppercase text-secondary">Comencemos</p><h2 className="display max-w-3xl text-5xl leading-none md:text-6xl">¿Qué estás buscando crear?</h2><p className="mt-5 text-primary-foreground/65">Elige el camino que mejor describe tu proyecto.</p>
          <div className="mt-12 grid gap-px bg-primary-foreground/20 md:grid-cols-2">
            <SolutionCard index="01" title="Regalos corporativos" text="Crea un regalo personalizado para tus clientes, colaboradores, invitados o VIPs." action="Crear un regalo corporativo" onClick={() => begin("gifts")} />
            <SolutionCard index="02" title="Vidrio para tu marca" text="Desarrolla botellas, frascos y empaques de vidrio personalizados para tu producto." action="Explorar envases de vidrio" onClick={() => begin("packaging")} />
          </div>
        </div>
      </section>

      {projectType === "gifts" && <GiftFlow category={category} setCategory={setCategory} products={visibleProducts} chooseProduct={chooseProduct} viewDetails={setDetails} />}
      {projectType === "packaging" && <PackagingFlow />}
      {selected && <Configurator product={selected} step={step} setStep={setStep} form={form} update={update} />}

      <footer className="border-t border-border px-5 py-12 md:px-10"><div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row"><div><p className="text-2xl font-bold tracking-[0.18em] text-primary">CRISIL</p><p className="mt-2 text-sm text-muted-foreground">Vidrio artesanal boliviano para empresas y marcas.</p></div><div className="text-sm text-muted-foreground"><p>Hecho en Bolivia</p><p className="mt-1">Proyectos corporativos y desarrollo de envases</p></div></div></footer>

      {details && <DetailModal product={details} close={() => setDetails(null)} choose={() => { chooseProduct(details); setDetails(null); }} />}
    </main>
  );
}

function SolutionCard({ index, title, text, action, onClick }: { index:string; title:string; text:string; action:string; onClick:()=>void }) {
  return <article className="group bg-primary p-7 transition-colors hover:bg-navy-soft md:min-h-[390px] md:p-10"><div className="flex h-full flex-col"><span className="text-xs text-secondary">{index}</span><div className="fine-grid my-12 flex min-h-32 items-center justify-center border border-primary-foreground/15"><Sparkles size={42} strokeWidth={1} className="text-secondary" /></div><h3 className="display text-4xl">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/65">{text}</p><Button variant="ghost" className="mt-8 w-fit px-0 text-primary-foreground hover:bg-transparent" onClick={onClick}>{action}<ArrowRight size={16}/></Button></div></article>;
}

function ImagePlaceholder({ label }: { label: string }) { return <div className="fine-grid flex h-full min-h-56 w-full items-center justify-center bg-muted"><div className="text-center"><Sparkles className="mx-auto mb-3 text-primary/50" strokeWidth={1}/><p className="text-[10px] font-bold uppercase text-muted-foreground">Fotografía pendiente</p><p className="display mt-1 text-xl text-primary">{label}</p></div></div>; }

function GiftFlow({ category, setCategory, products, chooseProduct, viewDetails }: { category:string; setCategory:(v:string)=>void; products:Product[]; chooseProduct:(p:Product)=>void; viewDetails:(p:Product)=>void }) {
  return <section className="px-5 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-[1320px]"><p className="mb-3 text-xs font-bold uppercase text-primary">Regalos corporativos</p><h2 className="display text-5xl leading-none md:text-6xl">¿Qué tipo de regalo quieres crear?</h2><p className="mt-5 max-w-2xl text-muted-foreground">Elige una categoría para comenzar. Luego podrás definir producto, cantidad, personalización y empaque.</p>
    <div className="mt-10 flex gap-2 overflow-x-auto pb-3">{categories.map((item) => <Button key={item.id} variant={category === item.id ? "primary" : "outline"} className="shrink-0" onClick={() => setCategory(item.id)}>{item.name}</Button>)}</div>
    <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.length ? products.map((product) => <article key={product.id} className="group border border-border bg-card"><div className="aspect-[4/3] overflow-hidden"><ImagePlaceholder label={product.name}/></div><div className="p-6"><div className="flex justify-between gap-4"><h3 className="display text-3xl">{product.name}</h3><span className="h-fit bg-secondary/40 px-2 py-1 text-[10px] font-bold uppercase text-primary">Mín. 25</span></div><p className="mt-3 min-h-16 text-sm leading-6 text-muted-foreground">{product.description}</p><div className="mt-6 flex items-center justify-between"><Button onClick={() => chooseProduct(product)}>Elegir <ArrowRight size={14}/></Button><Button variant="ghost" onClick={() => viewDetails(product)}>Ver detalle</Button></div></div></article>) : <div className="col-span-full border border-border bg-card p-10 text-center"><h3 className="display text-3xl">Selección en preparación</h3><p className="mt-2 text-sm text-muted-foreground">Estamos preparando las piezas y fotografías de esta categoría.</p></div>}</div>
  </div></section>;
}

function PackagingFlow() { return <section className="px-5 py-20 md:px-10 md:py-28"><div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-2"><div><p className="mb-3 text-xs font-bold uppercase text-primary">Vidrio para tu marca</p><h2 className="display text-5xl leading-none md:text-6xl">Envases diseñados alrededor de tu producto.</h2><p className="mt-6 max-w-xl leading-7 text-muted-foreground">Desarrollamos botellas, frascos y soluciones especiales para bebidas, alimentos, cosmética y productos de autor.</p><div className="mt-8 flex flex-wrap gap-2">{["Botellas", "Frascos", "Envases especiales", "Personalización", "Desarrollo de producto"].map(x => <span key={x} className="border border-border bg-card px-4 py-2 text-xs font-semibold">{x}</span>)}</div><Button className="mt-10" onClick={() => document.querySelector("#consulta-envases")?.scrollIntoView({behavior:"smooth"})}>Solicitar propuesta <ArrowRight size={15}/></Button></div><div className="min-h-96"><ImagePlaceholder label="Botellas y frascos CRISIL"/></div></div><PackagingForm /></section>; }

function PackagingForm() { return <div id="consulta-envases" className="mx-auto mt-20 max-w-[1320px] border-t border-border pt-14"><h3 className="display text-4xl">Cuéntanos sobre tu envase</h3><div className="mt-8 grid gap-5 md:grid-cols-2">{["Tipo de producto", "Cantidad estimada", "Botella o frasco deseado", "Personalización", "Fecha objetivo", "Nombre y empresa"].map((label) => <label key={label} className="text-xs font-bold uppercase text-muted-foreground">{label}<input className="mt-2 h-12 w-full border border-input bg-card px-4 text-base font-normal text-foreground outline-none focus:border-primary" /></label>)}</div><Button className="mt-7">Preparar consulta <ArrowRight size={15}/></Button></div>; }

function DetailModal({ product, close, choose }: { product:Product; close:()=>void; choose:()=>void }) { return <div className="fixed inset-0 z-50 flex items-end justify-center bg-primary/70 p-0 backdrop-blur-sm md:items-center md:p-6" onMouseDown={close}><div className="max-h-[92vh] w-full max-w-4xl overflow-auto bg-background" onMouseDown={(e)=>e.stopPropagation()}><div className="grid md:grid-cols-2"><ImagePlaceholder label={product.name}/><div className="p-7 md:p-10"><div className="flex items-start justify-between"><p className="text-xs font-bold uppercase text-primary">Regalo corporativo</p><Button variant="ghost" className="h-10 w-10 p-0" onClick={close} aria-label="Cerrar"><X/></Button></div><h2 className="display mt-5 text-5xl">{product.name}</h2><p className="mt-5 leading-7 text-muted-foreground">{product.description}</p>{product.specifications && <div className="mt-8 border-t border-border pt-6"><p className="mb-4 text-xs font-bold uppercase">Especificaciones</p>{product.specifications.map(x=><p key={x} className="mb-2 text-sm text-muted-foreground">{x}</p>)}{product.code && <p className="mt-4 text-xs font-bold">Código: {product.code}</p>}</div>}<Button className="mt-8" onClick={choose}>Elegir este regalo <ArrowRight size={15}/></Button></div></div></div></div>; }

function Configurator({ product, step, setStep, form, update }: { product:Product; step:number; setStep:(s:number)=>void; form:FormState; update:(k:keyof FormState,v:string)=>void }) {
  const progress = ["Cantidad", "Personalización", "Empaque", "Proyecto", "Propuesta"];
  const canNext = step === 1 ? Boolean(form.quantity) : step === 2 ? Boolean(form.customization) : step === 3 ? Boolean(form.packaging) : step === 4 ? Boolean(form.date && form.name && form.company && form.whatsapp) : true;
  const message = `Hola, quisiera solicitar una propuesta de regalo corporativo de CRISIL.\n\nProducto: ${product.name}\nCantidad: ${form.quantity} unidades\nPersonalización: ${form.customization}\nEmpaque: ${form.packaging}\nOcasión: ${form.occasion || "Por definir"}\nFecha requerida: ${form.date}\n\nEmpresa: ${form.company}\nNombre: ${form.name}\n\nQuisiera recibir una propuesta.`;
  const send = () => { if (!WHATSAPP_NUMBER) { navigator.clipboard?.writeText(message); window.alert("La consulta fue copiada. El número de WhatsApp de CRISIL será agregado cuando esté confirmado."); return; } window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer"); };
  return <section id="configurador" className="bg-muted px-5 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-5xl"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row"><div><p className="text-xs font-bold uppercase text-primary">Tu proyecto · {product.name}</p><h2 className="display mt-2 text-5xl">Configuremos tu regalo</h2></div><span className="self-start border border-border bg-card px-4 py-2 text-xs font-semibold">Paso {step} de 5</span></div><div className="mb-10 grid grid-cols-5 gap-1">{progress.map((label,i)=><div key={label}><div className={`h-1 ${i+1<=step?"bg-primary":"bg-border"}`}/><p className="mt-2 hidden text-[10px] font-bold uppercase text-muted-foreground sm:block">{label}</p></div>)}</div>
    <div className="min-h-[430px] bg-card p-6 md:p-10">{step===1&&<ChoiceStep title="¿Cuántas unidades necesitas?" options={["25","50","100","250","500","1000+","Otra cantidad"]} value={form.quantity} onChange={(v)=>update("quantity",v)} />}{step===2&&<ChoiceStep title="¿Quieres personalizar el producto?" options={["Sí, con logo","Sí, con mensaje","Otra personalización","No","Necesito asesoramiento"]} value={form.customization} onChange={(v)=>update("customization",v)} />}{step===3&&<><ChoiceStep title="¿Cómo quieres presentarlo?" options={["Estándar","Corporativo","Premium","A medida / Necesito asesoramiento"]} value={form.packaging} onChange={(v)=>update("packaging",v)} /><p className="mt-8 border-l-2 border-secondary pl-4 text-xs leading-5 text-muted-foreground">Los ejemplos de empaque son referenciales. La disponibilidad, materiales, dimensiones y precio dependen del producto, cantidad y proyecto.</p></>}{step===4&&<ProjectFields form={form} update={update}/>} {step===5&&<Summary product={product} form={form}/>}</div>
    <div className="mt-5 flex justify-between"><Button variant="outline" disabled={step===1} onClick={()=>setStep(step-1)}><ArrowLeft size={15}/> Atrás</Button>{step<5?<Button disabled={!canNext} onClick={()=>setStep(step+1)}>Continuar <ArrowRight size={15}/></Button>:<Button onClick={send}>Enviar a CRISIL <Send size={15}/></Button>}</div></div></section>;
}

function ChoiceStep({ title, options, value, onChange }: { title:string; options:string[]; value:string; onChange:(v:string)=>void }) { return <div><p className="text-xs font-bold uppercase text-primary">Selecciona una opción</p><h3 className="display mt-3 text-4xl md:text-5xl">{title}</h3><div className="mt-9 grid gap-3 sm:grid-cols-2">{options.map(option=><Button key={option} variant={value===option?"primary":"outline"} className="min-h-16 justify-between text-left" onClick={()=>onChange(option)}>{option}{value===option?<Check size={17}/>:<ArrowRight size={15}/>}</Button>)}</div></div>; }

function ProjectFields({ form, update }: { form:FormState; update:(k:keyof FormState,v:string)=>void }) { const fields:[keyof FormState,string,string][]=[["name","Nombre","text"],["company","Empresa","text"],["role","Cargo","text"],["whatsapp","WhatsApp","tel"],["email","Correo electrónico","email"],["date","¿Cuándo lo necesitas?","date"]]; return <div><p className="text-xs font-bold uppercase text-primary">Datos de contacto</p><h3 className="display mt-3 text-4xl">Cuéntanos sobre tu proyecto</h3><div className="mt-8 grid gap-5 md:grid-cols-2">{fields.map(([key,label,type])=><label key={key} className="text-xs font-bold uppercase text-muted-foreground">{label}<input type={type} value={form[key]} onChange={e=>update(key,e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base font-normal text-foreground outline-none focus:border-primary"/></label>)}<label className="text-xs font-bold uppercase text-muted-foreground">Ocasión<div className="relative"><select value={form.occasion} onChange={e=>update("occasion",e.target.value)} className="mt-2 h-12 w-full appearance-none border border-input bg-background px-4 text-base font-normal text-foreground outline-none focus:border-primary"><option value="">Seleccionar</option>{["Regalos para clientes","Regalos para colaboradores","Evento corporativo","Fin de año","Aniversario","Lanzamiento de producto","Regalos VIP","Otro"].map(x=><option key={x}>{x}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-5" size={16}/></div></label><label className="text-xs font-bold uppercase text-muted-foreground">Notas adicionales<textarea value={form.notes} onChange={e=>update("notes",e.target.value)} className="mt-2 min-h-28 w-full resize-none border border-input bg-background p-4 text-base font-normal text-foreground outline-none focus:border-primary"/></label></div></div>; }

function Summary({ product, form }: { product:Product; form:FormState }) { return <div><p className="text-xs font-bold uppercase text-primary">Tu proyecto</p><h3 className="display mt-3 text-5xl">Listo para solicitar tu propuesta</h3><div className="mt-9 divide-y divide-border border-y border-border">{[["Producto",product.name],["Cantidad",`${form.quantity} unidades`],["Personalización",form.customization],["Empaque",form.packaging],["Ocasión",form.occasion||"Por definir"],["Fecha requerida",form.date],["Empresa",form.company],["Contacto",form.name]].map(([k,v])=><div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-4 text-sm"><span className="font-semibold text-muted-foreground">{k}</span><span>{v}</span></div>)}</div></div>; }