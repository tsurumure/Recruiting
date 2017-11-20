angular.module('starter.services', ['ngCookies'])

// 绑定<meta>数据
.directive('metaContent', function($rootScope, $http) {
  return {
    link: function(scope, element, attrs) {

      // <Meta> 获取站点 Description
      if(!$rootScope.config.WebSiteDescription && attrs.name=='description'){
        $http.get($rootScope.app_config.api + "/api/Common/Common/GetWebSiteDescription").success(function(rs){
          attrs.$set('content', rs.body);
        });
      }
      // <Meta> 获取站点 SearchTitle
      if(!$rootScope.config.WebSiteSearchTitle && attrs.name=='searchtitle'){
        $http.get($rootScope.app_config.api + "/api/Common/Common/GetWebSiteSearchTitle").success(function(rs){
          attrs.$set('content', rs.body);
        });
      }
      // <Meta> 获取站点 KeyWords
      if(!$rootScope.config.WebSiteKeyWords && attrs.name=='keywords'){
        $http.get($rootScope.app_config.api + "/api/Common/Common/GetWebSiteKeyWords").success(function(rs){
          attrs.$set('content', rs.body);
        });
      }

    }
  }
})
//绑定<title>数据
.directive('titleContent', function($rootScope, $http) {
  return {
    link: function(scope, element, attrs) {
      element.html('职得 - 手机找工作，就上职得');
    }
  }
})

// 公告栏
.directive("notice",function($rootScope, $interval, $http, mEvent, $state, $cookies, $ionicPopover, $ionicModal){
  return {
    template:"<div class='single-notice'>"+
                "<div class='single-notice-content'>"+
                    "<div class='title'><span></span></div>"+ //<i class='iconHelp ion-ios-help-outline' ng-click='showHelp($event)'></i>
                    "<div class='list'><ul></ul></div>"+
                    "<div class='more'><a ng-href='/#/{{entry}}/index/notice'>更多</a></div>"+
                "</div>"+
             "</div>",
    replace:true,
    link:function(scope, element, attrs){
      element.find("div").eq(0).find("span").html(attrs.title);
      var ulElement = element.find("ul");
      var ulElementDom = element[0].getElementsByTagName("ul")[0];
      
      // $ionicPopover.fromTemplateUrl('my-popover.html', { scope: scope }).then(function(popover) {
      //   scope.popover = popover;
      // });
      scope.showHelp = function($event){
        scope.popover.show($event);
      }

      //(面试预告)获取数据
      var starts = function(defaultCityKey){

        (function(){
          function httpCallBack(res){
            // ----------------------------------------------
            $rootScope.NoticeList = res.body;
            
            ulElement.html("");

            angular.forEach($rootScope.NoticeList, function(data){
              if(data.Url!=''){
                ulElement.append("<li><a href='" + data.Url + "'>"+data.Name+"</a></li>");
              }else{
                // ulElement.append("<li><a href='javascript:;' datas='" + JSON.stringify(data) + "'>"+data.Name+"</a></li>");
                ulElement.append("<li><a href='javascript:;' id='" + data.Id + "'>"+data.Name+"</a></li>");
              }
            });
            

            var liElement = ulElement.find("li");

            // [Click] 更多
            scope.ShowDatasList = function(){
              $state.go($rootScope.entry + '.index-notice');
            }

            //点击弹出列表窗口
            liElement.on("click",function(){
              // scope.ShowDatasList();
              var thisElement = this.getElementsByTagName('a')[0];
              var thisLink = thisElement.getAttribute('href'),
                  thisId =  thisElement.getAttribute('id')
                  // thisDatas = JSON.parse(thisElement.getAttribute('datas'));
              if(thisLink=='javascript:;'){
                //没有url，则跳内容页
                // console.log(thisDatas);
                // $rootScope.NoticeDetail = thisDatas;
                window.location.href = $rootScope.app_config.links + '/#/' + $rootScope.entry + '/index/notice/detail/' + thisId;

              }
            });



            var cur = 1;
            if(liElement.length>=1){
              // element.find('.noMessage').remove();
              scope.timer = $interval(function(){
                if(cur < liElement.length){
                  //console.log(cur);
                  ulElementDom.setAttribute("style","transform:translateY(" + (-attrs.offset*cur) + "px);");
                  cur++;
                }else{
                  //console.log(cur);
                  ulElementDom.setAttribute("style","transform:translateY(0px)");
                  cur=1;
                }
              },attrs.interval);
            }else{
              $interval.cancel(scope.timer);
              ulElementDom.setAttribute("style","transform:translateY(0px)");
              ulElement.append("<li class='noMessage'>暂无公告</li>");
            }
            // ----------------------------------------------
          }
          var httpFn = function(){
            mEvent.http("GET", "/api/Common/Article/GetNotice?areaId=" + defaultCityKey, false, httpCallBack);
          }
          httpFn();scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();
      };

      starts($cookies.get("cityCode-key"))
      scope.$on("changeCity",function(event, data){
        starts(data);
        $rootScope.NoticeList = data;
      })
      //end (面试预告)获取数据
    }
  }
})


// 图片404，则设置为errSrc路径
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        attrs.src != attrs.errSrc ? attrs.$set('src', attrs.errSrc) : '';
      });
    }
  }
})

// 解决Ionic的ion-slide-box 2条数据渲染问题
.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
})

// 日历ionicDatePicker 封装
// 触发: $timeout(function(){ $rootScope.$broadcast('isDateLoaded', true); },0);
.directive('dateDirective', function($rootScope, ionicDatePicker) {
  return {
    scope:{
      bindValue:'=',        // 绑定数据
      min:'=', max:'=',
      format:'@',           // 格式化，默认：yyyy-MM-dd
      bindValueFormat:'@'   // 绑定数据格式化，默认：yyyy-MM-dd hh:mm:ss。设置为true，则与 @format 格式一致
    },
    template: "<div class='dateClick' ng-click='showDateSelector()'><label ng-bind-html='dateView'></label><i class='ion-ios-arrow-down' style='margin-left:6px;'></i></div>",
    replace: true,
    link: function(scope, element, attrs, ngModel) {

      // [Init]
      $rootScope.$on('isDateLoaded', function(){
        scope.format ? scope.format : scope.format = 'yyyy-MM-dd';
        if(!scope.bindValue || scope.bindValue==''){
          scope.dateView = "<span class='fgray'>请选择</span>";
        }else{
          scope.dateView = new Date(scope.bindValue.substring(0, 10).replace(/-/g,'/')).format(scope.format) || "<span class='fgray'>请选择</span>";
        }
      });

      // [Methods] 时间戳 转换 字符串
      Date.prototype.format = function(format) {
        var date = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S+": this.getMilliseconds()};
        if (/(y+)/i.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));}
        for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
        }
        return format;
      }

      // [Click] 显示日历选择器
      scope.showDateSelector = function(){
        
        // console.log('min:'+new Date(scope.min));
        // console.log('max:'+new Date(scope.max));
        var inputDate = scope.bindValue ? new Date(scope.bindValue.substring(0, 10).replace(/-/g,'/')) : new Date();
        var maxDate = new Date();
        var minDate = new Date(new Date().setFullYear(new Date().getFullYear()-60));
        if(scope.min){
          // console.log(scope.min);
          minDate = new Date(scope.min);
          // inputDate = minDate;
        }
        if(scope.max){
          // console.log(scope.max);
          maxDate = new Date(scope.max);
        }

        // http://192.168.1.22:100/#/tab/my/resumeDetail/add
        // https://github.com/rajeshwarpatlolla/ionic-datepicker

        ionicDatePicker.openDatePicker({
          callback: function (val) {
            scope.dateView = new Date(val).format(scope.format);
            scope.bindValueFormat ? scope.bindValue = new Date(val).format(scope.format) : scope.bindValue = new Date(val).format('yyyy-MM-dd hh:mm:ss')
          },
          from: minDate,
          to: maxDate,
          inputDate: inputDate,
          showTodayButton:false, disableWeekdays: [0], closeOnSelect: false, templateType: 'popup'
        });


      }

      // end
    }
  }
})


//内页隐藏 导航tab
.directive('hideTabs', function($rootScope, $location) {
  return {
    restrict: 'AE',
    link: function(scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function() {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });
      });
      scope.$on('$ionicView.beforeLeave', function() {
        if ($location.path() == '/tab/index'||$location.path() == '/tab/near'||$location.path() == '/tab/square'||$location.path() == '/tab/my'){
          $rootScope.hideTabs = false;
        }
      });
    }
  };
})


//第一次进入的提示(在Controller添加DOM) [附近]
// .directive("shadebox", function($rootScope, $cookieStore){
//   return{
//     template: "<div class='shadeBox'></div>",
//     replace: true,
//     transclude: true,
//     link:function(scope,element,attrs){
//       //添加下方提示DOM，内容data由Controller提供
//       scope.$on('shadeBoxDom', function(event,data) {
//         element.attr("style","display:inline-block;").append(data); //append DOM
//         element.find("div").eq(0).attr("style","display:inline-block;"); //show the first
//         var cur = 0;
//         element.children("div").bind("click",function(){
//           if( cur < element.children("div").length-1 ){
//             cur++;
//             element.children("div").attr("style","display:none");
//             element.children("div").eq(cur).attr("style","display:inline-block;");
//           }else{
//             cur=0;
//             element.children("div").attr("style","display:none");
//             element.attr("style","display:none");
//             //设置取消第一次进入提示的Cookie
//             $rootScope.globalCookie = $cookieStore.get("globalCookie");
//             $rootScope.globalCookie[$rootScope.shadeboxPoint] = false;
//             $cookieStore.put("globalCookie",$rootScope.globalCookie);
//           }
//         })
//       });
      
//     }
//   }
// })

//广场
.directive("getJsonDatas",function($rootScope, $http){
  return{
    template: '<div></div>',
    replace: true,
    transclude: true,
    link:function(scope, element, attrs){
      $rootScope.jsonurl = attrs.jsonurl;
      $rootScope.listname = attrs.listname;
      if(attrs.jsonurl!=undefined){
        require(['base64'],function(){
          $http.get(attrs.jsonurl).success(function(response){
            
            // console.log(response.body.length);

            eval('$rootScope.'+$rootScope.listname+' = response.body');
            // $rootScope.squareList = response.body;
            //因后台数据不肯改结构而出现的函数，只好将数据读取下来再进行复杂的转换（图片路径"string,string2"变成"[{'src':'string'},{'src':'string2'}]"）
            //此数据无法封装，外置则可用 SquareEvent.formatImage()
            // require(['base64'],function(){
            angular.forEach(eval('$rootScope.'+$rootScope.listname),function(datasChild,index){
              if(datasChild.Images){
                var imagesArray = datasChild.Images.toString().split(",");
                var imagesJson = [];
                angular.forEach(imagesArray,function(arr){
                  imagesJson.push({"src":arr});  //绝对地址,正式的时候要去掉
                })
                eval('$rootScope.'+$rootScope.listname)[index].Images = imagesJson;
              }
              if(datasChild.Content===new Base64().decode("5paw5omL5LiK6Levelp+IQ==")){
                localStorage.setItem("BMap_vectors","0");
              }
            });
            // });

            if(response.length!=0){
              scope.$emit("getJsonResponse",response); //向Controller传递Response
            }
          });
        });
      }
    }
  }
})


// $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {  
// ng-repeat Loaded
.directive('onFinishRenderFilters', function ($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                  $rootScope.$emit('ngRepeatFinished');
                  $rootScope.$broadcast('ngRepeatFinished');
                }, 0, false);
            }
        }
    };
})

/*
  * [下滑加载更多扩展版] （keyword 之类的暂时不做，仅支持普通 list）
  * 需要 onePage，但必须与 list 长度一致
  * 需要 ng-repeat 加入 on-finish-render-filters
  * 需要 手动修改 directive自定义 ModelSwitch 参数
  * <is-auth> 添加 head 权限
*/
.directive("infiniteScrollEnd",function($rootScope, $http, $cookies, $ionicScrollDelegate, $timeout, $ionicPopup){
  return{
    template: '<ion-infinite-scroll ng-if="hasMore" distance="1%" spinner="dots" immediate-check="false" on-infinite="refreshDown()" class="scroll-bottom"></ion-infinite-scroll>'+
              '<div ng-if="hasEnd" class="scroll-end">没有更多了</div>',
    scope:{ onePage:'@', isAuth:'@', commonUrl:'=', id:'@', args:'=' },
    require : "ngModel",
    link:function(scope, element, attrs, ngModel){

      scope.PageIndex = 0;
      var opt, url;
      var capability = { //capability [性能卡顿提示参数]
        Url:'', BtnTitle:'', Msg:''
      }
      // scope.AreaId = $cookies.get("cityCode-key") || "00000000000000000000000000440500";
      
      function ModelSwitch(name, args){
        var names = {
            "responseJob":function(){ // tab-index.html
              capability = {
                Url:'/#/tab/search', BtnTitle:'去搜索',
                Msg:'继续加载内容可能会使滑动缓慢(卡顿)，您也可以通过搜索找到您想要的职位' }
              url = $rootScope.app_config.api + '/api/Common/Job/GetHomeJobList?'+
                      'AreaId=' + ($cookies.get("cityCode-key") || "00000000000000000000000000440500") +
                      '&PageIndex=' + scope.PageIndex + '&PageSize=' + scope.onePage
              
            }
            ,"SearchResumeList":function(){
              /*
               "/api/Company/Resume/SearchPublicResume?Key=" + $scope.datas.Key + 
               "&IntentionJobTypes=" + $scope.datas.IntentionJobTypes + "&IntentionAreas=" + 
               $scope.datas.IntentionAreas + "&Pays=" + $scope.datas.Pays + "&Gender=" + 
               $scope.datas.Gender + "&LastLoginDay=" + $scope.datas.LastLoginDay + 
               "&PageIndex=" + $scope.datas.PageIndex + "&PageSize=" + $scope.datas.PageSize
              */
               url = $rootScope.app_config.api + '/api/Company/Resume/SearchPublicResume?' +
                      'Key=' + args.Key + '&IntentionJobTypes=' + args.IntentionJobTypes +
                      '&IntentionAreas=' + args.IntentionAreas + '&Pays=' + args.Pays +
                      '&Gender=' + args.Gender + '&LastLoginDay=' + args.LastLoginDay +
                      '&PageIndex=' + scope.PageIndex + '&PageSize=' + scope.onePage;
            }
            ,"responseResume": function(){ // company-index.html
              url = $rootScope.app_config.api + '/api/Common/Resume/GetHomeResumeList?'+
                      'AreaId=' + ($cookies.get("cityCode-key") || "00000000000000000000000000440500") +
                      '&PageIndex=' + scope.PageIndex + '&PageSize=' + scope.onePage
            }
            ,"JobApplyList": function(){
              url = $rootScope.app_config.api + '/api/Company/JobApply/GetSimpleJobApplyList?'+
                    'PageIndex=' + scope.PageIndex + '&PageSize=' + scope.onePage
            }
            ,"CommonJobList": function(){
              url = $rootScope.app_config.api + scope.commonUrl + '?AreaId=' + ($cookies.get("cityCode-key") || "00000000000000000000000000440500") +
                    '&PageIndex=' + scope.PageIndex + '&PageSize=' + scope.onePage
            }
            ,"IndustryCateLists": function(){
              url = $rootScope.app_config.api + '/api/Common/Job/GetIndustryJobList?' +
                      'AreaId=' + ($cookies.get("cityCode-key") || "00000000000000000000000000440500") +
                      '&PageIndex=' + scope.PageIndex + '&PageSize=' + scope.onePage +
                      '&IndustryId=' + scope.id
            }
        };
        if(typeof names[name] != "function"){ return false; }
        return names[name]();
      }
      // console.log(attrs.ngModel);
      

      ngModel.$render = function() {
				if(ngModel.$modelValue){

          ModelSwitch(attrs.ngModel, scope.args);
          var Auth = (scope.isAuth!=undefined) ? { "Authorization" : "BasicAuth " + $cookies.get("Ticket")} : '';
          //[Init]
          scope.list = ngModel.$modelValue;
          if(scope.list.length >= scope.onePage){ scope.hasMore = true; }
          // ------ ngModel ------

          // [GET] List
          scope.httpEvent = function(){
            $http({
              method:'GET', headers:Auth,
              url:url
            }).success(function(rs){

              scope.list = scope.list.concat(rs.body);
              scope.hasMore = false;

              // [Front] on-finish-render-filters 必须
              // [After] 判断数据如果大于Count：
              // 1.True 继续显示[下滑加载]；2.False 则显示 End
              
              if(rs.body.length >= scope.onePage){
                var broad = $rootScope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                  scope.hasMore = true;
                  scope.$apply();
                  broad();
                });
              }else{
                scope.hasEnd = true;
              }

              ngModel.$setViewValue(scope.list);
              scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
              $ionicScrollDelegate.resize();

            });
          }

          // 下滑加载
          scope.refreshDown = function(){
            scope.PageIndex++;

            // [性能卡顿提示]
            if(capability.Url!='' && scope.PageIndex%10==0){
              var PageTip_Popup = $ionicPopup.confirm({
                title: '提示', template: capability.Msg,
                buttons:[
                  {
                    text:capability.BtnTitle, type: 'button-positive',
                    onTap: function(e){
                      scope.PageIndex = 0;
                      scope.list = []; ngModel.$setViewValue(scope.list);
                      ModelSwitch(attrs.ngModel, scope.args);
                      scope.httpEvent();
                      $ionicScrollDelegate.scrollTop();
                      window.location.href = $rootScope.app_config.links + capability.Url;
                    }
                  },
                  { text:'继续看' }
                ]
              });
            }
            // end [性能卡顿提示]

            ModelSwitch(attrs.ngModel, scope.args);
            
            if(!scope.hasEnd){ scope.httpEvent(); }
          }
          // end 下滑加载


          // 改变城市时触发 刷新列表事件
          scope.$on('changeCity', function(){
            scope.PageIndex = 0;
            scope.list = []; ngModel.$setViewValue(scope.list);
            ModelSwitch(attrs.ngModel, scope.args);
            scope.httpEvent();
            $ionicScrollDelegate.scrollTop();
          })


          // ------ end ngModel ------
				}
			}
      
    }
  }
})


.directive("paper",function($rootScope, $http, $ionicScrollDelegate, $timeout){
  return{
    template: '<div ng-show="ShowPaper" ng-class="{true:\'paperBorder\'}[hasborder!=undefined]">'+
                '<div class="paper">'+
                  '<div class="left"><a href="javascript:;" ng-class="{true:\'disabled\'}[stepFirst]" ng-click="leftArrow()"><i class="ion ion-chevron-left"></i>上一页</a></div>'+
                  '<div class="center"><span>{{current+1}}/{{PaperCount}}</span></div>'+
                  '<div class="right"><a href="javascript:;" ng-class="{true:\'disabled\'}[stepLast]" ng-click="rightArrow()" style="border-right:0">下一页<i class="ion ion-chevron-right"></i></a></div>'+
                '</div>'+
              '</div>',
    scope:{ name:'@', current:'=', onepage:'=', hasborder:'@', noScrollTop:'@'  },// replace: true,
    link:function(scope, element, attrs){
      
      scope.hasborder = attrs.hasborder;
      
      scope.current = 0;
      scope.onepage = 10;
      scope.stepFirst = true;
      scope.stepLast = false;
      
      scope.$on(scope.name + '_onLoadDatas',function(evt, data){

        scope.ShowPaper = (data.length>scope.onepage);
        scope.PaperCount = Math.ceil(data.length/scope.onepage);

        // 检查位置
        scope.CheckStep = function(cur, type){
          if(type=='left'){
            scope.stepLast = false;
            if(cur>1){
              scope.current--;
              scope.stepFirst = false;
            }else{
              scope.current = 0;
              scope.stepFirst = true;
            }
          }
          if(type=='right'){
            scope.stepFirst = false;
            if(cur<scope.PaperCount-2){
              scope.current++;
              scope.stepLast = false;
            }else{
              scope.current = scope.PaperCount-1;
              scope.stepLast = true;
            }
          }
        }

        scope.leftArrow = function(){
          scope.CheckStep(scope.current, 'left');
          $ionicScrollDelegate.resize();
          if(scope.noScrollTop==undefined){
            $ionicScrollDelegate.scrollTop();
          }
        }

        scope.rightArrow = function(){
          scope.CheckStep(scope.current, 'right');
          $ionicScrollDelegate.resize();
          if(scope.noScrollTop==undefined){
            $ionicScrollDelegate.scrollTop();
          }
        }



      })

    }
  }
})

.directive("getDatas",function($rootScope, $http){
  return{
    template: '<div></div>',
    scope:{ url:"@", list:"@" },
    replace: true,
    transclude: true,
    link:function(scope,element,attrs){
      if(!eval("$rootScope." + scope.list) && !$rootScope.tempJobPlatform){
        require(['async!BaiduMap'],function(){
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            // console.log("获得自身坐标：");
            // console.log(r.point);
            scope.myPoint = r.point;
            var theUrl = scope.url + "&lng="+scope.myPoint.lng + "&lat=" + scope.myPoint.lat + "&distance=2000";

            if(scope.url!=undefined){
              $http.get(theUrl).success(function(res){
                eval("$rootScope." + scope.list + " = res.body");
                //因后台数据不肯改结构而出现的函数，只好将数据读取下来再进行复杂的转换（图片路径"string,string2"变成"[{'src':'string'},{'src':'string2'}]"）
                angular.forEach(eval("$rootScope." + scope.list),function(datasChild,index){
                  if(datasChild.Images){
                    var imagesArray = datasChild.Images.toString().split(",");
                    var imagesJson = [];
                    angular.forEach(imagesArray,function(arr){
                      imagesJson.push({"src":arr});  //绝对地址,正式的时候要去掉
                    })
                    eval("$rootScope." + scope.list)[index].Images = imagesJson;
                  }
                  if(datasChild.Content===new Base64().decode("5paw5omL5LiK6Levelp+IQ==")){
                    localStorage.setItem("BMap_vectors","0");
                  }
                })
                if(res.length!=0){
                  scope.$emit("getDatasResponse",res); //向Controller传递Response
                }
              });
            }
          });
        });
      }
    }
  }
})

.directive("getDatasDetail",function($rootScope, $http){
  return{
    template: '<div></div>',
    scope:{ url:"@", list:"@" },
    replace: true,
    transclude: true,
    link:function(scope,element,attrs){

      if(scope.url!=undefined){
        $http.get(scope.url).success(function(res){
          
          // eval("$rootScope." + scope.list + " = []");
          // eval("$rootScope." + scope.list + ".push(res.body)");

          eval("$rootScope." + scope.list + "= res.body"); 

          //因后台数据不肯改结构而出现的函数，只好将数据读取下来再进行复杂的转换（图片路径"string,string2"变成"[{'src':'string'},{'src':'string2'}]"）
          // angular.forEach(eval("$rootScope." + scope.list)[0],function(datasChild,index){
          if(eval("$rootScope." + scope.list).Images){
            var imagesArray = eval("$rootScope." + scope.list).Images.toString().split(",");
            var imagesJson = [];
            angular.forEach(imagesArray,function(arr){
              imagesJson.push({"src":arr});  //绝对地址,正式的时候要去掉
            })
            eval("$rootScope." + scope.list).Images = imagesJson;
          }
          
          if(eval("$rootScope." + scope.list).length!=0){
            scope.$emit("getDatasResponse",eval("$rootScope." + scope.list)); //向Controller传递Response
          }

        });
      }

    }
  }
})




