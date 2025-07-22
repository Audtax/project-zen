import { useState } from 'react';
import { CheckCircle, Clock, Circle, ExternalLink, Link, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ProjectStep, StepStatus } from '@/types/project';

interface StepCardProps {
  step: ProjectStep;
  onStatusChange: (stepId: string, status: StepStatus) => void;
  onLinkChange: (stepId: string, link: string) => void;
}

export function StepCard({ step, onStatusChange, onLinkChange }: StepCardProps) {
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [linkValue, setLinkValue] = useState(step.link_documento || '');

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'concluido':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'em_andamento':
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <Circle className="h-5 w-5 text-todo" />;
    }
  };

  const getStatusColor = (status: StepStatus) => {
    switch (status) {
      case 'concluido':
        return 'border-l-success';
      case 'em_andamento':
        return 'border-l-warning';
      default:
        return 'border-l-todo';
    }
  };

  const getStatusLabel = (status: StepStatus) => {
    switch (status) {
      case 'concluido':
        return 'Concluído';
      case 'em_andamento':
        return 'Em Andamento';
      default:
        return 'A Fazer';
    }
  };

  const handleLinkSave = () => {
    onLinkChange(step.id, linkValue);
    setIsEditingLink(false);
  };

  const handleLinkCancel = () => {
    setLinkValue(step.link_documento || '');
    setIsEditingLink(false);
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md border-l-4 ${getStatusColor(step.status)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {getStatusIcon(step.status)}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-card-foreground truncate">
                {step.nome_etapa}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {getStatusLabel(step.status)}
              </p>
            </div>
          </div>
          
          <Select
            value={step.status}
            onValueChange={(value: StepStatus) => onStatusChange(step.id, value)}
          >
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a_fazer">A Fazer</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {isEditingLink ? (
            <div className="space-y-2">
              <Input
                placeholder="Cole o link do Google Docs aqui..."
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleLinkSave}>
                  Salvar
                </Button>
                <Button size="sm" variant="outline" onClick={handleLinkCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {step.link_documento && step.status === 'concluido' ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-start"
                  asChild
                >
                  <a
                    href={step.link_documento}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Abrir Documento
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-start"
                  onClick={() => setIsEditingLink(true)}
                >
                  <Link className="h-4 w-4 mr-2" />
                  {step.link_documento ? 'Editar Link' : 'Adicionar Link'}
                </Button>
              )}
              
              {step.link_documento && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingLink(true)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}