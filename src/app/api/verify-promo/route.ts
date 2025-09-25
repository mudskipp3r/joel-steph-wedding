import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { promoCode } = await request.json();

    // Get the valid promo code from environment variable
    const validPromoCode = process.env.PROMO_CODE;

    if (!validPromoCode) {
      return NextResponse.json(
        { error: 'Promo code not configured' },
        { status: 500 }
      );
    }

    // Case-insensitive comparison
    const isValid = promoCode?.trim().toUpperCase() === validPromoCode.trim().toUpperCase();

    // Temporary debug logging
    console.log('Debug promo validation:', {
      entered: `'${promoCode?.trim().toUpperCase()}'`,
      expected: `'${validPromoCode.trim().toUpperCase()}'`,
      match: isValid,
      enteredLength: promoCode?.trim().length,
      expectedLength: validPromoCode.trim().length
    });

    return NextResponse.json({
      valid: isValid
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}