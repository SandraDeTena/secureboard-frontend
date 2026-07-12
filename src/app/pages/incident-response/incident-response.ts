import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type IncidentTab = 'summary' | 'phases' | 'evidence' | 'report' | 'notes';
type IncidentSeverity = 'Baja' | 'Media' | 'Alta' | 'Crítica';
type EvidenceStatus = 'Pendiente' | 'En análisis' | 'Validada' | 'Descartada';
type NoteType = 'Idea' | 'Importante' | 'Recordatorio' | 'Incidente';

interface IncidentPhase {
  id: number;
  title: string;
  description: string;
  objective: string;
  tasks: string[];
  tools: string[];
  completed: boolean;
}

interface IncidentEvidence {
  id: number;
  code: string;
  title: string;
  category: string;
  severity: IncidentSeverity;
  status: EvidenceStatus;
  source: string;
  evidence: string;
  impact: string;
  action: string;
  createdAt: string;
}

interface EvidenceExample {
  title: string;
  category: string;
  source: string;
  evidence: string;
  severity: IncidentSeverity;
  explanation: string;
}

interface IncidentNote {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  date: string;
}

interface IncidentTool {
  name: string;
  initial: string;
  description: string;
  url: string;
  tone: 'green' | 'blue' | 'orange' | 'purple' | 'gray';
}

interface IncidentReportDraft {
  executiveSummary: string;
  scope: string;
  methodology: string;
  incidentTimeline: string;
  containmentActions: string;
  recommendations: string;
  conclusion: string;
}

@Component({
  selector: 'app-incident-response',
  imports: [RouterLink],
  templateUrl: './incident-response.html',
  styleUrl: './incident-response.css',
})
export class IncidentResponse {
  selectedTab: IncidentTab = 'summary';
  guideOpen = false;
  showAllTools = false;
  reportCopied = false;

  selectedEvidenceFilter = 'Todas';
  selectedNoteFilter = 'Todas';

  showEvidenceForm = false;
  editingEvidenceId: number | null = null;

  evidenceTitle = '';
  evidenceCategory = 'Sistema afectado';
  evidenceSeverity: IncidentSeverity = 'Alta';
  evidenceStatus: EvidenceStatus = 'Pendiente';
  evidenceSource = '';
  evidenceDescription = '';
  evidenceImpact = '';
  evidenceAction = '';

  newNoteTitle = '';
  newNoteContent = '';
  newNoteType: NoteType = 'Idea';

  tabs: { id: IncidentTab; label: string; icon: string }[] = [
    { id: 'summary', label: 'Resumen', icon: '▣' },
    { id: 'phases', label: 'Fase a fase', icon: '⌘' },
    { id: 'evidence', label: 'Evidencias', icon: 'ⓘ' },
    { id: 'report', label: 'Informe', icon: '▤' },
    { id: 'notes', label: 'Notas', icon: '▫' },
  ];

  summaryIndicators = [
    { label: 'Sistemas afectados', value: '3', detail: 'En análisis', tone: 'green', icon: '▤' },
    { label: 'Endpoints', value: '5', detail: 'Aislados', tone: 'blue', icon: '▣' },
    { label: 'Indicadores', value: '8', detail: 'Registrados', tone: 'purple', icon: '◎' },
    { label: 'Acciones de contención', value: '4', detail: 'Aplicadas', tone: 'orange', icon: '⚙' },
    { label: 'Evidencias validadas', value: '2', detail: 'Confirmadas', tone: 'red', icon: '✓' },
  ];

