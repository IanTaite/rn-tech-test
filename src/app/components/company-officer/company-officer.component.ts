import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CompanyOfficerNamePipe, CompanyOfficerRolePipe } from '@pipes';

@Component({
  selector: 'app-company-officer',
  standalone: true,
  imports: [
    CompanyOfficerNamePipe,
    CompanyOfficerRolePipe,
    TitleCasePipe
  ],
  templateUrl: './company-officer.component.html',
  styleUrl: './company-officer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyOfficerComponent {
  name = input.required<string>();
  role = input.required<string>();
}
