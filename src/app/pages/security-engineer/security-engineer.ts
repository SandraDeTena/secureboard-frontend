import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type EngineerTab = 'summary' | 'phases' | 'controls' | 'report' | 'notes';
type ControlStatus = 'Pendiente' | 'En progreso' | 'Implementado' | 'Validado';
type ControlPriority = 'Baja' | 'Media' | 'Alta' | 'Crítica';
type NoteType = 'Idea' | 'Importante' | 'Recordatorio' | 'Control';

interface SecurityPhase {
  id: number;
  title: string;
  description: string;
  objective: string;
  tasks: string[];
  tools: string[];
  completed: boolean;
}

interface SecurityControl {
  id: number;
  code: string;
  title: string;
  category: string;
  priority: ControlPriority;
  status: ControlStatus;
  currentState: string;
  targetState: string;
  validation: string;
  recommendation: string;
  createdAt: string;
}

interface ControlExample {
  title: string;
  category: string;
  currentState: string;
  targetState: string;
  priority: ControlPriority;
  explanation: string;
}

interface SecurityNote {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  date: string;
}

interface SecurityTool {
  name: string;
  initial: string;
  description: string;
  url: string;
  tone: 'orange' | 'blue' | 'green' | 'purple' | 'gray';
}

interface SecurityReportDraft {
  executiveSummary: string;
  scope: string;
  methodology: string;
  riskAssessment: string;
  recommendations: string;
  conclusion: string;
}

@Component({
  selector: 'app-security-engineer',
  imports: [RouterLink],
  templateUrl: './security-engineer.html',
  styleUrl: './security-engineer.css',
})
export class SecurityEngineer {
  selectedTab: EngineerTab = 'summary';
  guideOpen = false;
  showAllTools = false;
  reportCopied = false;

  selectedControlFilter = 'Todos';
  selectedNoteFilter = 'Todas';

  showControlForm = false;
  editingControlId: number | null = null;

  controlTitle = '';
  controlCategory = 'Firewall';
  controlPriority: ControlPriority = 'Media';
  controlStatus: ControlStatus = 'Pendiente';
  controlCurrentState = '';
  controlTargetState = '';
  controlValidation = '';
  controlRecommendation = '';

  newNoteTitle = '';
  newNoteContent = '';
  newNoteType: NoteType = 'Idea';

  tabs: { id: EngineerTab; label: string; icon: string }[] = [
    { id: 'summary', label: 'Resumen', icon: '▣' },
    { id: 'phases', label: 'Fase a fase', icon: '⌘' },
    { id: 'controls', label: 'Controles', icon: '⚙' },
    { id: 'report', label: 'Informe', icon: '▤' },
    { id: 'notes', label: 'Notas', icon: '▫' },
  ];

  summaryControls = [
    { label: 'Firewall', value: '1 / 1', detail: 'Implementado', tone: 'orange', icon: '▦' },
    {
      label: 'Segmentación de red',
      value: '1 / 1',
      detail: 'Implementado',
      tone: 'purple',
      icon: '⌘',
    },
    { label: 'IDS / IPS', value: '0 / 1', detail: 'Pendiente', tone: 'yellow', icon: '⌛' },
    { label: 'Cifrado de datos', value: '1 / 1', detail: 'Implementado', tone: 'blue', icon: '▣' },
    { label: 'Gestión de parches', value: '0 / 1', detail: 'Pendiente', tone: 'red', icon: '⚙' },
    { label: 'Políticas de acceso', value: '0 / 1', detail: 'Pendiente', tone: 'green', icon: '♙' },
  ];

