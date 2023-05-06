"use strict"


// 공공데이터 소상공인 상가 정보 OPEN API 사용
const { resolve } = require('path');
const request = require('request');
const { reject } = require('underscore');
const serviceKey = '?serviceKey=p0%2BHQGnCYhn4J%2BB0BJpY5cOD0thCQ29az7PS9MQ4gLwPqbZrSns3eFy4VZ%2BUSc95PAkZUjK%2FGiir%2FcMk1FAq4A%3D%3D';
const endPoint = 'http://apis.data.go.kr/B553077/api/open/sdsc2/';
const type = '&type=json';
let operation;
let key;

// 지정 상권조회: storeZoneOne
operation = 'storeZoneOne';
key = '&key=9174'; 

// 행정구역단위 상권조회: storeZoneInAdmi
operation = 'storeZoneInAdmi';

// 단일 상가업소 조회: storeOne
operation = 'storeOne';

let apiAdr = endPoint + operation + serviceKey; // 더 추가

class RetailerStorage{
    static getStoreOneZone(){

    }

    static getStoreZoneInAdmi(){

    }
}