  tools: IncidentTool[] = [
    {
      name: 'Splunk',
      initial: 'S',
      description: 'Correlación y análisis de eventos',
      url: 'https://www.splunk.com/',
      tone: 'green',
    },
    {
      name: 'TheHive',
      initial: 'H',
      description: 'Gestión de incidentes y tareas',
      url: 'https://thehive-project.org/',
      tone: 'orange',
    },
    {
      name: 'Volatility',
      initial: 'V',
      description: 'Análisis forense de memoria',
      url: 'https://www.volatilityfoundation.org/',
      tone: 'purple',
    },
    {
      name: 'Wireshark',
      initial: 'W',
      description: 'Análisis de tráfico de red',
      url: 'https://www.wireshark.org/',
      tone: 'blue',
    },
    {
      name: 'YARA',
      initial: 'Y',
      description: 'Detección de patrones de malware',
      url: 'https://virustotal.github.io/yara/',
      tone: 'green',
    },
    {
      name: 'Syslog / ELK',
      initial: 'E',
      description: 'Centralización y análisis de logs',
      url: 'https://www.elastic.co/elastic-stack',
      tone: 'blue',
    },
    {
      name: 'Velociraptor',
      initial: 'VR',
      description: 'DFIR y respuesta en endpoints',
      url: 'https://docs.velociraptor.app/',
      tone: 'gray',
    },
  ];

  activities = [
    {
      time: '09:42:15',
      activity: 'Alerta de posible ransomware detectada',
      tool: 'Splunk',
      owner: 'Sistema',
      status: 'Completado ✓',
      statusTone: 'done',
    },
    {
      time: '09:45:02',
      activity: 'Análisis inicial de logs en SIEM',
      tool: 'Splunk',
      owner: 'Sandra De Tena',
      status: 'Completado ✓',
      statusTone: 'done',
    },
    {
      time: '09:48:19',
      activity: 'Aislamiento del endpoint WIN-10-23',
      tool: 'TheHive',
      owner: 'Sandra De Tena',
      status: 'En progreso',
      statusTone: 'progress',
    },
    {
      time: '09:53:41',
      activity: 'Captura de memoria del servidor SRV-DC01',
      tool: 'Volatility',
      owner: 'Sandra De Tena',
      status: 'Pendiente',
      statusTone: 'pending',
    },
    {
      time: '09:55:08',
      activity: 'Análisis de tráfico sospechoso',
      tool: 'Wireshark',
      owner: 'Sandra De Tena',
      status: 'Pendiente',
      statusTone: 'pending',
    },
  ];

  phases: IncidentPhase[] = [
    {
      id: 1,
      title: 'Identificación',
      description:
        'Confirma que existe un incidente, delimita el alcance inicial y registra los primeros indicadores.',
      objective:
        'Distinguir un incidente real de una alerta aislada y establecer la prioridad de respuesta.',
      tasks: [
        'Revisar alertas y logs relevantes.',
        'Identificar sistemas y usuarios afectados.',
        'Registrar la hora de detección.',
        'Clasificar la severidad inicial.',
      ],
      tools: ['Splunk', 'TheHive', 'Syslog / ELK'],
      completed: false,
    },
    {
      id: 2,
      title: 'Contención',
      description:
        'Limita la propagación del incidente sin destruir evidencias.',
      objective:
        'Reducir el impacto operativo manteniendo la trazabilidad de las acciones.',
      tasks: [
        'Aislar endpoints comprometidos.',
        'Bloquear indicadores confirmados.',
        'Deshabilitar credenciales afectadas.',
        'Mantener el registro de cada acción.',
      ],
      tools: ['TheHive', 'Firewall', 'EDR'],
      completed: false,
    },
    {
      id: 3,
      title: 'Erradicación',
      description:
        'Elimina la causa raíz, el malware y los mecanismos de persistencia.',
      objective:
        'Restaurar la confianza en los sistemas antes de devolverlos a producción.',
      tasks: [
        'Eliminar archivos y procesos maliciosos.',
        'Corregir vulnerabilidades explotadas.',
        'Restablecer credenciales comprometidas.',
        'Validar que no existe persistencia.',
      ],
      tools: ['YARA', 'Volatility', 'Velociraptor'],
      completed: false,
    },
    {
      id: 4,
      title: 'Recuperación',
      description:
        'Restaura servicios y monitoriza posibles recaídas.',
      objective:
        'Volver a la operación normal de forma progresiva y controlada.',
      tasks: [
        'Restaurar sistemas desde fuentes fiables.',
        'Aplicar parches y cambios aprobados.',
        'Monitorizar comportamiento anómalo.',
        'Confirmar estabilidad del servicio.',
      ],
      tools: ['Backups', 'Wazuh', 'Monitorización'],
      completed: false,
    },
    {
      id: 5,
      title: 'Lecciones aprendidas',
      description:
        'Documenta la cronología, el impacto y las mejoras necesarias.',
      objective:
        'Cerrar el incidente con acciones de mejora y una respuesta reproducible.',
      tasks: [
        'Completar la línea temporal.',
        'Registrar evidencias validadas.',
        'Evaluar la eficacia de la respuesta.',
        'Generar el informe final.',
      ],
      tools: ['Evidencias', 'Informe', 'Notas'],
      completed: false,
    },
  ];

