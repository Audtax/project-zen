import { Progress } from '@/components/ui/progress';
import { ProjectStep } from '@/types/project';

interface ProjectProgressProps {
  steps: ProjectStep[];
  projectName: string;
}

export function ProjectProgress({ steps, projectName }: ProjectProgressProps) {
  const completedSteps = steps.filter(step => step.status === 'concluido').length;
  const inProgressSteps = steps.filter(step => step.status === 'em_andamento').length;
  const todoSteps = steps.filter(step => step.status === 'a_fazer').length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            {projectName}
          </h2>
          <p className="text-sm text-muted-foreground">
            Progresso do projeto
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progresso geral</span>
            <span className="text-muted-foreground">
              {completedSteps}/{totalSteps} etapas
            </span>
          </div>
          
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="text-center">
            <span className="text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-todo">
              {todoSteps}
            </div>
            <div className="text-xs text-muted-foreground">
              A Fazer
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {inProgressSteps}
            </div>
            <div className="text-xs text-muted-foreground">
              Em Andamento
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {completedSteps}
            </div>
            <div className="text-xs text-muted-foreground">
              Concluído
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}