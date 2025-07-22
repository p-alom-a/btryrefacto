import './formation.css';

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/images/fav.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}