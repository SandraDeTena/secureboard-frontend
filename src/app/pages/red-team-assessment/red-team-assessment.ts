import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type RedTab = 'summary' | 'phases' | 'findings' | 'report' | 'notes';
type FindingSeverity = 'Baja' | 'Media' | 'Alta' | 'Crítica';
type FindingStatus = 'Abierto' | 'En revisión' | 'Mitigado';
type NoteType = 'Idea' | 'Importante' | 'Recordatorio' | 'Hallazgo';

interface RedPhase {
  id: number;
  title: string;
  description: string;
  objective: string;
  tasks: string[];
  tools: string[];
  completed: boolean;
}

interface RedFinding {
  id: number;
  code: string;
  title: string;
  category: string;
  severity: FindingSeverity;
  status: FindingStatus;
  evidence: string;
  impact: string;
  recommendation: string;
  createdAt: string;
}

interface FindingExample {
  title: string;
  category: string;
  evidence: string;
  severity: FindingSeverity;
  explanation: string;
}

interface RedNote {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  date: string;
}

interface RedTool {
  name: string;
  initial: string;
  description: string;
  url: string;
  tone: 'blue' | 'orange' | 'purple' | 'red' | 'gray';
}

interface ReportDraft {
  executiveSummary: string;
  scope: string;
  methodology: string;
  generalRecommendations: string;
  conclusion: string;
}

@Component({
  selector: 'app-red-team-assessment',
  imports: [RouterLink],
  templateUrl: './red-team-assessment.html',
  styleUrl: './red-team-assessment.css',
})
export class RedTeamAssessment {
  selectedTab: RedTab = 'summary';
  guideOpen = false;
  showAllTools = false;
  reportCopied = false;

  selectedFindingFilter = 'Todos';
  selectedNoteFilter = 'Todas';

  showFindingForm = false;
  editingFindingId: number | null = null;

  findingTitle = '';
  findingCategory = 'Exposición de servicios';
  findingSeverity: FindingSeverity = 'Media';
  findingStatus: FindingStatus = 'Abierto';
  findingEvidence = '';
  findingImpact = '';
  findingRecommendation = '';

  newNoteTitle = '';
  newNoteContent = '';
  newNoteType: NoteType = 'Idea';

  tabs: { id: RedTab; label: string; icon: string }[] = [
    { id: 'summary', label: 'Resumen', icon: '▣' },
    { id: 'phases', label: 'Fase a fase', icon: '⌘' },
    { id: 'findings', label: 'Hallazgos', icon: 'ⓘ' },
    { id: 'report', label: 'Informe', icon: '▤' },
    { id: 'notes', label: 'Notas', icon: '▫' },
  ];

  summaryFindings = [
    { label: 'Vulnerabilidades críticas', value: '2', detail: 'Prioridad máxima', tone: 'red', icon: '◉' },
    { label: 'Vulnerabilidades altas', value: '4', detail: 'Revisar', tone: 'orange', icon: '⚠' },
    { label: 'Vulnerabilidades medias', value: '6', detail: 'Analizar', tone: 'yellow', icon: '+' },
    { label: 'Servicios identificados', value: '7', detail: 'Enumerados', tone: 'blue', icon: '▤' },
    { label: 'Credenciales de laboratorio', value: '2', detail: 'Validadas', tone: 'purple', icon: '⌁' },
  ];

  tools: RedTool[] = [
    {
      name: 'Nmap',
      initial: 'N',
      description: 'Escaneo de puertos y servicios',
      url: 'https://nmap.org/',
      tone: 'blue',
    },
    {
      name: 'Metasploit Framework',
      initial: 'M',
      description: 'Validación controlada de vulnerabilidades',
      url: 'https://www.metasploit.com/',
      tone: 'blue',
    },
    {
      name: 'Burp Suite',
      initial: 'B',
      description: 'Pruebas de seguridad en aplicaciones web',
      url: 'https://portswigger.net/burp',
      tone: 'orange',
    },
    {
      name: 'Gobuster',
      initial: 'G',
      description: 'Enumeración de directorios y recursos',
      url: 'https://github.com/OJ/gobuster',
      tone: 'blue',
    },
    {
      name: 'John the Ripper',
      initial: 'J',
      description: 'Auditoría de contraseñas en laboratorio',
      url: 'https://www.openwall.com/john/',
      tone: 'purple',
    },
    {
      name: 'Nikto',
      initial: 'Nk',
      description: 'Revisión de configuraciones web conocidas',
      url: 'https://github.com/sullo/nikto',
      tone: 'red',
    },
    {
      name: 'OWASP ZAP',
      initial: 'Z',
      description: 'Análisis de seguridad de aplicaciones web',
      url: 'https://www.zaproxy.org/',
      tone: 'gray',
    },
  ];