  evidences: IncidentEvidence[] = [];

  evidenceExamples: EvidenceExample[] = [
    {
      title: 'Conexión saliente a infraestructura sospechosa',
      category: 'Red',
      source: 'Proxy y firewall',
      evidence:
        'Ejemplo: conexión periódica desde un endpoint afectado hacia una IP no habitual.',
      severity: 'Alta',
      explanation:
        'Valida el contexto, la frecuencia y la relación con otros indicadores antes de registrarlo.',
    },
    {
      title: 'Proceso anómalo ejecutado desde una ruta temporal',
      category: 'Endpoint',
      source: 'Sysmon / EDR',
      evidence:
        'Ejemplo: proceso no firmado iniciado desde una carpeta temporal por un usuario estándar.',
      severity: 'Crítica',
      explanation:
        'No elimines el archivo antes de preservar la evidencia necesaria.',
    },
  ];

  notes: IncidentNote[] = [
    {
      id: 1,
      title: 'No reiniciar sistemas',
      type: 'Importante',
      date: 'Hoy, 09:44',
      content:
        'Evitar reinicios hasta completar la captura de memoria y preservar evidencias volátiles.',
    },
    {
      id: 2,
      title: 'Verificar copias de seguridad',
      type: 'Recordatorio',
      date: 'Hoy, 09:51',
      content:
        'Confirmar que existen copias aisladas y recientes antes de comenzar la recuperación.',
    },
  ];

  reportDraft: IncidentReportDraft = {
    executiveSummary:
      'Se ha gestionado un incidente de seguridad simulado con indicios compatibles con ransomware y afectación sobre varios sistemas corporativos.',
    scope:
      'El alcance comprende los endpoints y servidores definidos en el laboratorio, así como los registros de red, SIEM y evidencias forenses asociadas.',
    methodology:
      'La respuesta se ha estructurado en identificación, contención, erradicación, recuperación y lecciones aprendidas.',
    incidentTimeline:
      'La alerta inicial se detectó a las 09:42. Posteriormente se revisaron eventos, se aislaron sistemas afectados y se iniciaron tareas forenses.',
    containmentActions:
      'Se aislaron los endpoints afectados, se bloquearon indicadores confirmados y se preservaron evidencias volátiles antes de aplicar cambios.',
    recommendations:
      'Mejorar la segmentación, reforzar copias de seguridad, revisar privilegios, desplegar reglas de detección y realizar simulacros periódicos.',
    conclusion:
      'El incidente debe considerarse cerrado únicamente cuando se haya validado la erradicación, completado la recuperación y documentado la causa raíz.',
  };

  evidenceCategories = [
    'Sistema afectado',
    'Endpoint',
    'Red',
    'Malware',
    'Credenciales',
    'Persistencia',
    'Logs',
    'Memoria',
    'Otros',
  ];

  evidenceFilters = [
    'Todas',
    'Crítica',
    'Alta',
    'Media',
    'Baja',
    'Pendiente',
    'En análisis',
    'Validada',
    'Descartada',
  ];

  noteFilters = [
    'Todas',
    'Idea',
    'Importante',
    'Recordatorio',
    'Incidente',
  ];

