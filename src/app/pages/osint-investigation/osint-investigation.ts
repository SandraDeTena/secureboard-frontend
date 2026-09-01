import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CasePhaseProgress } from '../../core/models/case-phase-progress.model';

import { TrainingCaseDetail } from '../../core/models/training-case.model';
import { CasesService } from '../../core/services/cases.service';

type OsintTab = 'summary' | 'phases' | 'findings' | 'report' | 'notes';

type Tone = 'purple' | 'blue' | 'orange' | 'green' | 'red' | 'gray';

type NoteType = 'Idea' | 'Importante' | 'Recordatorio' | 'Hallazgo';

type FindingSeverity = 'Baja' | 'Media' | 'Alta' | 'Crítica';

type FindingStatus = 'Abierto' | 'En revisión' | 'Mitigado';

interface OsintPhase {
  id: number;
  title: string;
  description: string;
  objective: string;
  tasks: string[];
  tools: string[];
  completed: boolean;
}

interface OsintFinding {
  id: number;
  code: string;
  title: string;
  category: string;
  severity: FindingSeverity;
  status: FindingStatus;
  evidence: string;
  risk: string;
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

interface OsintReportDraft {
  executiveSummary: string;
  scope: string;
  methodology: string;
  generalRecommendations: string;
  conclusion: string;
}

interface OsintNote {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  date: string;
}

interface OsintTool {
  name: string;
  initial: string;
  description: string;
  url: string;
  tone: Tone;
}

@Component({
  selector: 'app-osint-investigation',
  imports: [RouterLink],
  templateUrl: './osint-investigation.html',
  styleUrl: './osint-investigation.css',
})
export class Osint implements OnInit {
  private readonly casesService = inject(CasesService);
  private readonly destroyRef = inject(DestroyRef);

  caseData: TrainingCaseDetail | null = null;
  loadingCase = true;
  caseLoadError = '';
  selectedTab: OsintTab = 'summary';
  guideOpen = false;
  showAllTools = false;
  showFindingForm = false;
  reportCopied = false;
  reportGenerated = false;

  selectedFindingFilter = 'Todos';
  selectedNoteFilter = 'Todas';
  editingFindingId: number | null = null;

  newNoteTitle = '';
  newNoteContent = '';
  newNoteType: NoteType = 'Idea';

  findingTitle = '';
  findingCategory = 'DNS';
  findingSeverity: FindingSeverity = 'Media';
  findingStatus: FindingStatus = 'Abierto';
  findingEvidence = '';
  findingRisk = '';
  findingRecommendation = '';

  tabs: {
    id: OsintTab;
    label: string;
    icon: string;
  }[] = [
    { id: 'summary', label: 'Resumen', icon: '▣' },
    { id: 'phases', label: 'Fase a fase', icon: '⌘' },
    { id: 'findings', label: 'Hallazgos', icon: 'ⓘ' },
    { id: 'report', label: 'Informe', icon: '▤' },
    { id: 'notes', label: 'Notas', icon: '▫' },
  ];

  domainData = [
    { label: 'IP Dirección', value: '104.21.16.1' },
    { label: 'Servidor', value: 'cloudflare' },
    { label: 'País', value: '🇺🇸 Estados Unidos' },
    { label: 'Fecha de registro', value: '2021-05-18' },
    { label: 'Fecha de expiración', value: '2026-05-18' },
    { label: 'Registrador', value: 'GoDaddy.com, LLC' },
  ];

  foundInformation = [
    { label: 'Subdominios', value: '12' },
    { label: 'Registros DNS', value: '28' },
    { label: 'Puertos abiertos', value: '7' },
    { label: 'Tecnologías', value: '9' },
    { label: 'Emails encontrados', value: '3' },
    { label: 'Filtros de Google', value: '15' },
  ];

  summaryFindings = [
    {
      icon: '◎',
      label: 'Subdominios',
      value: '12',
      detail: '+3 nuevos',
      tone: 'purple',
    },
    {
      icon: '⊙',
      label: 'Registros DNS',
      value: '28',
      detail: 'Ver detalles →',
      tone: 'blue',
    },
    {
      icon: '⌘',
      label: 'Puertos abiertos',
      value: '7',
      detail: 'Ver detalles →',
      tone: 'orange',
    },
    {
      icon: '▱',
      label: 'Tecnologías',
      value: '9',
      detail: 'Ver detalles →',
      tone: 'green',
    },
    {
      icon: '✉',
      label: 'Emails encontrados',
      value: '3',
      detail: 'Ver detalles →',
      tone: 'red',
    },
  ];

