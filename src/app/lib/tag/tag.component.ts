import { Component, input } from '@angular/core';
import { Tag } from './interfaces';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  public tag = input.required<Tag>();
}
