import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type BlueTab = 'summary' | 'phases' | 'findings' | 'report' | 'notes';
type Severity = 'Baja' | 'Media' | 'Alta' | 'Crítica';
type FindingStatus = 'Abierto' | 'En revisión' | 'Mitigado';
type NoteType = 'Idea' | 'Importante' | 'Recordatorio' | 'Hallazgo';

interface Phase {
  id: number;
  title: string;
  description: string;
  objective: string;
  tasks: string[];
  tools: string[];
  completed: boolean;
}

interface Finding {
  id: number;
  code: string;
  title: string;
  category: string;
  severity: Severity;
  status: FindingStatus;
  evidence: string;
  risk: string;
  recommendation: string;
  createdAt: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  date: string;
}

interface Tool {
  name: string;
  description: string;
  initial: string;
  tone: string;
  url: string;
}

interface ReportDraft {
  executiveSummary: string;
  scope: string;
  methodology: string;
  recommendations: string;
  conclusion: string;
}

@Component({
  selector: 'app-blue-team-analyst',
  imports: [RouterLink],
  templateUrl: './blue-team-analyst.html',
  styleUrl: './blue-team-analyst.css',
})
export class BlueTeamAnalyst {
  selectedTab: BlueTab = 'summary';
  guideOpen = false;
  showAllTools = false;
  reportCopied = false;

  tabs: { id: BlueTab; label: string; icon: string }[] = [
    { id: 'summary', label: 'Resumen', icon: '▣' },
    { id: 'phases', label: 'Fase a fase', icon: '⌘' },
    { id: 'findings', label: 'Hallazgos', icon: 'ⓘ' },
    { id: 'report', label: 'Informe', icon: '▤' },
    { id: 'notes', label: 'Notas', icon: '▫' },
  ];

  summaryFindings = [
    { label: 'Alertas críticas', value: '4', detail: 'Revisar', tone: 'red', icon: '♙' },
    { label: 'Alertas altas', value: '6', detail: 'Priorizar', tone: 'orange', icon: '⚠' },
    { label: 'Hosts afectados', value: '3', detail: 'Analizar', tone: 'purple', icon: '▣' },
    { label: 'IoCs esperados', value: '0 / 6', detail: 'Pendiente', tone: 'green', icon: '☼' },
    { label: 'Evidencias', value: '8', detail: 'Disponibles', tone: 'blue', icon: '▱' },
  ];

  activities = [
    {
      time: '10:24:18',
      activity: 'Inicio de sesión sospechoso detectado',
      source: 'Windows Security Log',
      severity: 'Alta',
      severityTone: 'high',
      status: 'Analizado ✓',
      statusTone: 'done',
    },
    {
      time: '10:18:47',
      activity: 'Múltiples intentos de autenticación fallidos',
      source: 'Firewall Log',
      severity: 'Media',
      severityTone: 'medium',
      status: 'Analizado ✓',
      statusTone: 'done',
    },
    {
      time: '10:15:32',
      activity: 'Conexión saliente a IP sospechosa',
      source: 'Proxy Log',
      severity: 'Alta',
      severityTone: 'high',
      status: 'En investigación',
      statusTone: 'progress',
    },
    {
      time: '10:12:05',
      activity: 'Creación de proceso inusual',
      source: 'Sysmon Log',
      severity: 'Media',
      severityTone: 'medium',
      status: 'Pendiente',
      statusTone: 'pending',
    },
    {
      time: '10:08:19',
      activity: 'Descarga de archivo ejecutable',
      source: 'Web Proxy Log',
      severity: 'Alta',
      severityTone: 'high',
      status: 'Pendiente',
      statusTone: 'pending',
    },
  ];

