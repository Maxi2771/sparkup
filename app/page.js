"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft, Upload, Type, CreditCard, CheckCircle2,
  ArrowRight, Plus, Minus, Star, Zap, ShieldCheck, Truck, X,
  Palette, Image as ImageIcon, Tag, User, Ruler, Instagram,
  Music2, MapPin, Globe, Check, AlertCircle, Mail, Shirt,
  Coffee, Puzzle, Baby
} from 'lucide-react';

// --- CONFIGURACIÓN DE VARIABLES DE ENTORNO ---
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800";

// --- DATOS DE PRODUCTOS ---
const PRODUCTOS = [
  {
    id: "prod_01",
    nombre: "Poleras para adultos",
    precio: 9990,
    precioMayorista: 7990,
    imagen: "/polera.png",
    descripcion: "Disponible en corte Hombre, Mujer y Oversize. Elige entre diseños estándar o personaliza la tuya.",
    tieneMayorista: true,
    esPolera: true,
    esPersonalizable: true,
    estilosDisponibles: ["Hombre", "Mujer", "Oversize"],
    tallasPorEstilo: {
      "Hombre": ["S (46x69)", "M (51x71)", "L (56x74)", "XL (61x76)", "2XL (66x78)"],
      "Mujer": ["S (43x62)", "M (47x64)", "L (51x56)", "XL (54x68)"],
      "Oversize": ["S (58x69)", "M (62x71)", "L (65x74)", "XL (68x76)", "2XL (72x78)"]
    },
    coloresPorEstilo: {
      "Hombre": [
        { nombre: "Negro", hex: "#000000", imagen: "/polera_ah/negro.png" },
        { nombre: "Blanco", hex: "#ffffff", imagen: "/polera_ah/blanco.png" },
        { nombre: "Gris Melange", hex: "#acafb8", imagen: "/polera_ah/gris_melange.png" },
        { nombre: "Rojo", hex: "#ff0000", imagen: "/polera_ah/rojo.png" },
        { nombre: "Azul Marino", hex: "#001a41", imagen: "/polera_ah/azul_marino.png" },
        { nombre: "Azul Rey", hex: "#0000ff", imagen: "/polera_ah/azul_rey.png" },
        { nombre: "Burdeo", hex: "#830029", imagen: "/polera_ah/burdeo.png" },
        { nombre: "Gris Oscuro (Charcoal)", hex: "#3b3b3b", imagen: "/polera_ah/gris_oscuro.png" },
        { nombre: "Amarillo Canario", hex: "#ffff00", imagen: "/polera_ah/amarillo.png" },
        { nombre: "Naranjo", hex: "#f39c11", imagen: "/polera_ah/naranjo.png" },
        { nombre: "Fucsia", hex: "#ff4578", imagen: "/polera_ah/fucsia.png" },
        { nombre: "Rosado", hex: "#fccacd", imagen: "/polera_ah/rosado.png" },
        { nombre: "Beige", hex: "#b4a07b", imagen: "/polera_ah/beige.png" },
        { nombre: "Calipso (Aqua)", hex: "#70e9ff", imagen: "/polera_ah/calipso.png" },
        { nombre: "Calipso Oscuro", hex: "#00a1d7", imagen: "/polera_ah/calipso_oscuro.png" },
        { nombre: "Verde", hex: "#005408", imagen: "/polera_ah/verde.png" },
        { nombre: "Celeste Oscuro", hex: "#5599ff", imagen: "/polera_ah/celeste_oscuro.png" },
        { nombre: "Morado", hex: "#550045", imagen: "/polera_ah/morado.png" },
        { nombre: "Café", hex: "#4c2b11", imagen: "/polera_ah/cafe.png" },
        { nombre: "Gris Grafito", hex: "#303235", imagen: "/polera_ah/gris_grafito.png" },
        { nombre: "Verde Menta", hex: "#58ffc2", imagen: "/polera_ah/verde_menta.png" },
        { nombre: "Verde Militar", hex: "#345400", imagen: "/polera_ah/verde_militar.png" },
        { nombre: "Cherry", hex: "#801100", imagen: "/polera_ah/cherry.png" },
        { nombre: "Azul Petroleo", hex: "#005080", imagen: "/polera_ah/azul_petroleo.png" },
        { nombre: "Turquesa", hex: "#00cbb3", imagen: "/polera_ah/turquesa.png" },
        { nombre: "Verde Limon", hex: "#7fd700", imagen: "/polera_ah/verde_limon.png" },
        { nombre: "Salmón", hex: "#d85c60", imagen: "/polera_ah/salmon.png" },
        { nombre: "Hueso", hex: "#f1ebdb", imagen: "/polera_ah/hueso.png" },
        { nombre: "Verde Botella", hex: "#1a2d21", imagen: "/polera_ah/verde_botella.png" },
        { nombre: "Gris Perla", hex: "#cac9cb", imagen: "/polera_ah/gris_perla.png" }
      ],
      "Mujer": [
        { nombre: "Negro", hex: "#000000", imagen: "/polera_am/negro.png" },
        { nombre: "Blanco", hex: "#ffffff", imagen: "/polera_am/blanco.png" },
        { nombre: "Gris Melange", hex: "#acafb8", imagen: "/polera_am/gris_melange.png" },
        { nombre: "Rojo", hex: "#ff0000", imagen: "/polera_am/rojo.png" },
        { nombre: "Azul Marino", hex: "#001a41", imagen: "/polera_am/azul_marino.png" },
        { nombre: "Azul Rey", hex: "#0000ff", imagen: "/polera_am/azul_rey.png" },
        { nombre: "Fucsia", hex: "#ff4578", imagen: "/polera_am/fucsia.png" },
        { nombre: "Rosado", hex: "#fccacd", imagen: "/polera_am/rosado.png" },
        { nombre: "Calipso (Aqua)", hex: "#70e9ff", imagen: "/polera_am/calipso.png" },
        { nombre: "Calipso Oscuro", hex: "#00a1d7", imagen: "/polera_am/calipso_oscuro.png" },
        { nombre: "Morado", hex: "#550045", imagen: "/polera_am/morado.png" },
        { nombre: "Verde Menta", hex: "#58ffc2", imagen: "/polera_am/verde_menta.png" },
        { nombre: "Turquesa", hex: "#00cbb3", imagen: "/polera_am/turquesa.png" },
        { nombre: "Salmón", hex: "#d85c60", imagen: "/polera_am/salmon.png" },
      ],
      "Oversize": [
        { nombre: "Negro", hex: "#000000", imagen: "/polera_o/negro.png" },
        { nombre: "Blanco", hex: "#ffffff", imagen: "/polera_o/blanco.png" },
        { nombre: "Gris Melange", hex: "#acafb8", imagen: "/polera_o/gris_melange.png" },
        { nombre: "Azul Marino", hex: "#001a41", imagen: "/polera_o/azul_marino.png" },
        { nombre: "Hueso", hex: "#f1ebdb", imagen: "/polera_o/hueso.png" },
        { nombre: "Cielo", hex: "#bfdff2", imagen: "/polera_o/cielo.png" },
      ]
    },
    disenosEstandar: [
      { id: "pe1", nombre: "Icarus", imagen: "/estandar/icarus.jpg" },
      { id: "pe2", nombre: "Spark of the world", imagen: "/estandar/sotw.jpg" },
      { id: "pe3", nombre: "Viña del mar", imagen: "/estandar/vdm.jpg" },
      { id: "pe4", nombre: "Out of everything", imagen: "/estandar/ooe.jpg" }
    ]
  },
  {
    id: "prod_02",
    nombre: "Poleras para niños",
    precio: 8000,
    precioMayorista: 6000,
    imagen: "/polera.png",
    descripcion: "Algodón premium para los más pequeños. Modelo unisex cómodo y duradero.",
    tieneMayorista: true,
    esPolera: true,
    esPersonalizable: true,
    estilosDisponibles: ["Unisex"],
    tallasPorEstilo: {
      "Unisex": ["S 2-4 (35x45)", "M 6-8 (38x49)", "L 10-12 (41x52)", "XL 14-16 (43-56)"]
    },
    coloresDisponibles: [
      { nombre: "Negro", hex: "#000000", imagen: "/polera_n/negro.png" },
      { nombre: "Blanco", hex: "#ffffff", imagen: "/polera_n/blanco.png" },
      { nombre: "Gris Melange", hex: "#acafb8", imagen: "/polera_n/gris_melange.png" },
      { nombre: "Rojo", hex: "#ff0000", imagen: "/polera_n/rojo.png" },
      { nombre: "Azul Marino", hex: "#001a41", imagen: "/polera_n/azul_marino.png" },
      { nombre: "Azul Rey", hex: "#0000ff", imagen: "/polera_n/azul_rey.png" },
      { nombre: "Amarillo Canario", hex: "#ffff00", imagen: "/polera_n/amarillo.png" },
      { nombre: "Naranjo", hex: "#f39c11", imagen: "/polera_n/naranjo.png" },
      { nombre: "Fucsia", hex: "#ff4578", imagen: "/polera_n/fucsia.png" },
      { nombre: "Rosado", hex: "#fccacd", imagen: "/polera_n/rosado.png" },
      { nombre: "Calipso (Aqua)", hex: "#70e9ff", imagen: "/polera_n/calipso.png" },
      { nombre: "Morado", hex: "#550045", imagen: "/polera_n/morado.png" },
      { nombre: "Verde Limon", hex: "#7fd700", imagen: "/polera_n/verde_limon.png" }
    ],
    disenosEstandar: [
      { id: "pk1", nombre: "Icarus", imagen: "/estandar/icarus.jpg" },
      { id: "pk2", nombre: "Spark of the world", imagen: "/estandar/sotw.jpg" },
      { id: "pk3", nombre: "Viña del mar", imagen: "/estandar/vdm.jpg" },
      { id: "pk4", nombre: "Out of everything", imagen: "/estandar/ooe.jpg" }
    ]
  },
  {
    id: "prod_03",
    nombre: "Tote Bags",
    precio: 5000,
    precioMayorista: 4000,
    esPersonalizable: true,
    tieneMayorista: true,
    imagen: "/totebag.jpg",
    descripcion: "Biodegradable, ligera, reutilizable. Perfecta para personalizar.",
    disenosEstandar: [
      { id: "tb1", nombre: "Aloha", imagen: "/estandar/aloha.jpeg" },
      { id: "tb2", nombre: "Summer Vacance Mood", imagen: "/estandar/summer.jpeg" },
      { id: "tb3", nombre: "Wimbledon", imagen: "/estandar/wimbledon.jpeg" },
      { id: "tb4", nombre: "Sol", imagen: "/estandar/sol.jpeg" }
    ]
  },
  {
    id: "prod_04",
    nombre: "Vasos",
    precio: 8000,
    esPersonalizable: true,
    imagen: "/vasos.jpg",
    descripcion: "Mantén tu bebida a la temperatura ideal con estilo propio.",
    disenosEstandar: [
      { id: "v1", nombre: "Monstera", imagen: "/estandar/monstera.png" },
      { id: "v2", nombre: "Dog Mom", imagen: "/estandar/dogmom.png" },
      { id: "v3", nombre: "Books and Coffee", imagen: "/estandar/bac.png" }
    ]
  },
  {
    id: "prod_05",
    nombre: "Puzzles",
    precio: 4000,
    esPersonalizable: true,
    imagen: "/rompe.jpg",
    descripcion: "Tus momentos favoritos o diseños artísticos para armar. Totalmente personalizable.",
    // Eliminada la opción estándar de Puzzles
    disenosEstandar: []
  }
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

    <section className="space-y-12 bg-white/50 py-16 rounded-[3rem] border border-slate-100">
      <div className="text-center space-y-4 max-w-2xl mx-auto px-6">
        <h3 className="text-3xl font-black italic uppercase tracking-tighter">Únete a nuestra comunidad</h3>
        <p className="text-slate-400 font-bold text-sm tracking-wide">Síguenos para ver nuestros últimos trabajos, promociones y el día a día en el taller.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">
        <a href="https://www.instagram.com/sparkup_cl/?__pwa=1" target="_blank" rel="noopener noreferrer" className="group relative bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-6 overflow-hidden border border-slate-50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-purple-600/10 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-4 rounded-2xl text-white shadow-xl group-hover:rotate-6 transition-transform"><Instagram size={32} /></div>
          <div className="relative"><h4 className="text-xl font-black">Instagram</h4><p className="text-slate-400 font-bold text-sm">@sparkup_cl</p></div>
          <ArrowRight className="ml-auto text-slate-200 group-hover:text-pink-400 transition-colors" />
        </a>
        <a href="https://www.tiktok.com/@sparkup_cl" target="_blank" rel="noopener noreferrer" className="group relative bg-white p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-6 overflow-hidden border border-slate-50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />
          <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-xl group-hover:-rotate-6 transition-transform"><Music2 size={32} /></div>
          <div className="relative"><h4 className="text-xl font-black">TikTok</h4><p className="text-slate-400 font-bold text-sm">@sparkup_cl</p></div>
          <ArrowRight className="ml-auto text-slate-200 group-hover:text-pink-400 transition-colors" />
        </a>
      </div>
    </section>
  </div>
);

