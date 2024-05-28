import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  standalone: true,
  imports: [],
  templateUrl: './page-heading.component.html',
  styleUrl: './page-heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeadingComponent {
}