  activities = [
    {
      time: '11:24:10',
      activity: 'Escaneo de red completado',
      tool: 'Nmap',
      result: 'Completado ✓',
      resultTone: 'done',
    },
    {
      time: '11:27:33',
      activity: 'Servicio SSH detectado en 10.10.1.5',
      tool: 'Nmap',
      result: 'Completado ✓',
      resultTone: 'done',
    },
    {
      time: '11:31:02',
      activity: 'Servicio vulnerable identificado en laboratorio',
      tool: 'Nmap',
      result: 'Alta',
      resultTone: 'high',
    },
    {
      time: '11:35:18',
      activity: 'Validación controlada completada',
      tool: 'Metasploit',
      result: 'Éxito ✓',
      resultTone: 'done',
    },
    {
      time: '11:42:55',
      activity: 'Acceso obtenido como usuario de laboratorio',
      tool: 'Metasploit',
      result: 'Éxito ✓',
      resultTone: 'done',
    },
    {
      time: '11:48:07',
      activity: 'Revisión de escalada de privilegios',
      tool: 'Linux Exploit Suggester',
      result: 'Pendiente',
      resultTone: 'pending',
    },
  ];

  phases: RedPhase[] = [
    {
      id: 1,
      title: 'Definición del alcance',
      description:
        'Revisa los objetivos permitidos, las restricciones y las reglas de enfrentamiento.',
      objective:
        'Asegurar que todas las pruebas se realizan únicamente dentro del entorno autorizado.',
      tasks: [
        'Confirmar la red y los hosts incluidos.',
        'Registrar las técnicas permitidas y prohibidas.',
        'Definir la ventana de pruebas.',
        'Preparar el registro de evidencias.',
      ],
      tools: ['Guía del caso', 'Notas', 'Checklist de alcance'],
      completed: false,
    },
    {
      id: 2,
      title: 'Reconocimiento y enumeración',
      description:
        'Identifica hosts, puertos, servicios, versiones y superficie de exposición.',
      objective:
        'Construir un mapa técnico inicial sin alterar innecesariamente el entorno.',
      tasks: [
        'Descubrir hosts activos.',
        'Enumerar puertos TCP permitidos.',
        'Identificar servicios y versiones.',
        'Registrar posibles vectores de entrada.',
      ],
      tools: ['Nmap', 'Gobuster', 'Nikto'],
      completed: false,
    },
    {
      id: 3,
      title: 'Análisis de vulnerabilidades',
      description:
        'Relaciona versiones, configuraciones y comportamientos con vulnerabilidades conocidas.',
      objective:
        'Distinguir vulnerabilidades reales de simples indicios o falsos positivos.',
      tasks: [
        'Revisar vulnerabilidades asociadas a los servicios.',
        'Validar manualmente los resultados relevantes.',
        'Comprobar configuraciones débiles.',
        'Priorizar por impacto y explotabilidad.',
      ],
      tools: ['Nmap NSE', 'OWASP ZAP', 'Burp Suite'],
      completed: false,
    },
    {
      id: 4,
      title: 'Validación controlada',
      description:
        'Demuestra el impacto de forma segura y limitada dentro del laboratorio.',
      objective:
        'Confirmar el riesgo sin causar daño, persistencia real ni interrupción del servicio.',
      tasks: [
        'Elegir una prueba de concepto permitida.',
        'Capturar la evidencia mínima necesaria.',
        'Evitar cambios permanentes en el sistema.',
        'Registrar el acceso o impacto conseguido.',
      ],
      tools: ['Metasploit', 'Burp Suite', 'Terminal del laboratorio'],
      completed: false,
    },
    {
      id: 5,
      title: 'Post-explotación y cierre',
      description:
        'Documenta el impacto, elimina artefactos de prueba y redacta las recomendaciones.',
      objective:
        'Cerrar el ejercicio de manera limpia, trazable y profesional.',
      tasks: [
        'Eliminar artefactos creados durante la prueba.',
        'Documentar privilegios y alcance alcanzado.',
        'Crear los hallazgos confirmados.',
        'Generar y revisar el informe final.',
      ],
      tools: ['Hallazgos', 'Informe', 'Checklist de limpieza'],
      completed: false,
    },
  ];

  findings: RedFinding[] = [];

