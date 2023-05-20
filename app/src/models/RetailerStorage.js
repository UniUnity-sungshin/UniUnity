"use strict"
// 공공데이터 소상공인 상가 정보 OPEN API 사용
const { resolve } = require('path');
const request = require('request');
const { reject, min } = require('underscore');
const serviceKey = 'p0%2BHQGnCYhn4J%2BB0BJpY5cOD0thCQ29az7PS9MQ4gLwPqbZrSns3eFy4VZ%2BUSc95PAkZUjK%2FGiir%2FcMk1FAq4A%3D%3D';
const endPoint = 'http://apis.data.go.kr/B553077/api/open/sdsc2/';


class RetailerStorage{
    // 지정 상권조회: storeZoneOne
    static getStoreOneZone(){

    }
    // 행정구역단위 상권조회: storeZoneInAdmi
    static getStoreZoneInAdmi(){
        return new Promise(async(resolve,reject)=>{
            // 시군구 코드 사용
            let apiAdr = endPoint + 'storeZoneInAdmi?divId=' + 'signguCd'+ '&key=' + '11290' + '&serviceKey=' + serviceKey + '&type=json';
        })
    }
    // 사각형내 상가업소 조회
    static getstoreListInRectangle(minx,miny,maxx,maxy){
      return new Promise(async(resolve,reject)=>{
        let apiAdr = endPoint + 'storeListInRectangle' + '?serviceKey=' + serviceKey + '&pageNo=1' + '&numOfRows=10' + 
                    '&minx=' + minx + '&miny=' + miny + '&maxx=' + maxx + '&maxy=' + maxy + '&type=json';
        
      })
    }
}
