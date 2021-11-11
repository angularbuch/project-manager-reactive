import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../models/model-interfaces';

@Component({
  selector: 'pjm-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() selected = false;
  @Input() task!: Task;

  @Output() taskSelected = new EventEmitter();
  @Output() taskDelete = new EventEmitter();

  select() {
    this.taskSelected.emit(this.task.id);
  }

  delete() {
    this.taskDelete.emit(this.task);
  }
}

