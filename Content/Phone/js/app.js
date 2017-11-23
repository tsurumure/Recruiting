/*
 * AngularJS v1.4.3
 * Ionic v1.2.4
*/

angular.module('starter', ['ionic', 'ngAnimate', 'template-bundle', 'starter.controllers', 'starter.services', 'starter.services_common', 'ionic-datepicker', 'ion-gallery', 'ngCookies'])
//'ngImgCrop', 
.config(function($provide, $compileProvider, $locationProvider, ionGalleryConfigProvider, ionicDatePickerProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  // Ionic 取消自带动画效果
  // $ionicConfigProvider.views.transition('none');
  $compileProvider.debugInfoEnabled(false);

  // --- [Ionic Config] --------
  $ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');
  $ionicConfigProvider.scrolling.jsScrolling(true);
  
  // 禁用预加载全部 http://www.zhihu.com/question/30624377?sort=created
  $ionicConfigProvider.templates.maxPrefetch(0);

  // 禁用侧滑返回
  $ionicConfigProvider.views.swipeBackEnabled(false);

  // 禁用全局缓存
  // $ionicConfigProvider.views.maxCache(0);

  // [Ionic扩展] 图集
  ionGalleryConfigProvider.setGalleryConfig({ action_label: '关闭', toggle: false, row_size: 3, fixed_row_size: true });
  
  // [Ionic扩展] 日历
  var datePickerObj = {
    inputDate: new Date(), setLabel: '选择', todayLabel: '今天', closeLabel: '关闭', mondayFirst: true, closeOnSelect: false,
    weeksList: ["日", "一", "二", "三", "四", "五", "六"], monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    templateType: 'popup', from: new Date(2012, 8, 1), to: new Date(), showTodayButton: true, dateFormat: 'yyyy-MM-dd', disableWeekdays: [1]
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
  // --- end [Ionic Config] --------

  
  // 2017.08.24
  // templateUrl: '/Content/Phone/templates/
  // CHANGE ( By gulp-ng-html2js) (全局替换)
  // templateUrl: '

  // --- 路由 --------
  $stateProvider

    // --- [企业路由] ------------------------------------------------
    .state('company', {
      url: '/company', params:{ entry:'company' }, abstract: true,
      templateUrl: 'companys.html'
    })
    .state('company.index', {
      url: '/index', params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'CompanyIndexCtrl', templateUrl: 'company-index.html'
        }
      }
    })
    .state('company.resumeDetail', {
      url: '/resume/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'CompanyResumeDetailCtrl', templateUrl: 'company-resumeDetail.html'
        }
      }
    })
    .state('company.searchResume', {
      url: '/searchResume', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'CompanySearchResumeCtrl', templateUrl: 'company-searchResume.html'
        }
      }
    })
    .state('company.searchResume-list', {
      url: '/searchResume/list', params:{ entry:'company', Datas:'', rsDatas:'' },
      views: {
        'company-index': {
          controller: 'CompanySearchResumeListCtrl', templateUrl: 'company-searchResume-list.html'
        }
      }
    })
    .state('company.searchResume-detail', {
      url: '/searchResume/detail/:Id', params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'CompanyResumeDetailCtrl', templateUrl: 'company-resumeDetail.html'
        }
      }
    })

    .state('company.my-message', {
      url: '/my/message', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyMessageCtrl', templateUrl: 'tab-my-message.html'
        }
      }
    })
    .state('company.my-message-detail', {
      url: '/my/message/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyMessageDetailCtrl', templateUrl: 'tab-my-message-detail.html'
        }
      }
    })
    .state('company.my-message-detail-system', {
      url: '/my/messageSystem', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyMessageDetailSystemCtrl', templateUrl: 'tab-my-message-detail-system.html'
        }
      }
    })
    
    .state('company.my-releaseJob', {
      url: '/my/releaseJob', params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyReleaseJobCtrl', templateUrl: 'company-my-releaseJob.html'
        }
      }
    })



    .state('company.releaseJobForm', {
      url: '/releaseJob/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyReleaseJobFormCtrl', templateUrl: 'company-releaseJobForm.html'
        }
      }
    })
    .state('company.job-detail', {
      url: '/job/detail/:Type/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyJobDetailCtrl', templateUrl: 'tab-job-detail.html'
        }
      }
    })
    .state('company.jobApplyresumeDetail', {
      url: '/jobApplyResume/:Id', params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyResumeDetailCtrl', templateUrl: 'company-resumeDetail.html'
        }
      }
    })
    .state('company.releaseJobDetail', {
      url: '/releaseJobDetail/:Id', cache: false, params:{ entry:'company', isPreview:true },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyJobDetailCtrl', templateUrl: 'tab-job-detail.html'
        }
      }
    })
    .state('company.jobApply', {
      url: '/jobApply/:Type', cache: false, params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyJobApplyCtrl', templateUrl: 'company-jobApply.html'
        }
      }
    })
    .state('company.jobApplyDetail', {
      url: '/jobApplyDetail/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'JobDetailCtrl', templateUrl: 'tab-job-detail.html'
        }
      }
    })
    .state('company.collectResume', {
      url: '/collectResume', params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyCollectResumeCtrl', templateUrl: 'company-collectResume.html'
        }
      }
    })
    .state('company.collectResumeDetail', {
      url: '/collectResume/:Id', params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'CompanyResumeDetailCtrl', templateUrl: 'company-resumeDetail.html'
        }
      }
    })
    .state('company.my', {
      url: '/my', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyCtrl', templateUrl: 'company-my.html'
        }
      }
    })
    .state('company.my-head', {
      url: '/my/head', cache: false, params:{ entry:'company', headTitle:'企业LOGO' },
      views: {
        'company-my': {
          controller: 'CompanyMyHeadCtrl', templateUrl: 'tab-my-head.html'
        }
      }
    })
    .state('company.login', {
      url: '/login', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyLoginCtrl', templateUrl: 'company-login.html'
        }
      }
    })
    .state('company.login-forgetPwd', {
      url: '/login/forgetPwd', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyLoginForget', templateUrl: 'company-login-forgetPwd.html'
        }
      }
    })
    .state('company.register-new', {
      url: '/register-new/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'company-my': {
          controller: 'CompanyMyRegisterNew', templateUrl: 'company-login-register-new.html'
        }
      }
    })
    .state('company.register-new-inform', {
      url: '/register-new-inform', cache: false, params:{ entry:'tab' },
      views: {
        'company-my': {
          controller: 'CompanyMyRegisterNewInform', templateUrl: 'company-login-register-new-inform.html'
        }
      }
    })

    .state('company.my-imformation', {
      url: '/my/imformation', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyImformationCtrl', templateUrl: 'company-my-imformation.html'
        }
      }
    })
    .state('company.images', {
      url: '/my/images', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyImagesCtrl', templateUrl: 'company-my-images.html'
        }
      }
    })
    .state('company.businessLicense', {
      url: '/my/businessLicense', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'CompanyMyBusinessLicenseCtrl', templateUrl: 'company-my-businessLicense.html'
        }
      }
    })
    .state('company.my-account', {
      url: '/my/account', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'MyAccountCtrl', templateUrl: 'tab-my-account.html'
        }
      }
    })
    .state('company.my-account-password', {
      url: '/my/account/password', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'MyAccountPwdCtrl', templateUrl: 'tab-my-account-password.html'
        }
      }
    })
    .state('company.my-account-phone', {
      url: '/my/account/phone', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'MyAccountPhoneCtrl', templateUrl: 'tab-my-account-phone.html'
        }
      }
    })
    .state('company.my-set', {
      url: '/my/set', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'MySetCtrl', templateUrl: 'tab-my-set.html'
        }
      }
    })
    .state('company.my-set-detail', {
      url: '/my/set/detail/:Code', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'MySetDetailCtrl', templateUrl: 'tab-my-set-detail.html'
        }
      }
    })
    .state('company.my-set-leaveMessage', {
      url: '/my/set/leaveMessage', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'MySetLeaveMessageCtrl', templateUrl: 'common-my-set-leaveMessage.html'
        }
      }
    })
    .state('company.job-detail-company', {
      url: '/job/detailCompany/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-my': { //company-releaseJob
          controller: 'JobCompanyDetailCtrl', templateUrl: 'tab-job-detail-company.html'
        }
      }
    })
    .state('company.my-detail-company', {
      url: '/my/detailCompany/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-my': {
          controller: 'JobCompanyDetailCtrl', templateUrl: 'tab-job-detail-company.html'
        }
      }
    })
    .state('company.index-jobFair', {
      url: '/index/jobfair', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'JobFairCtrl', templateUrl: 'tab-index-jobFair.html'
        }
      }
    })
    .state('company.index-jobFair-detail', {
      url: '/index/jobfair/detail/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'JobFairDetailCtrl', templateUrl: 'tab-index-jobFair-detail.html'
        }
      }
    })
    .state('company.index-jobFair-detail-apply', {
      url: '/index/jobfair/detail/:Id/apply', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'JobFairDetailApplyCtrl', templateUrl: 'tab-index-jobFair-detail-apply.html'
        }
      }
    })
    .state('company.index-jobFair-detail-seekerList', {
      url: '/index/jobfair/detail/:Id/seekerList', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'JobFairDetailSeekerListCtrl', templateUrl: 'tab-index-jobFair-detail-seekerList.html'
        }
      }
    })
    .state('company.square', {
      url: '/square', cache: false, params:{ entry:'company' },
      views: {
        'company-square': {
          controller: 'SquareCtrl', templateUrl: 'tab-square.html'
        }
      }
    })
    // --- end [企业路由] ------------------------------------------------

    // --- [通用] ------------------------------------------------

    .state('tab.zhuangti-slxgz2017', {
      url: '/slxgz', cache: true, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'ZhuangtiSlxgzCtrl', templateUrl: 'public-slxgz2017-ing.html'
        }
      }
    })
    .state('company.zhuangti-slxgz2017', {
      url: '/slxgz', cache: true, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'ZhuangtiSlxgzCtrl', templateUrl: 'public-slxgz2017.html'
        }
      }
    })


    .state('tab.index-notice', {
      url: '/index/notice', cache: true, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'NoticeCtrl', templateUrl: 'public-notice.html'
        }
      }
    })
    .state('company.index-notice', {
      url: '/index/notice', cache: true, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'NoticeCtrl', templateUrl: 'public-notice.html'
        }
      }
    })


    .state('tab.index-notice-detail', {
      url: '/index/notice/detail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: "NoticeDetailCtrl", templateUrl: 'tab-index-ArticleDetail.html'
        }
      }
    })
    .state('company.index-notice-detail', {
      url: '/index/notice/detail/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: "NoticeDetailCtrl", templateUrl: 'tab-index-ArticleDetail.html'
        }
      }
    })


    .state('company.public-article', {
      url: '/publicArticle', params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'PublicArticleCtrl', templateUrl: 'public-article.html'
        }
      }
    })
    .state('company.public-article-list', {
      url: '/publicArticle/:Id', params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'PublicArticleListCtrl', templateUrl: 'public-article-list.html'
        }
      }
    })
    .state('tab.public-article', {
      url: '/publicArticle', params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'PublicArticleCtrl', templateUrl: 'public-article.html'
        }
      }
    })
    .state('tab.public-article-list', {
      url: '/publicArticle/:Id', params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'PublicArticleListCtrl', templateUrl: 'public-article-list.html'
        }
      }
    })
    .state('tab.ArticleDetail', {
      url: '/index/ArticleDetail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: "ArticleDetailCtrl", templateUrl: 'tab-index-ArticleDetail.html'
        }
      }
    })
    .state('company.ArticleDetail', {
      url: '/index/ArticleDetail/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: "ArticleDetailCtrl", templateUrl: 'tab-index-ArticleDetail.html'
        }
      }
    })
    // --- end [通用] ------------------------------------------------

    // --- [求职者路由] ------------------------------------------------
    // abstract 抽像模板，设置为true则跳转到tab.index
    .state('tab', { url: '/tab', params:{ entry:'tab' }, abstract: true, templateUrl: 'tabs.html' })
    .state('tab.index', {
      url: '/index', params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'IndexCtrl', templateUrl: 'tab-index.html'
        }
      }
    })
    
    // 兼职频道
    .state('tab.partTimeJob', {
      url: '/index/partTimeJob', cache: true, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'ImgTextareaCtrl', templateUrl: 'public-imgTextarea.html'
        }
      }
    })
    .state('company.partTimeJob', {
      url: '/index/partTimeJob', cache: true, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'ImgTextareaCtrl', templateUrl: 'public-imgTextarea.html'
        }
      }
    })
    .state('tab.partTimeJob-detail', {
      url: '/index/partTimeJob/detail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'ImgTextareaDetailCtrl', templateUrl: 'public-imgTextarea-detial.html'
        }
      }
    })
    .state('company.partTimeJob-detail', {
      url: '/index/partTimeJob/detail/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-index': {
          controller: 'ImgTextareaDetailCtrl', templateUrl: 'public-imgTextarea-detial.html'
        }
      }
    })
    // end 兼职频道
    
    // 企业热点
    .state('company.enterpriseHot', {
      url: '/enterpriseHot', cache: true, params:{ entry:'company' },
      views: {
        'company-enterpriseHot': {
          controller: 'ImgTextareaCtrl', templateUrl: 'public-imgTextarea.html'
        }
      }
    })
    .state('company.enterpriseHot-detail', {
      url: '/enterpriseHot/detail/:Id', cache: false, params:{ entry:'company' },
      views: {
        'company-enterpriseHot': {
          controller: 'ImgTextareaDetailCtrl', templateUrl: 'public-imgTextarea-detial.html'
        }
      }
    })
    // end 企业热点

    .state('tab.index-jobFair', {
      url: '/index/jobfair', cache: true, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobFairCtrl', templateUrl: 'tab-index-jobFair.html'
        }
      }
    })
    .state('tab.index-jobFair-detail', {
      url: '/index/jobfair/detail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobFairDetailCtrl', templateUrl: 'tab-index-jobFair-detail.html'
        }
      }
    })
    .state('tab.index-jobFair-detail-seekerList', {
      url: '/index/jobfair/detail/:Id/seekerList', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobFairDetailSeekerListCtrl', templateUrl: 'tab-index-jobFair-detail-seekerList.html'
        }
      }
    })
    .state('tab.index-eduTrain-skill', {
      url: '/index/eduTrain/skill', params:{ entry:'tab', eduType:'skill' },
      views: {
        'tab-index': {
          controller: 'EduTrainCtrl', templateUrl: 'tab-index-eduTrain.html'
        }
      }
    })
    .state('tab.index-eduTrain-school', {
      url: '/index/eduTrain/school', params:{ entry:'tab', eduType:'school' },
      views: {
        'tab-index': {
          controller: 'EduTrainCtrl', templateUrl: 'tab-index-eduTrain.html'
        }
      }
    })
    .state('tab.index-eduTrain-skillDetail', {
      url: '/index/eduTrain/skillDetail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'EduTrainSkillDetailCtrl', templateUrl: 'tab-index-eduTrain-skillDetail.html'
        }
      }
    })
    .state('tab.index-eduTrain-schoolDetail', {
      url: '/index/eduTrain/schoolDetail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'EduTrainSchoolDetailCtrl', templateUrl: 'tab-index-eduTrain-schoolDetail.html'
        }
      }
    })
    .state('tab.index-eduTrain-schoolDetail-classDetail', {
      url: '/index/eduTrain/schoolDetail/:Id/classDetail/:classId', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'EduTrainClassDetailCtrl', templateUrl: 'tab-index-eduTrain-schoolDetail-classDetail.html'
        }
      }
    })


    .state('tab.index-eduTrain-schoolDetail-classDetail-add', {
      url: '/index/eduTrain/schoolDetail/:Id/classDetail/:classId/add', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'EduTrainClassDetailAddCtrl', templateUrl: 'tab-index-eduTrain-schoolDetail-classDetail-add.html'
        }
      }
    })


    .state('tab.index-jobCate', {
      url: '/index/jobCate', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobCateCtrl', templateUrl: 'tab-index-jobCate.html'
        }
      }
    })
    .state('tab.index-jobCate-list', {
      url: '/index/jobCate/list/:Id', params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobCateListCtrl', templateUrl: 'tab-index-jobCate-list.html'
        }
      }
    })
    .state('tab.index-industryCate', {
      url: '/index/industryCate', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'IndustryCateCtrl', templateUrl: 'tab-index-industryCate.html'
        }
      }
    })
    .state('tab.index-industryCate-list', {
      url: '/index/industryCate/list/:Id', params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'IndustryCateListCtrl', templateUrl: 'tab-index-industryCate-list.html'
        }
      }
    })


    .state('tab.index-jobList', {
      url: '/index/jobList/:Type', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobListCtrl', templateUrl: 'tab-index-jobList.html'
        }
      }
    })
    .state('tab.job-detail', {
      url: '/job/detail/:Type/:Id', cache: false, params:{ entry:'tab', isPreview:false },
      views: {
        'tab-index': {
          controller: 'JobDetailCtrl', templateUrl: 'tab-job-detail.html'
        }
      }
    })
    .state('tab.job-detail-company', {
      url: '/job/detailCompany/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-index': {
          controller: 'JobCompanyDetailCtrl', templateUrl: 'tab-job-detail-company.html'
        }
      }
    })

    // 2017/08.26 11:06 去掉店家直招(删除route与template)

    .state('tab.near', {
      url: '/near', params:{ entry:'tab' },
      views: {
        'tab-near': {
          controller: 'NearCtrl', templateUrl: 'tab-near.html'
        }
      }
    })
    .state('tab.near-job-detail', {
      url: '/near/job/detail/:Type/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-near': {
          controller: 'JobDetailCtrl', templateUrl: 'tab-near-job-detail.html'
        }
      }
    })
    .state('tab.near-job-detail-company', {
      url: '/near/job/detailCompany/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-near': {
          controller: 'JobCompanyDetailCtrl', templateUrl: 'tab-near-job-detail-company.html'
        }
      }
    })
    .state('tab.near-panorama', {
      url: '/near/panorama/:lng/:lat', cache: false, params:{ entry:'tab' },
      views: {
        'tab-near': {
          controller: 'NearPanoramaCtrl', templateUrl: 'tab-near-panorama.html'
        }
      }
    })
    .state('tab.near-juwei', {
      url: '/near/juwei', cache: false, params:{ entry:'tab' },
      views: {
        'tab-near': {
          controller: 'NearJuweiCtrl', templateUrl: 'tab-near-juwei.html'
        }
      }
    })
    .state('tab.search', {
      url: '/search', params:{'keywords':null,  entry:'tab'},
      views: {
        'tab-index': {
          controller: 'SearchCtrl', templateUrl: 'tab-search.html'
        }
      }
    })

    .state('tab.appdownload', {
      url: '/appdownloadZl', params:{ entry:'tab'},
      views: {
        'tab-index': {
          templateUrl: 'common-appdownloadZl.html'
        }
      }
    })
    .state('company.appdownload', {
      url: '/appdownloadZl', params:{ entry:'company'},
      views: {
        'company-index': {
          templateUrl: 'common-appdownloadZl.html'
        }
      }
    })

    // common square

    .state('tab.square', {
      url: '/square', cache: false, params:{ entry:'tab' },
      views: {
        'tab-square': {
          controller: 'SquareCtrl', templateUrl: 'tab-square.html'
        }
      }
    })
    .state('tab.my-square', {
      url: '/my/square', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MySquareCtrl', templateUrl: 'tab-my-square.html'
        }
      }
    })

    .state('tab.square-card', {
      url: '/square/card/:Type', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'SquareCardCtrl', templateUrl: 'tab-square-card.html'
        }
      }
    })
    .state('tab.my-square-card', {
      url: '/my/square/card/:Type', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'SquareCardCtrl', templateUrl: 'tab-square-card.html'
        }
      }
    })

    .state('tab.square-card-evt', {
      url: '/square/card/:Type/:Evt', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'SquareCardCtrl', templateUrl: 'tab-square-card-evt.html'
        }
      }
    })
    .state('tab.my-square-card-evt', {
      url: '/my/square/card/:Type/:Evt', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'SquareCardCtrl', templateUrl: 'tab-square-card-evt.html'
        }
      }
    })

    .state('tab.square-card-share', {
      url: '/square/cardShare/:Id', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'SquareCardShareCtrl', templateUrl: 'tab-square-card-share.html'
        }
      }
    })
    .state('tab.my-square-card-share', {
      url: '/my/square/cardShare/:Id', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'SquareCardShareCtrl', templateUrl: 'tab-square-card-share.html'
        }
      }
    })

    .state('tab.square-card-detail', {
      url: '/square/cardDetail/:Id', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'SquareCardDetailCtrl', templateUrl: 'tab-square-card-detail.html'
        }
      }
    })
    .state('company.square-card-detail', {
      url: '/square/cardDetail/:Id', cache: false, params:{ entry:'company', url:'square' },
      views: {
        'company-square': {
          controller: 'SquareCardDetailCtrl', templateUrl: 'tab-square-card-detail.html'
        }
      }
    })
    .state('tab.my-square-card-detail', {
      url: '/my/square/cardDetail/:Id', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'SquareCardDetailCtrl', templateUrl: 'tab-square-card-detail.html'
        }
      }
    })
    .state('company.my-square-card-detail', {
      url: '/my/square/cardDetail/:Id', cache: false, params:{ entry:'company', url:'my/square' },
      views: {
        'company-my': {
          controller: 'SquareCardDetailCtrl', templateUrl: 'tab-square-card-detail.html'
        }
      }
    })

    .state('tab.square-card-resume', {
      url: '/square/cardResumeDetail/:Id', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'MyResumeDetailCtrl', templateUrl: 'tab-my-resume-detail.html'
        }
      }
    })
    .state('company.square-card-resume', {
      url: '/square/cardResumeDetail/:Id', cache: false, params:{ entry:'company', url:'square' },
      views: {
        'company-square': {
          controller: 'MyResumeDetailCtrl', templateUrl: 'tab-my-resume-detail.html'
        }
      }
    })
    .state('tab.my-square-card-resume', {
      url: '/my/square/cardResumeDetail/:Id', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'MyResumeDetailCtrl', templateUrl: 'tab-my-resume-detail.html'
        }
      }
    })
    .state('company.my-square-card-resume', {
      url: '/my/square/cardResumeDetail/:Id', cache: false, params:{ entry:'company', url:'my/square' },
      views: {
        'company-my': {
          controller: 'MyResumeDetailCtrl', templateUrl: 'tab-my-resume-detail.html'
        }
      }
    })

    .state('tab.square-card-inform', {
      url: '/square/cardInformDetail', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'MyImformationCtrl', templateUrl: 'tab-my-imformation.html'
        }
      }
    })
    .state('tab.my-square-card-inform', {
      url: '/my/square/cardInformDetail', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'MyImformationCtrl', templateUrl: 'tab-my-imformation.html'
        }
      }
    })

    .state('tab.square-detail', {
      url: '/square/detail/:Id', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'SquareDetailCtrl', templateUrl: 'tab-square-detail.html'
        }
      }
    })
    .state('tab.my-square-detail', {
      url: '/my/square/detail/:Id', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'SquareDetailCtrl', templateUrl: 'tab-square-detail.html'
        }
      }
    })

    .state('tab.square-imformation', {
      url: '/square/imformation/:Id', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'SquareImformationCtrl', templateUrl: 'tab-square-imformation.html'
        }
      }
    })
    .state('tab.my-square-imformation', {
      url: '/my/square/imformation/:Id', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'SquareImformationCtrl', templateUrl: 'tab-square-imformation.html'
        }
      }
    })

    .state('tab.square-imformation-otherSquare', {
      url: '/square/imformation/otherSquare/:Id', cache: false, params:{ entry:'tab', url:'square' },
      views: {
        'tab-square': {
          controller: 'OtherSquareCtrl', templateUrl: 'tab-square-imformation-otherSquare.html'
        }
      }
    })
    .state('tab.my-square-otherSquare', {
      url: '/my/square/imformation/otherSquare/:Id', cache: false, params:{ entry:'tab', url:'my/square' },
      views: {
        'tab-my': {
          controller: 'OtherSquareCtrl', templateUrl: 'tab-square-imformation-otherSquare.html'
        }
      }
    })

    // end common square

    .state('tab.my', {
      url: '/my', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyCtrl', templateUrl: 'tab-my.html'
        }
      }
    })
    .state('tab.my-nickname', {
      url: '/my/nickname', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyNicknameCtrl',templateUrl: 'tab-my-nickname.html'
        }
      }
    })
    .state('tab.my-courseApply', {
      url: '/my/courseApply', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyCourseApplyCtrl',templateUrl: 'tab-my-courseApply.html'
        }
      }
    })
    .state('tab.my-workReportIn', {
      url: '/my/workReportIn', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyReportCtrl', templateUrl: 'tab-my-workReportIn.html'
        }
      }
    })
    .state('tab.my-workReportOut', {
      url: '/my/workReportOut', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyReportCtrl', templateUrl: 'tab-my-workReportOut.html'
        }
      }
    })
    .state('tab.my-workReturnCash', {
      url: '/my/workReturnCash', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyReportCtrl', templateUrl: 'tab-my-workReturnCash.html'
        }
      }
    })
    .state('tab.my-jobRecord', {
      url: '/my/jobrecord', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyJobRecordCtrl', templateUrl: 'tab-my-jobRecord.html'
        }
      }
    })
    .state('tab.my-jobRecord-detail', {
      url: '/my/jobrecord/detail/:Type/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'JobDetailCtrl', templateUrl: 'tab-job-detail.html' //'tab-my-jobRecord-detail.html'
        }
      }
    })
    .state('tab.my-jobRecord-detail-company', {
      url: '/my/jobrecord/detailCompany/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'JobCompanyDetailCtrl', templateUrl: 'tab-job-detail-company.html' //'tab-my-jobRecord-detail-company.html'
        }
      }
    })
    .state('tab.my-message', {
      url: '/my/message', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyMessageCtrl', templateUrl: 'tab-my-message.html'
        }
      }
    })
    .state('tab.my-message-detail', {
      url: '/my/message/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyMessageDetailCtrl', templateUrl: 'tab-my-message-detail.html'
        }
      }
    })
    .state('tab.my-message-detail-system', {
      url: '/my/messageSystem', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyMessageDetailSystemCtrl', templateUrl: 'tab-my-message-detail-system.html'
        }
      }
    })
    
    .state('tab.my-set', {
      url: '/my/set', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MySetCtrl', templateUrl: 'tab-my-set.html'
        }
      }
    })
    .state('tab.my-set-detail', {
      url: '/my/set/detail/:Code', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MySetDetailCtrl', templateUrl: 'tab-my-set-detail.html'
        }
      }
    })
    .state('tab.my-set-leaveMessage', {
      url: '/my/set/leaveMessage', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MySetLeaveMessageCtrl', templateUrl: 'common-my-set-leaveMessage.html'
        }
      }
    })
    .state('tab.my-resume', {
      url: '/my/resume', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyResumeCtrl', templateUrl: 'tab-my-resume.html'
        }
      }
    })
    .state('tab.my-resume-set', {
      url: '/my/resumeSet', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyResumeSetCtrl', templateUrl: 'tab-my-resume-set.html'
        }
      }
    })
    .state('tab.my-resume-detail', {
      url: '/my/resumeDetail/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyResumeDetailCtrl', templateUrl: 'tab-my-resume-detail.html'
        }
      }
    })
    .state('tab.my-head', {
      url: '/my/head', cache: false, params:{ entry:'tab', headTitle:'我的头像' },
      views: {
        'tab-my': {
          controller: 'MyHeadCtrl', templateUrl: 'tab-my-head.html'
        }
      }
    })
    .state('tab.my-account', {
      url: '/my/account', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyAccountCtrl', templateUrl: 'tab-my-account.html'
        }
      }
    })
    .state('tab.my-account-phone', {
      url: '/my/account/phone', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyAccountPhoneCtrl', templateUrl: 'tab-my-account-phone.html'
        }
      }
    })
    .state('tab.my-account-password', {
      url: '/my/account/password', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyAccountPwdCtrl', templateUrl: 'tab-my-account-password.html'
        }
      }
    })
    .state('tab.my-imformation', {
      url: '/my/imformation', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyImformationCtrl', templateUrl: 'tab-my-imformation.html'
        }
      }
    })
    .state('tab.my-jobCollect', {
      url: '/my/jobCollect', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyJobCollectCtrl', templateUrl: 'tab-my-jobCollect.html'
        }
      }
    })
    .state('tab.my-compCollect', {
      url: '/my/compCollect', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyCompanyCollectCtrl', templateUrl: 'tab-my-companyCollect.html'
        }
      }
    })
    
    .state('tab.login', {
      url: '/login', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyLoginCtrl', templateUrl: 'tab-login.html'
        }
      }
    })
    .state('tab.login-forgetPwd', {
      url: '/login/forgetPwd', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyLoginForget', templateUrl: 'tab-login-forgetPwd.html'
        }
      }
    })
    .state('tab.register-new', {
      url: '/register-new/:Id', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyRegisterNew', templateUrl: 'tab-login-register-new.html'
        }
      }
    })
    .state('tab.register-otherway', {
      url: '/registerOtherway/:Type', cache: false, params:{ entry:'tab' },
      views: {
        'tab-my': {
          controller: 'MyRegisterOtherway', templateUrl: 'tab-login-register-otherway.html'
        }
      }
    })
    
    // --- end [求职者路由] ------------------------------------------------
    .state('tab.404', {
      url: '/404', cache: false,
      views: {
        'tab-index': {
          templateUrl: 'tab-404.html'
        }
      }
    })
    .state('tab.test', {
      url: '/test', cache: false,
      views: {
        'tab-index': {
          controller: "TestCtrl", templateUrl: 'tab-test.html'
        }
      }
    })
  // --- end 路由 --------
  
  //错误页 跳转 //$rootScope.entry
  $urlRouterProvider.otherwise('/tab/index');
  
  //Loading 状态拦截器
  $httpProvider.interceptors.push('timestampMarker');
  
})