  tools: Tool[] = [
    {
      name: 'Splunk (SIEM)',
      description: 'Análisis de logs y correlación de eventos',
      initial: 'S',
      tone: 'green',
      url: 'https://www.splunk.com/',
    },
    {
      name: 'Wireshark',
      description: 'Análisis de tráfico de red',
      initial: 'W',
      tone: 'blue',
      url: 'https://www.wireshark.org/',
    },
    {
      name: 'Sysmon',
      description: 'Telemetría avanzada de Windows',
      initial: 'Sy',
      tone: 'blue',
      url: 'https://learn.microsoft.com/sysinternals/downloads/sysmon',
    },
    {
      name: 'Wazuh',
      description: 'Detección de amenazas y HIDS',
      initial: 'Wz',
      tone: 'blue',
      url: 'https://wazuh.com/',
    },
    {
      name: 'VirusTotal',
      description: 'Análisis de archivos, hashes y URLs',
      initial: 'VT',
      tone: 'indigo',
      url: 'https://www.virustotal.com/',
    },
    {
      name: 'CyberChef',
      description: 'Decodificación y análisis de datos',
      initial: 'CC',
      tone: 'orange',
      url: 'https://gchq.github.io/CyberChef/',
    },
    {
      name: 'MITRE ATT&CK',
      description: 'Mapeo de tácticas y técnicas',
      initial: 'MA',
      tone: 'gray',
      url: 'https://attack.mitre.org/',
    },
  ];

  phases: Phase[] = [
    {
      id: 1,
      title: 'Triage inicial',
      description: 'Revisa las alertas y determina cuáles necesitan atención inmediata.',
      objective: 'Clasificar las alertas por criticidad, impacto y contexto.',
      tasks: [
        'Revisar la alerta principal del SIEM.',
        'Identificar usuarios, hosts y horas afectadas.',
        'Distinguir falsos positivos.',
        'Priorizar alertas críticas y altas.',
      ],
      tools: ['Splunk', 'Wazuh', 'Event Viewer'],
      completed: false,
    },
    {
      id: 2,
      title: 'Análisis de evidencias',
      description: 'Correlaciona logs de autenticación, red, proxy y endpoint.',
      objective: 'Reconstruir la línea temporal del incidente.',
      tasks: [
        'Revisar eventos de inicio de sesión.',
        'Analizar conexiones salientes.',
        'Comprobar procesos y archivos.',
        'Relacionar eventos por usuario y host.',
      ],
      tools: ['Splunk', 'Sysmon', 'Wireshark'],
      completed: false,
    },
    {
      id: 3,
      title: 'Identificación de IoCs',
      description: 'Extrae indicadores de compromiso y valida su reputación.',
      objective: 'Documentar IPs, dominios, hashes, rutas y procesos.',
      tasks: [
        'Registrar IPs y dominios.',
        'Revisar hashes.',
        'Consultar reputación.',
        'Relacionar IoCs con evidencias.',
      ],
      tools: ['VirusTotal', 'CyberChef'],
      completed: false,
    },
    {
      id: 4,
      title: 'Contención',
      description: 'Propón medidas para limitar el impacto sin destruir evidencias.',
      objective: 'Aislar activos afectados y reducir la propagación.',
      tasks: [
        'Definir hosts a aislar.',
        'Proponer bloqueos.',
        'Recomendar cambio de credenciales.',
        'Preservar evidencias.',
      ],
      tools: ['EDR', 'Firewall', 'Wazuh'],
      completed: false,
    },
    {
      id: 5,
      title: 'Conclusiones y respuesta',
      description: 'Documenta hallazgos, causa probable y mejoras.',
      objective: 'Cerrar el análisis con un informe accionable.',
      tasks: [
        'Crear hallazgos.',
        'Mapear MITRE ATT&CK.',
        'Redactar recomendaciones.',
        'Generar informe.',
      ],
      tools: ['MITRE ATT&CK', 'Informe'],
      completed: false,
    },
  ];

  findings: Finding[] = [];
  findingExamples = [
    {
      title: 'Inicio de sesión anómalo',
      category: 'Autenticación',
      evidence: 'Ejemplo: acceso correcto después de múltiples intentos fallidos.',
      severity: 'Alta' as Severity,
      explanation: 'Modelo de redacción. Debes validar el caso antes de usarlo.',
    },
    {
      title: 'Conexión saliente a IP sospechosa',
      category: 'Red',
      evidence: 'Ejemplo: conexión TLS con una IP de mala reputación.',
      severity: 'Alta' as Severity,
      explanation: 'Correlaciona la IP con el proceso y el host.',
    },
  ];

