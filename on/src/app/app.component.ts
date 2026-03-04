import { Component, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';

interface AthleteRow {
  athlete: string;
  country: string;
  sport: string;
  age: number;
  [key: string]: string | number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private extraColumnsCount = 0;

  readonly selectedColumnId = signal<string | null>(null);

  columnDefs = signal<ColDef<AthleteRow>[]>([
    { field: 'athlete', headerName: 'Athlete' },
    { field: 'country', headerName: 'Country' },
    { field: 'sport', headerName: 'Sport' },
    { field: 'age', headerName: 'Age' }
  ]);

  readonly defaultColDef: ColDef<AthleteRow> = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
    cellClass: (params) => params.column.getColId() === this.selectedColumnId() ? 'selected-column-cell' : ''
  };

  rowData = signal<AthleteRow[]>([
    { athlete: 'Michael Phelps', country: 'USA', sport: 'Swimming', age: 23 },
    { athlete: 'Usain Bolt', country: 'Jamaica', sport: 'Athletics', age: 22 },
    { athlete: 'Simone Biles', country: 'USA', sport: 'Gymnastics', age: 19 },
    { athlete: 'Katie Ledecky', country: 'USA', sport: 'Swimming', age: 19 }
  ]);

  onCellClicked(event: CellClickedEvent<AthleteRow>): void {
    this.selectedColumnId.set(event.column.getColId());
  }

  addColumn(): void {
    this.extraColumnsCount += 1;
    const newField = `extra${this.extraColumnsCount}`;
    const headerName = `Extra ${this.extraColumnsCount}`;

    this.columnDefs.update((defs) => [...defs, { field: newField, headerName }]);

    this.rowData.update((rows) => rows.map((row, index) => ({
      ...row,
      [newField]: `R${index + 1}C${this.extraColumnsCount}`
    })));
  }
}
