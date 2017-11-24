// Public Function
function setCookie(name, value, seconds){
  seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
  var expires = "";
  if (seconds != 0 ) {      //设置cookie生存时间
  var date = new Date();
    // date.setTime(date.getTime()+(seconds*1000));
    var expireDate = new Date(); 
    expireDate.setDate(expireDate.getDate() + 3650);
    expires = "; expires=" + expireDate;
  }
  document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
}
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
// end Public Function

// ========================== 原生APP端调用方法 ==========================
// 原生 function 无法调用 Angular
// APP已登录 - 设置Web登录 - 跳转到 学历教育/我要报名
function setWebTokenAndApplyForm(token){
  // $cookies.put("Ticket", token, {'expires': mEvent.setExpireDate(), 'path': '/'});
  // $rootScope.showApplyForm();
  // alert('token: ' + token);
  if(token){
    setCookie('Ticket', token);
    window.location.href += '/add';
  }
}

// APP未登录 - 设置Web登录
function setWebToken(token){
  // alert('setWebToken');
  // $cookies.put("Ticket", token, {'expires': mEvent.setExpireDate(), 'path': '/'});
  if(token){
    setCookie('Ticket', token);
  }
}

// ========================== end 原生APP端调用方法 ==========================

function CommonFn($scope, $rootScope, $stateParams){
  $rootScope.entry = $stateParams.entry;
  $rootScope.headTitle = $stateParams.headTitle;

  if($rootScope.entry=='tab'){ $rootScope.entryName='personal';}
  if($rootScope.entry=='company'){ $rootScope.entryName='company';}

  // 判断是否APP端
  // $rootScope.isApp = true;
  var ua = navigator.userAgent;
  if(ua.indexOf('zdapp')>=0){
    $rootScope.isApp = true;
  }

}


angular.module('starter.controllers', ['ngCookies'])