  tools: SecurityTool[] = [
    {
      name: 'pfSense',
      initial: 'P',
      description: 'Firewall y segmentación de red',
      url: 'https://www.pfsense.org/',
      tone: 'orange',
    },
    {
      name: 'Suricata',
      initial: 'S',
      description: 'Sistema de detección y prevención',
      url: 'https://suricata.io/',
      tone: 'orange',
    },
    {
      name: 'OpenVAS',
      initial: 'O',
      description: 'Evaluación de vulnerabilidades',
      url: 'https://www.greenbone.net/',
      tone: 'green',
    },
    {
      name: 'Lynis',
      initial: 'L',
      description: 'Auditoría y hardening de sistemas',
      url: 'https://cisofy.com/lynis/',
      tone: 'purple',
    },
    {
      name: 'Nessus Essentials',
      initial: 'N',
      description: 'Análisis de vulnerabilidades',
      url: 'https://www.tenable.com/products/nessus/nessus-essentials',
      tone: 'blue',
    },
    {
      name: 'Wazuh',
      initial: 'W',
      description: 'Monitorización y cumplimiento',
      url: 'https://wazuh.com/',
      tone: 'blue',
    },
    {
      name: 'CIS Benchmarks',
      initial: 'CIS',
      description: 'Buenas prácticas de configuración segura',
      url: 'https://www.cisecurity.org/cis-benchmarks',
      tone: 'gray',
    },
  ];

  activities = [
    {
      time: '11:32:18',
      activity: 'Análisis de la infraestructura actual',
      resource: 'Nmap',
      status: 'Completado ✓',
      statusTone: 'done',
    },
    {
      time: '11:45:27',
      activity: 'Configuración de reglas de firewall',
      resource: 'pfSense',
      status: 'Completado ✓',
      statusTone: 'done',
    },
    {
      time: '12:02:44',
      activity: 'Segmentación de red implementada',
      resource: 'VLANs',
      status: 'Completado ✓',
      statusTone: 'done',
    },
    {
      time: '12:18:10',
      activity: 'Instalación de Suricata',
      resource: 'Suricata',
      status: 'En progreso',
      statusTone: 'progress',
    },
    {
      time: '12:25:33',
      activity: 'Revisión de políticas de acceso',
      resource: 'LDAP / AD',
      status: 'Pendiente',
      statusTone: 'pending',
    },
  ];

  phases: SecurityPhase[] = [
    {
      id: 1,
      title: 'Evaluación de la infraestructura',
      description:
        'Revisa la red, los activos, las configuraciones existentes y los riesgos iniciales.',
      objective: 'Crear una fotografía técnica del estado actual antes de aplicar cambios.',
      tasks: [
        'Inventariar activos y servicios.',
        'Identificar configuraciones inseguras.',
        'Revisar exposición y segmentación.',
        'Registrar la línea base de seguridad.',
      ],
      tools: ['Nmap', 'OpenVAS', 'Lynis'],
      completed: false,
    },
    {
      id: 2,
      title: 'Diseño de controles',
      description: 'Define qué controles deben aplicarse y cómo se medirán.',
      objective: 'Seleccionar medidas proporcionadas al riesgo y al entorno simulado.',
      tasks: [
        'Definir reglas de firewall.',
        'Diseñar la segmentación por VLAN.',
        'Seleccionar controles de acceso.',
        'Establecer criterios de validación.',
      ],
      tools: ['CIS Benchmarks', 'Diagrama de red', 'Checklist de controles'],
      completed: false,
    },
    {
      id: 3,
      title: 'Implementación',
      description: 'Aplica los controles diseñados dentro del laboratorio.',
      objective: 'Reducir la superficie de ataque sin afectar innecesariamente a la operación.',
      tasks: [
        'Configurar pfSense.',
        'Aplicar reglas de acceso.',
        'Desplegar IDS/IPS.',
        'Aplicar cifrado y hardening.',
      ],
      tools: ['pfSense', 'Suricata', 'Lynis'],
      completed: false,
    },
    {
      id: 4,
      title: 'Validación técnica',
      description: 'Comprueba que cada control funciona y que no genera efectos adversos.',
      objective: 'Aportar evidencia objetiva sobre la eficacia del control.',
      tasks: [
        'Repetir escaneos de vulnerabilidad.',
        'Validar reglas de firewall.',
        'Comprobar alertas de IDS/IPS.',
        'Documentar resultados antes y después.',
      ],
      tools: ['OpenVAS', 'Nessus Essentials', 'Wazuh'],
      completed: false,
    },
    {
      id: 5,
      title: 'Documentación y mejora',
      description: 'Registra los controles aplicados, riesgos residuales y próximos pasos.',
      objective: 'Cerrar la intervención con una configuración trazable y mantenible.',
      tasks: [
        'Actualizar el inventario.',
        'Crear los controles definitivos.',
        'Registrar riesgos residuales.',
        'Generar el informe final.',
      ],
      tools: ['Controles', 'Informe', 'Notas'],
      completed: false,
    },
  ];

