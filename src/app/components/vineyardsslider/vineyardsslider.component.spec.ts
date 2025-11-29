import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VineyardssliderComponent } from './vineyardsslider.component';

describe('VineyardssliderComponent', () => {
  let component: VineyardssliderComponent;
  let fixture: ComponentFixture<VineyardssliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VineyardssliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VineyardssliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
