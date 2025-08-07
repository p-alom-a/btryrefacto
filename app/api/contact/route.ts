import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_CONFIG } from '@/lib/resend';
import { createFormationEmailTemplate } from '@/lib/email-templates';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  formation: string;
  message: string;
  etreRappele: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    const { firstName, lastName, email, phone, company, formation, message } = body;

    // Validation basique
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs prénom, nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Génération du template HTML
    const emailHtml = createFormationEmailTemplate(body);

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [EMAIL_CONFIG.to],
      subject: `Nouvelle demande de contact btry formation - ${firstName} ${lastName}`,
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
      { message: 'Email envoyé avec succès', data },
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