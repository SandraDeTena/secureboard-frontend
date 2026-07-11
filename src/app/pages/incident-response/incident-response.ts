import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incident-response',
  imports: [RouterLink],
  templateUrl: './incident-response.html',
  styleUrl: './incident-response.css',
})
export class IncidentResponse {
  keyInfo = [
    { label: 'Alerta inicial', value: 'SIEM - Alta criticidad' },
    { label: 'Hora de detección', value: '09:42 AM' },
    { label: 'Sistemas afectados', value: '3' },
    { label: 'Usuarios potencialmente comprometidos', value: '7' },
    { label: 'Indicador principal', value: 'Ransomware' },
    { label: 'Tiempo asignado', value: '02:30:00' },
  ];

  phases = [
    {
      icon: '♜',
      title: '1. Identificación',
      text: 'Detectar y validar el incidente',
      active: true,
    },
    { icon: '♙', title: '2. Contención', text: 'Aislar sistemas afectados', active: false },
    {
      icon: '♢',
      title: '3. Erradicación',
      text: 'Eliminar la amenaza y persistencia',
      active: false,
    },
    { icon: '⌘', title: '4. Recuperación', text: 'Restaurar servicios y datos', active: false },
    {
      icon: '▣',
      title: '5. Lecciones aprendidas',
      text: 'Documentar y mejorar controles',
      active: false,
    },
  ];

  indicators = [
    { label: 'Tipo de amenaza', value: 'Ransomware', tone: '' },
    { label: 'Vector de ataque', value: 'Phishing', tone: '' },
    { label: 'Estado', value: 'En investigación', tone: 'warning' },
    { label: 'Impacto', value: 'Alto', tone: 'danger' },
    { label: 'Prioridad', value: 'Crítica', tone: 'danger' },
  ];

  tools = [
    { icon: 'S', name: 'Splunk (SIEM)', description: 'Análisis y correlación de eventos' },
    { icon: 'H', name: 'TheHive', description: 'Gestión de incidentes y tareas' },
    { icon: 'V', name: 'Volatility', description: 'Análisis forense de memoria' },
    { icon: 'W', name: 'Wireshark', description: 'Análisis de tráfico de red' },
    { icon: 'Y', name: 'YARA', description: 'Detección de malware' },
    { icon: 'R', name: 'Rsyslog / ELK', description: 'Análisis de logs' },
  ];

  activities = [
    {
      time: '09:42:15',
      action: 'Alerta de posible ransomware detectada',
      tool: 'Splunk',
      owner: 'Sistema',
      status: 'Completado',
      tone: 'completed',
    },
    {
      time: '09:45:02',
      action: 'Análisis inicial de logs en SIEM',
      tool: 'Splunk',
      owner: 'Sandra De Tena',
      status: 'Completado',
      tone: 'completed',
    },
    {
      time: '09:48:19',
      action: 'Aislamiento de endpoint WIN-10-23',
      tool: 'TheHive',
      owner: 'Sandra De Tena',
      status: 'En progreso',
      tone: 'in-progress',
    },
    {
      time: '09:53:41',
      action: 'Captura de memoria del servidor SRV-DC01',
      tool: 'Volatility',
      owner: 'Sandra De Tena',
      status: 'Pendiente',
      tone: 'pending',
    },
    {
      time: '09:55:08',
      action: 'Análisis de tráfico sospechoso',
      tool: 'Wireshark',
      owner: 'Sandra De Tena',
      status: 'Pendiente',
      tone: 'pending',
    },
  ];

  notes = [
    {
      time: 'Hoy, 09:44',
      tag: 'Importante',
      type: 'important',
      text: 'No reiniciar sistemas afectados hasta completar análisis.',
    },
    {
      time: 'Hoy, 09:51',
      tag: 'Recordatorio',
      type: 'reminder',
      text: 'Verificar copias de seguridad disponibles.',
    },
    {
      time: 'Hoy, 09:58',
      tag: 'Idea',
      type: 'idea',
      text: 'Revisar políticas de filtrado de correo.',
    },
  ];
}
