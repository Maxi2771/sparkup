import { MercadoPagoConfig, Preference } from 'mercadopago';

const token = process.env.MP_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ 
  accessToken: token || '' 
});

export async function POST(request) {
  try {
    if (!token) {
      throw new Error("MP_ACCESS_TOKEN no configurado");
    }

    const body = await request.json();
    const preference = new Preference(client);

    // Ajustamos la URL base
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    baseUrl = baseUrl.replace(/\/$/, "");

    const preferenceData = {
      body: {
        items: [
          {
            id: String(body.id || 'item-custom'),
            title: String(body.nombre),
            quantity: Number(body.cantidad),
            unit_price: Number(body.precio),
            currency_id: 'CLP', // RECUERDA: Si tu token es de Argentina, cambia esto a 'ARS' para probar
          }
        ],
        back_urls: {
          success: `${baseUrl}/`,
          failure: `${baseUrl}/`,
          pending: `${baseUrl}/`,
        },
        // Eliminamos auto_return para usar el Brick de Wallet, es más estable en local
      }
    };

    const response = await preference.create(preferenceData);

    // Retornamos el ID de la preferencia
    return new Response(JSON.stringify({ 
      id: response.id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("DETALLE DEL ERROR:", error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), { status: 500 });
  }
}