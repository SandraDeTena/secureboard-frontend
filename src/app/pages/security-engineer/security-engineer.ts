import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-security-engineer',
  imports: [RouterLink],
  templateUrl: './security-engineer.html',
  styleUrl: './security-engineer.css',
})
export class SecurityEngineer {
  keyInfo = [
    { label: 'Activos a proteger', value: '12' },
    { label: 'Controles a implementar', value: '6' },
    { label: 'Vulnerabilidades iniciales', value: '15+' },
    { label: 'Nivel de madurez actual', value: 'Bajo' },
    { label: 'Nivel de madurez objetivo', value: 'Alto' },
    { label: 'Tiempo asignado', value: '01:45:00' },
    { label: 'Cobertura requerida', value: '100%' },
  ];

  controls = [
    { icon: '▦', name: 'Firewall', value: '1 / 1' },
    { icon: '⌘', name: 'Segmentación de red', value: '1 / 1' },
    { icon: '♜', name: 'Sistema de IDS/IPS', value: '0 / 1' },
    { icon: '▣', name: 'Cifrado de datos', value: '1 / 1' },
    { icon: '⚙', name: 'Gestión de parches', value: '0 / 1' },
    { icon: '♙', name: 'Políticas de acceso', value: '0 / 1' },
  ];

  tools = [
    {
      icon: '◉',
      name: 'pfSense',
      description: 'Firewall de código abierto',
    },
    {
      icon: '◈',
      name: 'Suricata',
      description: 'Sistema de detección de intrusos',
    },
    {
      icon: '◉',
      name: 'OpenVAS',
      description: 'Escáner de vulnerabilidades',
    },
    {
      icon: '◍',
      name: 'Lynis',
      description: 'Auditoría de seguridad',
    },
    {
      icon: '▣',
      name: 'Nessus Essentials',
      description: 'Evaluación de vulnerabilidades',
    },
  ];

  activities = [
    {
      time: '11:32:18',
      action: 'Análisis de la infraestructura actual',
      tool: 'Nmap',
      status: 'Completado',
      tone: 'completed',
    },
    {
      time: '11:45:27',
      action: 'Configuración de reglas de firewall',
      tool: 'pfSense',
      status: 'Completado',
      tone: 'completed',
    },
    {
      time: '12:02:44',
      action: 'Segmentación de red implementada',
      tool: 'VLANs',
      status: 'Completado',
      tone: 'completed',
    },
    {
      time: '12:18:10',
      action: 'Instalación de Suricata (IDS)',
      tool: 'Suricata',
      status: 'En progreso',
      tone: 'in-progress',
    },
    {
      time: '12:25:33',
      action: 'Revisión de políticas de acceso',
      tool: 'LDAP / AD',
      status: 'Pendiente',
      tone: 'pending',
    },
  ];

  notes = [
    {
      time: 'Hoy, 12:05',
      tag: 'Importante',
      type: 'important',
      text: 'Actualizar reglas de firewall antes de la fase de validación.',
    },
    {
      time: 'Hoy, 11:50',
      tag: 'Recordatorio',
      type: 'reminder',
      text: 'Verificar que existen siete segmentos de red.',
    },
    {
      time: 'Hoy, 11:20',
      tag: 'Idea',
      type: 'idea',
      text: 'Implementar autenticación multifactor para VPN.',
    },
  ];
}