  recentActivity = [
    {
      time: '10:24',
      activity: 'WHOIS lookup realizado',
      source: 'whois.neolandsecure.com',
      tool: 'Whois',
    },
    {
      time: '10:18',
      activity: 'DNS enumeración completada',
      source: 'dnsdumpster.com',
      tool: 'DNSDumpster',
    },
    {
      time: '10:12',
      activity: 'Subdominios encontrados',
      source: 'subfinder -d neolandsecure.com',
      tool: 'Subfinder',
    },
    {
      time: '10:05',
      activity: 'Tecnologías detectadas',
      source: 'builtwith.com',
      tool: 'BuiltWith',
    },
  ];

  tools: OsintTool[] = [
    {
      name: 'Whois',
      initial: 'W',
      description: 'Información de registro del dominio',
      url: 'https://lookup.icann.org/',
      tone: 'purple',
    },
    {
      name: 'DNSDumpster',
      initial: 'D',
      description: 'Enumeración DNS y subdominios',
      url: 'https://dnsdumpster.com/',
      tone: 'blue',
    },
    {
      name: 'TheHarvester',
      initial: 'T',
      description: 'Recolección de emails y hosts',
      url: 'https://github.com/laramies/theHarvester',
      tone: 'blue',
    },
    {
      name: 'Shodan',
      initial: 'S',
      description: 'Búsqueda de dispositivos e IPs',
      url: 'https://www.shodan.io/',
      tone: 'gray',
    },
    {
      name: 'Google Dorks',
      initial: 'G',
      description: 'Búsquedas avanzadas',
      url: 'https://www.google.com/',
      tone: 'gray',
    },
    {
      name: 'VirusTotal',
      initial: 'V',
      description: 'Reputación de URLs y dominios',
      url: 'https://www.virustotal.com/',
      tone: 'blue',
    },
    {
      name: 'crt.sh',
      initial: 'C',
      description: 'Certificados y subdominios',
      url: 'https://crt.sh/',
      tone: 'green',
    },
    {
      name: 'Wayback Machine',
      initial: 'A',
      description: 'Versiones antiguas de sitios web',
      url: 'https://web.archive.org/',
      tone: 'orange',
    },
    {
      name: 'MXToolbox',
      initial: 'M',
      description: 'Registros MX y seguridad del correo',
      url: 'https://mxtoolbox.com/',
      tone: 'red',
    },
  ];

  phases: OsintPhase[] = [
    {
      id: 1,
      title: 'Definición del alcance',
      description: 'Establece qué información se analizará y cuáles son los límites del ejercicio.',
      objective: 'Definir un alcance claro antes de comenzar la investigación.',
      tasks: [
        'Identificar el dominio objetivo.',
        'Confirmar que el ejercicio está autorizado.',
        'Definir qué tipos de datos se recopilarán.',
        'Registrar la fecha de inicio.',
      ],
      tools: ['Guía del caso', 'Bloc de notas'],
      completed: false,
    },
    {
      id: 2,
      title: 'Información del dominio',
      description: 'Consulta los datos públicos de registro, fechas y proveedor asociado.',
      objective: 'Recopilar datos básicos del dominio mediante fuentes públicas.',
      tasks: [
        'Consultar el registro WHOIS.',
        'Identificar registrador y fechas.',
        'Localizar los nameservers.',
        'Registrar la dirección IP asociada.',
      ],
      tools: ['ICANN Lookup', 'Whois', 'MXToolbox'],
      completed: false,
    },
    {
      id: 3,
      title: 'DNS y subdominios',
      description: 'Analiza los registros DNS e identifica servicios y subdominios públicos.',
      objective: 'Construir un mapa inicial de la infraestructura pública.',
      tasks: [
        'Revisar registros A, MX, TXT y NS.',
        'Localizar subdominios públicos.',
        'Consultar certificados TLS.',
        'Documentar los servicios encontrados.',
      ],
      tools: ['DNSDumpster', 'crt.sh', 'SecurityTrails'],
      completed: false,
    },
    {
      id: 4,
      title: 'Exposición pública',
      description:
        'Revisa tecnologías, servicios visibles, correos y paneles potencialmente expuestos.',
      objective: 'Identificar información que pueda aumentar la superficie de exposición.',
      tasks: [
        'Identificar tecnologías utilizadas.',
        'Revisar servicios públicos asociados a la IP.',
        'Buscar correos publicados.',
        'Comprobar versiones antiguas de la web.',
      ],
      tools: ['Shodan', 'TheHarvester', 'Wayback Machine'],
      completed: false,
    },
    {
      id: 5,
      title: 'Análisis y recomendaciones',
      description: 'Valora la información recopilada y redacta recomendaciones de seguridad.',
      objective: 'Convertir las evidencias en conclusiones útiles y documentadas.',
      tasks: [
        'Clasificar los hallazgos.',
        'Valorar el nivel de riesgo.',
        'Redactar recomendaciones.',
        'Generar el informe final.',
      ],
      tools: ['Hallazgos', 'Informe', 'Notas'],
      completed: false,
    },
  ];