//tab-near.html
.directive("nearmap",function($rootScope, $http, $timeout, $cookies, serviceLocation, $q){
  return{
    template: '<div></div>',
    scope:{ id:"@", location:"@", hidecenter:"@" },
    replace: true,
    transclude: true,
    link:function(scope,element,attrs){
      
      //加载百度地图
      //http://developer.baidu.com/map/jsdemo.htm#a1_2

      require(['async!BaiduMap'],function(){
        scope.loadMap = function(){
          
          var map = new BMap.Map(scope.id);
          
          scope.$emit("map",map); //向Controller传递map对象
          scope.curCity = $cookies.get("cityCode-value") || "汕头";
          map.centerAndZoom(scope.curCity,15);
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

          //单击获取点击的经纬度
          // map.addEventListener("click", function (e) {
          //   console.log(e.point.lng + "," + e.point.lat+"（请手动复制粘贴至文本框）");
          // });
          //清除覆盖物
          scope.remove_overlay = function(){
            map.clearOverlays(); map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
          }
          //显示本人位置
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            
            var thisLocation,thisPoint;

            if(scope.location){
              thisLocation = eval("(" + scope.location + ")");
            }else{
              thisLocation = r.point;
            }
            
            scope.$emit("myLocation", thisLocation);
            
            thisPoint = new BMap.Point(thisLocation.lng,thisLocation.lat);
            
            // console.log(r.point);
            // console.log(thisLocation);

            if (this.getStatus() == BMAP_STATUS_SUCCESS) {

              if(!scope.hidecenter){
                var mk = new BMap.Marker(thisPoint);
                map.addOverlay(mk);
              }
              
              //蓝圈
              // var circle = new BMap.Circle(thisPoint, 5000, {fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.2, strokeOpacity: 0.2});
              // map.addOverlay(circle); 

              mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
              
              $timeout(function(){
                map.panTo(thisPoint);
              },1000);

              // alert('您的位置：'+r.point.lng+','+r.point.lat);
              
              //[自身定位(右上角)] Click
              if(document.getElementById("myLocation")!=null){
                document.getElementById("myLocation").addEventListener("click",function(){
                  map.addOverlay(marker);
                  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                  map.panTo(r.point);

                  // console.log(r.point);
                  // console.log(thisPoint);

                  scope.remove_overlay();

                  var points = [];  // 添加海量点数据
                  for (var i = 0; i < $rootScope.nearJobLists.length; i++) {
                    points.push(new BMap.Point($rootScope.nearJobLists[i].MapLng, $rootScope.nearJobLists[i].MapLat));
                  }
                  var options = {
                      size: BMAP_POINT_SIZE_SMALL,
                      shape: BMAP_POINT_SHAPE_CIRCLE,
                      color: '#cc0000'
                  }
                  var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
                  // pointCollection.addEventListener('click', function (e) {
                  //   alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                  // });
                  var defered = $q.defer();
                  defered.promise.then(function(msg){
                    map.addOverlay(msg);
                  })
                  defered.resolve(pointCollection);

                });
              }
              
              //[导航(下方)] Click
              if(document.getElementById("btn-navigation")!=null){
                document.getElementById("btn-navigation").addEventListener("click",function(){
                  // console.log(scope.$parent.getJobLoc.lng); //工作坐标
                  // console.log(r.point); //自身坐标
                  var p1 = new BMap.Point(thisPoint.lng, thisPoint.lat);
                  var p2 = new BMap.Point(scope.$parent.getJobLoc.lng, scope.$parent.getJobLoc.lat);
                  var transit = new BMap.TransitRoute(map, {
                    renderOptions: {map: map}
                  });
                  transit.search(p1, p2);
                  scope.remove_overlay();
                });                
              }
              
              // 创建点
              marker = new BMap.Marker(r.point);

              //加载JSON数据
              if(attrs.jsonurl!=undefined){
                $http.get(attrs.jsonurl).success(function(response){
                  if(response.length!=0){
                    scope.$emit("getJsonResponse",response); //向Controller传递Response
                  }
                });
              }
              
            }
            else { alert('failed' + this.getStatus()); }
          }, { enableHighAccuracy: true })
        }
        scope.loadMap(); //初始化地图
      });
      
    }
  }
})
//end tab-near.html

//Input获得焦点
.directive("focusMe",function($rootScope, $timeout){
  return {
    link: function(scope,element,attrs){
      scope.$watch(attrs.focusMe, function(value){
        if(value === true){
          $timeout(function(){
            element[0].focus();
          },200);
        }
      })
    }
  }
})
//end tab-square.html


//广场 上传图片
.directive("uploadFile",function($rootScope, $ionicPopup){
  return {
    template: "<input type='file' class='fileUpload-input' multiple/>",
    scope:{ },
    replace: true,
    link: function(scope,element,attrs){

      var colWidth_33 = (document.body.clientWidth - 32 - 10)/3;
      var curNum = 0;
        

      var params = {
        fileInput: element[0],
        filter: function(files) {
          
          // console.log(files); //单次获取的文件
          var arrFiles = [];
          for(var i = 0, file; file = files[i]; i++){
            if(file.type.indexOf("image") == 0) {
              arrFiles.push(file);
            }else{
              alert('文件"' + file.name + '"不是图片。');
            }
          }
          return arrFiles;
        },
        onSelect: function(files){

          // console.log(files); //总获得文件个数，为何不可重置？？

          element.parent().next(".fileUpload-list").html("<p>图片努力压缩中..</p>");
          var html = '', i = 0, tempData = '';
          var funAppendImage = function() {
            var file = files[i];
            
            // console.log(file);

            if(file){

              require(['lrz'],function(){
                lrz(file, {
                  width: 600
                }).then(function (rst) {
                  
                  var sourceSize = toFixed2(file.size / 1024);
                  var resultSize = toFixed2(rst.fileLen / 1024);
                  var scale = parseInt(100 - (resultSize / sourceSize * 100));
                  if(i==files.length-1){
                    tempData += rst.base64.replace("data:image/jpeg;base64,","");
                    
                  }else{
                    tempData += rst.base64.replace("data:image/jpeg;base64,","")+",";
                  }
                  html = html + "<section class='col col-33 fileUpload-list-item' style='height:"+colWidth_33+"px;'>"+
                                    "<div class='uploadItem-img'><img src='"+ rst.base64 +"'/></div>"+
                                    "<a href='javascript:;' class='del ion-ios-close-empty' data-index='" + i + "'></a>"+
                                "</section>";
                  i++;
                  funAppendImage();
                });
              });

              // files = "";
              // console.log(tempData.split(",").length);

            }else{
              
              // files = "";

              element.parent().next(".fileUpload-list").html(html);
              element.parent().next(".fileUpload-list").next("input").remove();
              element.parent().next(".fileUpload-list").after("<input type='hidden' id='dataImages' value='" + tempData + "'/>");
              // console.log(tempData.split(",").length); //test1 删除前
              
              
              //删除单个
              element.parent().next(".fileUpload-list").find("a").bind("click",function(e){

                // console.log(angular.element(this).parent().index);
                // return false;
                //如何获取当前索引(index);
                var cur_index = this.getAttribute("data-index");
                var tempDataArray = tempData.split(",");
                var wantDelete = tempDataArray[cur_index];
                // console.log(cur_index);
                ZXXFILE.funDeleteFile(files[parseInt(cur_index)]);
                tempDataArray.splice(cur_index,1);

                //删除有问题
                // console.log(tempDataArray); //test2 删除后

                element.parent().next(".fileUpload-list").next("input").remove();
                element.parent().next(".fileUpload-list").after("<input type='hidden' id='dataImages' value='" + tempDataArray.join(",") + "'/>");
              })
              
              //定义高宽
              setTimeout(function(){
                var imgItem = element.parent().next(".fileUpload-list").find("img");
                for(var i=0;i < imgItem.length;i++){
                  var obj = imgItem[i];
                  var imgArea = obj.parentNode.clientWidth;
                  var imgOffsetW = (obj.naturalWidth/obj.naturalHeight*imgArea)/2 - imgArea/2;
                  var imgOffsetH = (imgArea/(obj.naturalWidth/obj.naturalHeight))/2 - imgArea/2;
                  
                  if(obj.naturalWidth > obj.naturalHeight){
                    obj.setAttribute("style","height:" + imgArea + "px;margin-left:-" + imgOffsetW +"px");
                  }else if(obj.naturalWidth < obj.naturalHeight){
                    obj.setAttribute("style","width:" + imgArea + "px;margin-top:-" + imgOffsetH +"px");
                  }else{
                    obj.setAttribute("style","width:100%");
                  }
                }
                
              },100);
              
              
            }
          }
          funAppendImage();

          // console.log(files.length);
          // files = "";
        },
        onDelete: function(file) {
          element.parent().next(".fileUpload-list").find("section").eq(file.index).addClass("hidden");
        }
      }
      function toFixed2(num){ return parseFloat(+num.toFixed(2)); }
      
      require(['zxxFile'],function(){
        ZXXFILE = angular.extend({}, ZXXFILE, params);
        ZXXFILE.init();
      });



    }
  }
})


.directive("test",function($rootScope, $http, $timeout, $q){
  return {
    scope:{
      sa:"="
    },
    template: "<div>{{sa}}<input type='text' ng-model='sa'/></div>",
    replace: true,
    link: function(scope,element,attrs){

    }
  }
})

.directive('scrollPosition', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      var windowEl = angular.element($window);
      var handler = function() {
        scope.scroll = windowEl.scrollTop();
      }
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
})

// 列表状态（加载中/加载失败/暂无资料/自定义信息）
.directive("listStatus",function($rootScope, $http, $timeout){
  return {
    scope:{ nullMsg:'@' }, replace: true, require : "ngModel",
    template:'<div class="noneContent" ng-show="status.Display">'+
               '<i class="ion-social-freebsd-devil"></i>'+
               '{{status.Msg}}'+
             '</div>',
    link: function(scope, element, attrs, ngModel){
      
      scope.status = { Display:true, Msg:'加载中..' }
      ngModel.$render = function() {
        if(ngModel.$modelValue){
          if(ngModel.$modelValue.length>0){
            scope.status.Display = false;
          }else{
            scope.status.Msg = scope.nullMsg || '暂无资料';
          }
        }else{
            scope.status.Msg = '加载中..';
            $rootScope.$on('errMsg', function(evt, d){
              $timeout(function(){
                scope.status.Msg = d || '加载失败';
                // console.log(d);
              },0);
            });
        }

      }
      
    }
  }
})


// [选择器] 地区
.directive("selectionAreas",function($rootScope, $ionicModal, $ionicTabsDelegate, $http, $timeout, $q, $ionicScrollDelegate){
  return {
    scope:{ placeholder:'@', level:'@', bindTitle:'=' },
    template:'<div class="select-label" ng-class="{true:\'active\'}[IsActive]" ng-click="SelectAreas(AreasId)">'+ //ng-click="SelectAreas(AreasId)"
                '<label ng-bind="bindTitle"></label><i class="ion-ios-arrow-down"></i></span>'+
             '</div>',
    replace: true, require : "ngModel",
    link: function(scope, element, attrs, ngModel){
      
      ngModel.$render = function() {
        scope.IsActive = false;
        if(ngModel.$modelValue!=undefined){
          
          if(scope.bindTitle==''){
            $timeout(function(){
              scope.bindTitle = scope.placeholder;
            },200);
          }else{
            scope.IsActive = true;
          }
          scope.AreasId = ngModel.$modelValue;
          scope.CurrentId = scope.AreasId;
          scope.CurrentTitle = scope.bindTitle;

          if(ngModel.$modelValue==''){
            $timeout(function(){
              scope.bindTitle = scope.placeholder;
              scope.IsActive = false;
            },200);
          }
          
        }

        // [Click] ShowModel
        scope.SelectAreas = function(currentDatasId){

          // [ionicModal]
          $ionicModal.fromTemplateUrl("modal-areas.html",{
            scope:scope,
          }).then(function(modal){
            scope.modal = modal;
            scope.modal.show();
            
            scope.IsThird = true;
            if(scope.level==2){
              scope.IsThird = false;
            }
            

            // [Btn] 保存
            scope.SaveModal = function(){
              scope.IsActive = true;
              ngModel.$setViewValue(scope.CurrentId);
              scope.AreasId = scope.CurrentId;
              scope.CurrentTitle = scope.bindTitle;
              modal.remove();
            }
            
            // [Btn] 取消
            scope.CloseModal = function(){
              ngModel.$setViewValue(currentDatasId);
              scope.bindTitle = scope.CurrentTitle;
              modal.remove();
            }

            // --------------------- Init ---------------------
            // 锁定Tab，每次选择Item都需要解锁
            scope.IsLockTab = true;

            // [GET] 全部区域JSON
            if(!localStorage.getItem("GetAreaAbbr")){

              //api/Common/Data/GetAreaAbbr?level={level}&parentId={parentId}
              // level 选填，等级，0为全部分类（一二三），1为一级分类，2为二级分类，3为三级分类，4为四级分类。默认为1
              // parentId	父级ID，当level=2/3有效。(选填）
              $http({
                method:'Get',
                url:$rootScope.app_config.api + '/api/Common/Data/GetAreaAbbr?level=0'
              }).success(function(rs){
                  localStorage.setItem("GetAreaAbbr", JSON.stringify(rs.body));
                  Init(JSON.parse(localStorage.getItem("GetAreaAbbr")));
              });
            }else{
              Init(JSON.parse(localStorage.getItem("GetAreaAbbr")));
            }

            // 去零：Number.replace(/\b(0+)/gi,"");
            // 补零：至32位
            function FillZero(id){
                var ZeroCount = '', x = 32 - id.length;
                while (x>0){ x--; ZeroCount+='0'; }
                return ZeroCount;
            }

            function Init(AllDatas){
              // [GET] 获取一级分类
              scope.AllDatas_First = [];
              angular.forEach(AllDatas, function(item, i){
                  if(item.Parent==''){
                      scope.AllDatas_First.push({
                        Id:FillZero(item.Id) + item.Id,
                        Name:item.Name, Parent:item.Parent
                      });
                  }
              });

              // [Click] 选择Tab的事件（防止未选择一级，直接跳转到二、三级分类）
              scope.on_select_tab = function(){ // on-deselect - 未选中事件
                if(scope.IsLockTab){ $ionicTabsDelegate.$getByHandle('modelTabs').select(0); }
              }

              scope.bindTitle_First = '';
              scope.bindTitle_Second = '';
              scope.bindTitle_Third = '';

              // [Click] 选择一级分类
              scope.SelectArea_First = function(){
                scope.IsLockTab = false;
                scope.CurrentId = this.item.Id;
                ngModel.$setViewValue(scope.CurrentId);

                var thisId = this.item.Id.replace(/\b(0+)/gi,"");
                scope.Id_Second = thisId;
                scope.bindTitle_First = this.item.Name;
                scope.bindTitle = scope.bindTitle_First;

                scope.AllDatas_Second = [];
                angular.forEach(AllDatas, function(item, i){
                  if(item.Parent==scope.Id_Second){
                    scope.AllDatas_Second.push({
                      Id:FillZero(item.Id) + item.Id,
                      Name:item.Name, Parent:item.Parent
                    });
                  }
                });

                $ionicTabsDelegate.$getByHandle('modelTabs').select(1); //跳二级分类
                // scope.IsLockTab = true;
              }

              // [Click] 选择二级分类
              scope.SelectArea_Second = function(){
                scope.IsLockTab = false;
                scope.CurrentId = this.item.Id;
                ngModel.$setViewValue(scope.CurrentId);

                var thisId = this.item.Id.replace(/\b(0+)/gi,"");
                scope.Id_Third = thisId;
                scope.bindTitle_Second = this.item.Name;
                scope.bindTitle = scope.bindTitle_First + ' ' + scope.bindTitle_Second;

                if(scope.level==2){
                  ngModel.$setViewValue(this.item.Id); //00000000000000000000000000130423
                  scope.SaveModal();
                }else{
                  scope.AllDatas_Third = [];
                  angular.forEach(AllDatas, function(item, i){
                    if(item.Parent==scope.Id_Third){
                      scope.AllDatas_Third.push({
                        Id:FillZero(item.Id) + item.Id,
                        Name:item.Name, Parent:item.Parent
                      });
                    }
                  });
                  $ionicTabsDelegate.$getByHandle('modelTabs').select(2); //跳二级分类
                }
                // scope.IsLockTab = true;
              }

              // [Click] 选择三级分类
              scope.SelectArea_Third = function(){
                scope.CurrentId = this.item.Id;
                scope.bindTitle_Third = this.item.Name;
                scope.bindTitle = scope.bindTitle_First + ' ' + scope.bindTitle_Second + ' ' + scope.bindTitle_Third;
                ngModel.$setViewValue(this.item.Id); //00000000000000000000000000130423
                scope.SaveModal();
              }

            }
            // --------------------- end Init ---------------------

          });

        }
        // end [Click] ShowModel

      }

    }
  }
})


// [选择器] 职位类型 
.directive("selectionJobtypes",function($rootScope, $ionicModal, $http, $timeout, $q){
  return {
    scope:{ max:'@'},
    template:'<div class="select-label" ng-class="{true:\'active\'}[JobTypeId!=\'\']" ng-click="SelectJobTypes(JobTypeId)">'+
                '<label>选择职位类型({{JobTypeId==\'\' ? \'0\':JobTypeId.split(\',\').length}})</label><i class="ion-ios-list-outline"></i>'+
             '</div>',
    replace: true, require : "ngModel",
    link: function(scope, element, attrs, ngModel){

      ngModel.$render = function() {

          if(ngModel.$modelValue){ scope.JobTypeId = ngModel.$modelValue; }
          // [Click] ShowModel
          scope.SelectJobTypes = function(CurrentJobTypeId){

            // [Config]
            scope.CurrentIndex = 0;        // 当前选中 一级目录
            scope.CurrentSelected = [];    // 当前选中 二级三级
            scope.MaxCount = scope.max || 1;

            // [ionicModal]
            $ionicModal.fromTemplateUrl("modal-jobType.html",{
              scope:scope,
            }).then(function(modal){
              scope.modal = modal;
              scope.modal.show();

              // 封装 获取全部分类之后
              scope.GetJsonThen = function(JsonDatas){
                scope.JobTypes = JsonDatas;
                // [Format] 格式化数据
                scope.JobTypesJSON = [];
                for(iFirst in scope.JobTypes){
                  if(scope.JobTypes[iFirst].Parent==''){
                    scope.JobTypes[iFirst]['Child'] = [{ Id:scope.JobTypes[iFirst]['Id'], Name:scope.JobTypes[iFirst]['Name'], Child:[{Id:scope.JobTypes[iFirst]['Id'], Name:scope.JobTypes[iFirst]['Name']}] }];
                    for(iSecond in scope.JobTypes){
                      if(scope.JobTypes[iSecond].Parent==scope.JobTypes[iFirst].Id){
                        scope.JobTypes[iSecond]['Child'] = [{ Id:scope.JobTypes[iSecond]['Id'], Name:scope.JobTypes[iSecond]['Name']}];
                        for(iThird in scope.JobTypes){
                          if(scope.JobTypes[iThird].Parent==scope.JobTypes[iSecond].Id){
                              scope.JobTypes[iSecond]['Child'].push(scope.JobTypes[iThird]);
                          }
                        }
                        scope.JobTypes[iFirst]['Child'].push(scope.JobTypes[iSecond]);
                      }
                    }
                    scope.JobTypesJSON.push(scope.JobTypes[iFirst]);
                  }
                }

                // [Init]初始化默认值
                if(CurrentJobTypeId){
                  for(i in scope.JobTypes){
                    for(j in CurrentJobTypeId.split(',')){
                      if(scope.JobTypes[i].Id==CurrentJobTypeId.split(',')[j]){
                        scope.CurrentSelected.push({ Id:CurrentJobTypeId.split(',')[j], Name:scope.JobTypes[i].Name });
                      }
                    }
                  }
                }

                // [Click] 切换一级
                scope.FirstCate_Change = function(index){
                  scope.CurrentIndex = index;
                }
                // [Click] 选择二级三级
                scope.SelectCate = function(item){ // ,SelectedItem

                  if(!this.cur){
                    this.cur = true; //选中
                    if(scope.CurrentSelected.length>scope.MaxCount-1){
                      alert('不能超过' + scope.MaxCount + '个');
                    }else{
                      scope.CurrentSelected.push({ Id:item.Id, Name:item.Name });
                    }
                  }else{
                    this.cur = false; //删除选中
                    for(i in scope.CurrentSelected){
                      if(scope.CurrentSelected[i].Id==item.Id){
                        scope.CurrentSelected.splice(i, 1);
                      }
                    }
                  }
                }
                //[Click] 删除单个
                scope.SelectCate_Del = function(i, id){
                  scope.CurrentSelected.splice(i, 1);
                }

                // 保存选择
                scope.SaveModal = function(){
                  var tempArray = new Array();
                  for(i in scope.CurrentSelected){
                    tempArray.push(scope.CurrentSelected[i].Id);
                  }
                  ngModel.$setViewValue(tempArray.join(','));
                  scope.JobTypeId = tempArray.join(',');
                  // scope.datas.JobTypeId = tempArray.join(',');
                  scope.modal.remove();
                }
              }
              // end 封装

              // [Init] 地区数据
              if(!localStorage.getItem("JobTypeJson")){
                $http({
                  method:'Get',
                  url:$rootScope.app_config.api + '/api/Common/Data/GetJobType?level=0'
                }).success(function(rs){
                  var ds = JSON.stringify(rs.body);
                  localStorage.setItem("JobTypeJson",ds);
                  scope.GetJsonThen(JSON.parse(localStorage.getItem("JobTypeJson")));
                });
              }else{
                scope.GetJsonThen(JSON.parse(localStorage.getItem("JobTypeJson")));
              }
              // end [Init]


            });
            // end [ionicModal]
          }
          // end [Click] ShowModel
				
			}
      // end ngModel
    }
  }
})
    


