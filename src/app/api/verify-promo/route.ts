import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { promoCode } = await request.json();

    // Get the valid promo code from environment variable
    const validPromoCode = process.env.PROMO_CODE || process.env.NEXT_PUBLIC_PROMO_CODE;

    if (!validPromoCode) {
      return NextResponse.json(
        { error: 'Promo code not configured' },
        { status: 500 }
      );
    }

    // Case-insensitive comparison
    const isValid = promoCode?.trim().toUpperCase() === validPromoCode.trim().toUpperCase();

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