import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export async function POST(request) {
  try {
    const body = await request.json();

    // --- 1. DETECCIÓN DE URL ---
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      const host = request.headers.get('host'); 
      const protocol = request.headers.get('x-forwarded-proto') || 'http';
      
      if (host) {
        baseUrl = `${protocol}://${host}`;
      } else {
        baseUrl = "http://localhost:3000";
      }
    }

    // --- 2. FORMATEO CORRECTO (CRÍTICO PARA QUE APAREZCA EL BOTÓN) ---
    baseUrl = baseUrl.replace(/\/$/, "");

    if (baseUrl.includes('localhost')) {
        baseUrl = baseUrl.replace('localhost', '127.0.0.1');
    }

    const successUrl = `${baseUrl}/?status=success`;
    const failureUrl = `${baseUrl}/?status=failure`;
    const pendingUrl = `${baseUrl}/?status=pending`;

    const preferenceBody = {
      items: [
        {
          id: String(body.id || 'item-generico'),
          title: String(body.nombre),
          quantity: Number(body.cantidad),
          unit_price: Number(body.precio),
          currency_id: 'CLP',
        }
      ],
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },

      external_reference: `sparkup-${Date.now()}`,
    };

    // Activamos auto_return SOLO si es producción (HTTPS)
    if (baseUrl.includes('https://')) {
        preferenceBody.auto_return = "approved";
    }

    // Info del pagador
    if (body.email && body.from_name) {
      preferenceBody.payer = {
        email: body.email,
        name: body.from_name
      };
    }

    console.log("📦 URLs de retorno configuradas:", preferenceBody.back_urls);

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceBody });

    return new Response(JSON.stringify({ id: result.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}