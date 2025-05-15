import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const materialReceipt = await prisma.materialReceipt.create({
      data: {
        ...data,
        date: new Date(data.date)
      }
    });

    return NextResponse.json({ success: true, data: materialReceipt });
  } catch (error) {
    console.error('Error creating material receipt:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create material receipt' },
      { status: 500 }
    );
  }
} 