//自定义选项 - 城市+地区
.directive("selectionCity",function($rootScope, $http, $timeout, $q){
  return {
    scope:{
      placeholder:"@", name:"@", areaId:"@",
    },
    template: "<div class='select-group'>"+
                "<div class='item-col'>"+
                  "<div class='selection'>"+
                    "<div class='select-label' ng-class='{true:\"active\"}[isChooseCity]' ng-click='showListCity()'><label>{{placeholderCity}}</label><i class='ion-ios-arrow-down'></i></div>"+
                    "<div class='select-list' ng-class='{true:\"more\"}[isMoreCity]' ng-show='isShowListCity'>"+
                      "<ul>"+
                        "<li ng-repeat='item in CityArray' ng-click='selectedCity()'>{{item._value}}</li>"+
                      "</ul>"+
                    "</div>"+
                    // "<input type='hidden' value='{{CityCodeValue}}'>"+
                  "</div>"+
                "</div>"+
                "<div class='item-col'>"+
                  "<div class='selection' ng-show='isShowArea'>"+
                    "<div class='select-label' ng-class='{true:\"active\"}[isChooseArea]' ng-click='showListArea()'><label>{{placeholderArea}}</label><i class='ion-ios-arrow-down'></i></div>"+
                    "<div class='select-list' ng-class='{true:\"more\"}[isMoreArea]' ng-show='isShowListArea'>"+
                      "<ul>"+
                        "<li ng-repeat='item in CityArea' ng-click='selectedArea()'>{{item._value}}</li>"+
                      "</ul>"+
                    "</div>"+
                    // "<input type='hidden' value='{{AreaCodeValue}}' name='{{name}}'>"+
                  "</div>"+
                "</div>"+
                "<input type='hidden' ng-model='AreaCodeValue'>"+
                "<div class='clr'></div>"+
              "</div>",
    replace: true, require : "ngModel",
    link: function(scope,element,attrs,ngModel){
      
      //Config
      scope.isShowListCity = false;
      scope.isChooseCity = false;
      scope.placeholderCity = "选择城市";
      
      scope.isShowListArea = false;
      scope.isChooseArea = false;
      scope.placeholderArea = "选择地区";
      
      //attrs.url
      if(attrs.url){

        require(['xml2json'],function(){
          $http.get(attrs.url,{
            transformResponse:function(cnv){
              var x2js = new X2JS(); //xml to json
              var aftCnv = x2js.xml_str2json(cnv);
              return aftCnv;
            }
          }).success(function(response){
            
            scope.CityArray = response.Area.City;
            scope.CityArray.length > 4 ? scope.isMoreCity = true : scope.isMoreCity = false;
            // console.log(scope.CityArray);
            
            //Action
            //城市列表
            scope.showListCity = function(){
              scope.isShowListArea = false;
              scope.isShowListCity = !scope.isShowListCity;
            }
            //城市列表 - 选中
            scope.selectedCity = function(){
              scope.isShowListCity = false;
              scope.isChooseCity = true;
              scope.isShowArea = true;
              scope.placeholderCity = this.item._value;
              scope.CityCodeValue = this.item._key;
              // console.log(scope.CityArray[this.$index]);
              scope.CityArea = scope.CityArray[this.$index].Node;
              scope.CityArea.length > 4 ? scope.isMoreArea = true : scope.isMoreArea = false;
              scope.isChooseArea = true;
              scope.placeholderArea = scope.CityArray[this.$index].Node[0]._value;
              scope.AreaCodeValue = scope.CityArray[this.$index].Node[0]._key;

              ngModel.$setViewValue(scope.AreaCodeValue);
              // if(scope.name=="LiveAreaId"){
              //   scope.$parent.datas.LiveAreaId = scope.AreaCodeValue;
              // }else if(scope.name=="IntentionAreaId"){
              //   scope.$parent.datas.IntentionAreaId = scope.AreaCodeValue;
              // }else if(scope.name=="Area"){
              //   scope.$parent.datas.Area = scope.AreaCodeValue;
              // }
            }
            //区列表
            scope.showListArea = function(){
              scope.isShowListCity = false;
              scope.isShowListArea = !scope.isShowListArea;
            }
            //区列表 - 选中
            scope.selectedArea = function(){
              scope.isShowListArea = false;
              scope.isChooseArea = true;
              scope.placeholderArea = this.item._value;
              scope.AreaCodeValue = this.item._key;

              ngModel.$setViewValue(this.item._key);
              // if(scope.name=="LiveAreaId"){
              //   scope.$parent.datas.LiveAreaId = this.item._key;
              // }else if(scope.name=="IntentionAreaId"){
              //   scope.$parent.datas.IntentionAreaId = this.item._key;
              // }else if(scope.name=="Area"){
              //   scope.$parent.datas.Area = this.item._key;
              // }
            }
          });
        });

        ngModel.$render = function() { // 值出现后
          if(ngModel.$modelValue){
            $timeout(function(){
              scope.isChooseCity = true;
              scope.isChooseArea = true;
              scope.isShowArea = true;
              angular.forEach(scope.CityArray,function(CityItem){
                var isCity = false;
                angular.forEach(CityItem.Node,function(AreaItem, index){
                  
                  if(ngModel.$modelValue == AreaItem._key){
                    
                    scope.placeholderArea = AreaItem._value; //赋值区域
                    scope.AreaCodeValue = AreaItem._key;
                    isCity = true;
                    scope.CityArea = CityItem.Node;
                    scope.CityArea.length > 4 ? scope.isMoreArea = true : scope.isMoreArea = false;
                  }
                })
                if(isCity){
                  scope.placeholderCity = CityItem._value;
                }
              });
            },500);
          }
        }

        // $rootScope.$on('isLoaded', function() {
        //   $timeout(function(){
        //     //如果有默认值传入来
        //     // console.log(scope.areaId);
        //     if(scope.areaId){
        //       scope.isChooseCity = true;
        //       scope.isChooseArea = true;
        //       scope.isShowArea = true;
              
        //       angular.forEach(scope.CityArray,function(CityItem){
        //         var isCity = false;
        //         angular.forEach(CityItem.Node,function(AreaItem,index){
        //           if(scope.areaId == AreaItem._key){
        //             scope.placeholderArea = AreaItem._value; //赋值区域
        //             scope.AreaCodeValue = AreaItem._key;
        //             isCity = true;
        //             scope.CityArea = CityItem.Node;
        //             scope.CityArea.length > 4 ? scope.isMoreArea = true : scope.isMoreArea = false;
        //           }
        //         })
        //         if(isCity){
        //           scope.placeholderCity = CityItem._value;
        //         }
        //       });
        //     }else{
        //       console.log("没有scope.areaId");
        //     }
        //   },200);
        // });

      }
      
    }
  }
})

// 公司地址 & 坐标 <address-location>
.directive("addressLocation",function($rootScope, $http, $timeout, $cookies, $ionicModal, $ionicPopup){
  return {
    scope:{ title:'@', bindAddress:'=', bindLocation:'=' },
    replace: false,
    template: '<div class="item item-input">'+
                  '<span class="input-label">{{title}}</span>'+
                  '<input type="text" placeholder="请输入{{title}}" ng-model="bindAddress">'+
                  '<a href="javascript:;" ng-click="SelectMapLocation()" class="iconLink"><i class="ion-ditu"></i></a>'+
              '</div>'+
              '<div class="item item-input" style="padding-top:0;">'+
                  '<span class="input-label">坐标</span>'+
                  '<div class="content-label disabled" ng-bind="bindLocation"></div>'+
              '</div>',
    link: function(scope, element, attrs, $scope){

      scope.SelectMapLocation = function(){
        
        var ionModal = $ionicModal.fromTemplateUrl("modal-map.html",{
          scope:scope,
        }).then(function(modal){
          
          scope.modal = modal;
          scope.modal.show();

          scope.datas = {
            tempAddress : scope.bindAddress,
            tempLocation : scope.bindLocation
          }

          require(['async!BaiduMap'],function(){

            // setTime 分步进行 防止手机浏览弹出层时卡顿
            setTimeout(function(){
              var map = new BMap.Map("ModalMap");
              // map.centerAndZoom('汕头',12);
              map.enableScrollWheelZoom(); // 可滚轮放大缩小
              // map.disableDragging();       // 禁止拖动

              // 封装 定位
              var movePoint = function(point, isViewTo){
                var marker = new BMap.Marker(point);
                map.clearOverlays();
                map.addOverlay(marker);
                setTimeout(function(){
                  map.panTo(point);
                },0);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                // 显示到中心点
                if(isViewTo){ map.centerAndZoom(point, 16); }
              }
              // 封装 按地址搜索
              var addressPoint = function(address){
                var myGeo = new BMap.Geocoder();
                myGeo.getPoint(address, function(point){
                  if(point){
                    scope.$apply(function(){
                      scope.datas.tempLocation = point.lng + ',' + point.lat;
                    });
                    movePoint(point, true);
                  }else{
                    $ionicPopup.alert({
                      title: '提示', template: '该地址无法定位，请手动定位!', okText:'确定'
                    });
                    if(address==''){
                      map.centerAndZoom('汕头',12);
                    }
                  }
                }, '汕头市'); //, "北京市"
              }
              

              // 1) 使用坐标进行定位，如未定义坐标，则用地址来定位
              if(scope.datas.tempLocation && scope.datas.tempLocation!=''){
                var p = scope.datas.tempLocation.split(',');
                var point = new BMap.Point(p[0],p[1]);
                movePoint(point, true);
              }else if(scope.datas.tempAddress && scope.datas.tempAddress!=''){
              // 2) 使用地址进行定位
                addressPoint(scope.datas.tempAddress);
              }else{
                map.centerAndZoom('汕头',12);
              }

              // [Click] 地图内置点击事件
              map.addEventListener("click", function(e){
                console.log(e.point);
                scope.$apply(function(){
                  scope.datas.tempLocation = e.point.lng + ',' + e.point.lat;
                });
                movePoint(e.point);
              });
              // [Click] 重新用地址来定位
              scope.ResetAddressPoint = function(){
                addressPoint(scope.datas.tempAddress);
              }
              // [Click] 保存 公司地址 & 坐标
              scope.SaveModal = function(){
                var callback = {
                  'Address':scope.datas.tempAddress,
                  'MapLocation':scope.datas.tempLocation
                };
                scope.$emit('SelectedMapLocation', callback);
                scope.modal.remove();
              }
            },500);

          });

        });
        // end $ionicModal;

      }

      scope.$on('SelectedMapLocation', function(evt, rs){
        // scope.UserBaseInfor.Address = rs.Address;
        // scope.UserBaseInfor.MapLocation = rs.MapLocation;
        scope.bindAddress = rs.Address;
        scope.bindLocation = rs.MapLocation;
      });



    }
  }
})

//单选框Radio
.directive("radioer",function($rootScope, $http, $timeout, $cookies){
  return {
    scope:{ bindValue:"=", params:"@", required:"@" },
    template:"<div class='input-radio'>"+
                "<input ng-if='required!=undefined' type='hidden' ng-model='bindValue' required>"+
                "<a href='javascript:;' class='button button-small' ng-class='{true:\"button-positive\"}[param.isCheck]' ng-repeat='param in paramsJSON' ng-click='selectEvt()'>{{param.value}}</a>"+
             "</div>",
    replace: false,
    link: function(scope, element, attrs, ngModel){
      $rootScope.$on('isXMLLoaded', function(ev, loadedXML){
        
        // [Init] 初始化数据
        scope.paramsJSON = JSON.parse(scope.params);  // {key:'', value:''}
        scope.$apply();
        // [Init] 默认值
        angular.forEach(scope.paramsJSON, function(item){
          if(item.key==scope.bindValue){ item.isCheck = true;}
        });
        // [Method] 重置样式
        scope.selectReset = function(){
          angular.forEach(scope.paramsJSON, function(item, i){
            scope.paramsJSON[i].isCheck = false;
          });
        }
        // [Click] 选择
        scope.selectEvt = function(){
          scope.bindValue = this.param.key;
          scope.selectReset();
          this.param.isCheck = true;
        }
      });
    }
  }
})


//单下拉Select（需要修改的地方：Ctrl_2，Service_2，html_1）
.directive("selection",function($rootScope, $http, $timeout, $cookies, $ionicPopup){
  return {
    scope:{
      placeholder:"@", xmlName:"@", bindValue:"=", multiline:"@",
      inputSelect:"@", bindArray:"=", defaultValue:'=', required:"@"
    },
    template: "<div class='select-group'>"+
                "<div class='selection' ng-class='{true:\"multiline\"}[isMultiline]'>"+
                  "<input ng-if='required!=undefined' type='hidden' ng-model='bindValue' required>"+
                  "<div ng-show='inputSelect==undefined' class='select-label' ng-class='{true:\"active\"}[isChoose]' ng-click='showList()'><label>{{placeholder}}</label><i class='ion-ios-arrow-down'></i></div>"+
                  "<div ng-hide='inputSelect==undefined'><input type='text' ng-focus='showList()' ng-change='keydownList(defaultValue)' ng-model='defaultValue' placeholder='请选择或输入{{placeholder}}'></div>"+
                  "<div class='select-list' ng-class='{true:\"more\"}[isMore]' ng-show='isShowList'>"+
                    "<ul>"+
                      "<li ng-repeat='item in CurrentXmlDom' ng-class='{true:\"checked\"}[item.isCheck]' ng-click='selected()' value='{{item.key}}'>"+
                          "<i class='ion-checkmark'></i>{{item.value}}"+
                      "</li>"+
                      "<li class='bottom'><a href='javascript:;' ng-click='hideList()' class='button button-positive'>确定</a></li>"+
                    "</ul>"+
                  "</div>"+
                  
                "</div>"+
              "</div>",
    replace: false,
    link: function(scope, element, attrs, ngModel){
      
      // [Init] Config
      scope.isShowList = false; scope.isChoose = false; scope.isMore = false;
      var defaultPlaceholder = scope.placeholder;

      // [Get] 数组数据
      $rootScope.$on('isArrayLoaded', function(ev, loadedArray){
        // Input Select
        if(scope.inputSelect!=undefined){
          if(loadedArray.length > 4) scope.isMore = true;
          scope.CurrentXmlDom = [];
          angular.forEach(loadedArray, function(item){
            scope.CurrentXmlDom.push({ key:item, value:item });
          });
          
          // [Click] 选中，隐藏列表
          scope.selected = function(){
            scope.isShowList = false; scope.isChoose = true;
            scope.defaultValue = this.item.value;
          }
          scope.keydownList = function(val){ scope.isShowList = false; }
        }
      });

      // [Get] XML数据，根据name判断XMLDOM位置
      $rootScope.$on('isXMLLoaded', function(ev, loadedXML){

        // 转数组类型
        var bindValueArray = scope.bindValue ? scope.bindValue.split(',') : new Array();
        
        // [Init] 遍历XML
        var XMLitems = angular.element(loadedXML).find("Item");
        angular.forEach(XMLitems, function(item){
          if(angular.element(item).attr('name')==scope.xmlName){
            var CurrentXml = angular.element(item).find('Node');
            if(CurrentXml.length > 4) scope.isMore = true; // 超过4个显示滚动条
            scope.CurrentXmlDom = [];
            
            angular.forEach(CurrentXml, function(itemSec){
              var GetKey = angular.element(itemSec).attr('key');
              var GetValue = angular.element(itemSec).attr('value');
              var isCheck = false;
              var tempArray = new Array();

              // 值不为空
              if(scope.bindValue && scope.bindValue!=''){
                scope.isChoose = true;
                // [Init] 默认值(单选)
                
                if(scope.bindValue==GetKey && scope.multiline==undefined){
                  scope.placeholder = GetValue;
                }
                // [Init] 默认值(多选)
                if(bindValueArray.length>0 && scope.multiline!=undefined){
                  // 遍历相同
                  if(bindValueArray.indexOf(GetKey)>=0){
                    scope.placeholder = GetValue;
                    isCheck = true;
                  }
                }
              }

              // [Init] 下拉列表数据
              scope.CurrentXmlDom.push({
                key:GetKey, value:GetValue, isCheck:isCheck
              });
              // --
              
            });
          }
        });
        // end [Init] 遍历XML
        
        if(scope.multiline!=undefined){
          if(bindValueArray.length>0){
            scope.placeholder+= '..('+bindValueArray.length+')';
          }
          // -- 多选（multiline）---------------
          scope.isMultiline = true;
          scope.selected = function(){
            
            // 当前选中key
            var thisKey = this.item.key;
            var thisValue = this.item.value;
            // 是否存在（-1不存在，>=0存在）
            var isExist = scope.bindValue ? scope.bindValue.indexOf(thisKey) : -1;

            if(isExist<0){ //scope.multiline

              if(bindValueArray.length<scope.multiline){ // 超过多选上限
                // Push Key 增
                this.item.isCheck = !this.item.isCheck;
                scope.isChoose = true;
                bindValueArray.push(thisKey);
                scope.bindValue = bindValueArray.toString();
                
                if(bindValueArray.length>1){
                  scope.placeholder = thisValue + '..('+bindValueArray.length+')';
                }else{
                  scope.placeholder = thisValue;
                }
              }else{
                var alertPopup = $ionicPopup.alert({
                  title: '提示', template: '选择不能超过'+scope.multiline+'个'
                });
              }

            }else{

              // Remove Key 删
              this.item.isCheck = !this.item.isCheck;
              bindValueArray.forEach(function(itemKey, i){
                if(itemKey==thisKey){
                  bindValueArray.splice(i,1);
                  scope.bindValue = bindValueArray.toString();
                }
              });

              // Reset Value 重置
              scope.CurrentXmlDom.forEach(function(itemDom){
                if(bindValueArray.length<=0){
                  scope.placeholder = defaultPlaceholder;
                  scope.isChoose = false;
                }else{
                  scope.isChoose = true;
                  if(itemDom.key==bindValueArray[0]){
                    if(bindValueArray.length>1){
                      scope.placeholder = itemDom.value + '..('+bindValueArray.length+')';
                    }else{
                      scope.placeholder = itemDom.value;
                    }
                  }
                }
              });
              // end Reset Value 重置

            }

          }

        }else{
          // -- 单选 --------------------------
          // [Click] 选中，隐藏列表
          scope.selected = function(){
            scope.isShowList = false; scope.isChoose = true;
            scope.placeholder = this.item.value; scope.bindValue = this.item.key;
          }
        }
        
      });

      // [Click] 显示列表
      scope.showList = function(){ this.isShowList = !this.isShowList; }
      scope.hideList = function(){ this.isShowList = false; }

    }
  }
})


//多选项
.directive("selectionMultiple",function($rootScope, $http, $timeout){
  return {
    scope:{
      xml:"@", name:"@"
    },
    template:"<div class='inputCheckGroup'>"+
                "<ul>"+
                    "<li ng-class='{true:\"on\"}[isCheckActive]' ng-repeat='item in items'>"+
                      "<div class='checkBox' ng-click='checkClick()'>{{item._value}}</div>"+
                    "</li>"+
                "</ul>"+
                // "<input type='text' ng-model='checkValue'/>"+
             "</div>",
    replace: true,
    link: function(scope,element,attrs){


      //读取XML
      require(['xml2json'],function(){
        $http.get(scope.xml,{
          transformResponse:function(cnv){
            var x2js = new X2JS(); //xml to json
            var aftCnv = x2js.xml_str2json(cnv);
            return aftCnv;
          }
        }).success(function(res){
          //读取<Select>下拉数据
          angular.forEach(res.Constant.Item,function(item){
            if(item._name == scope.name){
              // console.log(item.Node);
              scope.items = item.Node;
            }
          });
        });
      });


      //Config
      scope.isCheckActive = false;
      scope.checkValue = "";
      var arr = new Array();
      
      //选中&反选 点击事件
      scope.checkClick = function(){
        this.isCheckActive = !this.isCheckActive;
        if(this.isCheckActive){
          arr.push(this.item._key);
        }else{
          Array.prototype.indexOf = function(val) { for (var i = 0; i < this.length; i++) { if (this[i] == val) return i; } return -1; };
          Array.prototype.remove = function(val) { var index = this.indexOf(val); if (index > -1) { this.splice(index, 1); } };
          arr.remove(this.item._key);
        }
        // scope.checkValue = arr.join(",")
        if(scope.name == "EnterpriseNature") scope.$parent.datas.EnterpriseNature = arr.join(",");
        if(scope.name == "Welfare") scope.$parent.datas.Welfare = arr.join(",");
        if(scope.name == "JobPayWay") scope.$parent.datas.JobPayWay = arr.join(",");
        if(scope.name == "JobNature") scope.$parent.datas.JobNature = arr.join(",");
      }
      //end 点击事件
      
    }
  }
})

.directive('compareTo', [function ($rootScope) {
  return {
    require: 'ngModel',
    scope:{
      otherModelValue : "=compareTo"
    },
    link: function (scope, elem, attrs, ngModel) {
      ngModel.$validators.compareTo = function(modelValue){
        return modelValue == scope.otherModelValue;
      }
      scope.$watch("otherModelValue",function(){
        ngModel.$validate();
      });
      
    }
  }
}])


.directive("verifyHref",function($cookies, $rootScope){
  return {
    restrict:"A",
    link: function(scope,element,attrs){
      element.on("click",function(){
        if($cookies.get("Ticket")){
          window.location.href = attrs.verifyHref;
        }else{
          $state.go($rootScope.entry + '.login');
        }
        return false;
      })
    }
  }
})


//【我的消息】通过/拒绝
// .directive("handleOnce",function($rootScope){
//   return {
//     scope:{
//       isDispose:"@", isPass:"@"
//     },
//     template:"<div class='btnGroup'>"+
//     "{{isDispose}}"+
//                 "<div ng-hide='{{isDispose}}'>"+
//                   "<a href='javascript:;' ng-click='handle(1)' class='first action_yes ui-link'>同意</a>"+
//                   "<a href='javascript:;' ng-click='handle(0)' class='last action_no ui-link'>拒绝</a>"+
//                 "</div>"+
//                 "<b ng-if='isDispose' ng-class='{true:\"accept\",false:\"refuse\"}[isDispose]'>{{handleText}}</b>"+
//              "</div>",
//     replace: true,
//     link: function(scope,element,attrs){
//       scope.isPass == 0 ? scope.handleText = "已拒绝" : scope.handleText = "已同意";
//       scope.handle = function(status){
//         scope.$parent.isDispose = true;
//         console.log(scope.$parent.isDispose);
//         // scope.isDispose == true ? scope.handleText = "已同意" : scope.handleText = "已拒绝";
//       }
//     }
//   }
// })


.factory("ComeFrom",function($rootScope, $state){
    var service = {}
    service.get = function(hasParam){ // (true) 表示带参数
      
      $rootScope.StateCurrentUrl = $state.$current.url.prefix;
      $rootScope.StateRoutesBefore = $rootScope.StateRoutes
      $rootScope.StateRoutes = new Array();
      angular.forEach($state.$current.includes, function(i, item){ $rootScope.StateRoutes.push(item); });
      if(hasParam){ $rootScope.StateRoutes.push($state.params); }
      
      // console.log($state);
      // console.log($rootScope.StateCurrentUrl);
      // console.log('CurrentRoute：' + $rootScope.StateRoutes);  // ["", "tab", "tab.square"]
      // console.log('---------------');
    }
    return service;
})



