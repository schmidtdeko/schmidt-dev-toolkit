import { NavLink } from 'react-router-dom';
import { X, HomeIcon, LayoutGrid, Info } from 'lucide-react'; // Adicionar HomeIcon, LayoutGrid e Info
import { cn } from '@/lib/utils';
import { toolsConfig } from '@/config/tools'; // Importar a configuração centralizada

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Agrupar as ferramentas por categoria
const getToolsByCategory = () => {
  const categories: { [key: string]: typeof toolsConfig[0][] } = {};
  toolsConfig.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  return categories;
};

const categorizedTools = getToolsByCategory();

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
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "sidebar-link",
                    isActive && "sidebar-link-active"
                  )
                }
              >
                <HomeIcon className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Início</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tools"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "sidebar-link",
                    isActive && "sidebar-link-active"
                  )
                }
              >
                <LayoutGrid className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Ferramentas</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "sidebar-link",
                    isActive && "sidebar-link-active"
                  )
                }
              >
                <Info className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Sobre</span>
              </NavLink>
            </li>
          </ul>

          {Object.entries(categorizedTools).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => (
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
