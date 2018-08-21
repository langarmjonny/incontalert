import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';/*
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsLineComponent } from './chartjs/chartjs-line.component';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
import { ChartjsBarHorizontalComponent } from './chartjs/chartjs-bar-horizontal.component';
import { ChartjsRadarComponent } from './chartjs/chartjs-radar.component';
import { D3BarComponent } from './d3/d3-bar.component';
import { D3LineComponent } from './d3/d3-line.component';
import { D3PieComponent } from './d3/d3-pie.component';
import { D3AreaStackComponent } from './d3/d3-area-stack.component';
import { D3PolarComponent } from './d3/d3-polar.component';
import { D3AdvancedPieComponent } from './d3/d3-advanced-pie.component';
*/
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { EchartsInventurLineComponent } from './echarts-inventur/echarts-inventur-line.component';
import { EchartsInventurPieComponent } from './echarts-inventur/echarts-inventur-pie.component';
import { EchartsInventurBarComponent } from './echarts-inventur/echarts-inventur-bar.component';
import { EchartsInventurMultipleXaxisComponent } from './echarts-inventur/echarts-inventur-multiple-xaxis.component';
import {EchartsInventurAreaStackComponent } from './echarts-inventur/echarts-inventur-area-stack.component';
import {EchartsInventurBarAnimationComponent } from './echarts-inventur/echarts-inventur-bar-animation.component';
import { EchartsInventurRadarComponent } from './echarts-inventur/echarts-inventur-radar.component';
import { EchartsUserLineComponent } from './echarts-user/echarts-user-line.component';
import { EchartsUserPieComponent } from './echarts-user/echarts-user-pie.component';
import { EchartsUserBarComponent } from './echarts-user/echarts-user-bar.component';
import { EchartsUserMultipleXaxisComponent } from './echarts-user/echarts-user-multiple-xaxis.component';
import {EchartsUserAreaStackComponent } from './echarts-user/echarts-user-area-stack.component';
import {EchartsUserBarAnimationComponent } from './echarts-user/echarts-user-bar-animation.component';
import { EchartsUserRadarComponent } from './echarts-user/echarts-user-radar.component';

const components = [
/*
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  ChartjsBarHorizontalComponent,
  ChartjsRadarComponent,
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AreaStackComponent,
  D3PolarComponent,
  D3AdvancedPieComponent,
  */
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
  EchartsInventurLineComponent,
  EchartsInventurPieComponent,
  EchartsInventurBarComponent,
  EchartsInventurMultipleXaxisComponent,
  EchartsInventurAreaStackComponent,
  EchartsInventurBarAnimationComponent,
  EchartsInventurRadarComponent,
  EchartsUserLineComponent,
  EchartsUserPieComponent,
  EchartsUserBarComponent,
  EchartsUserMultipleXaxisComponent,
  EchartsUserAreaStackComponent,
  EchartsUserBarAnimationComponent,
  EchartsUserRadarComponent,
];

@NgModule({
  imports: [ThemeModule, ChartsRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
