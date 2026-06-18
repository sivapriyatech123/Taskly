import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-filter',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-filter.html',
    styleUrls: ['./task-filter.css']
})
export class TaskFilter {
    @Output() filterChanged = new EventEmitter<{ status: string, priority: string }>();

    status = 'All';
    priority = 'All';

    onFilterChange() {
        this.filterChanged.emit({
            status: this.status,
            priority: this.priority
        });
    }
}
