"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft, Upload, Type, CreditCard, CheckCircle2,
  ArrowRight, Plus, Minus, Star, Zap, ShieldCheck, Truck, X,
  Palette, Image as ImageIcon, Tag, User, Ruler, Instagram,
  Music2, MapPin, Globe, Check, AlertCircle, Mail
} from 'lucide-react';

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

// --- DATOS DE PRODUCTOS ---
const PRODUCTOS = [
  {
    id: "prod_01",
    nombre: "Poleras Personalizadas",
    precio: 200,
    imagen: "/polera.png",
    descripcion: "Diseña tu polera 100% algodón como quieras.",
    coloresDisponibles: [
      { nombre: "Black", hex: "#000000" },
      { nombre: "White Linen", hex: "#f5f0ea" },
      { nombre: "French Gray", hex: "#b8bbc4" },
      { nombre: "Red", hex: "#fe0000" },
      { nombre: "Tangaroa", hex: "#011a41" },
      { nombre: "Blue", hex: "#0000fe" },
      { nombre: "Paprika", hex: "#830028" },
      { nombre: "Tuatara", hex: "#3b3b3b" },
      { nombre: "Yellow", hex: "#ffff01" },
      { nombre: "California", hex: "#f39c11" },
      { nombre: "Wild Watermelon", hex: "#ff4477" },
      { nombre: "Your Pink", hex: "#fccacd" },
      { nombre: "Mongoose", hex: "#b4a07b" },
      { nombre: "Spray", hex: "#70e9fe" },
      { nombre: "Cerulean", hex: "#00a1d7" },
      { nombre: "Camarone", hex: "#005407" },
      { nombre: "Cornflower Blue", hex: "#5599fe" },
      { nombre: "Loulou", hex: "#550044" },
      { nombre: "Bracken", hex: "#4d2b10" },
      { nombre: "Dark Tuatara", hex: "#393c3f" },
      { nombre: "Aquamarine", hex: "#57ffc2" },
      { nombre: "Green House", hex: "#345401" },
      { nombre: "Kenyan Copper", hex: "#801100" },
      { nombre: "Chathams Blue", hex: "#014f7e" },
      { nombre: "Puerto Rico", hex: "#00ccb3" },
      { nombre: "Atlantis", hex: "#7fd604" },
      { nombre: "Chestnut Rose", hex: "#d65e60" },
      { nombre: "Quarter Spanish White", hex: "#f1ebdb" },
      { nombre: "Celtic", hex: "#192d21" },
      { nombre: "Silver Sand", hex: "#cacacc" }
    ],
    tallasDisponibles: ["S (46-69)", "M (51-71)", "L (56-74)", "XL (61-76)"]
  },
  { id: "prod_02", nombre: "Vasos Personalizados", precio: 9900, imagen: "/vasos.jpg", descripcion: "Lleva tu bebida favorita a todas partes." },
  { id: "prod_03", nombre: "Tote Bags Personalizadas", precio: 5000, imagen: "/totebag.jpg", descripcion: "Biodegradable, ligera, reutilizable." },
  { id: "prod_04", nombre: "Puzzles Personalizados", precio: 6990, imagen: "/rompe.jpg", descripcion: "Transforma tu foto favorita en un momento para disfrutar." }
];

// --- COMPONENTES ---

const Navbar = ({ onNavigate, vistaActiva }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fbeeca] backdrop-blur-xl border-b border-amber-100 h-20 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
      <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer">
        <img src="/sparkup_icono.png" alt="Logo" className="h-30 w-auto object-contain transition-transform hover:scale-105" />
      </div>
      <div className="flex items-center gap-6 sm:gap-8">
        <button onClick={() => onNavigate('home')} className={`text-sm font-black uppercase tracking-wider transition-colors ${vistaActiva === 'home' || vistaActiva === 'personalizar' ? 'text-pink-400' : 'text-black hover:text-pink-500'}`}>Inicio</button>
        <button onClick={() => onNavigate('nosotros')} className={`text-sm font-black uppercase tracking-wider transition-colors ${vistaActiva === 'nosotros' ? 'text-pink-400' : 'text-black hover:text-pink-500'}`}>Nosotros</button>
      </div>
    </div>
  </nav>
);

const SobreNosotros = () => (
  <div className="space-y-16 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-x-hidden px-4">
    <section className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <span className="px-4 py-2 bg-pink-50 text-pink-500 rounded-full text-xs font-black uppercase tracking-widest">Nuestra Historia</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Pasión por el detalle, <br /><span className="text-pink-400">calidad garantizada</span>.</h2>
        <p className="text-lg text-slate-500 leading-relaxed">En SparkUp nos dedicamos a transformar tus ideas en productos tangibles de alta calidad con envíos a todo Chile.</p>
      </div>
      <div className="relative aspect-video sm:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
        <img src="/team.jpg" className="w-full h-full object-cover" alt="Nuestro Equipo" />
      </div>
    </section>
  </div>
);

