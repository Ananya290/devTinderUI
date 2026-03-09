import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: MockStore;

  const initialState = {
    auth: {
      user: null,
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['onLoginSubmit'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with emailId and password controls', () => {
    expect(component.authForm.contains('emailId')).toBeTrue();
    expect(component.authForm.contains('password')).toBeTrue();
  });

  it('should keep form invalid when empty', () => {
    component.authForm.setValue({
      emailId: '',
      password: ''
    });

    expect(component.authForm.invalid).toBeTrue();
  });

  it('should mark email invalid for malformed value', () => {
    const emailControl = component.authForm.get('emailId');

    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();

    expect(emailControl?.invalid).toBeTrue();
  });

  it('should not dispatch login action when form is invalid', () => {
    component.authForm.setValue({
      emailId: 'bad-email',
      password: '123'
    });

    component.OnLogin();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch login action when form is valid', () => {
    component.authForm.setValue({
      emailId: 'test@example.com',
      password: '123456'
    });

    component.OnLogin();

    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        emailId: 'test@example.com',
        password: '123456'
      })
    );
  });
});
