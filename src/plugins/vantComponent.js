import {
    Button,
    Icon,
    Search,
    Swipe,
    SwipeItem,
    Popup,
    Form,
    Field,
    CellGroup,
    PasswordInput,
    NumberKeyboard,
    Tab, Tabs,  Col, Row, ConfigProvider,  Sticky
  
} from 'vant';

let vantCom = [
    Button, Icon, Search, Swipe, SwipeItem, Popup, Form, Field, CellGroup, PasswordInput, NumberKeyboard,Tab, Tabs, Col, Row, ConfigProvider,  Sticky, 
]
export default function getVant(app) {
    vantCom.forEach(item => {
        return app.use(item)
    })
}