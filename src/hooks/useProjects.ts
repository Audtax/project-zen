import { useState, useEffect } from 'react';
import { Project, ProjectStep, StepStatus, DEFAULT_STEPS } from '@/types/project';

// Mock data storage - will be replaced with Supabase integration
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Initialize with a sample project
  useEffect(() => {
    const sampleProject = createNewProject('Projeto Exemplo');
    setProjects([sampleProject]);
    setActiveProjectId(sampleProject.id);
  }, []);

  const createNewProject = (name: string, description?: string): Project => {
    const projectId = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const steps: ProjectStep[] = DEFAULT_STEPS.map((stepName, index) => ({
      id: `step-${projectId}-${index}`,
      nome_etapa: stepName,
      status: 'a_fazer' as StepStatus,
      link_documento: '',
      id_projeto: projectId,
    }));

    return {
      id: projectId,
      nome_projeto: name,
      descricao: description,
      steps,
    };
  };

  const addProject = (name: string, description?: string) => {
    const newProject = createNewProject(name, description);
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(newProject.id);
    return newProject;
  };

  const removeProject = (projectId: string) => {
    setProjects(prev => {
      const filtered = prev.filter(p => p.id !== projectId);
      if (activeProjectId === projectId && filtered.length > 0) {
        setActiveProjectId(filtered[0].id);
      } else if (filtered.length === 0) {
        // Create a new project if none left
        const newProject = createNewProject('Novo Projeto');
        setActiveProjectId(newProject.id);
        return [newProject];
      }
      return filtered;
    });
  };

  const updateStepStatus = (stepId: string, status: StepStatus) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      steps: project.steps.map(step => 
        step.id === stepId ? { ...step, status } : step
      )
    })));
  };

  const updateStepLink = (stepId: string, link: string) => {
    setProjects(prev => prev.map(project => ({
      ...project,
      steps: project.steps.map(step => 
        step.id === stepId ? { ...step, link_documento: link } : step
      )
    })));
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  return {
    projects,
    activeProject,
    activeProjectId,
    setActiveProjectId,
    addProject,
    removeProject,
    updateStepStatus,
    updateStepLink,
  };
}