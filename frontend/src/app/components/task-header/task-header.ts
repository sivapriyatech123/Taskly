import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-task-header',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="task-header-controls">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          [(ngModel)]="query" 
          (input)="onSearch()"
        >
      </div>

      <div class="filters">
        <select [(ngModel)]="status" (change)="onFilterChange()">
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        <select [(ngModel)]="priority" (change)="onFilterChange()">
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  `,
    styles: [`
    .task-header-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 400px;
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.5;
    }

    input {
      width: 100%;
      padding: 12px 15px 12px 45px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
      font-size: 0.95rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
      transition: all 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .filters {
      display: flex;
      gap: 12px;
    }

    select {
      padding: 12px 15px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
      font-size: 0.95rem;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.02);
      font-weight: 500;
      color: #475569;
    }

    @media (max-width: 768px) {
      .task-header-controls {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-box {
        max-width: none;
      }
      
      .filters {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  `]
})
export class TaskHeader {
    @Output() searchChanged = new EventEmitter<string>();
    @Output() filterChanged = new EventEmitter<{ status: string, priority: string }>();

    query = '';
    status = 'All';
    priority = 'All';

    onSearch() {
        this.searchChanged.emit(this.query);
    }

    onFilterChange() {
        this.filterChanged.emit({
            status: this.status,
            priority: this.priority
        });
    }
}
