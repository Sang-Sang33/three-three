import { Vector3Tuple } from 'three';

interface Result<T> {
  success: boolean;
  message: string;
  resultData: T;
  statusCode: number;
}

export interface IGetMainResultData {
  id: string;
  canvasCode: string;
  xaxisLength: number;
  yaxisLength: number;
}

export interface IGetCustomAreaListResultData {
  id: string;
  name: string;
  fromXaxis: number;
  toXaxis: number;
  fromYaxis: number;
  toYaxis: number;
}

export type ELocationStatus = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IBasicProps {
  position: Vector3Tuple;
  width: number;
  height: number;
}

export interface LocationList {
  id: string;
  canvasRow: number;
  canvasColumn: number;
  xaxis: number;
  yaxis: number;
  zaxis: number;
  locationStatus: ELocationStatus;
  isWorkbench: boolean;
}

export interface IGetAreaListResultData {
  id: string;
  canvasId: string;
  fromXaxis: number;
  fromYaxis: number;
  toXaxis: number;
  toYaxis: number;
  canvasAreaType: number;
  locationList: LocationList[];
  tunnelCode?: string;
  tunnelName?: string;
}

export type IGetMain = Result<IGetMainResultData>;
export type IGetCustomAreaList = Result<IGetCustomAreaListResultData[]>;
export type IGetAreaList = Result<IGetAreaListResultData[]>;
