import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-osint-investigation',
  imports: [RouterLink],
  templateUrl: './osint-investigation.html',
  styleUrl: './osint-investigation.css',
})
export class OsintInvestigation {
  findings = [
    { label: 'Subdominios', value: '12', detail: '+3 nuevos', tone: 'purple', icon: '◎' },
    { label: 'Registros DNS', value: '28', detail: 'Ver detalles →', tone: 'blue', icon: '◉' },
    { label: 'Puertos abiertos', value: '7', detail: 'Ver detalles →', tone: 'orange', icon: '⌘' },
    { label: 'Tecnologías', value: '9', detail: 'Ver detalles →', tone: 'green', icon: '▱' },
    { label: 'Emails encontrados', value: '3', detail: 'Ver detalles →', tone: 'red', icon: '✉' },
  ];

  tools = [
    { name: 'Whois', text: 'Información de registro del dominio', icon: '◍', tone: 'purple' },
    { name: 'DNSDumpster', text: 'Enumeración DNS y subdominios', icon: '▣', tone: 'blue' },
    { name: 'TheHarvester', text: 'Recolección de emails y hosts', icon: '◉', tone: 'blue' },
    { name: 'Shodan', text: 'Búsqueda de dispositivos e IPs', icon: '✤', tone: 'gray' },
    { name: 'Google Dorks', text: 'Búsquedas avanzadas', icon: 'G', tone: 'google' },
  ];

  activities = [
    { time: '10:24', action: 'WHOIS lookup realizado', source: 'whois.neolandsecure.com', tool: 'Whois' },
    { time: '10:18', action: 'DNS enumeración completada', source: 'dnsdumpster.com', tool: 'DNSDumpster' },
    { time: '10:12', action: 'Subdominios encontrados', source: 'subfinder -d neolandsecure.com', tool: 'Subfinder' },
    { time: '10:05', action: 'Tecnologías detectadas', source: 'builtwith.com', tool: 'BuiltWith' },
  ];
}