  selectTab(tab: IncidentTab): void {
    this.selectedTab = tab;
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
      phase.id === phaseId
        ? { ...phase, completed: !phase.completed }
        : phase
    );
  }

  isCurrentPhase(index: number): boolean {
    const firstPendingIndex = this.phases.findIndex((phase) => !phase.completed);
    return firstPendingIndex === index;
  }

  openNewEvidenceForm(): void {
    this.resetEvidenceForm();
    this.showEvidenceForm = true;
  }

  closeEvidenceForm(): void {
    this.showEvidenceForm = false;
    this.resetEvidenceForm();
  }

  editEvidence(evidence: IncidentEvidence): void {
    this.editingEvidenceId = evidence.id;
    this.evidenceTitle = evidence.title;
    this.evidenceCategory = evidence.category;
    this.evidenceSeverity = evidence.severity;
    this.evidenceStatus = evidence.status;
    this.evidenceSource = evidence.source;
    this.evidenceDescription = evidence.evidence;
    this.evidenceImpact = evidence.impact;
    this.evidenceAction = evidence.action;
    this.showEvidenceForm = true;
  }

  saveEvidence(): void {
    if (!this.canSaveEvidence) {
      return;
    }

    if (this.editingEvidenceId !== null) {
      this.evidences = this.evidences.map((evidence) =>
        evidence.id === this.editingEvidenceId
          ? {
              ...evidence,
              title: this.cleanText(this.evidenceTitle),
              category: this.evidenceCategory,
              severity: this.evidenceSeverity,
              status: this.evidenceStatus,
              source: this.cleanText(this.evidenceSource),
              evidence: this.cleanText(this.evidenceDescription),
              impact: this.cleanText(this.evidenceImpact),
              action: this.cleanText(this.evidenceAction),
            }
          : evidence
      );
    } else {
      const evidence: IncidentEvidence = {
        id: Date.now(),
        code: this.createEvidenceCode(),
        title: this.cleanText(this.evidenceTitle),
        category: this.evidenceCategory,
        severity: this.evidenceSeverity,
        status: this.evidenceStatus,
        source: this.cleanText(this.evidenceSource),
        evidence: this.cleanText(this.evidenceDescription),
        impact: this.cleanText(this.evidenceImpact),
        action: this.cleanText(this.evidenceAction),
        createdAt: this.formatCurrentDate(),
      };

      this.evidences = [evidence, ...this.evidences];
    }

    this.closeEvidenceForm();
  }

  deleteEvidence(evidenceId: number): void {
    if (!window.confirm('¿Seguro que quieres eliminar esta evidencia?')) {
      return;
    }

    this.evidences = this.evidences.filter((evidence) => evidence.id !== evidenceId);
  }

  useEvidenceExample(example: EvidenceExample): void {
    this.resetEvidenceForm();
    this.evidenceTitle = example.title;
    this.evidenceCategory = example.category;
    this.evidenceSeverity = example.severity;
    this.evidenceSource = example.source;
    this.evidenceDescription = example.evidence;
    this.showEvidenceForm = true;
  }

  createNote(): void {
    if (!this.canCreateNote) {
      return;
    }

    const note: IncidentNote = {
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
    if (!window.confirm('Esto reiniciará las fases, evidencias, notas y el borrador de esta sesión.')) {
      return;
    }

    this.phases = this.phases.map((phase) => ({ ...phase, completed: false }));
    this.evidences = [];
    this.notes = [];
    this.reportDraft = {
      executiveSummary:
        'Se ha gestionado un incidente de seguridad simulado con indicios compatibles con ransomware y afectación sobre varios sistemas corporativos.',
      scope:
        'El alcance comprende los endpoints y servidores definidos en el laboratorio, así como los registros de red, SIEM y evidencias forenses asociadas.',
      methodology:
        'La respuesta se ha estructurado en identificación, contención, erradicación, recuperación y lecciones aprendidas.',
      incidentTimeline:
        'La alerta inicial se detectó a las 09:42. Posteriormente se revisaron eventos, se aislaron sistemas afectados y se iniciaron tareas forenses.',
      containmentActions:
        'Se aislaron los endpoints afectados, se bloquearon indicadores confirmados y se preservaron evidencias volátiles antes de aplicar cambios.',
      recommendations:
        'Mejorar la segmentación, reforzar copias de seguridad, revisar privilegios, desplegar reglas de detección y realizar simulacros periódicos.',
      conclusion:
        'El incidente debe considerarse cerrado únicamente cuando se haya validado la erradicación, completado la recuperación y documentado la causa raíz.',
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

  updateIncidentTimeline(value: string): void {
    this.reportDraft = { ...this.reportDraft, incidentTimeline: this.limitText(value, 3000) };
  }

  updateContainmentActions(value: string): void {
    this.reportDraft = { ...this.reportDraft, containmentActions: this.limitText(value, 3000) };
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
      'Informe Incident Response',
      '',
      this.reportDraft.executiveSummary,
      '',
      `Evidencias registradas: ${this.evidences.length}`,
      ...this.evidences.map(
        (evidence) => `- ${evidence.code}: ${evidence.title} (${evidence.status})`
      ),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      this.reportCopied = true;
      window.setTimeout(() => (this.reportCopied = false), 2500);
    } catch {
      this.reportCopied = false;
    }
  }

  get visibleTools(): IncidentTool[] {
    return this.showAllTools ? this.tools : this.tools.slice(0, 6);
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

  get filteredEvidences(): IncidentEvidence[] {
    if (this.selectedEvidenceFilter === 'Todas') return this.evidences;

    return this.evidences.filter(
      (evidence) =>
        evidence.severity === this.selectedEvidenceFilter ||
        evidence.status === this.selectedEvidenceFilter
    );
  }

  get filteredNotes(): IncidentNote[] {
    if (this.selectedNoteFilter === 'Todas') return this.notes;
    return this.notes.filter((note) => note.type === this.selectedNoteFilter);
  }

  get criticalEvidenceCount(): number {
    return this.evidences.filter(
      (evidence) => evidence.severity === 'Crítica' || evidence.severity === 'Alta'
    ).length;
  }

  get validatedEvidenceCount(): number {
    return this.evidences.filter((evidence) => evidence.status === 'Validada').length;
  }

  get canSaveEvidence(): boolean {
    return (
      this.evidenceTitle.trim().length >= 5 &&
      this.evidenceSource.trim().length >= 3 &&
      this.evidenceDescription.trim().length >= 10 &&
      this.evidenceImpact.trim().length >= 10 &&
      this.evidenceAction.trim().length >= 10
    );
  }

  get canCreateNote(): boolean {
    return (
      this.newNoteTitle.trim().length > 0 &&
      this.newNoteContent.trim().length > 0
    );
  }

  get evidenceStatusSummary(): string {
    const pending = this.evidences.filter((evidence) => evidence.status === 'Pendiente').length;
    const analysis = this.evidences.filter((evidence) => evidence.status === 'En análisis').length;
    const validated = this.evidences.filter((evidence) => evidence.status === 'Validada').length;
    const discarded = this.evidences.filter((evidence) => evidence.status === 'Descartada').length;
    return `${pending} pendientes · ${analysis} en análisis · ${validated} validadas · ${discarded} descartadas`;
  }

  get reportDate(): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date());
  }

  private resetEvidenceForm(): void {
    this.editingEvidenceId = null;
    this.evidenceTitle = '';
    this.evidenceCategory = 'Sistema afectado';
    this.evidenceSeverity = 'Alta';
    this.evidenceStatus = 'Pendiente';
    this.evidenceSource = '';
    this.evidenceDescription = '';
    this.evidenceImpact = '';
    this.evidenceAction = '';
  }

  private createEvidenceCode(): string {
    return `IR-${String(this.evidences.length + 1).padStart(3, '0')}`;
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