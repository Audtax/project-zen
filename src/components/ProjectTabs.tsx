import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';

interface ProjectTabsProps {
  projects: Project[];
  activeProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectCreate: () => void;
  onProjectRemove: (projectId: string) => void;
}

export function ProjectTabs({ 
  projects, 
  activeProjectId, 
  onProjectSelect, 
  onProjectCreate,
  onProjectRemove 
}: ProjectTabsProps) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-1 p-4 overflow-x-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`
              group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer
              transition-all duration-200 whitespace-nowrap
              ${activeProjectId === project.id 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
              }
            `}
            onClick={() => onProjectSelect(project.id)}
          >
            <span className="truncate max-w-32">{project.nome_projeto}</span>
            {projects.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className={`
                  h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity
                  ${activeProjectId === project.id ? 'hover:bg-primary-foreground/20' : 'hover:bg-secondary'}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectRemove(project.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onProjectCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>
      </div>
    </div>
  );
}