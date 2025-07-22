import { Button } from '@/components/ui/button';
import { StepStatus } from '@/types/project';

interface StatusFilterProps {
  activeFilter: StepStatus | 'all';
  onFilterChange: (filter: StepStatus | 'all') => void;
}

export function StatusFilter({ activeFilter, onFilterChange }: StatusFilterProps) {
  const filters = [
    { value: 'all', label: 'Todas', count: 12 },
    { value: 'a_fazer', label: 'A Fazer' },
    { value: 'em_andamento', label: 'Em Andamento' },
    { value: 'concluido', label: 'Concluído' },
  ] as const;

  return (
    <div className="flex items-center gap-2 p-4 bg-secondary/30 rounded-lg">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Filtrar por:
      </span>
      
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className="text-xs truncate max-w-[100px]" // Adicione estilos para truncar o texto
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}