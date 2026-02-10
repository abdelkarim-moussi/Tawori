import { Component, input, Input } from '@angular/core';
import { ColumnDef } from '../../../../core/types/column-def';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {
  columns = input<ColumnDef<any>[]>([]);
  tableData = input<any[]>([]);
}
