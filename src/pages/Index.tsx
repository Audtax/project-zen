import { useState } from 'react';
import { ProjectTabs } from '@/components/ProjectTabs';
import { StepCard } from '@/components/StepCard';
import { ProjectProgress } from '@/components/ProjectProgress';
import { StatusFilter } from '@/components/StatusFilter';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { useProjects } from '@/hooks/useProjects';
import { StepStatus } from '@/types/project';

const Index = () => {
  const {
    projects,
    activeProject,
    activeProjectId,
    setActiveProjectId,
    addProject,
    removeProject,
    updateStepStatus,
    updateStepLink,
  } = useProjects();

  const [statusFilter, setStatusFilter] = useState<StepStatus | 'all'>('all');

  const filteredSteps = activeProject?.steps.filter(step => 
    statusFilter === 'all' || step.status === statusFilter
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                ProjectFlow
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie seus projetos com metodologia estruturada
              </p>
            </div>
            
            <CreateProjectDialog onCreateProject={addProject} />
          </div>
        </div>
      </header>

      {/* Project Tabs */}
      <ProjectTabs
        projects={projects}
        activeProjectId={activeProjectId}
        onProjectSelect={setActiveProjectId}
        onProjectCreate={() => addProject(`Projeto ${projects.length + 1}`)}
        onProjectRemove={removeProject}
      />

      {/* Main Content */}
      {activeProject && (
        <main className="container max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <ProjectProgress
                  steps={activeProject.steps}
                  projectName={activeProject.nome_projeto}
                />
                
                <StatusFilter
                  activeFilter={statusFilter}
                  onFilterChange={setStatusFilter}
                />
              </div>
            </div>

            {/* Steps Grid */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Etapas do Projeto
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredSteps.length} de {activeProject.steps.length} etapas
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSteps.map((step) => (
                    <StepCard
                      key={step.id}
                      step={step}
                      onStatusChange={updateStepStatus}
                      onLinkChange={updateStepLink}
                    />
                  ))}
                </div>
                
                {filteredSteps.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Nenhuma etapa encontrada para o filtro selecionado.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;
