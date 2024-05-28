import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeadingComponent } from '@components';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    PageHeadingComponent
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {

}
