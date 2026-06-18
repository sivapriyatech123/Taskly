import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';
import { Task } from '../../models/task';

describe('TaskList', () => {
    let component: TaskList;
    let fixture: ComponentFixture<TaskList>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskList]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskList);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('getDaysRemaining', () => {
        it('should return correct difference in days', () => {
            const today = new Date();
            const pad = (n: number) => n.toString().padStart(2, '0');
            
            // Today
            const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
            expect(component.getDaysRemaining(todayStr)).toBe(0);

            // Tomorrow
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const tomorrowStr = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
            expect(component.getDaysRemaining(tomorrowStr)).toBe(1);

            // Yesterday
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const yesterdayStr = `${yesterday.getFullYear()}-${pad(yesterday.getMonth() + 1)}-${pad(yesterday.getDate())}`;
            expect(component.getDaysRemaining(yesterdayStr)).toBe(-1);

            // 5 days from now
            const future = new Date(today);
            future.setDate(today.getDate() + 5);
            const futureStr = `${future.getFullYear()}-${pad(future.getMonth() + 1)}-${pad(future.getDate())}`;
            expect(component.getDaysRemaining(futureStr)).toBe(5);
        });
    });

    describe('getCountdownText', () => {
        it('should return appropriate labels and emojis based on remaining days', () => {
            const today = new Date();
            const pad = (n: number) => n.toString().padStart(2, '0');

            // Overdue
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 2);
            const overdueTask: Task = {
                id: 1,
                title: 'Overdue Task',
                priority: 'High',
                is_done: false,
                due_date: `${yesterday.getFullYear()}-${pad(yesterday.getMonth() + 1)}-${pad(yesterday.getDate())}`
            };
            expect(component.getCountdownText(overdueTask)).toBe('❌ Overdue by 2 Days');

            // Today
            const todayTask: Task = {
                id: 2,
                title: 'Today Task',
                priority: 'Medium',
                is_done: false,
                due_date: `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
            };
            expect(component.getCountdownText(todayTask)).toBe('🔴 Due Today');

            // Tomorrow
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const tomorrowTask: Task = {
                id: 3,
                title: 'Tomorrow Task',
                priority: 'Low',
                is_done: false,
                due_date: `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`
            };
            expect(component.getCountdownText(tomorrowTask)).toBe('🟠 1 Day to Go');

            // 3 days left
            const soon = new Date(today);
            soon.setDate(today.getDate() + 3);
            const soonTask: Task = {
                id: 4,
                title: 'Soon Task',
                priority: 'Low',
                is_done: false,
                due_date: `${soon.getFullYear()}-${pad(soon.getMonth() + 1)}-${pad(soon.getDate())}`
            };
            expect(component.getCountdownText(soonTask)).toBe('🟡 3 Days Left');

            // 7 days left
            const safe = new Date(today);
            safe.setDate(today.getDate() + 7);
            const safeTask: Task = {
                id: 5,
                title: 'Safe Task',
                priority: 'Low',
                is_done: false,
                due_date: `${safe.getFullYear()}-${pad(safe.getMonth() + 1)}-${pad(safe.getDate())}`
            };
            expect(component.getCountdownText(safeTask)).toBe('🟢 7 Days Left');
        });
    });

    describe('getCountdownColorClass', () => {
        it('should return appropriate color CSS class', () => {
            const today = new Date();
            const pad = (n: number) => n.toString().padStart(2, '0');

            const makeTask = (daysOffset: number): Task => {
                const date = new Date(today);
                date.setDate(today.getDate() + daysOffset);
                return {
                    id: 1,
                    title: 'Task',
                    priority: 'Low',
                    is_done: false,
                    due_date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
                };
            };

            expect(component.getCountdownColorClass(makeTask(-1))).toBe('countdown-overdue');
            expect(component.getCountdownColorClass(makeTask(0))).toBe('countdown-today');
            expect(component.getCountdownColorClass(makeTask(1))).toBe('countdown-tomorrow');
            expect(component.getCountdownColorClass(makeTask(3))).toBe('countdown-soon');
            expect(component.getCountdownColorClass(makeTask(6))).toBe('countdown-safe');
        });
    });
});
