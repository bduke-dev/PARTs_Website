import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { GeneralService } from '@app/core/services/general.service';
import { ModalService } from '@app/core/services/modal.service';
import { createMockSwPush } from '../../../../../test-helpers';
import { WhiteboardComponent } from './whiteboard.component';

describe('WhiteboardComponent', () => {
  let component: WhiteboardComponent;
  let fixture: ComponentFixture<WhiteboardComponent>;
  let mockGS: jasmine.SpyObj<GeneralService>;
  let mockModalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    mockGS = jasmine.createSpyObj('GeneralService', ['getNextGsId', 'incrementOutstandingCalls', 'decrementOutstandingCalls', 'isMobile', 'getAppSize']);
    mockGS.getNextGsId.and.returnValue('gs-1');
    mockModalService = jasmine.createSpyObj('ModalService', ['triggerError', 'triggerConfirm']);

    await TestBed.configureTestingModule({
      imports: [WhiteboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: SwPush, useValue: createMockSwPush() },
        { provide: GeneralService, useValue: mockGS },
        { provide: ModalService, useValue: mockModalService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(WhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default lineWidth of 2', () => {
    expect((component as any).lineWidth).toBe(2);
  });

  it('should select a new color', () => {
    component.selectColor('#ff0000');
    expect((component as any).currentColor).toBe('#ff0000');
  });

  it('should deselect color when same color selected again', () => {
    component.selectColor('#ff0000');
    component.selectColor('#ff0000');
    expect((component as any).currentColor).toBe('');
  });

  it('should select different colors', () => {
    component.selectColor('#ff0000');
    component.selectColor('#00ff00');
    expect((component as any).currentColor).toBe('#00ff00');
  });

  it('should handle onMouseDown when color is set', () => {
    (component as any).currentColor = '#ff0000';
    const event = new MouseEvent('mousedown', { offsetX: 10, offsetY: 20 } as MouseEventInit);
    expect(() => component.onMouseDown(event)).not.toThrow();
    expect((component as any).isDrawing).toBe(true);
  });

  it('should not start drawing when no color set', () => {
    (component as any).currentColor = '';
    const event = new MouseEvent('mousedown', { offsetX: 10, offsetY: 20 } as MouseEventInit);
    component.onMouseDown(event);
    expect((component as any).isDrawing).toBe(false);
  });

  it('should stop drawing on onMouseUp', () => {
    (component as any).currentColor = '#ff0000';
    (component as any).isDrawing = true;
    // saveToUndoStack and emitImage use canvas APIs; spy them out to avoid errors
    spyOn(component as any, 'saveToUndoStack');
    spyOn(component, 'emitImage');
    component.onMouseUp();
    expect((component as any).isDrawing).toBe(false);
  });

  it('should not emit on onMouseUp when no color set', () => {
    (component as any).currentColor = '';
    (component as any).isDrawing = true;
    spyOn(component.ImageChange, 'emit');
    component.onMouseUp();
    expect(component.ImageChange.emit).not.toHaveBeenCalled();
  });

  it('should handle onMouseMove when not drawing', () => {
    (component as any).currentColor = '#ff0000';
    (component as any).isDrawing = false;
    const event = new MouseEvent('mousemove', { offsetX: 30, offsetY: 40 } as MouseEventInit);
    expect(() => component.onMouseMove(event)).not.toThrow();
  });

  it('should call clearCanvas with confirm via modal', () => {
    component.clearCanvas(true);
    expect(mockModalService.triggerConfirm).toHaveBeenCalled();
  });

  it('should emit ImageChange when emitImage is called', () => {
    spyOn(component.ImageChange, 'emit');
    // Spy on canvas toDataURL to return a valid base64 data URL
    const fakeDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    spyOn(component['canvas'].nativeElement, 'toDataURL').and.returnValue(fakeDataURL);
    component.emitImage();
    expect(component.ImageChange.emit).toHaveBeenCalledWith(jasmine.any(File));
  });
});
