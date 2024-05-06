import { Component, signal, ChangeDetectorRef, OnInit, ViewChild, Signal } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { PlaningService } from '../core/service/planing.service';
import { options } from '@fullcalendar/core/preact';
import { delay, ignoreElements } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';
@Component({
  selector: 'app-planing',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, RouterOutlet],
  templateUrl: './planing.component.html',
  styleUrl: './planing.component.css',
})
export class PlaningComponent implements OnInit{
 
 
  planing:any  ; 
  planingAdd = {title:"" ,client:"",details:"",invoice:"",amount:""  , userId:" " } ;  




 calendarVisible = signal(true);
calendarOptions = signal<CalendarOptions>({
    themeSystem: 'bootstrap5',
    eventColor:'red' , 
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
       bootstrap5Plugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',

    initialEvents:INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    eventSources : [{
      url:'http://localhost:3000/planing/',
      
    }],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4, 5,6], //days
        startTime: '06:00', // 6am
        endTime: '21:00', // 9pm
      },
    ],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });


  currentEvents = signal<EventApi[]>([]);

  constructor(
    
    private changeDetector: ChangeDetectorRef,
    private _planing: PlaningService
  ) {}


  ngOnInit(): void {
    this.getInitialPlaniing() ;   
    console.log(INITIAL_EVENTS);

 
  }





  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  async handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    const { value: formValues } = await Swal.fire({
      title: 'New Task',
       html:
            `<input id="swal-input1" class="swal2-input" value="${this.planingAdd.title}" placeholder="title">` + 
            `<input id="swal-input2" class="swal2-input" value="${this.planingAdd.client}" placeholder="customer">` +
            `<textarea class="swal2-textarea" type="text" id="swal-input3"  placeholder="details">${this.planingAdd.details || ''}</textarea>` +
            `<input type="text" id="swal-input4" class="swal2-input" value="${this.planingAdd.invoice}" placeholder="invoice">` +
            `<input type="text" id="swal-input5" class="swal2-input" value="${this.planingAdd.amount}" placeholder="amount">`,
         focusConfirm: false,
      preConfirm: () => {
        
        
        return {
          title: (<HTMLInputElement>document.getElementById('swal-input1'))
            .value,
          client: (<HTMLInputElement>document.getElementById('swal-input2'))
            .value,
          details: (<HTMLInputElement>document.getElementById('swal-input3'))
            .value,
          invoice: (<HTMLInputElement>document.getElementById('swal-input4'))
            .value,
          amount: (<HTMLInputElement>document.getElementById('swal-input5'))
            .value,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        };
        
      },
      
    });

    if (formValues) {
      calendarApi.addEvent({
        id: createEventId(),
        title: formValues.title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    
this.planingAdd = {...formValues} ;

this.planingAdd.userId = localStorage.getItem('ID') || '0';

  console.log("add planing",this.planingAdd);
      Swal.fire(JSON.stringify(formValues));
    
      this._planing.createplaning(this.planingAdd).subscribe({
        next:(res)=>{
          console.log("res",res);
          
        }
      })



    }
   
  }

  async handleEventClick(info: EventClickArg) {
console.log("click");

    // get eventbyid and display it on swalalert : 
   //  this.getEventById(info.event.id) ; 
   //   delay(2000) ; 
    // Call SweetAlert with dynamic placeholders for the first input
    this._planing.getplaningById(info.event.id).subscribe({
      next:async (res)=>{
      this.planing = res ; 
  const { value: formValues } = await Swal.fire({
        title: 'New Task',
        html:
            `<input id="swal-input1" class="swal2-input" value="${this.planing.title}" placeholder="title">` + 
            `<input id="swal-input2" class="swal2-input" value="${this.planing.client}" placeholder="customer">` +
            `<textarea class="swal2-textarea" type="text" id="swal-input3"  placeholder="details">${this.planing.details || ''}</textarea>` +
            `<input type="text" id="swal-input4" class="swal2-input" value="${this.planing.invoice}" placeholder="invoice">` +
            `<input type="text" id="swal-input5" class="swal2-input" value="${this.planing.amount}" placeholder="amount">`,
        focusConfirm: false,
        preConfirm: () => {
            return {
                title: (<HTMLInputElement>document.getElementById('swal-input1')).value,
                client: (<HTMLInputElement>document.getElementById('swal-input2')).value,
                details: (<HTMLInputElement>document.getElementById('swal-input3')).value,
                invoice: (<HTMLInputElement>document.getElementById('swal-input4')).value,
                amount: (<HTMLInputElement>document.getElementById('swal-input5')).value,
            };
        },
    });
    // Show the results from the form in another alert, if any
    if (formValues) {
        Swal.fire(JSON.stringify(formValues));
    }

      }
    })

  



    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
 }



  getEventById(id: string) : any {

     this._planing.getplaningById(id).subscribe({
      next:(res)=>{
        console.log("res",res);
         this.planing = res ; 
     
      }
    })
    
    
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  getInitialPlaniing(){
this._planing.getplaning().subscribe({
  next:(res:any)=>{
    this.planing = res ; 
    console.log(res);
    
  },error : (err:any) =>{
    console.log(err);
  }

})
}

}






//TODO update by drag and drop 
//TODO update date by drag 
//TODO update by click 
//TODO delete 
//TODO select user color 
//TODO select user for admin 
//TODO get plan by user  selected for admin 
//TODO get plan by user 

