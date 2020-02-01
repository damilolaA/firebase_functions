import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminDashBoard from './components/AdminDashBoard';
import ViewCategory from './components/ViewCategory';
import EditCategory from './components/EditCategory';
import AddBook from './components/AddBook';
import ViewBook from './components/ViewBooks';
import EditBook from './components/EditBook';
import AdminLanding from './components/AdminLanding';
import AdminLogout from './components/AdminLogout';

const FourOFour = () => <h1>Hey you are lost</h1>;

const App = () => (
   
    <BrowserRouter>
      <div className="App">
      	<Switch>
          <Route exact path="/" component={AdminLanding} /> 
      		<Route path="/register" component={AdminRegister}/>
      		<Route path="/login" component={AdminLogin} />
      		<Route path="/dashboard" component={AdminDashBoard}/>
      		<Route path="/categories" component={ViewCategory}/>
      		<Route path="/editCategory/:id" component={EditCategory}/>
      		<Route path="/addBook" component={AddBook}/>
          <Route path="/viewBooks" component={ViewBook}/>
          <Route path="/editBook/:id" component={EditBook}/>
          <Route path="/logout" component={AdminLogout}/>
          <Route component={FourOFour} />
      	</Switch>
      </div>
    </BrowserRouter>
 
);

export default App;
