import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  imports: [],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.css',
})
export class MetricCard {
  @Input() label = '';
  @Input() value = '';
  @Input() detail = '';
  @Input() icon = '◉';
  @Input() tone: 'purple' | 'orange' | 'green' | 'red' | 'blue' = 'purple';
}
