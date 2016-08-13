import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {
  DevToolsExtension,
  NgRedux
} from 'ng2-redux';
import {NgReduxRouter} from 'ng2-redux-router';
import {
  routing,
  appRoutingProviders
} from './sample-app.routing';
import {HttpModule} from '@angular/http';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import {RioSampleApp} from './sample-app';
import {SessionActions} from '../actions/session.actions';
import {SessionEpics} from '../epics/session.epics';
import {
  RioLoginForm,
  RioLoginModal
} from '../components/login';
import {
  RioModalContent,
  RioModal
} from '../components/modal';
import {
  RioInput,
  RioFormGroup,
  RioFormError,
  RioForm,
  RioLabel
} from '../components/form';
import {
  RioNavigator,
  RioNavigatorItem
} from '../components/navigator';
import {RioAlert} from '../components/alert/alert.component';
import {RioButton} from '../components/button/button.component';
import {RioLogo} from '../components/logo/logo.component';
import {RioAboutPage} from '../pages/about.page';
import {RioCounterPage} from '../pages/counter.page';
import {RioContainer} from '../components/container/container.component';
import {RioCounter} from '../components/counter/counter.component';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    CommonModule,
    HttpModule
  ],
  declarations: [
    RioSampleApp,
    RioModal,
    RioLoginModal,
    RioLoginForm,
    RioModalContent,
    RioAlert,
    RioButton,
    RioInput,
    RioForm,
    RioFormError,
    RioFormGroup,
    RioLabel,
    RioNavigator,
    RioNavigatorItem,
    RioLoginModal,
    RioLogo,
    RioButton,
    RioAboutPage,
    RioCounterPage,
    RioContainer,
    RioCounter
  ],
  bootstrap: [
    RioSampleApp
  ],
  providers: [
    DevToolsExtension,
    FormBuilder,
    NgRedux,
    NgReduxRouter,
    appRoutingProviders,
    SessionActions,
    SessionEpics
  ]
})
export class RioSampleAppModule { }
