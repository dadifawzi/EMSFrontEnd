import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateclientComponent } from './updateclient.component';

describe('UpdateclientComponent', () => {
  let component: UpdateclientComponent;
  let fixture: ComponentFixture<UpdateclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
