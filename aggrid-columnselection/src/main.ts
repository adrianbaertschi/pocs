import { bootstrapApplication } from '@angular/platform-browser';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AppComponent } from './app/app.component';

ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent).catch((err) => console.error(err));
