import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from 'src/app/modal/Modal';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-add-tag-to-product',
  templateUrl: './add-tag-to-product.component.html',
  styleUrls: ['./add-tag-to-product.component.css']
})
export class AddTagToProductComponent implements OnInit {
  tags: Tag[];
  filterTags: Tag[];

  constructor(private tagService: TagService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tagService.findAllTags().subscribe(tags => {
      this.tags = tags;
      this.tagService.findTagsForProduct(this.data.idProduct).subscribe(filterTags => {
        this.filterTags = filterTags;
        this.filterTags.forEach(t => {
          this.tags = this.tags.filter(item => item.id !== t.id);
        })
      })
    })
  }

  selectedValue(event: any) {
    const idTag = event.value;
    this.tagService.addTagToProduct(this.data.idProduct, idTag).subscribe(() => {
      window.location.reload();
    })
  }
}
