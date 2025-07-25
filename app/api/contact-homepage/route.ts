import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
import { createHomepageEmailTemplate } from '@/lib/email-templates';

interface HomepageContactData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: HomepageContactData = await request.json();
    
    const { name, email, phone, service } = body;

    // Validation des champs requis
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Les champs nom, email, téléphone et service sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Génération du template HTML
    const emailHtml = createHomepageEmailTemplate(body);

    // Envoi de l'email via Resend
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [EMAIL_CONFIG.to],
      subject: `Nouvelle demande de contact btry solution - ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Demande de rappel envoyée avec succès', data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}