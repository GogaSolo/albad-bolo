import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarComponent } from './cellar.component';

describe('CellarComponent', () => {
  let component: CellarComponent;
  let fixture: ComponentFixture<CellarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
