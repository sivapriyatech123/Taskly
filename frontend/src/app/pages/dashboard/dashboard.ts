import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskList } from '../../components/task-list/task-list';
import { TaskHeader } from '../../components/task-header/task-header';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, TaskForm, TaskList, TaskHeader],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
    auth = inject(AuthService);
    taskService = inject(TaskService);
    router = inject(Router);

    tasks = signal<Task[]>([]);
    isLoading = signal(true);
    error = signal<string | null>(null);

    searchQuery = signal('');
    statusFilter = signal('All');
    priorityFilter = signal('All');

    ngOnInit() {
        this.auth.loadUser();
        this.loadTasks();
    }

    loadTasks() {
        this.isLoading.set(true);
        this.taskService.getTasks().subscribe({
            next: (tasks) => {
                this.tasks.set(tasks);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.error.set('Failed to load tasks');
                this.isLoading.set(false);
            }
        });
    }

    pendingCount = computed(() => this.tasks().filter(t => !t.is_done).length);
    doneCount = computed(() => this.tasks().filter(t => t.is_done).length);

    filteredTasks = computed(() => {
        let filtered = this.tasks();

        // Filter by search query
        if (this.searchQuery()) {
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(this.searchQuery().toLowerCase())
            );
        }

        // Filter by status
        if (this.statusFilter() !== 'All') {
            const isDone = this.statusFilter() === 'Done';
            filtered = filtered.filter(t => t.is_done === isDone);
        }

        // Filter by priority
        if (this.priorityFilter() !== 'All') {
            filtered = filtered.filter(t => t.priority === this.priorityFilter());
        }

        // Sort by due date
        return filtered.sort((a, b) => {
            if (!a.due_date) return 1;
            if (!b.due_date) return -1;
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        });
    });

    addTask(taskData: any) {
        this.taskService.createTask(taskData).subscribe({
            next: () => this.loadTasks(),
            error: () => this.error.set('Failed to create task')
        });
    }

    toggleTask(id: number) {
        this.taskService.updateTask(id).subscribe({
            next: () => this.loadTasks(),
            error: () => this.error.set('Failed to update task')
        });
    }

    deleteTask(id: number) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.deleteTask(id).subscribe({
                next: () => this.loadTasks(),
                error: () => this.error.set('Failed to delete task')
            });
        }
    }

    handleSearch(query: string) {
        this.searchQuery.set(query);
    }

    handleFilters(filters: { status: any, priority: any }) {
        this.statusFilter.set(filters.status);
        this.priorityFilter.set(filters.priority);
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/signin']);
    }
}