const ProductCard = ({ producto, onSelect }) => (
  <div className="group bg-[#FEFAEF] rounded-[2.5rem] p-4 border border-slate-100 hover:border-pink-200 hover:shadow-2xl transition-all duration-500 w-full overflow-hidden">
    <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={handleImgError} />
      {producto.tieneMayorista && (
        <div className="absolute top-4 right-4 bg-pink-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">VENTA MAYORISTA</div>
      )}
    </div>
    <div className="mt-6 px-2 pb-2">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{producto.nombre}</h3>
        <span className="font-black text-pink-500 text-lg flex-shrink-0">${producto.precio.toLocaleString('es-CL')}</span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2 mb-6">{producto.descripcion}</p>
      <button onClick={() => onSelect(producto)} className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-pink-400 transition-all shadow-lg">Configurar <ArrowRight size={18} /></button>
    </div>
  </div>
);

const Customizer = ({ producto, onBack }) => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [texto, setTexto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const tieneDisenosEstandar = producto.disenosEstandar && producto.disenosEstandar.length > 0;

  // Estilo actual (Hombre/Mujer/Oversize/Unisex)
  const [estiloSeleccionado, setEstiloSeleccionado] = useState(producto.estilosDisponibles ? producto.estilosDisponibles[0] : null);
  const [modoPersonalizacion, setModoPersonalizacion] = useState(tieneDisenosEstandar ? "estandar" : "personalizada");
  const [disenoSeleccionado, setDisenoSeleccionado] = useState(null);

  // Colores dinámicos
  const getColoresActuales = () => {
    if (producto.coloresPorEstilo && estiloSeleccionado) {
      return producto.coloresPorEstilo[estiloSeleccionado];
    }
    return producto.coloresDisponibles || [];
  };

  const [colorSeleccionado, setColorSeleccionado] = useState(getColoresActuales()[0] || null);

  // Tallas dinámicas
  const getTallasActuales = () => {
    if (producto.esPolera && estiloSeleccionado) return producto.tallasPorEstilo[estiloSeleccionado];
    if (producto.tallasDisponibles) return producto.tallasDisponibles;
    return [];
  };

  const [tallaSeleccionada, setTallaSeleccionada] = useState(getTallasActuales()[0] || null);

  useEffect(() => {
    const nuevosColores = getColoresActuales();
    const nuevasTallas = getTallasActuales();
    setColorSeleccionado(nuevosColores[0] || null);
    setTallaSeleccionada(nuevasTallas[0] || null);
  }, [estiloSeleccionado, producto]);

  const [cargando, setCargando] = useState(false);
  const [errorPago, setErrorPago] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const fileInputRef = useRef(null);

  const esMayorista = producto.tieneMayorista && cantidad >= 10;
  const getPrecioUnitario = () => esMayorista ? producto.precioMayorista : producto.precio;
  const precioTotal = getPrecioUnitario() * cantidad;

  const mostrarPersonalizacion = modoPersonalizacion === "personalizada";
  const mostrarGaleriaDisenos = modoPersonalizacion === "estandar" && tieneDisenosEstandar;
  const listaDisenos = producto.disenosEstandar;

  const ocultarSelectorColor = modoPersonalizacion === "estandar";
  const esRopa = producto.esPolera;

  const getPreviewImage = () => {
    if (!mostrarPersonalizacion && disenoSeleccionado) return disenoSeleccionado.imagen;
    if (mostrarPersonalizacion && colorSeleccionado?.imagen) return colorSeleccionado.imagen;
    return producto.imagen;
  };

  const handleCreatePreference = async () => {
    if (!nombreCliente.trim() || !ubicacion.trim() || !emailCliente.trim()) {
      setErrorPago("Faltan datos de contacto.");
      return;
    }
    setCargando(true);
    setErrorPago(null);

    try {
      const personalizacionStr = mostrarPersonalizacion
        ? `Personalizada: ${texto || 'Sin texto'} | Imagen: ${imageFile ? 'Sí' : 'No'}`
        : `Diseño Estándar: ${disenoSeleccionado?.nombre || 'No seleccionado'}`;

      const orderData = {
        from_name: nombreCliente,
        customer_email: emailCliente,
        address: ubicacion,
        product: `${producto.nombre} ${estiloSeleccionado ? `(${estiloSeleccionado})` : ''}`,
        quantity: cantidad,
        color: (ocultarSelectorColor || !getColoresActuales().length) ? 'Definido por Diseño' : (colorSeleccionado?.nombre || 'N/A'),
        size: tallaSeleccionada || 'N/A',
        order_details: personalizacionStr,
        total_price: precioTotal.toLocaleString('es-CL'),
        is_wholesale: esMayorista ? 'SÍ' : 'NO'
      };

      localStorage.setItem('pending_sparkup_order', JSON.stringify(orderData));

      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.id) {
        setPreferenceId(data.id);
        const mp = new window.MercadoPago(MP_PUBLIC_KEY, { locale: 'es-CL' });
        mp.bricks().create("wallet", "wallet_container", { initialization: { preferenceId: data.id } });
      }
    } catch (error) {
      setErrorPago("Error al conectar con la pasarela.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-20 px-4 sm:px-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-10 font-black uppercase text-xs tracking-widest transition-colors">
        <ChevronLeft size={16} /> Volver al inicio
      </button>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LADO IZQUIERDO: PREVIEW DINÁMICA MEJORADA - SIN FONDO NI MARCA */}
        <div className={`p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 md:sticky top-24 overflow-hidden transition-colors ${esRopa ? 'bg-white' : 'bg-[#f9f9f9]'}`}>
          <div className="relative aspect-square rounded-[2rem] overflow-hidden flex items-center justify-center">
            <img
              src={getPreviewImage()}
              className="max-w-[90%] max-h-[90%] object-contain transition-all duration-700 ease-out"
              alt={producto.nombre}
              onError={handleImgError}
            />
            {/* Overlay sutil para dar profundidad solo a prendas */}
            {esRopa && <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/[0.02]" />}
          </div>
        </div>

        {/* LADO DERECHO: OPCIONES */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 italic mb-2">{producto.nombre}</h1>
            <div className="flex items-center gap-4">
              <p className={`text-2xl font-bold ${esMayorista ? 'text-slate-300 line-through' : 'text-pink-500'}`}>${producto.precio.toLocaleString('es-CL')}</p>
              {esMayorista && <p className="text-3xl font-black text-pink-500 italic animate-in zoom-in">${producto.precioMayorista.toLocaleString('es-CL')}</p>}
            </div>
          </div>

          <div className="space-y-6">
            {/* Se añade lógica para que la casilla de opciones solo aparezca si hay algo que configurar (estilos o catálogo) */}
            {producto.esPersonalizable && (producto.estilosDisponibles || tieneDisenosEstandar) && (
              <div className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                {producto.estilosDisponibles && (
                  <div className="space-y-3 pb-4 border-b border-slate-200">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <User size={12} /> Selecciona el Estilo
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {producto.estilosDisponibles.map(e => (
                        <button key={e} onClick={() => setEstiloSeleccionado(e)} className={`px-6 py-3 rounded-xl border-2 font-black text-xs transition-all ${estiloSeleccionado === e ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>{e}</button>
                      ))}
                    </div>
                  </div>
                )}
                
                {tieneDisenosEstandar && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Tag size={12} /> Personalización</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setModoPersonalizacion("personalizada")} className={`py-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${modoPersonalizacion === "personalizada" ? 'border-pink-400 bg-pink-50 shadow-inner shadow-pink-100/50' : 'border-slate-100 bg-white'}`}>
                        <ImageIcon size={20} className={modoPersonalizacion === "personalizada" ? "text-pink-500" : "text-slate-300"} />
                        <span className={`text-[10px] font-black uppercase ${modoPersonalizacion === "personalizada" ? "text-pink-500" : "text-slate-400"}`}>A mi gusto</span>
                      </button>
                      <button onClick={() => setModoPersonalizacion("estandar")} className={`py-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${modoPersonalizacion === "estandar" ? 'border-pink-400 bg-pink-50 shadow-inner shadow-pink-100/50' : 'border-slate-100 bg-white'}`}>
                        <Palette size={20} className={modoPersonalizacion === "estandar" ? "text-pink-500" : "text-slate-300"} />
                        <span className={`text-[10px] font-black uppercase ${modoPersonalizacion === "estandar" ? "text-pink-500" : "text-slate-400"}`}>Del Catálogo</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-4">
              <input type="text" placeholder="Tu Nombre Completo" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} />
              <input type="email" placeholder="Email de contacto" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
              <input type="text" placeholder="Dirección de envío completa" className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {!ocultarSelectorColor && getColoresActuales().length > 0 && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex justify-between">
                    Color de base
                    {producto.esPolera && <span className="text-pink-400 font-black italic">{estiloSeleccionado}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {getColoresActuales().map(c => (
                      <button key={c.nombre} onClick={() => setColorSeleccionado(c)} className={`w-8 h-8 rounded-lg border-2 ${colorSeleccionado?.nombre === c.nombre ? 'border-pink-400 scale-110 shadow-md' : 'border-slate-100'}`} style={{ backgroundColor: c.hex }} title={c.nombre} />
                    ))}
                  </div>
                </div>
              )}

              {esRopa && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex justify-between">
                     Talla Disponible
                     {producto.esPolera && <span className="text-pink-400 font-black italic">{estiloSeleccionado}</span>}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {getTallasActuales().map(t => (
                      <button key={t} onClick={() => setTallaSeleccionada(t)} className={`py-2 rounded-lg border-2 font-black text-[11px] ${tallaSeleccionada === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-400'}`}>{t}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mostrarGaleriaDisenos && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><ImageIcon size={14} /> Elige un diseño del catálogo</label>
                <div className="grid grid-cols-2 gap-4">
                  {listaDisenos?.map(d => (
                    <div key={d.id} onClick={() => setDisenoSeleccionado(d)} className={`cursor-pointer group relative rounded-2xl overflow-hidden border-4 transition-all ${disenoSeleccionado?.id === d.id ? 'border-pink-400 shadow-xl' : 'border-white'}`}>
                      <img src={d.imagen} className="w-full aspect-square object-cover" onError={handleImgError} />
                      <div className={`p-2 text-center text-[10px] font-black uppercase ${disenoSeleccionado?.id === d.id ? 'bg-pink-400 text-white' : 'bg-white text-slate-900'}`}>{d.nombre}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mostrarPersonalizacion && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Texto a incluir</label>
                  <input type="text" placeholder="Frase, nombre, fecha..." className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-pink-400 font-bold" value={texto} onChange={(e) => setTexto(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sube tu archivo</label>
                  <div onClick={() => fileInputRef.current.click()} className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${imageFile ? 'border-green-400 bg-green-50' : 'border-slate-100 hover:bg-pink-50'}`}>
                    <input type="file" ref={fileInputRef} onChange={(e) => setImageFile(e.target.files[0])} className="hidden" accept="image/*" />
                    <p className="text-xs font-bold text-slate-400">{imageFile ? imageFile.name : "Subir archivo PNG/JPG"}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-8 relative overflow-hidden">
              {esMayorista && <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest animate-pulse">Venta Mayorista</div>}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-1">
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="p-2 hover:bg-white/20 rounded-lg"><Minus size={14} /></button>
                  <span className="font-black w-6 text-center text-lg">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="p-2 hover:bg-white/20 rounded-lg"><Plus size={14} /></button>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Total a pagar</p>
                  <p className="text-4xl font-black text-pink-400 italic">${precioTotal.toLocaleString('es-CL')}</p>
                </div>
              </div>
              {errorPago && <p className="text-red-400 text-[10px] font-bold uppercase">{errorPago}</p>}
              <div id="wallet_container" className="min-h-[50px] rounded-xl overflow-hidden"></div>
              {!preferenceId && (
                <button onClick={handleCreatePreference} disabled={cargando} className="w-full py-5 rounded-2xl font-black text-lg bg-pink-400 hover:bg-pink-500 transition-all shadow-xl shadow-pink-500/20">
                  {cargando ? "Cargando..." : "Proceder al Pago"}
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
          is_wholesale: order.is_wholesale
        }).then(() => localStorage.removeItem('pending_sparkup_order'));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFAEF] font-sans text-slate-900 selection:bg-pink-100">
      <Navbar onNavigate={setVista} vistaActiva={vista} />
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] p-10 max-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
            <h3 className="text-2xl font-black italic mb-2 uppercase">¡Pago Exitoso!</h3>
            <p className="text-slate-500 font-bold text-xs mb-8">Te enviaremos un correo con la confirmación y detalles del envío.</p>
            <button onClick={() => { setShowSuccessModal(false); window.location.href = "/"; }} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Cerrar</button>
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        {vista === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-700">
            <header className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Diseño SparkUp</div>
              <h2 className="text-5xl md:text-7xl font-black leading-[1.1] italic">Damos vida a tus <span className="text-pink-400">ideas</span></h2>
              <p className="text-xl text-slate-400 mt-6 leading-relaxed font-medium">Personaliza cada detalle de tus productos favoritos hoy mismo.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTOS.map(p => <ProductCard key={p.id} producto={p} onSelect={(prod) => { setProductoSeleccionado(prod); setVista('personalizar'); window.scrollTo(0, 0); }} />)}
            </div>
          </div>
        )}
        {vista === 'nosotros' && <SobreNosotros />}
        {vista === 'personalizar' && <Customizer producto={productoSeleccionado} onBack={() => setVista('home')} />}
      </main>
      <footer className="bg-[#fbeeca] py-16 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest border-t border-amber-100">© 2026 SparkUp - Tu idea, nuestro motor.</footer>
    </div>
  );
}