  findingExamples: FindingExample[] = [
    {
      title: 'Servicio expuesto con versión vulnerable',
      category: 'Exposición de servicios',
      evidence:
        'Ejemplo: el servicio identificado publica una versión asociada a una vulnerabilidad conocida.',
      severity: 'Alta',
      explanation:
        'Debes validar la versión, el contexto y la aplicabilidad antes de registrarlo como hallazgo.',
    },
    {
      title: 'Credenciales débiles en un servicio del laboratorio',
      category: 'Autenticación',
      evidence:
        'Ejemplo: el servicio permite autenticación con una credencial incluida en el escenario.',
      severity: 'Crítica',
      explanation:
        'No uses fuerza bruta fuera del laboratorio ni pruebes credenciales reales.',
    },
  ];

  notes: RedNote[] = [
    {
      id: 1,
      title: 'Revisar posible escalada',
      type: 'Importante',
      date: 'Hoy, 11:48',
      content:
        'Se ha identificado una posible vía de escalada en el host de laboratorio. Validar sin modificar el sistema permanentemente.',
    },
    {
      id: 2,
      title: 'Revisar CVE asociada',
      type: 'Recordatorio',
      date: 'Hoy, 11:35',
      content:
        'Comprobar la aplicabilidad de la vulnerabilidad detectada antes de incluirla en el informe.',
    },
  ];

  reportDraft: ReportDraft = {
    executiveSummary:
      'Se ha realizado una evaluación Red Team controlada sobre una infraestructura ficticia incluida en el alcance autorizado.',
    scope:
      'El alcance comprende la red 10.10.1.0/24, los hosts indicados en el laboratorio y los servicios publicados expresamente para la práctica.',
    methodology:
      'La evaluación se ha organizado en definición de alcance, reconocimiento, enumeración, análisis de vulnerabilidades, validación controlada y cierre.',
    generalRecommendations:
      'Aplicar parches, retirar servicios innecesarios, reforzar la autenticación, limitar privilegios y revisar periódicamente la superficie expuesta.',
    conclusion:
      'Los resultados deben interpretarse dentro del contexto del laboratorio. Solo se consideran hallazgos aquellas vulnerabilidades cuya evidencia haya sido validada.',
  };

  findingCategories = [
    'Exposición de servicios',
    'Autenticación',
    'Aplicación web',
    'Configuración',
    'Escalada de privilegios',
    'Credenciales',
    'Segmentación',
    'Otros',
  ];

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

  noteFilters = [
    'Todas',
    'Idea',
    'Importante',
    'Recordatorio',
    'Hallazgo',
  ];