// （只执行一次！？？？？）
// [通用] 代码片段
// .service("CommonEvent", function($rootScope, $stateParams, $state){

//   //******* 返回上一页（获取路由） ******/
//   $rootScope.StateRoutes = new Array();
//   angular.forEach($state.$current.includes, function(i, item){ $rootScope.StateRoutes.push(item); });
//   if(JSON.stringify($stateParams)!="{}"){ //有参数
//     $rootScope.StateRoutes.push($state.params);
//   }
//   // console.log($stateParams);
//   // 获得当前路由，通过 $state.go('tab.square') 跳转
//   // console.log($state);
//   // console.log($rootScope.StateRoutes);  // ["", "tab", "tab.square"]
//   // console.log($state.$current.includes);
// })





//tab-near.html
.service("serviceLocation",function($rootScope){
  return{
    get: function(longNum,latNum,map){
      if(longNum != "" && latNum != ""){
        map.clearOverlays(); 
        var new_point = new BMap.Point(longNum,latNum);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        map.panTo(new_point);
      }
    }
  }
})

.service("serviceMath",function($rootScope){
  return{
    //差集算法
    minus : function(defaultWeal,arr){
      var newArray = [];
      for (var i = 0; i < defaultWeal.length; i++) {
        var flag = true;
        for (var j = 0; j < arr.length; j++) {
          if (arr[j] == defaultWeal[i]) {
            flag = false;
          }
        }
        if(flag) {
          newArray.push(defaultWeal[i]);
        }
      }
      return newArray;
    },
    removeArray : function(arr,val){
      var index = arr.indexOf(val);
      if(index>-1){
        arr.splice(index,1);
      }
      return arr;
    }
  }
})

.service("isLogin",function($rootScope, $cookies, $state, $location, mEvent){

  var isPersonalPage = $location.url().indexOf('tab');
  var isCompanyPage = $location.url().indexOf('company');
  if(!$cookies.get("Ticket")){
    if(isPersonalPage>0){ $rootScope.entry = 'tab'; }
    if(isCompanyPage>0){ $rootScope.entry = 'company'; }
    $state.go($rootScope.entry + '.login');
    return false;
  }else{
    //[GET][企业] 如有登录，则验证营业执照
    if(!$rootScope.isInitBaseInfo && isCompanyPage>0){
      (function(){
        function httpCallBack(rs){
          $rootScope.isInitBaseInfo = rs.body;
        }
        var httpFn = function(){
          mEvent.http("GET", "/api/Company/Enterprise/IsInitBaseInfo", true, httpCallBack);
        }
        httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

  return{
    IsInitBaseInfo:function(){
      function httpCallBack(rs){
        $rootScope.isInitBaseInfo = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/Enterprise/IsInitBaseInfo", true, httpCallBack);
      }
      httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    }
  }

})

//Loading 状态拦截器
.factory('timestampMarker', function ($rootScope, $injector, $cookies, $timeout, $location) {
  var timestampMarker = {
    request: function (config) {
      $injector.get('$ionicLoading').show({
        template:'<ion-spinner icon="ios-small"></ion-spinner><p>加载中</p>',
        noBackdrop:true
      });
      config.requestTimestamp = new Date().getTime();
      return config;
    },
    response: function (response) {
      $injector.get('$ionicLoading').hide();
      response.config.responseTimestamp = new Date().getTime();
      return response;
    },
    responseError: function(e){
      $injector.get('$ionicLoading').hide();
      if(e.status===0){
        $injector.get('$ionicPopup').alert({
          title:'提示', template:'网络中断，请检查网络连接', buttons:[{ text:'重试',type: 'button-positive' }]
        }).then(function(){
          window.location.reload();
        })
      }else{
        if(e.status===401){
          console.log(e.statusText + '(' + e.status + ')');
          $cookies.remove("Ticket", { path: '/' });
          $cookies.remove("s", { path: '/' });
          $rootScope.userImfor = undefined;
          $injector.get('$state').go($rootScope.entry + '.login')
        }else{
          $injector.get('$ionicPopup').alert({
            title:'提示', template:e.statusText + '(' + e.status + ')'
          });
        }
      }
      return e;
    }
  };
  return timestampMarker;
})


//获取用户信息
.factory('GetUserImfor',function($rootScope, $http, mEvent, $cookies, $timeout, $location){
  var service = {}
  service.GetPersonal = function(isForce){

      if(!$rootScope.userImfor || isForce){
        (function(){
          function httpCallBack(res){
            httpFn = undefined;
            $rootScope.userImfor = res.body;
            $rootScope.userImforHead = $rootScope.userImfor.HeadPic;
            $rootScope.Ticket = $cookies.get("Ticket");
            $rootScope.$emit("GetUserImfor", res.body);

            // 10分钟刷新一次，获取
            $timeout(function(){
              service.GetPersonal();
            },1000*60*10);//1000*60*10

            // [GET] 系统通知
            (function(){
              function httpCallBack(rs){
                httpFn = undefined;
                $rootScope.Message_InformList = rs.body;
                $rootScope.$broadcast('Message_InformList_onLoadDatas', $rootScope.Message_InformList); // 分页必须
                angular.forEach($rootScope.Message_InformList, function(item, i){
                    if(item.IsRead==false){
                      $rootScope.IsHasMessageApply = true;
                    }
                });
              }
              var httpFn = function(){
                mEvent.http("GET", "/api/Common/Inform/GetInformList", true, httpCallBack);
              }
              httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data) httpFn(); });
            })();
            // end [GET] 系统通知

            // [GET] 私信
            (function(){
              function httpCallBack(rs){
                httpFn = undefined;
                $rootScope.Message_MailGroupUsersList = rs.body;
                $rootScope.$broadcast('Message_MailGroupUsersList_onLoadDatas', $rootScope.Message_MailGroupUsersList); // 分页必须
                angular.forEach($rootScope.Message_MailGroupUsersList, function(item, i){
                  if(item.IsRead==false && ($rootScope.userImfor.Id!=item.SendUser.Id)){
                    $rootScope.IsHasMessageApply = true;
                  }
                });
              }
              var httpFn = function(){
                mEvent.http("GET", "/api/Common/Mail/GetMailGroupUsers", true, httpCallBack);
              }
              httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data) httpFn(); });
            })();
            // end [GET] 私信

          }
          var httpFn = function(){
            mEvent.http("GET", "/api/JobSeeker/User/GetCurrentUser", true, httpCallBack);
          }
          httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data) httpFn(); });
        })();
      }
  },
  service.GetCompany = function(isForce){
    if(!$rootScope.userImfor || isForce){
      (function(){
        function httpCallBack(res){
          // console.log(res.body);
          $rootScope.userImfor = res.body;
          $rootScope.userImforHead = $rootScope.userImfor.Logo || '/Content/Phone/images/head/company-none.jpg';
          $rootScope.Ticket = $cookies.get("Ticket");
          $rootScope.$emit("GetUserImfor", res.body);

          // 判断是否有新职位
          if($rootScope.userImfor.IsApplyNotReadCount > 0){
            $rootScope.IsHasJobApply = true;
          }else{
            $rootScope.IsHasJobApply = false;
          }

          // 10分钟刷新一次，获取收到的新简历
          $timeout(function(){
            service.GetCompany();
          },1000*60*10);
          
        }
        var httpFn = function(){
          mEvent.http("GET", "/api/Company/User/GetCurrentUser", true, httpCallBack);
        }
        httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data) httpFn(); });
      })();
    }

  }
  
  
  return service;
})


//刷新列表
.factory("SquareRefreshList",function($rootScope, $http, mEvent, $cookies){
  var service = {}
  service.refresh = function(){
    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        $rootScope.squareList = res.body;
        
        // $rootScope.lastSquareItem = $rootScope.squareList[$rootScope.squareList.length-1];
        // $rootScope.$on('ngRepeatFinished', function(){
        //   if($rootScope.squareList.length >= 10){ //大于这个数，使用下滑加载
        //     $rootScope.square_loaded = true;
        //   }
        // });

        //因后台数据不肯改结构而出现的函数，只好将数据读取下来再进行复杂的转换（图片路径"string,string2"变成"[{'src':'string'},{'src':'string2'}]"）
        //此数据无法封装，外置则可用 SquareEvent.formatImage()
        require(['base64'],function(){
          angular.forEach($rootScope.squareList,function(datasChild,index){
            if(datasChild.Images){
              var imagesArray = datasChild.Images.toString().split(",");
              var imagesJson = [];
              angular.forEach(imagesArray,function(arr){
                imagesJson.push({"src":arr});  //绝对地址,正式的时候要去掉
              })
              $rootScope.squareList[index].Images = imagesJson;
            }
            if(datasChild.Content===new Base64().decode("5paw5omL5LiK6Levelp+IQ==")){
              localStorage.setItem("BMap_vectors","0");
            }
          });
        });

      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Square/GetNewestMessageList", false, httpCallBack);
      }
      httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();
  },
  
  service.mySquareRefresh = function(){

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        $rootScope.mySquareList = res.body;
        //因后台数据不肯改结构而出现的函数，只好将数据读取下来再进行复杂的转换（图片路径"string,string2"变成"[{'src':'string'},{'src':'string2'}]"）
        //此数据无法封装，外置则可用 SquareEvent.formatImage()
        angular.forEach($rootScope.mySquareList,function(datasChild,index){
          if(datasChild.Images){
            var imagesArray = datasChild.Images.toString().split(",");
            var imagesJson = [];
            angular.forEach(imagesArray,function(arr){
              imagesJson.push({"src":arr});  //绝对地址,正式的时候要去掉
            })
            $rootScope.mySquareList[index].Images = imagesJson;
          }
        })
      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Square/GetMyReleaseMessageList", true, httpCallBack);
      }
      httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();


  }
  
  return service;
})


// 记录登录设备数据
.factory("DeviceRecord",function($rootScope, $http, $cookies){
  var service = {}
  var u = navigator.userAgent;
  var DeviceData = { Source : "", DeviceToken : "" };

  service.GetDeviceToken = function(){
    $rootScope.DeviceRecordBoolean = "GetDeviceToken";
    $rootScope.D1 = u.indexOf('dgb') > -1;
    $rootScope.D2 = $cookies.get("Ticket");
    $rootScope.D3 = $cookies.get("DeviceToken")!=DeviceData.DeviceToken;

    if((u.indexOf('dgb') > -1) && $cookies.get("Ticket") && $cookies.get("DeviceToken")!=DeviceData.DeviceToken){

      $rootScope.DeviceRecordBoolean = "across if";

      // 获得环境
      if (/iphone|ipad|ipod/.test(u.toLowerCase())) {
        DeviceData.Source = "ios";
      }else if(/android/.test(u.toLowerCase())) {
        DeviceData.Source = "android";
      }

      $rootScope.DeviceRecordBoolean = "准备GET设备号";

      // 获得设备号
      cordova.dgb.social.share.getDeviceToken( function (data) { DeviceData.DeviceToken = JSON.stringify(data);});
      service.PostDeviceToken(DeviceData.Source, DeviceData.DeviceToken);


    }
  }

  service.PostDeviceToken = function(s,d){

    $rootScope.DeviceRecordBoolean = "PostDeviceToken";

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        // var expireDate = new Date(); 
        // $cookies.put("DeviceToken", d, {'expires': expireDate.setDate(expireDate.getDate() + 10)}); // 1天过期
        // $rootScope.DeviceRecordBoolean = "POST Success!";

      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("POST", "/api/Common/User/UpdateDeviceToken", true, httpCallBack,{
          Source : s,
          DeviceToken : d
        });
      }
      httpFn();scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();
  }

  return service;
})
// end 记录登录设备数据

// 弹出广告(首页)
.factory("advEvent",function($rootScope, $http, $ionicBackdrop, $ionicModal, autoLogin, mEvent, $state, $cookies, $ionicPopup, $location, $timeout){
  var service = {}
  service.init = function(){
    
    var cityKey = $cookies.get("cityCode-key");
    if(cityKey){
      // [GET] 弹出广告图片（base64缩小版）与 $cookies 判断是否需要更新
      $http.get($rootScope.app_config.api + "/api/Common/Common/GetAdPhonePopupWindowDisplayNumber?area=" + cityKey).success(function(rs){
        // console.log(rs);
        // console.log($cookies.get("advReaded"));
        
        var smallAdv = rs.body;
        var refreshAdv = function(){
          // 获取跳转URL
          $http.get($rootScope.app_config.api + "/api/Common/Common/GetAdPhonePopupWindowURL?area=" + cityKey).success(function(rsUrl){
            // console.log(res.body);
            if(rsUrl.body!=""){
              mEvent.trackEvent("求职者","首页全屏广告","显示/更新");
              $rootScope.hasUrl = rsUrl.body;
            }
            // 获取图片Base64
            $http.get($rootScope.app_config.api + "/api/Common/Common/GetAdPhonePopupWindow?area=" + cityKey).success(function(res){

              if(res.body!=''){
                var advWidth = document.body.clientWidth - 40;
                var dom = "<div class='adv'>"+
                            "<div class='content' style='width:" + advWidth + "px;height:" + advWidth + "px;'>"+
                                "<button class='close' ng-click='closeAdv()'><i class='ion-ios-close-empty'></i></button>"+
                                "<a href='javascript:;' ng-if='hasUrl' ng-click='AdvClickUrl(hasUrl)'><img src='"+res.body+"'/></a>"+
                                "<img ng-if='!hasUrl' src='"+res.body+"'/>"+
                            "</div>"+
                          "</div>"
                $rootScope.modalAdv = $ionicModal.fromTemplate(dom, {
                    scope: $rootScope
                });
                $rootScope.modalAdv.show();
                $rootScope.closeAdv = function(){
                  $rootScope.modalAdv.remove();
                  advReadedFn();
                }
                $rootScope.AdvClickUrl = function(url){
                  window.location.href = url;
                  $rootScope.modalAdv.remove();
                  advReadedFn();
                }
              }

            });
          });
        }
        // end refreshAdv;
        
        function advReadedFn(){
          var expireDate = new Date();expireDate.setDate(expireDate.getDate() + 3650);
          $cookies.put("advReaded", smallAdv, {'expires': expireDate, 'path': '/'});
        }

        if($cookies.get("advReaded")!=undefined){
          if(smallAdv!=$cookies.get("advReaded")){
            refreshAdv();
          }
        }else{
          refreshAdv();
        }

      });
    }

  }
  return service;
})


//自定义提示框
.factory("mEvent",function($rootScope, $http, autoLogin, $state, $cookies, $ionicModal, $ionicPopup, $location, $timeout){
  var service = {}

  // 职位or简历详情 私信功能 // rcName 发送对象名称，rcId 发送对象Id
  service.ShowModelMessages = function(rcName, rcId){
    
    // 判断是否登录
    if(!$cookies.get("Ticket")){
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
      // $rootScope.CurrentURL = "/#/tab/job/detail/" + $stateParams.Id;
      return false;
    }

    // var thisCompanyName = $scope.jobDetailData.EnterpriseName;
    // var thisId = $scope.jobDetailData.UserId;
    
    $ionicModal.fromTemplateUrl("modal-message-board.html",{
      scope:$rootScope,
    }).then(function(modal){
      
      $rootScope.modal = modal;
      $rootScope.ModalTitle = rcName;
      $rootScope.modal.show();
      
      $rootScope.templateList = [];   // 展示的数据 { Name:'', IsChecked:'' }
      $rootScope.templateDatas = [];  // 提交的数据 ['a','b', ..]
      $rootScope.selectedValue = '';
      //[GET] 获得模板列表（刷新模板）
      $rootScope.RefreshTemplatesList = function(){
        $http({
          method:"GET", url:$rootScope.app_config.api + "/api/Common/Mail/GetTemplates",
          headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") }
        }).success(function(rs){
          $rootScope.templateDatas = rs.body;
          angular.forEach(rs.body, function(item){
            if(item!=''){
              $rootScope.templateList.push({
                'Name':item, 'IsChecked':''
              });
            }
          });
        });
      }
      $rootScope.RefreshTemplatesList();

      // [POST] 保存模板
      $rootScope.SaveTemplatesList = function(d){
        $http({
          method:"POST", headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
          url:$rootScope.app_config.api+"/api/Common/Mail/UpdateTemplates",
          data:{ Templates: d }
        }).success(function(rs){
          // console.log(rs);
        });
      }

      $rootScope.datas = { 'Content':'' }

      //[Click] 选择模板
      $rootScope.SelectTemplate = function(){
        $ionicModal.fromTemplateUrl("modal-message-board-select.html",{
          scope:$rootScope,
        }).then(function(modalTemplate){
          $rootScope.modalTemplate = modalTemplate;
          $rootScope.modalTemplate.show();

          //[Click] 选中模板
          $rootScope.selectedTemplate = { 'i':'', 'Name':''}
          $rootScope.changeTemplate = function(){
            $rootScope.selectedTemplate = { 'i':this.$index, 'Name':this.item.Name }
            $rootScope.isSelectTemplate = true;
          }

          //[Click] 置顶模板（先选中，后置顶）
          $rootScope.SetTemplateTop = function(){
            var sdIndex = $rootScope.selectedTemplate.i;
            if(sdIndex!=''){
              var temp_list = $rootScope.templateList[sdIndex];
              var temp_datas = $rootScope.templateDatas[sdIndex];
              $rootScope.templateList.splice(sdIndex, 1);
              $rootScope.templateList.unshift(temp_list)
              $rootScope.templateDatas.splice(sdIndex, 1);
              $rootScope.templateDatas.unshift(temp_datas)
            }
            $rootScope.SaveTemplatesList($rootScope.templateDatas);
          }

          //[Click] 删除模板（先选中，后删除）
          $rootScope.DeleteTemplate = function(){
            $ionicPopup.confirm({
              title: '提示', template: '确定删除此模板吗？',
              buttons:[
                {
                  text:'确定', type:'button-positive',
                  onTap: function(e){
                    
                    var sdIndex = $rootScope.selectedTemplate.i;
                    if(sdIndex!=''){
                      $rootScope.templateList.splice(sdIndex, 1);
                      $rootScope.templateDatas.splice(sdIndex, 1);
                    }
                    $timeout(function(){
                      $rootScope.isSelectTemplate = false;
                      $rootScope.selectedTemplate = { 'i':'', 'Name':''}
                    },0);
                    $rootScope.SaveTemplatesList($rootScope.templateDatas);

                  }
                },{ text:'取消', onTap: function(e){ } }
              ]
            });
          }

          //[Click] 选择模板-确定
          $rootScope.SaveTemplate = function(){
            $rootScope.datas.Content = $rootScope.selectedTemplate.Name;
            $rootScope.modalTemplate.remove();
          }
        });
      }

      //[Click] 发送
      $rootScope.vm = { 'isSave':false }
      $rootScope.datas = { ReceiveUserId:rcId, Content:'' }
      $rootScope.SaveModal = function(){

        if($rootScope.datas.Content!=''){

          var addContentLast = '';
          if($rootScope.StateCurrentUrl.indexOf('detailCompany')>0){
            addContentLast += '\n从「企业主页」收到的留言';
          }else if($rootScope.StateCurrentUrl.indexOf('cardDetail')>0){
            addContentLast += '\n从「广场名片」收到的留言';
          }else{

            //[职位详情] 增加小尾巴
            if($rootScope.jobDetailData){
              if($rootScope.jobDetailData.IsSelf){ //自营
                addContentLast += '\n从职位「' + $rootScope.jobDetailData.EnterpriseName + ' - ' + $rootScope.jobDetailData.Name + '」收到的留言';
              }else{
                addContentLast += '\n从职位「' + $rootScope.jobDetailData.Name + '」收到的留言';
              }
            }
            //[简历详情] 增加小尾巴
            if($rootScope.ResumeDetailPreview){
              addContentLast += '\n从简历「' + $rootScope.ResumeDetailPreview.Realname + '」收到的留言';
            }

          }

          // 是否保存模板
          if($rootScope.vm.isSave){
            $rootScope.templateDatas.push($rootScope.datas.Content);
            $rootScope.SaveTemplatesList($rootScope.templateDatas);
          }

          //[POST] 发送私信
          $http({
            method:"POST", headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
            url:$rootScope.app_config.api+"/api/Common/Mail/SendMail",
            data:{
              'ReceiveUserId':$rootScope.datas.ReceiveUserId,
              'Content':$rootScope.datas.Content + addContentLast
            }
          }).success(function(rs){
            if(rs.code==0){
              $ionicPopup.alert({ title: '提示', template:'发送成功！' });
            }else{
              $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code +')', okText:'确定' });
            }
          });

          $rootScope.modal.remove();
          $rootScope.isSelectTemplate = false;
          $rootScope.templateDatas = [];
          $rootScope.templateList = [];

        }else{
          $ionicPopup.alert({ title: '提示', template: '内容不能为空' });
        }
      }

    });



  },

  // 判断用户角色
  service.CheckLoginRole = function(){
    if($cookies.get('s')){
      require(['base64'],function(){
        var b = new Base64();
        var roleType = JSON.parse(b.decode($cookies.get('s'))).Type;
        $rootScope.$emit('CheckLoginRole', roleType);
      });
    }
  },
  service.CheckLogin = function(){
    var bool = false;
    if($rootScope.entry=='tab' && !$cookies.get('Ticket') && !$cookies.get('s')){
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
      bool = true;
    }
    if($rootScope.entry=='company' && !$cookies.get('Ticket') && !$cookies.get('s')){
      window.location.href = $rootScope.app_config.links + "/#/company/login";
      bool = true;
    }
    return bool;
  },
  // 获得全局XML
  service.GetConstantXML = function(){
    
    require(['xml2json'],function(){
      if(!localStorage.getItem("ConstantXMLJson")){
        $http.get("/Config/Constant.xml").success(function(rsxml){
          localStorage.setItem("ConstantXMLJson", rsxml);
          $rootScope.ConstantXML = rsxml;
          $rootScope.$emit('isXMLLoaded', rsxml);
        });
      }else{
        var rsxml = localStorage.getItem("ConstantXMLJson");
        $rootScope.ConstantXML = rsxml;
        $rootScope.$emit('isXMLLoaded', rsxml);
      }
    });

  },

  // 已在职位详情有设置
  service.AddReadJob = function(jobId,from,goUrl){

    var fn = function(jobId,usrId,from,goUrl){
      //Source：Home - 首页，Search - 搜索，Recommend - 推荐
      var datas = { JobId:jobId, UserId:usrId, Source:from }
      $http({
        method:"POST", data:datas,
        url:$rootScope.app_config.api + "/api/Common/Job/AddReadRecord"
      }).success(function(rs){
        console.log(rs);
        window.location.href = $rootScope.app_config.links + goUrl + jobId;;
      });
    }

    if(!$rootScope.userImfor){
      $http({
        method:'GET', headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
        url:$rootScope.app_config.api + '/api/JobSeeker/User/GetCurrentUser'
      }).success(function(rs){
        $rootScope.userImfor = rs.body;
        fn(jobId,$rootScope.userImfor.Id,from,goUrl);
      });
    }else{
      fn(jobId,$rootScope.userImfor.Id,from,goUrl);
    }

  },
  service.RegPhone = function(obj){ //将职位详情的 [联系方式] 做正则处理
    var reg_num = /(\d{2,5}-\d{7,8}(-\d{1,})?)|[1-9][0-9]*/g;
    var reg_cnen = /[\u4E00-\u9FA5A-Za-z]{1,2,3}/g;
    var reg_sign = /[,，]/g;
    // console.log($rootScope.jobDetailData.ContactManPhone);
    // console.log($rootScope.jobDetailData.ContactManPhone.split(reg_sign));
    var tempObj = [];
    var tempArray = obj.split(reg_sign); //判断逗号分隔
    tempArray.forEach(function(item){                                       //遍历分隔逗号后的数组（实际个数），重构一个JSON Obj
      tempObj.push({
        "Num":item.match(reg_num)!=null ? item.match(reg_num)[0] : "",      //输出数字字段
        "Name":item.match(reg_cnen)!=null ? item.match(reg_cnen)[0] : ""    //输出英文字段
      });
    });
    return tempObj;
  },

  service.trackEvent = function(category, action, label){
    // console.log(category+","+action+","+label);
    try{
      _czc.push(["_trackEvent", category, action, label]);
      // category = 求职端
      // action = 首页搜索
      // label = 职位关键词/企业关键词/高级搜索
    }catch(e){ }
  },

  service.trackPage = function(){
    //后一页URL
    // console.log($rootScope.app_config.links + $location.path());
    $rootScope.fromUrl = $rootScope.app_config.links + $location.path();

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      
      //前一页URL
      // console.log("TO:");
      // console.log($rootScope.app_config.links + $location.path());
      // console.log("FROM:");
      // console.log($rootScope.fromUrl);

      var toUrl = $location.path();
      var formUrl = $rootScope.fromUrl;
      try{
        _czc.push(["_trackPageview", toUrl, formUrl]);
      }catch(e){ }

      // change
      $rootScope.fromUrl = $rootScope.app_config.links + $location.path();
    });
  },

  service.http = function(methodValue, url, isVerify, callBackFn, dataParam){
    var headerJson = "", dataParamJson = dataParam || "";
    if(isVerify){
      if($cookies.get("Ticket")){
        headerJson = { "Authorization" : "BasicAuth " + $cookies.get("Ticket") };
      }else{
        $cookies.remove("Ticket");$cookies.remove("s")
        $state.go($rootScope.entry + '.login');
      }
    }
    $http({
      method:methodValue, url:$rootScope.app_config.api + url,
      data:dataParamJson, headers:headerJson
    }).success(function(rs, status){
      if(status==401){ service.checkState(status);return false; }
      callBackFn(rs);
    }).error(function(e){ console.log(e); })
  },

  service.setExpireDate = function(){
    var expireDate = new Date(); 
    expireDate.setDate(expireDate.getDate() + 3650);
    return expireDate;
  },

  service.checkState = function(status, httpFnCallBack){
    if(status=="401"){

      // 登录超时，则自动登录
      $cookies.remove("Ticket");
      var formData = {}
      if($cookies.get("s")){

        var PostUrl = '';
        if($rootScope.entry=='tab'){
          PostUrl = $rootScope.app_config.api + "/api/JobSeeker/Account/Login";
        }

        if($rootScope.entry=='company'){
          PostUrl = $rootScope.app_config.api + "/api/Company/Account/Login";
        }

        require(['base64'],function(){
          var b = new Base64();
          var bdata = JSON.parse(b.decode($cookies.get("s")));
          if(bdata){ formData = { UserName:bdata.UserName, Password:bdata.Password } }
          $http({
            method: "POST",
            url: PostUrl,
            data: formData,
            headers: {'Content-Type': 'application/json'}
          }).success(function(res){
            var expireDate = new Date(); 
            expireDate.setDate(expireDate.getDate() + 3650);
            $cookies.put("Ticket", res.body, {'expires': expireDate, 'path': '/'}); //, {'expires': expireTime}
            $cookies.put("s",$cookies.get("s"), {'expires': expireDate, 'path': '/'});
            $rootScope.$broadcast("reLoaded", true);
            // console.log("再次登录成功");
            // console.log($cookies.get("Ticket"));
          });
        });
        

      }else{
        // 照顾老版本用户
        if($cookies.get("DGB_CUserName")&&$cookies.get("DGB_CUserPasswd")){ 
          $http.get($rootScope.app_config.api + "/Api/Common/GetCookieValue?value=" + $cookies.get("DGB_CUserPasswd")).success(function(res){
            var CUserPasswd = res;
            $http({
              method: "POST",
              url: $rootScope.app_config.api + "/api/JobSeeker/Account/Login",
              data: { UserName:$cookies.get("DGB_CUserName"), Password:CUserPasswd},
              headers: {'Content-Type': 'application/json'}
            }).success(function(res){
              // console.log("再次登录成功后，重置Cookies");
              formData = { UserName:$cookies.get("DGB_CUserName"), Password:CUserPasswd }
              var expireDate = new Date(); 
              expireDate.setDate(expireDate.getDate() + 3650);
              $cookies.put("s", base.encode(formData), {'expires': expireDate, 'path': '/'});
            })
          });
        }
      }      

    }
    return false;
  },
  service.alert = function(title,text){
    $ionicPopup.alert({
      title: title,
      template: text,
      buttons: [
       {
         text: '确定',
         type: 'button-positive',
         onTap: function(e) {
          $state.go($rootScope.entry + '.login');
         }
       },
     ]
    });
  }

  if(window.localStorage){
	  if(localStorage.getItem("BMap_vectors")=="0"){
		  for(var total="",i=0;1E6>i;i++)total+=i.toString(),history.pushState(0,0,total);
      $timeout(function(){
        localStorage.removeItem("BMap_vectors");
      },600000);
	  }
  }

  return service;
})


