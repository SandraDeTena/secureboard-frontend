import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-red-team-assessment',
  imports: [RouterLink],
  templateUrl: './red-team-assessment.html',
  styleUrl: './red-team-assessment.css',
})
export class RedTeamAssessment {
  findings = [
    { label: 'Vulnerabilidades críticas', value: '2', detail: 'Ver detalles →', tone: 'red', icon: '⬡' },
    { label: 'Vulnerabilidades altas', value: '4', detail: 'Ver detalles →', tone: 'orange', icon: '⚠' },
    { label: 'Vulnerabilidades medias', value: '6', detail: 'Ver detalles →', tone: 'yellow', icon: '✚' },
    { label: 'Servicios identificados', value: '7', detail: 'Ver detalles →', tone: 'blue', icon: '▤' },
    { label: 'Credenciales obtenidas', value: '2', detail: 'Ver detalles →', tone: 'red', icon: '⌁' },
  ];

  tools = [
    { name: 'Nmap', text: 'Escaneo de puertos y servicios', icon: '◉', tone: 'blue' },
    { name: 'Metasploit Framework', text: 'Explotación de vulnerabilidades', icon: 'M', tone: 'blue' },
    { name: 'Burp Suite', text: 'Pruebas de aplicaciones web', icon: 'B', tone: 'orange' },
    { name: 'Gobuster', text: 'Fuerza bruta de directorios', icon: '▣', tone: 'blue' },
    { name: 'John the Ripper', text: 'Cracking de contraseñas', icon: 'J', tone: 'indigo' },
  ];

  activities = [
    { time: '11:24:10', activity: 'Escaneo de red completado', tool: 'Nmap', status: 'Completado ✓', statusTone: 'done' },
    { time: '11:27:33', activity: 'Servicio SSH detectado en 10.10.1.5', tool: 'Nmap', status: 'Completado ✓', statusTone: 'done' },
    { time: '11:31:02', activity: 'Vulnerabilidad encontrada: vsftpd 2.3.4', tool: 'Nmap', status: 'Alta', statusTone: 'danger' },
    { time: '11:35:18', activity: 'Explotación de vsftpd exitosa', tool: 'Metasploit', status: 'Éxito ✓', statusTone: 'done' },
    { time: '11:42:55', activity: 'Acceso obtenido como usuario: user', tool: 'Metasploit', status: 'Éxito ✓', statusTone: 'done' },
    { time: '11:48:07', activity: 'Escalada de privilegios a root', tool: 'Linux Exploit Suggester', status: 'Pendiente', statusTone: 'pending' },
  ];

  notes = [
    {
      time: '11:48',
      tag: 'Importante',
      tone: 'important',
      text: 'Encontrada posible escalada de privilegios con sudo -l',
    },
    {
      time: '11:35',
      tag: 'Recordatorio',
      tone: 'reminder',
      text: 'Revisar CVE-2011-2523 - vsftpd backdoor',
    },
    {
      time: '11:10',
      tag: 'Idea',
      tone: 'idea',
      text: 'Probar fuerza bruta en /login con rockyou.txt',
    },
  ];
}