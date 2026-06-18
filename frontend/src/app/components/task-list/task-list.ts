import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task-list.html',
    styleUrls: ['./task-list.css']
})
export class TaskList {
    @Input() tasks: Task[] = [];
    @Output() toggle = new EventEmitter<number>();
    @Output() delete = new EventEmitter<number>();


    getPriorityClass(priority: string): string {
        return `priority-${priority.toLowerCase()}`;
    }

    getStatusClass(isDone: boolean): string {
        return isDone ? 'status-done' : 'status-pending';
    }

    getCardTheme(priority: string): string {
        switch (priority) {
            case 'High': return 'theme-high';
            case 'Medium': return 'theme-medium';
            case 'Low': return 'theme-low';
            default: return '';
        }
    }

    getDaysRemaining(dueDateStr: string): number {
        if (!dueDateStr) return 0;
        const parts = dueDateStr.split('-');
        if (parts.length !== 3) return 0;
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; 
        const day = parseInt(parts[2], 10);
        
        const due = new Date(year, month, day, 0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diffTime = due.getTime() - today.getTime();
        return Math.round(diffTime / (1000 * 60 * 60 * 24));
    }

    getCountdownText(task: Task): string {
        if (!task.due_date) return '';
        const diffDays = this.getDaysRemaining(task.due_date);
        if (diffDays < 0) {
            const absDays = Math.abs(diffDays);
            return `❌ Overdue by ${absDays} ${absDays === 1 ? 'Day' : 'Days'}`;
        } else if (diffDays === 0) {
            return `🔴 Due Today`;
        } else if (diffDays === 1) {
            return `🟠 1 Day to Go`;
        } else if (diffDays <= 5) {
            return `🟡 ${diffDays} Days Left`;
        } else {
            return `🟢 ${diffDays} Days Left`;
        }
    }

    getCountdownColorClass(task: Task): string {
        if (!task.due_date) return '';
        const diffDays = this.getDaysRemaining(task.due_date);
        if (diffDays < 0) {
            return 'countdown-overdue';
        } else if (diffDays === 0) {
            return 'countdown-today';
        } else if (diffDays === 1) {
            return 'countdown-tomorrow';
        } else if (diffDays <= 5) {
            return 'countdown-soon';
        } else {
            return 'countdown-safe';
        }
    }
}