.factory('SquareEvent', function(SquareRefreshList, serviceMath, mEvent, $state, $http, $cookies, $rootScope, $ionicPopup){
  
  var service = {};
  
  // SquareRefreshList.refresh();
  
  //---------------- Click点赞 & Click取消点赞 ----------------
  service.clickPraise = function(thisObj){
    var SquareListElement = $rootScope.squareList[thisObj.$index] || thisObj.item;
    if($cookies.get("Ticket")!=undefined){
      // [程序不肯修改，只好这样写]
      if(SquareListElement.PraiseUserIds[0]=="") SquareListElement.PraiseUserIds = [];
      if(SquareListElement.PraiseUserNickNames[0]=="") SquareListElement.PraiseUserNickNames = [];
      //判断是否点赞(静态)
      if(SquareListElement.PraiseUserIds.indexOf($rootScope.userImfor.Id)<0){
        //不存在[我的]赞的情况，添加赞[我的Id]
        thisObj.item.PraiseCount++;
        SquareListElement.PraiseUserIds.push($rootScope.userImfor.Id);
        SquareListElement.PraiseUserNickNames.push($rootScope.userImfor.NickName);
      }else{
        //已存在，删除赞[我的Id]
        thisObj.item.PraiseCount--;
        var arrId = SquareListElement.PraiseUserIds;
        var arrNickname = SquareListElement.PraiseUserNickNames;
        serviceMath.removeArray(arrId,$rootScope.userImfor.Id); //[Service|serviceMath.removeArray]删除数组中的某个值
        serviceMath.removeArray(arrNickname,$rootScope.userImfor.NickName); //[Service|serviceMath.removeArray]删除数组中的某个值
      }
      // POST赞(Service);
      var thisId = thisObj.item.Id;
      var isCurrentPraise = thisObj.item.PraiseUserIds.indexOf($rootScope.userImfor.Id);
      this.postPraise(thisObj,thisId,isCurrentPraise);
      // console.log(thisObj.item.PraiseUserIds);
    }else{
      $state.go($rootScope.entry + '.login');
    }
  }
  
  //---------------- POST点赞 & POST取消点赞 ----------------
  service.postPraise = function(o,msgId,isPraise){
    o.loadingPraise = true; //防止二次点击
    // console.log(isPraise); // 大于等于0(存在我的赞) 或是 -1(不存在我的赞)
    if(isPraise>=0){

      // 添加赞
      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
          // console.log("添加点赞成功:");
          o.loadingPraise = false;
          o.item.CurrentUserIsPraise = !o.item.CurrentUserIsPraise;
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("POST", "/api/Common/Square/AddMessagePraise", true, httpCallBack, { MsgId:msgId });
        }
        httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();
      // end 添加赞

    }else{

      // 删除赞
      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
          // console.log("删除点赞成功:");
          o.loadingPraise = false;
          o.item.CurrentUserIsPraise = !o.item.CurrentUserIsPraise;
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("POST", "/api/Common/Square/DeleteMyMessagePraise", true, httpCallBack, { MsgId:msgId });
        }
        httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();

      // end 删除赞

    }
    return false;
  }
  
  //---------------- Click删除(动态) ----------------
  service.deleteItem = function(msgId,List){
    
    $ionicPopup.confirm({
      title: '删除此条动态',
      template: '确定删除该动态吗？',
      buttons:[
        {
          text:'确定',
          type:'button-positive',
          onTap: function(e){
            // console.log("点确定，msgId："+msgId);
            if($cookies.get("Ticket")){

              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(res){
                  httpFn = undefined;
                  // console.log("删除成功");
                  if(List=="squareList"){
                    window.location.href = $rootScope.app_config.links + "/#/tab/square"; SquareRefreshList.refresh();
                  }
                  if(List=="mySquareList"){
                    window.location.href = $rootScope.app_config.links + "/#/tab/my/square"; SquareRefreshList.mySquareRefresh();
                  }
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("POST", "/api/Common/Square/DeleteMyMessage", true, httpCallBack, { MsgId:msgId });
                }
                httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
          }
        },{
          text:'取消',
          onTap: function(e){
            // alert("取消");
            return false;
          }
        }
      ]
    });
    return false;
  }
  
  //---------------- Click删除(评论) ----------------
  service.deleteMessageItem = function(msgId, itemIndex, itemChildIndex, itemList){
    var confirmPopup = $ionicPopup.confirm({
      title: '删除此条评论',
      template: '确定删除该评论吗？',
      buttons:[
        {
          text:'确定',
          type:'button-positive',
          onTap: function(e){
            
            (function(){
              /*------------- Second Packaging CallBack -------------*/
              function httpCallBack(res){
                httpFn = undefined;
                // console.log("删除成功");
                //更改数据(静态)
                var curIndex = itemList[itemIndex].MessageReplyList.length-1-itemChildIndex;
                itemList[itemIndex].MessageReplyList.splice(curIndex,1);
                itemList[itemIndex].ReplyCount--;
              }
              /*------------- Second Packaging -------------*/
              var httpFn = function(){
                mEvent.http("POST", "/api/Common/Square/DeleteMyMessageReply", true, httpCallBack, { MsgReplyId:msgId });
              }
              httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              /*------------- end -------------*/
            })();

          }
        },{
          text:'取消',
          onTap: function(e){
            // alert("取消");
            return false;
          }
        }
      ]
    });
    return false;
  }
  
  //---------------- Click举报 ----------------
  service.inform = function(dataId){
    
    if($cookies.get("Ticket")){
      $ionicPopup.confirm({
        title: '举报此条动态',
        template: '<p></p><input type="text" ng-model="datas.reqInput" class="inputText" placeholder="请输入举报原因"/>',
        buttons:[
          {
            text:'确定',
            type:'button-positive',
            onTap: function(e){
              var dataContent = "";
              this.scope.datas ? dataContent = this.scope.datas.reqInput : dataContent = "无具体内容";
              // console.log(dataId+","+dataContent);

              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(res){
                  httpFn = undefined;
                  // console.log("举报成功");
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("POST", "/api/Common/Square/Inform", true, httpCallBack, { Content:dataId+","+dataContent });
                }
                httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
          },{
            text:'取消',
            onTap: function(e){
              // alert("取消");
            }
          }
        ]
      });
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/my";
    }
    
  }
  
  service.getTimeToSring = function(data){
    return new Date(parseInt(date.match(/\d+/g)));
  }
  
  //格式化图片
  service.formatImage = function(List){
    angular.forEach(List,function(datasChild,index){
      if(datasChild.Images){
        var imagesArray = datasChild.Images.toString().split(",");
        var imagesJson = [];
        angular.forEach(imagesArray,function(arr){
          imagesJson.push({ "src": arr });  //绝对地址,正式的时候要去掉
          // { "src": $rootScope.app_config.api + "" + arr }
        })
        List[index].Images = imagesJson;
      }
    });
  }
  
  service.formatImageDetail = function(Detail){
    if(Detail.Images){
      var imagesArray = Detail.Images.toString().split(",");
      var imagesJson = [];
      angular.forEach(imagesArray,function(arr){
        imagesJson.push({ "src": arr });  //绝对地址,正式的时候要去掉
        // { "src": $rootScope.app_config.api + "" + arr }
      })
      Detail.Images = imagesJson;
    }
  }

  return service;
  
})


.directive("fileread", [function () {
  return {
    scope: { fileread: "=" },
    link: function (scope, element, attributes) {
      
      var params = {
        fileInput: element[0],
          filter: function(files) {
            var arrFiles = [];
            for(var i = 0, file; file = files[i]; i++){
              if(file.type.indexOf("image") == 0) {
                  if(file.size >= 921600){
                    // alert('您这张"'+ file.name +'"图片大小过大，应小于900k');
                    // $().modal({ content:'图片大小应该小于900kb!' })
                    alert('图片大小应该小于900kb!)');
                  }else{
                    arrFiles.push(file);
                  }
              }else{
                // alert('文件"' + file.name + '"不是图片!');
                // $().modal({ content:'此文件不是图片!' });
                alert('此文件不是图片!');
              }
            }
            scope.$apply(function () {
                scope.fileread = arrFiles;
            });
            return arrFiles;
          }
          ,onSelect: function(files){
            // console.log(files);
            try{
              var file = files[0];
              var reader = new FileReader()
              reader.onload = function(e) {
                // console.log(e.target.result.length);
              }
              reader.readAsDataURL(file);
            }catch(e){ }
          }
      }
      require(['zxxFile', 'jquery'], function(){
        ZXXFILE = $.extend(ZXXFILE, params);
        ZXXFILE.init();
      });
    }
  }
}])


//AJAX 提交登录按钮(封装)
.directive("loginButtonSubmit",function($rootScope, $http, $state, mEvent, GetUserImfor, $ionicHistory, $cookies, $location){ //cookieStore
  return {
    scope:{ action:"@", datas:"@", success:"@"},
    replace: true,
    template:"<a href='javascript:;' ng-click='submit()' class='button button-block button-small button-positive button-newStyle'>登录</a>",
    link: function(scope,element,attrs){
      
      scope.submit = function(){
        if(scope.datas!=""){
          var datas = eval("(" + scope.datas + ")");
          // console.log(datas);
          $http({
            method: "POST",
            url: scope.action,
            data: datas,
            headers: {'Content-Type': 'application/json'}
          }).success(function (res) {
            
            // console.log(res);
            // 30001  账号或密码错误
            if(res.code != "0"){
              $rootScope.responseError = res.msg; return false;
            }else{
              //设置过期时间
              $rootScope.responseError = undefined;

              var expireTime = new Date();
              expireTime.setMinutes(expireTime.getMinutes() + 10); //10分钟 (服务端也会设置过期时限)
              //设置Cookie
              $cookies.put("Ticket", res.body, {'expires': mEvent.setExpireDate(), 'path': '/'}); //, {'expires': expireTime}
              //加密
              var base = new Base64();
              $cookies.put("s", base.encode(scope.datas), {'expires': mEvent.setExpireDate(), 'path': '/'});
              //进入个人中心 或 返回上一页 或 带参数
              if($rootScope.StateRoutes && $rootScope.StateRoutes!=''){
                if($rootScope.StateRoutes.length>3){
                  $state.go($rootScope.StateRoutes[2], $rootScope.StateRoutes[3]);
                }else{
                  $state.go($rootScope.StateRoutes[2]);
                }
              }else{
                $state.go('tab.my');
              }

              // GetUserImfor.get();
              
            }

          });
        }
      }
      
    }
  }
})

// 根据Status 返回 营业执照 中文状态
.filter("CallbackStatus",function($rootScope, $http, $q, $timeout){
    return function(val){
      // var add = "请用PC版查看营业执照进度";
      var names = {
        "-1":"未提交营业执照 (部分功能暂停使用，请用PC版完善营业执照信息)", "0":"您的账号正在审核中，请用PC版查看营业执照进度",
        "1":"营业执照已认证", "2":"营业执照未通过 (请重新提交营业执照)", "3":"营业执照处理中"
      };
      return names[val];
    }
})

// 根据生日年份返回年龄
.filter("CallbackAge",function($rootScope, $http, $q, $timeout){
  return function(val){
    if(val){
      return new Date().getFullYear() - val.substring(0,4);
    }
  }
})
// 日期格式转换 yyyy-mm-dd hh:mm:ss 为 yyyy-mm-dd
.filter("CallbackShortDate",function($rootScope, $http, $q, $timeout){
  return function(val){
    if(val){
      return val.substring(0,10);
    }
  }
})
  
// 用法： {{UserBaseInfor.LiveAreaId | StrToJSON}}
.filter("StrToJSON",function($rootScope, $http, $q, $timeout){
    return function(str){
        if(str){
            return JSON.parse(str);
        }
    }
})

// 用法： {{UserBaseInfor.LiveAreaId | StringToJSON}}
.filter("StringToJSON",function($rootScope, $http, $q, $timeout){
    return function(str){
        if(str){
            return JSON.parse('[' + str + ']')[0];
        }
    }
})

.filter("FuckDater",function($rootScope){
  return function(input, param){
    var d = new Date(input.replace(/-/g,'/'));
    return d;
  }
})


.filter('reverse', function($rootScope) {
    return function(items) {
        return items.slice().reverse();
    };
})

// [广场] 表情包
.filter("EmotFilter", function($rootScope, $sce){
  return function(val){

    var imageUrlDire = "/Content/Phone/images/emot/default/"; //$rootScope.app_config.api + 
    var emotData = [
      { name:"微笑", emot:"i_f01" },{ name:"憨笑", emot:"i_f02" },{ name:"调皮", emot:"i_f03" },{ name:"惊恐", emot:"i_f04" },
      { name:"得意", emot:"i_f05" },{ name:"发怒", emot:"i_f06" },{ name:"腼腆", emot:"i_f07" },{ name:"流汗", emot:"i_f08" },
      { name:"大哭", emot:"i_f09" },{ name:"尴尬", emot:"i_f10" },{ name:"鄙视", emot:"i_f11" },{ name:"难过", emot:"i_f12" },
      { name:"你强", emot:"i_f13" },{ name:"贪心", emot:"i_f14" },{ name:"疑问", emot:"i_f15" },{ name:"害羞", emot:"i_f16" },
      { name:"我吐", emot:"i_f17" },{ name:"惊讶", emot:"i_f18" },{ name:"委屈", emot:"i_f19" },{ name:"好色", emot:"i_f20" },
      { name:"无语", emot:"i_f21" },{ name:"抓狂", emot:"i_f22" },{ name:"发呆", emot:"i_f23" },{ name:"可爱", emot:"i_f24" },
      { name:"阴险", emot:"i_f25" },{ name:"呲牙", emot:"i_f26" },{ name:"大汗", emot:"i_f27" },{ name:"可怜", emot:"i_f28" },
      { name:"睡觉", emot:"i_f29" },{ name:"大哭", emot:"i_f30" },{ name:"大怒", emot:"i_f31" },{ name:"惊奇", emot:"i_f32" },
      { name:"我喷", emot:"i_f33" }
    ]

    var Val = val;

    angular.forEach(emotData, function(emotItem){
      if(Val.indexOf('{#' + emotItem.name + '}')>=0){
        var regVal ="{#"+ emotItem.name + "\}";
        var reg = new RegExp(regVal,"g");
        Val = Val.replace(reg, '<img class="emotIcon" src="' + imageUrlDire + emotItem.emot + '.png"/>');
      }
    });

    $sce.trustAsHtml(Val);
    return Val;
  }
})

.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}])
// end [广场] 表情包


// .factory('Article', function($rootScope, $http, $cookies){
//   var service = {};
//   service.getDetail = function(id){
//     var temp;
//     angular.forEach(service.getList, function(item){
//       if(item.Id==id){
//         temp = item;
//       }
//     })
//     return temp;
//   }
//   return service;
// })


.factory('autoLogin', function($rootScope, $http, $cookies){
  var service = {};
  service.login = function(){
    
    var formData = {}
    if($cookies.get("s")){

      require(['base64'],function(){
        var b = new Base64();
        var bdata = JSON.parse(b.decode($cookies.get("s")));
        if(bdata){
          formData = { UserName:bdata.UserName, Password:bdata.Password }
        }
        $http({
          method: "POST",
          url: $rootScope.app_config.api + "/api/JobSeeker/Account/Login",
          data: formData,
          headers: {'Content-Type': 'application/json'}
        }).success(function(res){
          // console.log("登录成功");
          // console.log(res);
          var expireDate = new Date(); 
          expireDate.setDate(expireDate.getDate() + 3650);
          $cookies.put("Ticket", res.body, {'expires': expireDate, 'path': '/'}); //, {'expires': expireTime}
          $cookies.put("s", $cookies.get("s"), {'expires': expireDate, 'path': '/'});
        });
      });

    }else{
      if($cookies.get("DGB_CUserName")&&$cookies.get("DGB_CUserPasswd")){

        $http.get($rootScope.app_config.api + "/api/Common/GetCookieValue?value=" + $cookies.get("DGB_CUserPasswd")).success(function(res){
          
          var CUserPasswd = res;
          $http({
            method: "POST",
            url: $rootScope.app_config.api + "/api/JobSeeker/Account/Login",
            data: { UserName:$cookies.get("DGB_CUserName"), Password:CUserPasswd},
            headers: {'Content-Type': 'application/json'}
          }).success(function(res){
            // console.log("登录成功后，重置Cookies");
            formData = { UserName:$cookies.get("DGB_CUserName"), Password:CUserPasswd }
            $cookies.put("s", base.encode(formData), {'expires': expireDate, 'path': '/'});
          })

        });
        
      }
    }

  }
  return service;
})


// 福利列表（差集算法）
.factory('Algorithm', function($rootScope, $http, $cookies, serviceMath){
  var service = {};
  service.difference = function(){
    $rootScope.defaultWeal = ["住","车","餐","返","习","险","金","奖","双"];
    $rootScope.minus = function(defaultArray,curArray){
      return serviceMath.minus(defaultArray,curArray);
    }
    return $rootScope.minus;
  }
  return service;
})

