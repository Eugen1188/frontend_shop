import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersandComponent } from './versand.component';

describe('VersandComponent', () => {
  let component: VersandComponent;
  let fixture: ComponentFixture<VersandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