  findings: OsintFinding[] = [];

  findingExamples: FindingExample[] = [
    {
      title: 'Panel de administración públicamente identificable',
      category: 'Exposición web',
      evidence: 'Ejemplo: se identifica una ruta pública como /wp-admin.',
      severity: 'Media',
      explanation:
        'Este ejemplo sirve para aprender cómo redactar un hallazgo. No se añade automáticamente a tu investigación.',
    },
    {
      title: 'Subdominio antiguo todavía publicado',
      category: 'DNS',
      evidence: 'Ejemplo: old.example.com continúa resolviendo públicamente.',
      severity: 'Media',
      explanation:
        'Comprueba siempre si el subdominio pertenece al alcance autorizado antes de registrarlo.',
    },
  ];

  findingCategories = [
    'DNS',
    'Exposición web',
    'Infraestructura',
    'Tecnologías',
    'Correo',
    'Identidad',
    'Metadatos',
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

  reportDraft: OsintReportDraft = {
    executiveSummary:
      'Se ha realizado una investigación OSINT utilizando exclusivamente fuentes abiertas y dentro del alcance autorizado.',
    scope:
      'El análisis comprende el dominio del laboratorio, sus registros DNS, subdominios, tecnologías visibles y exposición pública.',
    methodology:
      'La investigación se ha organizado en las fases de definición de alcance, análisis de dominio, enumeración DNS, revisión de exposición pública y valoración de resultados.',
    generalRecommendations:
      'Revisar periódicamente la superficie pública, retirar servicios innecesarios y reducir la exposición de información que pueda facilitar ataques dirigidos.',
    conclusion:
      'La información pública localizada debe valorarse en su contexto. La presencia de un servicio o tecnología no implica por sí sola una vulnerabilidad.',
  };

  notes: OsintNote[] = [
    {
      id: 1,
      title: 'Resumen de la primera revisión',
      type: 'Importante',
      date: 'Hoy, 10:25',
      content:
        'Dominio protegido por Cloudflare. Se detectaron 12 subdominios activos, los puertos 443 y 80 y una posible ruta de administración en /wp-admin.',
    },
  ];

  noteFilters = ['Todas', 'Idea', 'Importante', 'Recordatorio', 'Hallazgo'];

  ngOnInit(): void {
    this.loadCase();
  }

  retryLoadCase(): void {
    this.loadCase();
  }

  private loadCase(): void {
    this.loadingCase = true;
    this.caseLoadError = '';

    this.casesService
      .getCaseBySlug('osint-investigation')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (caseData) => {
          this.caseData = caseData;
          this.loadingCase = false;

          this.loadPhaseProgress();
           this.loadFindings();
        },
        error: (error: HttpErrorResponse) => {
          console.error('No se ha podido cargar el caso OSINT:', error);
          this.caseLoadError = error.status === 401
            ? 'Tu sesión ha caducado. Inicia sesión de nuevo.'
            : 'No se ha podido cargar el caso OSINT desde el backend.';
          this.loadingCase = false;
        },
      });
  }

  get difficultyLabel(): string {
    switch (this.caseData?.difficulty) {
      case 'EASY': return 'Fácil';
      case 'MEDIUM': return 'Media';
      case 'HARD': return 'Difícil';
      default: return 'Cargando';
    }
  }

  get difficultyDots(): number {
    switch (this.caseData?.difficulty) {
      case 'EASY': return 2;
      case 'MEDIUM': return 3;
      case 'HARD': return 5;
      default: return 0;
    }
  }

