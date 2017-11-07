import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { List } from 'immutable';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerComponent {

    @Input() page: List<string>;
    @Input() size: number;

}
