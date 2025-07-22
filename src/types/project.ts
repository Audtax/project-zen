export type StepStatus = 'a_fazer' | 'em_andamento' | 'concluido';

export interface ProjectStep {
  id: string;
  nome_etapa: string;
  status: StepStatus;
  link_documento?: string;
  id_projeto: string;
}

export interface Project {
  id: string;
  nome_projeto: string;
  descricao?: string;
  steps: ProjectStep[];
}

export const DEFAULT_STEPS = [
  'Início',
  'SWOT + 5W2H',
  'Requisitos Funcionais e Não Funcionais',
  'EAP + TAP + Arquitetura',
  'BPMN (Modelagem de Processos)',
  'Diagrama de Casos de Uso',
  'Modelagem Estrutural (Classes, MER, Dicionário)',
  'UX/UI (Prototipação)',
  'Desenvolvimento',
  'Testes',
  'Implantação',
  'Documentação e Encerramento'
];