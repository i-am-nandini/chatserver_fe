import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';


export const routes: Routes = [
    // {path:'home',component:ChatComponent},
    // {path:'',pathMatch:'full',redirectTo:'home'},
    // { path: 'chat/:village_id/:user_id', component: ChatComponent }

    { path: 'chat/:village/:user', component: ChatComponent },
    // { path: '', redirectTo: '/chat/reddypalam/user1', pathMatch: 'full' } // Default route

];