.run(function($ionicPlatform, $cookieStore, $ionicBackdrop, $ionicPopover, $cookies, $rootScope, $ionicHistory, $http, $location, $timeout, $interval, $state, $stateParams) {
  
  // 获得当前页面参数
  // $rootScope.$state = $state;
  // $rootScope.$stateParams = $stateParams;
  // console.log($state);
  // console.log($stateParams);

  // require(['mock'], function(){
  //   $http.get('/api/d').success(function(rs){
  //     console.log(rs);
  //   })
  // });

  // 切换路由删除弹出框
  $rootScope.$on('$stateChangeStart', function(){
      if($rootScope.modal){
        $rootScope.modal.remove();
        $rootScope.modal = undefined;
      }
  });

  // 默认隐藏附件栏(删除此显示附件栏上面表单输入的键盘)
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); cordova.plugins.Keyboard.disableScroll(true); }
    if (window.StatusBar) { StatusBar.styleDefault(); }
  });

  // 防止页面的流量被统计双倍：在CNZZ的JS统计代码执行前先调用_setAutoPageview，将该页面的自动PV统计关闭。 http://open.cnzz.com/a/api/setautopageview/
  try{ _czc.push(["_setAutoPageview",autopageview]); }catch(e){ }

  // <tip-bottom tb-show="{{tbOption.isShow}}"></tip-bottom>
  // $rootScope.tbOption = { isShow:true, tbTitle:"更新提示", tbContent:"职得当前正在进行不停机更新(10:00-11:00)，在更新过程有可能出现登录不成功或者提交无效，造成不便敬请谅解" }

  // 判断域名作跳转
  if($location.host()=="www.001dg.com"||$location.host()=="001dg.com"){ window.location.href = "http://m.001dg.com"; }
  
  // [Bool]默认起始状态 jobForFirst, nearForFirst, nearJWForFirst 
  if($cookieStore.get("globalCookie")!=undefined){ $rootScope.globalCookie = $cookieStore.get("globalCookie"); }else{
    var cookieConfig = { nearForFirst : true, nearJWForFirst : true, jobForFirst : true }
    $cookieStore.put("globalCookie",cookieConfig); $rootScope.globalCookie = $cookieStore.get("globalCookie");
  }

  // [Click] (左上角) 返回上一页
  $rootScope.backTo = function(url, resetUrl){

    if(url){
      if(resetUrl){
        $rootScope.CurrentURL = resetUrl;
        window.location.href = $rootScope.app_config.links + resetUrl;
      }else{
        window.location.href = $rootScope.app_config.links + url;
      }
      if(url=="back"){ window.history.go(-1); }
    }else{
      $ionicHistory.goBack();
      $ionicHistory.clearCache();
    }

  }

  // 默认全局配置文件，在 app_config.js 
  $rootScope.config = {}
  $rootScope.app_config = { links: app_config.links , api: app_config.api, imgUrl: app_config.imgUrl }


  // [Click] (底部Menu) 跳转一个页面Url，并判断是否有登录（如无登录则跳转到 /login）
  $rootScope.linkChangePage = function(url, isLogin, entry){
    url = (isLogin && !$cookies.get("Ticket")) ? "/#/" + entry + "/login" : url;
    window.location.href = $rootScope.app_config.links + url;
  }

  
  
  //http://www.runoob.com/ionic/ionic-ionicpopover.html
  // [Click] (底部中间) “发布”
  var popover;

  var template = "<div class='menu-center-wrap'>"+
                  "<div class='top'>"+
                    "<h2>广场热门动态</h2>"+
                    "<div class='top-list'>"+
                      "<ul ng-show='squareList_Simple'>"+
                        "<li ng-repeat='item in squareList_Simple'>"+
                          "<a href='javascript:;' ng-click='linkToSquareDetail(item.Id)'>"+
                            "<em>{{item.UserNickName}}</em><span>{{item.Content}}</span><i>{{item.ReleaseTime.substring(5,10)}}</i>"+
                          "</a>"+
                        "</li>"+
                      "</ul>"+
                    "</div>"+
                    "<div class='top-bottom'>"+
                        "<a href='javascript:;' ng-show='entry==\"tab\"' ng-click='CenterButton_Link(\"/tab/square\")'>去广场逛逛</a>"+
                        "<a href='javascript:;' ng-show='entry==\"company\"' ng-click='CenterButton_Link(\"/company/square\")'>去广场逛逛</a>"+
                    "</div>"+
                  "</div>"+
                  "<div class='center'>"+
                    "<p>发布的内容/求职动态将会显示在广场</p>"+
                    "<a href='javascript:;' class='colorful-bg-2' ng-click='linkToAddNew()'><i class='ion ion-theme-nav-center'></i>发动态</a>"+
                    "<a href='javascript:;' ng-if='entry!=\"company\"' class='colorful-bg-3' ng-click='CenterButton_Link(\"/tab/square/card/full\")'><i class='ion ion-theme-nav-center'></i>找全职</a>"+
                    // "<a href='javascript:;' class='colorful-bg-4'><i class='ion ion-theme-nav-center'></i>找兼职</a>"+
                  "</div>"+
                  "<div class='bottom'>"+
                    "<a href='javascript:;' ng-click='CenterButton_Close()'><i class='ion ion-theme-nav-center'></i></a>"+
                  "</div>"+
                "</div>";
  popover = $ionicPopover.fromTemplate(template,{scope:$rootScope});
  // setTimeout(function(){ popover.show(); },200);
  
  $rootScope.CenterButton_Open = function(){
    popover.show().then(function(){
      
      function GetSquareSimple(){
        // $rootScope.squareList_Simple = [];
        // 筛选有评论的动态
        // angular.forEach($rootScope.squareList, function(item, i){
        //   if(item.MessageReplyList.length>0 && $rootScope.squareList_Simple.length<3){
        //     $rootScope.squareList_Simple.push(item);
        //   }
        // });
      }

      //[GET] 获得广场列表
      // if(!$rootScope.squareList){
      $http.get($rootScope.app_config.api + "/api/Common/Square/GetHotMessageList").success(function(rs){
        // $rootScope.squareList = rs.body;
        $rootScope.squareList_Simple = rs.body;
        
        // GetSquareSimple();
        //因后台数据不肯改结构而出现的函数，只好将数据读取下来再进行复杂的转换（图片路径"string,string2"变成"[{'src':'string'},{'src':'string2'}]"）
        //此数据无法封装，这里不能用 SquareEvent.formatImage()
        
        angular.forEach($rootScope.squareList_Simple,function(datasChild,index){
          if(datasChild.Images){
            var imagesArray = datasChild.Images.toString().split(",");
            var imagesJson = [];
            angular.forEach(imagesArray,function(arr){
              imagesJson.push({"src":arr});  //绝对地址,正式的时候要去掉
            })
            $rootScope.squareList_Simple[index].Images = imagesJson;
          }
        });

      });
      // }
      // else{
      //   GetSquareSimple();
      // }
      //end [GET] 获得广场列表

    });
  }

  //[Click] 广场链接跳转
  $rootScope.linkToSquareDetail = function(squareId){
    window.location.href = '#/tab/square/detail/' + squareId; popover.hide();
  }
  //[Click] 添加广场动态
  $rootScope.linkToAddNew = function(){
    $rootScope.linkChangePage('/#/' + $rootScope.entry + '/square'); popover.hide();
    $timeout(function(){ $rootScope.$emit('ShowSqureAddNew', true); },500);
  }
  //[Click] 添加广场(链接)
  $rootScope.CenterButton_Link = function(uri){
    $rootScope.CurrentURL = "/#" + uri;
    $location.path(uri);
    popover.hide();
  }
  $rootScope.CenterButton_Close = function(){
    // $ionicBackdrop.release();
    popover.hide();
  }

  // end
})