  controls: SecurityControl[] = [];

  controlExamples: ControlExample[] = [
    {
      title: 'Restringir tráfico entrante no autorizado',
      category: 'Firewall',
      currentState:
        'El firewall permite servicios que no son necesarios para la operación del laboratorio.',
      targetState: 'Permitir únicamente los puertos y orígenes incluidos en la política aprobada.',
      priority: 'Alta',
      explanation:
        'El control debe incluir evidencia de las reglas aplicadas y una prueba de validación.',
    },
    {
      title: 'Aplicar autenticación multifactor a accesos administrativos',
      category: 'Políticas de acceso',
      currentState: 'Las cuentas administrativas utilizan únicamente contraseña.',
      targetState: 'Los accesos privilegiados requieren un segundo factor de autenticación.',
      priority: 'Crítica',
      explanation: 'Define también el procedimiento de recuperación y las excepciones autorizadas.',
    },
  ];

  notes: SecurityNote[] = [
    {
      id: 1,
      title: 'Actualizar reglas antes de validar',
      type: 'Importante',
      date: 'Hoy, 12:05',
      content: 'Revisar la política de entrada de pfSense antes de repetir el escaneo.',
    },
    {
      id: 2,
      title: 'Comprobar segmentación',
      type: 'Recordatorio',
      date: 'Hoy, 11:50',
      content:
        'Validar que los siete segmentos definidos no tengan comunicación lateral innecesaria.',
    },
  ];

  reportDraft: SecurityReportDraft = {
    executiveSummary:
      'Se ha realizado una revisión de ingeniería de seguridad sobre una infraestructura ficticia para reducir su superficie de ataque y mejorar su nivel de madurez.',
    scope:
      'El alcance comprende la red interna simulada, los servicios publicados, los controles de acceso, el firewall y los mecanismos de detección definidos en el laboratorio.',
    methodology:
      'El trabajo se ha organizado en evaluación, diseño, implementación, validación y documentación de controles.',
    riskAssessment:
      'La infraestructura presenta riesgos relacionados con exposición de servicios, segmentación insuficiente, falta de monitorización y políticas de acceso mejorables.',
    recommendations:
      'Mantener una política de mínimo privilegio, revisar reglas de firewall, aplicar parches, habilitar MFA, monitorizar eventos y validar periódicamente la configuración.',
    conclusion:
      'Los controles deben considerarse efectivos únicamente cuando exista evidencia de implementación y validación dentro del entorno autorizado.',
  };

  controlCategories = [
    'Firewall',
    'Segmentación de red',
    'IDS / IPS',
    'Cifrado',
    'Gestión de parches',
    'Políticas de acceso',
    'Monitorización',
    'Hardening',
    'Otros',
  ];

  controlFilters = [
    'Todos',
    'Crítica',
    'Alta',
    'Media',
    'Baja',
    'Pendiente',
    'En progreso',
    'Implementado',
    'Validado',
  ];

  noteFilters = ['Todas', 'Idea', 'Importante', 'Recordatorio', 'Control'];