  selectTab(tab: RedTab): void {
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
      phase.id === phaseId
        ? { ...phase, completed: !phase.completed }
        : phase
    );
  }

  isCurrentPhase(index: number): boolean {
    const firstPendingIndex = this.phases.findIndex((phase) => !phase.completed);
    return firstPendingIndex === index;
  }

  openNewFindingForm(): void {
    this.resetFindingForm();
    this.showFindingForm = true;
  }

  closeFindingForm(): void {
    this.showFindingForm = false;
    this.resetFindingForm();
  }

  editFinding(finding: RedFinding): void {
    this.editingFindingId = finding.id;
    this.findingTitle = finding.title;
    this.findingCategory = finding.category;
    this.findingSeverity = finding.severity;
    this.findingStatus = finding.status;
    this.findingEvidence = finding.evidence;
    this.findingImpact = finding.impact;
    this.findingRecommendation = finding.recommendation;
    this.showFindingForm = true;
  }

  saveFinding(): void {
    if (!this.canSaveFinding) {
      return;
    }

    if (this.editingFindingId !== null) {
      this.findings = this.findings.map((finding) =>
        finding.id === this.editingFindingId
          ? {
              ...finding,
              title: this.cleanText(this.findingTitle),
              category: this.findingCategory,
              severity: this.findingSeverity,
              status: this.findingStatus,
              evidence: this.cleanText(this.findingEvidence),
              impact: this.cleanText(this.findingImpact),
              recommendation: this.cleanText(this.findingRecommendation),
            }
          : finding
      );
    } else {
      const finding: RedFinding = {
        id: Date.now(),
        code: this.createFindingCode(),
        title: this.cleanText(this.findingTitle),
        category: this.findingCategory,
        severity: this.findingSeverity,
        status: this.findingStatus,
        evidence: this.cleanText(this.findingEvidence),
        impact: this.cleanText(this.findingImpact),
        recommendation: this.cleanText(this.findingRecommendation),
        createdAt: this.formatCurrentDate(),
      };

      this.findings = [finding, ...this.findings];
    }

    this.closeFindingForm();
  }

  deleteFinding(findingId: number): void {
    if (!window.confirm('¿Seguro que quieres eliminar este hallazgo?')) {
      return;
    }

    this.findings = this.findings.filter((finding) => finding.id !== findingId);
  }

  useFindingExample(example: FindingExample): void {
    this.resetFindingForm();
    this.findingTitle = example.title;
    this.findingCategory = example.category;
    this.findingSeverity = example.severity;
    this.findingEvidence = example.evidence;
    this.showFindingForm = true;
  }

  createNote(): void {
    if (!this.canCreateNote) {
      return;
    }

    const note: RedNote = {
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
    if (!window.confirm('Esto reiniciará las fases, hallazgos, notas y el borrador de esta sesión.')) {
      return;
    }

    this.phases = this.phases.map((phase) => ({ ...phase, completed: false }));
    this.findings = [];
    this.notes = [];
    this.reportDraft = {
      executiveSummary:
        'Se ha realizado una evaluación Red Team controlada sobre una infraestructura ficticia incluida en el alcance autorizado.',
      scope:
        'El alcance comprende la red 10.10.1.0/24, los hosts indicados en el laboratorio y los servicios publicados expresamente para la práctica.',
      methodology:
        'La evaluación se ha organizado en definición de alcance, reconocimiento, enumeración, análisis de vulnerabilidades, validación controlada y cierre.',
      generalRecommendations:
        'Aplicar parches, retirar servicios innecesarios, reforzar la autenticación, limitar privilegios y revisar periódicamente la superficie expuesta.',
      conclusion:
        'Los resultados deben interpretarse dentro del contexto del laboratorio. Solo se consideran hallazgos aquellas vulnerabilidades cuya evidencia haya sido validada.',
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

  updateGeneralRecommendations(value: string): void {
    this.reportDraft = {
      ...this.reportDraft,
      generalRecommendations: this.limitText(value, 3000),
    };
  }

  updateConclusion(value: string): void {
    this.reportDraft = { ...this.reportDraft, conclusion: this.limitText(value, 3000) };
  }

  printReport(): void {
    window.print();
  }

  async copyReportSummary(): Promise<void> {
    const summary = [
      'Informe Red Team Assessment',
      '',
      this.reportDraft.executiveSummary,
      '',
      `Hallazgos: ${this.findings.length}`,
      ...this.findings.map(
        (finding) => `- ${finding.code}: ${finding.title} (${finding.severity})`
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

  get visibleTools(): RedTool[] {
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

  get filteredFindings(): RedFinding[] {
    if (this.selectedFindingFilter === 'Todos') return this.findings;

    return this.findings.filter(
      (finding) =>
        finding.severity === this.selectedFindingFilter ||
        finding.status === this.selectedFindingFilter
    );
  }

  get filteredNotes(): RedNote[] {
    if (this.selectedNoteFilter === 'Todas') return this.notes;
    return this.notes.filter((note) => note.type === this.selectedNoteFilter);
  }

  get highFindingsCount(): number {
    return this.findings.filter(
      (finding) => finding.severity === 'Alta' || finding.severity === 'Crítica'
    ).length;
  }

  get mitigatedFindingsCount(): number {
    return this.findings.filter((finding) => finding.status === 'Mitigado').length;
  }

  get canSaveFinding(): boolean {
    return (
      this.findingTitle.trim().length >= 5 &&
      this.findingEvidence.trim().length >= 10 &&
      this.findingImpact.trim().length >= 10 &&
      this.findingRecommendation.trim().length >= 10
    );
  }

  get canCreateNote(): boolean {
    return (
      this.newNoteTitle.trim().length > 0 &&
      this.newNoteContent.trim().length > 0
    );
  }

  get reportSeveritySummary(): string {
    const critical = this.findings.filter((finding) => finding.severity === 'Crítica').length;
    const high = this.findings.filter((finding) => finding.severity === 'Alta').length;
    const medium = this.findings.filter((finding) => finding.severity === 'Media').length;
    const low = this.findings.filter((finding) => finding.severity === 'Baja').length;
    return `${critical} críticos · ${high} altos · ${medium} medios · ${low} bajos`;
  }

  get reportDate(): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date());
  }

  private resetFindingForm(): void {
    this.editingFindingId = null;
    this.findingTitle = '';
    this.findingCategory = 'Exposición de servicios';
    this.findingSeverity = 'Media';
    this.findingStatus = 'Abierto';
    this.findingEvidence = '';
    this.findingImpact = '';
    this.findingRecommendation = '';
  }

  private createFindingCode(): string {
    return `RED-${String(this.findings.length + 1).padStart(3, '0')}`;
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