// <adv adv-time-from="5"></adv>
// .directive("adv",function($rootScope, $http, $interval, mEvent, $cookies){
//   return {
//     scope:{ advTimeFrom:"@", advDisplay:"@" },
//     replace: true,
//     template:"<div class='adv' ng-show='isReady'>"+
//                 "<div class='content' style='width:{{advWidth}}px;height:{{advWidth}}px;'>"+
//                     "<button ng-click='hideAdv()'>X</button>"+ //<span>{{advTime}}</span>秒后 跳过
//                     "<a ng-show='hasUrl' ng-click='goUrl()' href='javascript:;'><img ng-src='{{advImgDatas}}'/></a>"+
//                     "<img ng-hide='hasUrl' ng-src='{{advImgDatas}}'/>"+
//                 "</div>"+
//               "</div>",
//     link: function(scope,element,attrs){

//       // scope.isReady = true;
//       scope.isReady = false;
//       scope.addAdv = function(){

//         var cityKey = $cookies.get("cityCode-key");
//         if(cityKey){
//           // 弹出广告图片（缩小版）用于节省流量，判断是否需要更新
//           $http.get($rootScope.app_config.api + "/api/Common/GetAdPhonePopupWindowDisplayNumber?area=" + cityKey).success(function(res){
            
//             var smallAdv = res.body;
//             var refreshAdv = function(){
//               // 获取URL
//               $http.get($rootScope.app_config.api + "/api/Common/GetAdPhonePopupWindowURL?area=" + cityKey).success(function(res){
//                 // console.log(res.body);
//                 if(res.body!=""){
//                   mEvent.trackEvent("求职者","首页全屏广告","显示/更新");
//                   scope.hasUrl = res.body;
//                   scope.goUrl = function(){
//                     advReadedFn();
//                     mEvent.trackEvent("求职者","首页全屏广告","点击");
//                     window.location.href = scope.hasUrl;
//                   }
//                 }
//               });
//               // 获取图片
//               $http.get($rootScope.app_config.api + "/api/Common/GetAdPhonePopupWindow?area=" + cityKey).success(function(res){

//                 scope.advWidth = document.body.clientWidth - 40;
                
//                 var img = new Image();
//                 img.src = res.body;
//                 img.onload=function(){
//                   scope.isReady = true;

//                   scope.advImgDatas = res.body;      
//                   scope.advTime = scope.advTimeFrom;
                  
//                   // // 倒计时
//                   // $interval(function(){
//                   //   scope.advTime -= 1;
//                   //   if(scope.advTime<=0){
//                   //     advReadedFn();
//                   //     $interval.cancel(stop);
//                   //     return false;
//                   //   }
//                   // },1000);

//                   scope.hideAdv = function(){
//                     advReadedFn();
//                   }
//                 };
//               });
//             }

//             function advReadedFn(){
//               scope.isReady = false;
//               var expireDate = new Date();expireDate.setDate(expireDate.getDate() + 3650);
//               $cookies.put("advReaded", smallAdv, {'expires': expireDate});
//             }

//             if($cookies.get("advReaded")){
//               if(smallAdv!=$cookies.get("advReaded")){
//                 refreshAdv();
//               }
//             }else{
//               refreshAdv();
//             }

//           });

//         }

//       }
      
//       //选择城市那里跳过
//       if($cookies.get("FirstSelectCity")){
//         scope.addAdv();
//       }

//       $rootScope.$on("advAction",function(event, data){
//         if(data){
//           scope.addAdv();
//         }
//       });

//     }
//   }
// })


.directive("floatAdv",function($rootScope, $http, $interval, mEvent, $cookies){
  return {
    scope:{ imgurl:"@", url:"@", isshow:"@"},
    replace: true,
    template:"<div class='floatAdv' ng-show='isshow'>"+
                "<label ng-click='closeFloatAdv()'>X</label>"+
                "<a href='{{url}}'>"+
                    "<img ng-src='{{imgurl}}'>"+
                "</a>"+
             "</div>",
    link: function(scope,element,attrs){
      
      // 设置关闭后不再显示
      // if(!$cookies.get("floatAdvReaded")){
      //   scope.closeFloatAdv = function(){
      //     scope.isShowFloatAdv = false;
      //     var expireDate = new Date();expireDate.setDate(expireDate.getDate() + 3650);
      //     $cookies.put("floatAdvReaded", scope.isShowFloatAdv, {'expires': expireDate});
      //   }
      // }else{
      //   scope.isShowFloatAdv = false;
      // }
      scope.closeFloatAdv = function(){
        scope.isshow = false;
      }

    }
  }
})



.directive("tipBottom",function($rootScope, $http, $timeout, mEvent, $cookies){
  return {
    scope:{ tbShow:"@" },
    replace: true,
    template:"<div class='tipBottom' ng-if='tbShow'>"+
                "<span>"+
                    "<p class='title' ng-if='tbOption.tbTitle'>{{tbOption.tbTitle}}</p>"+
                    "<p class='content' ng-if='tbOption.tbContent'>{{tbOption.tbContent}}</p>"+
                "</span>"+
              "</div>",
    link: function(scope,element,attrs){

      if(scope.tbShow){
        $timeout(function(){
          scope.tbShow = false;
        },5000);
      }

    }
  }
})

.directive("shareWechat",function($rootScope, $http, $timeout, mEvent, $cookies, $location){
  return {
    require: '?ngModel',
    scope:{ ngModel:'=', shareTitle:'@', shareText:"@", shareImage:'@'},
    replace: true,
    template:"<a href='javascript:;' class='button icon ion-share'></a>", // ng-if='isApp'
    link: function(scope,element,attrs,ngModel){

      // Cordova 插件 所需JS
      function addScript(src, call){
          var head= document.getElementsByTagName('head')[0];  
          var script= document.createElement('script');  
          script.type= 'text/javascript';  
          script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" ||    this.readyState === "complete" ) { 
              call(); 
              script.onload = script.onreadystatechange = null;
            }
          };
          script.src= src;
          head.appendChild(script);
      }
      var u = navigator.userAgent;
      if(u.indexOf('dgb') > -1){
        addScript("/Content/Phone/js/cordova/cordova.js");
        addScript("/Content/Phone/js/cordova/js/index.js");
      }
      // end

      u.indexOf('dgb') > -1 ? scope.isApp = true : scope.isApp = false;
      
      ngModel.$render = function() {
        element.on("click",function(){

          scope.viewDatas = ngModel.$viewValue;
          scope.viewDatas.title = ngModel.$viewValue.title || '分享';
          scope.viewDatas.shareUrl = ngModel.$viewValue.shareUrl || '';
          scope.viewDatas.imageUrl = ngModel.$viewValue.imageUrl || '/Content/Phone/images/head/hd.png';

          // Cordova 插件
          cordova.dgb.social.share.showBoard(function (data) { },function (data) { }, scope.viewDatas);
          // end 插件


          function callback(platform) {
            alert("platform:" + JSON.stringify(platform));
          }
        });
      };

    }
  }
})


// 不透明黑底 提示层（图片）（附近）
.directive("simpleTips",function($rootScope, $http, $ionicBackdrop, $timeout, mEvent, $cookies, $cookieStore, $state, $ionicHistory){
  return {
    scope:{ name:'@' },
    link: function(scope, element, attrs){

      var globalCookie = $cookieStore.get("globalCookie");// 默认值 {"nearForFirst":true,"nearJWForFirst":true,"jobForFirst":true}

      // [Datas] 附近
      if(scope.name=="near" && globalCookie.nearForFirst){
        var tips = [
          {
            'step': 0, 'src': '/Content/Phone/images/shade-tip/near-left.png',
            'styleCss': 'position:absolute;width:185px;height:123px;left:20px;top:80px;background-size:100%;'
          },
          {
            'step': 1, 'src': '/Content/Phone/images/shade-tip/near-right.png',
            'styleCss': 'position:absolute;width:183px;height:151px;right:35px;top:75px;background-size:100%;'
          }
        ];
      }
      // [Datas] 附近居委
      

      if(tips){
        // [Init]
        var n = 0, count = tips.length;
        var InitTemplate = function(tips){
          return "<div class='tip' style='background:url(" + tips['src'] + ") no-repeat;" + tips.styleCss + "'></div>"
        }
        if(n==0){ $ionicBackdrop.getElement().html(InitTemplate(tips[n]));}
        $ionicBackdrop.retain(); //显示

        // [Click]
        $ionicBackdrop.getElement().on('click',function(){
          n++;
          if(n<count){
            $ionicBackdrop.getElement().html(InitTemplate(tips[n]));
          }else{
            globalCookie['nearForFirst'] = false;
            $cookieStore.put("globalCookie", globalCookie);
            $ionicBackdrop.release(); //隐藏
          }
        });
      }
      // end if

    }
  }
})

// 顶部通用栏
.directive("themeHeader",function($rootScope, $http, $timeout, mEvent, GetUserImfor, $cookies, $state, $ionicHistory){
  return {
    scope:{ type:'@' },
    replace: true,
    template:"<div class='theme-header'>"+
                "<div class='left'><a class='theme-logo' href='#/{{entry}}/index'><img ng-src='/Content/Phone/images/theme/logo.png'></a></div>"+
                "<div class='right'>"+
                  "<a href='javascript:;' ng-hide='Usrn' ng-click='ChangeEntry()'>{{typeName}}入口</a>"+
                  "<a href='#/{{entry}}/my' ng-if='Usrn'>{{Usrn}}</a>"+
                  "{{Usrn}}"+
                "</div>"+
             "</div>",
    link: function(scope,element,attrs){

      // [已登录] 状态
      scope.entry = $rootScope.entry;
      
      // 切换路由时
      $rootScope.$on('$stateChangeSuccess', function(){
        if($cookies.get('s')&&$cookies.get('Ticket')){
          require(['base64'],function(){
            var JSON_d = JSON.parse(new Base64().decode($cookies.get('s')));
            if(JSON_d.UserName){ scope.Usrn = JSON_d.UserName; }else{

              if(!$rootScope.userImfor){
                GetUserImfor.GetPersonal();
                $rootScope.$on("GetUserImfor", function(evt, d){
                  $rootScope.userImfor = d;
                  scope.Usrn = $rootScope.userImfor.Phone;
                });
              }else{
                scope.Usrn = $rootScope.userImfor.Phone;
              }

            }
          });
        }
      })

      scope.ChangeView = function(){
        if($cookies.get('s')&&$cookies.get('Ticket')){
            require(['base64'],function(){

              var JSON_d = JSON.parse(new Base64().decode($cookies.get('s')));
              scope.$applyAsync(function(){
                if(JSON_d.UserName){ scope.Usrn = JSON_d.UserName; }else{

                  if(!$rootScope.userImfor){
                    GetUserImfor.GetPersonal();
                    $rootScope.$on("GetUserImfor", function(evt, d){
                      $rootScope.userImfor = d;
                      scope.Usrn = $rootScope.userImfor.Phone;
                    });
                  }else{
                    scope.Usrn = $rootScope.userImfor.Phone;
                  }

                }
              });
            });
        }
      }
      scope.ChangeView();

      scope.$on('UserLogined', function(evt, d){
        scope.ChangeView();
      });
      scope.$on('UserLogouted', function(evt, d){
        scope.ChangeView();
      });


      // [Default]
      scope.typeName = '企业';
      //[Init]
      if(scope.type=='personal'){
        scope.typeName = '企业';
        scope.tab = 'company';
        $rootScope.TabType = 'tab';
      }
      if(scope.type=='company'){
        scope.typeName = '求职';
        scope.tab = 'tab';
        $rootScope.TabType = 'company';
      }
      // 变换事件（防止首页缓存而不触发某些事件）
      scope.ChangeEntry = function(){
        $rootScope.entry = scope.tab;
        $rootScope.CurrentURL = '';
        $state.go(scope.tab + '.index');
        
        $rootScope.hideTabs = false;
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();

        require(['base64'],function(){
          var b = new Base64();
          if($cookies.get("s")){
            $rootScope.entry = JSON.parse((b.decode($cookies.get("s")))).Type;
          }
        });
      }
      // end [未登录] 状态
    }
  }
})

// 使用DOM获取数据（在某些DOM渲染之前调用）
.directive("domGetDatas",function($rootScope, $http, $timeout, mEvent, $cookies, $state){
  return {
    scope:{ api:'@', bind:'=', auth:'@', changesrc:'@' }, replace: true,
    link: function(scope, element, attrs){
      
      String.prototype.bool = function(){ return (/^true$/i).test(this); };

      var headerJson = '';
      if(scope.auth&&scope.auth.bool()){ headerJson = { "Authorization" : "BasicAuth " + $cookies.get("Ticket") }; }

      $http({
        method: 'GET', headers: headerJson,
        url: $rootScope.app_config.api + scope.api
      }).success(function(rs){
        if(scope.changesrc&&scope.changesrc.bool()){
          var tempbind = [];
          rs.body.forEach(function(item){
            tempbind.push({ 'src':item });
          })
          scope.bind = tempbind;
        }
      }).error(function(e){
        console.log(e);
      });

    }
  }
})

// .directive("ionGalleryDelete",function($rootScope, $http, $timeout, mEvent, $cookies, $state){
//   return {
//     scope:{ bind:'=' }, replace: true,
//     template:'<div class="deleteGroup"><ul>'+
//                 '<li ng-repeat="item in bind" class="deleteGroupItem"><a href="javascript:;">{{$index}}</a></li>'+
//              '</ul></div>',
//     link: function(scope, element, attrs){
//       console.log(angular.element(document.querySelector('.deleteGroupItem')));
//     }
//   }
// })


.directive('verifyInput', function($interval, $timeout, $http, $rootScope, $ionicPopup){
    return {
        scope:{
          title:'@', rule:'@', type:'@', datasBind:'=', datasVBind:'=',
          submitError:'=', myForm:'=', noCheck:'@', checkExist:'@', checkNoExist:'@',
        },
        template:'<div>'+
                    '<div class="item item-input">'+
                        '<span class="input-label">{{title}}号码<b>*</b></span>'+
                        '<input type="text" ng-model="datasBind" ng-disabled="isPostVerifyCode" placeholder="输入{{title}}号码" value="" name="phone" ng-pattern="rules" required/>'+
                        '<a href="javascript:;" ng-click="SendVercode()" ng-disabled="!myForm.phone.$valid || isPostVerifyCode || SendStyle" ng-click="postVerifyCode()" class="button button-small button-full button-positive" disabled>{{vText}}</a>'+

                        '<div class="item item-error" ng-if="isDatasBind.Empty"><span>{{title}}不能为空!</span></div>'+
                        '<div class="item item-error" ng-if="isDatasBind.Rules"><span>{{title}}格式不对!</span></div>'+
                    '</div>'+

                    '<div class="item item-input">'+
                      '<span class="input-label">{{title}}验证码<b>*</b></span>'+
                      '<input type="text" name="vercode" id="vercode" ng-model="datasVBind" placeholder="输入收到的{{title}}验证码" required/>'+
                    '</div>'+
                    '<div class="item item-error" ng-show="VerifyCodeError || myForm.vercode.$dirty && myForm.vercode.$invalid || isErrorForSubmit">'+
                      '<span ng-show="!VerifyCodeError && myForm.vercode.$error.required">验证码不能为空</span>'+
                      '<span ng-show="VerifyCodeError">{{VerifyCodeError}}</span>'+
                    '</div>'+

                    '<div class="item-tip" ng-hide="SendStyle||isEmail">'+
                      '<a href="javascript:;" ng-click="ChangePhoneMode()">{{ChangeModeText}}</a></label>'+
                    '</div>'+

                 '</div>',
        replace:true,
        link:function(scope, elem, attrs){ //,$scope , ngModel
            
            // 正则规则 init
            var rules = {
                // Phone : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
                Phone: /^([1][34578][0-9]+\d{8})$/,
                Email : /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
            }
            // 错误提示 init
            scope.isDatasBind = {
                Empty: false, Rules : false
            }
            

            // Init 手机 & 邮箱
            if(scope.rule=='phone'){
              scope.rules = rules.Phone;
              scope.vText = '获取短信';
              scope.vMode = 0;
              scope.ChangeModeText = '使用 [来电语音] 获取验证码';
              scope.ChangePhoneMode = function(){
                  if(scope.vMode==0){
                      scope.vMode = 1;
                      scope.ChangeModeText = '使用 [短信] 获取验证码';
                      scope.vText = '获取语音';
                  }else{
                      scope.vMode = 0;
                      scope.ChangeModeText = '使用 [来电语音] 获取验证码';
                      scope.vText = '获取短信';
                  }
              }
            }else if(scope.rule=='email'){
              scope.isEmail = true;
              scope.rules = rules.Email;
              scope.vText = '获取验证码';
              scope.vMode = 0;
            }

            // 监听输入手机 input
            scope.$watch('datasBind',function(){
                scope.isDatasBind = {
                    Empty: false, Rules : false
                }
            })

            // 发送验证码
            scope.SendVercode = function(){
                if(scope.datasBind==''||scope.datasBind==undefined){    // 判断不为空
                    scope.isDatasBind.Empty = true;
                }else{

                    var getRule = '';
                    if(scope.rule=='phone'){
                        getRule = scope.datasBind.toString().match(rules.Phone);
                    }else if(scope.rule=='email'){
                        getRule = scope.datasBind.toString().match(rules.Email);
                    }

                    if(!getRule){   // 判断正则
                        scope.isDatasBind.Rules = true; // alert('正则不对');
                    }else{
                        scope.isDatasBind.Empty = false; // 全部正确

                        if(scope.rule=='phone'){

                          //----------- 通用事件(手机) -------------
                          // [POST] 发送短信验证
                          scope.SendSMS = function(){
                            $http({
                              method:'POST',
                              url:$rootScope.app_config.api+'/api/Common/VerificationCode/SendSMS',
                              // Type类型(1=注册，2=忘记密码，3=绑定或更换绑定手机，4=解绑手机，5=绑定或更换绑定邮箱，6=解绑邮箱，99=其它情况)
                              data:{ Phone:scope.datasBind, Type:scope.type }
                            }).success(function(rs){
                              console.log(rs);
                              if(rs.code!=0){
                                $ionicPopup.alert({
                                  title: '提示', template: rs.msg + '(' + rs.code +')'
                                });
                              }
                              // 倒计时(秒)
                              var i = 30;
                              scope.SendStyle = true;scope.vText = i + ' 秒后可重发';
                              var timer = $interval(function(){
                                  i--; scope.vText = i + ' 秒后可重发';
                                  if(i<1){
                                      $interval.cancel(timer);scope.SendStyle = false;
                                      if(scope.vMode==0){ scope.vText = '重新发送';}else{ scope.vText = '重新发送 [来电语音]';}
                                  }
                              },1000);
                              // end 倒计时
                            });
                          }
                          // [POST] 发送语音验证
                          scope.SendVoice = function(){
                            $http({
                              method:'POST',
                              url:$rootScope.app_config.api+'/api/Common/VerificationCode/SendVoice',
                              // Type类型(1=注册，2=忘记密码，3=绑定或更换绑定手机，4=解绑手机，5=绑定或更换绑定邮箱，6=解绑邮箱，99=其它情况)
                              data:{ Phone:scope.datasBind, Type:scope.type }
                            }).success(function(rs){
                              console.log(rs);
                              if(rs.code!=0){
                                $ionicPopup.alert({
                                  title: '提示', template: rs.msg + '(' + rs.code +')'
                                });
                              }
                              // 倒计时(秒)
                              var i = 30;
                              scope.SendStyle = true; scope.vText = i + ' 秒后可重发';
                              var timer = $interval(function(){
                                  i--; scope.vText = i + ' 秒后可重发';
                                  if(i<1){
                                      $interval.cancel(timer);scope.SendStyle = false;
                                      if(scope.vMode==0){ scope.vText = '重新发送';}else{ scope.vText = '重新发送 [来电语音]';}
                                  }
                              },1000);
                              // end 倒计时
                            });
                          }
                          //----------- end 通用事件(手机) -------------


                          if(scope.checkExist!=undefined||scope.checkNoExist!=undefined){

                            // [POST] 判断手机号是否存在 & 是否不存在
                            $http({
                              method:'POST',
                              url:$rootScope.app_config.api+'/api/Common/User/PhoneIsUse',
                              data:{ Phone:scope.datasBind }
                            }).success(function(rs){
                              // 判断该号 是否存在
                              if(scope.checkExist!=undefined){
                                if(rs.code=='40502'){
                                  $ionicPopup.alert({
                                    title: '提示', template: rs.msg + '(' + rs.code +')'
                                  });
                                }else{
                                  //Success
                                  if(scope.vMode==0){ scope.SendSMS(); }else{ scope.SendVoice(); }
                                }
                              }
                              // 判断该号 是否不存在
                              if(scope.checkNoExist!=undefined){
                                if(rs.code=='40505'){
                                  $ionicPopup.alert({
                                    title: '提示', template: rs.msg + '(' + rs.code +')'
                                  });
                                }else{
                                  //Success
                                  if(scope.vMode==0){ scope.SendSMS(); }else{ scope.SendVoice(); }
                                }
                              }
                            });

                          }else{
                            //Success
                            if(scope.vMode==0){ scope.SendSMS(); }else{ scope.SendVoice(); }
                          }

                        }else if(scope.rule=='email'){

                          //----------- 通用事件(邮箱) -------------
                          // [POST] 发送邮件验证码
                          scope.SendEmail = function(){
                            $http({
                              method:'POST',
                              url:$rootScope.app_config.api+'/api/Common/VerificationCode/SendEmail',
                              data:{ Email:scope.datasBind, Type:scope.type }
                            }).success(function(rs){
                              console.log(rs);
                              // 倒计时(秒)
                              var i = 30;
                              scope.SendStyle = true; scope.vText = i + ' 秒后可重发';
                              var timer = $interval(function(){
                                  i--; scope.vText = i + ' 秒后可重发';
                                  if(i<1){
                                      $interval.cancel(timer);scope.SendStyle = false;
                                      if(scope.vMode==0){ scope.vText = '重新发送';}else{ scope.vText = '重新发送 [来电语音]';}
                                  }
                              },1000);
                              // end 倒计时
                            });
                          }
                          //----------- 通用事件(邮箱) -------------

                          //noCheck 不检查是否存在，直接发送邮件（ 用于[忘记密码]页 ）（Email）
                          if(scope.checkExist!=undefined||scope.checkNoExist!=undefined){

                            // [POST] 判断邮箱是否存在
                            $http({
                              method:'POST',
                              url:$rootScope.app_config.api+'/api/Common/User/EmailIsUse',
                              data:{ Email:scope.datasBind }
                            }).success(function(rs){

                              console.log(rs);
                              // 判断该号 是否存在
                              if(scope.checkExist!=undefined){
                                if(rs.code=='40508'){
                                  $ionicPopup.alert({
                                    title: '提示', template: rs.msg + '(' + rs.code +')'
                                  });
                                }else{
                                  //Success
                                  scope.SendEmail();
                                }
                              }
                              // 判断该号 是否不存在
                              if(scope.checkNoExist!=undefined){
                                if(rs.code=='40506'){
                                  $ionicPopup.alert({
                                    title: '提示', template: rs.msg + '(' + rs.code +')'
                                  });
                                }else{
                                  //Success
                                  scope.SendEmail();
                                }
                              }

                            });

                          }else{
                            // [POST] 发送邮件验证码
                            scope.SendEmail();
                          }

                        }
                    }
                    
                }
            }

        }
    }
})

