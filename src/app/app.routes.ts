import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { SupportComponent } from './support/support.component';
import { ContactComponent } from './contact/contact.component';
import { MissionComponent } from './about/mission/mission.component';
import { SponsorsComponent } from './about/sponsors/sponsors.component';
import { VisionComponent } from './about/vision/vision.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfilComponent } from './profil/profil.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardConnectedService } from './service/auth-guard-connected.service';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent, children: [
        { path: 'mission', component: MissionComponent, outlet:'about' },
        { path: 'vision', component: VisionComponent, outlet:'about' },
        { path: 'sponsors', component: SponsorsComponent, outlet:'about' }
    ] },
    { path: 'services', component: ServicesComponent },
    { path: 'support', component: SupportComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'forum', component: ForumComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'profil', component: ProfilComponent, canActivate: [AuthGuardConnectedService] },
    { path: 'error', component: ErrorComponent },
    { path: '', component: HomeComponent}
]