import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterdivComponent } from './filterdiv.component';

describe('FilterdivComponent', () => {
  let component: FilterdivComponent;
  let fixture: ComponentFixture<FilterdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterdivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