  selectTab(tab: EngineerTab): void {
    this.selectedTab = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openGuide(): void {
    this.guideOpen = true;
  }

  closeGuide(): void {
    this.guideOpen = false;
  }

  toggleAllTools(): void {
    this.showAllTools = !this.showAllTools;
  }

  togglePhase(phaseId: number): void {
    this.phases = this.phases.map((phase) =>
      phase.id === phaseId ? { ...phase, completed: !phase.completed } : phase,
    );
  }

  isCurrentPhase(index: number): boolean {
    const firstPendingIndex = this.phases.findIndex((phase) => !phase.completed);
    return firstPendingIndex === index;
  }

  openNewControlForm(): void {
    this.resetControlForm();
    this.showControlForm = true;
  }

  closeControlForm(): void {
    this.showControlForm = false;
    this.resetControlForm();
  }

  editControl(control: SecurityControl): void {
    this.editingControlId = control.id;
    this.controlTitle = control.title;
    this.controlCategory = control.category;
    this.controlPriority = control.priority;
    this.controlStatus = control.status;
    this.controlCurrentState = control.currentState;
    this.controlTargetState = control.targetState;
    this.controlValidation = control.validation;
    this.controlRecommendation = control.recommendation;
    this.showControlForm = true;
  }

  saveControl(): void {
    if (!this.canSaveControl) {
      return;
    }

    if (this.editingControlId !== null) {
      this.controls = this.controls.map((control) =>
        control.id === this.editingControlId
          ? {
              ...control,
              title: this.cleanText(this.controlTitle),
              category: this.controlCategory,
              priority: this.controlPriority,
              status: this.controlStatus,
              currentState: this.cleanText(this.controlCurrentState),
              targetState: this.cleanText(this.controlTargetState),
              validation: this.cleanText(this.controlValidation),
              recommendation: this.cleanText(this.controlRecommendation),
            }
          : control,
      );
    } else {
      const control: SecurityControl = {
        id: Date.now(),
        code: this.createControlCode(),
        title: this.cleanText(this.controlTitle),
        category: this.controlCategory,
        priority: this.controlPriority,
        status: this.controlStatus,
        currentState: this.cleanText(this.controlCurrentState),
        targetState: this.cleanText(this.controlTargetState),
        validation: this.cleanText(this.controlValidation),
        recommendation: this.cleanText(this.controlRecommendation),
        createdAt: this.formatCurrentDate(),
      };

      this.controls = [control, ...this.controls];
    }

    this.closeControlForm();
  }

  deleteControl(controlId: number): void {
    if (!window.confirm('¿Seguro que quieres eliminar este control?')) {
      return;
    }

    this.controls = this.controls.filter((control) => control.id !== controlId);
  }

  useControlExample(example: ControlExample): void {
    this.resetControlForm();
    this.controlTitle = example.title;
    this.controlCategory = example.category;
    this.controlPriority = example.priority;
    this.controlCurrentState = example.currentState;
    this.controlTargetState = example.targetState;
    this.showControlForm = true;
  }

  createNote(): void {
    if (!this.canCreateNote) {
      return;
    }

    const note: SecurityNote = {
      id: Date.now(),
      title: this.cleanText(this.newNoteTitle),
      content: this.cleanText(this.newNoteContent),
      type: this.newNoteType,
      date: this.formatCurrentDate(),
    };

    this.notes = [note, ...this.notes];
    this.newNoteTitle = '';
    this.newNoteContent = '';
    this.newNoteType = 'Idea';
  }

  deleteNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  resetLaboratory(): void {
    if (
      !window.confirm('Esto reiniciará las fases, controles, notas y el borrador de esta sesión.')
    ) {
      return;
    }

    this.phases = this.phases.map((phase) => ({ ...phase, completed: false }));
    this.controls = [];
    this.notes = [];
    this.reportDraft = {
      executiveSummary:
        'Se ha realizado una revisión de ingeniería de seguridad sobre una infraestructura ficticia para reducir su superficie de ataque y mejorar su nivel de madurez.',
      scope:
        'El alcance comprende la red interna simulada, los servicios publicados, los controles de acceso, el firewall y los mecanismos de detección definidos en el laboratorio.',
      methodology:
        'El trabajo se ha organizado en evaluación, diseño, implementación, validación y documentación de controles.',
      riskAssessment:
        'La infraestructura presenta riesgos relacionados con exposición de servicios, segmentación insuficiente, falta de monitorización y políticas de acceso mejorables.',
      recommendations:
        'Mantener una política de mínimo privilegio, revisar reglas de firewall, aplicar parches, habilitar MFA, monitorizar eventos y validar periódicamente la configuración.',
      conclusion:
        'Los controles deben considerarse efectivos únicamente cuando exista evidencia de implementación y validación dentro del entorno autorizado.',
    };
  }

  updateExecutiveSummary(value: string): void {
    this.reportDraft = { ...this.reportDraft, executiveSummary: this.limitText(value, 3000) };
  }

  updateScope(value: string): void {
    this.reportDraft = { ...this.reportDraft, scope: this.limitText(value, 3000) };
  }

  updateMethodology(value: string): void {
    this.reportDraft = { ...this.reportDraft, methodology: this.limitText(value, 3000) };
  }

  updateRiskAssessment(value: string): void {
    this.reportDraft = { ...this.reportDraft, riskAssessment: this.limitText(value, 3000) };
  }

  updateRecommendations(value: string): void {
    this.reportDraft = { ...this.reportDraft, recommendations: this.limitText(value, 3000) };
  }

  updateConclusion(value: string): void {
    this.reportDraft = { ...this.reportDraft, conclusion: this.limitText(value, 3000) };
  }

  printReport(): void {
    window.print();
  }

  async copyReportSummary(): Promise<void> {
    const summary = [
      'Informe Security Engineer',
      '',
      this.reportDraft.executiveSummary,
      '',
      `Controles registrados: ${this.controls.length}`,
      ...this.controls.map((control) => `- ${control.code}: ${control.title} (${control.status})`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      this.reportCopied = true;
      window.setTimeout(() => (this.reportCopied = false), 2500);
    } catch {
      this.reportCopied = false;
    }
  }

  get visibleTools(): SecurityTool[] {
    return this.showAllTools ? this.tools : this.tools.slice(0, 5);
  }

  get completedPhases(): number {
    return this.phases.filter((phase) => phase.completed).length;
  }

  get progressPercentage(): number {
    return Math.round((this.completedPhases / this.phases.length) * 100);
  }

  get caseStatus(): string {
    if (this.progressPercentage === 0) return 'No iniciado';
    if (this.progressPercentage === 100) return 'Completado';
    return 'En progreso';
  }

  get filteredControls(): SecurityControl[] {
    if (this.selectedControlFilter === 'Todos') return this.controls;

    return this.controls.filter(
      (control) =>
        control.priority === this.selectedControlFilter ||
        control.status === this.selectedControlFilter,
    );
  }

  get filteredNotes(): SecurityNote[] {
    if (this.selectedNoteFilter === 'Todas') return this.notes;
    return this.notes.filter((note) => note.type === this.selectedNoteFilter);
  }

  get criticalControlsCount(): number {
    return this.controls.filter(
      (control) => control.priority === 'Crítica' || control.priority === 'Alta',
    ).length;
  }

  get validatedControlsCount(): number {
    return this.controls.filter((control) => control.status === 'Validado').length;
  }

  get canSaveControl(): boolean {
    return (
      this.controlTitle.trim().length >= 5 &&
      this.controlCurrentState.trim().length >= 10 &&
      this.controlTargetState.trim().length >= 10 &&
      this.controlValidation.trim().length >= 10 &&
      this.controlRecommendation.trim().length >= 10
    );
  }

  get canCreateNote(): boolean {
    return this.newNoteTitle.trim().length > 0 && this.newNoteContent.trim().length > 0;
  }

  get controlStatusSummary(): string {
    const pending = this.controls.filter((control) => control.status === 'Pendiente').length;
    const progress = this.controls.filter((control) => control.status === 'En progreso').length;
    const implemented = this.controls.filter((control) => control.status === 'Implementado').length;
    const validated = this.controls.filter((control) => control.status === 'Validado').length;
    return `${pending} pendientes · ${progress} en progreso · ${implemented} implementados · ${validated} validados`;
  }

  get reportDate(): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date());
  }

  private resetControlForm(): void {
    this.editingControlId = null;
    this.controlTitle = '';
    this.controlCategory = 'Firewall';
    this.controlPriority = 'Media';
    this.controlStatus = 'Pendiente';
    this.controlCurrentState = '';
    this.controlTargetState = '';
    this.controlValidation = '';
    this.controlRecommendation = '';
  }

  private createControlCode(): string {
    return `SEC-${String(this.controls.length + 1).padStart(3, '0')}`;
  }

  private cleanText(value: string): string {
    return this.limitText(value.trim(), 3000);
  }

  private limitText(value: string, maximum: number): string {
    return value.slice(0, maximum);
  }

  private formatCurrentDate(): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }
}