  selectedFindingFilter = 'Todos';
  findingFilters = [
    'Todos',
    'Crítica',
    'Alta',
    'Media',
    'Baja',
    'Abierto',
    'En revisión',
    'Mitigado',
  ];
  findingCategories = [
    'Autenticación',
    'Endpoint',
    'Red',
    'Malware',
    'Identidad',
    'Persistencia',
    'Exfiltración',
    'Otros',
  ];
  showFindingForm = false;
  editingFindingId: number | null = null;
  findingTitle = '';
  findingCategory = 'Autenticación';
  findingSeverity: Severity = 'Media';
  findingStatus: FindingStatus = 'Abierto';
  findingEvidence = '';
  findingRisk = '';
  findingRecommendation = '';

  notes: Note[] = [
    {
      id: 1,
      title: 'Revisar tráfico saliente',
      type: 'Importante',
      date: 'Hoy, 10:25',
      content: 'Correlacionar la IP sospechosa con el host y el proceso responsable.',
    },
    {
      id: 2,
      title: 'Comprobar hash',
      type: 'Recordatorio',
      date: 'Hoy, 10:18',
      content: 'Verificar el hash en VirusTotal y conservar la evidencia.',
    },
  ];
  selectedNoteFilter = 'Todas';
  noteFilters = ['Todas', 'Idea', 'Importante', 'Recordatorio', 'Hallazgo'];
  newNoteTitle = '';
  newNoteContent = '';
  newNoteType: NoteType = 'Idea';

  reportDraft: ReportDraft = {
    executiveSummary:
      'Se ha realizado un análisis Blue Team sobre alertas y registros de un entorno corporativo simulado.',
    scope:
      'El alcance incluye eventos de autenticación, firewall, proxy, Sysmon y tráfico de red del laboratorio.',
    methodology:
      'La investigación se organiza en triage, correlación, identificación de IoCs, contención y documentación.',
    recommendations:
      'Reforzar monitorización, MFA, mínimo privilegio y procedimientos de respuesta.',
    conclusion:
      'Las conclusiones deben basarse en evidencias correlacionadas y no en una única alerta.',
  };

