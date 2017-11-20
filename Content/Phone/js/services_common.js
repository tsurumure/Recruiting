/*
  2017.08.28 by Mure
  Common Witch PC and Mobile
*/
angular.module('starter.services_common', ['ngCookies'])

// 用法： {{UserBaseInfor.LiveAreaId | KeyToName:'City':ConstantXML}}
.filter("KeyToName",function($rootScope, $http, $q, $timeout){
  return function(key, paramValue, ConstantXml, paramIsArray){
      if(key){
          var tempKey = '';
          var deferred = $q.defer(); //
          if(key.split(',').length>1){
              angular.forEach(angular.element(ConstantXml).find('Item'), function(item, i){
                  if(angular.element(item).attr('name')===paramValue){
                      angular.forEach(angular.element(item).find('node'), function(itemSecond, iSecond){
                          angular.forEach(key.split(','), function(itemKey){
                              if(angular.element(itemSecond).attr('key')===itemKey){
                                  tempKey += angular.element(itemSecond).attr('value') + ', ';
                              }
                          });
                      });
                      deferred.resolve(tempKey.substring(0, tempKey.lastIndexOf(','))); //
                  }
              });
          }else{
              angular.forEach(angular.element(ConstantXml).find('Item'), function(item, i){
                  if(angular.element(item).attr('name')===paramValue){
                      angular.forEach(angular.element(item).find('node'), function(itemSecond, iSecond){
                          if(angular.element(itemSecond).attr('key')===key){
                              var rst = angular.element(itemSecond).attr('value');
                              deferred.resolve(rst); //
                          }
                      });
                  }
              });
          }
          return deferred.promise.$$state.value; //
      }
  }
})