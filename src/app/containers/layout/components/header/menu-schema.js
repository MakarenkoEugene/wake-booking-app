import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import TimerIcon from '@material-ui/icons/Timer';
import TodayIcon from '@material-ui/icons/Today';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SchoolIcon from '@material-ui/icons/School';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AppsIcon from '@material-ui/icons/Apps';

export const topMenu = {
  client: { to: '/client/', text: 'client' },
  teacher: { to: '/teacher/', text: 'teacher' },
  admin: { to: '/admin/', text: 'admin' },
};

export const menuSchema = [
  [
    { text: 'client', to: '/client/', Icon: AssignmentIndIcon },
    { text: 'deal', to: '/client/deal/', Icon: TodayIcon },
    { text: 'subscriptions', to: '/client/subscriptions/', Icon: CreditCardIcon },
  ],
  [
    { text: 'teacher', to: '/teacher/', Icon: SchoolIcon },
    { text: 'schedule', to: '/teacher/schedule/', Icon: TodayIcon },
    { text: 'online queue', to: '/teacher/queue/', Icon: TimerIcon },
    { text: 'analytics', to: '/teacher/analytics/', Icon: AssessmentIcon },
    { text: 'subscriptions', to: '/teacher/subscriptions/', Icon: CreditCardIcon },
  ],
  [
    { text: 'park', to: '/admin/', Icon: HomeIcon },
    { text: 'winch', to: '/admin/winch/', Icon: BusinessCenterIcon },
    { text: 'equipment', to: '/admin/equipment/', Icon: FitnessCenterIcon },
    { text: 'subscriptions', to: '/admin/subscriptions/', Icon: CreditCardIcon },
    { text: 'schedule', to: '/admin/schedule/', Icon: TodayIcon },
    { text: 'online queue', to: '/admin/queue/', Icon: TimerIcon },
    { text: 'app', to: '/admin/app/', Icon: AppsIcon },
    { text: 'analytics', to: '/admin/analytics/', Icon: AssessmentIcon },
  ],
  [
    { text: 'wake booking', to: '/', disabled: true },
  ],
];