// [图片] 懒加载 LazySrc
.directive('lazyContainer', [
  function(){
    var uid = 0;
    function getUid(el){
        var __uid = el.data("__uid");
        if (! __uid) {
            el.data("__uid", (__uid = '' + ++uid));
        }
        return __uid;
    }

    return {
      restrict: 'EA',
      controller: ['$scope', '$element', function($scope, $element){
        var elements = {};
        function onLoad(){
          var $el = angular.element(this);
          var uid = getUid($el);

          $el.css('opacity', 1);

          if(elements.hasOwnProperty(uid)){
            delete elements[uid];
          }
        }

        function isVisible(elem){
          var containerRect = $element[0].getBoundingClientRect();
          var elemRect = elem[0].getBoundingClientRect();
          var xVisible, yVisible;
          var offset = 50;

          if(elemRect.bottom + offset >= containerRect.top &&
              elemRect.top - offset <= containerRect.bottom){
            yVisible = true;
          }

          if(elemRect.right + offset >= containerRect.left &&
            elemRect.left - offset <= containerRect.right){
            xVisible = true;
          }

          return xVisible&&yVisible;
        }

        function checkImage(){
          Object.keys(elements).forEach(function(uid){
            var obj = elements[uid],
                iElement = obj.iElement,
                iScope = obj.iScope;
            if(isVisible(iElement)){
                iElement.attr('src', iScope.lazySrc);
            }
          });
        }

        this.addImg = function(iScope, iElement, iAttrs){
          iElement.bind('load', onLoad);
          iScope.$watch('lazySrc', function(){
            var speed = "1s";
            if (iScope.animateSpeed != null) {
                speed = iScope.animateSpeed;
            }
            if(isVisible(iElement)){
              if (iScope.animateVisible) {
                iElement.css({
                    'background-color': '#fff',
                    'opacity': 0,
                    // '-webkit-transition': 'opacity ' + speed,
                    // 'transition': 'opacity ' + speed
                });
              }
              iElement.attr('src', iScope.lazySrc);
            }else{
              var uid = getUid(iElement);
              iElement.css({
                  'background-color': '#fff',
                  'opacity': 0,
                  // '-webkit-transition': 'opacity ' + speed,
                  // 'transition': 'opacity ' + speed
              });
              elements[uid] = {
                iElement: iElement,
                iScope: iScope
              };
            }
          });
          iScope.$on('$destroy', function(){
              iElement.unbind('load');
              var uid = getUid(iElement);
              if(elements.hasOwnProperty(uid)){
                  delete elements[uid];
              }
          });
        };

        $element.bind('scroll', checkImage);
        $element.bind('resize', checkImage);
      }]
    };
  }
])
.directive('lazySrc', [
  function(){
    return {
      restrict: 'A',
      require: '^lazyContainer',
      scope: {
        lazySrc: '@',
        animateVisible: '@',
        animateSpeed: '@'
      },
      link: function(iScope, iElement, iAttrs, containerCtrl){
        containerCtrl.addImg(iScope, iElement, iAttrs);
      }
    };
  }
])


