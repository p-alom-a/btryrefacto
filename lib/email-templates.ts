// Templates d'email pour les différents formulaires

interface ContactFormationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  formation: string;
  message: string;
}

interface ContactHomepageData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  etreRappele: boolean;
}

export function createFormationEmailTemplate(data: ContactFormationData): string {
  const { firstName, lastName, email, phone, company, formation, message } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Nouvelle demande de contact btry formation</h1>
      </div>
      
      <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
        <div style="margin-bottom: 20px;">
          <h2 style="color: #1e3a8a; margin-bottom: 15px; font-size: 18px;">Informations du contact</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div>
              <strong style="color: #374151;">Prénom :</strong><br>
              <span style="color: #6b7280;">${firstName}</span>
            </div>
            <div>
              <strong style="color: #374151;">Nom :</strong><br>
              <span style="color: #6b7280;">${lastName}</span>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div>
              <strong style="color: #374151;">Email :</strong><br>
              <a href="mailto:${email}" style="color: #1e3a8a; text-decoration: none;">${email}</a>
            </div>
            <div>
              <strong style="color: #374151;">Téléphone :</strong><br>
              <span style="color: #6b7280;">${phone || 'Non renseigné'}</span>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151;">Entreprise / Statut :</strong><br>
            <span style="color: #6b7280;">${company || 'Non renseigné'}</span>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151;">Formation d'intérêt :</strong><br>
            <span style="color: #6b7280; background-color: #ddd6fe; padding: 4px 8px; border-radius: 4px; display: inline-block;">${formation || 'Non renseigné'}</span>
          </div>
        </div>
        
        <div>
          <h2 style="color: #1e3a8a; margin-bottom: 15px; font-size: 18px;">Message</h2>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #1e3a8a;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">Cette demande a été envoyée depuis le formulaire de contact du site btry formation.</p>
        </div>
      </div>
    </div>
  `;
}

export function createHomepageEmailTemplate(data: ContactHomepageData): string {
  const { name, companyName, email, phone, service, message, etreRappele } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #002768; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Nouvelle demande de contact btry solution</h1>
      </div>
      
      <div style="background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
        <div style="margin-bottom: 20px;">
          <h2 style="color: #002768; margin-bottom: 15px; font-size: 18px;">Informations du contact</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div>
              <strong style="color: #374151;">Nom et prénom :</strong><br>
              <span style="color: #6b7280;">${name}</span>
            </div>
            <div>
              <strong style="color: #374151;">Entreprise :</strong><br>
              <span style="color: #6b7280;">${companyName || 'Non renseigné'}</span>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div>
              <strong style="color: #374151;">Email :</strong><br>
              <a href="mailto:${email}" style="color: #002768; text-decoration: none;">${email}</a>
            </div>
            <div>
              <strong style="color: #374151;">Téléphone :</strong><br>
              <a href="tel:${phone}" style="color: #002768; text-decoration: none;">${phone}</a>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151;">Service souhaité :</strong><br>
            <span style="color: #6b7280; background-color: #dbeafe; padding: 4px 8px; border-radius: 4px; display: inline-block;">${service}</span>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151;">Préférence de contact :</strong><br>
            <span style="color: #6b7280; background-color: ${etreRappele ? '#dcfce7' : '#fee2e2'}; padding: 4px 8px; border-radius: 4px; display: inline-block;">
              ${etreRappele ? '📞 Souhaite être rappelé(e) par téléphone' : '📧 Contact par email uniquement'}
            </span>
          </div>
        </div>
        
        ${message ? `
        <div>
          <h2 style="color: #002768; margin-bottom: 15px; font-size: 18px;">Message</h2>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #002768;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">Cette demande a été envoyée depuis le formulaire de contact du site btry solution.</p>
        </div>
      </div>
    </div>
  `;
}