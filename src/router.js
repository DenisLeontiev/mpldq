import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Home from './view/Home/Home';
import About from './view/About/About';
import Login from './view/Login/Login';
import Registration from './view/Registration/Registration';
import NewsList from './view/News/News'
import singleNews from './view/News/singleNews'
import Contest from './view/Contest/Contest';
import ForgotPassword from './view/ForgotPassword/ForgotPassword';
import Competition from './view/Competition/Competition';
import CompetitionList from './view/Competition/CompetitionList';
import Search from './view/Search/Search';
import Organization from './view/Organization/Organization';
import OrganizationList from './view/Organization/OrganizationList';
import User from './view/User/User';
import UserList from './view/User/UserList';
import UserDetails from './view/User/UserDetails';
import UserEdit from './view/User/UserEdit';
import UserCreateProfile from './view/User/UserCreateProfile';
import Error404 from './view/Error/404';
import Page from './view/Page/Page';
import UserEditMultiplu from './view/User/UserEditMultiplu';
import ResetPassword from './view/ResetPassword/ResetPassword';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
        }, {
            path: '/about',
            component: About,
            meta: {
                title: 'Про проект',
                headerClean: true
            }
        }, {
            path: '/contest',
            component: Contest,
            meta: {
                title: 'Все про конкурс',
            }
        }, {
            path: '/login',
            component: Login,
            meta: {
                hideCommon: true
            }
        }, {
            path: '/registration',
            component: Registration,
            meta: {
                hideCommon: true
            }
        }, {
            path: '/news',
            component: NewsList,
            meta: {
                title: 'Новини',
                headerClean: true
            }
        }, {
            name: 'singleNews',
            path: '/news/:id',
            component: singleNews,
            meta: {
                title: 'Мед реформа',
                headerClean: true
            },
        }, {  
            path: '/forgot-password',
            component: ForgotPassword,
            meta: {
                hideCommon: true
            }
        }, {  
            path: '/resetpassword',
            component: ResetPassword,
            meta: {
                hideCommon: true
            }
        }, {
            path: '/competitions',
            redirect: '/clinics'
        }, {
            name: 'Clinics',
            path: '/clinics',
            component: CompetitionList,
            meta: {
                title: 'Конкурси',
                headerClean: true
            }

        }, {
            name: 'Clinic',
            path: '/clinics/:slug',
            component: Competition,
            meta: {
                title: 'Конкурси',
                headerClean: true
            }
        }, {
            path: '/search',
            component: Search,
            meta: {
                title: 'Пошук'
            }
        }, {
            name: 'Organizations',
            path: '/organizations',
            component: OrganizationList,
            meta: {
                title: 'Організації',
                headerClean: true
            }
        }, {
            name: 'Organization',
            path: '/organizations/:id',
            component: Organization,
            meta: {
                title: 'Сторінка органу влади'
            },
        }, {
            path: '/participants',
            redirect: '/users/'
        }, {
            path: '/user',
            redirect: '/users/'
        }, {
            path: '/users/',
            component: UserList,
            meta: {
                headerClean: true,
                title: 'Кандидати'
            }
        }, {
            path: '/user/:id',
            component: User,
            meta: {
                headerClean: true
            },
            children: [
                {
                    name: 'UserDetails',
                    path: '',
                    component: UserDetails,
                    meta: {
                        headerClean: true
                    },
                },
                {
                    name: 'UserEdit',
                    path: 'edit',
                    component: UserEdit,
                    meta: {
                        headerClean: true
                    }
                },
                {
                    name: 'UserEditMultiplu',
                    path: 'edit-participant',
                    component: UserEditMultiplu,
                    meta: {
                        headerClean: true
                    }
                },
                {
                    name: 'UserCreateProfile',
                    path: 'create-profile',
                    component: UserCreateProfile,
                    meta: {
                        headerClean: true
                    },
                }
            ]
        }, {
            name: '404',
            path: '/404',
            component: Error404,
            meta: {
                title: '404 Error',
                status: 'error'
            }
        }, {
            path: '/page',
            redirect: '/'
        }, {
            path: '/page/:id',
            component: Page,
            meta: {
                title: 'Сторінка',
                headerClean: true
            }
        }, {
            path: '*',
            component: Page,
            meta: {
                title: 'Сторінка',
                headerClean: true
            }
        }
    ]
});