import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { promoCode } = await request.json();

    // Get the valid promo code from environment variable
    const validPromoCode = process.env.PROMO_CODE;

    console.log('API Route Debug:', {
      receivedPromoCode: promoCode,
      validPromoCode,
      allEnvVars: Object.keys(process.env).filter(key => key.includes('PROMO'))
    });

    if (!validPromoCode) {
      console.log('No valid promo code found in environment');
      return NextResponse.json(
        { error: 'Promo code not configured' },
        { status: 500 }
      );
    }

    // Case-insensitive comparison
    const isValid = promoCode?.trim().toUpperCase() === validPromoCode.trim().toUpperCase();

    console.log('Validation result:', { isValid });

    return NextResponse.json({
      valid: isValid
    });
  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}