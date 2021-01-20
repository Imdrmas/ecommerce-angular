import { TagService } from './../../service/tag.service';
import { Tag } from './../../modal/Modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  progressBar = false;
  tag: Tag = {} as Tag;
  idTag: number;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    if (this.idTag != null) {
      this.tagService.findTagById(this.idTag).subscribe(tag => {
        this.tag = tag;
      })
    }
  }
  addTag() {
    if (this.idTag != null) {
      this.tagService.editTag(this.tag, this.idTag).subscribe(tag => {
        this.tag = tag;
        window.location.reload();
      })
    } else {
      this.tagService.addTag(this.tag).subscribe(tag => {
        this.tag = tag;
        window.location.reload();
      })
    }
  }
}