const ProductCard = ({ producto, onSelect }) => (
  <div className="group bg-[#FEFAEF] rounded-[2.5rem] p-4 border border-slate-100 hover:border-pink-200 hover:shadow-2xl transition-all duration-500 w-full overflow-hidden box-border">
    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </div>
    <div className="mt-6 px-2 pb-2">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{producto.nombre}</h3>
        <span className="font-black text-pink-500 text-lg flex-shrink-0">${producto.precio.toLocaleString('es-CL')}</span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2 mb-6">{producto.descripcion}</p>
      <button onClick={() => onSelect(producto)} className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-pink-400 transition-all duration-300 transform active:scale-95 shadow-lg">Personalizar <ArrowRight size={18} /></button>
    </div>
  </div>
);

const Customizer = ({ producto, onBack }) => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [texto, setTexto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState(producto.coloresDisponibles?.[0] || null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(producto.tallasDisponibles?.[1] || null);
  const [cargando, setCargando] = useState(false);
  const [errorPago, setErrorPago] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const fileInputRef = useRef(null);

  const esMayorista = cantidad >= 10;
  const getPrecioUnitario = () => {
    if (!esMayorista) return producto.precio;
    switch (producto.id) {
      case "prod_01": return 7990;
      case "prod_03": return 4000;
      case "prod_02": return 8000;
      case "prod_04": return 4000;
      default: return producto.precio;
    }
  };

  const precioUnitarioActual = getPrecioUnitario();
  const precioTotal = precioUnitarioActual * cantidad;
  const esPolera = producto.id === "prod_01";

  useEffect(() => {
    // Cargar SDKs
    const mpScript = document.createElement('script');
    mpScript.src = 'https://sdk.mercadopago.com/js/v2';
    mpScript.async = true;
    document.body.appendChild(mpScript);

    const emailScript = document.createElement('script');
    emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    emailScript.async = true;
    document.body.appendChild(emailScript);

    return () => {
      if (document.body.contains(mpScript)) document.body.removeChild(mpScript);
      if (document.body.contains(emailScript)) document.body.removeChild(emailScript);
    };
  }, []);

  const handleCreatePreference = async () => {
    if (!nombreCliente.trim() || !ubicacion.trim() || !emailCliente.trim()) {
      setErrorPago("Por favor completa Nombre, Email y Dirección.");
      return;
    }

    setCargando(true);
    setErrorPago(null);
    setPreferenceId(null);

    try {
      // Guardar datos temporalmente para enviarlos por EmailJS tras el pago exitoso
      const orderData = {
        from_name: nombreCliente,
        customer_email: emailCliente,
        address: ubicacion,
        product: producto.nombre,
        quantity: cantidad,
        color: esPolera ? colorSeleccionado.nombre : 'N/A',
        size: esPolera ? tallaSeleccionada : 'N/A',
        custom_text: texto || 'Sin texto',
        has_image: !!imageFile ? 'Sí (Cliente la adjuntará)' : 'No',
        total_price: precioTotal.toLocaleString('es-CL'),
        timestamp: Date.now()
      };
      localStorage.setItem('pending_sparkup_order', JSON.stringify(orderData));

      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: producto.id,
          nombre: producto.nombre,
          precio: precioUnitarioActual,
          cantidad: cantidad,
          texto: texto,
          color: esPolera ? colorSeleccionado.nombre : null,
          talla: esPolera ? tallaSeleccionada : null,
          nombreCliente: nombreCliente,
          ubicacion: ubicacion
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error en el servidor");

      if (data.id) {
        setPreferenceId(data.id);
        renderCheckoutButton(data.id);
      }
    } catch (error) {
      console.error(error);
      setErrorPago(error.message);
    } finally {
      setCargando(false);
    }
  };

  const renderCheckoutButton = (id) => {
    if (window.MercadoPago && MP_PUBLIC_KEY) {
      const mp = new window.MercadoPago(MP_PUBLIC_KEY, { locale: 'es-CL' });
      const bricksBuilder = mp.bricks();
      const container = document.getElementById('wallet_container');
      if (container) container.innerHTML = '';

      bricksBuilder.create("wallet", "wallet_container", {
        initialization: { preferenceId: id },
        customization: { texts: { valueProp: 'security_details' } }
      });
    } else {
      console.error("Mercado Pago SDK no cargado o Public Key faltante.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-20 px-4 sm:px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-10 font-black uppercase text-xs tracking-widest">
        <ChevronLeft size={16} /> Regresar
      </button>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 sticky top-24">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50"
            style={esPolera ? { backgroundColor: `${colorSeleccionado?.hex}15` } : {}}>
            <img src={producto.imagen} className="w-full h-full object-cover" alt={producto.nombre} />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 leading-tight italic">{producto.nombre}</h1>
            <p className="text-xl font-bold text-pink-500 mt-2">${producto.precio.toLocaleString('es-CL')} CLP</p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nombre Completo</label>
                <input type="text" placeholder="Ej: Juan Pérez" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Correo Electrónico</label>
                <input type="email" placeholder="tu@email.com" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Dirección de Envío (Ciudad, Calle, Nº)</label>
                <input type="text" placeholder="Ej: Santiago, Av. Providencia 1234" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
              </div>
            </div>

            {esPolera && (
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Color y Talla</label>
                <div className="flex flex-wrap gap-2">
                  {producto.coloresDisponibles.map((color) => (
                    <button key={color.nombre} onClick={() => setColorSeleccionado(color)} className={`w-8 h-8 rounded-lg border-2 transition-all ${colorSeleccionado?.nombre === color.nombre ? 'border-pink-400 scale-110' : 'border-slate-100'}`}>
                      <span className="w-full h-full rounded-sm block" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {producto.tallasDisponibles.map((talla) => (
                    <button key={talla} onClick={() => setTallaSeleccionada(talla)} className={`py-3 rounded-xl border-2 font-black text-xs transition-all ${tallaSeleccionada === talla ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}>{talla}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Texto Personalizado</label>
              <input type="text" placeholder="Escribe tu frase aquí..." className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={texto} onChange={(e) => setTexto(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Imagen o Diseño</label>
              <div onClick={() => fileInputRef.current.click()} className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${imageFile ? 'border-green-400 bg-green-50' : 'border-slate-100 hover:bg-pink-50'}`}>
                <input type="file" ref={fileInputRef} onChange={(e) => setImageFile(e.target.files[0])} className="hidden" accept="image/*" />
                <p className="text-xs font-bold text-slate-400">{imageFile ? imageFile.name : "Subir archivo"}</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-1">
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="p-2"><Minus size={14} /></button>
                  <span className="font-black w-4 text-center">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="p-2"><Plus size={14} /></button>
                </div>
                <p className="text-3xl font-black text-pink-400 italic">${precioTotal.toLocaleString('es-CL')}</p>
              </div>

              {errorPago && <p className="text-red-400 text-center text-[10px] font-bold uppercase">{errorPago}</p>}

              <div id="wallet_container" className="min-h-[50px] overflow-hidden rounded-xl"></div>

              {!preferenceId && (
                <button onClick={handleCreatePreference} disabled={cargando} className="w-full py-5 rounded-2xl font-black text-lg bg-pink-400 hover:bg-pink-500 transition-all transform active:scale-95">
                  {cargando ? "Cargando..." : "Confirmar Pedido"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [vista, setVista] = useState('home');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailStatus, setEmailStatus] = useState("Procesando envío de correo...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'approved') {
      const order = JSON.parse(localStorage.getItem('pending_sparkup_order'));
      if (order && window.emailjs) {
        setShowSuccessModal(true);
        window.emailjs.init(EMAILJS_PUBLIC_KEY);

        window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_name: "Admin SparkUp",
          from_name: order.from_name,
          customer_email: order.customer_email,
          address: order.address,
          order_details: `Producto: ${order.product} | Cantidad: ${order.quantity} | Color: ${order.color} | Talla: ${order.size} | Texto: ${order.custom_text} | Imagen: ${order.has_image}`,
          total_price: order.total_price,
          reply_to: order.customer_email
        })
          .then(() => {
            setEmailStatus("¡Pedido enviado con éxito! Revisa tu bandeja de entrada.");
            localStorage.removeItem('pending_sparkup_order');
          })
          .catch(() => {
            setEmailStatus("Error al enviar el correo. Por favor contáctanos con tu comprobante de pago.");
          });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFAEF] font-sans text-slate-900 selection:bg-pink-100">
      <Navbar onNavigate={setVista} vistaActiva={vista} />

      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black italic mb-2 uppercase">¡Pago Exitoso!</h3>
            <p className="text-slate-500 font-bold text-xs mb-8">{emailStatus}</p>
            <button onClick={() => { setShowSuccessModal(false); window.location.href = "/"; }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Ir al Inicio</button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        {vista === 'home' && (
          <div className="space-y-12">
            <header className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight italic">Damos vida a tus <span className="text-pink-400">ideas</span></h2>
              <p className="text-lg text-slate-400 mt-4 font-medium uppercase tracking-tighter">Elige tu base favorito y crea algo único hoy mismo</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRODUCTOS.map(p => <ProductCard key={p.id} producto={p} onSelect={(prod) => { setProductoSeleccionado(prod); setVista('personalizar'); window.scrollTo(0, 0); }} />)}
            </div>
          </div>
        )}
        {vista === 'nosotros' && <SobreNosotros />}
        {vista === 'personalizar' && <Customizer producto={productoSeleccionado} onBack={() => setVista('home')} />}
      </main>
      <footer className="w-full py-6 bg-[#fbeeca] border-t border-amber-100 text-center text-slate-400 text-xs font-medium">
        © 2026 SparkUp. Todos los derechos reservados.
      </footer>
    </div>
  );
}