import { createStore } from 'vuex'

import user from './modules/user.js'
import home from './modules/home.js'
import music from './modules/music.js'

export default createStore({
  modules:{
    user,
    home,
    music
  }
})
