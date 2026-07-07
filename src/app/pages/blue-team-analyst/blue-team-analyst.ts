import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blue-team-analyst',
  imports: [RouterLink],
  templateUrl: './blue-team-analyst.html',
  styleUrl: './blue-team-analyst.css',
})
export class BlueTeamAnalyst {
  findings = [
    { label: 'Alertas críticas', value: '4', detail: 'Ver detalles →', tone: 'red', icon: '♙' },
    { label: 'Alertas altas', value: '6', detail: 'Ver detalles →', tone: 'orange', icon: '⚠' },
    { label: 'Hosts afectados', value: '3', detail: 'Ver detalles →', tone: 'purple', icon: '▣' },
    { label: 'IoCs encontrados', value: '0 / 6', detail: 'Ver detalles →', tone: 'green', icon: '☼' },
    { label: 'Evidencias', value: '8', detail: 'Ver detalles →', tone: 'blue', icon: '▱' },
  ];

  tools = [
    { name: 'Splunk (SIEM)', text: 'Análisis de logs y correlación de eventos', icon: '➤', tone: 'green' },
    { name: 'Wireshark', text: 'Análisis de tráfico de red', icon: '◒', tone: 'blue' },
    { name: 'Sysmon Logs', text: 'Monitorización avanzada de Windows', icon: '▣', tone: 'blue' },
    { name: 'Wazuh', text: 'Detección de amenazas y HIDS', icon: 'W', tone: 'blue' },
    { name: 'VirusTotal', text: 'Análisis de archivos y URLs', icon: '▷', tone: 'indigo' },
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

  notes = [
    {
      time: '10:25',
      tag: 'Importante',
      tone: 'important',
      text: 'El tráfico saliente se dirige a 185.199.109.153:443',
    },
    {
      time: '10:18',
      tag: 'Recordatorio',
      tone: 'reminder',
      text: 'Verificar hash del archivo descargado en VirusTotal',
    },
    {
      time: '10:12',
      tag: 'Idea',
      tone: 'idea',
      text: 'Correlacionar eventos con línea de tiempo',
    },
  ];
}
