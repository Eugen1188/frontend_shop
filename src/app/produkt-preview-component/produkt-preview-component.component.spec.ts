import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktPreviewComponentComponent } from './produkt-preview-component.component';

describe('ProduktPreviewComponentComponent', () => {
  let component: ProduktPreviewComponentComponent;
  let fixture: ComponentFixture<ProduktPreviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktPreviewComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktPreviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
