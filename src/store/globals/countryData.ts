import { DSVRowArray } from 'd3';

let countryData: DSVRowArray<string> | null = null;

export function setCountryData(data: DSVRowArray<string>) {
  countryData = data;
}

export function getCountryData() {
  return countryData;
}
