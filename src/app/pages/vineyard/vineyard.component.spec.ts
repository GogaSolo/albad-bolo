import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VineyardComponent } from './vineyard.component';

describe('VineyardComponent', () => {
  let component: VineyardComponent;
  let fixture: ComponentFixture<VineyardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VineyardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VineyardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