  selectTab(tab: OsintTab): void {
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

  const phase = this.phases.find(
    (p) => p.id === phaseId
  );

  if (!phase) {
    return;
  }

  if (phase.completed) {
    return;
  }

  this.casesService
    .completePhase(
      'osint-investigation',
      phaseId
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({

      next: () => {

        this.phases = this.phases.map((p) =>
          p.id === phaseId
            ? { ...p, completed: true }
            : p
        );

      },

      error: (error) => {
        console.error(
          'Error guardando la fase',
          error
        );
      },

    });

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

  editFinding(finding: OsintFinding): void {
    this.editingFindingId = finding.id;
    this.findingTitle = finding.title;
    this.findingCategory = finding.category;
    this.findingSeverity = finding.severity;
    this.findingStatus = finding.status;
    this.findingEvidence = finding.evidence;
    this.findingRisk = finding.risk;
    this.findingRecommendation = finding.recommendation;
    this.showFindingForm = true;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  saveFinding(): void {
  if (!this.canSaveFinding) {
    return;
  }

  const findingData = {
    code:
      this.editingFindingId !== null
        ? this.findings.find(
            (finding) => finding.id === this.editingFindingId
          )?.code ?? this.createFindingCode()
        : this.createFindingCode(),

    title: this.cleanText(this.findingTitle),
    category: this.findingCategory,
    severity: this.findingSeverity,
    status: this.findingStatus,
    evidence: this.cleanText(this.findingEvidence),
    risk: this.cleanText(this.findingRisk),
    recommendation: this.cleanText(this.findingRecommendation),
  };

  if (this.editingFindingId !== null) {
    this.casesService
      .updateFinding(
        'osint-investigation',
        this.editingFindingId,
        findingData
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedFinding) => {
          this.findings = this.findings.map((finding) =>
            finding.id === this.editingFindingId
              ? updatedFinding
              : finding
          );

          this.closeFindingForm();
        },
        error: (error) => {
          console.error(
            'No se pudo actualizar el hallazgo:',
            error
          );
        },
      });

    return;
  }

  this.casesService
    .createFinding(
      'osint-investigation',
      findingData
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (createdFinding) => {
        this.findings = [
          createdFinding,
          ...this.findings,
        ];

        this.closeFindingForm();
      },
      error: (error) => {
        console.error(
          'No se pudo guardar el hallazgo:',
          error
        );
      },
    });
  }

