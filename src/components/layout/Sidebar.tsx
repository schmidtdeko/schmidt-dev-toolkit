import { NavLink } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  Code, 
  Calculator, 
  Type,
  CreditCard,
  KeyRound,
  Hash,
  X,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  {
    category: '📊 VISÃO GERAL',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    category: '📝 GERADORES',
    items: [
      { name: 'CPF', path: '/cpf-generator', icon: FileText },
      { name: 'CNPJ', path: '/cnpj-generator', icon: FileText },
      { name: 'Placas de Veículo', path: '/plate-generator', icon: CreditCard },
      { name: 'Senhas Fortes', path: '/password-generator', icon: KeyRound },
      { name: 'UUID/GUID', path: '/uuid-generator', icon: Hash },
    ]
  },
  {
    category: '✔️ VALIDADORES',
    items: [
      { name: 'CPF/CNPJ', path: '/validator', icon: CheckCircle2 },
    ]
  },
  {
    category: '🔄 CONVERSORES',
    items: [
      { name: 'JSON ↔ CSV', path: '/json-csv-converter', icon: RefreshCw },
    ]
  },
  {
    category: '🎨 FORMATADORES',
    items: [
      { name: 'JSON', path: '/json-formatter', icon: Code },
      { name: 'XML', path: '/xml-formatter', icon: Code },
    ]
  },
  {
    category: '🧮 CALCULADORAS',
    items: [
      { name: 'Hash (MD5/SHA)', path: '/hash-calculator', icon: Calculator },
      { name: 'Percentual', path: '/percentage-calculator', icon: Calculator },
    ]
  },
  {
    category: '✍️ TEXTO',
    items: [
      { name: 'Contador de Caracteres', path: '/char-counter', icon: Type },
    ]
  }
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar-background border-r border-sidebar-border transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden border-b border-sidebar-border">
          <span className="font-semibold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-6 pt-20 md:pt-4">
          {tools.map((section) => (
            <div key={section.category}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                {section.category}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "sidebar-link",
                          isActive && "sidebar-link-active"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
