import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent],
      imports: [ FormsModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  }));

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <li> text', () => {
      de = fixture.debugElement.query(By.css('li'));
      expect(de.nativeElement.innerText).toMatch(/home/i, '<li> should say something about Home');
    });
});
