import { Component } from '@angular/core';
import { WindowEffectsService } from './shared/services/window-effects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ffxi-workshop';

  constructor(private windowEffectsService: WindowEffectsService) {}
}
