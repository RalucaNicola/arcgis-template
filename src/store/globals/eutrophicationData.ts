import { DSVRowArray } from 'd3';

const eutrophicationData: {
  yearly: DSVRowArray<string> | null;
  monthly: DSVRowArray<string> | null;
  countryData: DSVRowArray<string> | null;
} = {
  yearly: null,
  monthly: null,
  countryData: null
};

export function setEutrophicationDataYearly(data: DSVRowArray<string>) {
  eutrophicationData.yearly = data;
}

export function setEutrophicationDataMonthly(data: DSVRowArray<string>) {
  eutrophicationData.monthly = data;
}

export function setEutrophicationCountryData(data: DSVRowArray<string>) {
  eutrophicationData.countryData = data;
}

export function getEutrophicationData() {
  return eutrophicationData;
}
