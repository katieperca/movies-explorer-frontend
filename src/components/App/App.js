import React from 'react';
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import mainApi from '../../utils/MainApi.js';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState((localStorage.getItem('jwt')));
  const [is404, setIs404] = React.useState(false);
  const [infoTooltip, setInfoTooltip] = React.useState({
    isOpen: false,
    isSucceed: false,
    message: '',
  });
  const [registerError, setRegisterError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [editProfileError, setEditProfileError] = React.useState('');
  const [isEditProfileActive, setIsEditProfileActive] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setToken();
      Promise.all([mainApi.getUserData(),  mainApi.getMovies()])
        .then(([user, items]) => {
          setCurrentUser(user);
          setSavedMovies(items);
          setLoggedIn(true);
          history.push(path);
        }).catch((err) => {
          history.push('/');
          console.log('Ой, ошибка', err);
        })
    }
  }, [loggedIn]);

  function onLogIn({email,  password}) {
    mainApi.authorize(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoginError('');
        setCurrentUser(res);
        setLoggedIn(true);
        history.push('/movies');
      }
    }).catch((err) => {
      setLoginError(err);
      setInfoTooltip({
        isOpen: true,
        isSucceed: false,
        message: err,
      });
      console.log('Ой, ошибка', err);
    });
  }

  function onRegister({name, email, password}) {
    mainApi.register(name, email, password)
    .then((res) => {
      if (res) {
        onLogIn({email, password});
      }
    }).catch((err) => {
      setRegisterError(err);
      setInfoTooltip({
        isOpen: true,
        isSucceed: false,
        message: err,
      });
      console.log('Ой, ошибка', err);
    });
  }

  function onUpdateUser(values) {
    mainApi.updateUserData(values.name, values.email)
      .then((res) => {
        setCurrentUser(res);
        setEditProfileError('');
        setInfoTooltip({
          isOpen: true,
          isSucceed: true,
          message: 'Ваши данные успешно обновлены',
        });
        setIsEditProfileActive(false);
      }).catch((err) => {
        setEditProfileError(err);
        setInfoTooltip({
          isOpen: true,
          isSucceed: false,
          message: err,
        });
        console.log('Ой, ошибка', err);
      });
  }

  function onCardLike(card) {
    mainApi.saveMovie(card)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
      }).catch((err) => {
        setInfoTooltip({
          isOpen: true,
          isSucceed: false,
          message: err,
        });
        console.log('Ой, ошибка', err);
      });
  }

  function onCardDelete(cardId) {
    mainApi.deleteMovie(cardId)
      .then(() => {
        const newCards = savedMovies.filter((c) => c._id !== cardId && c);
        setSavedMovies(newCards);
      }).catch((err) => {
        setInfoTooltip({
          isOpen: true,
          isSucceed: false,
          message: err,
        });
        console.log('Ой, ошибка', err);
      });
  }

  function onSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/');
  }

  function closePopup() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
  }

  function goBack() {
    history.go(-2);
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          onSignOut={onSignOut}
          page={location.pathname}
          is404={is404}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route 
            exact 
            path='/'
            loggedIn={loggedIn}
          >
            <Main />
          </Route>
          <ProtectedRoute 
            exact 
            path='/movies'
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            component={Movies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            setInfoTooltip={setInfoTooltip}
          />
          <ProtectedRoute 
            exact 
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            onCardDelete={onCardDelete}
            movies={savedMovies}
            setInfoTooltip={setInfoTooltip}
          />
          <ProtectedRoute 
            exact 
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={onUpdateUser}
            setIsEditProfileActive={setIsEditProfileActive}
            isEditProfileActive={isEditProfileActive}
            editProfileError={editProfileError}
            onSignOut={onSignOut}
          />
          <Route 
            exact 
            path='/signup'
            >
            {() =>
              !loggedIn ? 
                <Register 
                  onRegister={onRegister}
                  registerError={registerError}
                /> 
              : 
                <Redirect to="/" />
            }
          </Route>
          <Route 
            exact 
            path='/signin'
            >
            {() =>
              !loggedIn ? 
                <Login 
                  onLogIn={onLogIn}
                  loginError={loginError}
                />
              :
              <Redirect to="/" />
            }
          </Route>
          <Route path='/*'>
            <NotFound 
              setIs404={setIs404}
              goBack={goBack}
            />
          </Route>
        </Switch>
        <Footer 
          page={location.pathname}
        />
        <InfoTooltip
          state={infoTooltip}
          onClose={closePopup}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;