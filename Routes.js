'use strict';
import setting from 'funshare/src/pages/setting';
import search from 'funshare/src/pages/search';
import Home from 'funshare/src/pages/Home';
import Home1 from 'funshare/src/pages/Home1';
import login from 'funshare/src/pages/login';
import signup from 'funshare/src/pages/signup';
import account from 'funshare/src/pages/account';
import button from 'funshare/src/components/button';
import Onboarding from 'funshare/Screens/Onboarding';
import LogoutButton from 'funshare/Views/LogoutButton';
import OnboardingButton from 'funshare/Views/OnboardingButton';
import PostButton from 'funshare/Views/PostButton';
import ProfileIcon from 'funshare/src/components/ProfileIcon';
import details from 'funshare/src/pages/details';
import fuck from 'funshare/src/pages/fuck';
import addstuff from 'funshare/src/pages/addstuff';
import mystuff from 'funshare/src/pages/mystuff';
import plus from 'funshare/src/components/plus';
import fertig from 'funshare/src/components/fertig';
import wishlist from 'funshare/src/pages/wishlist';
import chatscreen from 'funshare/src/pages/chatscreen';


class Routes {
  get(route, args) {
    if ("undefined" == typeof this[route]) {
      console.warn("No route found with name: " + route);
      return false;
    } else {
      return this[route].call(this, args);
    }
  }


  login() {
    return {
      name: "login",
      title: "login",
      component: login,
      leftButton: button,
      rightButton: button,
      hideNavigationBar: true,
      statusBarStyle: "light-content"
    }
  }
  chatscreen() {
    return {
      name: "chatscreen",
      
      component: chatscreen,
      
      hideNavigationBar: true,
      statusBarStyle: "light-content"
    }
  }
  Home() {
    return {
      name: "Home",      
      component: Home,
      hideNavigationBar: true,
      statusBarStyle: "light-content"
    }
  }

  signup() {
    return {
      name: "signup",
      title: "signup",
      component: signup,
      hideNavigationBar: true,
      rednav:false,
      statusBarStyle: "light-content"
    }
  }

  setting() {
    return {
      name: "setting",
      component: setting,
    }
  }
  account() {
    return {
      name: "account",     
      component: account,     
    }
  }
  wishlist() {
    return {
      name: "wishlist",
      component: wishlist,
      statusBarStyle: "light-content"
    }
  }
  onboarding(user) {
    return {
      name: "onboarding",
      title: "Welcome",
      component: Onboarding,
      passProps: { user: user },
      statusBarStyle: "light-content"
    }
  }

  Home1(user) {
    return {
      name: "Home1",  
      component: Home1,
      passProps: { user: user },    
      statusBarStyle: "light-content"
    }
  }
  
  details(desc,piclink,title,gback ) {
    return {
      name: "details",
      title: "details",
      component: details,
      passProps: { desc:desc , piclink :piclink,title:title, gback:gback },
      statusBarStyle: "light-content"
    }
  }
  
  fuck(desc,piclink,title,itemkey, itemcategory ) {
    return {
      name: "fuck",
      title: "fuck",
      component: fuck,  
      passProps: { desc: desc , piclink: piclink,title: title , itemkey: itemkey , itemcategory: itemcategory},
      statusBarStyle: "light-content"
    }
  }
  mystuff() {
    return {
      name: "mystuff",
      component: mystuff,     
      statusBarStyle: "light-content"
    }
  } 
  addstuff() {
    return {
      name: "addstuff",
      component: addstuff,
    }
  }
  search() {
    return {
      name: "search",
      component: search,
    }
  }
  
  
}

export default new Routes()
