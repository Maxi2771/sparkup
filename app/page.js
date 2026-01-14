"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft, Upload, Type, CreditCard, CheckCircle2,
  ArrowRight, Plus, Minus, Star, Zap, ShieldCheck, Truck, X,
  Palette, Image as ImageIcon, Tag, User, Ruler, Instagram,
  Music2, MapPin, Globe, Check, AlertCircle, Mail
} from 'lucide-react';

// --- CONFIGURACIÓN DESDE VARIABLES DE ENTORNO ---
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

// --- FALLBACK DE IMÁGENES ---
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800";

// --- DATOS DE PRODUCTOS ---
const PRODUCTOS = [
  {
    id: "prod_01",
    nombre: "Poleras para adultos personalizadas",
    precio: 9990,
    precioMayorista: 7990,
    imagen: "/polera.png",
    descripcion: "Diseña tu polera 100% algodón como quieras.",
    esPersonalizable: true,
    tieneMayorista: true,
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
  {
    id: "prod_02",
    nombre: "Poleras para niños personalizadas",
    precio: 8000,
    precioMayorista: 6000,
    imagen: "/polera.png",
    descripcion: "Diseña tu polera 100% algodón como quieras.",
    esPersonalizable: true,
    tieneMayorista: true,
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
    tallasDisponibles: ["S (35-45)", "M (38-49)", "L (41-52)", "XL (43-65)"]
  },
  { id: "prod_03", nombre: "Tote Bags Personalizadas", precio: 5000, precioMayorista: 4000, esPersonalizable: true, tieneMayorista: true, imagen: "/totebag.jpg", descripcion: "Biodegradable, ligera, reutilizable." },
  { 
    id: "prod_04", 
    nombre: "Vasos Estándar", 
    precio: 8000, 
    esPersonalizable: false, 
    tieneMayorista: false, 
    imagen: "/vasos.jpg", 
    descripcion: "Diseños exclusivos ya establecidos.",
    disenos: [
      { id: "v1", nombre: "Galaxia", imagen: "/vasos_galaxia.jpg" },
      { id: "v2", nombre: "Abstracto", imagen: "/vasos_abstracto.jpg" },
      { id: "v3", nombre: "Naturaleza", imagen: "/vasos_naturaleza.jpg" },
      { id: "v4", nombre: "Retro", imagen: "/vasos_retro.jpg" }
    ]
  },
  { 
    id: "prod_05", 
    nombre: "Puzzles Estándar", 
    precio: 4000, 
    esPersonalizable: false, 
    tieneMayorista: false, 
    imagen: "/rompe.jpg", 
    descripcion: "Diseños clásicos para armar.",
    disenos: [
      { id: "p1", nombre: "Ciudad", imagen: "/puzzle_ciudad.jpg" },
      { id: "p2", nombre: "Bosque", imagen: "/puzzle_bosque.jpg" },
      { id: "p3", nombre: "Animales", imagen: "/puzzle_animales.jpg" },
      { id: "p4", nombre: "Arte", imagen: "/puzzle_arte.jpg" }
    ]
  },
  { id: "prod_06", nombre: "Vasos Personalizados", precio: 9990, esPersonalizable: true, tieneMayorista: false, imagen: "/vasos.jpg", descripcion: "Lleva tu bebida favorita con tu propio estilo." },
  { id: "prod_07", nombre: "Puzzles Personalizados", precio: 6990, esPersonalizable: true, tieneMayorista: false, imagen: "/rompe.jpg", descripcion: "Tus fotos favoritas en un rompecabezas." },
];

const handleImgError = (e) => {
  e.target.src = FALLBACK_IMAGE;
};

// --- COMPONENTES ---

const Navbar = ({ onNavigate, vistaActiva }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fbeeca] backdrop-blur-xl border-b border-amber-100 h-20 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
      <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer">
        <img src="/sparkup_icono.png" alt="Logo" className="h-30 w-auto object-contain transition-transform hover:scale-105" onError={handleImgError} />
      </div>
      <div className="flex items-center gap-6 sm:gap-8">
        <button onClick={() => onNavigate('home')} className={`text-sm font-black uppercase tracking-wider transition-colors ${vistaActiva === 'home' || vistaActiva === 'personalizar' ? 'text-pink-400' : 'text-black hover:text-pink-500'}`}>Inicio</button>
        <button onClick={() => onNavigate('nosotros')} className={`text-sm font-black uppercase tracking-wider transition-colors ${vistaActiva === 'nosotros' ? 'text-pink-400' : 'text-black hover:text-pink-500'}`}>Nosotros</button>
      </div>
    </div>
  </nav>
);

