import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloComponent } from "./hello/hello.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HelloComponent]
})
export class AppComponent {
  title = 'projeto';
}