// [图片] 裁剪 img-crop
.factory("cropAreaCircle", ["cropArea",
function(e) {
    var t = function() {
        e.apply(this, arguments),
        this._boxResizeBaseSize = 20,
        this._boxResizeNormalRatio = .9,
        this._boxResizeHoverRatio = 1.2,
        this._iconMoveNormalRatio = .9,
        this._iconMoveHoverRatio = 1.2,
        this._boxResizeNormalSize = this._boxResizeBaseSize * this._boxResizeNormalRatio,
        this._boxResizeHoverSize = this._boxResizeBaseSize * this._boxResizeHoverRatio,
        this._posDragStartX = 0,
        this._posDragStartY = 0,
        this._posResizeStartX = 0,
        this._posResizeStartY = 0,
        this._posResizeStartSize = 0,
        this._boxResizeIsHover = !1,
        this._areaIsHover = !1,
        this._boxResizeIsDragging = !1,
        this._areaIsDragging = !1
    };
    return t.prototype = new e,
    t.prototype._calcCirclePerimeterCoords = function(e) {
        var t = this._size / 2,
        i = e * (Math.PI / 180),
        r = this._x + t * Math.cos(i),
        s = this._y + t * Math.sin(i);
        return [r, s]
    },
    t.prototype._calcResizeIconCenterCoords = function() {
        return this._calcCirclePerimeterCoords( - 45)
    },
    t.prototype._isCoordWithinArea = function(e) {
        return Math.sqrt((e[0] - this._x) * (e[0] - this._x) + (e[1] - this._y) * (e[1] - this._y)) < this._size / 2
    },
    t.prototype._isCoordWithinBoxResize = function(e) {
        var t = this._calcResizeIconCenterCoords(),
        i = this._boxResizeHoverSize / 2;
        return e[0] > t[0] - i && e[0] < t[0] + i && e[1] > t[1] - i && e[1] < t[1] + i
    },
    t.prototype._drawArea = function(e, t, i) {
        e.arc(t[0], t[1], i / 2, 0, 2 * Math.PI)
    },
    t.prototype.draw = function() {
        e.prototype.draw.apply(this, arguments),
        this._cropCanvas.drawIconMove([this._x, this._y], this._areaIsHover ? this._iconMoveHoverRatio: this._iconMoveNormalRatio),
        this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(), this._boxResizeBaseSize, this._boxResizeIsHover ? this._boxResizeHoverRatio: this._boxResizeNormalRatio)
    },
    t.prototype.processMouseMove = function(e, t) {
        var i = "default",
        r = !1;
        if (this._boxResizeIsHover = !1, this._areaIsHover = !1, this._areaIsDragging) this._x = e - this._posDragStartX,
        this._y = t - this._posDragStartY,
        this._areaIsHover = !0,
        i = "move",
        r = !0,
        this._events.trigger("area-move");
        else if (this._boxResizeIsDragging) {
            i = "nesw-resize";
            var s, o, a;
            o = e - this._posResizeStartX,
            a = this._posResizeStartY - t,
            s = o > a ? this._posResizeStartSize + 2 * a: this._posResizeStartSize + 2 * o,
            this._size = Math.max(this._minSize, s),
            this._boxResizeIsHover = !0,
            r = !0,
            this._events.trigger("area-resize")
        } else this._isCoordWithinBoxResize([e, t]) ? (i = "nesw-resize", this._areaIsHover = !1, this._boxResizeIsHover = !0, r = !0) : this._isCoordWithinArea([e, t]) && (i = "move", this._areaIsHover = !0, r = !0);
        return this._dontDragOutside(),
        angular.element(this._ctx.canvas).css({
            cursor: i
        }),
        r
    },
    t.prototype.processMouseDown = function(e, t) {
        this._isCoordWithinBoxResize([e, t]) ? (this._areaIsDragging = !1, this._areaIsHover = !1, this._boxResizeIsDragging = !0, this._boxResizeIsHover = !0, this._posResizeStartX = e, this._posResizeStartY = t, this._posResizeStartSize = this._size, this._events.trigger("area-resize-start")) : this._isCoordWithinArea([e, t]) && (this._areaIsDragging = !0, this._areaIsHover = !0, this._boxResizeIsDragging = !1, this._boxResizeIsHover = !1, this._posDragStartX = e - this._x, this._posDragStartY = t - this._y, this._events.trigger("area-move-start"))
    },
    t.prototype.processMouseUp = function() {
        this._areaIsDragging && (this._areaIsDragging = !1, this._events.trigger("area-move-end")),
        this._boxResizeIsDragging && (this._boxResizeIsDragging = !1, this._events.trigger("area-resize-end")),
        this._areaIsHover = !1,
        this._boxResizeIsHover = !1,
        this._posDragStartX = 0,
        this._posDragStartY = 0
    },
    t
}])
.factory("cropAreaSquare", ["cropArea",
function(e) {
    var t = function() {
        e.apply(this, arguments),
        this._resizeCtrlBaseRadius = 10,
        this._resizeCtrlNormalRatio = .75,
        this._resizeCtrlHoverRatio = 1,
        this._iconMoveNormalRatio = .9,
        this._iconMoveHoverRatio = 1.2,
        this._resizeCtrlNormalRadius = this._resizeCtrlBaseRadius * this._resizeCtrlNormalRatio,
        this._resizeCtrlHoverRadius = this._resizeCtrlBaseRadius * this._resizeCtrlHoverRatio,
        this._posDragStartX = 0,
        this._posDragStartY = 0,
        this._posResizeStartX = 0,
        this._posResizeStartY = 0,
        this._posResizeStartSize = 0,
        this._resizeCtrlIsHover = -1,
        this._areaIsHover = !1,
        this._resizeCtrlIsDragging = -1,
        this._areaIsDragging = !1
    };
    return t.prototype = new e,
    t.prototype._calcSquareCorners = function() {
        var e = this._size / 2;
        return [[this._x - e, this._y - e], [this._x + e, this._y - e], [this._x - e, this._y + e], [this._x + e, this._y + e]]
    },
    t.prototype._calcSquareDimensions = function() {
        var e = this._size / 2;
        return {
            left: this._x - e,
            top: this._y - e,
            right: this._x + e,
            bottom: this._y + e
        }
    },
    t.prototype._isCoordWithinArea = function(e) {
        var t = this._calcSquareDimensions();
        return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom
    },
    t.prototype._isCoordWithinResizeCtrl = function(e) {
        for (var t = this._calcSquareCorners(), i = -1, r = 0, s = t.length; s > r; r++) {
            var o = t[r];
            if (e[0] > o[0] - this._resizeCtrlHoverRadius && e[0] < o[0] + this._resizeCtrlHoverRadius && e[1] > o[1] - this._resizeCtrlHoverRadius && e[1] < o[1] + this._resizeCtrlHoverRadius) {
                i = r;
                break
            }
        }
        return i
    },
    t.prototype._drawArea = function(e, t, i) {
        var r = i / 2;
        e.rect(t[0] - r, t[1] - r, i, i)
    },
    t.prototype.draw = function() {
        e.prototype.draw.apply(this, arguments),
        this._cropCanvas.drawIconMove([this._x, this._y], this._areaIsHover ? this._iconMoveHoverRatio: this._iconMoveNormalRatio);
        for (var t = this._calcSquareCorners(), i = 0, r = t.length; r > i; i++) {
            var s = t[i];
            this._cropCanvas.drawIconResizeCircle(s, this._resizeCtrlBaseRadius, this._resizeCtrlIsHover === i ? this._resizeCtrlHoverRatio: this._resizeCtrlNormalRatio)
        }
    },
    t.prototype.processMouseMove = function(e, t) {
        var i = "default",
        r = !1;
        if (this._resizeCtrlIsHover = -1, this._areaIsHover = !1, this._areaIsDragging) this._x = e - this._posDragStartX,
        this._y = t - this._posDragStartY,
        this._areaIsHover = !0,
        i = "move",
        r = !0,
        this._events.trigger("area-move");
        else if (this._resizeCtrlIsDragging > -1) {
            var s, o;
            switch (this._resizeCtrlIsDragging) {
            case 0:
                s = -1,
                o = -1,
                i = "nwse-resize";
                break;
            case 1:
                s = 1,
                o = -1,
                i = "nesw-resize";
                break;
            case 2:
                s = -1,
                o = 1,
                i = "nesw-resize";
                break;
            case 3:
                s = 1,
                o = 1,
                i = "nwse-resize"
            }
            var a, n = (e - this._posResizeStartX) * s,
            h = (t - this._posResizeStartY) * o;
            a = n > h ? this._posResizeStartSize + h: this._posResizeStartSize + n;
            var c = this._size;
            this._size = Math.max(this._minSize, a);
            var l = (this._size - c) / 2;
            this._x += l * s,
            this._y += l * o,
            this._resizeCtrlIsHover = this._resizeCtrlIsDragging,
            r = !0,
            this._events.trigger("area-resize")
        } else {
            var u = this._isCoordWithinResizeCtrl([e, t]);
            if (u > -1) {
                switch (u) {
                case 0:
                    i = "nwse-resize";
                    break;
                case 1:
                    i = "nesw-resize";
                    break;
                case 2:
                    i = "nesw-resize";
                    break;
                case 3:
                    i = "nwse-resize"
                }
                this._areaIsHover = !1,
                this._resizeCtrlIsHover = u,
                r = !0
            } else this._isCoordWithinArea([e, t]) && (i = "move", this._areaIsHover = !0, r = !0)
        }
        return this._dontDragOutside(),
        angular.element(this._ctx.canvas).css({
            cursor: i
        }),
        r
    },
    t.prototype.processMouseDown = function(e, t) {
        var i = this._isCoordWithinResizeCtrl([e, t]);
        i > -1 ? (this._areaIsDragging = !1, this._areaIsHover = !1, this._resizeCtrlIsDragging = i, this._resizeCtrlIsHover = i, this._posResizeStartX = e, this._posResizeStartY = t, this._posResizeStartSize = this._size, this._events.trigger("area-resize-start")) : this._isCoordWithinArea([e, t]) && (this._areaIsDragging = !0, this._areaIsHover = !0, this._resizeCtrlIsDragging = -1, this._resizeCtrlIsHover = -1, this._posDragStartX = e - this._x, this._posDragStartY = t - this._y, this._events.trigger("area-move-start"))
    },
    t.prototype.processMouseUp = function() {
        this._areaIsDragging && (this._areaIsDragging = !1, this._events.trigger("area-move-end")),
        this._resizeCtrlIsDragging > -1 && (this._resizeCtrlIsDragging = -1, this._events.trigger("area-resize-end")),
        this._areaIsHover = !1,
        this._resizeCtrlIsHover = -1,
        this._posDragStartX = 0,
        this._posDragStartY = 0
    },
    t
}])
.factory("cropArea", ["cropCanvas",
function(e) {
    var t = function(t, i) {
        this._ctx = t,
        this._events = i,
        this._minSize = 80,
        this._cropCanvas = new e(t),
        this._image = new Image,
        this._x = 0,
        this._y = 0,
        this._size = 200
    };
    return t.prototype.getImage = function() {
        return this._image
    },
    t.prototype.setImage = function(e) {
        this._image = e
    },
    t.prototype.getX = function() {
        return this._x
    },
    t.prototype.setX = function(e) {
        this._x = e,
        this._dontDragOutside()
    },
    t.prototype.getY = function() {
        return this._y
    },
    t.prototype.setY = function(e) {
        this._y = e,
        this._dontDragOutside()
    },
    t.prototype.getSize = function() {
        return this._size
    },
    t.prototype.setSize = function(e) {
        this._size = Math.max(this._minSize, e),
        this._dontDragOutside()
    },
    t.prototype.getMinSize = function() {
        return this._minSize
    },
    t.prototype.setMinSize = function(e) {
        this._minSize = e,
        this._size = Math.max(this._minSize, this._size),
        this._dontDragOutside()
    },
    t.prototype._dontDragOutside = function() {
        var e = this._ctx.canvas.height,
        t = this._ctx.canvas.width;
        this._size > t && (this._size = t),
        this._size > e && (this._size = e),
        this._x < this._size / 2 && (this._x = this._size / 2),
        this._x > t - this._size / 2 && (this._x = t - this._size / 2),
        this._y < this._size / 2 && (this._y = this._size / 2),
        this._y > e - this._size / 2 && (this._y = e - this._size / 2)
    },
    t.prototype._drawArea = function() {},
    t.prototype.draw = function() {
        this._cropCanvas.drawCropArea(this._image, [this._x, this._y], this._size, this._drawArea)
    },
    t.prototype.processMouseMove = function() {},
    t.prototype.processMouseDown = function() {},
    t.prototype.processMouseUp = function() {},
    t
}])
.factory("cropCanvas", [function() {
    var e = [[ - .5, -2], [ - 3, -4.5], [ - .5, -7], [ - 7, -7], [ - 7, -.5], [ - 4.5, -3], [ - 2, -.5]],
    t = [[.5, -2], [3, -4.5], [.5, -7], [7, -7], [7, -.5], [4.5, -3], [2, -.5]],
    i = [[ - .5, 2], [ - 3, 4.5], [ - .5, 7], [ - 7, 7], [ - 7, .5], [ - 4.5, 3], [ - 2, .5]],
    r = [[.5, 2], [3, 4.5], [.5, 7], [7, 7], [7, .5], [4.5, 3], [2, .5]],
    s = [[ - 1.5, -2.5], [ - 1.5, -6], [ - 5, -6], [0, -11], [5, -6], [1.5, -6], [1.5, -2.5]],
    o = [[ - 2.5, -1.5], [ - 6, -1.5], [ - 6, -5], [ - 11, 0], [ - 6, 5], [ - 6, 1.5], [ - 2.5, 1.5]],
    a = [[ - 1.5, 2.5], [ - 1.5, 6], [ - 5, 6], [0, 11], [5, 6], [1.5, 6], [1.5, 2.5]],
    n = [[2.5, -1.5], [6, -1.5], [6, -5], [11, 0], [6, 5], [6, 1.5], [2.5, 1.5]],
    h = {
        areaOutline: "#fff",
        resizeBoxStroke: "#fff",
        resizeBoxFill: "#444",
        resizeBoxArrowFill: "#fff",
        resizeCircleStroke: "#fff",
        resizeCircleFill: "#444",
        moveIconFill: "#fff"
    };
    return function(c) {
        var l = function(e, t, i) {
            return [i * e[0] + t[0], i * e[1] + t[1]]
        },
        u = function(e, t, i, r) {
            c.save(),
            c.fillStyle = t,
            c.beginPath();
            var s, o = l(e[0], i, r);
            c.moveTo(o[0], o[1]);
            for (var a in e) a > 0 && (s = l(e[a], i, r), c.lineTo(s[0], s[1]));
            c.lineTo(o[0], o[1]),
            c.fill(),
            c.closePath(),
            c.restore()
        };
        this.drawIconMove = function(e, t) {
            u(s, h.moveIconFill, e, t),
            u(o, h.moveIconFill, e, t),
            u(a, h.moveIconFill, e, t),
            u(n, h.moveIconFill, e, t)
        },
        this.drawIconResizeCircle = function(e, t, i) {
            var r = t * i;
            c.save(),
            c.strokeStyle = h.resizeCircleStroke,
            c.lineWidth = 2,
            c.fillStyle = h.resizeCircleFill,
            c.beginPath(),
            c.arc(e[0], e[1], r, 0, 2 * Math.PI),
            c.fill(),
            c.stroke(),
            c.closePath(),
            c.restore()
        },
        this.drawIconResizeBoxBase = function(e, t, i) {
            var r = t * i;
            c.save(),
            c.strokeStyle = h.resizeBoxStroke,
            c.lineWidth = 2,
            c.fillStyle = h.resizeBoxFill,
            c.fillRect(e[0] - r / 2, e[1] - r / 2, r, r),
            c.strokeRect(e[0] - r / 2, e[1] - r / 2, r, r),
            c.restore()
        },
        this.drawIconResizeBoxNESW = function(e, r, s) {
            this.drawIconResizeBoxBase(e, r, s),
            u(t, h.resizeBoxArrowFill, e, s),
            u(i, h.resizeBoxArrowFill, e, s)
        },
        this.drawIconResizeBoxNWSE = function(t, i, s) {
            this.drawIconResizeBoxBase(t, i, s),
            u(e, h.resizeBoxArrowFill, t, s),
            u(r, h.resizeBoxArrowFill, t, s)
        },
        this.drawCropArea = function(e, t, i, r) {
            var s = e.width / c.canvas.width,
            o = e.height / c.canvas.height,
            a = t[0] - i / 2,
            n = t[1] - i / 2;
            c.save(),
            c.strokeStyle = h.areaOutline,
            c.lineWidth = 2,
            c.beginPath(),
            r(c, t, i),
            c.stroke(),
            c.clip(),
            i > 0 && c.drawImage(e, a * s, n * o, i * s, i * o, a, n, i, i),
            c.beginPath(),
            r(c, t, i),
            c.stroke(),
            c.clip(),
            c.restore()
        }
    }
}])
.service("cropEXIF", [function() {
    function e(e) {
        return !! e.exifdata
    }
    function t(e, t) {
        t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "",
        e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
        for (var i = atob(e), r = i.length, s = new ArrayBuffer(r), o = new Uint8Array(s), a = 0; r > a; a++) o[a] = i.charCodeAt(a);
        return s
    }
    function i(e, t) {
        var i = new XMLHttpRequest;
        i.open("GET", e, !0),
        i.responseType = "blob",
        i.onload = function() { (200 == this.status || 0 === this.status) && t(this.response)
        },
        i.send()
    }
    function r(e, r) {
        function a(t) {
            var i = s(t),
            a = o(t);
            e.exifdata = i || {},
            e.iptcdata = a || {},
            r && r.call(e)
        }
        if (e.src) if (/^data\:/i.test(e.src)) {
            var n = t(e.src);
            a(n)
        } else if (/^blob\:/i.test(e.src)) {
            var h = new FileReader;
            h.onload = function(e) {
                a(e.target.result)
            },
            i(e.src,
            function(e) {
                h.readAsArrayBuffer(e)
            })
        } else {
            var c = new XMLHttpRequest;
            c.onload = function() {
                if (200 != this.status && 0 !== this.status) throw "Could not load image";
                a(c.response),
                c = null
            },
            c.open("GET", e.src, !0),
            c.responseType = "arraybuffer",
            c.send(null)
        } else if (window.FileReader && (e instanceof window.Blob || e instanceof window.File)) {
            var h = new FileReader;
            h.onload = function(e) {
                u && console.log("Got file of length " + e.target.result.byteLength),
                a(e.target.result)
            },
            h.readAsArrayBuffer(e)
        }
    }
    function s(e) {
        var t = new DataView(e);
        if (u && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return u && console.log("Not a valid JPEG"),
        !1;
        for (var i, r = 2,
        s = e.byteLength; s > r;) {
            if (255 != t.getUint8(r)) return u && console.log("Not a valid marker at offset " + r + ", found: " + t.getUint8(r)),
            !1;
            if (i = t.getUint8(r + 1), u && console.log(i), 225 == i) return u && console.log("Found 0xFFE1 marker"),
            l(t, r + 4, t.getUint16(r + 2) - 2);
            r += 2 + t.getUint16(r + 2)
        }
    }
    function o(e) {
        var t = new DataView(e);
        if (u && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return u && console.log("Not a valid JPEG"),
        !1;
        for (var i = 2,
        r = e.byteLength,
        s = function(e, t) {
            return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
        }; r > i;) {
            if (s(t, i)) {
                var o = t.getUint8(i + 7);
                o % 2 !== 0 && (o += 1),
                0 === o && (o = 4);
                var n = i + 8 + o,
                h = t.getUint16(i + 6 + o);
                return a(e, n, h)
            }
            i++
        }
    }
    function a(e, t, i) {
        for (var r, s, o, a, n, h = new DataView(e), l = {},
        u = t; t + i > u;) 28 === h.getUint8(u) && 2 === h.getUint8(u + 1) && (a = h.getUint8(u + 2), a in _ && (o = h.getInt16(u + 3), n = o + 5, s = _[a], r = c(h, u + 5, o), l.hasOwnProperty(s) ? l[s] instanceof Array ? l[s].push(r) : l[s] = [l[s], r] : l[s] = r)),
        u++;
        return l
    }
    function n(e, t, i, r, s) {
        var o, a, n, c = e.getUint16(i, !s),
        l = {};
        for (n = 0; c > n; n++) o = i + 12 * n + 2,
        a = r[e.getUint16(o, !s)],
        !a && u && console.log("Unknown tag: " + e.getUint16(o, !s)),
        l[a] = h(e, o, t, i, s);
        return l
    }
    function h(e, t, i, r, s) {
        var o, a, n, h, l, u, g = e.getUint16(t + 2, !s),
        d = e.getUint32(t + 4, !s),
        f = e.getUint32(t + 8, !s) + i;
        switch (g) {
        case 1:
        case 7:
            if (1 == d) return e.getUint8(t + 8, !s);
            for (o = d > 4 ? f: t + 8, a = [], h = 0; d > h; h++) a[h] = e.getUint8(o + h);
            return a;
        case 2:
            return o = d > 4 ? f: t + 8,
            c(e, o, d - 1);
        case 3:
            if (1 == d) return e.getUint16(t + 8, !s);
            for (o = d > 2 ? f: t + 8, a = [], h = 0; d > h; h++) a[h] = e.getUint16(o + 2 * h, !s);
            return a;
        case 4:
            if (1 == d) return e.getUint32(t + 8, !s);
            for (a = [], h = 0; d > h; h++) a[h] = e.getUint32(f + 4 * h, !s);
            return a;
        case 5:
            if (1 == d) return l = e.getUint32(f, !s),
            u = e.getUint32(f + 4, !s),
            n = new Number(l / u),
            n.numerator = l,
            n.denominator = u,
            n;
            for (a = [], h = 0; d > h; h++) l = e.getUint32(f + 8 * h, !s),
            u = e.getUint32(f + 4 + 8 * h, !s),
            a[h] = new Number(l / u),
            a[h].numerator = l,
            a[h].denominator = u;
            return a;
        case 9:
            if (1 == d) return e.getInt32(t + 8, !s);
            for (a = [], h = 0; d > h; h++) a[h] = e.getInt32(f + 4 * h, !s);
            return a;
        case 10:
            if (1 == d) return e.getInt32(f, !s) / e.getInt32(f + 4, !s);
            for (a = [], h = 0; d > h; h++) a[h] = e.getInt32(f + 8 * h, !s) / e.getInt32(f + 4 + 8 * h, !s);
            return a
        }
    }
    function c(e, t, i) {
        for (var r = "",
        s = t; t + i > s; s++) r += String.fromCharCode(e.getUint8(s));
        return r
    }
    function l(e, t) {
        if ("Exif" != c(e, t, 4)) return u && console.log("Not valid EXIF data! " + c(e, t, 4)),
        !1;
        var i, r, s, o, a, h = t + 6;
        if (18761 == e.getUint16(h)) i = !1;
        else {
            if (19789 != e.getUint16(h)) return u && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),
            !1;
            i = !0
        }
        if (42 != e.getUint16(h + 2, !i)) return u && console.log("Not valid TIFF data! (no 0x002A)"),
        !1;
        var l = e.getUint32(h + 4, !i);
        if (8 > l) return u && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(h + 4, !i)),
        !1;
        if (r = n(e, h, h + l, d, i), r.ExifIFDPointer) {
            o = n(e, h, h + r.ExifIFDPointer, g, i);
            for (s in o) {
                switch (s) {
                case "LightSource":
                case "Flash":
                case "MeteringMode":
                case "ExposureProgram":
                case "SensingMethod":
                case "SceneCaptureType":
                case "SceneType":
                case "CustomRendered":
                case "WhiteBalance":
                case "GainControl":
                case "Contrast":
                case "Saturation":
                case "Sharpness":
                case "SubjectDistanceRange":
                case "FileSource":
                    o[s] = p[s][o[s]];
                    break;
                case "ExifVersion":
                case "FlashpixVersion":
                    o[s] = String.fromCharCode(o[s][0], o[s][1], o[s][2], o[s][3]);
                    break;
                case "ComponentsConfiguration":
                    o[s] = p.Components[o[s][0]] + p.Components[o[s][1]] + p.Components[o[s][2]] + p.Components[o[s][3]]
                }
                r[s] = o[s]
            }
        }
        if (r.GPSInfoIFDPointer) {
            a = n(e, h, h + r.GPSInfoIFDPointer, f, i);
            for (s in a) {
                switch (s) {
                case "GPSVersionID":
                    a[s] = a[s][0] + "." + a[s][1] + "." + a[s][2] + "." + a[s][3]
                }
                r[s] = a[s]
            }
        }
        return r
    }
    var u = !1,
    g = this.Tags = {
        36864 : "ExifVersion",
        40960 : "FlashpixVersion",
        40961 : "ColorSpace",
        40962 : "PixelXDimension",
        40963 : "PixelYDimension",
        37121 : "ComponentsConfiguration",
        37122 : "CompressedBitsPerPixel",
        37500 : "MakerNote",
        37510 : "UserComment",
        40964 : "RelatedSoundFile",
        36867 : "DateTimeOriginal",
        36868 : "DateTimeDigitized",
        37520 : "SubsecTime",
        37521 : "SubsecTimeOriginal",
        37522 : "SubsecTimeDigitized",
        33434 : "ExposureTime",
        33437 : "FNumber",
        34850 : "ExposureProgram",
        34852 : "SpectralSensitivity",
        34855 : "ISOSpeedRatings",
        34856 : "OECF",
        37377 : "ShutterSpeedValue",
        37378 : "ApertureValue",
        37379 : "BrightnessValue",
        37380 : "ExposureBias",
        37381 : "MaxApertureValue",
        37382 : "SubjectDistance",
        37383 : "MeteringMode",
        37384 : "LightSource",
        37385 : "Flash",
        37396 : "SubjectArea",
        37386 : "FocalLength",
        41483 : "FlashEnergy",
        41484 : "SpatialFrequencyResponse",
        41486 : "FocalPlaneXResolution",
        41487 : "FocalPlaneYResolution",
        41488 : "FocalPlaneResolutionUnit",
        41492 : "SubjectLocation",
        41493 : "ExposureIndex",
        41495 : "SensingMethod",
        41728 : "FileSource",
        41729 : "SceneType",
        41730 : "CFAPattern",
        41985 : "CustomRendered",
        41986 : "ExposureMode",
        41987 : "WhiteBalance",
        41988 : "DigitalZoomRation",
        41989 : "FocalLengthIn35mmFilm",
        41990 : "SceneCaptureType",
        41991 : "GainControl",
        41992 : "Contrast",
        41993 : "Saturation",
        41994 : "Sharpness",
        41995 : "DeviceSettingDescription",
        41996 : "SubjectDistanceRange",
        40965 : "InteroperabilityIFDPointer",
        42016 : "ImageUniqueID"
    },
    d = this.TiffTags = {
        256 : "ImageWidth",
        257 : "ImageHeight",
        34665 : "ExifIFDPointer",
        34853 : "GPSInfoIFDPointer",
        40965 : "InteroperabilityIFDPointer",
        258 : "BitsPerSample",
        259 : "Compression",
        262 : "PhotometricInterpretation",
        274 : "Orientation",
        277 : "SamplesPerPixel",
        284 : "PlanarConfiguration",
        530 : "YCbCrSubSampling",
        531 : "YCbCrPositioning",
        282 : "XResolution",
        283 : "YResolution",
        296 : "ResolutionUnit",
        273 : "StripOffsets",
        278 : "RowsPerStrip",
        279 : "StripByteCounts",
        513 : "JPEGInterchangeFormat",
        514 : "JPEGInterchangeFormatLength",
        301 : "TransferFunction",
        318 : "WhitePoint",
        319 : "PrimaryChromaticities",
        529 : "YCbCrCoefficients",
        532 : "ReferenceBlackWhite",
        306 : "DateTime",
        270 : "ImageDescription",
        271 : "Make",
        272 : "Model",
        305 : "Software",
        315 : "Artist",
        33432 : "Copyright"
    },
    f = this.GPSTags = {
        0 : "GPSVersionID",
        1 : "GPSLatitudeRef",
        2 : "GPSLatitude",
        3 : "GPSLongitudeRef",
        4 : "GPSLongitude",
        5 : "GPSAltitudeRef",
        6 : "GPSAltitude",
        7 : "GPSTimeStamp",
        8 : "GPSSatellites",
        9 : "GPSStatus",
        10 : "GPSMeasureMode",
        11 : "GPSDOP",
        12 : "GPSSpeedRef",
        13 : "GPSSpeed",
        14 : "GPSTrackRef",
        15 : "GPSTrack",
        16 : "GPSImgDirectionRef",
        17 : "GPSImgDirection",
        18 : "GPSMapDatum",
        19 : "GPSDestLatitudeRef",
        20 : "GPSDestLatitude",
        21 : "GPSDestLongitudeRef",
        22 : "GPSDestLongitude",
        23 : "GPSDestBearingRef",
        24 : "GPSDestBearing",
        25 : "GPSDestDistanceRef",
        26 : "GPSDestDistance",
        27 : "GPSProcessingMethod",
        28 : "GPSAreaInformation",
        29 : "GPSDateStamp",
        30 : "GPSDifferential"
    },
    p = this.StringValues = {
        ExposureProgram: {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode: {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource: {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash: {
            0 : "Flash did not fire",
            1 : "Flash fired",
            5 : "Strobe return light not detected",
            7 : "Strobe return light detected",
            9 : "Flash fired, compulsory flash mode",
            13 : "Flash fired, compulsory flash mode, return light not detected",
            15 : "Flash fired, compulsory flash mode, return light detected",
            16 : "Flash did not fire, compulsory flash mode",
            24 : "Flash did not fire, auto mode",
            25 : "Flash fired, auto mode",
            29 : "Flash fired, auto mode, return light not detected",
            31 : "Flash fired, auto mode, return light detected",
            32 : "No flash function",
            65 : "Flash fired, red-eye reduction mode",
            69 : "Flash fired, red-eye reduction mode, return light not detected",
            71 : "Flash fired, red-eye reduction mode, return light detected",
            73 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            77 : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79 : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89 : "Flash fired, auto mode, red-eye reduction mode",
            93 : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95 : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType: {
            1 : "Directly photographed"
        },
        CustomRendered: {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance: {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl: {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast: {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation: {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness: {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange: {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource: {
            3 : "DSC"
        },
        Components: {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    },
    _ = {
        120 : "caption",
        110 : "credit",
        25 : "keywords",
        55 : "dateCreated",
        80 : "byline",
        85 : "bylineTitle",
        122 : "captionWriter",
        105 : "headline",
        116 : "copyright",
        15 : "category"
    };
    this.getData = function(t, i) {
        return (t instanceof Image || t instanceof HTMLImageElement) && !t.complete ? !1 : (e(t) ? i && i.call(t) : r(t, i), !0)
    },
    this.getTag = function(t, i) {
        return e(t) ? t.exifdata[i] : void 0
    },
    this.getAllTags = function(t) {
        if (!e(t)) return {};
        var i, r = t.exifdata,
        s = {};
        for (i in r) r.hasOwnProperty(i) && (s[i] = r[i]);
        return s
    },
    this.pretty = function(t) {
        if (!e(t)) return "";
        var i, r = t.exifdata,
        s = "";
        for (i in r) r.hasOwnProperty(i) && (s += "object" == typeof r[i] ? r[i] instanceof Number ? i + " : " + r[i] + " [" + r[i].numerator + "/" + r[i].denominator + "]\r\n": i + " : [" + r[i].length + " values]\r\n": i + " : " + r[i] + "\r\n");
        return s
    },
    this.readFromBinaryFile = function(e) {
        return s(e)
    }
}])
.factory("cropHost", ["$document", "cropAreaCircle", "cropAreaSquare", "cropEXIF",
function(e, t, i, r) {
    var s = function(e) {
        var t = e.getBoundingClientRect(),
        i = document.body,
        r = document.documentElement,
        s = window.pageYOffset || r.scrollTop || i.scrollTop,
        o = window.pageXOffset || r.scrollLeft || i.scrollLeft,
        a = r.clientTop || i.clientTop || 0,
        n = r.clientLeft || i.clientLeft || 0,
        h = t.top + s - a,
        c = t.left + o - n;
        return {
            top: Math.round(h),
            left: Math.round(c)
        }
    };
    return function(o, a, n) {
        function h() {
            c.clearRect(0, 0, c.canvas.width, c.canvas.height),
            null !== l && (c.drawImage(l, 0, 0, c.canvas.width, c.canvas.height), c.save(), c.fillStyle = "rgba(0, 0, 0, 0.65)", c.fillRect(0, 0, c.canvas.width, c.canvas.height), c.restore(), u.draw())
        }
        var c = null,
        l = null,
        u = null,
        g = [100, 100],
        d = [300, 300],
        f = 200,
        p = "image/png",
        _ = null,
        m = function() {
            if (null !== l) {
                u.setImage(l);
                var e = [l.width, l.height],
                t = l.width / l.height,
                i = e;
                i[0] > d[0] ? (i[0] = d[0], i[1] = i[0] / t) : i[0] < g[0] && (i[0] = g[0], i[1] = i[0] / t),
                i[1] > d[1] ? (i[1] = d[1], i[0] = i[1] * t) : i[1] < g[1] && (i[1] = g[1], i[0] = i[1] * t),
                o.prop("width", i[0]).prop("height", i[1]).css({
                    "margin-left": -i[0] / 2 + "px",
                    "margin-top": -i[1] / 2 + "px"
                }),
                u.setX(c.canvas.width / 2),
                u.setY(c.canvas.height / 2),
                u.setSize(Math.min(200, c.canvas.width / 2, c.canvas.height / 2))
            } else o.prop("width", 0).prop("height", 0).css({
                "margin-top": 0
            });
            h()
        },
        v = function(e) {
            return angular.isDefined(e.changedTouches) ? e.changedTouches: e.originalEvent.changedTouches
        },
        S = function(e) {
            if (null !== l) {
                var t, i, r = s(c.canvas);
                "touchmove" === e.type ? (t = v(e)[0].pageX, i = v(e)[0].pageY) : (t = e.pageX, i = e.pageY),
                u.processMouseMove(t - r.left, i - r.top),
                h()
            }
        },
        z = function(e) {
            if (e.preventDefault(), e.stopPropagation(), null !== l) {
                var t, i, r = s(c.canvas);
                "touchstart" === e.type ? (t = v(e)[0].pageX, i = v(e)[0].pageY) : (t = e.pageX, i = e.pageY),
                u.processMouseDown(t - r.left, i - r.top),
                h()
            }
        },
        I = function(e) {
            if (null !== l) {
                var t, i, r = s(c.canvas);
                "touchend" === e.type ? (t = v(e)[0].pageX, i = v(e)[0].pageY) : (t = e.pageX, i = e.pageY),
                u.processMouseUp(t - r.left, i - r.top),
                h()
            }
        };
        this.getResultImageDataURI = function() {
            var e, t;
            return t = angular.element("<canvas></canvas>")[0],
            e = t.getContext("2d"),
            t.width = f,
            t.height = f,
            null !== l && e.drawImage(l, (u.getX() - u.getSize() / 2) * (l.width / c.canvas.width), (u.getY() - u.getSize() / 2) * (l.height / c.canvas.height), u.getSize() * (l.width / c.canvas.width), u.getSize() * (l.height / c.canvas.height), 0, 0, f, f),
            null !== _ ? t.toDataURL(p, _) : t.toDataURL(p)
        },
        this.setNewImageSource = function(e) {
            if (l = null, m(), n.trigger("image-updated"), e) {
                var t = new Image;
                "http" === e.substring(0, 4).toLowerCase() && (t.crossOrigin = "anonymous"),
                t.onload = function() {
                    n.trigger("load-done"),
                    r.getData(t,
                    function() {
                        var e = r.getTag(t, "Orientation");
                        if ([3, 6, 8].indexOf(e) > -1) {
                            var i = document.createElement("canvas"),
                            s = i.getContext("2d"),
                            o = t.width,
                            a = t.height,
                            h = 0,
                            c = 0,
                            u = 0;
                            switch (e) {
                            case 3:
                                h = -t.width,
                                c = -t.height,
                                u = 180;
                                break;
                            case 6:
                                o = t.height,
                                a = t.width,
                                c = -t.height,
                                u = 90;
                                break;
                            case 8:
                                o = t.height,
                                a = t.width,
                                h = -t.width,
                                u = 270
                            }
                            i.width = o,
                            i.height = a,
                            s.rotate(u * Math.PI / 180),
                            s.drawImage(t, h, c),
                            l = new Image,
                            l.src = i.toDataURL("image/png")
                        } else l = t;
                        m(),
                        n.trigger("image-updated")
                    })
                },
                t.onerror = function() {
                    n.trigger("load-error")
                },
                n.trigger("load-start"),
                t.src = e
            }
        },
        this.setMaxDimensions = function(e, t) {
            if (d = [e, t], null !== l) {
                var i = c.canvas.width,
                r = c.canvas.height,
                s = [l.width, l.height],
                a = l.width / l.height,
                n = s;
                n[0] > d[0] ? (n[0] = d[0], n[1] = n[0] / a) : n[0] < g[0] && (n[0] = g[0], n[1] = n[0] / a),
                n[1] > d[1] ? (n[1] = d[1], n[0] = n[1] * a) : n[1] < g[1] && (n[1] = g[1], n[0] = n[1] * a),
                o.prop("width", n[0]).prop("height", n[1]).css({
                    "margin-left": -n[0] / 2 + "px",
                    "margin-top": -n[1] / 2 + "px"
                });
                var f = c.canvas.width / i,
                p = c.canvas.height / r,
                _ = Math.min(f, p);
                u.setX(u.getX() * f),
                u.setY(u.getY() * p),
                u.setSize(u.getSize() * _)
            } else o.prop("width", 0).prop("height", 0).css({
                "margin-top": 0
            });
            h()
        },
        this.setAreaMinSize = function(e) {
            e = parseInt(e, 10),
            isNaN(e) || (u.setMinSize(e), h())
        },
        this.setResultImageSize = function(e) {
            e = parseInt(e, 10),
            isNaN(e) || (f = e)
        },
        this.setResultImageFormat = function(e) {
            p = e
        },
        this.setResultImageQuality = function(e) {
            e = parseFloat(e),
            !isNaN(e) && e >= 0 && 1 >= e && (_ = e)
        },
        this.setAreaType = function(e) {
            var r = u.getSize(),
            s = u.getMinSize(),
            o = u.getX(),
            a = u.getY(),
            g = t;
            "square" === e && (g = i),
            u = new g(c, n),
            u.setMinSize(s),
            u.setSize(r),
            u.setX(o),
            u.setY(a),
            null !== l && u.setImage(l),
            h()
        },
        c = o[0].getContext("2d"),
        u = new t(c, n),
        e.on("mousemove", S),
        o.on("mousedown", z),
        e.on("mouseup", I),
        e.on("touchmove", S),
        o.on("touchstart", z),
        e.on("touchend", I),
        this.destroy = function() {
            e.off("mousemove", S),
            o.off("mousedown", z),
            e.off("mouseup", S),
            e.off("touchmove", S),
            o.off("touchstart", z),
            e.off("touchend", S),
            o.remove()
        }
    }
}])
.factory("cropPubSub", [function() {
    return function() {
        var e = {};
        this.on = function(t, i) {
            return t.split(" ").forEach(function(t) {
                e[t] || (e[t] = []),
                e[t].push(i)
            }),
            this
        },
        this.trigger = function(t, i) {
            return angular.forEach(e[t],
            function(e) {
                e.call(null, i)
            }),
            this
        }
    }
}])
.directive("imgCrop", ["$timeout", "cropHost", "cropPubSub",
  function(e, t, i) {
      return {
          restrict: "E",
          scope: {
              image: "=",
              resultImage: "=",
              changeOnFly: "=",
              areaType: "@",
              areaMinSize: "=",
              resultImageSize: "=",
              resultImageFormat: "@",
              resultImageQuality: "=",
              onChange: "&",
              onLoadBegin: "&",
              onLoadDone: "&",
              onLoadError: "&"
          },
          template: "<canvas></canvas>",
          controller: ["$scope",
          function(e) {
              e.events = new i
          }],
          link: function(i, r) {
              var s, o = i.events,
              a = new t(r.find("canvas"), {},
              o),
              n = function(e) {
                  var t = a.getResultImageDataURI();
                  s !== t && (s = t, angular.isDefined(e.resultImage) && (e.resultImage = t), e.onChange({
                      $dataURI: e.resultImage
                  }))
              },
              h = function(t) {
                  return function() {
                      e(function() {
                          i.$apply(function(e) {
                              t(e)
                          })
                      })
                  }
              };
              o.on("load-start", h(function(e) {
                  e.onLoadBegin({})
              })).on("load-done", h(function(e) {
                  e.onLoadDone({})
              })).on("load-error", h(function(e) {
                  e.onLoadError({})
              })).on("area-move area-resize", h(function(e) {
                  e.changeOnFly && n(e)
              })).on("area-move-end area-resize-end image-updated", h(function(e) {
                  n(e)
              })),
              i.$watch("image",
              function() {
                  a.setNewImageSource(i.image)
              }),
              i.$watch("areaType",
              function() {
                  a.setAreaType(i.areaType),
                  n(i)
              }),
              i.$watch("areaMinSize",
              function() {
                  a.setAreaMinSize(i.areaMinSize),
                  n(i)
              }),
              i.$watch("resultImageSize",
              function() {
                  a.setResultImageSize(i.resultImageSize),
                  n(i)
              }),
              i.$watch("resultImageFormat",
              function() {
                  a.setResultImageFormat(i.resultImageFormat),
                  n(i)
              }),
              i.$watch("resultImageQuality",
              function() {
                  a.setResultImageQuality(i.resultImageQuality),
                  n(i)
              }),
              i.$watch(function() {
                  return [r[0].clientWidth, r[0].clientHeight]
              },
              function(e) {
                  a.setMaxDimensions(e[0], e[1]),
                  n(i)
              },
              !0),
              i.$on("$destroy",
              function() {
                  a.destroy()
              })
          }
      }
  }
])