const SobreNosotros = () => (
  <div className="space-y-24 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-x-hidden px-4">
    {/* SECCIÓN HISTORIA */}
    <section className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <span className="px-4 py-2 bg-pink-50 text-pink-500 rounded-full text-xs font-black uppercase tracking-widest">Nuestra Historia</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Pasión por el detalle, <br /><span className="text-pink-400">calidad garantizada</span>.</h2>
        <p className="text-lg text-slate-500 leading-relaxed font-medium">En SparkUp nos dedicamos a transformar tus ideas en productos tangibles de alta calidad.</p>
      </div>
      <div className="relative aspect-video sm:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
        <img src="/team.jpg" className="w-full h-full object-cover" alt="Nuestro Equipo" onError={handleImgError} />
      </div>
    </section>

    {/* SECCIÓN REDES SOCIALES */}
    <section className="space-y-12 bg-white/50 py-16 rounded-[3rem] border border-slate-100">
      <div className="text-center space-y-4 max-w-2xl mx-auto px-6">
        <h3 className="text-3xl font-black italic uppercase tracking-tighter">Únete a nuestra comunidad</h3>
        <p className="text-slate-400 font-bold text-sm tracking-wide">Síguenos para ver nuestros últimos trabajos, promociones y el día a día en el taller.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">
        {/* INSTAGRAM */}
        <a 
          href="https://www.instagram.com/sparkup_cl/?__pwa=1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-6 overflow-hidden border border-slate-50"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-purple-600/10 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-4 rounded-2xl text-white shadow-xl group-hover:rotate-6 transition-transform">
            <Instagram size={32} />
          </div>
          <div className="relative">
            <h4 className="text-xl font-black">Instagram</h4>
            <p className="text-slate-400 font-bold text-sm">@sparkup_cl</p>
          </div>
          <ArrowRight className="ml-auto text-slate-200 group-hover:text-pink-400 transition-colors" />
        </a>

        {/* TIKTOK */}
        <a 
          href="https://www.tiktok.com/@sparkup_cl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-6 overflow-hidden border border-slate-50"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
          <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-xl group-hover:-rotate-6 transition-transform">
            <Music2 size={32} />
          </div>
          <div className="relative">
            <h4 className="text-xl font-black">TikTok</h4>
            <p className="text-slate-400 font-bold text-sm">@sparkup_oficial</p>
          </div>
          <ArrowRight className="ml-auto text-slate-200 group-hover:text-pink-400 transition-colors" />
        </a>
      </div>
    </section>
  </div>
);