  selectTab(tab: BlueTab): void {
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
  togglePhase(id: number): void {
    this.phases = this.phases.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p));
  }
  isCurrentPhase(index: number): boolean {
    return this.phases.findIndex((p) => !p.completed) === index;
  }

  openNewFindingForm(): void {
    this.resetFindingForm();
    this.showFindingForm = true;
  }
  closeFindingForm(): void {
    this.showFindingForm = false;
    this.resetFindingForm();
  }
  editFinding(f: Finding): void {
    this.editingFindingId = f.id;
    this.findingTitle = f.title;
    this.findingCategory = f.category;
    this.findingSeverity = f.severity;
    this.findingStatus = f.status;
    this.findingEvidence = f.evidence;
    this.findingRisk = f.risk;
    this.findingRecommendation = f.recommendation;
    this.showFindingForm = true;
  }
  saveFinding(): void {
    if (!this.canSaveFinding) return;
    if (this.editingFindingId !== null) {
      this.findings = this.findings.map((f) =>
        f.id === this.editingFindingId
          ? {
              ...f,
              title: this.clean(this.findingTitle),
              category: this.findingCategory,
              severity: this.findingSeverity,
              status: this.findingStatus,
              evidence: this.clean(this.findingEvidence),
              risk: this.clean(this.findingRisk),
              recommendation: this.clean(this.findingRecommendation),
            }
          : f,
      );
    } else {
      this.findings = [
        {
          id: Date.now(),
          code: `BLUE-${String(this.findings.length + 1).padStart(3, '0')}`,
          title: this.clean(this.findingTitle),
          category: this.findingCategory,
          severity: this.findingSeverity,
          status: this.findingStatus,
          evidence: this.clean(this.findingEvidence),
          risk: this.clean(this.findingRisk),
          recommendation: this.clean(this.findingRecommendation),
          createdAt: this.now(),
        },
        ...this.findings,
      ];
    }
    this.closeFindingForm();
  }
  deleteFinding(id: number): void {
    if (confirm('¿Eliminar este hallazgo?'))
      this.findings = this.findings.filter((f) => f.id !== id);
  }
  useFindingExample(e: any): void {
    this.resetFindingForm();
    this.findingTitle = e.title;
    this.findingCategory = e.category;
    this.findingSeverity = e.severity;
    this.findingEvidence = e.evidence;
    this.showFindingForm = true;
  }

  createNote(): void {
    if (!this.canCreateNote) return;
    this.notes = [
      {
        id: Date.now(),
        title: this.clean(this.newNoteTitle),
        content: this.clean(this.newNoteContent),
        type: this.newNoteType,
        date: this.now(),
      },
      ...this.notes,
    ];
    this.newNoteTitle = '';
    this.newNoteContent = '';
    this.newNoteType = 'Idea';
  }
  deleteNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  resetLaboratory(): void {
    if (!confirm('Se reiniciará esta sesión del laboratorio.')) return;
    this.phases = this.phases.map((p) => ({ ...p, completed: false }));
    this.findings = [];
    this.notes = [];
  }

  updateExecutiveSummary(v: string): void {
    this.reportDraft = { ...this.reportDraft, executiveSummary: v.slice(0, 3000) };
  }
  updateScope(v: string): void {
    this.reportDraft = { ...this.reportDraft, scope: v.slice(0, 3000) };
  }
  updateMethodology(v: string): void {
    this.reportDraft = { ...this.reportDraft, methodology: v.slice(0, 3000) };
  }
  updateRecommendations(v: string): void {
    this.reportDraft = { ...this.reportDraft, recommendations: v.slice(0, 3000) };
  }
  updateConclusion(v: string): void {
    this.reportDraft = { ...this.reportDraft, conclusion: v.slice(0, 3000) };
  }
  printReport(): void {
    window.print();
  }
  async copyReportSummary(): Promise<void> {
    try {
      await navigator.clipboard.writeText(
        `Informe Blue Team\n\n${this.reportDraft.executiveSummary}\n\nHallazgos: ${this.findings.length}`,
      );
      this.reportCopied = true;
      setTimeout(() => (this.reportCopied = false), 2500);
    } catch {
      this.reportCopied = false;
    }
  }

  get visibleTools(): Tool[] {
    return this.showAllTools ? this.tools : this.tools.slice(0, 5);
  }
  get completedPhases(): number {
    return this.phases.filter((p) => p.completed).length;
  }
  get progressPercentage(): number {
    return Math.round((this.completedPhases / this.phases.length) * 100);
  }
  get caseStatus(): string {
    return this.progressPercentage === 0
      ? 'No iniciado'
      : this.progressPercentage === 100
        ? 'Completado'
        : 'En progreso';
  }
  get filteredFindings(): Finding[] {
    return this.selectedFindingFilter === 'Todos'
      ? this.findings
      : this.findings.filter(
          (f) =>
            f.severity === this.selectedFindingFilter || f.status === this.selectedFindingFilter,
        );
  }
  get filteredNotes(): Note[] {
    return this.selectedNoteFilter === 'Todas'
      ? this.notes
      : this.notes.filter((n) => n.type === this.selectedNoteFilter);
  }
  get highFindingsCount(): number {
    return this.findings.filter((f) => f.severity === 'Alta' || f.severity === 'Crítica').length;
  }
  get mitigatedFindingsCount(): number {
    return this.findings.filter((f) => f.status === 'Mitigado').length;
  }
  get canSaveFinding(): boolean {
    return (
      this.findingTitle.trim().length >= 5 &&
      this.findingEvidence.trim().length >= 10 &&
      this.findingRisk.trim().length >= 10 &&
      this.findingRecommendation.trim().length >= 10
    );
  }
  get canCreateNote(): boolean {
    return !!this.newNoteTitle.trim() && !!this.newNoteContent.trim();
  }
  get reportSeveritySummary(): string {
    const count = (s: Severity) => this.findings.filter((f) => f.severity === s).length;
    return `${count('Crítica')} críticos · ${count('Alta')} altos · ${count('Media')} medios · ${count('Baja')} bajos`;
  }
  get reportDate(): string {
    return new Intl.DateTimeFormat('es-ES').format(new Date());
  }

  private resetFindingForm(): void {
    this.editingFindingId = null;
    this.findingTitle = '';
    this.findingCategory = 'Autenticación';
    this.findingSeverity = 'Media';
    this.findingStatus = 'Abierto';
    this.findingEvidence = '';
    this.findingRisk = '';
    this.findingRecommendation = '';
  }
  private clean(v: string): string {
    return v.trim().slice(0, 3000);
  }
  private now(): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }
}
