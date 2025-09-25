exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { promoCode } = JSON.parse(event.body);

    // Get the valid promo code from environment variable
    const validPromoCode = process.env.PROMO_CODE || process.env.NEXT_PUBLIC_PROMO_CODE;

    if (!validPromoCode) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Promo code not configured' })
      };
    }

    // Case-insensitive comparison
    const isValid = promoCode?.trim().toUpperCase() === validPromoCode.trim().toUpperCase();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valid: isValid
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};