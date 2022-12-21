import React from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import { Route, Switch, useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  const location = useLocation();
  const [is404, setIs404] = React.useState(false);

  return (
    <div className='page'>
      <Header 
        page={location.pathname}
        is404={is404}
      />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/*'>
          <NotFound 
            setIs404={setIs404}
          />
        </Route>
      </Switch>
      <Footer 
        page={location.pathname}
      />
    </div>
  )
}

export default App;