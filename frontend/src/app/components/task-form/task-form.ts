import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-form.html',
    styleUrls: ['./task-form.css']
})
export class TaskForm {
    @Output() taskAdded = new EventEmitter<Omit<Task, 'id' | 'is_done'>>();

    title = '';
    description = '';
    dueDate = '';
    priority: 'Low' | 'Medium' | 'High' = 'Medium';

    onSubmit() {
        if (!this.title.trim()) return;

        this.taskAdded.emit({
            title: this.title,
            description: this.description,
            due_date: this.dueDate,
            priority: this.priority
        });

        // Reset form
        this.title = '';
        this.description = '';
        this.dueDate = '';
        this.priority = 'Medium';
    }
}
