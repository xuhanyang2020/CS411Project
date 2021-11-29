import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from 'pages/Landing';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Match from 'pages/match/Match';
import Overview from 'pages/overview/Overview';
import CourseSearch from 'pages/coursesearch/CourseSearch';
import Reservation from 'pages/Reservation/Reservation';
import TeacherOverview from 'pages/teacherOverview/TeacherOverview';
// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';

// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

import new_appointments from 'pages/new_appointments/new_appointments';



function App() {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exam path='/match' component={Match} />
            <Route exact path='/overview' component={Overview} />
            <Route exact path='/reservation' component={Reservation}/>
            <Route exact path='/appointment' component={new_appointments}/>
            <Route exact path='/coursesearch' component={CourseSearch}/>
            <Route exact path='/teacheroverview' component={TeacherOverview} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default App;
