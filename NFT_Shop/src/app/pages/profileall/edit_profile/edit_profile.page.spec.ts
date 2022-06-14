import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Edit_profilePage } from './edit_profile.page';

describe('RegistrationPage', () => {
  let component: Edit_profilePage;
  let fixture: ComponentFixture<Edit_profilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit_profilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Edit_profilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
