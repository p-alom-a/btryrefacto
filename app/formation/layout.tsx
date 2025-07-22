import './formation.css';

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="formation-layout">
      {/* Ici tu pourras ajouter ta navbar formation commune */}
      {children}
    </div>
  );
}