.controller('CompanyIndexCtrl', function($scope, $rootScope, ComeFrom, GetUserImfor, Algorithm, $stateParams, $timeout, $interval, mEvent, DeviceRecord, $state, $ionicSlideBoxDelegate, $ionicPopup, $cookies, serviceMath, $ionicSideMenuDelegate, $http, $ionicModal, $ionicHistory) {
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  mEvent.trackPage();
  mEvent.GetConstantXML(); //获取XML配置文件

  $rootScope.CurrentURL = "/#/tab/index";

  //Left Side Scroll Height Value
  $scope.leftScrollHeight = (document.body.scrollHeight - 220)+"px";
  
  //------------ 城市区域 ------------

  //设置默认城市
  $scope.CurrentCityValue = $cookies.get("cityCode-value") || "汕头市";
  $scope.CurrentCityKey = $cookies.get("cityCode-key") || "00000000000000000000000000440500";
  $cookies.put("cityCode-key", $scope.CurrentCityKey, {'expires': mEvent.setExpireDate(), 'path': '/'});

  //[XML] 城市列表
  $scope.CityLists = "正在读取城市数据..";
  require(['xml2json'],function(){
    if(!localStorage.getItem("AreaXMLJson")){
      $http.get("/Config/Area.xml",{
        transformResponse:function(cnv){
          var x2js = new X2JS(); //xml to json
          var aftCnv = x2js.xml_str2json(cnv);
          return aftCnv;
        }
      }).success(function(rs){
        $scope.CityLists = rs.Area.City;
        localStorage.setItem("AreaXMLJson", JSON.stringify($scope.CityLists));
      });
    }else{
      $scope.CityLists = JSON.parse(localStorage.getItem("AreaXMLJson"));
    }
  });
  //end [XML] 城市列表


  //[Init] 简历列表
  $scope.refreshResume = function(){
    (function(){
      function httpCallBack(rs){
        
        // angular.forEach(rs.body, function(item){
        //   console.log(item.Labels);
        // });

        $rootScope.responseResume = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Resume/GetHomeResumeList?AreaId="+$scope.CurrentCityKey+"&PageIndex=0&PageSize=10", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  $scope.refreshResume();



  //【第一次进入选择城市】
  if(!$cookies.get("FirstSelectCity")){
    $scope.datas = {};

    $ionicModal.fromTemplateUrl("tab-index-modalSelectCity.html",{
      scope:$scope,
    }).then(function(modal){
      $scope.modalSelectCity = modal;
      $scope.modalSelectCity.show();
      //选择城市 Click
      $scope.selectCity = function(){
        $scope.modalSelectCity.hide();
        $cookies.put("FirstSelectCity", true, {'expires': mEvent.setExpireDate(), 'path': '/'});
        
        $cookies.put("cityCode-key", $scope.datas.selected._key, {'expires': mEvent.setExpireDate(), 'path': '/'});
        $scope.CurrentCityKey = $cookies.get("cityCode-key");

        $cookies.put("cityCode-value", $scope.datas.selected._value, {'expires': mEvent.setExpireDate(), 'path': '/'});
        $scope.CurrentCityValue = $cookies.get("cityCode-value");

        $rootScope.$broadcast("advAction",true);
        $scope.refreshResume();
      }
    })
  }else{ // 已经选择过城市了
    // $scope.advDisplay = true;
    $scope.CurrentCityKey = $cookies.get("cityCode-key");
    $cookies.put("cityCode-key", $scope.CurrentCityKey, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $scope.CurrentCityValue = $cookies.get("cityCode-value");
    $cookies.put("cityCode-value", $scope.CurrentCityValue, {'expires': mEvent.setExpireDate(), 'path': '/'});
  }

  //点击选择城市(Click)
  $scope.chooseCity = function(cityKey,cityValue){
    $cookies.put("cityCode-key", cityKey, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $scope.CurrentCityKey = $cookies.get("cityCode-key");
    $scope.changeIndexJobPlatform($scope.CurrentCityKey);
    $cookies.put("cityCode-value", cityValue, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $scope.CurrentCityValue = $cookies.get("cityCode-value");
    $scope.$broadcast("changeCity",$scope.CurrentCityKey);
    $scope.refreshJob();
  }

  // 福利列表（差集算法）
  Algorithm.difference();
  
  // 幻灯片Banner
  $http.get($rootScope.app_config.api+"/api/Common/Article/GetSlideList").success(function(res){
    $scope.banners = res.body;
    $ionicSlideBoxDelegate.update();
  });

})

//【简历详情】【企业】（$rootScope.responseResume/ CollectResumeList） isLogin, 
.controller('CompanyResumeDetailCtrl', function($scope, $rootScope, $stateParams, $ionicModal, $ionicHistory, mEvent, ComeFrom, GetUserImfor, $state, $cookies, $http, $ionicPopup, $interval, $location) {

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true);
  mEvent.GetConstantXML(); //获取XML配置文件

  //[封装] 添加简历查阅次数
  $scope.ReadResume = function(resumeId, companyId){
    // [GET] 数据
    (function(){
      function httpCallBack(rs){
        // console.log(rs);
      }
      var httpFn = function(){
        mEvent.http("POST", "/api/Common/Resume/AddReadRecord", true, httpCallBack,
        { 'ResumeId':resumeId, 'UserId':companyId, 'Source':'Mobile' }
      );
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  // [GET] 简历详情
  $scope.GetResumeDetail = function(){
    (function(){
      function httpCallBack(rs){

        if(rs.code==0){
          $rootScope.ResumeDetailPreview = rs.body;
          if($rootScope.ResumeDetailPreview.EduExperience!=''){
            $rootScope.ResumeDetailPreview.EduExperience = JSON.parse($rootScope.ResumeDetailPreview.EduExperience);
          }
          if($rootScope.ResumeDetailPreview.WorkExperience!=''){
            $rootScope.ResumeDetailPreview.WorkExperience = JSON.parse($rootScope.ResumeDetailPreview.WorkExperience);
          }
          
          // [GET] 判断是否收藏简历
          $http({
            method:'POST', headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
            url:$rootScope.app_config.api + '/api/Company/ResumeBook/IsExist',
            data:{ ResumeId:$rootScope.ResumeDetailPreview.Id }
          }).success(function(rs){
            if(rs.code==0){ $rootScope.ResumeDetailPreview.IsEnterpriseCollect = rs.body; }
          });
        }else{
          $scope.errMsg = rs.msg;
          $rootScope.$broadcast('errMsg', $scope.errMsg);
        }

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/Resume/GetResumeDetail?ResumeId=" + $stateParams.Id, true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  // 判断企业用户是否登录
  if($cookies.get("Ticket")){
    if(!$rootScope.userImfor){
      GetUserImfor.GetCompany(); // $rootScope.$on("GetUserImfor",function(e, data){ .. });
      $rootScope.$on("GetUserImfor",function(e, data){
        $scope.ReadResume($stateParams.Id, data.Id);
      });
    }
    $scope.GetResumeDetail();
  }else{
    window.location.href = "#/company/login";
  }

  //[Click] 收藏/取消收藏
  $scope.ButtonClick_Collect = function(){
    var isCollect = $rootScope.ResumeDetailPreview.IsEnterpriseCollect;
    var thisResumeId = $rootScope.ResumeDetailPreview.Id;
    if(isCollect){
      // [POST] 取消收藏简历
      (function(){
        function httpCallBack(rs){
          if(rs.code==0){
            // 静态操作
            $rootScope.ResumeDetailPreview.IsEnterpriseCollect = false;
            $rootScope.userImfor.ResumeCount--;
            $ionicHistory.clearCache();
          }else{
            $ionicPopup.alert({
              title: '提示', template: rs.msg + '(' + rs.code + ')'
            });            
          }
        }
        var httpFn = function(){ //DeleteCollectResume
          mEvent.http("POST", "/api/Company/ResumeBook/DeleteResume", true, httpCallBack, { ResumeId:thisResumeId });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }else{
      // [POST] 收藏简历
      (function(){
        function httpCallBack(rs){
          if(rs.code==0){
            // 静态操作
            $rootScope.ResumeDetailPreview.IsEnterpriseCollect = true;
            $rootScope.userImfor.ResumeCount++;
            $ionicHistory.clearCache();
          }else{
            $ionicPopup.alert({
              title: '提示', template: rs.msg + '(' + rs.code + ')'
            });            
          }
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/Company/ResumeBook/AddResume", true, httpCallBack, { ResumeId:thisResumeId });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

  //[Click] 私信(企业->求职者)
  $scope.BottomClick_Message = function(){

    mEvent.ShowModelMessages($rootScope.ResumeDetailPreview.Realname, $rootScope.ResumeDetailPreview.UserId);

    // var thisId = $rootScope.ResumeDetailPreview.UserId;
    // $ionicModal.fromTemplateUrl("modal-message.html",{
    //   scope:$scope,
    // }).then(function(modal){
    //   $rootScope.modal = modal;
    //   $scope.ModalTitle = '私信';
    //   $scope.modal.show();

    //   //[POST] 发送
    //   $scope.datas = { ReceiveUserId:thisId, Content:'' }
    //   $scope.SaveModal = function(){
    //     if($scope.datas.Content!=''){
    //       $scope.modal.remove();

    //       $scope.datas.Content += '\n关于「' + $rootScope.ResumeDetailPreview.Title + '」简历的消息';

    //       (function(){
    //         function httpCallBack(rs){
    //           // console.log(rs);
    //         }
    //         var httpFn = function(){
    //           mEvent.http("POST", "/api/Common/Mail/SendMail", true, httpCallBack, $scope.datas);
    //         }
    //         httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    //       })();

    //     }else{
    //       var confirmPopup = $ionicPopup.alert({
    //         title: '提示', template: '内容不能为空'
    //       });
    //     }
    //   }
    // });
  }

  //[Click] 邀请面试
  $scope.BottomClick_Invite = function(){
    if($cookies.get("Ticket")){
      var thisId = $rootScope.ResumeDetailPreview.Id;
      $ionicModal.fromTemplateUrl("modal-message-custom.html",{
        scope:$scope,
      }).then(function(modal){
        $rootScope.modal = modal;
        $scope.ModalTitle = '邀请面试'
        $scope.modal.show();

        //[POST] 发送
        $scope.datas = { ResumeId:thisId, Content:'' }
        $scope.SaveModal = function(){
          if($scope.datas.Content!=''){
            $scope.modal.remove();

            (function(){
              function httpCallBack(rs){
                // console.log(rs);
              }
              var httpFn = function(){
                mEvent.http("POST", "/api/Company/Resume/Invite", true, httpCallBack, $scope.datas);
              }
              httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            })();

          }else{
            var confirmPopup = $ionicPopup.alert({
              title: '提示', template: '内容不能为空'
            });
          }
        }
      });
    }else{
      $state.go($rootScope.entry + '.my');
    }
  }

  //[Click] 设置简历联系方式可查看（简历查看次数-1）
  $scope.SetAllow = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: '提示', template: '确定查看联系方式吗？（简历查看次数-1）',
      buttons:[
          {
            text:'确定', type:'button-positive',
            onTap: function(e){
              $http({
                method:'GET', headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
                url:$rootScope.app_config.api + '/api/Company/Resume/GetResumeContactWay?resumeId=' + $rootScope.ResumeDetailPreview.Id
              }).success(function(rs){
                if(rs.code==0){
                  $scope.GetResumeDetail();
                  GetUserImfor.GetCompany();
                }
              });
            }
          },{ text:'取消', onTap: function(e){ return false; } }
        ]
    });
  }


})

//【搜索简历】【企业】
.controller('CompanySearchResumeCtrl', function($scope, $rootScope, $stateParams, $filter, $ionicScrollDelegate, $ionicModal, $ionicHistory, mEvent, ComeFrom, GetUserImfor, $state, $cookies, $http, $ionicPopup, $interval, $location) {

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  mEvent.GetConstantXML(); //获取XML配置文件

  var pageIndex = 0, pageSize = 10;
  $scope.datas = {
    Key:'', IntentionJobTypes:'', IntentionAreas:'', Pays:'', Gender:'', LastLoginDay:'',
    PageIndex:pageIndex, PageSize:pageSize
  }
  
  //[Init] 最近搜索记录
  $scope.datasHistory = ($cookies.get('SearchResumeHistory') ? JSON.parse($cookies.get('SearchResumeHistory')) : false) || [];

  //[Click] 清除记录
  $scope.clearDatasHistory = function(){
    $scope.datasHistory = [];
    $cookies.remove('SearchResumeHistory');
  }

  // |1-1 [Click] 判断是否重复
  $scope.CheckExist = function(d){
    var isExist = false;
    angular.forEach($scope.datasHistory, function(item){
      if(JSON.stringify(d)===JSON.stringify(item)){
        isExist = true;
      }
    });

    if(!isExist){
      //(不重复) 将记录新的历史记录到 Cookie
      $scope.datasHistory.unshift(d);
      $cookies.put('SearchResumeHistory', JSON.stringify($scope.datasHistory), {'expires': mEvent.setExpireDate(), 'path': '/'});
      $ionicScrollDelegate.resize();
    }else{
      //（重复）重复值排序到第一位
      // console.log('重复呢')
      var temp = '';
      $scope.datasHistory = JSON.parse($cookies.get('SearchResumeHistory'));
      angular.forEach($scope.datasHistory, function(item, i){
        if(JSON.stringify(d)===JSON.stringify(item)){
          temp = $scope.datasHistory[i];
          $scope.datasHistory.splice(i,1);
          $scope.datasHistory.unshift(temp);
        }
      });
      $cookies.put('SearchResumeHistory', JSON.stringify($scope.datasHistory), {'expires': mEvent.setExpireDate(), 'path': '/'});
      $ionicScrollDelegate.resize();
    }
  }

  //// |1-2 [GET] 提交搜索
  $scope.PostSearchResume = function(){
    (function(){
      function httpCallBack(rs){
        // console.log(rs.body);
        $state.go('company.searchResume-list', { Datas:$scope.datas, rsDatas:rs.body });
        $scope.datas = { Key:'', IntentionJobTypes:'', IntentionAreas:'', Pays:'', Gender:'', LastLoginDay:'', PageIndex:pageIndex, PageSize:pageSize }
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/Resume/SearchPublicResume?Key=" + $scope.datas.Key + "&IntentionJobTypes=" + $scope.datas.IntentionJobTypes + "&IntentionAreas=" + $scope.datas.IntentionAreas + "&Pays=" + $scope.datas.Pays + "&Gender=" + $scope.datas.Gender + "&LastLoginDay=" + $scope.datas.LastLoginDay + "&PageIndex=" + $scope.datas.PageIndex + "&PageSize=" + $scope.datas.PageSize + "", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  // |1- 保存记录
  $scope.SearchRecordEvent = function(d){
    $scope.GetJobTypeThen = function(JsonDatas){
      var jobTypeName = '';
      angular.forEach(JsonDatas, function(item){
        if(item.Id==d.IntentionJobTypes.split(',')[0]){
          jobTypeName = item.Name;
        }
      });
      //[Init] 历史记录 & 设置 Cookie: [SearchResumeHistory]
      
      var maxHistory = 10;
      if($scope.datasHistory.length>(maxHistory-1)){
        $scope.datasHistory.splice(maxHistory-1,1);
      }
      var tempData = {
        Key : d.Key || '全部',
        IntentionJobTypes: d.IntentionJobTypes,
        IntentionJobTypesName: jobTypeName,
        IntentionAreas: d.IntentionAreas,
        IntentionAreasName: $filter('KeyToName')(d.IntentionAreas.split(',')[0], 'OpenCity', $scope.ConstantXML) || '',
        Pays: d.Pays,
        PaysName: $filter('KeyToName')(d.Pays, 'IntentionPay', $scope.ConstantXML) || '',
        Gender:d.Gender,
        GenderName: $filter('KeyToName')(d.Gender, 'DemandGender', $scope.ConstantXML) || '',
        LastLoginDay: d.LastLoginDay,
        LastLoginDayName: d.LastLoginDay, // ? ($scope.datas.LastLoginDay + '天内') : '',
        PageIndex:pageIndex, PageSize:pageSize
      }
      $scope.CheckExist(tempData);
      $scope.PostSearchResume(); //POST
    }

    if(!localStorage.getItem("JobTypeJson")){
      $http({
        method:'Get',
        url:$rootScope.app_config.api + '/api/Common/Data/GetJobType?level=0'
      }).success(function(rs){
        var ds = JSON.stringify(rs.body);
        localStorage.setItem("JobTypeJson",ds);
        $scope.GetJobTypeThen(JSON.parse(localStorage.getItem("JobTypeJson")));
      });
    }else{
      $scope.GetJobTypeThen(JSON.parse(localStorage.getItem("JobTypeJson")));
    }
  }
  // end 保存记录

  //[Click] 按搜索记录来搜索
  $scope.historySearch = function(){
    $scope.datas = {
      Key:$scope.datasHistory[this.$index].Key, IntentionJobTypes:$scope.datasHistory[this.$index].IntentionJobTypes,
      IntentionAreas:$scope.datasHistory[this.$index].IntentionAreas, Pays:$scope.datasHistory[this.$index].Pays,
      Gender:$scope.datasHistory[this.$index].Gender, LastLoginDay:$scope.datasHistory[this.$index].LastLoginDay,
      PageIndex:pageIndex, PageSize:pageSize
    }
    $scope.SearchRecordEvent($scope.datas);
  }

  //[Click] 开始搜索按钮
  $scope.submitSearch = function(){
    // console.log($scope.datas);
    $scope.SearchRecordEvent($scope.datas);
    // if($scope.datas.Key!=''){
    //   $scope.SearchRecordEvent($scope.datas);
    // }else{
    //   $ionicPopup.alert({ title: '提示', template: '关键字不能为空!' })
    // }
  }

  


})

//【搜索简历结果】【企业】
.controller('CompanySearchResumeListCtrl', function($scope, $rootScope, $timeout, $stateParams, $filter, $ionicModal, $ionicHistory, mEvent, ComeFrom, GetUserImfor, $state, $cookies, $http, $ionicPopup, $interval, $location) {
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  mEvent.GetConstantXML(); //获取XML配置文件

  if($stateParams.Datas && $stateParams.rsDatas){
    // console.log($stateParams.rsDatas); //rsDatas, Datas
    $timeout(function(){
      $scope.SearchResumeList = $stateParams.rsDatas;
      $scope.SearchResumeDatas = $stateParams.Datas;

      // $scope.SearchResumeDatas = {
      //   Key : $stateParams.Datas.Key || '',
      //   IntentionJobTypes : $stateParams.Datas.IntentionJobTypes || '',
      //   IntentionAreas : $stateParams.Datas.IntentionAreas || '',
      //   Pays : $stateParams.Datas.Pays || '',
      //   Gender : $stateParams.Datas.Gender || '',
      //   LastLoginDay : $stateParams.Datas.LastLoginDay || ''
      // }

      // "/api/Company/Resume/SearchPublicResume?Key=" + $scope.datas.Key + "&IntentionJobTypes=" + 
      // $scope.datas.IntentionJobTypes + "&IntentionAreas=" + $scope.datas.IntentionAreas + 
      // "&Pays=" + $scope.datas.Pays + "&Gender=" + $scope.datas.Gender + "&LastLoginDay=" + 
      // $scope.datas.LastLoginDay +  "&PageIndex=" + $scope.datas.PageIndex + 
      // "&PageSize=" + $scope.datas.PageSize + ""

      // $rootScope.$broadcast('SearchResumeList_onLoadDatas', $scope.SearchResumeList); // 分页必须
      ($scope.SearchResumeList.length>0) ? $scope.hasData = true : $scope.hasData = false;
    },0);

  }else{
    $state.go('company.searchResume');
  }



})

//【企业个人中心】
.controller('CompanyMyCtrl', function($scope, $rootScope, $stateParams, $ionicHistory, mEvent, ComeFrom, isLogin, GetUserImfor, $state, $cookies, $http, $ionicPopup, $interval, $location) {
  
  // 要做一个与 myCtrl 互相跳转的，
  // 企业登录 - 求职者入口 - 我的会跳到 myCtrl 造成无效点击

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  require(['base64'],function(){
    var b = new Base64();
    if($cookies.get("s")){

      if(JSON.parse((b.decode($cookies.get("s")))).Type=='Company'){ $rootScope.entry = 'company'; }
      if(JSON.parse((b.decode($cookies.get("s")))).Type=='Personal'){ $rootScope.entry = 'tab'; }
      // $rootScope.entry = JSON.parse((b.decode($cookies.get("s")))).Type;

      if($rootScope.entry=='company'){
        // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
        if(!$rootScope.userImfor){
          GetUserImfor.GetCompany();
        }
      }else{
        $state.go($rootScope.entry + '.my');
      }
    }
  });

  // [GET] 营业执照 状态
  (function(){
    function httpCallBack(rs){
      // console.log(rs.body);
      // Status(状态：未审核=0,已通过=1,未通过=2,处理中=3)} 
      $rootScope.BusinessResult = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Enterprise/GetBusinessLicenseAuthenticationDisposeStatus", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

  //======================== (Button)注销 ========================
  isLogin.IsInitBaseInfo();
  $scope.logout = function(){

    //向服务端提交注销日志，提交成功后注销Cookie
    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        httpFn = undefined;
        $rootScope.userImfor = undefined;
        $cookies.remove("Ticket",{'path': '/'});
        $cookies.remove("s",{'path': '/'});
        $rootScope.IsHasJobApply = false;

        $scope.$broadcast('UserLogouted', true);
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go($rootScope.entry + '.login');
      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/User/LoginOff", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();

  }
  
})

//【企业登录】
.controller('CompanyMyLoginCtrl',function($scope, $rootScope, $stateParams, GetUserImfor, $state, $ionicHistory, $ionicPopup, mEvent, DeviceRecord, $timeout, $interval, $http, $cookies){
  
  CommonFn($scope, $rootScope, $stateParams);

  //712733451@qq.com 123456
  $scope.datas = { "UserName":($cookies.get('UserName_Company')||""), "Password":"", "Ident":"", "Vercode":"" }

  // 超时自动登录 或 已登录访问\login路径返回\my
  // 判断是否有登录，如有登录则跳转到个人中心
  require(['base64'],function(){
    var b = new Base64();
    if($cookies.get("Ticket")){ //$cookies.get("s")&&
      $state.go($rootScope.entry + '.my');
    }
    // }else{
    //   if($cookies.get("DGB_CUserName")&&$cookies.get("DGB_CUserPasswd")){
    //     $http.get($rootScope.app_config.api + "/api/Common/GetCookieValue?value=" + $cookies.get("DGB_CUserPasswd")).success(function(res){
    //       $scope.CUserPasswd = res;
    //       $http({
    //         method: "POST",
    //         url: $rootScope.app_config.api + "/api/Company/User/Login",
    //         data: { UserName:$cookies.get("DGB_CUserName"), Password:$scope.CUserPasswd},
    //         headers: {'Content-Type': 'application/json'}
    //       }).success(function(res){
    //         DeviceRecord.GetDeviceToken();
    //         // console.log("登录成功后，重置Cookies");
    //         $scope.formData = { UserName:$cookies.get("DGB_CUserName"), Password:$scope.CUserPasswd }
    //         $cookies.put("s", b.encode($scope.formData), {'expires': mEvent.setExpireDate(), 'path': '/'});
    //         $state.go($rootScope.entry + '.my');
    //       })
    //     });
    //   }
  });
  
  // [GET] 获取图形验证码
  require(['md5'],function(){
    $scope.GetVercodeImg = function(){
      $http({
        //method:'POST', data: {Width: 80, Height: 32, Type: 1},
        // Type：类型(登录=0，注册=1，忘记密码=2)
        method:'GET',
        url:$rootScope.app_config.api+'/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=0'
      }).success(function(rs){
        $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
        $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
      });
    }
    $scope.GetVercodeImg();
    $scope.ChangeVercodeImg = function(){
      $scope.GetVercodeImg();
    }
  });

  // (Mobile弹出软键盘时，隐藏底部)
  $scope.BottomStatus = function(n){
    if(n==1){ $scope.isHideBottom = true;$rootScope.hideTabs = true;}
    if(n==2){ $scope.isHideBottom = false;$rootScope.hideTabs = false;}
  }

  $scope.isPost = false;
  $scope.readAndAgree = true;
  $scope.submitForm = function(isValid, myForm) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;

      // 弹窗错误提示
      var rules = [
        { rule: myForm.username.$error.required, msg:'邮箱不能为空!'  },
        // { rule: !myForm.username.$error.required && myForm.username.$dirty && myForm.username.$invalid, msg:'邮箱格式不正确!' },
        { rule: myForm.password.$error.required, msg:'密码不能为空!' },
        { rule: !myForm.password.$error.required && myForm.password.$dirty && myForm.password.$invalid, msg:'密码必须是6-16位数字或字母!' },
        { rule: myForm.vercode.$error.required, msg:'验证码不能为空!' }
      ];
      var keepEaching = true;
      angular.forEach(rules, function(item){
        if(keepEaching){
          // console.log(item);
          if(item.rule){
            keepEaching = false;
            $ionicPopup.alert({ title: '提示', template: item.msg, okText:'确定' });
          }
        }
      })
      // end 弹窗错误提示

    }else{
      $scope.isErrorForSubmit = false;
      $scope.isPost = true;
      $scope.datas.Password = hex_md5($scope.datas.Password);

      // 验证成功-提交
      $http({
        method:'POST', data: $scope.datas,
        url: $rootScope.app_config.api + '/api/Company/User/Login'
      }).success(function(rs){

        $scope.isPost = false;
        if(rs.code!="0"){
          $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code + ')', okText:'确定' });
          // if(rs.code=="80203"){
            $scope.GetVercodeImg();
            $scope.datas.Vercode = '';
            $scope.datas.Password = '';
          // }
        }else{

          // 登录成功后
                 
          require(['base64', 'md5'],function(){
            //设置Cookie
            var expireTime = new Date();
            expireTime.setMinutes(expireTime.getMinutes() + 10); //10分钟 (服务端也会设置过期时限)
            
            //加密
            $scope.datas.Type = 'Company';
            $scope.datas.Password = hex_md5($scope.datas.Password);

            var b = new Base64();

            $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
            $cookies.put("Ticket", rs.body, {'expires': mEvent.setExpireDate(), 'path': '/'});
            $cookies.put("UserName_Company", $scope.datas.UserName, {'expires': mEvent.setExpireDate(), 'path': '/'});

            // [GET] 营业执照 状态
            (function(){
              function httpCallBack(rs){
                //Status(状态：未审核=0,已通过=1,未通过=2,处理中=3)} 
                $rootScope.BusinessResult = rs.body;

                // 企业审核通过
                if($rootScope.BusinessResult.Status==1){
                  //进入个人中心 或 返回上一页 或 带参数
                  if($rootScope.StateRoutes && $rootScope.StateRoutes!=''){
                    if($rootScope.StateRoutes.length>3){
                      $state.go($rootScope.StateRoutes[2], $rootScope.StateRoutes[3]);
                    }else{
                      $state.go($rootScope.StateRoutes[2]);
                    }
                  }else{
                    $state.go($rootScope.entry + '.my');
                  }
                  //$emit
                  $scope.$broadcast('UserLogined', true);
                  GetUserImfor.GetCompany();
                  $ionicHistory.clearCache();
                }else{ //($rootScope.BusinessResult.Status==0||$rootScope.BusinessResult.Status==2)
                  // 企业未审核
                  $state.go($rootScope.entry + '.register-new-inform');
                }

              }
              var httpFn = function(){
                mEvent.http("GET", "/api/Company/Enterprise/GetBusinessLicenseAuthenticationDisposeStatus", true, httpCallBack, {Id:''});
              }
              httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            })();
            
          });

        }

      });
    }
  };

})

//【企业logo】
.controller('CompanyMyHeadCtrl',function($scope, $rootScope, $stateParams, $state, mEvent, GetUserImfor, $timeout, isLogin, $cookies, $http){

  CommonFn($scope, $rootScope, $stateParams);

  // 未获取，则获取个人信息
  // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){ GetUserImfor.GetPersonal(); }


  $scope.myImage='';
  
  //上传图片
  var handleFileSelect = function(evt) {
    $scope.myCroppedImage = '';
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage = evt.target.result;
      });
    };
    reader.readAsDataURL(file);

    // 压缩
    require(['lrz'], function(){
      lrz(file,{ width:50 }).then(function(rst){
        $scope.$apply(function($scope){
          $scope.myImageSmall = rst.base64;
        });
      });
    });

  };
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  
  // 压缩2
  function dealImage(path, obj, callback){
    var img = new Image(); img.src = path;
    img.onload = function(){
      // 默认按比例压缩
      var that = this, w = that.width, h = that.height, scale = w / h;
      w = obj.width || w; h = obj.height || (w / scale);
      var quality = 0.7;  // 默认图片质量为0.7
      var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'); //生成canvas
      // 创建属性节点
      var anw = document.createAttribute("width"); anw.nodeValue = w;
      var anh = document.createAttribute("height"); anh.nodeValue = h;
      canvas.setAttributeNode(anw); canvas.setAttributeNode(anh); 
      ctx.drawImage(that, 0, 0, w, h);
      if(obj.quality && obj.quality <= 1 && obj.quality > 0){ quality = obj.quality; }  // 图像质量
      var base64 = canvas.toDataURL('image/jpeg', quality );  // quality值越小，所绘制出的图像越模糊
      callback(base64); // 回调函数返回base64的值
    }
  }

  $scope.changeed = function(img){
    $scope.myCroppedImage = img;
    dealImage(img, { width:50, height:50, quality:1}, function(base64){
      $scope.$apply(function(){
        $scope.myImageSmall = base64;
      });
    });
  }
  $scope.loaded = function(img){
    $scope.myCroppedImage = img;
  }
  
  // 点击提交上传图片
  $scope.changeHeadPic = function(){

    $scope.datas = { LogoPic:'', LogoPicLit:'' }
    // $scope.myCroppedImage.split(",")[1] // 大图
    // $scope.myImageSmall.split(",")[1] //小图

    var Auth = {"Authorization" : "BasicAuth " + $cookies.get('Ticket')};
    // [POST] 上传大图，获得文件名
    $http({
      method:'POST', headers: Auth,
      url:app_config.api + '/api/Common/UploadFile/UploadImgBase64',
      data: { Base64:$scope.myCroppedImage.split(",")[1] }
    }).success(function(rs){
      if(rs.code==0){
        $scope.datas.LogoPic = rs.body;

        // [POST] 上传小图，获得文件名
        $http({
          method:'POST', headers: Auth,
          url:app_config.api + '/api/Common/UploadFile/UploadImgBase64',
          data: { Base64:$scope.myImageSmall.split(",")[1] }
        }).success(function(rs){
          if(rs.code==0){
            $scope.datas.LogoPicLit = rs.body;

            // [POST] 修改企业LOGO
            $http({
              method:'POST', headers: Auth,
              url:app_config.api + '/api/Company/Enterprise/ChangeHeadPic',
              data: $scope.datas
            }).success(function(rs){
              if(rs.code==0){
                $rootScope.userImforHead = $scope.myCroppedImage;
                $rootScope.backTo();
              }
            });

          }
        });

      }
    })

  }
  
})

//【企业信息】
.controller('CompanyMyImformationCtrl', function($scope, $rootScope, $stateParams, $state, $ionicPopup, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){ GetUserImfor.GetCompany(); }

  (function(){
    function httpCallBack(res){
      httpFn = undefined;
      $rootScope.UserBaseInfor = res.body;

      // Date 数据加载完成
      $timeout(function(){ $rootScope.$broadcast('isDateLoaded', true); },0);
      mEvent.GetConstantXML(); //获取XML配置文件

      // [POST] 更新基本资料(企业)
      $scope.submitForm = function(isValid) {
        if(!isValid) {
          $scope.isErrorForSubmit = true;
        }else{
          $scope.isErrorForSubmit = false;
          //验证成功后提交后跳转
          (function(){
            function httpCallBack(res){
              httpFn = undefined;
              if(res.code==0){
                $rootScope.isInitBaseInfo = true;
                $state.go($rootScope.entry + '.my');
              }
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/Company/Enterprise/UpdateInfo", true, httpCallBack, $rootScope.UserBaseInfor);
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();
        }
      }

    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Enterprise/GetEnterpriseBaseInfo", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

//【企业图集】
.controller('CompanyMyImagesCtrl', function($scope, $rootScope, $stateParams, $state, $q, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  (function(){
    function httpCallBack(rs){

      if(rs.code==0){
        // [Init] 数据
        $scope.imagesList = rs.body;
        var defered2 = $q.defer();
        $scope.GetImageUrl = '';
        angular.forEach(rs.body, function(item, i){
            if($scope.GetImageUrl==''){
                $scope.GetImageUrl = item.replace(/(.*\/)*([^.]+)/ig,"$2");
            }else{
                $scope.GetImageUrl += ','+item.replace(/(.*\/)*([^.]+)/ig,"$2");
            }
            if(rs.body.length==(i+1)){
                defered2.resolve($scope.GetImageUrl);
            }
        });
        defered2.promise.then(function(rs){ /* $scope.fileNames = rs;*/ });
      }
      $scope.files = '';
      $scope.fileNames = '';


      // [POST] 设为封面
      $scope.SetFirst = function(index){
          var temp = $scope.GetImageUrl.split(',');
          temp[0] = temp.splice(index, 1, temp[0])[0];
          $scope.GetImageUrl = temp.toString();
          // 提交更新 + 刷新 
          $scope.RefreshImage();
      }
      

      // 上传图片
      $scope.uploadImg = function(files){
          
          var defered = $q.defer();
          var fileLenght = files.length;
          angular.forEach(files, function(fileItem, fileIndex){
              // console.log(fileItem);
              var reader = new FileReader()
              reader.onload = function(e) { // console.log(e.target.result); //输出 base64

                  // [POST] 上传图片
                  (function(){
                    function httpCallBack(rs){
                      $timeout(function(){
                        if($scope.fileNames==''){
                            $scope.fileNames = rs.body;
                        }else{
                            $scope.fileNames += ',' + rs.body;
                        }
                        if(fileLenght==(fileIndex+1)){
                            defered.resolve($scope.fileNames);
                        }
                      },200);
                    }
                    var httpFn = function(){
                      mEvent.http("POST", "/api/Common/UploadFile/UploadImgBase64", true, httpCallBack, { Base64:e.target.result });
                    }
                    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                  })();
                  
              }
              reader.readAsDataURL(fileItem);
          });

          // defered 等待图片上传完成
          defered.promise.then(function(rs){
              if($scope.GetImageUrl==''){
                  $scope.GetImageUrl = rs;
              }else{
                  $scope.GetImageUrl += ',' + rs;
              }
              // 提交更新 + 刷新 
              $scope.RefreshImage();
          });

      }

      // [POST+GET] 提交更新 + 刷新 企业图集
      $scope.RefreshImage = function(){

        (function(){
          function httpCallBack(rs){

            (function(){
              function httpCallBack2(rs){
                $scope.imagesList = rs.body;
                $scope.files = '';
                $scope.fileNames = '';
              }
              var httpFn2 = function(){
                mEvent.http("GET", "/api/Company/Enterprise/GetImage", true, httpCallBack2);
              }
              httpFn2();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn2();}catch(e){ console.log("login error!"); }} });
            })();

          }
          var httpFn = function(){
            mEvent.http("POST", "/api/Company/Enterprise/ChangeImage", true, httpCallBack, { Images:$scope.GetImageUrl });
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();

      }

      // [Click] 删除图片
      $scope.DeleteImage = function(n){
          var confirmPopup = $ionicPopup.confirm({
            title: '提示', template: '是否删除此图片',
            buttons:[
                {
                  text:'确定', type:'button-positive',
                  onTap: function(e){
                    // 删 list
                    $scope.imagesList.splice(n,1);
                    // 删 value
                    var tempGetImageUrl = $scope.GetImageUrl.split(',');
                    tempGetImageUrl.splice(n,1);
                    $scope.GetImageUrl = tempGetImageUrl.toString();
                    // 提交更新 + 刷新 
                    $scope.RefreshImage();
                  }
                },{ text:'取消', onTap: function(e){ return false; } }
              ]
          });
      }

      // [Click] 显示大图
      $scope.ShowBigImg = function(){
        var template = '<div class="BigImgWrap"><img class="bigimg" src="' + this.item + '"></div>';
        var popover = $ionicPopover.fromTemplate(template,{scope:$rootScope})
        popover.show();
      }

    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Enterprise/GetImage", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

//【企业营业执照】
.controller('CompanyMyBusinessLicenseCtrl', function($scope, $rootScope, $stateParams, $state, $q, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  // [GET] 营业执照 状态
  $scope.RefreshBusinessStatus = function(){
    function httpCallBack(rs){
      console.log(rs.body);
      //Status(状态：未审核=0,已通过=1,未通过=2,处理中=3)} 
      $rootScope.BusinessResult = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Enterprise/GetBusinessLicenseAuthenticationDisposeStatus", true, httpCallBack, {Id:''});
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }

  //[Init] 刷新数据
  if(!$rootScope.BusinessResult){ $scope.RefreshBusinessStatus()}

  //[Init] BusinessNumber 营业执照号码   BusinessLicense 营业执照图片
  $scope.datas = { BusinessNumber:'', BusinessLicense:'' } 

  //[POST] 营业执照 提交认证
  $scope.uploadImg = function(files){

      var defered = $q.defer();
      var fileLenght = files.length;

      angular.forEach(files, function(fileItem, fileIndex){
          var reader = new FileReader();
          reader.onload = function(e) {

              // [POST] upload上传图片
              (function(){
                function httpCallBack(rs){

                  $scope.datas.BusinessLicense = rs.body;
                  // [POST] 上传营业执照（文件名，营业执照号码）
                  (function(){
                    function httpCallBack2(rs){
                      // console.log(rs);
                      $scope.RefreshBusinessStatus();
                    }
                    var httpFn2 = function(){
                      mEvent.http("POST", "/api/Company/Enterprise/BusinessLicenseAuthentication", true, httpCallBack2, $scope.datas);
                    }
                    httpFn2();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn2();}catch(e){ console.log("login error!"); }} });
                  })();

                }
                var httpFn = function(){
                  mEvent.http("POST", "/api/Common/UploadFile/UploadImgBase64", true, httpCallBack, { Base64:e.target.result });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
              
          }
          reader.readAsDataURL(fileItem);
      });

  }

})

//【企业】【招聘】
.controller('CompanyReleaseJobCtrl', function($scope, $rootScope, $ionicScrollDelegate, $stateParams, $state, $q, ComeFrom, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  if(!$rootScope.userImfor&&$cookies.get('Ticket')){ GetUserImfor.GetCompany(); }

  //[GET] 获取全部 收到的简历 列表
  // (function(){
  //   function httpCallBack(rs){
  //     console.log(rs.body);
  //     $rootScope.SimpleJobApplyList = rs.body;
  //   }
  //   var httpFn = function(){
  //     mEvent.http("GET", "/api/Company/JobApply/GetSimpleJobApplyList", true, httpCallBack);
  //   }
  //   httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  // })();

  //[GET] 获取 我发布职位 列表
  $scope.RefreshReleaseJob = function(){
    if($cookies.get('Ticket')){
      function httpCallBack(rs){
        $rootScope.ReleaseJobList = rs.body;
        $rootScope.$broadcast('ReleaseJobList_onLoadDatas', $rootScope.ReleaseJobList); // 分页必须
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/Job/GetReleaseJobList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    }
  }
  $scope.RefreshReleaseJob();

  // [Click] 刷新(重置更新时间)
  $scope.RefreshJob = function(){
    var thisId = this.item.Id;
    // [POST] 刷新
    (function(){
      function httpCallBack(rs){
        // console.log(rs);
        $scope.RefreshReleaseJob();
        $ionicScrollDelegate.scrollTop();
      }
      var httpFn = function(){
        mEvent.http("POST", "/api/Company/Job/RepublishJob", true, httpCallBack, { JobId:thisId });
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  // [Click] 删除
  $scope.DeleteJob = function(){
    var thisId = this.item.Id;
    var thisName = this.item.Name;
    var confirmPopup = $ionicPopup.confirm({
      title: '提示', template: '是否删除职位<b>'+thisName+'</b>？',
      buttons:[
          {
            text:'确定', type:'button-positive',
            onTap: function(e){
              // [POST] 删除
              (function(){
                function httpCallBack(rs){
                  // console.log(rs);
                  angular.forEach($rootScope.ReleaseJobList, function(item, i){
                    if(thisId == item.Id){
                      $rootScope.ReleaseJobList.splice(i, 1);
                      $rootScope.$broadcast('ReleaseJobList_onLoadDatas', $rootScope.ReleaseJobList);
                      $rootScope.$apply();
                    }
                  })
                }
                var httpFn = function(){
                  mEvent.http("POST", "/api/Company/Job/DeleteJob", true, httpCallBack, { JobId:thisId });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();

            }
          },{ text:'取消', onTap: function(e){ return false; } }
        ]
    });
  }
  
  // [Click] 上架/下架
  $scope.ChangeIsPutaway = function(){
    var thisId = this.item.Id;
    var thisIsPutaway = this.item.IsPutaway;
    if(thisIsPutaway){
      // [POST] 下架 /api/Company/Job/SuspendJob  { JobId: id}
      (function(){
        function httpCallBack(rs){
          // console.log(rs);
          angular.forEach($rootScope.ReleaseJobList, function(item, i){
            if(thisId == item.Id){
              $rootScope.ReleaseJobList[i].IsPutaway = !thisIsPutaway;
            }
          })
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/Company/Job/SuspendJob", true, httpCallBack, { JobId:thisId });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }else{
      // [POST] 上架 /api/Company/Job/PutawayJob  { JobId: id}
      (function(){
        function httpCallBack(rs){
          // console.log(rs);
          angular.forEach($rootScope.ReleaseJobList, function(item, i){
            if(thisId == item.Id){
              $rootScope.ReleaseJobList[i].IsPutaway = !thisIsPutaway;
            }
          })
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/Company/Job/PutawayJob", true, httpCallBack, { JobId:thisId });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

})

//【企业】【招聘】【预览】
.controller('CompanyJobDetailCtrl', function($scope, $rootScope, $stateParams, $state, $q, ComeFrom, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

    $scope.entry = $stateParams.entry;
    $scope.isPreview = $stateParams.isPreview;
    
    // [GET]职位详情
    (function(){
      function httpCallBack(rs){
        if(rs.code==0){
          $scope.ShowContact = true;
          $rootScope.jobDetailData = rs.body;
          $rootScope.jobDetailData.ContactManPhone = mEvent.RegPhone($rootScope.jobDetailData.ContactManPhone);
        }else{
          $scope.errMsg = rs.msg;
          $rootScope.$broadcast('errMsg', $scope.errMsg);
        }
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJob?jobId=" + $stateParams.Id, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

})

//【企业】【招聘】【简历库】
.controller('CompanyCollectResumeCtrl', function($scope, $rootScope, $stateParams, $state, $q, ComeFrom, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  mEvent.GetConstantXML(); //获取XML配置文件

  // [GET] 获取 简历库 列表
  (function(){
    function httpCallBack(rs){
      $rootScope.CollectResumeList = rs.body;
      $rootScope.$broadcast('CollectResumeList_onLoadDatas', $rootScope.CollectResumeList); // 分页必须

      // [GET] 如果有登录，获取个人信息，判断简历列表(静态)是否收藏
      if($cookies.get('s') && $cookies.get('Ticket')){
        GetUserImfor.GetCompany();
        $rootScope.$on("GetUserImfor", function(){
          if($rootScope.CollectResumeList.length>0){
            angular.forEach($rootScope.CollectResumeList, function(item, i){
              if($rootScope.userImfor.EnterpriseCollectResumeIds.indexOf(item.Resume.Id)>=0){
                $rootScope.CollectResumeList[i].Resume.IsEnterpriseCollect = true;
                $rootScope.CollectResumeList[i].Resume.EnterpriseResumeId = item.Resume.Id;
              }
            })
          }
        });
      }

      if($rootScope.CollectResumeList.length>0){
        $scope.hasData = true;
      }else{
        $scope.hasData = false;
      }

    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/ResumeBook/GetResumeList", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();


  //[POST] 取消收藏简历
  $scope.DeleteCollectResume = function(){
    var thisId = this.item.Id;
    var thisResumeId = this.item.Resume.Id;
    var thisName = this.item.Resume.Realname;
    var confirmPopup = $ionicPopup.confirm({
      title: '提示', template: '是否取消收藏简历<b>' + thisName + '</b>？',
      buttons:[
          {
            text:'确定', type:'button-positive',
            onTap: function(e){
              (function(){
                function httpCallBack(rs){
                  angular.forEach($rootScope.CollectResumeList, function(item, i){
                    if(item.Resume.Id==thisResumeId){
                      $rootScope.CollectResumeList.splice(i, 1);
                      $rootScope.$broadcast('CollectResumeList_onLoadDatas', $rootScope.CollectResumeList); // 分页必须
                    }
                  });
                }
                var httpFn = function(){
                  mEvent.http("POST", "/api/Company/ResumeBook/DeleteResume", true, httpCallBack, { ResumeId:thisResumeId });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
            }
          },{ text:'取消', onTap: function(e){ return false; } }
        ]
    });
  }

})

//【企业招聘表单】【发布/修改】
.controller('CompanyReleaseJobFormCtrl', function($scope, $rootScope, $stateParams, $state, $compile, $q, ComeFrom, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){
  
  // console.log($stateParams.Id);
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){ GetUserImfor.GetCompany(); }

  // [GET] 获取 部门信息（包含在个人信息里面）
  $rootScope.$on("GetUserImfor",function(){
    $rootScope.$broadcast('isArrayLoaded', $rootScope.userImfor.Departments);
  });

  $scope.datas = { //WorkTypeId
    Name:'', Nature:'', JobTypeId:'', Department:'', RecruitingCount:'', PayWay:'', WorkAreaId:'',
    PayMin:'', PayMax:'', Welfare:'', JobDescribe:'', ContactManName:'', ContactManPhone:'', WorkAddress:'', MapLocation:'',
  }
  mEvent.GetConstantXML(); //获取XML配置文件

  //[GET] (刷新)获取 我发布职位列表
  $scope.RefreshReleaseJob = function(){
    function httpCallBack(rs){
      $rootScope.ReleaseJobList = rs.body;
      $rootScope.$broadcast('ReleaseJobList_onLoadDatas', $rootScope.ReleaseJobList); // 分页必须
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Job/GetReleaseJobList", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }

  if($stateParams.Id==''){ $state.go('company.my-releaseJob');
  }else if($stateParams.Id=="add"){

    // 发布职位
    $scope.releaseTitle = '发布新职位';
    
    // [GET] 获取企业信息（自动填写 联系人/电话/地址/地图）
    (function(){
      function httpCallBack(rs){
        // console.log(rs.body);
        $rootScope.EnterpriseBaseInfo = rs.body;
        $scope.datas.ContactManName = $rootScope.EnterpriseBaseInfo.ContactManName;
        $scope.datas.ContactManPhone = $rootScope.EnterpriseBaseInfo.ContactManPhone;
        $scope.datas.WorkAddress = $rootScope.EnterpriseBaseInfo.Address;
        $scope.datas.MapLocation = $rootScope.EnterpriseBaseInfo.MapLocation;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/Enterprise/GetEnterpriseBaseInfo", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

    // [POST] 发布新职位
    $scope.submitForm = function(isValid){
      if(!isValid) { $scope.isErrorForSubmit = true;}else{
        $scope.isErrorForSubmit = false;
        // console.log($scope.datas);
        
        // [GET] 职位详情
        (function(){
          function httpCallBack(rs){
            // console.log(rs);
            $scope.RefreshReleaseJob();
            $state.go('company.my-releaseJob');
          }
          var httpFn = function(){
            mEvent.http("POST", "/api/Company/Job/AddJob", true, httpCallBack, $scope.datas);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();
      }
    }
    // end [POST] 修改职位

  }else{
    // 修改职位
    $scope.releaseTitle = '修改职位';
    
    // [GET] 职位详情
    (function(){
      function httpCallBack(rs){
        mEvent.GetConstantXML(); //获取XML配置文件
        $scope.datas = rs.body;
        $scope.datas.JobId = $stateParams.Id;
        $rootScope.$broadcast('isLoaded', true);
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/Job/GetJobDetail?jobId=" + $stateParams.Id, true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

    // [POST] 修改职位
    $scope.submitForm = function(isValid){
      if(!isValid) { $scope.isErrorForSubmit = true;}else{
        $scope.isErrorForSubmit = false;
        // console.log($scope.datas);
        // [GET] 职位详情
        (function(){
          function httpCallBack(rs){
            // console.log(rs);
            $scope.RefreshReleaseJob();
            $state.go('company.my-releaseJob');
          }
          var httpFn = function(){
            mEvent.http("POST", "/api/Company/Job/UpdateJob", true, httpCallBack, $scope.datas);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();
      }
    }
    // end [POST] 修改职位

  }
  
  

})

//【企业】【收到的应聘（新简历，已读简历）】
.controller('CompanyJobApplyCtrl', function($scope, $rootScope, $stateParams, $state, $q, ComeFrom, $ionicPopup, $ionicPopover, $ionicModal, $location, mEvent, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  mEvent.GetConstantXML(); //获取XML配置文件
  CommonFn($scope, $rootScope, $stateParams);

  // [entry] 新简历
  if($stateParams.Type=="newest"){
    $scope.ResumeListTitle = '新简历';
    $rootScope.JobApplyList = undefined;

    (function(){
      function httpCallBack(rs){
        $rootScope.JobApplyList = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/JobApply/GetNotReadSimpleJobApplyList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
    
  }

  // [GET] 获取 简历库 列表
  if($stateParams.Type=="readed"){
    $scope.ResumeListTitle = '已读简历';
    $rootScope.JobApplyList = undefined;

    (function(){
      function httpCallBack(rs){
        $rootScope.JobApplyList = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Company/JobApply/GetSimpleJobApplyList?PageIndex=0&PageSize=10", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }

  // [Click] 查看简历
  $scope.ReadResume = function(){
    var thisResumeId = this.item.Resume.Id;
    var thisId = this.item.Id;
    $location.path('/company/jobApplyResume/' + thisResumeId);

    if($stateParams.Type=="newest"){
      // [POST] 设置简历为已读
      (function(){
        function httpCallBack(rs){
          // console.log(rs);
          if($rootScope.userImfor){
            $rootScope.userImfor.IsApplyNotReadCount--;
            $rootScope.userImfor.IsApplyReadCount++;
          }
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/Company/JobApply/ReadJobApply", true, httpCallBack, { JobApplyId:thisId });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

  //[Click] 满意/不满意
  $scope.Dispose = function(id, disposeType){
    var thisId = id, disposeAPI = '';
    if(disposeType=='Pass'){ disposeAPI = '/api/Company/JobApply/Pass'; }
    if(disposeType=='Reject'){ disposeAPI = '/api/Company/JobApply/Reject'; }
    
    $ionicModal.fromTemplateUrl("modal-message.html",{
      scope:$scope,
    }).then(function(modal){
      $rootScope.modal = modal;
      $scope.ModalTitle = '简历评分'
      $scope.ModalSmallTip = '对简历进行有效评分有利于提升岗位排名';
      $scope.modal.show();

      //[POST] 发送
      $scope.datas = { JobApplyId:thisId, Content:'' }
      $scope.SaveModal = function(){
        if($scope.datas.Content!=''){
          $scope.modal.remove();
          (function(){
            function httpCallBack(rs){
              
              if(rs.code==0){
                //静态
                angular.forEach($rootScope.JobApplyList, function(item, i){
                  if(item.Id == thisId){
                    $rootScope.JobApplyList[i].IsDispose = true;
                    if(disposeType=='Pass'){
                      $rootScope.JobApplyList[i].IsPass = true;
                    }else{
                      $rootScope.JobApplyList[i].IsPass = false;
                    }
                  }
                });
              }

            }
            var httpFn = function(){
              mEvent.http("POST", disposeAPI, true, httpCallBack, $scope.datas);
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();
        }else{
          var confirmPopup = $ionicPopup.alert({ title: '提示', template: '内容不能为空' });
        }
      }
    });

  }
  //end [Click] 满意/不满意


})


//删除账号(测试) 13670511519
// $scope.delTest = function(){
//   $http({ method:'Get', url:app_config.api + '/api/Company/Test/DeletePhone' }).success(function(rs){
//     console.log(rs);
//     if(rs.code==0){ alert('删除成功'); }else{ alert(rs.msg+'('+rs.code+')'); }
//   })
// }
// $scope.delTestEmail = function(){
//   $http({ method:'Get', url:app_config.api + '/api/Company/Test/DeleteEmail' }).success(function(rs){
//     console.log(rs);
//     if(rs.code==0){ alert('删除成功'); }else{ alert(rs.msg+'('+rs.code+')'); }
//   })
// }

// 企业注册（新）
.controller('CompanyMyRegisterNew', function($scope, $rootScope, mEvent, $state, $interval, $ionicPopup, $ionicScrollDelegate, $http, $cookies, $stateParams) {
  
  CommonFn($scope, $rootScope, $stateParams);
  mEvent.GetConstantXML(); //获取XML配置文件
  $scope.datas = { Phone:'', Password:'', Vercode:'', AreaId:$cookies.get("cityCode-key"), Ident:'' }

  require(['md5'],function(){
    // [GET] 获取图形验证码
    $scope.GetVercodeImg = function(){
      $http({
        //method:'POST', data: {Width: 80, Height: 32, Type: 1},
        // Type：类型(登录=0，注册=1，忘记密码=2)
        method:'GET',
        url:$rootScope.app_config.api+'/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=1'
      }).success(function(rs){
        $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
        $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
      });
    }
    $scope.GetVercodeImg();
    $scope.ChangeVercodeImg = function(){
      $scope.GetVercodeImg();
    }
  });

  // 切换Tab事件
  $scope.myForm = { phoneForm:'', emailForm:'' }
  $scope.OnSelect = function(n){
    if(n==1){
      $scope.datas = { Phone:'', Password:'', Vercode:'', AreaId:$cookies.get("cityCode-key"), Ident:'' }
      if($scope.myForm.phoneForm) $scope.myForm.phoneForm.$setPristine();
    }else if(n==2){
      $scope.datas = { Email:'', Password:'', Vercode:'', AreaId:$cookies.get("cityCode-key"), Ident:'' }
      if($scope.myForm.emailForm) $scope.myForm.emailForm.$setPristine();
    }
    mEvent.GetConstantXML();
    $scope.isErrorForSubmit = false;
    $ionicScrollDelegate.resize();
    $scope.confirmPassword = '';
  }

  $scope.RegisterSuccess = function(ticket){
    var b = new Base64();
    // $scope.formData = {
    //   "UserName":$scope.datas.Phone, "Password":hex_md5($scope.datas.Password),
    //   "Type":"Company"
    // }
    //JSON.stringify($scope.formData)
    $scope.datas.Type = "Company";
    $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
    $cookies.put("Ticket", ticket, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $state.go('company.register-new-inform');
    // $state.go('company.my');
  }

  // 提交表单（手机注册）
  $scope.submitForm_Phone = function(isValid,url) {

    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
        $scope.isErrorForSubmit = false;

        require(['base64', 'md5'],function(){
          $http({
            method:"POST",
            url:$rootScope.app_config.api+"/api/Company/User/PhoneRegister",
            data:$scope.datas
          }).success(function(res){
            if(res.code=="0"){
              $scope.RegisterSuccess(res.body);
            }else{
              $ionicPopup.alert({
                title: '提示', template: res.msg + '(' + res.code +')', okText:'确定'
              });
              if(res.code=="80203"){
                $scope.GetVercodeImg();
                $scope.datas.Vercode = '';
              }
            }
          });
      });
    }
  }

  // 提交表单（邮箱注册）
  $scope.submitForm_Email = function(isValid,url) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
        $scope.isErrorForSubmit = false;

        require(['base64'],function(){
          $http({
            method:"POST",
            url:$rootScope.app_config.api+"/api/Company/User/EmailRegister",
            data:$scope.datas
          }).success(function(res){
            if(res.code=="0"){
              $scope.RegisterSuccess(res.body);
            }else{
              $ionicPopup.alert({
                title: '提示', template: res.msg + '(' + res.code +')', okText:'确定'
              });
              if(res.code=="80203"){
                $scope.GetVercodeImg();
                $scope.datas.Vercode = '';
              }
            }
          });
      });
    }
  }
  
})

// 企业注册（新）- 完善企业资料
.controller('CompanyMyRegisterNewInform', function($scope, $rootScope, mEvent, $timeout, $q, $ionicTabsDelegate, GetUserImfor, $state, $interval, $ionicPopup, $ionicScrollDelegate, $http, $cookies, $stateParams) {
  
  CommonFn($scope, $rootScope, $stateParams);
  
  $scope.tabsStatus = { 'currentIndex':0 };
  mEvent.GetConstantXML(); //获取XML配置文件

  //[GET] 是否初始化过简历
  // (function(){
  //   function httpCallBack(rs){
  //     $rootScope.isInitBaseInfo = rs.body;
  //     if($rootScope.isInitBaseInfo){
  //       $scope.tabsStatus = { 'currentIndex':1 };
  //       $ionicTabsDelegate.$getByHandle('RegisterTab').select(1);
  //     }
  //   }
  //   var httpFn = function(){
  //     mEvent.http("GET", "/api/Company/Enterprise/IsInitBaseInfo", true, httpCallBack);
  //   }
  //   httpFn();$rootScope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  // })();

  // [GET] 基本信息
  (function(){
    function httpCallBack(rs){
      httpFn = undefined;
      $rootScope.UserBaseInfor = rs.body;
      $rootScope.EnterpriseBaseInfo = rs.body;
      // Date 数据加载完成
      $timeout(function(){ $rootScope.$broadcast('isDateLoaded', true); },0);
      mEvent.GetConstantXML(); //获取XML配置文件
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Enterprise/GetEnterpriseBaseInfo", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  
  // [Click] 切换步骤
  $scope.goStep = function(n){
    $scope.tabsStatus.currentIndex = n;
    $ionicTabsDelegate.$getByHandle('RegisterTab').select(n);
  }

  // [GET] 获取营业执照 状态
  $scope.RefreshBusinessStatus = function(){
    function httpCallBack(rs){
      //Status(状态：未审核=0, 已通过=1, 未通过=2, 处理中=3)} 
      $rootScope.BusinessResult = rs.body;
      if(rs.body.Status==0||rs.body.Status==2){
        $scope.goStep(2);
      }
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Enterprise/GetBusinessLicenseAuthenticationDisposeStatus", true, httpCallBack, {Id:''});
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }
  $scope.RefreshBusinessStatus();


  //[POST] 营业执照 提交认证
  $scope.uploadImg = function(files){
      var defered = $q.defer();
      var fileLenght = files.length;
      angular.forEach(files, function(fileItem, fileIndex){
          var reader = new FileReader()
          reader.onload = function(e) {
              // [POST] upload上传图片
              (function(){
                function httpCallBack(rs){
                  $scope.datas = { 'BusinessLicense' : rs.body};
                  // [POST] 上传营业执照（文件名，营业执照号码）
                  (function(){
                    function httpCallBack2(rs){
                      if(rs.code==0){
                        // [POST] 申请审核
                        (function(){
                          function httpCallBack3(rs){
                            $scope.RefreshBusinessStatus();
                            // 上传营业执照成功后
                            $scope.goStep(2);
                          }
                          var httpFn3 = function(){
                            mEvent.http("POST", "/api/Company/Enterprise/ApplyAuthentication", true, httpCallBack3, '');
                          }
                          httpFn3();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn3();}catch(e){ console.log("login error!"); }} });
                        })();
                        // end [POST] 申请审核
                      }
                    }
                    var httpFn2 = function(){
                      mEvent.http("POST", "/api/Company/Enterprise/UpdateBusinessLicense", true, httpCallBack2, $scope.datas);
                    }
                    httpFn2();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn2();}catch(e){ console.log("login error!"); }} });
                  })();
                }
                var httpFn = function(){
                  mEvent.http("POST", "/api/Common/UploadFile/UploadImgBase64", true, httpCallBack, { Base64:e.target.result });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
          }
          reader.readAsDataURL(fileItem);
      });
  }

  // [Click] Tab Selector
  $scope.OnSelect = function(clickIndex){
    if(clickIndex==0){
      if($scope.tabsStatus.currentIndex!=2){
        $ionicTabsDelegate.$getByHandle('RegisterTab').select(0);
      }else{
        $ionicTabsDelegate.$getByHandle('RegisterTab').select(2);
      }
    }else{
      $ionicTabsDelegate.$getByHandle('RegisterTab').select($scope.tabsStatus.currentIndex);
    }
    mEvent.GetConstantXML();
    $scope.isErrorForSubmit = false;
  }

  // [POST] (1)更新基本信息(企业)
  $scope.submitForm_inform = function(isValid) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
      $scope.isErrorForSubmit = false;
      //验证成功后提交后跳转
      (function(){
        function httpCallBack(res){
          httpFn = undefined;
          if(res.code==0){
            $rootScope.isInitBaseInfo = true;
            
            // 更新基本信息成功后
            $scope.goStep(1);

          }
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/Company/Enterprise/UpdateInfo", true, httpCallBack, $rootScope.EnterpriseBaseInfo);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

})


// 求职者 首页
.controller('IndexCtrl', function($scope, $rootScope, $q, $stateParams, $ionicScrollDelegate, advEvent, $ionicBackdrop, GetUserImfor, ComeFrom, Algorithm, $timeout, $interval, mEvent, DeviceRecord, $state, $ionicSlideBoxDelegate, $ionicPopup, $cookies, serviceMath, $ionicSideMenuDelegate, $http, $ionicModal, $ionicHistory) {
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  mEvent.trackPage();
  advEvent.init();

  $rootScope.CurrentURL = "/#/tab/index";

  //Left Side Scroll Height Value
  $scope.leftScrollHeight = (document.body.scrollHeight - 220)+"px";
  
  //------------ 城市区域 ------------
  $scope.backToTop = function(){
    $ionicScrollDelegate.$getByHandle('indexScroll').scrollTop(true);
  }
  // $ionicScrollDelegate.$getByHandle('indexScroll').getScrollPosition();

  //设置默认城市
  $scope.CurrentCityValue = $cookies.get("cityCode-value") || "汕头市";
  $scope.CurrentCityKey = $cookies.get("cityCode-key") || "00000000000000000000000000440500";
  $cookies.put("cityCode-key", $scope.CurrentCityKey, {'expires': mEvent.setExpireDate(), 'path': '/'});
  
  //[XML] 城市列表
  $scope.CityLists = "正在读取城市数据..";
  require(['xml2json'],function(){
    if(!localStorage.getItem("AreaXMLJson")){
      $http.get("/Config/Area.xml",{
        transformResponse:function(cnv){
          var x2js = new X2JS(); //xml to json
          var aftCnv = x2js.xml_str2json(cnv);
          return aftCnv;
        }
      }).success(function(rs){
        $scope.CityLists = rs.Area.City;
        localStorage.setItem("AreaXMLJson", JSON.stringify($scope.CityLists));
      });
    }else{
      $scope.CityLists = JSON.parse(localStorage.getItem("AreaXMLJson"));
    }
  });
  //end [XML] 城市列表


  // [Init] 首页-职位列表
  var JobList_PageIndex = 0, JobList_PageCount = 10;
  $scope.refreshJob = function(){
    function httpCallBack(rs){
      $rootScope.responseJob = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Job/GetHomeJobList?AreaId="+$scope.CurrentCityKey +
                         "&PageIndex=" + JobList_PageIndex +
                         "&PageSize=" + JobList_PageCount, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }
  $scope.refreshJob();


  // [Get] 首页-热搜职位
  $scope.GetHotJob = function(){
    function httpCallBack(rs){

      $scope.HotSearchJobLists = rs.body;
      // 点击职位名，跳转到 搜索列表
      $scope.ClickHotJob = function(keyword){
        $rootScope.search_index = 0;
        $rootScope.search_keyword = keyword;
        $http({
          method:"GET",
          url:$rootScope.app_config.api + "/api/Common/Job/GetJobList?pageIndex="+$rootScope.search_index+"&mode=1&keyword=" + keyword + "&AreaIds=" + $scope.CurrentCityKey + "&type=&welfares=&pay=&nature="
        }).success(function(rs){
          mEvent.trackEvent("求职者","首页热搜职位","关键字:"+keyword);
          $rootScope.JobResponse = rs.body;
          if($rootScope.JobResponse.length >= 20){ $rootScope.jobs_Loaded = true; }else{ $rootScope.jobs_end = true;}
          $ionicScrollDelegate.resize();
        })
        $state.go('tab.search',{ keywords : keyword });
      }
      //end Click
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Common/GetHotSerachKeyword?area=" + $scope.CurrentCityKey, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }

  // [Click] 热搜职位
  if(!$scope.HotSearchJobLists){
    $scope.GetHotJob();
  }
  

  //【第一次进入选择城市】
  if(!$cookies.get("FirstSelectCity")){
    $scope.datas = {};

    $ionicModal.fromTemplateUrl("tab-index-modalSelectCity.html",{
      scope:$scope,
    }).then(function(modal){
      $scope.modalSelectCity = modal;
      $scope.modalSelectCity.show();
      //选择城市 Click
      $scope.selectCity = function(){
        $scope.modalSelectCity.hide();
        $cookies.put("FirstSelectCity", true, {'expires': mEvent.setExpireDate(), 'path': '/'});
        
        $cookies.put("cityCode-key", $scope.datas.selected._key, {'expires': mEvent.setExpireDate(), 'path': '/'});
        $scope.CurrentCityKey = $cookies.get("cityCode-key");

        $cookies.put("cityCode-value", $scope.datas.selected._value, {'expires': mEvent.setExpireDate(), 'path': '/'});
        $scope.CurrentCityValue = $cookies.get("cityCode-value");

        $rootScope.$broadcast("advAction",true);

        $scope.refreshJob();
        // $rootScope.addAdv();
        // $scope.advDisplay = true;

      }
    })
  }else{ // 已经选择过城市了
    // $scope.advDisplay = true;
    $scope.CurrentCityKey = $cookies.get("cityCode-key");
    $cookies.put("cityCode-key", $scope.CurrentCityKey, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $scope.CurrentCityValue = $cookies.get("cityCode-value");
    $cookies.put("cityCode-value", $scope.CurrentCityValue, {'expires': mEvent.setExpireDate(), 'path': '/'});
  }


  //点击选择城市(Click)
  $scope.chooseCity = function(cityKey, cityValue){

    $cookies.remove('cityCode-key');
    $cookies.remove('cityCode-value');

    $cookies.put("cityCode-key", cityKey, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $scope.CurrentCityKey = $cookies.get("cityCode-key");
    $cookies.put("cityCode-value", cityValue, {'expires': mEvent.setExpireDate(), 'path': '/'});
    $scope.CurrentCityValue = $cookies.get("cityCode-value");

    $scope.$broadcast("changeCity", $scope.CurrentCityKey);
    $scope.refreshJob();
  }

  //------------ END 城市区域 ------------

  // 福利列表（差集算法）
  Algorithm.difference();

  // 幻灯片Banner
  $http.get($rootScope.app_config.api+"/api/Common/Article/GetSlideList").success(function(res){
    $scope.banners = res.body;
    $ionicSlideBoxDelegate.update();
  });

  // 首页-搜索框
  $scope.searchKeyword = function(keyword){
    if(!keyword){
      keyword = '';
    }else{
      (function(){
        function httpCallBack(res){
          httpFn = undefined;
          mEvent.trackEvent("求职者","搜索页(职位)","关键字搜索:"+keyword);
          $rootScope.JobResponse = res.body;
          if($rootScope.JobResponse.length >= 20){ $rootScope.jobs_Loaded = true; }else{ $rootScope.jobs_end = true;}
          $ionicScrollDelegate.resize();
        }
        var httpFn = function(){
          mEvent.http("GET", "/api/Common/Job/GetJobList?pageIndex=0&mode=1&keyword=" + keyword + "&AreaIds=" + $cookies.get("cityCode-key") + 
              "&type=&welfares=&pay=&nature=", false, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }

    $rootScope.search_keyword = keyword;
    // $state.go('tab.search',{ keywords : keyword });
    
    window.location.href = $rootScope.app_config.links + "/#/tab/search?keyword=" + keyword;

  }

  // 回车事件(首页)
  $scope.searchKeydown = function(e, text){                
    var keycode = window.event ? e.keyCode : e.which;
    if(keycode==13){
      $scope.searchKeyword(text);
    }
  }
  // end 回车事件


})

// 公告列表
.controller('NoticeCtrl', function($scope, $rootScope, $cookies, $stateParams, mEvent, $http, $ionicSlideBoxDelegate){

  CommonFn($scope, $rootScope, $stateParams);
  if(!$rootScope.NoticeList && $cookies.get("cityCode-key")){
    (function(){
      function httpCallBack(rs){
        $rootScope.NoticeList = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Article/GetNotice?areaId=" + $cookies.get("cityCode-key"), false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  
  $scope.GoNoticeDetail = function(id){
    window.location.href = $rootScope.app_config.links + '/#/' + $rootScope.entry + '/index/notice/detail/' + id;
  }

})

.controller('NoticeDetailCtrl', function($scope, $rootScope, $cookies, $stateParams, ComeFrom, mEvent, $http, $ionicSlideBoxDelegate){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true);
  // console.log($rootScope.StateRoutes);

  // $scope.item = { 'Name':'asdf', 'ReleaseTime':'-', 'Content':'-' }
  $scope.InitItem = function(name, releaseTime, content){
    $scope.item = { 'Name':name, 'ReleaseTime':releaseTime, 'Content':content }
  }

  if(!$rootScope.NoticeList){
    (function(){
      function httpCallBack(rs){
        // ----------------------------------------------
        $rootScope.NoticeList = rs.body;
        angular.forEach($rootScope.NoticeList, function(data){
          if(data.Id==$stateParams.Id){
            $scope.InitItem(data.Name, data.ReleaseTime, data.Content);
          }
        });
        // ----------------------------------------------
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Article/GetNotice?areaId=" + $cookies.get("cityCode-key"), false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }else{
    angular.forEach($rootScope.NoticeList, function(data){
      if(data.Id==$stateParams.Id){
        $scope.InitItem(data.Name, data.ReleaseTime, data.Content);
      }
    });
  }

  
})

.controller('EduTrainCtrl', function($scope, $rootScope, $stateParams, mEvent, $http, $ionicSlideBoxDelegate){
  
  CommonFn($scope, $rootScope, $stateParams);

  var isSchool = ($stateParams.eduType == 'school');
  var isSkill = ($stateParams.eduType == 'skill');

  $scope.isActive = { "school":isSchool, "skill":isSkill };

  $scope.eduTag = isSchool ? '学校' : '技能';
  $scope.eduTitle = isSchool ? '学历教育' : '技能培训';

  // //点击Tab
  // $scope.changeJobTyep = function(jobType){
  //   switch(jobType){
  //     case 1:$scope.isActive={"school":true,"skill":false};break;
  //     case 2:$scope.isActive={"school":false,"skill":true};break;
  //     default:break;
  //   }
  // };

  //[GET] (学历教育)学校列表
  if(isSchool){
    (function(){
      function httpCallBack(res){
        $rootScope.eduSchoolList = res.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Education/GetEducationSchool", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  //[GET] (技能培训)技能列表
  if(isSkill){
    (function(){
      function httpCallBack(res){
        $rootScope.eduSkillList = res.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Article/GetTrain", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

})

.controller('EduTrainArticleCtrl', function($scope, $rootScope, mEvent, $http, $timeout, $ionicModal, $ionicPopup, $ionicPopover, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);

  $scope.datas = {
    Name:"汕头市会计人员远程继续教育培训招生简章",
    Content:"<p>经汕头市财政局授权，汕头市联博教育培训中心获得受理2014年及以前年度汕头市会计人员继续教育远程培训（会计年审）。该远程教育依托会计网（www.zfyacc.com）开展，会计网同时向汕头市直及各区县（金平、龙湖、潮阳、潮南）开通，欢迎广大学员选择网上学习。会计网24小时开放，方便学员自主安排时间参与学习和考核，真正让会计人员享受到足不出户、轻松便捷地继续教育学习。</p>"+
            "<p>经汕头市物价局批准，远程继续教育培训费为每期70元。</p>"+
            "<br/>"+
            "<p>▲ 联博教育培训中心地址：汕头市高新区科技中路11号经发大厦6楼601单元</p>"+
            "<p>▲ 会计年审操作流程</p>"+
            "<p>访问会计网 www.zfyacc.com → 注册 → 登陆 → 充值中心为账号充值 → 购买课程 → 在线学习 → 在线考试 → 成绩查询 → 考试通过 → 财政局备案、完成年审</p>"+
            "<p>▲ 我们提供如下购买方式：</p>"+
            "<p>1、到联博教育培训中心进行现场购买，同时购买者需提供会计从业资格证和身份证复印件；</p>"+
            "<p>2、如果不方便到现场购买，请详情咨询客服人员</p>"+
            "<p>▲ 购卡服务热线：0754-81880088，189 9896 8881</p>"+
            "<p>QQ咨询：2533877118</p>"+
            "<br/>"+
            "<p>继续教育情况查询：</p>"+
            "<p>请您登陆：广东省会计信息服务平台（http://210.76.65.189:8080/gdkjcms/）→ 查询服务 → 从业诚信档案查询 → 输入证件号（身份证） → 证书编号</p>"
  }

})

.controller('EduTrainSkillDetailCtrl', function($scope, $rootScope, mEvent, $http, $q, $timeout, $ionicModal, $ionicPopup, $ionicPopover, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);

  if($rootScope.eduSkillList){
    angular.forEach($rootScope.eduSkillList, function(item){
      if(item.Id==$stateParams.Id){
        $rootScope.eduSkillDetail = item;
      }
    });
  }else{
    window.location.href = $rootScope.app_config.links + "/#/tab/index/eduTrain";
  }
})

.controller('EduTrainSchoolDetailCtrl', function($scope, $rootScope, mEvent, $http, $q, $timeout, $ionicModal, $ionicPopup, $ionicPopover, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);
  
  // console.log($stateParams.Id);
  if($rootScope.eduSchoolList){

    angular.forEach($rootScope.eduSchoolList, function(item){
      if(item.Id==$stateParams.Id){
        $rootScope.eduSchoolDetail = item;
        // console.log(item);

        // 获取有Level类别的个数
        var tempC = [];
        var tempString="";
        angular.forEach(item.Courses, function(itemCourses, Fatherindex){
          if(!(tempString.split(",").indexOf(itemCourses.Level)>=0)){
            tempString += itemCourses.Level + ",";
            tempC.push({ "Level":itemCourses.Level,"Value":[] })
          }
        })
        // end
        
        // 将数据重新排序
        angular.forEach(item.Courses, function(itemCourses, Fatherindex){
          angular.forEach(tempC, function(itemTempC, Childindex){
            // console.log(itemTempC);
            if(itemTempC.Level==itemCourses.Level){
              tempC[Childindex].Value.push({
                Id:itemCourses.Id,
                Name:itemCourses.Name,
                Subhead:itemCourses.Subhead,
                Content:itemCourses.Content
              });
            }
          });
          if(Fatherindex==item.Courses.length-1){
            // console.log("到底了");
            // console.log(tempC);
            $scope.eduTrainDetailList = tempC;
          }
        });
        // end

      }
    });
  }else{

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        $rootScope.eduSchoolList = res.body;
        // console.log(res.body);
        angular.forEach($rootScope.eduSchoolList, function(item){
          if(item.Id==$stateParams.Id){
            $rootScope.eduSchoolDetail = item;
            // console.log(item);

            // 获取有Level类别的个数
            var tempC = [];
            var tempString="";
            angular.forEach(item.Courses, function(itemCourses, Fatherindex){
              if(!(tempString.split(",").indexOf(itemCourses.Level)>=0)){
                tempString += itemCourses.Level + ",";
                tempC.push({ "Level":itemCourses.Level,"Value":[] })
              }
            })
            // end
            
            // 将数据重新排序
            angular.forEach(item.Courses, function(itemCourses, Fatherindex){
              angular.forEach(tempC, function(itemTempC, Childindex){
                // console.log(itemTempC);
                if(itemTempC.Level==itemCourses.Level){
                  tempC[Childindex].Value.push({
                    Id:itemCourses.Id,
                    Name:itemCourses.Name,
                    Subhead:itemCourses.Subhead,
                    Content:itemCourses.Content
                  });
                }
              });
              if(Fatherindex==item.Courses.length-1){
                // console.log("到底了");
                // console.log(tempC);
                $scope.eduTrainDetailList = tempC;
              }
            });
            // end

            // var defered = $q.defer();
            // defered.promise.then(function(msg){
            //   alert("I promise this " + msg);
            // });
            // defered.resolve("the Message");

          }
        });
      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Education/GetEducationSchool", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();

  }

  //简介隐藏，显示更多
  $timeout(function(){
    if(angular.element(document.querySelector(".tabContent")).html().length>200){
      $scope.hasMore = true;
      $scope.isHide = true;
      $scope.toggleTabContent = function(){
        $scope.isHide = !$scope.isHide;
      }
    };
  },200);

  //显示介绍
  $scope.showIntroduce = function(itemIntroduce){
    $ionicModal.fromTemplateUrl("tab-index-eduTrain-schoolDetail-modalAdd.html",{
      scope:$scope,
    }).then(function(modal){
      $rootScope.modal = modal;
      $scope.modal.show();
      $scope.itemIntroduce = itemIntroduce;
    })
  }
  
  //显示收费标准
  $scope.showCost = function(){
    $ionicModal.fromTemplateUrl("tab-index-eduTrain-schoolDetail-cost-modalAdd.html",{
      scope:$scope,
    }).then(function(modal){
      $rootScope.modal = modal;
      $scope.modal.show();
    })
  }

  $scope.tabSchoolContent_0 = true;
  $scope.tabSchool = function(n){
    eval("$scope.tabSchoolContent_" + n + "= " + "!$scope.tabSchoolContent_" + n);
  }


})

.controller('EduTrainClassDetailCtrl', function($scope, $rootScope, mEvent, $http, $ionicPopup, $ionicModal, $cookies, $stateParams, ionicDatePicker, $filter){

  CommonFn($scope, $rootScope, $stateParams);

  $scope.SchoolId = $stateParams.Id;
  $scope.SchoolClassId = $stateParams.classId;

  if($rootScope.eduSchoolDetail){
    // console.log($rootScope.eduSchoolDetail.Courses);
    angular.forEach($rootScope.eduSchoolDetail.Courses, function(item){
      if(item.Id==$scope.SchoolClassId){
        $scope.eduSchoolClass = item;
        // console.log(item);
      }
    });
  }else{
    (function(){
      function httpCallBack(res){
        $scope.eduSchoolClass = res.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Education/GetCourse/" + $stateParams.classId, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  //通用日历控件(封装)
  $scope.commonDatePicker = function(DatePicker, SelectedDate, DefaultDate){
    eval("$scope."+DatePicker+"=function(){"+
            "ionicDatePicker.openDatePicker({"+
                "callback: function (val) {"+
                    "$scope."+SelectedDate+"= new Date(val);"+
                    "$scope."+SelectedDate+"_format = $filter('date')($scope."+SelectedDate+", 'yyyy-MM-dd')"+
                "},"+
                "showTodayButton:false,"+
                "from:new Date(new Date().setFullYear(new Date().getFullYear()-60)),to: new Date(),"+
                // "inputDate: $scope."+SelectedDate+" ? $scope."+SelectedDate+" : new Date('"+DefaultDate.year+"', ('"+DefaultDate.mouth+"'-1), '"+DefaultDate.date+"'),"+
                "disableWeekdays: [0], closeOnSelect: false, templateType: 'popup'"+
            "});"+
         "}");
  }

  // setWebTokenAndApplyForm(token)   //本地JS方法，原生调用，传 token 参数给 web，并跳转到 我要报名
  // setWebToken(token)               //本地JS方法，原生调用，传 token 参数给 web
  // (删除)JsPhone.setLoginToken(token)     //原生方法，本地JS调用，APP获得 token
  // JsPhone.login()                  //原生方法，本地JS调用，判断登录

  // [Click] 学历教育 - 我要报名
  $rootScope.showApplyForm = function(){

    // 判断原生APP
    if($rootScope.isApp){
      if(!$cookies.get('Ticket')){
        window.JsPhone.login();
      }else{
        window.location.href = $rootScope.app_config.links + '/#/tab/index/eduTrain/schoolDetail/' + $scope.SchoolId + '/classDetail/' + $scope.SchoolClassId + '/add';
      }
    }else{
      // 非原生，直接跳转
      // window.location.href = $rootScope.app_config.links + "/#/" + $rootScope.entry +"/login";
      window.location.href = $rootScope.app_config.links + '/#/tab/index/eduTrain/schoolDetail/' + $scope.SchoolId + '/classDetail/' + $scope.SchoolClassId + '/add';
    }
    // end

    // $ionicModal.fromTemplateUrl("tab-index-eduTrain-schoolDetail-classDetail-modalAdd.html",{
    //   scope:$rootScope,
    // }).then(function(modal){

    //   if($cookies.get('Ticket')){

    //     $rootScope.modal = modal;
    //     $rootScope.modal.show();

    //     $scope.datas = { "Gender":"男" }
    //     //性别初始化
    //     if($scope.datas.Gender=="男"){
    //       $scope.sex = {male:true,female:false};
    //     }else if($scope.datas.Gender=="女"){
    //       $scope.sex = {male:false,female:true};
    //     }else{
    //       $scope.sex = {male:false,female:false};
    //     }
    //     //修改性别
    //     $scope.selectGender = function(sex){
    //       $scope.datas.Gender = sex;
    //       $scope.sex.male = !$scope.sex.male;
    //       $scope.sex.female = !$scope.sex.male;
    //     }
    //     $scope.commonDatePicker("bornDatePicker","bornSelectedDate",$scope.bornDefaultDate);
        
    //     //[POST] 我要报名
    //     $scope.applyDatas = {
    //       'CourseId':'', 'Name':'', 'Gender':'',
    //       'Birthday':'', 'Phone':'', 'Education':'', 'Content':''
    //     }
    //     $scope.submitForm = function(isValid){
          
    //       if(!isValid) { $scope.isErrorForSubmit = true; }else{

    //         $scope.applyDatas.CourseId = $stateParams.classId;
    //         $scope.applyDatas.Birthday = $filter('date')($scope.bornSelectedDate,'yyyy-MM-dd') ? $filter('date')($scope.bornSelectedDate,'yyyy-MM-dd') + " 00:00:00" : ""; // + " 00:00:00"
    //         (function(){
    //           function httpCallBack(res){
    //             if(res.body){
    //               $ionicPopup.alert({
    //                 title: '提示', template: '提交申请成功!', okText:'确定'
    //               }).then(function(res) {
    //                 $rootScope.modal.hide();
    //               });
    //             }else{
    //               $ionicPopup.alert({
    //                 title: '提示', template: '提交失败，请联系管理员!', okText:'确定'
    //               }).then(function(res) {
    //                 $rootScope.modal.hide();
    //               });
    //             }
    //           }
    //           var httpFn = function(){
    //             mEvent.http("POST", "/api/Common/Education/CourseApply", true, httpCallBack, $scope.datas);
    //           }
    //           httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    //         })();
    //       }
    //     }

    //   }

    // });

  }

})

.controller('EduTrainClassDetailAddCtrl', function($scope, $rootScope, $ionicHistory, mEvent, $http, $ionicPopup, $ionicModal, $cookies, $stateParams, ionicDatePicker, $filter){
  CommonFn($scope, $rootScope, $stateParams);

  //通用日历控件(封装)
  $scope.commonDatePicker = function(DatePicker, SelectedDate, DefaultDate){
    eval("$scope."+DatePicker+"=function(){"+
            "ionicDatePicker.openDatePicker({"+
                "callback: function (val) {"+
                    "$scope."+SelectedDate+"= new Date(val);"+
                    "$scope."+SelectedDate+"_format = $filter('date')($scope."+SelectedDate+", 'yyyy-MM-dd')"+
                "},"+
                "showTodayButton:false,"+
                "from:new Date(new Date().setFullYear(new Date().getFullYear()-60)),to: new Date(),"+
                // "inputDate: $scope."+SelectedDate+" ? $scope."+SelectedDate+" : new Date('"+DefaultDate.year+"', ('"+DefaultDate.mouth+"'-1), '"+DefaultDate.date+"'),"+
                "disableWeekdays: [0], closeOnSelect: false, templateType: 'popup'"+
            "});"+
         "}");
  }

  $scope.datas = { "Gender":"男" }
  //性别初始化
  if($scope.datas.Gender=="男"){
    $scope.sex = {male:true,female:false};
  }else if($scope.datas.Gender=="女"){
    $scope.sex = {male:false,female:true};
  }else{
    $scope.sex = {male:false,female:false};
  }
  //修改性别
  $scope.selectGender = function(sex){
    $scope.datas.Gender = sex;
    $scope.sex.male = !$scope.sex.male;
    $scope.sex.female = !$scope.sex.male;
  }
  $scope.commonDatePicker("bornDatePicker","bornSelectedDate",$scope.bornDefaultDate);
  
  //[POST] 我要报名
  $scope.applyDatas = {
    'CourseId':'', 'Name':'', 'Gender':'',
    'Birthday':'', 'Phone':'', 'Education':'', 'Content':''
  }
  $scope.submitForm = function(isValid){
    
    if(!isValid) { $scope.isErrorForSubmit = true; }else{

      $scope.applyDatas.CourseId = $stateParams.classId;
      $scope.applyDatas.Birthday = $filter('date')($scope.bornSelectedDate,'yyyy-MM-dd') ? $filter('date')($scope.bornSelectedDate,'yyyy-MM-dd') + " 00:00:00" : ""; // + " 00:00:00"
      (function(){
        function httpCallBack(res){
          if(res.body){
            $ionicPopup.alert({
              title: '提示', template: '提交报名成功!', okText:'确定'
            }).then(function(res) {
              // 如果是原生APP，则调用APP的回退方法
              ($rootScope.isApp) ? window.JsPhone.goBack() : $ionicHistory.goBack();
            });
          }else{
            $ionicPopup.alert({
              title: '提示', template: '提交失败，请联系管理员!', okText:'确定'
            }).then(function(res) {
              ($rootScope.isApp) ? window.JsPhone.goBack() : $ionicHistory.goBack();
            });
          }
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/Common/Education/CourseApply", true, httpCallBack, $scope.datas);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

})


.controller('JobDetailCtrl', function($scope, $rootScope, Algorithm, ComeFrom, mEvent, $q, $location, $cookies, $stateParams, GetUserImfor, $timeout, $http, $ionicPopover, $ionicModal, $ionicHistory, $ionicPopup, serviceMath){

  $scope.isPreview = $stateParams.isPreview;

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true); // true 表示带参数
  mEvent.GetConstantXML();

  $rootScope.backToUrl = $location.$$path;
  if($rootScope.CurrentURL=="/#/tab/index"){ }

  //福利列表（差集算法）
  Algorithm.difference();
  
  var defered = $q.defer();
  $rootScope.jobDetailData = undefined;//[];

  // [GET] 判断是否有参加活动
  (function(){
    function httpCallBack(rs){
      $scope.isHasJobSubhead = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Job/GetJobSubhead?jobId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  

  $scope.getJobDetail = function(){
    //[GET]职位详情
    (function(){
      function httpCallBack(res){
        
        if(res.code!=0){
          $scope.errMsg = res.msg;
          $rootScope.$broadcast('errMsg', $scope.errMsg);
        }else{

          if($cookies.get("Ticket")){
            $scope.ShowContact = true;
          }

          $rootScope.jobDetailData = res.body;
          if($rootScope.jobDetailData.ContactManPhone){
            $rootScope.jobDetailData.ContactManPhone = mEvent.RegPhone($rootScope.jobDetailData.ContactManPhone);
          }
          defered.resolve($rootScope.jobDetailData.ContactManPhone);
          $rootScope.$broadcast("shareData",$rootScope.jobDetailData);
          $rootScope.$broadcast("LoadedJobDetail", $rootScope.jobDetailData);
        }

        // [Click] 右上角菜单(List)
        $scope.isRightMenu = false;
        $scope.clickEvent_RightMenu = function(){ $scope.isRightMenu = !$scope.isRightMenu; }
        // [Click] 右上角返回首页
        $scope.clickEvent_returnIndex = function(){ window.location.href = $rootScope.app_config.links + "/#/tab/index"; }

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJob?jobId=" + $stateParams.Id, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  $scope.getJobDetail();

  if($stateParams.Id!=""){

    $scope.ApplyJobText = '申请岗位';

    //[Init] 添加被查看次数
    $scope.userId = '';
    $scope.AddReadJob = function(){

      // 判断流量来源并添加查看次数
      if($stateParams.Type=="index"){ $scope.source = "Mobile - Home"; }
      if($stateParams.Type=="searchJob"){ $scope.source = "Mobile - Search"; }
      if($stateParams.Type=="searchCompany"){ $scope.source = "Mobile - Search"; }
      if($stateParams.Type=="searchOther"){ $scope.source = "Mobile - Search"; }
      if($stateParams.Type=="jobcate"){ $scope.source = "Mobile - JobCate"; }
      if($stateParams.Type=="near"){ $scope.source = "Mobile - Near"; }
      if($stateParams.Type=="collect"){ $scope.source = "Mobile - Collect"; }
      if($stateParams.Type=="record"){ $scope.source = "Mobile - Record"; }

      $scope.userId = $rootScope.userImfor ? $rootScope.userImfor.Id : '';
      $scope.source = $scope.source || '';
      //[POST] 添加被查看次数
      $http({
        method:"POST", url:$rootScope.app_config.api + "/api/Common/Job/AddReadRecord",
        data:{ JobId: $stateParams.Id, UserId: $scope.userId, Source: $scope.source }
      }).success(function(rs){
        // console.log(rs);
      });
    }
    //end [Init] 添加被查看次数

    if($cookies.get("Ticket")){

      mEvent.CheckLoginRole();
      $rootScope.$on('CheckLoginRole', function(evt, d){
          if(d!='Personal'){
            $scope.IsNotPersonal = true;
          }
      });


      var LoadJob_Broadcast = $rootScope.$on("LoadedJobDetail", function(ev, ds){
        if(!$rootScope.userImfor){

          // mEvent.CheckLoginRole();
          // $rootScope.$on('CheckLoginRole', function(evt, d){
          //   if(d=='Personal'){ GetUserImfor.GetPersonal(true);}
          //   if(d=='Company'){ GetUserImfor.GetCompany(true);}
          // });

          var GetusrBroadcast = $rootScope.$on("GetUserImfor",function(event, data){
            GetusrBroadcast();
            $scope.AddReadJob(); // 添加查看次数
          });
        }else{
          $scope.AddReadJob();
        }
        LoadJob_Broadcast(); //注销广播(职位详情)
        
        // mEvent.CheckLoginRole();
        $rootScope.$on('CheckLoginRole', function(evt, d){
          if(d=='Personal' && $rootScope.jobDetailData){
            // 上架时
            if($rootScope.jobDetailData.IsPutaway){
              //[GET] 判断是否申请过职位
              (function(){
                function httpCallBack(rs){
                  httpFn = undefined;
                  $scope.IsJobApply = rs.body;
                  if($scope.IsJobApply){ $scope.ApplyJobText = '已申请'; }else{ $scope.ApplyJobText = '申请岗位'; }
                }
                var httpFn = function(){
                  mEvent.http("GET", "/api/JobSeeker/Job/IsApplyJob?jobId=" + $rootScope.jobDetailData.Id, true, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
            }else{
              $scope.ApplyJobText = '职位已下架';
            }

            //[GET] 判断是否收藏过职位
            (function(){
              function httpCallBack(rs){
                httpFn = undefined;
                $scope.IsJobCollect = rs.body;
              }
              var httpFn = function(){
                mEvent.http("GET", "/api/JobSeeker/Job/IsCollectJob?jobId=" + $rootScope.jobDetailData.Id, true, httpCallBack);
              }
              httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            })();
          }
        });
      
      });

    }else{
      $scope.AddReadJob(); // 添加查看次数
    }

  }
  
  $scope.CheckLoginAndCallBack = function(){
    if(!$cookies.get("Ticket")){
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
      $rootScope.CurrentURL = "/#/tab/job/detail/" + $stateParams.Id;
      return false;
    }
  }

  $scope.ShowContactClick = function(){
    $scope.CheckLoginAndCallBack();
    // window.location.href = $rootScope.app_config.links + "/#/tab/login";
    // $rootScope.CurrentURL = "/#/tab/job/detail/" + $stateParams.Id;
  }

  

  //[Click] 选择简历(申请职位)
  $scope.SelectResume = function(){
    
    $scope.CheckLoginAndCallBack();

    // [GET] 简历列表
    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        $rootScope.MyResumeList = rs.body;
        
        // 判断是否有简历
        if($rootScope.MyResumeList.length<0){
          var AskAgain_Popup = $ionicPopup.confirm({
            title: '提示', template: '申请职位需要完善基本信息与简历！',
            buttons:[
              {
                text:'马上完善', type: 'button-small button-positive',
                onTap: function(e){
                  window.location.href = $rootScope.app_config.links + "/#/" + $rootScope.entry + "/my";
                }
              },
              { text:'先看看', type: 'button-small' }
            ]
          });
          return false;
        }
        // end 判断是否有简历
        var SelectResume_Popup = $ionicPopup.confirm({
          title: '选择一份简历',
          template: '<div class="select-tip">简历完整度大于60%即可申请职位</div>'+
                    '<div class="list select-list" style="margin-bottom:-10px;">'+
                      '<div class="select-resume-list" ng-repeat="item in MyResumeList">'+
                        '<a href="javascript:;" class="item" ng-click="ApplyJob(item)" ng-class="{true:\'disabled\'}[item.Proportion<0.6]">'+
                          '<i class="ion-ios-list-outline"></i>{{item.Title}}'+
                          '<span>{{item.Proportion*1000/10}}%</span>'+
                        '</a>'+
                        '<a ng-href="#/tab/my/resumeDetail/{{item.Id}}" ng-click="ClosePopup()" class="select-resume-edit">编辑</a>'+
                      '</div>'+
                    '</div>',
          buttons:[{ text:'返回',type: 'button-small' }]
        });

        // 关闭弹窗
        $rootScope.ClosePopup = function(){
          SelectResume_Popup.close();
        }

        //[POST] 提交职位申请
        $rootScope.ApplyJob = function(resume){
          // 简历完整度大于60%
          if(resume.Proportion>=0.6){

            var AskAgain_Popup = $ionicPopup.confirm({
              title: '提示', template: '确定投递 <b>' + resume.Title + '</b> 简历来申请该职位吗？',
              buttons:[
                {
                  text:'确定', type: 'button-small button-positive',
                  onTap: function(e){
                    $scope.PostDatas = { JobId:$stateParams.Id, ResumeId:resume.Id }
                    SelectResume_Popup.close();
                    $http({
                      method:"POST", headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
                      url:$rootScope.app_config.api+"/api/JobSeeker/Job/ApplyJob",
                      data:$scope.PostDatas
                    }).success(function(rs){
                      if(rs.code==0){
                        $scope.IsJobApply = true;
                        $ionicPopup.alert({ title:'提示', template:'申请成功!' });
                      }else{
                        $ionicPopup.alert({ title:'提示', template:rs.msg + '(' + rs.code + ')' });                
                      }
                    });
                  }
                },
                { text:'取消', type: 'button-small' }
              ]
            });

          }
        }
        //end [POST] 提交职位申请

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Resume/GetResumeList", true, httpCallBack, '');
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }

  //[Click] 私信(求职者->企业)(职位详情)
  $scope.BottomClick_Message = function(){
    mEvent.ShowModelMessages($scope.jobDetailData.EnterpriseName, $scope.jobDetailData.UserId);
  }

  //[收藏职位] Click 提交收藏/取消收藏
  $scope.collectJob = function(){
    
    $scope.CheckLoginAndCallBack();

    var isCollect = 1;
    $scope.IsJobCollect ? isCollect = 2 : isCollect = 1;
    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        if(rs.code==0){
          $scope.IsJobCollect = !$scope.IsJobCollect;
          GetUserImfor.GetPersonal(true);
        }
      }
      var httpFn = function(){
        mEvent.http("POST", "/api/JobSeeker/Job/CollectJob", true, httpCallBack, { JobId: $rootScope.jobDetailData.Id, Ope:isCollect });
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  
})

// 企业详情
.controller('JobCompanyDetailCtrl', function($scope, $rootScope, mEvent, GetUserImfor, ComeFrom, $ionicModal, $cookies, $stateParams, $timeout, $http, $ionicPopover, $ionicHistory, $ionicPopup, serviceMath, serviceLocation){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true);

  if($stateParams.Id!=""){
    // console.log($stateParams.Id);
    if($cookies.get('Ticket')){ $scope.IsLogin = true; }

    // 如果是求职者登录，则判断
    if($rootScope.entry=='tab' && $cookies.get('Ticket') && $cookies.get('s')){
      // [GET] 判断是否已关注
      (function(){
        function httpCallBack(rs){
          $scope.IsCompanyCollect = rs.body;
        }
        var httpFn = function(){
          mEvent.http("GET", "/api/JobSeeker/Enterprise/IsCollectEnterprise?enterpriseId=" + $stateParams.Id, true, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }

    // [POST] 收藏企业
    $scope.CollectCompany = function(bool){
      // Ope：1关注 2取消关注
      var d = { EnterpriseId:$stateParams.Id, Ope: (bool?2:1) }
      function httpCallBack(rs){
        if(rs.code==0){
          $scope.IsCompanyCollect = !$scope.IsCompanyCollect;
        }
      }
      var httpFn = function(){
        mEvent.http("POST", "/api/JobSeeker/Enterprise/CollectEnterprise", true, httpCallBack, d);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    }

    //[Click] 在线留言(求职者->企业)(企业详情)
    $scope.BottomClick_Message = function(){
      mEvent.ShowModelMessages($scope.companyData.Name, $scope.companyData.UserId);
    }


    // [GET] 获取企业信息详情
    $scope.GetCompanyDetail = function(){
      function httpCallBack(res){
        $scope.companyData = res.body;
        $scope.companyDataJobs = res.body.Jobs;
        $scope.companyData.ContactManPhone = mEvent.RegPhone($scope.companyData.ContactManPhone);
        $rootScope.$broadcast('companyDataJobs_onLoadDatas', $scope.companyDataJobs); // 分页必须

        // 获取公司位置
        $scope.companyLocation = res.body.MapLocation.split(",");

        // [Click] 显示幻灯片大图
        $scope.ShowBigImg = function(){
          var template = '<div class="BigImgWrap"><img class="bigimg" src="' + $rootScope.app_config.api + this.item + '"></div>';
          var popover = $ionicPopover.fromTemplate(template,{scope:$rootScope})
          popover.show();
        }

        // [Click] 显示/隐藏企业简介[全文/收起]
        $scope.IsOmit = ($scope.companyData.Intro.length>80);
        $scope.ToggleOmitText = '全文';
        $scope.ToggleOmit = function(){
          $scope.IsOmit ? $scope.ToggleOmitText = '收起' : $scope.ToggleOmitText = '全文';
          $scope.IsOmit = !$scope.IsOmit;
        }

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Enterprise/GetEnterprise?entId=" + $stateParams.Id, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    }
    $scope.GetCompanyDetail();
    // end

  }else{
    alert("ERROR:参数不能为空，请从List进入");
    window.location.href = $rootScope.app_config.links + "/";
  }
  
  //地图设置指定位置
  $scope.$on('map', function(event,data) {
    $timeout(function(){
      serviceLocation.get($scope.companyLocation[0],$scope.companyLocation[1],data);
      var top_left_navigation = new BMap.NavigationControl();
      data.addControl(top_left_navigation);  
    },1500);
  });

})


// 职位搜索页
.controller('SearchCtrl', function($scope, $rootScope, Algorithm, mEvent, $http, $location, $ionicScrollDelegate, $cookies, $timeout, serviceMath, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);

  $rootScope.CurrentURL = "/#/tab/search";
  
  //Toggle List
  $scope.toggleList = function(n){
    eval("$scope.showList_" + n + " = !$scope.showList_" + n);
  }
  
  //config
  $scope.isActive = {"job":true, "company":false, "other":false}
  $scope.inputPlaceholder="请输入职位的名称";
  //点击Tab
  $scope.changeJobTyep = function(jobType){
    $scope.jobs_Loaded = false;
    $scope.companys_Loaded = false;
    $scope.others_Loaded = false;
    $ionicScrollDelegate.resize();
    switch(jobType){
      case 1:(function(){
        $scope.isActive={"job":true, "company":false, "other":false};
        $scope.inputPlaceholder="请输入职位的名称";
      })();break;
      case 2:(function(){
        $scope.isActive={"job":false, "company":true, "other":false};
        $scope.inputPlaceholder="请输入公司的名称";
      })();break;
      case 3:(function(){
        $scope.isActive={"job":false, "company":false, "other":true};
        $scope.inputPlaceholder="请输入职位的名称";
      })();break;
      default:break;
    }
  }
  
  //福利列表（差集算法）
  Algorithm.difference();
  
  //【搜职位-热词】View
  (function(){
    function httpCallBack(res){
      $scope.JobHotWords = res.body;
      // $ionicScrollDelegate.resize();
      // $ionicScrollDelegate.scrollTop();
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Common/GetJobSearchKeyword", false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  
  //【搜公司-热词】View
  (function(){
    function httpCallBack(res){
      $scope.CompanyHotWords = res.body;
      // $ionicScrollDelegate.resize();
      // $ionicScrollDelegate.scrollTop();
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Common/GetCompanySearchKeyword", false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  
  // 判断List长度并设置下滑IsLoading
  $scope.CheckListLength = function(list, typen){
    if(list.length>=20){
      var t = $timeout(function(){
        if(typen==1) $scope.jobs_Loaded = true;
        if(typen==2) $scope.companys_Loaded = true;
        if(typen==0) $scope.others_Loaded = true;
        $scope.$apply();
        $timeout.cancel(t);
      }, 0);
    }else{
      if(typen==1){ $scope.jobs_Loaded = false;$scope.jobs_end = true; }
      if(typen==2){ $scope.companys_Loaded = false;$scope.companys_end = true; }
      if(typen==0){ $scope.others_Loaded = false;$scope.others_end = true; }
    }
  }

  //【搜热词】事件
  $scope.search_index = 0;
  // $rootScope.search_keyword = '';
  $scope.searchHotword = function(keyword, typen){
    $scope.resetOther = false;
    $scope.isShowList = true;
    $rootScope.search_keyword = keyword;

    $scope.searchDatas.inputKeyword = keyword;
    if(keyword){ $location.search('keyword', keyword);}

    (function(){
      function httpCallBack(res){
        httpFn = undefined;
        // $scope.isHideLoading = true;

        if($scope.isActive.job){
          mEvent.trackEvent("求职者","搜索页(职位)","热词搜索");
          $rootScope.JobResponse = res.body;
          if($rootScope.JobResponse.length >= 20){ $scope.jobs_Loaded = true; }
        }
        if($scope.isActive.company){
          mEvent.trackEvent("求职者","搜索页(企业)","热词搜索");
          $rootScope.CompanyResponse = res.body;
          if($rootScope.CompanyResponse.length >= 20){ $scope.companys_Loaded = true; }
        }
        
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJobList?pageIndex=" + $scope.search_index +
            "&mode=" + typen + "&keyword=" + $rootScope.search_keyword + "&AreaIds=" + $cookies.get("cityCode-key") + 
            "'&type=&welfares=&pay=&nature=", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }
  // end 搜热词

  // 下滑加载更多
  $scope.refreshDown = function(listName, typen){
    
    $scope.search_index++;
    // $scope.joblist_loaded = false;
    (function(){
      function httpCallBack(rs){
        // console.log(rs);
        httpFn = undefined;
        $scope.isHideLoading = true;
        $scope.jobs_Loaded = false;
        $scope.companys_Loaded = false;
        $scope.others_Loaded = false;

        if($scope.isActive.job && $rootScope.JobResponse){
          $rootScope.JobResponse = $rootScope.JobResponse.concat(rs.body);
          $scope.CheckListLength(rs.body, 1);
        }
        if($scope.isActive.company && $rootScope.CompanyResponse){
          $rootScope.CompanyResponse = $rootScope.CompanyResponse.concat(rs.body);
          $scope.CheckListLength(rs.body, 2);
        }
        if($scope.isActive.other && $rootScope.OtherResponse){
          $rootScope.OtherResponse = $rootScope.OtherResponse.concat(rs.body);
          $scope.CheckListLength(rs.body, 0);
        }

        $scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
        $ionicScrollDelegate.resize();

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJobList?pageIndex=" + $scope.search_index +
            "&mode=" + typen + "&keyword=" + $rootScope.search_keyword + "&AreaIds=" + $cookies.get("cityCode-key") + 
            "'&type=&welfares=&pay=&nature=", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }
  // end 下滑加载更多


  // 回车事件(搜索页)
  $scope.searchDatas = {};
  if($stateParams.keywords){ $scope.searchDatas.inputKeyword = $stateParams.keywords;}
  $scope.searchKeydown = function(e, text){                
    var keycode = window.event ? e.keyCode : e.which;
    if(keycode==13){
      $scope.searchKeyword(text);
    }
  }
  // end 回车事件


  // 搜索框 searchKeyword
  $scope.datas = {}
  $scope.searchKeyword = function(keyword){
    $scope.search_index = 0;
    $rootScope.search_keyword = keyword;
    if(keyword){ $location.search('keyword', keyword);}
    // 测试：如果是链接则弹出新窗口
    var reg = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g;
    var chkReg = new RegExp(reg);

    if(chkReg.test(keyword)){
      if(keyword.indexOf('url:')>=0){
        if(keyword.indexOf('http')>=0){
          window.location.href = keyword.replace('url:','');
        }else{
          // window.open(keyword.replace('url:','http://'));
          window.location.href = keyword.replace('url:','http://')
        }
      }
    }
    // end 测试

    if(keyword=='test'){
      window.location.href = $rootScope.app_config.links + '/#/tab/test';
    }

    $scope.resetOther = false;
    keyword = keyword || "";
    $scope.datas.IntentionAreaId = $scope.datas.IntentionAreaId || "";
    $scope.datas.EnterpriseNature = $scope.datas.EnterpriseNature || "";
    $scope.datas.Welfare = $scope.datas.Welfare || "";
    $scope.datas.JobPayWay = $scope.datas.JobPayWay || "";
    $scope.datas.JobNature = $scope.datas.JobNature || "";

    $scope.isHideLoading = true;
    $scope.isShowList = true;
    
    if(keyword==undefined) keyword = "";
    //【搜职位】
    if($scope.isActive.job){ pageType = 1; }
    //【搜职位】
    if($scope.isActive.company){ pageType = 2; }
    //【高级搜索】
    if($scope.isActive.other){ pageType = 0; }
    
    (function(){
      function httpCallBack(res){

        $scope.showKeyword = keyword;
        httpFn = undefined;
        if($scope.isActive.job){
          mEvent.trackEvent("求职者","搜索页(职位)","关键字搜索:"+keyword);
          $rootScope.JobResponse = res.body;
          if($rootScope.JobResponse.length >= 20){ $scope.jobs_Loaded = true; }else{ $scope.jobs_end = true;}
        }
        if($scope.isActive.company){
          mEvent.trackEvent("求职者","搜索页(企业)","关键字搜索:"+keyword);
          $rootScope.CompanyResponse = res.body;
          if($rootScope.CompanyResponse.length >= 20){ $scope.companys_Loaded = true; }else{ $scope.companys_end = true;}
        }
        if($scope.isActive.other){
          mEvent.trackEvent("求职者","搜索页(高级)","关键字搜索:"+keyword +","+JSON.stringify($scope.datas));
          $rootScope.OtherResponse = res.body;
          if($rootScope.OtherResponse.length >= 20){ $scope.others_Loaded = true; }else{ $scope.others_end = true;}
        }
        $ionicScrollDelegate.resize();

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJobList?" + 
                           "pageIndex=" + $scope.search_index +
                           "&mode=" + pageType + 
                           "&keyword=" + keyword + 
                           "&AreaIds=" + $cookies.get("cityCode-key") +
                           "&type=" + //$scope.datas.EnterpriseNature + 
                           "&welfares=" + $scope.datas.Welfare + 
                           "&pay=" + $scope.datas.JobPayWay + 
                           "&nature=" + $scope.datas.JobNature, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  // end 搜索框 searchKeyword

  // console.log($location.search().keyword);
  if($location.search().keyword){
    $scope.searchDatas.inputKeyword = $location.search().keyword;
    $scope.searchKeyword($location.search().keyword);
  }
  
  //【高级搜索】重置
  $scope.otherReset = function(){
    $scope.resetOther = true;
    $rootScope.CompanyResponse = '';
    $rootScope.JobResponse = '';
  }
})

.controller('NearCtrl', function($scope, $rootScope, $q, mEvent, $http, $stateParams, $ionicModal, $ionicBackdrop, $ionicSideMenuDelegate, $cookies, $timeout, serviceLocation) {

  CommonFn($scope, $rootScope, $stateParams);

  $rootScope.CurrentURL = "/#/tab/near";
  // console.log($rootScope.CurrentURL);
  // alert((document.documentElement.clientHeight - 92));
  // angular.element(document.querySelector("#nearmap")).attr("style","height:"+(document.body.scrollHeight - 92)+"px"); //document.body.scrollHeight
  $scope.nearMapHeight = (document.documentElement.clientHeight - 92)+"px";
  
  //获取从Directive传递的参数
  $scope.parseInt = parseInt;
  // $scope.$on('getJsonResponse', function(event,data) {
  //   $scope.jobsList = data;
  // });
  
  var defered = $q.defer();
  //从Service传递参数 map
  $scope.$on('map', function(event,data) {
    //左侧点击 Click  

    //--------------- 海量点1 ---------------
    defered.promise.then(function(msg){
      data.addOverlay(msg);
    })
    //--------------- END 海量点1 ---------------
    

    $scope.getJobLocation = function(longitudeNum,latitudeNum){
      
      $scope.jobImforShow = true; //显示简介信息
      $scope.getJobId = this.job.Id;
      $scope.getJobLoc = { "lng":this.job.MapLng, "lat":this.job.MapLat };
      
      serviceLocation.get(longitudeNum,latitudeNum,data);
      // console.log(this.job);

      $scope.locations = {
        imforName : this.job.Name,
        imforEnterpriseName : this.job.EnterpriseName,
        imforPay : this.job.Pay,
        imforDistance : parseInt(this.job.Distance),
        imforMapLat : this.job.MapLat,
        imforMapLng : this.job.MapLng
      }
    }
    $scope.closeImfor = function(){
      $scope.jobImforShow = false;
    }
    $scope.getJobLocation_simple = function(longitudeNum,latitudeNum){
      serviceLocation.get(longitudeNum,latitudeNum,data);
    }
  });

  //从Service传递参数 myLocation
  $scope.$on('myLocation', function(event,data) {

    (function(){
      function httpCallBack(res){

        httpFn = undefined;
        $rootScope.nearJobLists = res.body;
        res.body.length>40 ? $scope.hasMore = true : $scope.hasMore = false;

        //--------------- 海量点2 ---------------
        if(document.createElement('canvas').getContext){
          var points = [];  // 添加海量点数据
          for (var i = 0; i < res.body.length; i++) {
            points.push(new BMap.Point(res.body[i].MapLng, res.body[i].MapLat));
          }
          var options = {
              size: BMAP_POINT_SIZE_SMALL,
              shape: BMAP_POINT_SHAPE_CIRCLE,
              color: '#cc0000'
          }
          var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
          
          pointCollection.addEventListener('click', function (e) {
            alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
          });
          defered.resolve(pointCollection);
        }else{ alert("不支持海量点"); }
        //--------------- END 海量点2 ---------------

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJobMapList?lng=" + data.lng + "&lat=" + data.lat, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();
    $scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });

  });
  
  //第一次进入提示(可复用)
  // console.log($cookies.get("globalCookie"));
  // var cookieNear = eval("(" + $cookies.get("globalCookie") + ")")
  // if(cookieNear.nearForFirst){
  //   $rootScope.shadeboxPoint = "nearForFirst";
  //   $scope.$emit("shadeBoxDom","<div class='box'>"+
  //                                 "<div class='tip' style='width:185px;height:123px;left:20px;top:80px;background:url(/Content/Phone/images/shade-tip/near-left.png) no-repeat;background-size:100%;'></div>"+
  //                               "</div>"+
  //                               "<div class='box'>"+
  //                                 "<div class='tip' style='width:183px;height:151px;right:35px;top:75px;background:url(/Content/Phone/images/shade-tip/near-right.png) no-repeat;background-size:100%;'></div>"+
  //                               "</div>");
  // }
  

  // $scope.$on('backdrop.hidden', function(o) {
  // });

  // $scope.$on('backdrop.shown', function(o) {
  // });

  // $ionicBackdrop.retain();
  // $ionicBackdrop.getElement().html("<div class='tip' ng-click='aa()' style='position:absolute;width:185px;height:123px;left:20px;top:80px;background:url(/Content/Phone/images/shade-tip/near-left.png) no-repeat;background-size:100%;'></div>")
  
  
})

//附近居委
.controller('NearJuweiCtrl', function($scope, $rootScope, $q, mEvent, $http, $stateParams, $ionicSideMenuDelegate, $cookies, $timeout, serviceLocation) {
  
  CommonFn($scope, $rootScope, $stateParams);

  // console.log($cookies.get("globalCookie"));
  //第一次进入提示(可复用)
  // var cookieNear = eval("(" + $cookies.get("globalCookie") + ")")
  // if(cookieNear.nearJWForFirst){
  //   $rootScope.shadeboxPoint = "nearJWForFirst";
  //   $scope.$emit("shadeBoxDom","<div class='box'>"+
  //                                 "<div class='tip' style='width:185px;height:123px;left:20px;top:40px;background:url(/Content/Phone/images/shade-tip/near-left.png) no-repeat;background-size:100%;'></div>"+
  //                               "</div>");
  // }
  
  $scope.nearMapHeight = (document.documentElement.clientHeight)+"px"; // - 92
  //获取从Directive传递的参数
  $scope.parseInt = parseInt;
  // $scope.$on('getJsonResponse', function(event,data) {
  //   $scope.jobsList = data;
  // });
  
  var defered = $q.defer();
  //从Service传递参数 map
  $scope.$on('map', function(event,data) {
    //左侧点击 Click

    //--------------- 海量点1 ---------------
    defered.promise.then(function(msg){
      data.addOverlay(msg);
    })
    //--------------- END 海量点1 ---------------
    

    $scope.getJobLocation = function(longitudeNum,latitudeNum){
      
      $scope.jobImforShow = true; //显示简介信息
      $scope.getJobId = this.job.Id;
      $scope.getJobLoc = { "lng":this.job.MapLng, "lat":this.job.MapLat };
      
      serviceLocation.get(longitudeNum,latitudeNum,data);
      // console.log(this.job);

      $scope.locations = {
        imforName : this.job.Name,
        imforEnterpriseName : this.job.EnterpriseName,
        imforPay : this.job.Pay,
        imforDistance : parseInt(this.job.Distance),
        imforMapLat : this.job.MapLat,
        imforMapLng : this.job.MapLng
      }
    }
    $scope.closeImfor = function(){
      $scope.jobImforShow = false;
    }
    $scope.getJobLocation_simple = function(longitudeNum,latitudeNum){
      serviceLocation.get(longitudeNum,latitudeNum,data);
    }
  });

  //从Service传递参数 myLocation
  $scope.$on('myLocation', function(event,data) {

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        httpFn = undefined;
        $rootScope.nearJobLists = res.body;
        res.body.length>40 ? $scope.hasMore = true : $scope.hasMore = false;
        
        //--------------- 海量点2 ---------------
        if(document.createElement('canvas').getContext){
          var points = [];  // 添加海量点数据
          for (var i = 0; i < res.body.length; i++) {
            points.push(new BMap.Point(res.body[i].MapLng, res.body[i].MapLat));
          }
          var options = {
              size: BMAP_POINT_SIZE_SMALL,
              shape: BMAP_POINT_SHAPE_CIRCLE,
              color: '#cc0000'
          }
          var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
          pointCollection.addEventListener('click', function (e) {
            alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
          });
          defered.resolve(pointCollection);
        }else{ alert("不支持海量点"); }
        //--------------- END 海量点2 ---------------
      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Job/GetJobMapList?lng=" + data.lng + "&lat=" + data.lat, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();

  });
  
})


.controller('NearPanoramaCtrl',function($scope, $rootScope, mEvent, $http, $stateParams){
  CommonFn($scope, $rootScope, $stateParams);

  require(['async!BaiduMap'],function(){
    var panorama = new BMap.Panorama('panorama'); //默认为显示导航控件
    panorama.setPosition(new BMap.Point($stateParams.lng, $stateParams.lat));
  });

})


.controller('SquareCtrl', function($scope, $rootScope, $state, $stateParams, $ionicScrollDelegate, $timeout, $q, mEvent, ComeFrom, SquareEvent, serviceMath, GetUserImfor, SquareRefreshList, $cookies, $timeout, $http, $ionicModal, $ionicPopup, $ionicScrollDelegate) {
  
  CommonFn($scope, $rootScope, $stateParams);
  $rootScope.CurrentURL = "/#/tab/square";
  mEvent.GetConstantXML(); //获取XML配置文件
  
  if($rootScope.entry=='tab' && $cookies.get('Ticket')){ GetUserImfor.GetPersonal();}
  if($rootScope.entry=='company' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetCompany();}

  ComeFrom.get(); //判断从哪个页(Square/mySquare)进入
  
  if(!$cookies.get("SquareAgreement")){
    $ionicPopup.confirm({
      title: '职得广场使用声明',
      template: '<div class="mainTextarea" tabindex="5000" style="font-size:12px; overflow: hidden; outline: none;"><p>用户需为在职得上传、存储、发表、发送或以其它方式传送的全部内容负全部责任。用户同意将不会利用职得提供的服务从事任何违法或不正当的活动。包括但不限于下列行为∶</p><p>(1) 上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：</p><p>1. 反对宪法所确定的基本原则的；</p><p>2. 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p><p>3. 损害国家荣誉和利益的；</p><p>4. 煽动民族仇恨、民族歧视、破坏民族团结的；</p><p>5. 破坏国家宗教政策，宣扬邪教和封建迷信的；</p><p>6. 散布谣言，扰乱社会秩序，破坏社会稳定的；</p><p>7. 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p><p>8. 侮辱或者诽谤他人，侵害他人合法权利的；</p><p>9. 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</p><p>10. 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；</p><p>11. 其它职得认为不当的内容。</p><p>(2) 冒充其它任何人或机构，或以虚伪不实的方式陈述或谎称与任何人或机构有关；</p><p>(3) 将依据任何法律或合约或法定关系(例如由于雇佣关系和依据保密合约所得知或揭露之内部资料、专属及机密资料)知悉但无权传送之任何内容加以发布、传送；</p><p>(5) 将侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利之内容加以发布或以其它方式传送；</p><p>(6) 将任何广告信函、促销资料、“垃圾邮件”、“滥发信件”、“连锁信件”、“直销”或其它任何形式的劝诱资料加以发布、传送；</p><p>(7) 将设计目的在于干扰、破坏或限制任何计算机软件、硬件或通讯设备功能之病毒文件、计算机代码、档案和程序之任何资料，加以发布、传送；</p><p>(8) 未经职得的授权或许可，以职得的名义从事任何商业活动，或将职得作为从事商业活动的场所、平台或其它任何形式的媒介；</p><p>(9) 未经合法授权而截获、篡改、收集、储存或删除他人个人信息、站内邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目的；</p><p>(10) 利用职得网络服务系统进行任何不利于职得的行为；</p><p>(11) 故意或非故意地违反任何适用的当地、国家法律，以及任何具有法律效力的规则。</p></div>',
      buttons:[
        {
          text:'我已阅读并同意',
          type:'button-positive',
          onTap: function(e){
            $cookies.put("SquareAgreement", true, {'expires': mEvent.setExpireDate(), 'path': '/'});
          }
        }
      ]
    });
  }

  // console.log($rootScope.userImfor);

  //[Click] 点击标题 返回顶部
  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop();
  }

  //上拉加载刷新
  $scope.refreshUp = function(){
    // console.log("上拉加载");
    SquareRefreshList.refresh();
    $rootScope.$on('ngRepeatFinished', function(){
      $scope.lastSquareItem = $rootScope.squareList[$rootScope.squareList.length-1];
    })
    $scope.$broadcast('scroll.refreshComplete'); //停止动画
  }
  //下拉加载更多
  $scope.refreshDown = function(){
    $scope.square_loaded = false;

    (function(){
      function httpCallBack(res){

        $rootScope.squareList = $rootScope.squareList.concat(res.body);
        SquareEvent.formatImage($rootScope.squareList);
        $ionicScrollDelegate.resize();

        $scope.lastSquareItem = $rootScope.squareList[$rootScope.squareList.length-1];
        $scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
        
        $rootScope.$on('ngRepeatFinished', function(){
          if(res.body.length>=20){
            $scope.square_loaded = true;
          }else{
            $scope.square_loaded = false;
            $scope.square_end = true;
            console.log('end');
          }
        });
        
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Square/GetNextMessageList?msgId=" + $scope.lastSquareItem.Id, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }
  
  $scope.hasData = false;
  $scope.hasDataText = "加载中"; //网络繁忙，请检查网络信号
  
  //读取<get-json-datas>指令返回的数据
  $rootScope.$on('getJsonResponse', function(event,data) {
    
    $scope.firstSquareItem = data.body[0];
    $scope.lastSquareItem = data.body[data.body.length-1];
    
    if(data.body.length>0){
      $scope.hasData = true;
    }else{
      $scope.hasData = false;
      $scope.hasDataText = "暂无数据";
    }
    
    $rootScope.$on('ngRepeatFinished', function(){
      if(data.body.length >= 10){ //大于这个数，使用下滑加载
        $scope.square_loaded = true;
      }
    });

    // console.log("接收数据");
    // SquareRefreshList.refresh(); //刷新列表(service.js)
    
  });
  
  //----------- 点赞 -----------//
  $scope.eventPostPraise = function(){
    //SquareEvent.clickPraise(this);
    var SquareListElement = $rootScope.squareList[this.$index];
    if($cookies.get("Ticket")!=undefined){
      // [程序不肯修改，只好这样写]
      if(SquareListElement.PraiseUserIds[0]=="") SquareListElement.PraiseUserIds = [];
      if(SquareListElement.PraiseUserNickNames[0]=="") SquareListElement.PraiseUserNickNames = [];
      //--------------- 判断是否点赞(静态) ---------------
      if(SquareListElement.PraiseUserIds.indexOf($rootScope.userImfor.Id)<0){
        //不存在[我的]赞的情况，添加赞[我的Id]
        this.item.PraiseCount++;
        SquareListElement.PraiseUserIds.push($rootScope.userImfor.Id);
        SquareListElement.PraiseUserNickNames.push($rootScope.userImfor.NickName);
      }else{
        //已存在，删除赞[我的Id]
        this.item.PraiseCount--;
        var arrId = SquareListElement.PraiseUserIds;
        var arrNickname = SquareListElement.PraiseUserNickNames;
        serviceMath.removeArray(arrId,$rootScope.userImfor.Id); //[Service|serviceMath.removeArray]删除数组中的某个值
        serviceMath.removeArray(arrNickname,$rootScope.userImfor.NickName); //[Service|serviceMath.removeArray]删除数组中的某个值
      }
      // POST赞(Service);
      var thisId = this.item.Id;
      var isCurrentPraise = this.item.PraiseUserIds.indexOf($rootScope.userImfor.Id);
      SquareEvent.postPraise(this,thisId,isCurrentPraise);
    }else{
      $state.go($rootScope.entry + '.login');
      // console.log($rootScope.CurrentURL);
    }
  }
  //----------- END 点赞 -----------//
  
  
  //[Click] 删除动态
  $scope.mySquareDel = function(){
    // console.log(this.item.Id);
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
    SquareEvent.deleteItem(this.item.Id,"squareList");
  }
  
  //[Click] 删除评论
  $scope.mySquareMessageDel = function(){
    // console.log(this.itemChild.Id);
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
    var itemIndex = this.$parent.$parent.$index;
    var itemChildIndex = this.$index;
    SquareEvent.deleteMessageItem(this.itemChild.Id, itemIndex, itemChildIndex, $rootScope.squareList);
  }
  
  //[Click] 举报动态
  $scope.inform = function(){
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
    SquareEvent.inform(this.item.Id);
  }

  //[Click] 发动态
  $scope.addNewSquare = function(){
    //reset
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/" + $rootScope.entry + "/login";return false; }
    $timeout(function(){
      // angular.element("input[type='file']").val(null);

      angular.element(document.querySelector(".fileUpload-input")).val(null);
      angular.element(document.querySelector("#dataImages")).val(null);

      $scope.datas.Content = "";
      $scope.datas.ImgsData = "";
      $scope.dataImages = "";
      $scope.isEmpty = false;
      angular.element(document.querySelector(".fileUpload-list")).html("");
    },100);
    //end reset

    //发布新动态[Modal]
    var p = $ionicModal.fromTemplateUrl("tab-square-modalAdd.html",{
      scope:$scope,
    }).then(function(modal){
      $rootScope.modal = modal;
      $scope.isEmpty = false;
      $scope.modal.show();
      $scope.datas = { };

      //关闭
      $scope.closeModal = function(){ $scope.modal.remove(); }

      //提交
      $scope.AddSquare = function(){
        
        if(!$scope.datas.Content||$scope.datas.Content.length>200){
          $scope.isEmpty = true;
          return false;
        }

        $scope.datas.ImgsData = "";
        if(angular.element(document.querySelector("#dataImages")).val()!=undefined){
          $scope.datas.ImgsData = angular.element(document.querySelector("#dataImages")).val();
          if($scope.datas.ImgsData.split(",").length>6){
            $scope.errMsg = "图片数量不能大于6张";return false;
          }
        }
        // console.log($scope.datas);
        if($cookies.get("Ticket")){

          //GET上传图片
          (function(){
            function httpCallBack(res){
              httpFn = undefined;
              $scope.modal.remove();
              $scope.datas.Content = "";
              $scope.datas.ImgsData = "";
              //发布新动态后
              SquareRefreshList.refresh();
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessage", true, httpCallBack, $scope.datas);
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            /*------------- end -------------*/
          })();
          
        }else{
          alert("登录已过期");
          $scope.modal.hide();
          window.location.href = $rootScope.app_config.links + "/#/tab/login";
        }
        
      }
    });
  }

  //[Click] CenterButton触发事件
  $rootScope.$on('ShowSqureAddNew', function(r){
    $scope.addNewSquare();
  });

  //$scope.colWidth_33 = (document.body.clientWidth - 32 - 10)/3;
  
  //-----------评论(列表)-----------//
  //Config
  $scope.isShowList = false;
  $scope.isShowComment = false;
  $scope.commentPlaceholder = "发表您的评论";
  $scope.commentContent = "";
  
  //显示评论列表
  $scope.showList = function(){
    this.isShowList = !this.isShowList;
    if(!this.isShowList){
      this.isShowComment = false;
    }else{

      var thisId = this.item.Id;

      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + thisId, false, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();

    }
  }
  
  var isReply = false;
  //显示回复评论框
  $scope.showComment = function(){
    this.isShowComment = true;
    this.commentPlaceholder = "发表您的评论";
    if(!$scope.isShowList) this.isShowList = true;
    isReply = false;
    $scope.repRepId = "";
  }
  
  //显示回复评论框（回复他人）
  $scope.repRepId = "";
  $scope.replyComment = function(){
    if(!mEvent.CheckLogin()){
      this.$parent.isShowComment = true;
      this.$parent.commentContent = "";
      if(this.itemChild.UserId!=$rootScope.userImfor.Id){
        isReply = true;
        $scope.repRepId = this.itemChild.Id;
        this.$parent.commentPlaceholder = "回复 " + this.itemChild.UserNickName;
      }else{
        isReply = false;
        $scope.repRepId = "";
        this.$parent.commentPlaceholder = "发表您的评论";
      }
    }
  }
  
  //----------- 提交评论(列表) -----------//
  $scope.submitComment = function(itemId){

    $rootScope.CurrentURL = "/#/tab/square";
    // console.log($rootScope.CurrentURL);

    var thisIndex = this.$index;
    var thisComment = this.commentContent;
    this.commentContent = "";
    if($cookies.get("Ticket")){
      if(thisComment!=""){
        
        if(!isReply){
          //---------- 1.直接评论 -----------
          var thisId = this.item.Id;

          (function(){
            function httpCallBack(res){
              httpFn = undefined;
              //查询
              (function(){
                function httpCallBack(res){
                  httpFn = undefined;
                  $rootScope.squareList[thisIndex].MessageReplyList = res.body.MessageReplyList;
                  $rootScope.squareList[thisIndex].ReplyCount ++;
                }
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessageReply", true, httpCallBack, { MsgId:thisId,Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();


        }else{
          //---------- 2.回复某人的评论 -----------
          var thisId = this.item.Id;
          (function(){
            function httpCallBack(res){
              //查询
              (function(){
                function httpCallBack(res){
                  httpFn = undefined;
                  $rootScope.squareList[thisIndex].MessageReplyList = res.body.MessageReplyList;
                  $rootScope.squareList[thisIndex].ReplyCount ++;
                }
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessgaeReplyToReply", true, httpCallBack, { MsgId:thisId, ReplyId:$scope.repRepId, Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();
        }
      }
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }
  //----------- end 提交评论(列表) -----------//
  
})


// 广场名片
.controller('SquareCardCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPopup, $location, $timeout, mEvent, ComeFrom, SquareEvent, GetUserImfor, SquareRefreshList, $cookies, $timeout, $http, $ionicModal) {

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  GetUserImfor.GetPersonal();
  mEvent.GetConstantXML(); //获取XML配置文件

  $scope.SquareJob_Type_n = 0; // 默认值
  $scope.SquareJob_Type = $stateParams.Type;  // full/part  全职/兼职
  if($scope.SquareJob_Type=='full'){
    $scope.SquareJob_Type_n = 0;
    $rootScope.backToUrl = '/tab/square/card/full';
  }
  if($scope.SquareJob_Type=='part'){
    $scope.SquareJob_Type_n = 1;
  }


  $scope.SquareJob_Evt = $stateParams.Evt     // create/edit   添加/修改

  //[GET] 名片(全/兼职)
  $scope.RefreshCards = function(){
    if(!$scope.MyCard){
      function httpCallBack(rs){
        httpFn = undefined;
        if(rs.code==0){
          $scope.IsCreated = true;
          $scope.MyCard = rs.body;
          // 获取 ResumeCardId
          $scope.CardDatas = { ResumeCardId:$scope.MyCard.Id, Content:'' }
          if($scope.SquareJob_Type=='full') $scope.MyCardType = '全职';
          if($scope.SquareJob_Type=='part') $scope.MyCardType = '兼职';
        }
        if(rs.code=='50301'){ $scope.IsCreated = false; }
        $scope.$emit('RefreshCards_Loaded', $scope.MyCard);
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/ResumeCard/GetResumeCard?type=" + $scope.SquareJob_Type_n, true, httpCallBack, '');
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    }
  }
  // end [GET] 名片

  if(!$scope.SquareJob_Evt){ //[Page] 列表页(起始页)
    
    $scope.RefreshCards();

    //[Click] 创建名片(全/兼职)
    $scope.Create = function(CreateType){

      if( (CreateType=='full') ){
        // 判断是否完善基本信息
        if($rootScope.userImfor.IsHasResumeBaseInfo){
          // 判断是否有默认简历
          if(!$rootScope.userImfor.IsHasResume){
            $ionicPopup.confirm({
              title: '提示', template: '创建全职名片需要先创建简历，现在前往创建吗？',
              buttons:[
                {
                  text:'确定', type:'button-positive',
                  onTap: function(e){
                    $rootScope.backToUrl = '/tab/square/card/' + $scope.SquareJob_Type;
                    $location.path('/tab/my/resumeDetail/add');
                  }
                },{ text:'取消', onTap: function(e){ } }
              ]
            });
          }else{
            //已有[基本信息][默认简历]，创建简历
            //[POST] 创建名片(全职/兼职)
            $http({
              method:"POST", headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
              url:$rootScope.app_config.api+"/api/JobSeeker/ResumeCard/CreateCard",
              data:{ Type: $scope.SquareJob_Type_n}
            }).success(function(rs){
              if(rs.body==false){
                $ionicPopup.alert({
                  title: '提示', template:'创建失败，请确认简历是否完善', okText:'确定'
                });
              }else{
                $scope.RefreshCards();
              }
            });
            // //进入发布界面
            // $location.path('/tab/square/card/' + $scope.SquareJob_Type + '/create');
          }
          // end 默认简历
        }else{
          $ionicPopup.confirm({
              title: '提示',
              template: '您当前未完善基本信息、简历，现在前往完善吗？',
              buttons:[
                {
                  text:'确定',
                  type:'button-positive',
                  onTap: function(e){
                    $rootScope.backToUrl = '/tab/square/card/' + $scope.SquareJob_Type;
                    $location.path('/tab/my/imformation');
                  }
                },{ text:'取消', onTap: function(e){ } }
              ]
            });
        }
        //end 基本基本信息
      }else{

        //[兼职]直接进入发布界面，无需判断
        // $location.path('/tab/square/card/' + $scope.SquareJob_Type + '/create');

      }
    }
    //end [Click] 创建名片

  }else{  //[Page] 添加/修改页(表单页)

    // (全职名片)不需要添加页，修改页，修改直接跳简历页

    // $scope.isSelectResume = false;
    // $scope.selectResumeText = '请选择简历';
    
    $scope.RefreshCards();
    $scope.$on('RefreshCards_Loaded', function(ev, d){

      // [POST] 创建名片(全职)
      $scope.submitForm_full = function(isValid,url) {
        if(!isValid) { $scope.isErrorForSubmit = true; }else{
          $scope.isErrorForSubmit = false;

          // [POST] 发布名片到广场
          (function(){
            function httpCallBack(rs){
              httpFn = undefined;
              if(rs.code!=0){
                $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code +')', okText:'确定' });
              }else{
                $location.path('/tab/square');
              }
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/JobSeeker/ResumeCard/ResumeCardPushToSquareMessage", true, httpCallBack, $scope.CardDatas);
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();
        }
      }

    });

    //[GET] 获取当前主简历
    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        $scope.defaultResume = rs.body;
        // [Init]设置默认值
        $scope.SelectedResume = $scope.defaultResume;
        $scope.isSelectResume = true;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Resume/GetDefaultResume", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
    
  }

  //[Click] 发布名片到广场
  $scope.ShowSendText = function(){
    
    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        if(rs.code!=0){
          $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code +')', okText:'确定' });
        }else{
          // 判断默认简历的完整度是否小于60
          if(rs.body.Proportion*100<60){
            // $ionicPopup.alert({ title: '提示', template: '发布简历的完整度必须大于60%', okText:'确定' });
            $ionicPopup.confirm({
              title: '提示', template: '发布简历的完整度必须大于60%',
              buttons:[
                {
                  text:'确定', type:'button-positive',
                  onTap: function(e){
                    $location.path('/tab/square/cardResumeDetail/' + rs.body.Id);
                  }
                }
              ]
            });
          }else{
            $location.path('/tab/square/card/' + $scope.SquareJob_Type + '/add');
          }
        }
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Resume/GetDefaultResume", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

})

// 名片详情
.controller('SquareCardDetailCtrl', function($scope, $rootScope, $state, $stateParams, $ionicHistory, $ionicScrollDelegate, $ionicPopup, $location, $timeout, mEvent, ComeFrom, SquareEvent, GetUserImfor, SquareRefreshList, $cookies, $timeout, $http, $ionicModal) {

  // 写给后来者：
  // 1) 关于名片扣除
  // 由于 /api/Common/ResumeCard/GetCard?resumeCardId= 接口没有做判断 Phone/Email，所以无
  // 论企业有没有扣除次数都是返回空值（后台偷懒），所以你要再调一次接口，
  // 获得简历详情 /api/Company/Resume/GetResumeDetail?ResumeId=
  

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true); //判断从哪个页进入
  mEvent.GetConstantXML(); //获取XML配置文件
  

  // [GET] （如果是企业登录的话）根据（简历Id）拿简历
  $scope.GetResumeDetail_Company = function(ResumeId, bool){
    function httpCallBack(rs){
      $scope.CardDetail.Resume = rs.body;
      try{
        if($scope.CardDetail.Resume.EduExperience!='' && typeof($scope.CardDetail.Resume.EduExperience)=='string'){
          $scope.CardDetail.Resume.EduExperience = JSON.parse($scope.CardDetail.Resume.EduExperience);
        }
        if($scope.CardDetail.Resume.WorkExperience!='' && typeof($scope.CardDetail.Resume.WorkExperience)=='string'){
          $scope.CardDetail.Resume.WorkExperience = JSON.parse($scope.CardDetail.Resume.WorkExperience);
        }
      }catch(e){ }
      //[Click] 显示名片详情
      if(!bool) $scope.IsShowDetail = false;
      $scope.ShowDetail = function(){
        $scope.IsShowDetail = true; $ionicScrollDelegate.resize();

        //[POST] 判断是否有收藏
        $http({
          method:'POST', headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
          url:$rootScope.app_config.api + '/api/Company/ResumeBook/IsExist',
          data:{ ResumeId:$scope.CardDetail.Resume.Id }
        }).success(function(rs){
          if(rs.code==0){
            $scope.CardDetail.Resume.IsEnterpriseCollect = rs.body;
          }
        });

      }
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Company/Resume/GetResumeDetail?ResumeId=" + ResumeId, true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }

  // [GET] 根据（名片Id）拿简历
  $scope.GetResumeDetail = function(bool){
    function httpCallBack(rs){
      $scope.CardDetail = rs.body;
      try{
        if($scope.CardDetail.Resume.EduExperience!='' && typeof($scope.CardDetail.Resume.EduExperience)=='string'){
          $scope.CardDetail.Resume.EduExperience = JSON.parse($scope.CardDetail.Resume.EduExperience);
        }
        if($scope.CardDetail.Resume.WorkExperience!='' && typeof($scope.CardDetail.Resume.WorkExperience)=='string'){
          $scope.CardDetail.Resume.WorkExperience = JSON.parse($scope.CardDetail.Resume.WorkExperience);
        }
      }catch(e){ }

      if($cookies.get('s')){      
        require(['base64'], function(){
          var JSON_d = JSON.parse(new Base64().decode($cookies.get('s')));
          if(JSON_d.Type=='Company'){
            $scope.GetResumeDetail_Company($scope.CardDetail.Resume.Id, true);

            //[Click] 邀请面试
            $scope.BottomClick_Invite = function(){
              if($cookies.get("Ticket")){
                var thisId = $scope.CardDetail.Resume.Id;
                $ionicModal.fromTemplateUrl("modal-message-custom.html",{
                  scope:$scope,
                }).then(function(modal){
                  $rootScope.modal = modal;
                  $scope.ModalTitle = '邀请面试'
                  $scope.modal.show();
          
                  //[POST] 发送
                  $scope.datas = { ResumeId:thisId, Content:'' }
                  $scope.SaveModal = function(){
                    if($scope.datas.Content!=''){
                      $scope.modal.remove();
          
                      (function(){
                        function httpCallBack(rs){
                          // console.log(rs);
                        }
                        var httpFn = function(){
                          mEvent.http("POST", "/api/Company/Resume/Invite", true, httpCallBack, $scope.datas);
                        }
                        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                      })();
          
                    }else{
                      var confirmPopup = $ionicPopup.alert({
                        title: '提示', template: '内容不能为空'
                      });
                    }
                  }
                });
              }else{
                $state.go($rootScope.entry + '.my');
              }
            }

            //[Click] 私信
            $scope.BottomClick_Message = function(){
              mEvent.ShowModelMessages($scope.CardDetail.Resume.Realname, $scope.CardDetail.Resume.UserId);
            }

            //[Click] 收藏/取消收藏
            $scope.ButtonClick_Collect = function(){

              var isCollect = $scope.CardDetail.Resume.IsEnterpriseCollect;
              var thisResumeId = $scope.CardDetail.Resume.Id;
              if(isCollect){
                // [POST] 取消收藏简历
                (function(){
                  function httpCallBack(rs){
                    if(rs.code==0){
                      // 静态操作
                      $scope.CardDetail.Resume.IsEnterpriseCollect = false;
                      $rootScope.userImfor.ResumeCount--;
                      $ionicHistory.clearCache();
                    }else{
                      $ionicPopup.alert({
                        title: '提示', template: rs.msg + '(' + rs.code + ')'
                      });            
                    }
                  }
                  var httpFn = function(){ //DeleteCollectResume
                    mEvent.http("POST", "/api/Company/ResumeBook/DeleteResume", true, httpCallBack, { ResumeId:thisResumeId });
                  }
                  httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                })();
              }else{
                // [POST] 收藏简历
                (function(){
                  function httpCallBack(rs){
                    if(rs.code==0){
                      // 静态操作
                      $scope.CardDetail.Resume.IsEnterpriseCollect = true;
                      $rootScope.userImfor.ResumeCount++;
                      $ionicHistory.clearCache();
                    }else{
                      $ionicPopup.alert({
                        title: '提示', template: rs.msg + '(' + rs.code + ')'
                      });            
                    }
                  }
                  var httpFn = function(){
                    mEvent.http("POST", "/api/Company/ResumeBook/AddResume", true, httpCallBack, { ResumeId:thisResumeId });
                  }
                  httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                })();
              }

            }
            // end [Click] 收藏/取消收藏
            
          }
        });
      }

      // 如果是企业登录的话，再调一次企业简历详情的接口（临时解决方案）
      // $rootScope.$on("GetUserImfor",function(e, d){
      //   // console.log(d); // JobSeeker, Enterprise
      //   if(d.Rold=='Enterprise'){
      //     $scope.GetResumeDetail_Company($scope.CardDetail.Resume.Id)
      //   }
      // });

      //[Click] 显示名片详情
      if(!bool) $scope.IsShowDetail = false;
      $scope.ShowDetail = function(){
        $scope.IsShowDetail = true; $ionicScrollDelegate.resize();
      }
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/ResumeCard/GetCard?resumeCardId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }
  $scope.GetResumeDetail();


  // 判断企业用户是否登录
  if($cookies.get("Ticket")){
    if(!$rootScope.userImfor){
      // GetUserImfor.GetCompany(); // $rootScope.$on("GetUserImfor",function(e, data){ .. });
      if($rootScope.entry=='tab' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetPersonal();}
      if($rootScope.entry=='company' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetCompany();}
      // $rootScope.$on("GetUserImfor",function(e, d){
      //   // $scope.ReadResume($stateParams.Id, data.Id);
      //   console.log(d.Rold); // JobSeeker, Enterprise
      //   if(d.Rold=='JobSeeker'){
      //     // 名片Id
      //     $scope.GetResumeDetail("/api/Common/ResumeCard/GetCard?resumeCardId=" + $stateParams.Id);
      //   }
      //   if(d.Rold=='Enterprise'){
      //     // 简历Id
      //     // $scope.GetResumeDetail("/api/Company/Resume/GetResumeDetail?ResumeId=" + $stateParams.Id);
      //   }
      // });
    }
  }

  //[Click] 设置简历联系方式可查看（简历查看次数-1）
  $scope.SetAllow = function(){
    if($cookies.get("Ticket")){

      var JSON_d = JSON.parse(new Base64().decode($cookies.get('s')));
      if(JSON_d.Type!='Company'){
        $ionicPopup.confirm({
          title: '提示', template: '企业用户才可以查看联系方式！',
          buttons:[
            { text:'确定', type:'button-positive'}
          ]
        });
      }else{

        var confirmPopup = $ionicPopup.confirm({
          title: '提示', template: '确定查看联系方式吗？（简历查看次数-1）',
          buttons:[
              {
                text:'确定', type:'button-positive',
                onTap: function(e){
                  $http({
                    method:'GET', headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
                    url:$rootScope.app_config.api + '/api/Company/Resume/GetResumeContactWay?resumeId=' + $scope.CardDetail.Resume.Id
                  }).success(function(rs){
                    if(rs.code==0){

                      $scope.CardDetail.Resume.QQ = rs.body.QQ;
                      $scope.CardDetail.Resume.Phone = rs.body.Phone;
                      $scope.CardDetail.Resume.Email = rs.body.Email;
                      // QQ, Phone, Email
                      $scope.GetResumeDetail(true);
                      GetUserImfor.GetCompany();
                    }
                  });
                }
              },{ text:'取消', onTap: function(e){ return false; } }
            ]
        });

      }

    }else{
      window.location.href = $rootScope.app_config.links + "/#/company/login";
    }
  }

})

// 名片分享
.controller('SquareCardShareCtrl', function($scope, $rootScope, $state, $stateParams, $ionicPopup, $location, $timeout, mEvent, ComeFrom, SquareEvent, GetUserImfor, SquareRefreshList, $cookies, $timeout, $http, $ionicModal) {
  CommonFn($scope, $rootScope, $stateParams);
  // GetUserImfor.GetPersonal();

  // $scope.SquareJob_Type = $stateParams.Type;  // full/part  全职/兼职
  // if($scope.SquareJob_Type=='full'){
  //   $scope.SquareJob_Type_n = 0; $scope.SquareJob_Type_cn = '全职';
  //   $rootScope.backToUrl = '/tab/square/card/full';
  // }
  // if($scope.SquareJob_Type=='part'){
  //   $scope.SquareJob_Type_n = 1; $scope.SquareJob_Type_cn = '兼职';
  // }

  //[GET] 名片(全/兼职)
  $scope.RefreshCards = function(){
    function httpCallBack(rs){
      httpFn = undefined;
      console.log(rs.body);
      $scope.CardDetail = rs.body;

      // 生成二维码链接
      require(['qrcode'],function(){
        //二维码 - 生成
        $scope.webLink = $rootScope.app_config.links + "/#/tab/square/cardDetail/" + $scope.CardDetail.Id;
        if(document.getElementById("qrcode")!=null){
          var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 120, height : 120
          });
          qrcode.makeCode($scope.webLink);
          console.log($scope.webLink);
        }
        //二维码 - 显示
      });

    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/ResumeCard/GetCard?resumeCardId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }
  // end [GET] 名片
  $scope.RefreshCards();

})




.controller('OtherSquareCtrl', function($scope, $rootScope, mEvent, ComeFrom, serviceMath, GetUserImfor, SquareEvent, $cookies, $http, $stateParams, $ionicScrollDelegate){

  CommonFn($scope, $rootScope, $stateParams);
  
  if($rootScope.entry=='tab' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetPersonal();}
  if($rootScope.entry=='company' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetCompany();}

  ComeFrom.get();
  $scope.paramsId = $stateParams.Id;
  $scope.url = $stateParams.url;

  (function(){
    function httpCallBack(res){
      $rootScope.otherSquareList = res.body;
      SquareEvent.formatImage($rootScope.otherSquareList);
      $rootScope.$broadcast('otherSquareList_onLoadDatas', $scope.otherSquareList); // 分页必须
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Square/GetMessageList?UserId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

  $scope.goTop = function(){ $ionicScrollDelegate.scrollTop(); }
  $scope.otherSquare_refreshDown = function(){
    $scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
  }


  //----------- 点赞 -----------//
  $scope.eventPostPraise = function(){

    $rootScope.CurrentURL = "/#/tab/square";
    var SquareListElement = $rootScope.otherSquareList[this.$index];

    // alert(SquareListElement.PraiseUserIds.indexOf($rootScope.userImfor.Id));

    if($cookies.get("Ticket")!=undefined){
      // [程序不肯修改，只好这样写]
      if(SquareListElement.PraiseUserIds[0]=="") SquareListElement.PraiseUserIds = [];
      if(SquareListElement.PraiseUserNickNames[0]=="") SquareListElement.PraiseUserNickNames = [];
      //--------------- 判断是否点赞(静态) ---------------
      if(SquareListElement.PraiseUserIds.indexOf($rootScope.userImfor.Id)<0){
        //不存在[我的]赞的情况，添加赞[我的Id]
        this.item.PraiseCount++;
        SquareListElement.PraiseUserIds.push($rootScope.userImfor.Id);
        SquareListElement.PraiseUserNickNames.push($rootScope.userImfor.NickName);
      }else{
        //已存在，删除赞[我的Id]
        this.item.PraiseCount--;
        var arrId = SquareListElement.PraiseUserIds;
        var arrNickname = SquareListElement.PraiseUserNickNames;
        serviceMath.removeArray(arrId,$rootScope.userImfor.Id); //[Service|serviceMath.removeArray]删除数组中的某个值
        serviceMath.removeArray(arrNickname,$rootScope.userImfor.NickName); //[Service|serviceMath.removeArray]删除数组中的某个值
      }
      // POST赞(Service);
      var thisId = this.item.Id;
      var isCurrentPraise = SquareListElement.PraiseUserIds.indexOf($rootScope.userImfor.Id);
      SquareEvent.postPraise(this,thisId,isCurrentPraise);
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }
  //----------- END 点赞 -----------//
  
  //举报动态
  $scope.inform = function(){
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
    SquareEvent.inform(this.item.Id);
  }

  //删除评论
  $scope.mySquareMessageDel = function(){
    // console.log(this.itemChild.Id);
    var itemIndex = this.$parent.$parent.$index;
    var itemChildIndex = this.$index;
    SquareEvent.deleteMessageItem(this.itemChild.Id, itemIndex, itemChildIndex, $rootScope.squareList);
  }

  //-----------评论(列表)-----------//
  //Config
  $scope.isShowList = false;
  $scope.isShowComment = false;
  $scope.commentPlaceholder = "发表您的评论";
  $scope.commentContent = "";
  
  //显示评论列表
  $scope.showList = function(){
    this.isShowList = !this.isShowList;
    if(!this.isShowList){
      this.isShowComment = false;
    }else{
      var thisId = this.item.Id;
      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + thisId, false, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();
    }
  }
  
  var isReply = false;
  //显示回复评论框
  $scope.showComment = function(){
    this.isShowComment = true;
    this.commentPlaceholder = "发表您的评论";
    if(!$scope.isShowList) this.isShowList = true;
    isReply = false;
    $scope.repRepId = "";
  }
  
  //显示回复评论框（回复他人）
  $scope.repRepId = "";
  $scope.replyComment = function(){
    if(!mEvent.CheckLogin()){
      this.$parent.isShowComment = true;
      this.$parent.commentContent = "";
      if(this.itemChild.UserId!=$rootScope.userImfor.Id){
        isReply = true;
        $scope.repRepId = this.itemChild.Id;
        this.$parent.commentPlaceholder = "回复 " + this.itemChild.UserNickName;
      }else{
        isReply = false;
        $scope.repRepId = "";
        this.$parent.commentPlaceholder = "发表您的评论";
      }
    }
  }
  
  //----------- 提交评论(列表) -----------//
  $scope.submitComment = function(itemId){
    
    var thisIndex = this.$index;
    var thisComment = this.commentContent;
    this.commentContent = "";
    if($cookies.get("Ticket")){
      if(thisComment!=""){
        
        if(!isReply){
          //---------- 1.直接评论 -----------
          var thisId = this.item.Id;
          (function(){
            /*------------- Second Packaging CallBack -------------*/
            function httpCallBack(res){
              
              //查询评论列表
              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(res){
                  httpFn = undefined;
                  $rootScope.otherSquareList[thisIndex].MessageReplyList = res.body.MessageReplyList;
                  $rootScope.otherSquareList[thisIndex].ReplyCount ++;
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
            /*------------- Second Packaging -------------*/
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessageReply", true, httpCallBack, { MsgId:thisId,Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            /*------------- end -------------*/
          })();
        }else{
          //---------- 2.回复某人的评论 -----------
          var thisId = this.item.Id;

          (function(){
            /*------------- Second Packaging CallBack -------------*/
            function httpCallBack(res){

              //查询评论列表
              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(res){
                  $rootScope.otherSquareList[thisIndex].MessageReplyList = res.body.MessageReplyList;
                  $rootScope.otherSquareList[thisIndex].ReplyCount ++;
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
            /*------------- Second Packaging -------------*/
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessgaeReplyToReply", true, httpCallBack, { MsgId:thisId, ReplyId:$scope.repRepId, Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            /*------------- end -------------*/
          })();
        }
      }
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }
  //----------- end 提交评论(列表) -----------//



})

.controller('SquareDetailCtrl', function($scope, ComeFrom, $rootScope, $timeout, $state, mEvent, $cookies, SquareEvent, $http, $ionicModal, $ionicPopup, $stateParams) {

  CommonFn($scope, $rootScope, $stateParams);
  $scope.url = $stateParams.url;
  ComeFrom.get(); //判断从哪个页进入

  $rootScope.CurrentURL = "/#/tab/square/detail/"+$stateParams.Id;
  // console.log($stateParams.Id);
  //判断从哪个页(Square/mySquare)进入

  mEvent.GetConstantXML(); //获取XML配置文件
  
  //广场列表（普通）
  if($rootScope.squareList){
    // [GET] 广场详情Detail(无刷新)
    angular.forEach($rootScope.squareList,function(data,index){
      if(data.Id == $stateParams.Id){
        $scope.item = data;
      }
    });
  }else{
    //[GET] 获得广场列表
    $http.get($rootScope.app_config.api + "/api/Common/Square/GetNewestMessageList").success(function(rs){
      $rootScope.squareList = rs.body;
      // [GET] 广场详情Detail
      angular.forEach($rootScope.squareList,function(data,index){
        if(data.Id == $stateParams.Id){
          $scope.item = data;
          SquareEvent.formatImageDetail($scope.item);
        }
      });
    });
  }

  //广场列表（最新加号）
  if($rootScope.squareList_Simple){
    // [GET] 广场详情Detail(无刷新)
    angular.forEach($rootScope.squareList_Simple,function(data,index){
      if(data.Id == $stateParams.Id){
        $scope.item = data;
      }
    });
  }else{
    //[GET] 获得广场列表
    $http.get($rootScope.app_config.api + "/api/Common/Square/GetHotMessageList").success(function(rs){
      $rootScope.squareList_Simple = rs.body;
      // [GET] 广场详情Detail
      angular.forEach($rootScope.squareList_Simple,function(data,index){
        if(data.Id == $stateParams.Id){
          $scope.item = data;
          SquareEvent.formatImageDetail($scope.item);
        }
      });
    });
  }
  
  
  //输出当前URL：detail/:Id，用此Id获取服务端json
  // alert($stateParams.Id);
  
  //----------- 点赞 -----------//
  $scope.eventPostPraise = function(){
    SquareEvent.clickPraise($scope);
  }
  //删除动态
  $scope.mySquareDel = function(){
    // console.log(this.item.Id);
    SquareEvent.deleteItem($scope.item.Id,"squareList");
  }
  //删除评论(详情页)(结构与[列表]不同);
  $scope.mySquareMessageDel = function(){
    var messageId = this.itemChild.Id;
    var curIndex = $scope.item.MessageReplyList.length-1-this.$index
    var confirmPopup = $ionicPopup.confirm({
      title: '删除此条评论',
      template: '确定删除该评论吗？',
      buttons:[
        {
          text:'确定',
          type:'button-positive',
          onTap: function(e){
            if($cookies.get("Ticket")){
              (function(){
                function httpCallBack(res){
                  httpFn = undefined;
                  $scope.item.MessageReplyList.splice(curIndex,1);
                  $scope.item.ReplyCount--;
                }
                var httpFn = function(){
                  mEvent.http("POST", "/api/Common/Square/DeleteMyMessageReply", true, httpCallBack, { MsgReplyId:messageId });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
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
  }
  
  //举报动态
  $scope.inform = function(){
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
    SquareEvent.inform($scope.item.Id);
  }
  
  //-----------评论(详情页)-----------//
  //Config
  $scope.isFocus = false;
  $scope.commentPlaceholder = "发表您的评论";
  $scope.commentContent = "";
  
  //显示回复评论框（回复他人）
  var isReply = false;
  $scope.repRepId = "";
  $scope.replyComment = function(){
    if(!mEvent.CheckLogin()){
      $scope.commentContent = "";
      if(this.itemChild.UserId!=$rootScope.userImfor.Id){
        isReply = true;
        $scope.repRepId = this.itemChild.Id;
        $scope.commentPlaceholder = "回复 " + this.itemChild.UserNickName;
        // console.log($scope.commentPlaceholder);
      }else{
        isReply = false;
        $scope.repRepId = "";
        $scope.commentPlaceholder = "发表您的评论";
      }
    }
  }
  
  //评论框重置[非回复状态]
  $scope.getMyMessageFocus = function(){
    isReply = false;
    $scope.repRepId = "";
    $scope.commentPlaceholder = "发表您的评论";
  }
  
  //----------- 提交评论(详情页) -----------//
  $scope.submitComment = function(itemId){
    
    var thisComment = this.commentContent;
    this.commentContent = "";
    
    if($cookies.get("Ticket")){
      if(thisComment!=""){
        
        if(!isReply){

          //---------- 1.直接评论 -----------
          (function(){
            function httpCallBack(res){
              (function(){
                function httpCallBack(res){
                  httpFn = undefined;
                  $scope.item.MessageReplyList = res.body.MessageReplyList;
                  $scope.item.ReplyCount ++;
                }
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessageReply", true, httpCallBack, { MsgId:itemId,Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();

        }else{

          //---------- 2.回复某人的评论 -----------
          (function(){
            function httpCallBack(res){
              //查询评论列表
              (function(){
                function httpCallBack(res){
                  httpFn = undefined;
                  $scope.item.MessageReplyList = res.body.MessageReplyList;
                  $scope.item.ReplyCount ++;
                }
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
            }
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessgaeReplyToReply", true, httpCallBack, { MsgId:itemId, ReplyId:$scope.repRepId, Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          })();
        }
      }
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }
  //----------- end 提交评论(详情页) -----------//
 
})

.controller('SquareImformationCtrl', function($scope, $rootScope, mEvent, ComeFrom, $timeout, $http, GetUserImfor, $cookies, $ionicModal, $ionicPopup, SquareEvent, $stateParams){

  CommonFn($scope, $rootScope, $stateParams);
  
  ComeFrom.get();
  if($rootScope.entry=='tab' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetPersonal();}
  if($rootScope.entry=='company' && $cookies.get('Ticket') && $cookies.get('s')){ GetUserImfor.GetCompany();}

  //获取他人用户信息
  (function(){
    function httpCallBack(rs){
      $scope.Imfors = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Square/GetUserInfo?UserId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  
})

.controller('MyRegisterNew', function($scope, $rootScope, mEvent, $state, $interval, $ionicPopup, $http, $cookies, $stateParams) {
  
  CommonFn($scope, $rootScope, $stateParams);
  mEvent.GetConstantXML(); //获取XML配置文件

  //删除账号(测试) 13670511519
  // $scope.delTest = function(){
  //   $http({ method:'Get', url:app_config.api + '/api/Company/Test/DeletePhone' }).success(function(rs){
  //     console.log(rs);
  //     if(rs.code==0){
  //       alert('删除成功');
  //     }else{
  //       alert(rs.msg+'('+rs.code+')');
  //     }
  //   })
  // }

  // [Init] Datas
  $scope.datas = { Phone:'', Vercode:'', AreaId:'', Ident:'' }
  
  require(['md5'],function(){
    // [GET] 获取图形验证码
    $scope.GetVercodeImg = function(){
      $http({
        //method:'POST', data: {Width: 80, Height: 32, Type: 1},
        // Type：类型(登录=0，注册=1，忘记密码=2)
        method:'GET',
        url:$rootScope.app_config.api + '/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=1'
      }).success(function(rs){
        $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
        $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
      });
    }
    $scope.GetVercodeImg();
    $scope.ChangeVercodeImg = function(){
      $scope.GetVercodeImg();
    }
  });


  // 提交表单
  $scope.submitForm = function(isValid,url) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
        $scope.isErrorForSubmit = false;
        require(['base64', 'md5'],function(){
          $http({
            method:"POST",
            url:$rootScope.app_config.api + "/api/JobSeeker/User/Register",
            data:$scope.datas
          }).success(function(res){
            if(res.code=="0"){
              //注册成功后自动登录
              var b = new Base64();
              // $scope.formData = '{ "UserName":' + $scope.datas.Phone + ', "Password":' + hex_md5($scope.datas.Password) + ' }';
              // $scope.datas.Password = hex_md5($scope.datas.Password);
              $scope.datas.Type = "Personal";
              $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
              $cookies.put("Ticket", res.body, {'expires': mEvent.setExpireDate(), 'path': '/'});
              
              // 注册成功（跳转到基本信息）
              $state.go($rootScope.entry + '.my-imformation');

            }else{
              $ionicPopup.alert({
                title: '提示', template: res.msg + '(' + res.code +')', okText:'确定'
              });
              if(res.code=="80203"){
                $scope.GetVercodeImg();
                $scope.datas.Vercode = '';
              }
            }
          });
      });
    }
  }
  
})



.controller('MyCtrl', function($scope, $rootScope, $stateParams, $ionicHistory, mEvent, ComeFrom, isLogin, GetUserImfor, $state, $cookies, $http, $ionicPopup, $interval, $location) {
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  $rootScope.CurrentURL = "/#/tab/my";

  require(['base64'],function(){
    var b = new Base64();
    if($cookies.get("s")){

      if(JSON.parse((b.decode($cookies.get("s")))).Type=='Company'){ $rootScope.entry = 'company'; }
      if(JSON.parse((b.decode($cookies.get("s")))).Type=='Personal'){ $rootScope.entry = 'tab'; }
      // $rootScope.entry = JSON.parse((b.decode($cookies.get("s")))).Type;

      if($rootScope.entry=='tab'){
        // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
        if(!$rootScope.userImfor){ GetUserImfor.GetPersonal(); }

        $rootScope.$on("GetUserImfor",function(){
          if($rootScope.userImfor.IsHasResumeBaseInfo){
            // 获取默认简历
              function httpCallBack(rs){
                httpFn = undefined;
                $scope.defaultResume = rs.body;
              }
              var httpFn = function(){
                mEvent.http("GET", "/api/JobSeeker/Resume/GetDefaultResume", true, httpCallBack, '');
              }
              httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          }
        });
        
        // 获取我的简历设置
        (function(){
          function httpCallBack(rs){
            // ---------------------------------------------------------
            httpFn = undefined;
            if(rs.body.Mode==1){ $scope.resumeModeText = '任何人可查看';}
            if(rs.body.Mode==2){ $scope.resumeModeText = '任何人不可查看';}
            // ---------------------------------------------------------
          }
          var httpFn = function(){
            mEvent.http("GET", "/api/JobSeeker/Resume/GetSecuritySet", true, httpCallBack, '');
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();

      }else{
        $state.go($rootScope.entry + '.my');
      }

    }
  });


  


  //======================== (Button)注销 ========================
  $scope.logout = function(){

    //向服务端提交注销日志，提交成功后注销Cookie
    (function(){
      function httpCallBack(res){
        httpFn = undefined;
        $rootScope.userImfor = undefined;

        $cookies.remove("Ticket",{'path': '/'});
        $cookies.remove("s",{'path': '/'});
        $rootScope.IsHasMessageApply = false;

        $scope.$broadcast('UserLogouted', true);
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go($rootScope.entry + '.login');
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/User/LoginOff", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }
  
  
})

.controller('MyAccountCtrl', function($scope, $rootScope, $stateParams, mEvent, GetUserImfor){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){

    if($rootScope.entry=='tab'){ GetUserImfor.GetPersonal(); }
    if($rootScope.entry=='company'){ GetUserImfor.GetCompany(); }

    $rootScope.$on("GetUserImfor",function(){
      $scope.Phone = $rootScope.userImfor.Phone;
      $scope.RegisterTime = $rootScope.userImfor.RegisterTime;
    });

  }else{
    $scope.Phone = $rootScope.userImfor.Phone;
    $scope.RegisterTime = $rootScope.userImfor.RegisterTime;
  }
  
})

.controller('MyNicknameCtrl', function($scope, $rootScope, $stateParams, $ionicPopup, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){
    GetUserImfor.GetPersonal();
    $rootScope.$on("GetUserImfor", function(){
      $scope.datas = { "nickName" : $rootScope.userImfor.NickName }
    });
  }else{
    $scope.datas = { "nickName" : $rootScope.userImfor.NickName }
  }

  // [POST] 修改昵称
  $scope.processForm = function(){
    // console.log("$scope.datas:");
    // console.log($scope.datas);
    if($scope.datas.nickName!=$rootScope.userImfor.NickName){
      if($scope.datas.nickName!=""){

        (function(){
          /*------------- Second Packaging CallBack -------------*/
          function httpCallBack(rs){
            httpFn = undefined;
            if(rs.code=="0"){
              //添加成功
              $rootScope.userImfor.NickName = $scope.datas.nickName;
              $location.path('/tab/my');
            }else{
              //昵称被占用
              $ionicPopup.alert({ title:'提示', template:rs.msg + '(' + rs.code + ')' });
            }
          }
          /*------------- Second Packaging -------------*/
          var httpFn = function(){
            mEvent.http("POST", "/api/Common/User/ChangeNickName", true, httpCallBack, $scope.datas);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          /*------------- end -------------*/
        })();
      }else{
        $scope.isUse = true;
        $scope.isUseMsg = "昵称不能为空";
      }
    }else{
      // 无修改的时候直接返回
      $location.path('/tab/my');
    }
  }
  //======================== END 修改昵称 ========================
})


// 基本信息(求职者)
.controller('MyImformationCtrl', function($scope, $rootScope, $ionicScrollDelegate, ComeFrom, $ionicHistory, $stateParams, $state, $location, mEvent, isLogin, GetUserImfor, ionicDatePicker, $filter, $timeout, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  mEvent.GetConstantXML(); //获取XML配置文件

  (function(){
    function httpCallBack(res){
      httpFn = undefined;
      
      if(res.code==50203){
        $rootScope.UserBaseInfor = {
          'Name':'', 'GenderCode':'', 'NationCode':'', 'MaritalStatusCode':'',
          'Birthday':'', 'Stature':'', 'Phone':'', 'Email':'', 'QQ':'',
          'Address':'', 'ComputerLevelCode':'', 'EnglishLevelCode':'',
          'LiveAreaId':'', 'NativePlaceAreaId':'', 'EducationCode':'',
          'WorkingAgeCode':'', 'GraduateSchool':'', 'MajorIn':'', 'Labels':''
        }
      }else{
        $rootScope.UserBaseInfor = res.body;
        // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
        if(!$rootScope.UserBaseInfor.Phone){
          if(!$rootScope.userImfor){
            GetUserImfor.GetPersonal();
            $rootScope.$on("GetUserImfor",function(evt, d){
              $rootScope.UserBaseInfor.Phone = d.Phone;
            });
          }else{
            $rootScope.UserBaseInfor.Phone = $rootScope.userImfor.Phone;
          }
        }
      }

      mEvent.GetConstantXML(); //获取XML配置文件
      // Date 数据加载完成
      $timeout(function(){
        $rootScope.$broadcast('isDateLoaded', true);
      },0);

      
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/JobSeeker/Resume/GetBaseInfo", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();


  // [POST] 更新基本资料(求职者)
  $scope.submitForm = function(isValid) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
      $ionicScrollDelegate.resize();
    }else{
      $scope.isErrorForSubmit = false;
      
      //验证成功后提交后跳转
      (function(){
        function httpCallBack(rs){
          httpFn = undefined;
          if(rs.code==0){
            if($rootScope.backToUrl){
              
              //跳转回 [名片]
              if($rootScope.backToUrl=='/tab/square/card/full'){
                $ionicHistory.goBack();
              }else{
                $location.path($rootScope.backToUrl);
                $rootScope.backToUrl = '';
              }
              
            }else{

              //更新基本资料成功
              //判断是否有第一份简历，如果没有则跳转到新增简历
              (function(){
                function httpCallBack(rs){
                  httpFn = undefined;
                  if(rs.code==0){
                    if(rs.body.length<=0){
                      $state.go('tab.my-resume-detail',{ 'Id':'add' });
                    }else{
                      $state.go('tab.my');
                    }
                  }
                }
                var httpFn = function(){
                  mEvent.http("GET", "/api/JobSeeker/Resume/GetResumeList", true, httpCallBack, $rootScope.UserBaseInfor);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();
              
            }
          }
        }
        var httpFn = function(){
          mEvent.http("POST", "/api/JobSeeker/Resume/UpdateBaseInfo", true, httpCallBack, $rootScope.UserBaseInfor);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
  }

  $scope.postSubmit = function(){
    require(['jquery'], function($){
      $('#submitBtn').click();
    });
  }


})

.controller('MyAccountPhoneCtrl', function($scope, isLogin, GetUserImfor, $ionicHistory, $state, $stateParams, $ionicPopup, $rootScope, mEvent, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor && $rootScope.entry=='tab'){ GetUserImfor.GetPersonal(); }
  if(!$rootScope.userImfor && $rootScope.entry=='company'){ GetUserImfor.GetCompany(); }

  $scope.datas = {}
  $scope.submitForm = function(isValid){
    if(!isValid) {
      $scope.submitError = true;
    }else{
      $scope.submitError = false;
      if($scope.datas.Phone==$rootScope.userImfor.Phone){
        $ionicPopup.alert({
          title:'提示', template:'不能绑定原来的手机号'
        });
      }else{

        (function(){
          function httpCallBack(rs){
            httpFn = undefined;
            if(rs.code!=0){
              $ionicPopup.alert({
                title:'提示', template:rs.msg + '(' + rs.code + ')'
              });
            }else{
              $ionicPopup.alert({
                title:'提示', template:'绑定成功!'
              });
              if(!$rootScope.userImfor && $rootScope.entry=='tab'){ GetUserImfor.GetPersonal(); }
              if(!$rootScope.userImfor && $rootScope.entry=='company'){ GetUserImfor.GetCompany(); }
              $state.go('company.my');
            }
          }
          var httpFn = function(){
            mEvent.http("POST", "/api/Common/User/BindingPhone", true, httpCallBack, $scope.datas);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();

      }
    }
  }

})

// 修改密码
.controller('MyAccountPwdCtrl', function($scope, isLogin, $ionicPopup, GetUserImfor, $stateParams, $rootScope, mEvent, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 获取个人信息   // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){ GetUserImfor.GetPersonal(); }

  if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login"; }
  
  $scope.datas = {}
  $scope.submitForm = function(isValid,url) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
      // 验证成功后
      $scope.isErrorForSubmit = false;

        (function(){
          function httpCallBack(res){
            httpFn = undefined;
          if(res.code=="0"){
            // console.log("修改成功:");
            $cookies.remove("Ticket",{'path': '/'});
            $cookies.remove("s",{'path': '/'});
            $scope.errorMsg = undefined;
            $ionicPopup.alert({ title: '提示', template: '修改成功！请重新登录' });
            window.location.href = $rootScope.app_config.links + "/#/" + $rootScope.entry + "/login";
          }
          if(res.code=="2"){
            $scope.errorMsg = "旧密码输入错误"
          }
          }
          /*------------- Second Packaging -------------*/
          var httpFn = function(){
            mEvent.http("POST", "/api/Common/User/ChangePwd", true, httpCallBack, $scope.datas);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          /*------------- end -------------*/
        })();

    }
  };
  
})

// [求职者] 站内信 List
.controller('MyMessageCtrl', function($scope, $rootScope, GetUserImfor, $location, $stateParams, mEvent, $http, $cookies, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);
  GetUserImfor.GetPersonal();

  // [GET] 私信
  (function(){
    function httpCallBack(rs){
      httpFn = undefined;
      // console.log(rs.body);
      $rootScope.Message_MailGroupUsersList = rs.body;
      $rootScope.$broadcast('Message_MailGroupUsersList_onLoadDatas', $rootScope.Message_MailGroupUsersList); // 分页必须
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Mail/GetMailGroupUsers", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

  // [GET] 通知
  (function(){
    function httpCallBack(rs){
      httpFn = undefined;
      // console.log(rs.body);
      $rootScope.Message_InformList = rs.body;
      $rootScope.$broadcast('Message_InformList_onLoadDatas', $rootScope.Message_InformList); // 分页必须
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Inform/GetInformList", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})


// [求职者] 私信 详情 Detail
.controller('MyMessageDetailCtrl', function($scope, $rootScope, $timeout, $location, GetUserImfor, $stateParams, $ionicScrollDelegate, mEvent, $http, $cookies, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);
  GetUserImfor.GetPersonal();

  // [GET] 私信详情
  $scope.refreshMessage = function(){
    function httpCallBack(rs){
      httpFn = undefined;

      $rootScope.Message_MailGroupUsersDetail = rs.body.reverse();
      // $rootScope.$broadcast('Message_MailGroupUsersDetail_onLoadDatas', $rootScope.Message_MailGroupUsersDetail); // 分页必须

      // 添加已阅
      $http({
        method:'Post', url:$rootScope.app_config.api + '/api/Common/Mail/ReadMailContext',
        headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
        data: { MailId:rs.body[0].Id }
      }).success(function(rs){
        // console.log(rs);
        if(rs.code==0){
          $rootScope.IsHasMessageApply = false;
          GetUserImfor.GetPersonal();
        }
      });

      // 定位Scroll到底部
      $ionicScrollDelegate.scrollBottom();
      // $ionicScrollDelegate.resize();
      
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Mail/GetMailListByUser?userId=" + $stateParams.Id, true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }
  $scope.refreshMessage();
  

  // [Focus]
  $scope.CommentFocus = function(){ $ionicScrollDelegate.scrollBottom(true); }
  // [POST] 发送私信
  $scope.SubmitComment = function(text, rUserId){
    if(text && text!=''){
      var CurrentMailDetail = $rootScope.Message_MailGroupUsersDetail[0];
      var ReceiveUserId = '';
      (CurrentMailDetail.SendUser.Id==$rootScope.userImfor.Id) ? ReceiveUserId = CurrentMailDetail.ReceiveUser.Id : CurrentMailDetail.SendUser.Id;
      
      $http({
        method:'Post', url:$rootScope.app_config.api + '/api/Common/Mail/SendMail',
        headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
        data:{ Content:text, ReceiveUserId:ReceiveUserId }
      }).success(function(rs){
        if(rs.code==0){
          $scope.refreshMessage();
          $scope.commentContent = '';
        }
      });
    }
  }

})

// [求职者] 通知 详情 Detail
.controller('MyMessageDetailSystemCtrl', function($scope, $rootScope, $timeout, GetUserImfor, $stateParams, $ionicScrollDelegate, mEvent, $http, $cookies, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);
  GetUserImfor.GetPersonal();

  // [GET] 通知详情
  $scope.refreshMessageSystem = function(){

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(rs){
        httpFn = undefined;
        $rootScope.InformList = rs.body;
        // 添加已阅
        $http({
          method:'Post', url:$rootScope.app_config.api + '/api/Common/Inform/ReadInform',
          headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
          data: { InformId:rs.body[0].Id }
        }).success(function(rs){
          if(rs.code==0){
            $rootScope.IsHasMessageApply = false;
            GetUserImfor.GetPersonal();
          }
        });

      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Inform/GetInformList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();

  }
  $scope.refreshMessageSystem();

})


// [企业] 站内信 List
.controller('CompanyMyMessageCtrl', function($scope, $rootScope, GetUserImfor, $location, $stateParams, mEvent, $http, $cookies, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);
  GetUserImfor.GetCompany();

  // [GET] 私信
  (function(){
    function httpCallBack(rs){
      httpFn = undefined;
      // console.log(rs.body);
      $rootScope.Message_MailGroupUsersList = rs.body;
      $rootScope.$broadcast('Message_MailGroupUsersList_onLoadDatas', $rootScope.Message_MailGroupUsersList); // 分页必须
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Mail/GetMailGroupUsers", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

  // [GET] 通知
  (function(){
    function httpCallBack(rs){
      httpFn = undefined;
      // console.log(rs.body);
      $rootScope.Message_InformList = rs.body;
      $rootScope.$broadcast('Message_InformList_onLoadDatas', $rootScope.Message_InformList); // 分页必须
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Inform/GetInformList", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

// [企业] 私信 详情 Detail
.controller('CompanyMyMessageDetailCtrl', function($scope, $rootScope, $timeout, $location, GetUserImfor, $stateParams, $ionicScrollDelegate, mEvent, $http, $cookies, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);
  GetUserImfor.GetCompany();

  // [GET] 私信详情
  $scope.refreshMessage = function(){
    function httpCallBack(rs){
      httpFn = undefined;

      $rootScope.Message_MailGroupUsersDetail = rs.body.reverse();
      // $rootScope.$broadcast('Message_MailGroupUsersDetail_onLoadDatas', $rootScope.Message_MailGroupUsersDetail); // 分页必须

      // 添加已阅
      $http({
        method:'Post', url:$rootScope.app_config.api + '/api/Common/Mail/ReadMailContext',
        headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
        data: { MailId:rs.body[0].Id }
      }).success(function(rs){
        if(rs.code==0){
          GetUserImfor.GetCompany();
        }
      });

      // 定位Scroll到底部
      $ionicScrollDelegate.scrollBottom();

    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Mail/GetMailListByUser?userId=" + $stateParams.Id, true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }
  $scope.refreshMessage();
  

  // [Focus]
  $scope.CommentFocus = function(){ $ionicScrollDelegate.scrollBottom(true); }
  // [POST] 发送私信
  $scope.SubmitComment = function(text, rUserId){
    if(text && text!=''){
      var CurrentMailDetail = $rootScope.Message_MailGroupUsersDetail[0];
      var ReceiveUserId = '';
      (CurrentMailDetail.SendUser.Id==$rootScope.userImfor.Id) ? ReceiveUserId = CurrentMailDetail.ReceiveUser.Id : CurrentMailDetail.SendUser.Id;
      
      $http({
        method:'Post', url:$rootScope.app_config.api + '/api/Common/Mail/SendMail',
        headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
        data:{ Content:text, ReceiveUserId:ReceiveUserId }
      }).success(function(rs){
        if(rs.code==0){
          $scope.refreshMessage();
          $scope.commentContent = '';
        }
      });
    }
  }


})

// [企业]通知 详情 Detail
.controller('CompanyMyMessageDetailSystemCtrl', function($scope, $rootScope, $timeout, GetUserImfor, $stateParams, $ionicScrollDelegate, mEvent, $http, $cookies, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);
  GetUserImfor.GetCompany();

  // [GET] 通知详情
  $scope.refreshMessageSystem = function(){

    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        $rootScope.InformList = rs.body;
        console.log(rs.body);

        // 添加已阅
        $http({
          method:'Post', url:$rootScope.app_config.api + '/api/Common/Inform/ReadInform',
          headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
          data: { InformId:rs.body[0].Id }
        }).success(function(rs){
          if(rs.code==0){ GetUserImfor.GetCompany(); }
        });

      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Inform/GetInformList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }
  $scope.refreshMessageSystem();

})


.controller('MyJobsMessageDetailCtrl', function($scope, $rootScope, mEvent, $http, $cookies, $stateParams, isLogin){
  
  CommonFn($scope, $rootScope, $stateParams);

  if($rootScope.MessagesJobList){

    angular.forEach($rootScope.MessagesJobList, function(item){
      if(item.Id==$stateParams.Id){
        $scope.MessagesJobDetail = item;

        if($scope.MessagesJobDetail.IsRead==0){
          // [POST] 通知服务器该通知已阅
          (function(){
            /*------------- Second Packaging CallBack -------------*/
            function httpCallBack(res){
              console.log(res);
              //提示点
              $rootScope.hasMessageCount--;
              if($rootScope.hasMessageCount<=0){
                $rootScope.hasMessage = false;
              }
            }
            /*------------- Second Packaging -------------*/
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Inform/ReadInform", false, httpCallBack, { InformId:$scope.MessagesJobDetail.Id });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            /*------------- end -------------*/
          })();
        }

      }
    });

  }else{
    window.location.href = $rootScope.app_config.links + "/#/tab/my/message/jobs";
  }

})

.controller('MySquareCtrl', function($scope, $rootScope, $stateParams, $ionicScrollDelegate, mEvent, serviceMath, ComeFrom, isLogin, GetUserImfor, $cookies, $timeout, SquareEvent, $http, $ionicModal, $ionicPopup) {
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(); //判断从哪个页进入

  if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";$rootScope.CurrentURL = "/#/tab/square";return false; }
  
  GetUserImfor.GetPersonal();

  // $scope.pageNum = 0;
  // $scope.pageNumCount = 0;
  
  //获取我发布的动态
  (function(){
    function httpCallBack(res){
      httpFn = undefined;
      $rootScope.mySquareList = res.body;
      SquareEvent.formatImage($rootScope.mySquareList);
      $rootScope.$broadcast('mySquareList_onLoadDatas', $rootScope.mySquareList); // 分页必须  
      // $scope.pageNumCount = Math.ceil($rootScope.mySquareList.length/10);
      
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Square/GetMyReleaseMessageList", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  

  $scope.goTop = function(){ $ionicScrollDelegate.scrollTop(); }

  // $scope.prevPage = function(){
  //   $scope.pageNum--;
  //   $ionicScrollDelegate.scrollTop();
  // }

  // $scope.nextPage = function(){
  //   $scope.pageNum++;
  //   $ionicScrollDelegate.scrollTop();
  // }

  //----------- 点赞 -----------//
  $scope.eventPostPraise = function(){
    //SquareEvent.clickPraise(this);
    var SquareListElement = $rootScope.mySquareList[this.$index];
    if($cookies.get("Ticket")!=undefined){
      // [程序不肯修改，只好这样写]
      if(SquareListElement.PraiseUserIds[0]=="") SquareListElement.PraiseUserIds = [];
      if(SquareListElement.PraiseUserNickNames[0]=="") SquareListElement.PraiseUserNickNames = [];
      //--------------- 判断是否点赞(静态) ---------------
      if(SquareListElement.PraiseUserIds.indexOf($rootScope.userImfor.Id)<0){
        //不存在[我的]赞的情况，添加赞[我的Id]
        this.item.PraiseCount++;
        SquareListElement.PraiseUserIds.push($rootScope.userImfor.Id);
        SquareListElement.PraiseUserNickNames.push($rootScope.userImfor.NickName);
      }else{
        //已存在，删除赞[我的Id]
        this.item.PraiseCount--;
        var arrId = SquareListElement.PraiseUserIds;
        var arrNickname = SquareListElement.PraiseUserNickNames;
        serviceMath.removeArray(arrId,$rootScope.userImfor.Id); //[Service|serviceMath.removeArray]删除数组中的某个值
        serviceMath.removeArray(arrNickname,$rootScope.userImfor.NickName); //[Service|serviceMath.removeArray]删除数组中的某个值
      }
      // POST赞(Service);
      var thisId = this.item.Id;
      var isCurrentPraise = this.item.PraiseUserIds.indexOf($rootScope.userImfor.Id);
      SquareEvent.postPraise(this,thisId,isCurrentPraise);
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }
  //----------- END 点赞 -----------//
  
  
  //删除动态
  $scope.mySquareDel = function(){
    // console.log(this.item.Id);
    SquareEvent.deleteItem(this.item.Id,"mySquareList");
  }
  
  //删除评论
  $scope.mySquareMessageDel = function(){
    // console.log(this.itemChild.Id);
    var itemIndex = this.$parent.$parent.$index;
    var itemChildIndex = this.$index;
    SquareEvent.deleteMessageItem(this.itemChild.Id, itemIndex, itemChildIndex, $rootScope.mySquareList);
  }
  
  //举报动态
  $scope.inform = function(){
    if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
    SquareEvent.inform(this.item.Id);
  }
  
  //-----------评论(列表)-----------//
  //Config
  $scope.isShowList = false;
  $scope.isShowComment = false;
  $scope.commentPlaceholder = "发表您的评论";
  $scope.commentContent = "";
  
  //显示评论列表
  $scope.showList = function(){
    this.isShowList = !this.isShowList;
    if(!this.isShowList){
      this.isShowComment = false;
    }else{

      var thisId = this.item.Id;
      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + thisId, false, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();

    }
  }
  
  var isReply = false;
  //显示回复评论框
  $scope.showComment = function(){
    this.isShowComment = true;
    this.commentPlaceholder = "发表您的评论";
    if(!$scope.isShowList) this.isShowList = true;
    isReply = false;
    $scope.repRepId = "";
  }
  
  //显示回复评论框（回复他人）
  $scope.repRepId = "";
  $scope.replyComment = function(){
    if(!mEvent.CheckLogin()){
      this.$parent.isShowComment = true;
      this.$parent.commentContent = "";
      if(this.itemChild.UserId!=$rootScope.userImfor.Id){
        isReply = true;
        $scope.repRepId = this.itemChild.Id;
        this.$parent.commentPlaceholder = "回复 " + this.itemChild.UserNickName;
      }else{
        isReply = false;
        $scope.repRepId = "";
        this.$parent.commentPlaceholder = "发表您的评论";
      }
    }
  }
  
  //----------- 提交评论(列表) -----------//
  $scope.submitComment = function(itemId){
    
    var thisIndex = this.$index;
    var thisComment = this.commentContent;
    this.commentContent = "";
    if($cookies.get("Ticket")){
      if(thisComment!=""){
        
        if(!isReply){
          //---------- 1.直接评论 -----------
          var thisId = this.item.Id;

          (function(){
            /*------------- Second Packaging CallBack -------------*/
            function httpCallBack(res){
              httpFn = undefined;
              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(res){
                  // console.log("更新评论列表成功：");
                  $rootScope.mySquareList[thisIndex].MessageReplyList = res.body.MessageReplyList;
                  $rootScope.mySquareList[thisIndex].ReplyCount ++;
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
            /*------------- Second Packaging -------------*/
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessageReply", true, httpCallBack, { MsgId:thisId,Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            /*------------- end -------------*/
          })();

        }else{
          //---------- 2.回复某人的评论 -----------
          var thisId = this.item.Id;

          (function(){
            /*------------- Second Packaging CallBack -------------*/
            function httpCallBack(res){
              httpFn = undefined;

              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(res){
                  // console.log("更新评论列表成功：");
                  $rootScope.mySquareList[thisIndex].MessageReplyList = res.body.MessageReplyList;
                  $rootScope.mySquareList[thisIndex].ReplyCount ++;
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("GET", "/api/Common/Square/GetMessage?msgId=" + itemId, false, httpCallBack);
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
            /*------------- Second Packaging -------------*/
            var httpFn = function(){
              mEvent.http("POST", "/api/Common/Square/AddMessgaeReplyToReply", true, httpCallBack, { MsgId:thisId, ReplyId:$scope.repRepId, Content:thisComment });
            }
            httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
            /*------------- end -------------*/
          })();

        }
      }
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }
  //----------- end 提交评论(列表) -----------//
  
})

.controller('MyResumeCtrl', function($scope, $rootScope, $stateParams, GetUserImfor, mEvent, $cookies, $timeout, $ionicPopup, $location, $http, $state, ionicDatePicker, $filter, $ionicActionSheet){
  
  CommonFn($scope, $rootScope, $stateParams);
  // mEvent.GetConstantXML(); //获取XML配置文件
  
  if($rootScope.userImfor){
    if(!$rootScope.userImfor.IsHasResumeBaseInfo){
      $location.path('/tab/my/imformation');
    }
  }else{
    GetUserImfor.GetPersonal();
    $rootScope.$on("GetUserImfor", function(evt, d){
      $rootScope.userImfor = d;
      if(!$rootScope.userImfor.IsHasResumeBaseInfo){
        $location.path('/tab/my/imformation');
      }
    });
  }
  
  // 
  // [GET] 默认简历(求职者)
  // (function(){
  //   function httpCallBack(rs){
  //     httpFn = undefined;
  //     console.log(rs);
  //   }
  //   var httpFn = function(){
  //     mEvent.http("GET", "/api/JobSeeker/Resume/GetDefaultResume", true, httpCallBack, '');
  //   }
  //   httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  // })();

  // [GET] 基本信息
  (function(){
    function httpCallBack(res){
      httpFn = undefined;
      $rootScope.UserBaseInfor = res.body;
      mEvent.GetConstantXML(); //获取XML配置文件

      // [Click] 显示完整 基本信息
      $scope.isShowAll = false;
      $scope.showAllText = '显示全部';
      $scope.showAll = function(){
        if(!$scope.isShowAll){
          $scope.isShowAll = true;
          $scope.showAllText = '隐藏信息';
        }else{
          $scope.isShowAll = false;
          $scope.showAllText = '显示全部';
        }
      }
      // [Click] 跳转
      $scope.goInform = function(){ $location.path('/tab/my/imformation'); }
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/JobSeeker/Resume/GetBaseInfo", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  // end [GET] 基本信息


  // [GET] 简历列表
  (function(){
    /*------------- Second Packaging CallBack -------------*/
    function httpCallBack(res){
      httpFn = undefined;
      $rootScope.ResumeList = res.body;

      // [Click] 设置默认简历
      $scope.ChangeDefault = function(){
        var thisResumeId = this.item.Id;
        //------------------------------------
        (function(){
          /*------------- Second Packaging CallBack -------------*/
          function httpCallBack(res){
            httpFn = undefined;
            angular.forEach($rootScope.ResumeList, function(item, i){
              $rootScope.ResumeList[i].IsDefault = false;
              if(item.Id==thisResumeId){
                $rootScope.ResumeList[i].IsDefault = true;
              }
            })
          }
          /*------------- Second Packaging -------------*/
          var httpFn = function(){
            mEvent.http("POST", "/api/JobSeeker/Resume/SetDefaultResume", true, httpCallBack, {'ResumeId':thisResumeId});
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
          /*------------- end -------------*/
        })();
      }
      // end [Click] 设置默认简历

      // [Click] 删除简历
      $scope.DeleteResume = function(){
        var thisResumeId = this.item.Id;
        var thisResumeTitle = this.item.Title;

        var isDeletePopup = $ionicPopup.confirm({
          title:'提示', template:'是否删除简历：'+ thisResumeTitle
        });
        isDeletePopup.then(function(rs){
          if(rs){
            (function(){
              /*------------- Second Packaging CallBack -------------*/
              function httpCallBack(res){
                httpFn = undefined;
                angular.forEach($rootScope.ResumeList, function(item, i){
                  if(item.Id==thisResumeId){
                    $rootScope.ResumeList.splice(i,1);
                  }
                })
              }
              /*------------- Second Packaging -------------*/
              var httpFn = function(){
                mEvent.http("POST", "/api/JobSeeker/Resume/DeleteResume", true, httpCallBack, {'ResumeId':thisResumeId});
              }
              httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              /*------------- end -------------*/
            })();
          }
        })
      }

    }
    var httpFn = function(){
      mEvent.http("GET", "/api/JobSeeker/Resume/GetResumeList", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();
  // end [GET] 简历列表

})

.controller('MyResumeDetailCtrl', function($scope, $rootScope, ComeFrom, $stateParams, $location, mEvent, $cookies, $timeout, $ionicPopup, $http, ionicDatePicker, $filter, $ionicActionSheet){
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  mEvent.GetConstantXML(); //获取XML配置文件

  // [Init] Datas
  if($stateParams.Id=='add'){
    $scope.ResumeDetail = {
      Title : '',  IntentionJobTypeIds : '',
      IntentionAreaIds : '', IntentionPayCode : '',
      Certificate : '', Skill : '',
      EduExperience : '', WorkExperience : '',
      PersonalProfile : '' 
    }
    $scope.tempEduExperience = [];
    $scope.tempWorkExperience = [];
  }

  // [GET] (修改) 获取简历信息
  if($stateParams.Id!='add'){
    (function(){
      function httpCallBack(res){
        // ---------------------------------------------------------
        $scope.ResumeDetail = res.body;
        
        mEvent.GetConstantXML(); //获取XML配置文件
        // String转JSON
        // try{
        $scope.tempEduExperience = $scope.ResumeDetail.EduExperience ? JSON.parse($scope.ResumeDetail.EduExperience) : [];
        $scope.tempWorkExperience = $scope.ResumeDetail.WorkExperience ? JSON.parse($scope.ResumeDetail.WorkExperience) : [];
        // }catch(e){
        //   // console.log(e);
        // }
        // ---------------------------------------------------------
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Resume/GetResume?resumeId="+$stateParams.Id, true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }else{  //[Cookies] (添加) 获取临时保存的草稿
    if($cookies.get('tempResumeDatas')){
      $scope.ResumeDetail = JSON.parse($cookies.get('tempResumeDatas'));
      mEvent.GetConstantXML(); //获取XML配置文件
    }
  }
  
  
  // $cookies.remove('tempResumeDatas');

  //[Init] config
  $scope.tempData = {};
  $scope.btnText = "添加";
  
  //------------------------- 教育经历 ----------------------------

  // [Init] 生成弹窗(数据) IonicPopup
  $scope.eduOpenIonicPopup = function(action, index){
    // [Init]
    if(action=="edit"){
      $scope.btnText = "修改";
    }else{
      $scope.tempData = { EduSchool:'', EduProfessional:'', EduLevelValue:'', EduinTime:'', EduoutTime:'' }
    }
    $scope.tempDataText = { EduSchool:'学校名称', EduProfessional:'专业名称', EduLevelValue:'学历', EduinTime:'入学时间', EduoutTime:'毕业时间' }
    
    // [Init] XML初始化(根据学历Code显示中文)
    require(['xml2json'],function(){
      if(!localStorage.getItem("ConstantXMLJson")){
        $http.get("/Config/Constant.xml").success(function(rsxml){
          localStorage.setItem("ConstantXMLJson", rsxml);
          var x2js = new X2JS(), json_rsxml = x2js.xml_str2json(rsxml);
          angular.forEach(json_rsxml.Constant.Item, function(items){
            if(items._name=="Education"){ $scope.allLevel = items.Node; }
          });
          
        });
      }else{
        $timeout(function(){
          var rsxml = localStorage.getItem("ConstantXMLJson");
          var x2js = new X2JS(), json_rsxml = x2js.xml_str2json(rsxml);
          angular.forEach(json_rsxml.Constant.Item, function(items){
            if(items._name=="Education"){ $scope.allLevel = items.Node; }
          });
        },0);
      }
    });

    // [Init] Date 数据加载完成触发日历 date-directive
    $timeout(function(){ $rootScope.$broadcast('isDateLoaded', true); }, 0);

    // [Init] 生成弹窗(结构)(事件)
    var myPopup = $ionicPopup.confirm({
      template:"<div class='ionicPopupInput'>"+
                  "<div class='inputItem'><label>学校名称：</label><input type='text' placeholder='输入学校名称' ng-model='tempData.EduSchool'/></div>"+
                  "<div class='inputItem'><label>专业名称：</label><input type='text' placeholder='输入专业名称' ng-model='tempData.EduProfessional'/></div>"+
                  "<div class='inputItem'>"+
                    "<label>学历：</label>"+
                    "<div class='checkGroup'>"+
                      "<ion-radio ng-repeat='eduChk in allLevel track by $index' ng-value='eduChk._key' ng-model='tempData.EduLevelValue'>"+ // eduChk._key   tempData.EduLevel._key
                        "{{ eduChk._value }}"+
                      "</ion-radio>"+
                    "</div>"+
                  "</div>"+
                  "<div class='inputItem row' style='margin-bottom:-10px;'>"+
                    "<div class='col col-50'>"+
                      "<label>入学时间：</label>"+
                      "<date-directive bind-value='tempData.EduinTime' max='tempData.EduoutTime' format='yyyy/MM/dd' bind-value-format='true'></date-directive>"+
                    "</div>"+
                    "<div class='col col-50'>"+
                      "<label>毕业时间：</label>"+
                      "<date-directive bind-value='tempData.EduoutTime' min='tempData.EduinTime' format='yyyy/MM/dd' bind-value-format='true'></date-directive>"+
                    "</div>"+
                  "</div>"+
                "</div>",
      cssClass:"resumeConfirm", scope:$scope,
      buttons:[
        {
          text:$scope.btnText, type:"button-positive",
          onTap:function(e){

            // 验证
            var isValid = true , isGoing = true;
            angular.forEach($scope.tempData, function(val, key){
              if(val=='' && isGoing){
                $ionicPopup.alert({ title: '提示', template: $scope.tempDataText[key] + ' 不能为空', okText:'确定' });
                isValid = false, isGoing = false;
                e.preventDefault();
              }
            });

            var _in = new Date($scope.tempData.EduinTime);
            var _out= new Date($scope.tempData.EduoutTime);
            if(_in > _out){
              $ionicPopup.alert({ title: '提示', template: '在校时间格式错误!', okText:'确定' });
              isValid = false, isGoing = false;
              e.preventDefault();
            }

            isGoing = true;
            // end 验证

            if(isValid){
              if(action=="edit"){
                // 修改教育经历
                $scope.tempEduExperience[index] = $scope.tempData;
              }else{
                // 添加教育经历
                $scope.tempEduExperience.push($scope.tempData);
              }
            }
            
          }
        },
        { text:"取消" , onTap:function(e){

            // if($scope.tempData.EduinTime!=''&&$scope.tempData.EduoutTime!=''){
            //   var isValid = true , isGoing = true;
            //   angular.forEach($scope.tempData, function(val, key){
            //     if(val=='' && isGoing){
            //       $ionicPopup.alert({ title: '提示', template: $scope.tempDataText[key] + ' 不能为空', okText:'确定' });
            //       isValid = false, isGoing = false;
            //       e.preventDefault();
            //     }
            //   });
            //   isGoing = true;
            // }

          }
        }

      ]
    });
  }
  
  //[Click] 增加 教育经历
  $scope.addEducation = function(){ $scope.tempData = {}; $scope.eduOpenIonicPopup('add'); }
  //[Click] 修改 教育经历
  $scope.editEducation = function(index){ $scope.tempData = $scope.tempEduExperience[index]; $scope.eduOpenIonicPopup('edit', index);}
  //[Click] 删除 教育经历
  $scope.deleteEducation = function(index){ $scope.tempEduExperience.splice(index,1); }


  //------------------------- 工作经历 ----------------------------
  // [Init] 生成弹窗(数据) IonicPopup
  $scope.jobOpenIonicPopup = function(action, index){
    // [Init]
    if(action=="edit"){
      $scope.btnText = "修改";
    }else{
      $scope.tempData = { JobCompany:'', JobName:'', JobinTime:'', JoboutTime:'', JobDetail:'' }
    }
    $scope.tempDataText = { JobCompany:'公司名称', JobName:'职位名称', JobinTime:'入职时间', JoboutTime:'离职时间', JobDetail:'工作描述' }

    // [Init] Date 数据加载完成触发日历 date-directive
    $timeout(function(){ $rootScope.$broadcast('isDateLoaded', true); }, 0);

    // mEvent.InitWorkExperience($scope.tempData, action, index);

    // [Init] 生成弹窗(结构)(事件)
    // var myPopup = $ionicPopup.confirm({
    $ionicPopup.confirm({
      template:"<div class='ionicPopupInput'>"+
                  "<div class='inputItem'><label>公司名称{{tempData_Temporary}}<b>*</b>：</label><input type='text' placeholder='输入公司名称' ng-model='tempData.JobCompany'/></div>"+
                  "<div class='inputItem'><label>职位名称<b>*</b>：</label><input type='text' placeholder='输入职位名称' ng-model='tempData.JobName'/></div>"+
                  "<div class='inputItem row' style='margin-bottom:0;'>"+
                    "<div class='col col-50'>"+
                      "<label>入职时间<b>*</b>：</label>"+
                      "<date-directive bind-value='tempData.JobinTime' max='tempData.JoboutTime' format='yyyy/MM/dd' bind-value-format='true'></date-directive>"+
                    "</div>"+
                    "<div class='col col-50'>"+
                      "<label>离职时间<b>*</b>：</label>"+
                      "<date-directive bind-value='tempData.JoboutTime' min='tempData.JobinTime' format='yyyy/MM/dd' bind-value-format='true'></date-directive>"+
                    "</div>"+
                  "</div>"+
                  "<div class='inputItem' style='margin-bottom:-10px;'>"+
                    "<label>工作描述<b>*</b>：</label><textarea placeholder='输入工作描述' class='inputText' ng-model='tempData.JobDetail'></textarea>"+
                  "</div>"+
                "</div>",
      cssClass:"resumeConfirm", scope:$scope,
      buttons:[
        {
          text:$scope.btnText, type:"button-positive",
          onTap:function(e){

            // 验证
            var isValid = true , isGoing = true;
            angular.forEach($scope.tempData, function(val, key){
              if(val=='' && isGoing){
                $ionicPopup.alert({ title: '提示', template: $scope.tempDataText[key] + ' 不能为空', okText:'确定' });
                isValid = false, isGoing = false;
                e.preventDefault();
              }
            });

            var _in = new Date($scope.tempData.JobinTime);
            var _out= new Date($scope.tempData.JoboutTime);
            if(_in > _out){
              $ionicPopup.alert({ title: '提示', template: '在职时间格式错误!', okText:'确定' });
              isValid = false, isGoing = false;
              e.preventDefault();
            }

            isGoing = true;
            // end 验证
            
            if(isValid){
              if(action=="edit"){
                // 修改工作经历
                $scope.tempWorkExperience[index] = $scope.tempData;
              }else{
                // 添加工作经历
                $scope.tempWorkExperience.push($scope.tempData);
              }
            }


          }
        },
        {
          text:"取消" , onTap:function(e){

            // if($scope.tempData.JobinTime!=''&&$scope.tempData.JoboutTime!=''){
            //   var isValid = true , isGoing = true;
            //   angular.forEach($scope.tempData, function(val, key){
            //     if(val=='' && isGoing){
            //       $ionicPopup.alert({ title: '提示', template: $scope.tempDataText[key] + ' 不能为空', okText:'确定' });
            //       isValid = false, isGoing = false;
            //       e.preventDefault();
            //     }
            //   });
            //   isGoing = true;
            // }
            
          }
        }
      ]
    });


  }
  
  //[Click] 增加 工作经历
  $scope.addJob = function(){ $scope.tempData = {}; $scope.jobOpenIonicPopup(); }
  //[Click] 修改 工作经历
  $scope.editJob = function(index){ $scope.tempData = $scope.tempWorkExperience[index];$scope.jobOpenIonicPopup('edit', index); }
  //[Click] 删除 工作经历
  $scope.deleteJob = function(index){ $scope.tempWorkExperience.splice(index,1); }
  
  // [POST] 更新简历 ----------------------------
  
  // 判断有没有第一份简历（接口：AddFirstResume/AddResume）
  $scope.AddResume_URI = '';
  function GetAddResumeUri(rlist){
    if(rlist.length==0){
      $scope.AddResume_URI = '/api/JobSeeker/Resume/AddFirstResume'
    }else{
      $scope.AddResume_URI = '/api/JobSeeker/Resume/AddResume';
    }
  }
  if($rootScope.ResumeList){
    GetAddResumeUri($rootScope.ResumeList);
  }else{
    // [GET] 简历列表
    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        if(rs.code==0){
          $rootScope.ResumeList = rs.body;
          GetAddResumeUri($rootScope.ResumeList);
        }
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Resume/GetResumeList", true, httpCallBack, '');
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  // end 判断有没有第一份简历

  $scope.submitForm = function(isValid,url) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
      $scope.isErrorForSubmit = false;
      
      // 教育经历/工作经历 JSON转String 类型
      $scope.ResumeDetail.EduExperience = JSON.stringify($scope.tempEduExperience);
      $scope.ResumeDetail.WorkExperience = JSON.stringify($scope.tempWorkExperience);

      // [POST] 更新简历
      if($stateParams.Id!='add'){
        $scope.ResumeDetail.ResumeId = $stateParams.Id;
        (function(){
          function httpCallBack(rs){
            // ---------------------------------------------------------
            if(rs.code!=0){
              $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code + ')', okText:'确定' });              
            }else{
              httpFn = undefined;

              

              if($rootScope.backToUrl){
                $location.path($rootScope.backToUrl);
                $rootScope.backToUrl = '';
              }else{
                $location.path('/tab/my/resume');
              }
            }
            // ---------------------------------------------------------
          }
          var httpFn = function(){
            mEvent.http("POST", "/api/JobSeeker/Resume/UpdateResume", true, httpCallBack, $scope.ResumeDetail);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();
      }
      
      // [POST] 添加简历
      if($stateParams.Id=='add'){

        // 只要点击提交了，表单就会暂时保存起来（类似草稿箱），发布成功则清除草稿箱
        $cookies.put('tempResumeDatas', JSON.stringify($scope.ResumeDetail), {'expires': mEvent.setExpireDate(), 'path': '/'});

        (function(){
          function httpCallBack(res){
            // ---------------------------------------------------------
            if(res.code==0){
              $cookies.remove('tempResumeDatas');
              httpFn = undefined;

              if($scope.AddResume_URI.indexOf('AddFirstResume')>0){
                $rootScope.userImfor.IsHasResume = true;
              }

              if($rootScope.backToUrl){
                $location.path($rootScope.backToUrl);
                $rootScope.backToUrl = '';
              }else{
                $location.path('/tab/my/resume');
              }
              
            }
            // ---------------------------------------------------------
          }
          var httpFn = function(){
            mEvent.http("POST", $scope.AddResume_URI, true, httpCallBack, $scope.ResumeDetail);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();
      }

    }
  }
  //---------------------------- END 提交简历(更新) ----------------------------
})

.controller('MyResumeSetCtrl', function($scope, $rootScope, $stateParams, mEvent, $cookies, $location, $ionicPopup, $http, $state){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 获取我的简历设置
  (function(){
    function httpCallBack(rs){
      // ---------------------------------------------------------
      httpFn = undefined;
      $scope.resumeMode = rs.body.Mode;

      // [POST] 更新我的简历设置
      $scope.changeMode = function(mode){
        (function(){
          function httpCallBack(rs){
            httpFn = undefined;
          }
          var httpFn = function(){
            mEvent.http("POST", "/api/JobSeeker/Resume/UpdateSecuritySet", true, httpCallBack, { Mode: mode.toString(), ShieldEnterpriseNames: [] });
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();
      }
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/JobSeeker/Resume/GetSecuritySet", true, httpCallBack, '');
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

//【求职者登录】
.controller('MyLoginCtrl',function($scope, $rootScope, $stateParams, GetUserImfor, $state, $ionicPopup, $ionicHistory, mEvent, DeviceRecord, $timeout, $interval, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  $scope.datas = { "UserName":parseInt($cookies.get('UserName_JobSeeker'))||"", "Password":"", "Ident":"", "Vercode":"" };


  // 手机版微信目前实现不了登录，参考[汕头招聘网/大众点评/知乎]都是只有PC没有WAP的微信登录
  // 京东能登录？据说是[京东]与腾讯有合作，单独开放给京东的一个微信手机登录Ticket

  // 微信网页授权
  // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
  // $scope.LoginWechatClick = function(){
  //   var appid = "wx2833a0e95cc863c6";
  //   var redirect_uri = encodeURIComponent("http://www.zdzp.cn/m/#/tab/registerOtherway/qq");
  //   var scope = "snsapi_login"; // snsapi_base / snsapi_userinfo
  //   var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "&state=1#wechat_redirect";
  //   window.location.href = url;
  // }

  // 生成二维码的
  // var appid = "wx2833a0e95cc863c6";
  // var redirect_uri = encodeURIComponent("http://www.zdzp.cn/m/#/tab/registerOtherway/qq");
  // var scope = "snsapi_base"; // snsapi_base / snsapi_userinfo
  // var obj = new WxLogin({
  //   id:"LoginWechat", appid: "wx2833a0e95cc863c6", 
  //   scope: "snsapi_login",
  //   redirect_uri: redirect_uri,
  //   state: "1"
  // });
  //https://open.weixin.qq.com/sns/explorer_broker?appid=wx2f5d8f9715c59d10&redirect_uri=https%3A%2F%2Fplogin.m.jd.com%2Fcgi-bin%2Fm%2Fwxcallback%3Flsid%3D39ej9ed5iw85jfg103hagyjw7sy5dm7g&response_type=code&scope=snsapi_userinfo&state=s9p7jco7&connect_redirect=1#wechat_redirect



  require(['base64'],function(){
    var b = new Base64();
    if($cookies.get("Ticket")){
      $state.go($rootScope.entry + '.my');
    }
  });
  
  // [GET] 获取图形验证码
  require(['md5'],function(){
    $scope.GetVercodeImg = function(){
      $http({
        //method:'POST', data: {Width: 80, Height: 32, Type: 1},
        // Type：类型(登录=0，注册=1，忘记密码=2)
        method:'GET',
        url:$rootScope.app_config.api+'/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=0'
      }).success(function(rs){
        $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
        $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
      });
    }
    $scope.GetVercodeImg();
    $scope.ChangeVercodeImg = function(){
      $scope.GetVercodeImg();
    }
  });

  // (Mobile弹出软键盘时，隐藏底部)
  $scope.BottomStatus = function(n){
    if(n==1){ $scope.isHideBottom = true;$rootScope.hideTabs = true;}
    if(n==2){ $scope.isHideBottom = false;$rootScope.hideTabs = false;}
  }

  
  // [QQ(测试)]
  $rootScope.isLogind_qq = false;
  try {
    if(QC.Login.check()){ QC.Login.signOut(); }
    QC.Login({
        btnId:'LoginQQ', size: "C_S"
    }, function(reqData, opts){
      // QQ login Success
      $scope.reqData = reqData;
      $rootScope.QQInform = reqData;
      $rootScope.isLogind_qq = true;
      window.location.href = "#/" + $rootScope.entry + "/registerOtherway/qq";
    });
  } catch (error) {
    // console.log(error);
  }
  // end [QQ] 测试

  // $scope.LoginQQClick = function(){
    // var c = "https://graph.qq.com/oauth2.0/authorize?client_id=101417177&response_type=token&scope=all&redirect_uri=http%3a%2f%2fwww.zdzp.cn%2fp%2fhome.html%23%2fpersonal%2fregister%2fotherway%2fqq";
    // window.location.href = c;
    
    // // QC.Login.showPopup({
    // //   appId:"101417177", redirectURI:"http://www.zdzp.cn/p/home.html"
    // // });

    // // window.open(c, "newwindow", "height=550, width=900, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no")
  // }


  $scope.isPost = false;
  $scope.readAndAgree = true;
  $scope.submitForm = function(isValid, myForm) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;

      // 弹窗错误提示
      var rules = [
        { rule: myForm.username.$error.required, msg:'手机不能为空!'  },
        { rule: !myForm.username.$error.required && myForm.username.$dirty && myForm.username.$invalid, msg:'手机格式不正确!' },
        { rule: myForm.password.$error.required, msg:'密码不能为空!' },
        { rule: !myForm.password.$error.required && myForm.password.$dirty && myForm.password.$invalid, msg:'密码必须是6-16位数字或字母!' },
      ];
      var keepEaching = true;
      angular.forEach(rules, function(item){
        if(keepEaching){
          // console.log(item);
          if(item.rule){
            keepEaching = false;
            $ionicPopup.alert({ title: '提示', template: item.msg, okText:'确定' });
          }
        }
      })
      // end 弹窗错误提示

    }else{
      $scope.isErrorForSubmit = false;
      $scope.isPost = true;
      // 验证成功-提交
      $http({
        method:'POST', data: $scope.datas,
        url: $rootScope.app_config.api + '/api/JobSeeker/User/Login'
      }).success(function(rs){

        $scope.isPost = false;
        if(rs.code != "0"){
          $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code + ')', okText:'确定' });
          // if(rs.code=="80203"){
          $scope.GetVercodeImg();
          $scope.datas.Vercode = '';
          $scope.datas.Password = '';
          // }
        }else{
          
          // 登录验证成功
          require(['base64', 'md5'],function(){
            //设置Cookie
            var expireTime = new Date();
            expireTime.setMinutes(expireTime.getMinutes() + 10); //10分钟 (服务端也会设置过期时限)
            $cookies.put("Ticket", rs.body, {'expires': mEvent.setExpireDate(), 'path': '/'}); //, {'expires': expireTime}
            //加密
            $scope.datas.Type = 'Personal';
            $scope.datas.Password = hex_md5($scope.datas.Password).toString();

            var b = new Base64();
            $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
            $cookies.put("UserName_JobSeeker", $scope.datas.UserName, {'expires': mEvent.setExpireDate(), 'path': '/'});

            //$emit
            $scope.$broadcast('UserLogined', true);
            if(!$rootScope.userImfor){ GetUserImfor.GetPersonal();}
            $ionicHistory.clearCache();

            //进入个人中心 或 返回上一页 或 带参数
            if($rootScope.StateRoutes && $rootScope.StateRoutes!=''){
              if($rootScope.StateRoutes.length>3){
                $state.go($rootScope.StateRoutes[2], $rootScope.StateRoutes[3]);
              }else{
                $state.go($rootScope.StateRoutes[2]);
              }
            }else{
              $state.go($rootScope.entry + '.my');
            }
          });
          // end 登录验证成功

        }

      });
    }
  };

})

// QQ登录
.controller('MyRegisterOtherway', function($scope, $rootScope, mEvent, GetUserImfor, $ionicHistory, $state, $interval, $ionicTabsDelegate, $ionicPopup, $http, $cookies, $stateParams) {
  
  CommonFn($scope, $rootScope, $stateParams);
  

  if($stateParams.Type.toLowerCase()=='qq'){
    $scope.headTitle = "QQ登录";
  }
  if($stateParams.Type.toLowerCase()=='wechat'){
    $scope.headTitle = "微信登录";
  }

  // [Init] Datas
  $scope.datas = { Phone:'', Vercode:'', AreaId:'', Ident:'' }
  
  require(['md5','base64'],function(){

    //------- QQ JS_SDK --------
    $rootScope.QQInform = '';
    $rootScope.QQLoginTokens = { openId : '', accessToken : '' }
    
    if(QC.Login.check()){

      // Type:
      // 0=登录，1=注册，2=忘记密码，
      // 3=绑定或更换绑定手机，4=解绑手机，
      // 5=绑定或更换绑定邮箱，6=解绑邮箱，99=其它情况
      $scope.GetVercodeImg = function(n){
        $http({
          method:'GET',
          url:$rootScope.app_config.api+'/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=' + n
        }).success(function(rs){
          $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
          $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
        });
      }

      // Tab
      $scope.GetVercodeImg(0);
      $scope.onTabSelected = function(n){
        $scope.GetVercodeImg(n);
        if(n==0){ //-- [QQ] 已有账号 -------------------------
          
        }
        if(n==1){ //-- [QQ] 没有账号 -------------------------
          mEvent.GetConstantXML(); //获取XML配置文件
        }
      }
      // end Tab

      QC.Login.getMe(function(openId, accessToken){
        $rootScope.QQLoginTokens = { 'OpenId':openId, 'Token':accessToken }

        $http({
          method:'POST', data: $rootScope.QQLoginTokens,
          url: $rootScope.app_config.api + '/api/JobSeeker/User/QQLogin'
        }).success(function(rs){
          // console.log(rs);

          if(rs.code==0){ //已绑定QQ
            $scope.tempUser = { "UserName":"", "Password":"", "Vercode":"", "Ident":"" }

            // 登录验证成功
            require(['base64'],function(){
              //设置Cookie
              var expireTime = new Date();
              expireTime.setMinutes(expireTime.getMinutes() + 10); //10分钟 (服务端也会设置过期时限)
              $cookies.put("Ticket", rs.body, {'expires': mEvent.setExpireDate(), 'path': '/'}); //, {'expires': expireTime}
              //加密
              $scope.datas.Type = 'Personal';
              var b = new Base64();
              $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
              $cookies.put("UserName_JobSeeker", $scope.datas.UserName, {'expires': mEvent.setExpireDate(), 'path': '/'});

              //$emit
              $scope.$broadcast('UserLogined', true);
              if(!$rootScope.userImfor){ GetUserImfor.GetPersonal();}
              $ionicHistory.clearCache();

              //进入个人中心 或 返回上一页 或 带参数
              if($rootScope.StateRoutes && $rootScope.StateRoutes!=''){
                if($rootScope.StateRoutes.length>3){
                  $state.go($rootScope.StateRoutes[2], $rootScope.StateRoutes[3]);
                }else{
                  $state.go($rootScope.StateRoutes[2]);
                }
              }else{
                $state.go($rootScope.entry + '.my');
              }
            });
            // end 登录验证成功
            
          }else{ //未绑定QQ（31001）

            QC.api("get_user_info", {}).success(function(rs){
              $rootScope.QQInform = rs.data;
            });
            var n = $ionicTabsDelegate.$getByHandle('tabQQ').selectedIndex();
            if(n==0){ //-- [QQ] 已有账号 -------------------------
              $scope.datas = {
                'UserName':'', 'Password':'', 'Ident':'', 'Vercode':'',
                'RelevanceType':'QQ',
                'RelevanceOpenId':$rootScope.QQLoginTokens.OpenId,
                'RelevanceToken':$rootScope.QQLoginTokens.Token
              }
            }
            if(n==1){ //-- [QQ] 没有账号 -------------------------
              mEvent.GetConstantXML(); //获取XML配置文件
              $scope.datas = {
                'Phone':'', 'PhoneVercode':'', 'Vercode':'', 'AreaId':'', 'Ident':'',
                'RelevanceType':'QQ',
                'RelevanceOpenId':$rootScope.QQLoginTokens.OpenId,
                'RelevanceToken':$rootScope.QQLoginTokens.Token
              }
            }
            $scope.GetVercodeImg(n);
            

            // [POST] 已有账号
            $scope.submitForm_login = function(isValid){
                if(!isValid) { $scope.submitError = true; }else{
                    $scope.submitError = false;
                    $scope.isPost = true;
                    // 提交登录
                    $http({
                      method:'POST', data: $scope.datas,
                      url: $rootScope.app_config.api + '/api/JobSeeker/User/Login'
                    }).success(function(rs){
                      $scope.datas.Type = "Personal";
                      if(rs.code!=0){
                        $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code +')', okText:'确定' });
                        $scope.GetVercodeImg(n);
                      }else{
                          
                          // 登录验证成功
                          require(['base64', 'md5'],function(){
                            //设置Cookie
                            var expireTime = new Date();
                            expireTime.setMinutes(expireTime.getMinutes() + 10); //10分钟 (服务端也会设置过期时限)
                            $cookies.put("Ticket", rs.body, {'expires': mEvent.setExpireDate(), 'path': '/'}); //, {'expires': expireTime}
                            //加密
                            $scope.datas.Type = 'Personal';
                            $scope.datas.Password = hex_md5($scope.datas.Password).toString();

                            var b = new Base64();
                            $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
                            $cookies.put("UserName_JobSeeker", $scope.datas.UserName, {'expires': mEvent.setExpireDate(), 'path': '/'});

                            //$emit
                            $scope.$broadcast('UserLogined', true);
                            if(!$rootScope.userImfor){ GetUserImfor.GetPersonal();}
                            $ionicHistory.clearCache();

                            //进入个人中心 或 返回上一页 或 带参数
                            if($rootScope.StateRoutes && $rootScope.StateRoutes!=''){
                              if($rootScope.StateRoutes.length>3){
                                $state.go($rootScope.StateRoutes[2], $rootScope.StateRoutes[3]);
                              }else{
                                $state.go($rootScope.StateRoutes[2]);
                              }
                            }else{
                              $state.go($rootScope.entry + '.my');
                            }
                          });
                          // end 登录验证成功

                      }
                    });
                }
            }

            // [POST] 没有账号（注册）
            $scope.submitForm_reg = function(isValid) {
              if(!isValid) {
                $scope.isErrorForSubmit = true;
              }else{
                  $scope.isErrorForSubmit = false;
                  require(['base64', 'md5'],function(){
                    $http({
                      method:"POST", data:$scope.datas,
                      url:$rootScope.app_config.api+"/api/JobSeeker/User/Register"
                    }).success(function(res){
                      if(res.code=="0"){
                        //注册成功后自动登录
                        var b = new Base64();
                        $scope.datas.Type = "Personal";
                        $cookies.put("s", b.encode(JSON.stringify($scope.datas)), {'expires': mEvent.setExpireDate(), 'path': '/'});
                        $cookies.put("Ticket", res.body, {'expires': mEvent.setExpireDate(), 'path': '/'});
                        // 注册成功（跳转到基本信息）
                        $state.go($rootScope.entry + '.my-imformation');
                      }else{
                        $ionicPopup.alert({
                          title: '提示', template: res.msg + '(' + res.code +')', okText:'确定'
                        });
                        if(res.code=="80203"){
                          $scope.GetVercodeImg();
                          $scope.datas.Vercode = '';
                        }
                      }
                    });
                });
              }
            }

            
          }
          // end 未绑定
        });
        // end $http
      });
      // end QC.Login      
    }

  });
  
})

// [求职者] 忘记密码
.controller('MyLoginForget', function($scope, $rootScope, $stateParams, mEvent, $http, $interval, $cookies, $ionicPopup) {
  
  CommonFn($scope, $rootScope, $stateParams);
  $scope.datas = { Phone:'', Vercode:'', Ident:'' }
  
  require(['md5'],function(){
    // [GET] 获取图形验证码
    $scope.GetVercodeImg = function(){
      $http({
        // method:'POST', data: {Width: 80, Height: 32, Type: 1},
        // Type：类型(登录=0，注册=1，忘记密码=2)
        method:'GET',
        url:$rootScope.app_config.api+'/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=2'
      }).success(function(rs){
        $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
        $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
      });
    }
    $scope.GetVercodeImg();
  });


  // 提交表单
  $scope.submitForm = function(isValid,url) {

    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
        $scope.isErrorForSubmit = false;

        require(['base64'],function(){
          $http({
            method:"POST",
            url:$rootScope.app_config.api+"/api/Common/User/PhoneForgotPwd",
            data:$scope.datas
          }).success(function(res){
            if(res.code=="0"){
              //注册成功后自动登录
              $ionicPopup.alert({
                title: '提示', template: '密码修改成功，请重新登录!', okText:'确定'
              });
              // var b = new Base64();
              // $scope.formData = '{ "UserName":' + $scope.datas.Phone + ', "Password":' + $scope.datas.Password + ' }';
              // $cookies.put("s", b.encode($scope.formData), {'expires': mEvent.setExpireDate()});
              // $cookies.put("Ticket", res.body, {'expires': mEvent.setExpireDate()});
              $state.go($rootScope.entry + '.my');
            }else{
              $ionicPopup.alert({
                title: '提示', template: res.msg + '(' + res.code +')', okText:'确定'
              });
              if(res.code=="80203"){
                $scope.GetVercodeImg();
                $scope.datas.Vercode = '';
              }
            }
          });
      });
    }
  }

})



// [企业] 忘记密码
.controller('CompanyMyLoginForget', function($scope, $rootScope, $stateParams, $timeout, $ionicScrollDelegate, mEvent, $http, $interval, $cookies, $ionicPopup) {
  
  CommonFn($scope, $rootScope, $stateParams);
  $scope.datas = { Phone:'', Password:'', Vercode:'', AreaId:$cookies.get("cityCode-key"), Ident:'' }

  require(['md5'],function(){
    // [GET] 获取图形验证码 base64
    $scope.GetVercodeImg = function(){
      // Type:
      // 0=登录，1=注册，2=忘记密码，
      // 3=绑定或更换绑定手机，4=解绑手机，
      // 5=绑定或更换绑定邮箱，6=解绑邮箱，99=其它情况
      $http({
        method:'GET',
        url:$rootScope.app_config.api+'/api/Common/VerificationCode/GetImage?Width=80&Height=32&Type=2'
      }).success(function(rs){
        $scope.VercodeImg = 'data:image/png;base64, ' + rs.body;
        $scope.datas.Ident = hex_md5(rs.body).toUpperCase();
      });
    }
    $scope.GetVercodeImg();
  });

  // 切换Tab事件
  $scope.myForm = { phoneForm:'', emailForm:'' }
  $scope.OnSelect = function(n){
    if(n==1){
      $scope.datas = { Phone:'', Password:'', Vercode:'', AreaId:$cookies.get("cityCode-key"), Ident:'' }
      if($scope.myForm.phoneForm) $scope.myForm.phoneForm.$setPristine();
    }else if(n==2){
      $scope.datas = { Email:'', Password:'', Vercode:'', AreaId:$cookies.get("cityCode-key"), Ident:'' }
      if($scope.myForm.emailForm) $scope.myForm.emailForm.$setPristine();
    }
    mEvent.GetConstantXML();
    $scope.isErrorForSubmit = false;
    $ionicScrollDelegate.resize();
    $scope.confirmPassword = '';
  }
  // end 切换Tab事件

  // 提交表单（找回密码）
  $scope.submitForm_Phone = function(isValid, url) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
      $scope.isErrorForSubmit = false;
      //[POST] 通过手机修改密码
      $http({
        method:"POST",
        url:$rootScope.app_config.api+"/api/Common/User/PhoneForgotPwd",
        data:$scope.datas
      }).success(function(res){
        if(res.code=="0"){
          //注册成功后自动登录
          $ionicPopup.alert({ title: '提示', template: '密码修改成功，请重新登录!', okText:'确定' });
          $state.go($rootScope.entry + '.my');
        }else{
          $ionicPopup.alert({ title: '提示', template: res.msg + '(' + res.code +')', okText:'确定' });
          if(res.code=="80203"){
            $scope.GetVercodeImg();
            $scope.datas.Vercode = '';
          }
        }
      })
      //end [POST] 通过手机修改密码
    }
  }

  // 提交表单（找回密码）
  $scope.submitForm_Email = function(isValid, url) {
    if(!isValid) {
      $scope.isErrorForSubmit = true;
    }else{
      $scope.isErrorForSubmit = false;
      //[POST] 通过手机修改密码
      $http({
        method:"POST",
        url:$rootScope.app_config.api+"/api/Common/User/EmailForgotPwd",
        data:$scope.datas
      }).success(function(res){
        if(res.code=="0"){
          //注册成功后自动登录
          $ionicPopup.alert({ title: '提示', template: '密码修改成功，请重新登录!', okText:'确定' });
          $state.go($rootScope.entry + '.my');
        }else{
          $ionicPopup.alert({ title: '提示', template: res.msg + '(' + res.code +')', okText:'确定' });
          if(res.code=="80203"){
            $scope.GetVercodeImg();
            $scope.datas.Vercode = '';
          }
        }
      })
      //end [POST] 通过手机修改密码
    }
  }


})


// 求职者-头像
.controller('MyHeadCtrl',function($scope, $rootScope, $stateParams, mEvent, GetUserImfor, $timeout, isLogin, $cookies, $http){

  CommonFn($scope, $rootScope, $stateParams);

  // 未获取，则获取个人信息
  // $rootScope.$on("GetUserImfor",function(e, data){ .. });
  if(!$rootScope.userImfor){ GetUserImfor.GetPersonal(); }


  $scope.myImage='';
  $scope.myImageSmall = true;
  
  //上传图片
  var handleFileSelect = function(evt) {
    $scope.myCroppedImage = '';
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage = evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
  
  $scope.changeed = function(img){
    $scope.myCroppedImage = img;
  }
  $scope.loaded = function(img){
    $scope.myCroppedImage = img;
  }
  
  // [POST] 点击保存图片
  $scope.changeHeadPic = function(){
    
    if($cookies.get("Ticket")){

      $http({
        method:"POST", url:$rootScope.app_config.api + '/api/Common/UploadFile/UploadImgBase64',
        data:{ Base64:$scope.myCroppedImage.split(",")[1] }
      }).success(function(rs){
        
        var uploadFileName = rs.body;
        $http({
          method:"POST", url:$rootScope.app_config.api + '/api/JobSeeker/JobSeeker/ChangeHeadPic',
          headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
          data:{ HeadPic: uploadFileName }
        }).success(function(rs){
          $rootScope.userImforHead = $scope.myCroppedImage;
          $rootScope.backTo('/#/tab/my');
        });

      });
      // return false;


      // // [POST] 保存图片(文件名)
      // (function(){
      //   function httpCallBack(res){
      //     httpFn = undefined;
      //     if(res.code==0){
      //       // 修改成功
      //       $rootScope.userImforHead = $scope.myCroppedImage;
      //       $rootScope.backTo('/#/tab/my');
      //     }
      //   }
      //   var httpFn = function(){
      //     mEvent.http("POST", "/api/JobSeeker/JobSeeker/ChangeHeadPic", true, httpCallBack, { HeadPic:$scope.myCroppedImage.split(",")[1] });
      //   }
      //   httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      // })();

      
      
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
    
  }
  
})

.controller('MyFriendsCtrl',function($scope, $rootScope, $stateParams, mEvent, ComeFrom, isLogin, $cookies, SquareEvent, $http, $ionicModal, $ionicPopup){
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();
  $rootScope.CurrentURL = "/#/tab/my/friends";

  if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }
  
  (function(){
    /*------------- Second Packaging CallBack -------------*/
    function httpCallBack(res){
      httpFn = undefined;
      $scope.myFriends = res.body;
      
      console.log("我的好友")
      console.log($scope.myFriends);

      //------------------------------- 数据转换 ----------------------------------
      function GetPinyin(item){
        var words = {
            "a":function(){$scope.myFriendsList["A"].push({ FirstWord:"A", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "b":function(){$scope.myFriendsList["B"].push({ FirstWord:"B", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "c":function(){$scope.myFriendsList["C"].push({ FirstWord:"C", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "d":function(){$scope.myFriendsList["D"].push({ FirstWord:"D", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "e":function(){$scope.myFriendsList["E"].push({ FirstWord:"E", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "f":function(){$scope.myFriendsList["F"].push({ FirstWord:"F", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "g":function(){$scope.myFriendsList["G"].push({ FirstWord:"G", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "h":function(){$scope.myFriendsList["H"].push({ FirstWord:"H", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "i":function(){$scope.myFriendsList["I"].push({ FirstWord:"I", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "j":function(){$scope.myFriendsList["J"].push({ FirstWord:"J", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "k":function(){$scope.myFriendsList["K"].push({ FirstWord:"K", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "l":function(){$scope.myFriendsList["L"].push({ FirstWord:"L", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "n":function(){$scope.myFriendsList["N"].push({ FirstWord:"N", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "m":function(){$scope.myFriendsList["M"].push({ FirstWord:"M", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "o":function(){$scope.myFriendsList["O"].push({ FirstWord:"O", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "p":function(){$scope.myFriendsList["P"].push({ FirstWord:"P", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "q":function(){$scope.myFriendsList["Q"].push({ FirstWord:"Q", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "r":function(){$scope.myFriendsList["R"].push({ FirstWord:"R", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "s":function(){$scope.myFriendsList["S"].push({ FirstWord:"S", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "t":function(){$scope.myFriendsList["T"].push({ FirstWord:"T", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "u":function(){$scope.myFriendsList["U"].push({ FirstWord:"U", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "v":function(){$scope.myFriendsList["V"].push({ FirstWord:"V", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "w":function(){$scope.myFriendsList["W"].push({ FirstWord:"W", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "x":function(){$scope.myFriendsList["X"].push({ FirstWord:"X", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "y":function(){$scope.myFriendsList["Y"].push({ FirstWord:"Y", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "z":function(){$scope.myFriendsList["Z"].push({ FirstWord:"Z", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); },
            "":function(){$scope.myFriendsList["NONE"].push({ FirstWord:"-", UserNickName:item.UserNickName, HeadImage:item.HeadImage, Phone:item.Phone, UserId:item.UserId }); }
        };
        if(typeof words[item.FirstPinyin] != "function"){ return false; }
        return words[item.FirstPinyin]();
      }
      $scope.myFriendsList = {A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],N:[],M:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[],NONE:[]};
      // console.log(res.body);
      angular.forEach(res.body,function(item){
        GetPinyin(item);
      })
      // console.log($scope.myFriendsList);
      //------------------------------- END 数据转换 ----------------------------------
    }
    /*------------- Second Packaging -------------*/
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Friend/GetAddressBook", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    /*------------- end -------------*/
  })();
  
  //修改备注
  $ionicModal.fromTemplateUrl("tab-my-friends-modalRemark.html",{
    scope:$scope,
  }).then(function(modal){
    $rootScope.modal = modal;
  });
    
})

.controller('MyJobRecordCtrl',function($scope, $rootScope, $stateParams, mEvent, isLogin, $http, $cookies){
  
  CommonFn($scope, $rootScope, $stateParams);

  $rootScope.CurrentURL = "/#/tab/my/jobrecord";
  
  //我的申请记录
  if($cookies.get("Ticket")){

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        httpFn = undefined;
        $rootScope.JobRecords = res.body;
        $rootScope.$broadcast('JobRecords_onLoadDatas', $rootScope.JobRecords); // 分页必须        
        
      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Job/GetApplyJobRecord", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();

  }else{
    window.location.href = $rootScope.app_config.links + "/#/tab/login";
    // console.log($rootScope.CurrentURL);
  }
  
})

.controller('MyWeilifeCtrl',function($scope, $rootScope, $stateParams, mEvent, $http){

  CommonFn($scope, $rootScope, $stateParams);

  //[List] 小达微生活
  (function(){
    /*------------- Second Packaging CallBack -------------*/
    function httpCallBack(res){
      httpFn = undefined;
      $scope.WeilifeItems = res.body;
    }
    /*------------- Second Packaging -------------*/
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/WeiLive/GetList", false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    /*------------- end -------------*/
  })();
  
})

.controller('MyWeilifeDetailCtrl',function($scope, $rootScope, $sce, mEvent, $http, $stateParams){

  CommonFn($scope, $rootScope, $stateParams);

  // [Detail] 小达微生活
  (function(){
    /*------------- Second Packaging CallBack -------------*/
    function httpCallBack(res){
      httpFn = undefined;
      $scope.WeilifeDetailItems = res.body.WeiLiveArticleList[$stateParams.Num];
      // console.log($scope.WeilifeDetailItems.Content);
      // console.log($sce.trustAsHtml($scope.WeilifeDetailItems.Content));
      $scope.WeilifeDetailItems.Content = $sce.trustAsHtml($scope.WeilifeDetailItems.Content)
    }
    /*------------- Second Packaging -------------*/
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/WeiLive/GetDetail?weiLiveId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    /*------------- end -------------*/
  })();
  
})

.controller('MyJobCollectCtrl',function($scope, $rootScope, $stateParams, GetUserImfor, mEvent, isLogin, $http, $cookies, $ionicPopup){
  
  CommonFn($scope, $rootScope, $stateParams);

  $rootScope.CurrentURL = "/#/tab/my/jobCollect";  

  if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }

  //我收藏的职位
  $scope.refreshCollect = function(){
    (function(){
      function httpCallBack(res){
        httpFn = undefined;
        $rootScope.JobCollects = res.body;
      }
      var httpFn = function(){
        // /api/Common/Job/GetCollectJobList
        mEvent.http("GET", "/api/JobSeeker/Job/GetCollectJobList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();
  }
  $scope.refreshCollect(); //刷新列表
  
  //取消收藏
  $scope.deleteCollect = function(){
    
    if($cookies.get("Ticket")){

      var thisId = this.item.Id;
      var thisName = this.item.Name;
      $ionicPopup.confirm({
        title: '提示',
        template: '取消收藏<b>' + thisName + '</b>吗？',
        buttons:[
          {
            text:'确定',
            type:'button-positive',
            onTap: function(e){

              (function(){
                function httpCallBack(res){
                  httpFn = undefined;
                  $scope.refreshCollect(); //刷新列表
                  GetUserImfor.GetPersonal(true);
                }
                var httpFn = function(){
                  mEvent.http("POST", "/api/JobSeeker/Job/CollectJob", true, httpCallBack, { JobId: thisId, Ope:2 });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
              })();

            }
          },{ text:'取消', onTap: function(e){ } }
        ]
      });
      
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }

})

.controller('MyCompanyCollectCtrl',function($scope, $rootScope, $stateParams, mEvent, GetUserImfor, isLogin, $http, $cookies, $ionicPopup){
  
  CommonFn($scope, $rootScope, $stateParams);

  $rootScope.CurrentURL = "/#/tab/my/companyCollect";  

  if(!$cookies.get("Ticket")){ window.location.href = $rootScope.app_config.links + "/#/tab/login";return false; }

  //我收藏的职位
  $scope.refreshCollect = function(){
    (function(){
      function httpCallBack(rs){
        httpFn = undefined;
        $rootScope.CompanyCollects = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/JobSeeker/Enterprise/GetCollectEnterpriseList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();
  }
  $scope.refreshCollect(); //刷新列表
  
  //取消收藏
  $scope.deleteCollect = function(){
    
    if($cookies.get("Ticket")){
      var thisId = this.item.EnterpriseId;
      var thisName = this.item.EnterpriseName;
      $ionicPopup.confirm({
        title: '提示',
        template: '取消收藏<b>' + thisName + '</b>吗？',
        buttons:[
          {
            text:'确定',
            type:'button-positive',
            onTap: function(e){
              // alert("确定");
              // console.log("this.item.Id:" + thisId);

              (function(){
                /*------------- Second Packaging CallBack -------------*/
                function httpCallBack(rs){
                  // console.log(rs);
                  httpFn = undefined;
                  $scope.refreshCollect(); //刷新列表
                  GetUserImfor.GetPersonal();
                }
                /*------------- Second Packaging -------------*/
                var httpFn = function(){
                  mEvent.http("POST", "/api/JobSeeker/Enterprise/CollectEnterprise", true, httpCallBack, { EnterpriseId: thisId, Ope:2 });
                }
                httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                /*------------- end -------------*/
              })();

            }
          },{ text:'取消', onTap: function(e){ } }
        ]
      });
      
    }else{
      window.location.href = $rootScope.app_config.links + "/#/tab/login";
    }
  }

})

.controller('MySetCtrl',function($scope, $rootScope, $stateParams, mEvent){

  CommonFn($scope, $rootScope, $stateParams);

})

.controller('MySetDetailCtrl',function($scope, $rootScope, mEvent, $http, $cookies, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);
  if($stateParams.Code!=""){

    //Code : P_Agreement（用户协议），P_About（关于我们），P_Online（在线客服）
    (function(){
      function httpCallBack(res){
        httpFn = undefined;
        $scope.datas = res.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Single/GetSingle?code=" + $stateParams.Code, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }else{
    alert("ERROR:参数无效，请从设置进入");
    window.location.href = $rootScope.app_config.links + "/#/tab/my/set";
  }

})


.controller('MyPromoterReturncashCtrl',function($scope, $rootScope, $stateParams, mEvent, isLogin, $http, $cookies, $ionicModal){
  
  CommonFn($scope, $rootScope, $stateParams);

  //获取推广返现申请 列表
  $scope.getReturnCash = function(){

    (function(){
      /*------------- Second Packaging CallBack -------------*/
      function httpCallBack(res){
        httpFn = undefined;
        $scope.returnCashList = res.body;
      }
      /*------------- Second Packaging -------------*/
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Promoter/GetReturnCashApplyList", true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      /*------------- end -------------*/
    })();
    
  }
  $scope.getReturnCash();

  //添加推广返现申请（View）
  $scope.openReturnCash = function(){
    $scope.ReturnCashDatas = {}
    $ionicModal.fromTemplateUrl("tab-my-promoter-returnCash-modalAdd.html",{
      scope:$scope,
    }).then(function(modal){
      $scope.ReturnCashModal = modal; $scope.ReturnCashModal.show();
    });
  }

  // 提交 添加推广返现申请（POST)
  $scope.ReturnCashDatas = {}
  $scope.AddReturnCash = function(isValid){
    if(!isValid) {
      $scope.isErrorForSubmit = true; // alert("验证不通过");
    }else{
      $scope.isErrorForSubmit = false;

      // console.log("提交推广返现的参数：")
      // console.log($scope.ReturnCashDatas);
      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
          $scope.getReturnCash();
          $scope.ReturnCashModal.hide();
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("POST", "/api/Common/Promoter/ApplyReturnCash", true, httpCallBack, {
            RealName : $scope.ReturnCashDatas.RealName,
            AccountNumber : $scope.ReturnCashDatas.AccountNumber,
            ExchangeIntegral : $scope.ReturnCashDatas.ExchangeIntegral,
            Content : $scope.ReturnCashDatas.Content
          });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();
      
    }
  }
})

.controller('MyPromoterIntegralRecordCtrl',function($scope, $rootScope, $stateParams, mEvent, isLogin, $http, $cookies){
  
  CommonFn($scope, $rootScope, $stateParams);

  //积分记录
  (function(){
    /*------------- Second Packaging CallBack -------------*/
    function httpCallBack(res){
      httpFn = undefined;
      $scope.integralRecordList = res.body;
    }
    /*------------- Second Packaging -------------*/
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Promoter/GetIntegralRecordList", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    /*------------- end -------------*/
  })();

})

.controller('MyPromoterIntegralKeyCtrl',function($scope, $rootScope, $stateParams, mEvent, isLogin, $http, $cookies){
  
  CommonFn($scope, $rootScope, $stateParams);

  //积分兑换券
  $scope.datas = { integralKey : "" };
  $scope.postKey = function(){

    if($scope.datas.integralKey!=""){
      // console.log("提交KEY:" + $scope.datas.integralKey);

      (function(){
        /*------------- Second Packaging CallBack -------------*/
        function httpCallBack(res){
          httpFn = undefined;
          if(res.code=="0"){
            // console.log("兑换成功");
            $scope.isError = false;
            window.location.href = $rootScope.app_config.links + "/#/tab/my/promoter";
          }else if(res.code=="1"){
            // console.log("兑换码有误");
            $scope.isError = true;
            return false;
          }
        }
        /*------------- Second Packaging -------------*/
        var httpFn = function(){
          mEvent.http("POST", "/api/Common/Promoter/ExchangeCoupon", true, httpCallBack, { Key:$scope.datas.integralKey });
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        /*------------- end -------------*/
      })();

    }else{
      $scope.isEmpty = true;
    }
  }

})

// 职位分类
.controller('JobCateCtrl',function($scope, $rootScope, $stateParams, mEvent, $http){
  
  CommonFn($scope, $rootScope, $stateParams);
  // [GET] 行业分类
  if(!$rootScope.JobCates){
    (function(){
      function httpCallBack(rs){
        $rootScope.JobCates = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Data/GetJobType", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

})

// 职位分类 - 职位列表
.controller('JobCateListCtrl',function($scope, $rootScope, Algorithm, mEvent, serviceMath, $timeout, $http, $cookies, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);
  $rootScope.CurrentURL = "/#/tab/index/jobcate/list/" + $stateParams.Id;

  //福利列表（差集算法）
  Algorithm.difference();
  
  //职位分类
  if($stateParams.Id){
    $scope.rsTitle = "职位列表";
    //reset
    $scope.hasList = false;
    $rootScope.JobCateLists = "";
    $scope.jobCateList_loaded = false;
    //获取职位列表
    $scope.getJobList = function(){
      (function(){
        function httpCallBack(rs){
          // console.log(rs);
          $rootScope.JobCateLists = rs.body;
        }
        var httpFn = function(){
          mEvent.http("GET", "/api/Common/Job/GetJobList?type=" + $stateParams.Id +
                            "&AreaIds=" + $cookies.get("cityCode-key") +
                            "&PageIndex=0&mode=1&keyword=&welfares=&pay=&nature=", false, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
    //初始化
    $scope.getJobList();

    //下拉加载
    var currentPageIndex = 0;
    $scope.refreshDown = function(){
      currentPageIndex++;
      // console.log(currentPageIndex);
      $scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
      $scope.getJobList(currentPageIndex);
      $scope.jobCateList_loaded = false;
    }

  }else{
    window.location.href = $rootScope.app_config.links + '/#/tab/index/jobcate';
  }

})


// 行业分类
.controller('IndustryCateCtrl',function($scope, $rootScope, $stateParams, mEvent, $http){

  CommonFn($scope, $rootScope, $stateParams);
  // [GET] 行业分类
  if(!$rootScope.IndustryCates){
    (function(){
      function httpCallBack(rs){
        $rootScope.IndustryCates = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Data/GetIndustry", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  
})

// 行业分类 - 职位列表
.controller('IndustryCateListCtrl',function($scope, $rootScope, Algorithm, mEvent, serviceMath, $timeout, $http, $cookies, $stateParams){
  
  CommonFn($scope, $rootScope, $stateParams);
  $rootScope.CurrentURL = "/#/tab/index/industryCate/list/" + $stateParams.Id;

  $scope.industryCateId = $stateParams.Id;

  //福利列表（差集算法）
  Algorithm.difference();
  
  //职位分类
  if($stateParams.Id){
    $scope.rsTitle = "职位列表";
    //reset
    $scope.hasList = false;
    $rootScope.JobCateLists = "";
    $scope.jobCateList_loaded = false;
    //获取职位列表
    $scope.getJobList = function(){
      (function(){
        function httpCallBack(rs){
          $rootScope.IndustryCateLists = rs.body;
        }
        var httpFn = function(){
          mEvent.http("GET", "/api/Common/Job/GetIndustryJobList?IndustryId=" + $stateParams.Id +
                            "&AreaIds=" + $cookies.get("cityCode-key") +
                            "&PageIndex=0&PageSize=10", false, httpCallBack);
        }
        httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
      })();
    }
    //初始化
    $scope.getJobList();

    //下拉加载
    var currentPageIndex = 0;
    $scope.refreshDown = function(){
      currentPageIndex++;
      $scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
      $scope.getJobList(currentPageIndex);
      $scope.jobCateList_loaded = false;
    }

  }else{
    window.location.href = $rootScope.app_config.links + '/#/tab/index/industryCate';
  }

})

// 职位列表通用页
.controller('JobListCtrl',function($scope, $rootScope, Algorithm, mEvent, serviceMath, $timeout, $http, $cookies, $stateParams){

  CommonFn($scope, $rootScope, $stateParams);
  Algorithm.difference(); //福利列表（差集算法）
  $rootScope.CurrentURL = "/#/tab/index/jobList/" + $stateParams.Type;

  //[GET] 通用职位列表
  $scope.GetJobList = function(URI){
    function httpCallBack(rs){
      $rootScope.CommonJobList = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", URI, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  }

  $scope.Uri = '';
  $scope.isBackToIndex = true;
  $scope.hasMore = false;


  // =============== Common API ===============
  //[GET] (首页)企业福利
  if($stateParams.Type=="FullWelfareJob"){
    $scope.rsTitle = "企业福利";
    //GetWellKnownJobList
    $scope.Uri = "/api/Common/Job/GetWelfareJobList?AreaId=" + $cookies.get("cityCode-key") + '&PageIndex=0&PageSize=10';
    $scope.CommonUri = "/api/Common/Job/GetWelfareJobList";
    $scope.GetJobList($scope.Uri);
  }

  if($stateParams.Type=="NewestJob"){
    $scope.rsTitle = "近期职位";
    //GetWellKnownJobList
    $scope.Uri = "/api/Common/Job/GetNewJobList?AreaId=" + $cookies.get("cityCode-key") + '&PageIndex=0&PageSize=10';
    $scope.CommonUri = "/api/Common/Job/GetNewJobList";
    $scope.GetJobList($scope.Uri);
  }

  //[GET] (首页)名企招聘
  if($stateParams.Type=="WellKnowJob"){
    $scope.rsTitle = "名企招聘";
    //GetWellKnownJobList
    $scope.Uri = "/api/Common/Job/GetWellKnownJobList?AreaId=" + $cookies.get("cityCode-key") + '&PageIndex=0&PageSize=10';
    $scope.CommonUri = "/api/Common/Job/GetWellKnownJobList";
    $scope.GetJobList($scope.Uri);
  }
  // ============= end Common API =============

  //[GET] 下滑加载更多 JobList
  $scope.refreshDown = function(){
    $scope.curIndex++;
    $scope.GetJobList($scope.Uri);
    $scope.activeMore = false;
    $scope.$broadcast('scroll.infiniteScrollComplete'); //停止动画
  }
  
})

// 招聘会列表
.controller('JobFairCtrl',function($scope, $rootScope, $stateParams, $http, $timeout, $ionicModal, mEvent){
  
  CommonFn($scope, $rootScope, $stateParams);

  $scope.OnePages = 10;       // 一页显示多少个
  $scope.CurrentPage = 0;     // 当前第几页

  // [GET] 获取招聘会列表
  $scope.GetJobFairList = function(current){
    (function(){
      function httpCallBack(rs){
        // 判断是否第一次加载
        if(!$rootScope.JobFairList){
          $rootScope.JobFairList = rs.body;
        }else{
          angular.forEach(rs.body, function(item){
            $rootScope.JobFairList.push(item);
          })
        }
        
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');

        // 判断是否到底
        if(rs.body.length>=$scope.OnePages){
          $scope.CurrentPage++;
          $scope.loadAction = true;
        }else{
          $scope.loadAction = false;
          $scope.noMore = true;
        }
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/CareerFair/GetList?PageIndex=" + current + "&PageSize=" + $scope.OnePages, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  if(!$rootScope.JobFairList){
    $scope.GetJobFairList($scope.CurrentPage);
  }

  // [刷新] 往上滑刷新（底部加载）
  $scope.refreshUp = function(){
    $scope.CurrentPage = 0;
    $rootScope.JobFairList = [];
    $scope.GetJobFairList($scope.CurrentPage);
  }

  // [刷新] 往下滑刷新（顶部刷新）
  $scope.refreshDown = function(){
    $scope.GetJobFairList($scope.CurrentPage);
  }

})

// 招聘会详情
.controller('JobFairDetailCtrl',function($scope, $rootScope, $state, $stateParams, $ionicPopup, $location, $cookies, ComeFrom, GetUserImfor, $http, $timeout, $ionicModal, mEvent){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true); // true 表示带参数
  $scope.CareerFairId = $stateParams.Id;

  //[GET] 获取招聘会详情
  $scope.GetCareerFairDetail = function(){
    (function(){
      function httpCallBack(rs){
        $scope.jobFairDetail = rs.body;
        // console.log(rs.body);
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/CareerFair/GetDetail?careerFairId="+$stateParams.Id, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  //[GET] 获取参会人员名单
  $scope.GetCarrerFairPersonal = function(){
    (function(){
      function httpCallBack(rs){
        $scope.jobFairPersonal = rs.body;
        // console.log(rs.body);
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/CareerFair/GetJobSeekerList?careerFairId="+$stateParams.Id, false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }
  $scope.GetCarrerFairPersonal();

  //[Init] 初始化详情数据
  if($rootScope.JobFairList){
    angular.forEach($rootScope.JobFairList, function(item){
      if(item.Id==$stateParams.Id){
        $scope.jobFairDetail = item;
      }
    });
  }else{
    $scope.GetCareerFairDetail();
  }

  
  //[GET] 判断是否已报名
  $scope.IsApply = false;
  $scope.GetCareerFairIsApply = function(entry){

    var entryChar = '';
    if(entry=='Personal'){ entryChar='JobSeeker'; }
    if(entry=='Company'){ entryChar='Company'; }
    (function(){
      function httpCallBack(rs){
        $scope.IsApply = rs.body;
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/" + entryChar + "/CareerFair/IsApply?CareerFairId="+$stateParams.Id, true, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }

  // 如有登录，判断用户角色
  mEvent.CheckLoginRole();
  $rootScope.$on('CheckLoginRole', function(evt, d){
    if($cookies.get('Ticket')&&$cookies.get('s')){
      $scope.GetCareerFairIsApply(d);
    }
  });


  //[Click] 我要报名
  $scope.OpenCareerFairForm = function(entry){
    var thisId = $scope.jobFairDetail.Id;
    if($cookies.get('Ticket')&&$cookies.get('s')){

      //[企业] 我要报名
      if(entry=='company'){
        $state.go('company.index-jobFair-detail-apply', { Id: $stateParams.Id});
      }

      //[求职者] 我要报名
      if(entry=='tab'){
        // $rootScope.$on("GetUserImfor",function(e, data){ .. });
        if(!$rootScope.userImfor){ GetUserImfor.GetPersonal(); }

        $ionicPopup.confirm({
          title: '提示', template: '是否提交报名？',
          buttons:[
              {
                text:'确定', type:'button-positive',
                onTap: function(e){
                  
                  //[POST][求职者] 提交报名
                  (function(){
                    function httpCallBack(rs){
                      // console.log(rs);
                      if(rs.code==0){
                        $scope.GetCareerFairIsApply($rootScope.entry);
                        $scope.GetCareerFairDetail();
                      }else if(rs.code==50203){

                        $ionicPopup.confirm({
                          title: '提示', template: '报名前请完善简历！',
                          buttons:[
                              {
                                text:'马上完善', type:'button-positive',
                                onTap: function(e){
                                  $state.go('tab.my-resume');
                                }
                              },{ text:'取消', onTap: function(e){ return false; } }
                          ]
                        });

                      }
                    }
                    var httpFn = function(){
                      mEvent.http("POST", "/api/JobSeeker/CareerFair/Apply", true, httpCallBack, { CareeFairId:$stateParams.Id });
                    }
                    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
                  })();

                }
              },{ text:'取消', onTap: function(e){ return false; } }
            ]
        });
      }

    }else{
      $state.go($rootScope.entry+'.login');
    }

  }

  // [GET] 参会企业
  // (function(){
  //   function httpCallBack(rs){
  //     console.log(rs.body);
  //   }
  //   var httpFn = function(){
  //     mEvent.http("GET", "/api/Common/CareerFair/GetJobSeekerList?careerFairId="+$stateParams.Id, false, httpCallBack);
  //   }
  //   httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  // })();

  // 显示 参会须知 & 联系我们
  $scope.showImfor = function(n){

    function fnSwitch(nx){
      var datas = {
        '0':function(){
          $scope.jobFairImfor = {
            "Title":'招聘会详情',
            "Content":$scope.jobFairDetail.Content
          }
        },
        '1':function(){
          $scope.jobFairImfor = {
            "Title":'参会流程',
            "Content":$scope.jobFairDetail.Flow
          }
        },
        '2':function(){
          $scope.jobFairImfor = {
            "Title":'公交指引/驾车导航',
            "Content":$scope.jobFairDetail.TrafficGuide
          }
        },
        '3':function(){
          $scope.jobFairImfor = {
            "Title":'联系方式',
            "Content":$scope.jobFairDetail.ContactWay
          }
        },
        '4':function(){
          $scope.jobFairImfor = {
            "Title":'参会须知',
            "Content":$scope.jobFairDetail.Notice
          }
        },
        '5':function(){
          $scope.jobFairImfor = {
            "Title":'媒体支持',
            "Content":$scope.jobFairDetail.Media
          }
        }
      }
      if(typeof datas[nx] != "function"){ return false; }
      return datas[nx]();
    }

    fnSwitch(n);
    $ionicModal.fromTemplateUrl("tab-index-jobFair-modalImfor.html",{
      scope:$scope,
    }).then(function(modal){
      $scope.modalImfor = modal;
      $scope.modalImfor.show();
    });
  }
})

// 招聘会详情 - 报名
.controller('JobFairDetailApplyCtrl',function($scope, $rootScope, $state, $stateParams, $ionicPopup, $location, $cookies, ComeFrom, GetUserImfor, $http, $timeout, $ionicModal, mEvent){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true);
  var thisId = $stateParams.Id;
  $scope.datas = { CareeFairId:thisId, JobNames:'', JobIds:'', ContactManName:'', ContactManPhone:'', Remark:'' }

  // [GET] 获取企业信息（自动填写 联系人/电话/地址/地图）
  $http({
    method:"GET", url:$rootScope.app_config.api + '/api/Company/Enterprise/GetEnterpriseBaseInfo', 
    headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") }
  }).success(function(rs){
    $rootScope.EnterpriseBaseInfo = rs.body;
    $scope.datas.ContactManName = $rootScope.EnterpriseBaseInfo.ContactManName;
    $scope.datas.ContactManPhone = $rootScope.EnterpriseBaseInfo.ContactManPhone;
  });

  // [GET] 获取企业已发布职位列表
  $http({
    method:"GET", url:$rootScope.app_config.api + '/api/Company/Job/GetReleaseJobList', 
    headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") }
  }).success(function(rs){
    $rootScope.ReleaseJobList = rs.body;
  });

  // [Click] 选择职位窗口
  $scope.OpenSelect = function(){
    $ionicModal.fromTemplateUrl("modal-CareerFair-Form-Select.html",{
      scope:$scope,
    }).then(function(modal){
      $rootScope.modal = modal;
      $scope.modal.show();
      $scope.selectDatas = { IsCheckedAll:'' }

      // [Init] Check
      angular.forEach($rootScope.ReleaseJobList, function(item, i){
          $rootScope.ReleaseJobList[i]['IsChecked'] = false;
      });
      
      // [Change] 取消所有Checked选中（保留全选）
      $scope.changeAll = function(){
        angular.forEach($rootScope.ReleaseJobList, function(item, i){
          $rootScope.ReleaseJobList[i]['IsChecked'] = $scope.selectDatas.IsCheckedAll;
        })
      }
      // [Change] 取消全选
      $scope.changeNormal = function(){
        $scope.selectDatas.IsCheckedAll = false;
      }

      
      $scope.SaveModal = function(){
        
        var tempJobNames = [], tempJobIds = [];
        if($scope.selectDatas.IsCheckedAll){
          angular.forEach($rootScope.ReleaseJobList, function(item, i){
            tempJobNames.push(item.Name);
            tempJobIds.push(item.Id);
          });
        }else{
          angular.forEach($rootScope.ReleaseJobList, function(item, i){
            if(item.IsChecked){
              tempJobNames.push(item.Name);
              tempJobIds.push(item.Id);
            }
          });
        }
        $scope.datas.JobNames = tempJobNames;
        $scope.datas.JobIds = tempJobIds;
        
        $scope.modal.remove();
        
      }

    });
  }

  $scope.SubmitApply = function(){
    
    if($scope.datas.JobNames&&$scope.datas.JobIds){
      $scope.datas.JobNames = $scope.datas.JobNames.join(',');
      $scope.datas.JobIds = $scope.datas.JobIds.join(',');
    }

    (function(){
      function httpCallBack(rs){
        $rootScope.backTo();
      }
      var httpFn = function(){
        mEvent.http("POST", "/api/Company/CareerFair/Apply", true, httpCallBack, $scope.datas);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();

  }

})

// 招聘会详情 - 参会人才
.controller('JobFairDetailSeekerListCtrl',function($scope, $rootScope, $state, $stateParams, $ionicPopup, $location, $cookies, ComeFrom, GetUserImfor, $http, $timeout, $ionicModal, mEvent){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true);
  var thisId = $stateParams.Id;
  $scope.CareerFairId = $stateParams.Id;
  // api/Common/CareerFair/GetJobSeekerList?careerFairId=

  (function(){
    function httpCallBack(rs){
      // console.log(rs);
      $scope.ResumeList = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/CareerFair/GetJobSeekerList?careerFairId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

.controller('ArticleDetailCtrl',function($scope, $rootScope, $http, ComeFrom, mEvent, $stateParams){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get(true);

  (function(){
    function httpCallBack(res){
      $scope.item = res.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Article/GetDetail?artId=" + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})


// 专题 - 2017 送来薪工作
.controller('ZhuangtiSlxgzCtrl',function($scope, $rootScope, $ionicPopup, $interval, $timeout, $ionicScrollDelegate, ComeFrom, $stateParams, $http, mEvent){
  
  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  // (活动中)Tabs事件
  $scope.curIndex = 2;
  $scope.ChangeCurIndex = function(n){
    $scope.curIndex = n;
  }
  $scope.BackToBottom = function(){
    $ionicScrollDelegate.scrollBottom();
  }

  // [GET] 职位展示
  $scope.GetEnterpriseList = function(){
    $http({
      method:'GET', url:$rootScope.app_config.api + '/api/activity/SLHGZ/GetEnterpriseList'
    }).success(function(rs){
      if(rs.code==0){
        $scope.EnterpriseList = rs.body;
      }
    });
  }
  $scope.GetEnterpriseList();

  // [GET] 排行榜
  $scope.GetRank = function(){
    $http({
      method:'GET', url:$rootScope.app_config.api + '/api/activity/SLHGZ/GetRank'
    }).success(function(rs){
      if(rs.code==0){
        $scope.ranks = rs.body;
      }
    });
  }
  $scope.GetRank();

  //排行榜1分钟触发1次
  $interval(function(){
    $scope.GetRank(); 
  }, 1000*60);



  var browser = {
    platforms: function(){
      var p = navigator.platform;
      if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        return '移动端';
      }else{
        return 'PC端';
      }
    }(),
    versions: function () {
        var u = window.navigator.userAgent.toLowerCase();
        if(u.match(/MicroMessenger/i)=='micromessenger') { return '微信内置浏览器';}
        if(u.indexOf('trident') > -1){ return 'IE内核浏览器';}
        if(u.indexOf('presto') > -1){ return 'opera内核浏览器';}
        if(u.indexOf('applewebkit') > -1){ return '苹果、谷歌内核浏览器';}
        if(u.indexOf('gecko')>-1 && u.indexOf('khtml')==-1){ return '火狐内核浏览器';}
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  

  // console.log(browser.versions);
  // console.log(browser.language);

  $scope.datas = {
    'ActName':'百家亿级企业“送来薪工作”网络招聘专场',
    'companyName':'', 'contactNumber':'',
    'contactName':''
  }
  $scope.AddApplyClick = function(){

    if($scope.datas.companyName==''){ $ionicPopup.alert({ title: '提示', template: '企业名称不能为空!' });return false; }
    if($scope.datas.contactNumber==''){ $ionicPopup.alert({ title: '提示', template: '联系电话不能为空!' });return false; }
    if($scope.datas.contactName==''){ $ionicPopup.alert({ title: '提示', template: '联系人不能为空!' });return false; }

    var contentStr = '企业名称:' + $scope.datas.companyName + ',' +
                     '联系电话:' + $scope.datas.contactNumber + ', '+
                     '联系人:' + $scope.datas.contactName + ', ' +
                     '--- 来自 ' + browser.platforms + ' ' + browser.versions;
    $http({
      method:'POST', //headers:{ "Authorization" : "BasicAuth " + $cookies.get("Ticket") },
      url:$rootScope.app_config.api + '/api/Common/Feedback/AddActivityApply',
      data:{ 'Name': $scope.datas.ActName, 'Content':contentStr }
    }).success(function(rs){
      console.log(rs);
      if(rs.code==0){
        $scope.datas = {
          'ActName':'百家亿级企业“送来薪工作”网络招聘专场',
          'companyName':'', 'contactNumber':'', 'contactName':''
        }
        $ionicPopup.alert({ title: '提示', template: '提交成功！我们将会在1个工作日内与您联系' });
      }else{
        $ionicPopup.alert({ title: '提示', template: rs.msg + '(' + rs.code + ')' });
      }
    });
  }

  
})

.controller('ImgTextareaCtrl',function($scope, $rootScope, ComeFrom, $stateParams, $http, mEvent){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  $scope.isHideTabs = true;
  $scope.imgTextsList_title = '列表';
  if($rootScope.StateCurrentUrl.indexOf('partTimeJob')>0){
    $scope.imgTextsList_title = '兼职频道';
    $scope.imgTextsList_api = '/api/Common/Article/GetPartTimeJob';
    $scope.imgTextsList_detailUrl = 'index/partTimeJob';
  }
  if($rootScope.StateCurrentUrl.indexOf('enterpriseHot')>0){
    $scope.imgTextsList_title = '企业热点';
    $scope.imgTextsList_api = '/api/Common/Article/GetEnterpriseHot';
    $scope.imgTextsList_detailUrl = 'enterpriseHot';
    $scope.isHideTabs = false;
  }
  
  //[Get] List
  (function(){
    function httpCallBack(rs){
      $scope.imgTextsList = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", $scope.imgTextsList_api, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

.controller('ImgTextareaDetailCtrl',function($scope, $rootScope, ComeFrom, $http, mEvent, $stateParams){

  CommonFn($scope, $rootScope, $stateParams);
  ComeFrom.get();

  $scope.imgTextsDetail_back = '/';
  // 兼职频道
  if($rootScope.StateCurrentUrl.indexOf('partTimeJob')>0){
    $scope.imgTextsDetail_back = 'index/partTimeJob';
  }
  // 企业热点
  if($rootScope.StateCurrentUrl.indexOf('enterpriseHot')>0){
    $scope.imgTextsDetail_back = 'enterpriseHot';
  }
  

  (function(){
    function httpCallBack(rs){
      $scope.imgTextsDetail = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", '/api/Common/Article/GetDetail?artId=' + $stateParams.Id, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

.controller('MyCourseApplyCtrl',function($scope, $rootScope, $stateParams, mEvent, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  (function(){
    function httpCallBack(res){
      $scope.myCourseApplyList = res.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Education/GetMyCourseApplyList", true, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

// 职场资讯 - 分类
.controller('PublicArticleCtrl',function($scope, $rootScope, $stateParams, mEvent, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);

  // [GET] 职场资讯 - 分类
  (function(){
    function httpCallBack(rs){
      // console.log(rs);
      $rootScope.WorkplaceInformationCates = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Article/GetTypeListOfWorkplaceInformation", false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})

// 职场资讯 - 列表
.controller('PublicArticleListCtrl',function($scope, $rootScope, $stateParams, mEvent, $http, $cookies){

  CommonFn($scope, $rootScope, $stateParams);


  // [GET] 职场资讯 - 分类（主要是为了获取标题名字）
  if(!$rootScope.WorkplaceInformationCates){
    (function(){
      function httpCallBack(rs){
        // console.log(rs);
        $rootScope.WorkplaceInformationCates = rs.body;
        angular.forEach($rootScope.WorkplaceInformationCates, function(item){
          if($stateParams.Id==item.Id){
            $scope.ArticleCateTitle = item.Name;
          }
        });
      }
      var httpFn = function(){
        mEvent.http("GET", "/api/Common/Article/GetTypeListOfWorkplaceInformation", false, httpCallBack);
      }
      httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
    })();
  }else{
    angular.forEach($rootScope.WorkplaceInformationCates, function(item){
      if($stateParams.Id==item.Id){
        $scope.ArticleCateTitle = item.Name;
      }
    });
  }
  // end [GET] 职场资讯

  $scope.CurrentPage = 0;
  $scope.OnePage = 10;

  // [GET] 职场资讯 - 列表
  (function(){
    function httpCallBack(rs){
      $rootScope.WorkplaceInformationList = rs.body;
    }
    var httpFn = function(){
      mEvent.http("GET", "/api/Common/Article/Search?typeId=" + $stateParams.Id + "&PageIndex=" + $scope.CurrentPage + "&PageSize=" + $scope.OnePage, false, httpCallBack);
    }
    httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
  })();

})


.controller('MySetLeaveMessageCtrl',function($scope, $rootScope, $ionicPopup, $stateParams, mEvent, $http, $cookies){
  CommonFn($scope, $rootScope, $stateParams);

  $scope.LeaveMessage = { 'Type':'Phone_Feedback', 'Name':'', 'Content':'' }
  $scope.submitForm = function(isValid){
      if(!isValid) { $scope.isErrorForSubmit = true;}else{
        $scope.isErrorForSubmit = false;

        (function(){
          function httpCallBack(rs){
            // console.log(rs);
            if(rs.code==0){
              $ionicPopup.alert({ title: '提示', template: '提交成功！感谢您的宝贵意见！' });
              window.location.href = '#/' + $rootScope.entry + '/my/set';
            }
          }
          var httpFn = function(){
            mEvent.http("POST", "/api/Common/Feedback/Add", true, httpCallBack, $scope.LeaveMessage);
          }
          httpFn();$scope.$on("reLoaded",function(event,data){ if(data){try{httpFn();}catch(e){ console.log("login error!"); }} });
        })();

      }
  }

})