  deleteFinding(findingId: number): void {
  const confirmed = window.confirm(
    '¿Seguro que quieres eliminar este hallazgo?'
  );

  if (!confirmed) {
    return;
  }

  this.casesService
    .deleteFinding(
      'osint-investigation',
      findingId
    )
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.findings = this.findings.filter(
          (finding) => finding.id !== findingId
        );
      },
      error: (error) => {
        console.error(
          'No se pudo eliminar el hallazgo:',
          error
        );
      },
    });
  } 

  useFindingExample(example: FindingExample): void {
    this.resetFindingForm();
    this.findingTitle = example.title;
    this.findingCategory = example.category;
    this.findingSeverity = example.severity;
    this.findingEvidence = example.evidence;
    this.showFindingForm = true;
  }

  generateReport(): void {
    this.reportGenerated = true;
    this.selectTab('report');
  }

  resetLaboratory(): void {
    const confirmed = window.confirm(
      'Esto eliminará los hallazgos, las notas, el progreso y reiniciará el borrador de esta sesión.',
    );

    if (!confirmed) {
      return;
    }

    this.findings = [];
    this.notes = [];
    this.phases = this.phases.map((phase) => ({
      ...phase,
      completed: false,
    }));
    this.reportGenerated = false;
    this.showFindingForm = false;
    this.resetFindingForm();

    this.reportDraft = {
      executiveSummary:
        'Se ha realizado una investigación OSINT utilizando exclusivamente fuentes abiertas y dentro del alcance autorizado.',
      scope:
        'El análisis comprende el dominio del laboratorio, sus registros DNS, subdominios, tecnologías visibles y exposición pública.',
      methodology:
        'La investigación se ha organizado en las fases de definición de alcance, análisis de dominio, enumeración DNS, revisión de exposición pública y valoración de resultados.',
      generalRecommendations:
        'Revisar periódicamente la superficie pública, retirar servicios innecesarios y reducir la exposición de información que pueda facilitar ataques dirigidos.',
      conclusion:
        'La información pública localizada debe valorarse en su contexto. La presencia de un servicio o tecnología no implica por sí sola una vulnerabilidad.',
    };
  }

  updateExecutiveSummary(value: string): void {
    this.reportDraft = {
      ...this.reportDraft,
      executiveSummary: this.limitText(value, 3000),
    };
  }

  updateScope(value: string): void {
    this.reportDraft = {
      ...this.reportDraft,
      scope: this.limitText(value, 3000),
    };
  }

  updateMethodology(value: string): void {
    this.reportDraft = {
      ...this.reportDraft,
      methodology: this.limitText(value, 3000),
    };
  }

  updateGeneralRecommendations(value: string): void {
    this.reportDraft = {
      ...this.reportDraft,
      generalRecommendations: this.limitText(value, 3000),
    };
  }

  updateConclusion(value: string): void {
    this.reportDraft = {
      ...this.reportDraft,
      conclusion: this.limitText(value, 3000),
    };
  }

  createNote(): void {
    if (!this.canCreateNote) {
      return;
    }

    const note: OsintNote = {
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

  printReport(): void {
    window.print();
  }

  async copyReportSummary(): Promise<void> {
    const summary = [
      'Informe OSINT - neolandsecure.com',
      '',
      this.reportDraft.executiveSummary,
      '',
      `Hallazgos registrados: ${this.findings.length}`,
      ...this.findings.map(
        (finding) => `- ${finding.code}: ${finding.title} (${finding.severity})`,
      ),
      '',
      `Conclusión: ${this.reportDraft.conclusion}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      this.reportCopied = true;

      window.setTimeout(() => {
        this.reportCopied = false;
      }, 2500);
    } catch {
      this.reportCopied = false;
    }
  }

  get visibleTools(): OsintTool[] {
    return this.showAllTools ? this.tools : this.tools.slice(0, 5);
  }

  get completedPhases(): number {
    return this.phases.filter((phase) => phase.completed).length;
  }

  get progressPercentage(): number {
    return Math.round((this.completedPhases / this.phases.length) * 100);
  }

  get caseStatus(): string {
    if (this.progressPercentage === 0) {
      return 'No iniciado';
    }

    if (this.progressPercentage === 100) {
      return 'Completado';
    }

    return 'En progreso';
  }

  get filteredFindings(): OsintFinding[] {
    if (this.selectedFindingFilter === 'Todos') {
      return this.findings;
    }

    return this.findings.filter(
      (finding) =>
        finding.severity === this.selectedFindingFilter ||
        finding.status === this.selectedFindingFilter,
    );
  }

  get filteredNotes(): OsintNote[] {
    if (this.selectedNoteFilter === 'Todas') {
      return this.notes;
    }

    return this.notes.filter((note) => note.type === this.selectedNoteFilter);
  }

  get highFindingsCount(): number {
    return this.findings.filter(
      (finding) => finding.severity === 'Alta' || finding.severity === 'Crítica',
    ).length;
  }

  get mitigatedFindingsCount(): number {
    return this.findings.filter((finding) => finding.status === 'Mitigado').length;
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
    return this.newNoteTitle.trim().length > 0 && this.newNoteContent.trim().length > 0;
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
    this.findingCategory = 'DNS';
    this.findingSeverity = 'Media';
    this.findingStatus = 'Abierto';
    this.findingEvidence = '';
    this.findingRisk = '';
    this.findingRecommendation = '';
  }

  private createFindingCode(): string {
  const existingNumbers = this.findings
    .map((finding) => {
      const match = finding.code.match(/OSINT-(\d+)/);
      return match ? Number(match[1]) : 0;
    });

  const maxNumber = existingNumbers.length > 0
    ? Math.max(...existingNumbers)
    : 0;

  const nextNumber = maxNumber + 1;

  return `OSINT-${String(nextNumber).padStart(3, '0')}`;
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

  private loadPhaseProgress(): void {
  this.casesService
    .getPhaseProgress('osint-investigation')
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (progress: CasePhaseProgress[]) => {

        this.phases = this.phases.map((phase) => {
          const saved = progress.find(
            (p) => p.phaseNumber === phase.id
          );

          return {
            ...phase,
            completed: saved?.completed ?? false,
          };
        });

      },
      error: (error) => {
        console.error(
          'No se pudo cargar el progreso:',
          error
        );
      },
    });
  }

  private loadFindings(): void {
  this.casesService
    .getFindings('osint-investigation')
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (findings) => {
        this.findings = findings;
      },
      error: (error) => {
        console.error(
          'No se pudieron cargar los hallazgos:',
          error
        );
      },
    });
  }
}