const ProductCard = ({ producto, onSelect }) => (
  <div className="group bg-[#FEFAEF] rounded-[2.5rem] p-4 border border-slate-100 hover:border-pink-200 hover:shadow-2xl transition-all duration-500 w-full overflow-hidden box-border">
    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={handleImgError} />
      {producto.tieneMayorista && (
        <div className="absolute top-4 right-4 bg-pink-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">DISPONIBLE MAYORISTA</div>
      )}
    </div>
    <div className="mt-6 px-2 pb-2">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{producto.nombre}</h3>
        <span className="font-black text-pink-500 text-lg flex-shrink-0">${producto.precio.toLocaleString('es-CL')}</span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2 mb-6">{producto.descripcion}</p>
      <button onClick={() => onSelect(producto)} className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-pink-400 transition-all duration-300 transform active:scale-95 shadow-lg">Ver detalles <ArrowRight size={18} /></button>
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
  const [disenoSeleccionado, setDisenoSeleccionado] = useState(producto.disenos?.[0] || null);
  const [cargando, setCargando] = useState(false);
  const [errorPago, setErrorPago] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const fileInputRef = useRef(null);

  const esMayorista = producto.tieneMayorista && cantidad >= 10;
  
  const getPrecioUnitario = () => {
    if (esMayorista) return producto.precioMayorista;
    return producto.precio;
  };

  const precioUnitarioActual = getPrecioUnitario();
  const precioTotal = precioUnitarioActual * cantidad;
  const esPolera = producto.id === "prod_01" || producto.id === "prod_02";

  useEffect(() => {
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
      const orderData = {
        from_name: nombreCliente,
        customer_email: emailCliente,
        address: ubicacion,
        product: producto.nombre,
        quantity: cantidad,
        color: esPolera ? colorSeleccionado.nombre : 'N/A',
        size: esPolera ? tallaSeleccionada : 'N/A',
        custom_text: producto.esPersonalizable ? (texto || 'Sin texto') : `Diseño Estándar: ${disenoSeleccionado?.nombre || 'Ninguno'}`,
        has_image: producto.esPersonalizable ? (!!imageFile ? 'Sí' : 'No') : 'N/A',
        total_price: precioTotal.toLocaleString('es-CL'),
        is_wholesale: esMayorista ? 'SÍ' : 'NO'
      };
      
      const orderDetails = `Producto: ${orderData.product} | Cantidad: ${orderData.quantity} | Color: ${orderData.color} | Talla: ${orderData.size} | Personalización: ${orderData.custom_text} | Imagen: ${orderData.has_image}`;
      
      localStorage.setItem('pending_sparkup_order', JSON.stringify({ ...orderData, order_details: orderDetails }));

      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: producto.id,
          nombre: producto.nombre,
          precio: precioUnitarioActual,
          cantidad: cantidad,
          texto: orderData.custom_text,
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-20 px-4 sm:px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-10 font-black uppercase text-xs tracking-widest transition-colors">
        <ChevronLeft size={16} /> Regresar al catálogo
      </button>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 md:sticky top-24">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50"
               style={esPolera ? { backgroundColor: `${colorSeleccionado?.hex}15` } : {}}>
            <img src={(!producto.esPersonalizable && disenoSeleccionado) ? disenoSeleccionado.imagen : producto.imagen} className="w-full h-full object-cover" alt={producto.nombre} onError={handleImgError} />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <h1 className="text-4xl font-black text-slate-900 leading-tight italic">{producto.nombre}</h1>
               {!producto.esPersonalizable && (
                  <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest">Estándar</span>
               )}
            </div>
            <div className="flex items-center gap-4">
              <p className={`text-2xl font-bold ${esMayorista ? 'text-slate-300 line-through' : 'text-pink-500'}`}>
                ${producto.precio.toLocaleString('es-CL')} CLP
              </p>
              {esMayorista && (
                <p className="text-3xl font-black text-pink-500 animate-in zoom-in italic">
                   ${producto.precioMayorista.toLocaleString('es-CL')} CLP
                </p>
              )}
            </div>
            {producto.tieneMayorista && !esMayorista && (
               <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest italic">Ahorra comprando 10 unidades o más</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tu Nombre</label>
                <input type="text" placeholder="Nombre para el pedido" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email de Contacto</label>
                <input type="email" placeholder="tu@correo.com" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Dirección de Envío Completa</label>
                <input type="text" placeholder="Ciudad, Región, Calle y número" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
              </div>
            </div>

            {!producto.esPersonalizable && producto.disenos && (
               <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                     <ImageIcon size={14} className="text-pink-400" /> Selecciona un diseño
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                     {producto.disenos.map((diseno) => (
                        <div 
                           key={diseno.id} 
                           onClick={() => setDisenoSeleccionado(diseno)}
                           className={`cursor-pointer group relative rounded-2xl overflow-hidden border-4 transition-all ${disenoSeleccionado?.id === diseno.id ? 'border-pink-400 scale-[1.02] shadow-xl' : 'border-white hover:border-slate-100'}`}
                        >
                           <img src={diseno.imagen} alt={diseno.nombre} className="w-full aspect-square object-cover" onError={handleImgError} />
                           <div className={`absolute bottom-0 left-0 right-0 p-2 text-center text-[10px] font-black uppercase tracking-widest transition-colors ${disenoSeleccionado?.id === diseno.id ? 'bg-pink-400 text-white' : 'bg-white/90 text-slate-900 group-hover:bg-slate-100'}`}>
                              {diseno.nombre}
                           </div>
                           {disenoSeleccionado?.id === diseno.id && (
                              <div className="absolute top-2 right-2 bg-pink-400 text-white p-1 rounded-full">
                                 <Check size={12} strokeWidth={4} />
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {esPolera && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {producto.coloresDisponibles.map((color) => (
                      <button key={color.nombre} onClick={() => setColorSeleccionado(color)} className={`w-8 h-8 rounded-lg border-2 transition-all ${colorSeleccionado?.nombre === color.nombre ? 'border-pink-400 scale-110 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
                        <span className="w-full h-full rounded-sm block" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Talla</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {producto.tallasDisponibles.map((talla) => (
                      <button key={talla} onClick={() => setTallaSeleccionada(talla)} className={`py-3 rounded-xl border-2 font-black text-xs transition-all ${tallaSeleccionada === talla ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}>{talla}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {producto.esPersonalizable && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Texto Personalizado (Opcional)</label>
                  <input type="text" placeholder="Frase, fecha o nombre..." className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={texto} onChange={(e) => setTexto(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tu Diseño o Foto</label>
                  <div onClick={() => fileInputRef.current.click()} className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${imageFile ? 'border-green-400 bg-green-50' : 'border-slate-100 hover:bg-pink-50'}`}>
                    <input type="file" ref={fileInputRef} onChange={(e) => setImageFile(e.target.files[0])} className="hidden" accept="image/*" />
                    <div className="flex flex-col items-center gap-1">
                      {imageFile ? <CheckCircle2 size={20} className="text-green-500" /> : <Upload size={20} className="text-slate-300" />}
                      <p className="text-xs font-bold text-slate-400">{imageFile ? imageFile.name : "Subir archivo PNG/JPG"}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-8 shadow-xl relative overflow-hidden">
              {esMayorista && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest animate-pulse">
                   Modo Mayorista Activado
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-1">
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="p-2 hover:bg-white/20 rounded-lg"><Minus size={14} /></button>
                  <span className="font-black w-6 text-center text-lg">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="p-2 hover:bg-white/20 rounded-lg"><Plus size={14} /></button>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Total del pedido</p>
                   <p className="text-4xl font-black text-pink-400 italic">${precioTotal.toLocaleString('es-CL')}</p>
                </div>
              </div>

              {errorPago && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2">
                   <AlertCircle size={14} className="text-red-400" />
                   <p className="text-[10px] font-bold text-red-200 uppercase">{errorPago}</p>
                </div>
              )}

              <div id="wallet_container" className="min-h-[50px] overflow-hidden rounded-xl"></div>

              {!preferenceId && (
                <button onClick={handleCreatePreference} disabled={cargando} className="w-full py-5 rounded-2xl font-black text-lg bg-pink-400 hover:bg-pink-500 transition-all transform active:scale-95 shadow-xl shadow-pink-500/20">
                  {cargando ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : "Proceder al Pago"}
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
  const [emailStatus, setEmailStatus] = useState("Procesando pedido...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'approved') {
      const order = JSON.parse(localStorage.getItem('pending_sparkup_order'));
      if (order && window.emailjs && EMAILJS_PUBLIC_KEY) {
        setShowSuccessModal(true);
        window.emailjs.init(EMAILJS_PUBLIC_KEY);

        window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_name: "Admin SparkUp",
          from_name: order.from_name,
          customer_email: order.customer_email,
          address: order.address,
          order_details: order.order_details,
          total_price: order.total_price,
          is_wholesale: order.is_wholesale,
          reply_to: order.customer_email
        })
        .then(() => {
          setEmailStatus("¡Pedido enviado con éxito! Te contactaremos pronto.");
          localStorage.removeItem('pending_sparkup_order');
        })
        .catch((err) => {
          console.error(err);
          setEmailStatus("Error al enviar email. Nuestro equipo ya está al tanto.");
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
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black italic mb-2 uppercase">¡Pago Realizado!</h3>
            <p className="text-slate-500 font-bold text-xs mb-8">{emailStatus}</p>
            <button onClick={() => { setShowSuccessModal(false); window.location.href = "/"; }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Finalizar</button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        {vista === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-700">
            <header className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400"></span>
                </span>
                Imprenta y Diseño SparkUp
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] italic">Damos vida a tus <span className="text-pink-400">ideas</span></h2>
              <p className="text-xl text-slate-400 mt-6 leading-relaxed font-medium">Elige tu base favorita y crea algo único hoy mismo.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTOS.map(p => (
                <ProductCard key={p.id} producto={p} onSelect={(prod) => { setProductoSeleccionado(prod); setVista('personalizar'); window.scrollTo(0,0); }} />
              ))}
            </div>
          </div>
        )}
        {vista === 'nosotros' && <SobreNosotros />}
        {vista === 'personalizar' && <Customizer producto={productoSeleccionado} onBack={() => setVista('home')} />}
      </main>

      <footer className="bg-[#fbeeca] border-t border-amber-100 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black italic tracking-tighter uppercase">SparkUp</span>
          </div>
          <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">© 2026 SparkUp - Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}