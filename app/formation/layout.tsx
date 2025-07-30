import '../../styles/formation.css';
import FormationHeader from './components/FormationHeader';

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="formation-layout min-h-screen">
      <FormationHeader />
      {children}
    </div>
  );
}