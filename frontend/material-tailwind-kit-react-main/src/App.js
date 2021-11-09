import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Match from 'pages/match/Match';

// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';

// Tailwind CSS Style Sheetcd
import 'assets/styles/tailwind.css';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exam path='/match' component={Match} />
            <Redirect from="*" to="/" />
        </Switch>
    );
}

export default App;
