import { Component, signal, ChangeDetectorRef, OnInit, AfterViewInit, AfterRenderRef, AfterViewChecked, OnDestroy } from '@angular/core';
import {  FullCalendarModule } from '@fullcalendar/angular';
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
import { UserserviceService } from '../core/service/userservice.service';

@Component({
  selector: 'app-planing',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, RouterOutlet],
  templateUrl: './planing.component.html',
  styleUrl: './planing.component.css',
})
export class PlaningComponent implements OnInit  , AfterViewChecked , OnDestroy{
 
 
  planing:any  ; 
  users : any ; 
  planingAdd = {title:"" ,client:"",details:"",invoice:"",amount:""  , userId:" " } ;  
private photos: NodeListOf<Element> | null = null;  
 private isListenerAdded = false;
  currentUserId: string = '0'; // default userId

  counter = 1 ; 



 calendarVisible = signal(true);
 calendarOptions = signal<CalendarOptions>({
    themeSystem: 'bootstrap5',
    eventColor:'blue' , 
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
      right: 'dayGridMonth,timeGridWeek,listMonth',
    },
 

    
    initialView: 'dayGridMonth',

    //initialEvents:INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    // eventSources : [{
    //   url:'http://localhost:3000/planing/',  
    // }],

    eventSources: [
      {
        url: 'http://localhost:3000/planing/user/{userId}', // Dynamic URL
        method: 'GET',
        extraParams: () => {
          return { userId: this.currentUserId }; // dynamically fetch userId
        },
        failure: () => {
          alert('There was an error while fetching events!');
        },
      }
    ],
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
    eventChange : this.handleEventChange.bind(this),    


    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });


  currentEvents = signal<EventApi[]>([]);

  constructor(
    private _user : UserserviceService ,
    private changeDetector: ChangeDetectorRef,
    private _planing: PlaningService
  ) {}

  ngOnInit(): void {
  //  this.getInitialPlaniing() ;   
    this.getUsers() ; 
    console.log(INITIAL_EVENTS);

 
  }


   ngAfterViewChecked(): void {
    
    if(!this.isListenerAdded || this.counter <7 ){
      this.photos = document.querySelectorAll('.user-photo');
      console.log("photos are: ", this.photos);
      if (this.photos.length > 0) {
        this.photos.forEach(photo => {
          photo.addEventListener('click', this.handlePhotoClick);
        });

        // By default, set the first photo as active
        this.photos[0].classList.add('active');
        this.isListenerAdded = true;
        this.counter ++ ; 
      }
    
    }
  }

  handlePhotoClick(event: Event) {
   console.log("photo clicked ");
    if (this.photos) {
       console.log("photo clicked checked");
      // Remove the active class from all photos
      this.photos.forEach(photo => photo.classList.remove('active'));

      // Add the active class to the clicked photo
      (event.target as HTMLElement).classList.add('active');
    }
  }



  ngOnDestroy(): void {
    if (this.photos && this.isListenerAdded) {
      this.photos.forEach(photo => {
        console.log("photos destroyed ");
        
        photo.removeEventListener('click', this.handlePhotoClick);

        this.isListenerAdded = false ; 
        this.counter = 1 ; 
      });
    }
  }




 


  




//   ngAfterViewChecked() {
//     const photos = document.querySelectorAll('.user-photo');
// console.log("photos are : ",photos);

//     // Function to handle the click event
//     function handlePhotoClick(event: Event) {
//       // Remove the active class from all photos
//       photos.forEach(photo => photo.classList.remove('active'));
      
//       // Add the active class to the clicked photo
//       (event.target as HTMLElement).classList.add('active');
//     }

//     // Add click event listeners to each photo
//     photos.forEach(photo => {
//       photo.addEventListener('click', handlePhotoClick);
//     });

//     // By default, set the first photo as active
//     if (photos.length > 0) {
//       photos[0].classList.add('active');
//     }
//   }

  




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
          this.ngOnInit() ; 
        }
      })



    }
   
  }


async handleEventClick(info: EventClickArg) {
    console.log("Event clicked");
    const calendarApi = info.view.calendar;

    try {
        const res = await this._planing.getplaningById(info.event.id).toPromise();
        this.planing = res;
        
        // Show the Swal and get the result
        const result = await Swal.fire({
            title: 'Edit Task',
            showDenyButton: true,
            denyButtonText: "Delete",
            html: `
                <input id="swal-input1" class="swal2-input" value="${this.planing.title}" placeholder="Title">
                <input id="swal-input2" class="swal2-input" value="${this.planing.client}" placeholder="Customer">
                <textarea id="swal-input3" class="swal2-textarea" placeholder="Details">${this.planing.details || ''}</textarea>
                <input id="swal-input4" class="swal2-input" value="${this.planing.invoice}" placeholder="Invoice">
                <input id="swal-input5" class="swal2-input" value="${this.planing.amount}" placeholder="Amount">
            `,
            focusConfirm: false,
            preConfirm: () => ({
    
                    title: (<HTMLInputElement>document.getElementById('swal-input1')).value,
                client: (<HTMLInputElement>document.getElementById('swal-input2')).value,
                details: (<HTMLInputElement>document.getElementById('swal-input3')).value,
                invoice: (<HTMLInputElement>document.getElementById('swal-input4')).value,
                amount: (<HTMLInputElement>document.getElementById('swal-input5')).value,
          
    
            }),
        });

        // Handle the result
        if (result.isConfirmed) {
            await this._planing.updateplaning(result.value, info.event.id).toPromise();
            Swal.fire("Updated!");
            calendarApi.refetchEvents();
        } else if (result.isDenied) {
            const confirmation = await Swal.fire({
                title: "Do you want to delete the event?",
                showCancelButton: true,
                confirmButtonText: "Delete",
            });

            if (confirmation.isConfirmed) {
                await this._planing.deleteplaning(info.event.id).toPromise();
                Swal.fire("Deleted!", "", "success");
                calendarApi.refetchEvents();
            }
        }
    } catch (error) {
        console.error('Error during event handling:', error);
        Swal.fire("Failed to process the event!", "", "error");
    }
}



  async handleEventChange(changeInfo:any){
  
    this._planing.updateplaning(changeInfo.event , changeInfo.event.id).subscribe({
      next:(res)=>{
        console.log("update event res : ",res );
        
      }
    })
    
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

getUsers(){
this._user.getUsers().subscribe({
  next:(res)=>{
    this.users= res;
  }
})

}




//   getInitialPlaniing(){
// this._planing.getplaning().subscribe({
//   next:(res:any)=>{
//     this.planing = res ; 
//     console.log(res);
    
//   },error : (err:any) =>{
//     console.log(err);
//   }

// })
// }

}


//TODO select user color 
//TODO select user for admin 
//TODO get plan by user  selected for admin 
//TODO get plan by user 

 