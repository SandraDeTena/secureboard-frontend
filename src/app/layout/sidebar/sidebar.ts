import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  caseItems: SidebarItem[] = [
    { label: 'OSINT Investigation', icon: '◎', route: '/cases/osint' },
    { label: 'Blue Team Analyst', icon: '⬡', route: '/cases/blue-team' },
    { label: 'Red Team Assessment', icon: '✣', route: '/cases/red-team' },
    { label: 'Security Engineer', icon: '⌘', route: '/cases/security-engineer' },
    { label: 'Incident Response', icon: '♧', route: '/cases/incident-response' },
  ];

  portfolioItems: SidebarItem[] = [
    { label: 'Proyectos', icon: '▱', route: '/portfolio' },
    { label: 'Certificaciones', icon: '☆', route: '/certifications' },
  ];

  profileItems: SidebarItem[] = [
    { label: 'Perfil', icon: '♙', route: '/profile' },
    { label: 'Progreso', icon: '⌁', route: '/progress' },
    { label: 'Ajustes', icon: '⚙', route: '/settings' },
  ];
}