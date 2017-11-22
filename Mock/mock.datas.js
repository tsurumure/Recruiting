var M = Mock.mock;
var SimpleSuccess = { "code": "0", "msg": "成功", "body": {}, "count": 0 };
var S = {
  "Labels": ['A01','A02','A03','A04','A05','A06','A07','A08'],
  "LabelsValue": ['热情开朗','亲和力','善于沟通','能加班','会英语','能出差','抗压力','善于创新'],
  "WelfareValue": ['住宿','班车','工作餐','返现','实习','保险','公积金','年终奖','周末双休']
}
Mock.Random.extend({
  HotSearchJobs: function(increment) {
      var ds = [ "外贸采购", "业务跟单", "外销员", "外贸业务员", "业务经理", "网页制作", "游戏开发", "工程造价", "置业顾问", "招商顾问", "房地产开发", "土建工程师"]
      return ds[increment]; //按顺序输出
  },
  JobNames: function(){
    return this.pick(['工程技术部副经理','预结算主管','工程资料管理','后勤人员','网络销售','阿里巴巴客服','文员'])
  },
  CompanyNames: function(){
    return this.pick(['汕头市振侨消防有限公司','汕头市柯丽雅电子科技有限公司','广东柏亚供应链股份有限公司','潮商集团（汕头）投资有限公司','广东宝颜生物科技有限公司'])
  },
  ArrayToString: function(arr, n){
    var ds = arr.split(',');
    var output = [];
    // 1)打乱数组顺序, 2)再按顺序输出。这样就不会出现重复值
    ds.sort(function(){ return 0.5 - Math.random() });
    for(var i=0;i<n;i++){ output.push(ds[i]); }
    return output.join(',');
  }
})

//[GET] Head meta Attribute [name:keywords]
M('/api/Common/Common/GetWebSiteKeyWords',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "达工宝,汕头找工作,揭阳找工作,汕头打工,揭阳打工,汕头招聘网,揭阳招聘网"
});

//[GET] Head meta Attribute [name:description]
M('/api/Common/Common/GetWebSiteDescription',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "达工宝是广东汇才推出专注于蓝领求职+社交的免费APP。达工宝对企业的招聘信息审核归类后，发布达工宝APP。达工宝保障职位可靠同时，让蓝领便捷地通过移动互联网获取最新招聘信息。",
});

//[GET] Head meta Attribute [name:searchtitle]
M('/api/Common/Common/GetWebSiteSearchTitle',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "汕头招聘网,达工宝,汕头人才网,汕头招聘,汕头人才市场,汕头招聘信息,汕头招聘会"
});

//[GET] 单张广告图片弹窗（小图Base64，用于判断是否有数据更新，减少数据加载量）
M(/\/api\/Common\/Common\/GetAdPhonePopupWindowDisplayNumber\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Yc"
});

//[GET]单张广告图片弹窗（链接跳转地址）
M(/\/api\/Common\/Common\/GetAdPhonePopupWindowURL\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "#/tab/job/detail/index/1f0479874652457185d874be59cea694"
});

//[GET]单张广告图片弹窗（大图Base64）
M(/\/api\/Common\/Common\/GetAdPhonePopupWindow\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "data:image/png;base64,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"
});

//[GET][首页] 获取职位列表
// M('/api/Common/Job/GetHomeJobList?AreaId=00000000000000000000000000440500&PageIndex=0&PageSize=10',{
M(/\/api\/Common\/Job\/GetHomeJobList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,{
    "code": "0", "msg": "ok",
    "body|20": [
      {
        "Id": "098e9c2257ca43e1a9fff1779cf62062", "EnterpriseId": "6abcb5e1ad5a4999b93928561c355b14",
        "Name": "@JobNames()", "EnterpriseName": "@CompanyNames()",
        "EnterpriseLogoSmall": "@image(30x30)", "IsPutaway": true,
        "Pay": "@integer(1,5)000-@integer(5,10)000", "JobPayUnit": "元/月", "WelfareValue": "@ArrayToString('" + S.WelfareValue + "',4)",
        // "Nature": "A01", "JobTypeId": "00000000000000000000000000000121", "JobTypeName": "IT行业",
        // "Department": "技术部", "RecruitingCount": 10, "PayWay": "A01", 
        // "WorkAreaId": "00000000000000000000000000440507",
        // "WorkAreaName": "龙湖区", "WorkAreaCascadeName": "广东省 汕头市 龙湖区",
        // "Welfare": "A09,A04,A05", 
        // "MapLocation": "116.72710393761011,23.372009521654274",
        // "ReleaseTime": "2017-10-26 17:35:43",  "ApplyCount": 2
      }
    ]
});

//[GET] 获取职位详情
M(/\/api\/Common\/Job\/GetJob\?jobId\=\w+/, {
    "code": "0", "msg": "ok", "count": 0,
    "body": {
        "Id": "098e9c2257ca43e1a9fff1779cf62062",
        "Name": "@JobNames()", "Pay": "@integer(1,5)000-@integer(5,10)000", "JobPayUnit": "元/月",
        "UserId": "ad1afaf8e17c49b0a531151fc4342edc", "EnterpriseId": "6abcb5e1ad5a4999b93928561c355b14",
        "EnterpriseName": "@CompanyNames()", "EnterpriseNatureCode": "A05",
        "EnterprisePeopleNumCode": "A02", "EnterpriseRegisteredCapitalCode": "A01",
        "EnterpriseLogoSmall": "/Mock/Images/Head/company_1.png",
        "ShareLogo": "/Mock/Images/Head/company_1.png",
        "Welfare": "A09,A04,A05", "WelfareValue": "周末双休,返现,实习", "ReleaseTime": "2017-10-26 17:35:43",
        "MapLng": "23.385766", "MapLat": "116.742521", "Distance": 0, "RecruitingCount": 10,
        "JobTypeId": "00000000000000000000000000000121", "JobTypeName": "财务/审计/税务", "Nature": "A01",
        "Department": "啧啧啧", "PayWay": "A01", "Describe": "好像呼吸iii洗在哦在哦izoo嫁鸡随鸡看看",
        "ApplyCount": 2, "ResumeCount": 2, "Accommodation": "", "WorkAddress": "汕头市龙湖区金霞街道金砂路104号金龙大厦12层",
        "IsHot": false, "IsSelf": false, "ContactManName": "泽民", "ContactManPhone": "15017247642", "IsPutaway": true,
    }
});

//[GET] 获取企业详情
M(/\/api\/Common\/Enterprise\/GetEnterprise\?entId\=\w+/,{
    "code": "0",
    "msg": "ok",
    "body": {
      "Id": "6abcb5e1ad5a4999b93928561c355b14", "UserId": "ad1afaf8e17c49b0a531151fc4342edc",
      "Name": "广东人力资源有限公司", "Industry": "人力资源", "Nature": "民营企业",
      "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。",
      "WebsiteUrl": "www.zdzp.com", "BusRoutes": "", "MapLocation": "23.385766,116.742521",
      "Logo": "/Mock/Images/Head/company_1.png", "LogoLit": "/Mock/Images/Head/company_1.png",
      "Address": "汕头市金砂东路104号金龙大厦1-2楼", "PeopleNum": "50-100人",
      "RegisteredCapital": "100万以下", "IsSelf": false,
      "ContactManName": "杨先生", "ContactManPhone": "13670511519",
      "Images": [ "Mock/Images/CompanyDetail/1.jpg","Mock/Images/CompanyDetail/2.jpg","@image('600x360')"],
      "Jobs|5": [{
          "Id": "098e9c2257ca43e1a9fff1779cf62062", "UserId": "ad1afaf8e17c49b0a531151fc4342edc",
          "Name": "人力资源培训师", "Pay": "10000-12000", "JobPayUnit": "元/月", "IsPutaway": true,
          "EnterpriseLogoSmall": "/Mock/Images/Head/company_1.png"
      }]
    }
  });

//[GET][POST] 添加阅读记录
M(/\/api\/Common\/Job\/AddReadRecord/, SimpleSuccess);
M(/\/api\/Common\/Resume\/AddReadRecord/, SimpleSuccess);

//[GET][首页] 获取热门搜索关键词
M(/\/api\/Common\/Common\/GetHotSerachKeyword\?area\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body|12": [
        "@HotSearchJobs(@increment)"
    ]
});

//[GET][首页] 获取Banner
M('/api/Common/Article/GetSlideList',{
  "code": "0",
  "msg": "ok",
  "body": [
    { "Pic": "/Mock/Images/Banner/1.jpg", "IsLink": false, "Url": "" },
    { "Pic": "@image(600x150)", "IsLink": false, "Url": "" },
    { "Pic": "@image(600x150)", "IsLink": false, "Url": "" }
  ],
  "count": 0
});

//[GET][首页] 获取最新公告
M(/\/api\/Common\/Article\/GetNotice\?areaId\=*/,{
    "code": "0",
    "msg": "ok",
    "body|4": [
      {
        "Id": "@string(5)",
        "Name": "@ctitle(10,15)",
        "Content": "@cparagraph(10,30)",
        "ReleaseTime": "2017-10-21 15:17:21", "IsLink": true, "Url": "",
        "Describe": "", "Pic": "",
      }
    ]
});

//[GET]获取 验证码
M(/\/api\/Common\/VerificationCode\/GetImage\?Width\=\w+\&Height\=\w+\&Type=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "R0lGODlhUAAgAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAABQACAAAAj/AIkpE0hwoMGCCA8qTMhwocOGEB0q20exIkUJ+05Y3MixY8VML/Z9GqYpWUlNGz95rIihIwSOxDKtnEkxkzKbMi0S+7RTYDKB1SoazLmPGMdkHDgS7ShG2USaUIfePPiEoiZlmiAQ3Gdk41ObVyseqBiOoo59JGEahWoR50GKA+EqmTEQ1LCBPweq3JipJ82nPz06pXgFJs+TcVP25PmUJsG8Ap+SWxkzsceYFo/xtLvvEQEXBF4y9kWgRWkXLVC30HGXmL5GLVqw0BGt4jAWuHNbWWFlDChiP3lWFMh2cMd6BD4TePE5FFpHqVMPiO0iDRyK7mKzuCL7Cpy7trBY/xlPfvymfaIsKhtmF5THWG3XDh+IpYCLOPvcfX7p3tZTY77EBkRRyVzBQgtwEDOJgQN2xAsLVeSwkQxYUSTfXxPBsBFyBFxAUT1YEKADShVdlZ0LtGEXm4RoWdECGbVt1M54XbhnoTJe7MNGUWxZeGFF7tgXQUUuiBNBYxTpg0ULDYRC0DCx6TDQMC6etZE+gLBgxSnEtHbUefusgaFH9bkQDQuOgEZiAsTdktoPjekTSGq1wWYFiRY9aEUcwNWE5I809bXRKxXVlxxooSCpyTAuuPDSPiYlyd2B28Fx0G9UWhHFMPvgWdRaSEYVakWIKMfcWZxaBF0LahDzmCaHdP8nm5UU3TUMI1o6t8+oJfU43FIVeVbAKfusAlqDFelzhYgxmqRMrC0414uBafhllxUsjBEjoEVpwi1Hd+waagHJvcAIuaA1qhxqn0XXwnSxxatdbFloiRu242m5mxVH2RYqNrtuNAygvxAwLFyCJBcNcAJd4cIAvx3US2zL4HWFizZSxMx2MQa80Y/fqvcUGhVJAYELzhGjnwtBWJUfakGkWhFsLSyqTC8HjlEQL7FYoQMRBMkkTYkrMbCStxSZU9E7NBBw5D5YgIYfRa74MoALOHRqUTsrlnRFMCyo8RtPeoK5DykCje2TQCcVN+o+jth3KAFTw7WkmbuuYhHNsRX/0AKYyeyjz3gtzLBPIRSZop6vFVlSFKdXCUoRacy5cN16A9ETYooe20XMxN3pauEwF+dATB6WEc24UKESJFBrqQ/3UexwdUQci50m9uMHHWFh+7dgYWVSpIsXlXpV/vYk/FWA8hT46qxXhIx6G+xjxg3q2bTYWnt5hJILFNWSPV6uYiXFXczjldRMrtq+UUsUCQOXUQJpH7LHHhHPo0V35cTwer8xCaje9rzLdK92cOkLAPm3j8J05BIB81RRIkaMjFVEDnwBltY2sgWaAO0yP4kYVPokGPTNxDhQKeBGcCEUCM4kCa9TRhtG5Z4+VQF6n8IhZTyCB4t4ij3lG1hFS36DQxSqYiUW8NXbODIqowWwfbvSIE2GITMdug8qErSQYO7nFay0Ji8KfAxBnmiQklSQPUAcCPO++L/0nRErUwFO5AAoRzoKUIABAQA7"
});

//[GET][附近] 获得附近职位列表
M(/\/api\/Common\/Job\/GetJobMapList\?lng\=\w+\.\w+\&lat\=\w+\.\w+/,{
    "code": "0", "msg": "ok",
    "body|10": [
      {
        "Id": "253eea8298f344c7a3097bd4cdeb1d50", "Name": "保安队长", "Pay": "3000",
        "EnterpriseName": "汕头国泰装饰材料城", "EnterpriseLogoSmall": "/Mock/Images/Head/company_1.png",
        "ShareLogo": "/Mock/Images/Head/company_1.png", "Welfare": "住,险", "WelfareValue": "住宿,保险",
        "MapLng": "116.722067", "MapLat": "23.386145", "JobPayUnit": "元/月",
        "Distance": 716
      }
    ]
});

var SquareList = {
    "code": "0",
    "msg": "ok",
    "body|2": [
      {
        "Id": "afa22d50250d4f6aae538e17dcdac90f", "Type": "", "UserId": "3317f16500124c3fa524d9726a77c098",
        "Url": "/m/square/selectMessage/afa22d50250d4f6aae538e17dcdac90f",
        "UserHeadPic": "/Mock/Images/Head/jobseeker_1.png", "UserNickName": "俺是张三",
        "PraiseCount": 2, "PraiseUserIds": [ "f9bf5e209c40492dbaa25554b4c9757c", "4bbd3217007b4bfdab201fa3c43e668f" ],
        "PraiseUserNickNames": [ "俺是张三", "李四" ], "PraiseUserHeadImages": [ "" ],
        "Content": "除了自律以外，自黑的能力也相当重要。世界之大，无奇不有。等你哪一天稍微做出点成绩，就会有很多认识或不认识的人在背后议论是非，从最开始的吐槽，到断章取义的论断甚至无趣的黑你",
        "Images": "/Mock/Images/Square/b1.jpg,/Mock/Images/Square/b2.jpg,@image(400x400)",
        "ReleaseTime": "2017-11-08 10:23:04", "ReplyCount": 5, "StatusD": 1,
        "MessageReplyList|5": [
          {
            "Id": "b1bf1ae0a7b5444895b2d2f1a7c99454", "Content": "不错", "ReleaseTime": "2017-11-21 14:11:52",
            "UserId": "f9bf5e209c40492dbaa25554b4c9757c", "UserHeadPic": "/Mock/Images/Head/jobseeker_1.png", "UserNickName": "俺是张三",
            "ParentId": "", "ParentUserId": "", "ParentUserNickName": "", "ParentUserHeadPic": ""
          },
          {
            "Id": "c5cf2c1a879a463e94550e3b381e90e9", "Content": "是啊", "ReleaseTime": "2017-11-21 14:12:30",
            "UserId": "4bbd3217007b4bfdab201fa3c43e668f", "UserHeadPic": "@image(30x30,eeeeee,人)", "UserNickName": "李四",
            "ParentId": "b1bf1ae0a7b5444895b2d2f1a7c99454", "ParentUserId": "f9bf5e209c40492dbaa25554b4c9757c",
            "ParentUserNickName": "Df9bf", "ParentUserHeadPic": ""
          }
        ]
      },
      {
        "Id": "afa22d50250d4f6aae538e17dcdac902", "Type": "", "UserId": "3317f16500124c3fa524d9726a77c098",
        "Url": "/m/square/selectMessage/afa22d50250d4f6aae538e17dcdac90f",
        "UserHeadPic": "/Mock/Images/Head/jobseeker_1.png", "UserNickName": "俺是张三",
        "PraiseCount": 0, "PraiseUserIds": [],
        "PraiseUserNickNames": [], "PraiseUserHeadImages": [],
        "ContentData": "{\"Id\":\"74703fa9044c4ef68c0c2ce9cd22c8af\",\"Type\":\"FulltimeResume\",\"Resume\":{\"Id\":\"1b5e088fbd5046c8aeb4d9876723e41c\",\"Title\":\"简易2\",\"Realname\":\"发达\",\"GenderCode\":\"A01\",\"NationCode\":\"A03\",\"MaritalStatusCode\":\"A01\",\"Stature\":111,\"Address\":\"工工工工\",\"ComputerLevelCode\":\"A02\",\"EnglishLevelCode\":\"A01\",\"NativePlaceAreaId\":\"00000000000000000000000000210600\",\"NativePlaceAreaName\":\"丹东市\",\"NativePlaceAreaCascadeName\":\"辽宁省 丹东市\",\"GraduateSchool\":\"1231\",\"MajorIn\":\"12312312312\",\"HeadImage\":\"/Mock/Images/Head/jobseeker_1.png\",\"Idcard\":\"440508111111111\",\"Gender\":\"A01\",\"Nation\":\"A03\",\"QQ\":\"\",\"Birthday\":\"1970-01-21T00:00:00\",\"LiveAreaId\":\"00000000000000000000000000440500\",\"LiveAreaName\":\"汕头市\",\"LiveAreaCascadeName\":\"广东省 汕头市\",\"IntentionAreaIds\":\"00000000000000000000000000440500\",\"IntentionAreaNames\":\"汕头市\",\"IntentionJobTypeId\":\"00000000000000000000000000000015\",\"IntentionJobType\":\"招商经理\",\"IntentionJobTypeIds\":\"00000000000000000000000000000015\",\"IntentionJobTypeNames\":\"招商经理\",\"WorkStatusCode\":\"   \",\"WorkingAgeCode\":\"A01\",\"IntentionPayCode\":\"A01\",\"EducationCode\":\"A01\",\"WorkExperience\":\"[]\",\"EduExperience\":\"[]\",\"PersonalProfile\":\"3123123123\",\"Proportion\":0.6,\"Certificate\":\"11\",\"Skill\":\"22\",\"IsDefault\":true,\"Integral\":0,\"Phone\":\"\",\"Email\":\"\",\"UserId\":\"9590d84a86914ecc88e27cb579b77c4e\",\"ReleaseTime\":\"2017-11-07T16:40:01\",\"Labels\":\"A01,A04\"}}",
        "Content": "求介绍一份好工作",
        "Images": "",
        "ReleaseTime": "2017-11-08 10:23:04", "ReplyCount": 0, "StatusD": 1,
        "MessageReplyList": []
      }
    ] 
};
//[GET][广场] 获取广场列表
M('/api/Common/Square/GetNewestMessageList',SquareList);
//[GET][广场] 获取热门广场列表
M('/api/Common/Square/GetHotMessageList',SquareList);
//[GET][广场] 获取广场列表（下滑刷新）
M(/\/api\/Common\/Square\/GetNextMessageList\?msgId\=\w+/,SquareList);
//[GET][广场] 获取广场动态的评论列表
M(/\/api\/Common\/Square\/GetMessage\?msgId\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "MessageReplyList|5": [
        {
          "Id": "b1bf1ae0a7b5444895b2d2f1a7c99454", "Content": "不错",
          "ReleaseTime": "2017-11-21 14:11:52", "UserId": "f9bf5e209c40492dbaa25554b4c9757c",
          "UserHeadPic": "", "UserNickName": "Df9bf",
          "ParentId": "", "ParentUserId": "", "ParentUserNickName": "", "ParentUserHeadPic": ""
        },
        {
          "Id": "c5cf2c1a879a463e94550e3b381e90e9", "Content": "是啊",
          "ReleaseTime": "2017-11-21 14:12:30", "UserId": "4bbd3217007b4bfdab201fa3c43e668f",
          "UserHeadPic": "", "UserNickName": "洪梓强",
          "ParentId": "b1bf1ae0a7b5444895b2d2f1a7c99454",
          "ParentUserId": "f9bf5e209c40492dbaa25554b4c9757c",
          "ParentUserNickName": "Df9bf", "ParentUserHeadPic": ""
        }
      ]
    }
});

//[POST][广场] 添加/删除 点赞
M('/api/Common/Square/AddMessagePraise', SimpleSuccess);
M('/api/Common/Square/DeleteMyMessagePraise', SimpleSuccess);
//[POST][广场] 添加/删除 评论
M('/api/Common/Square/AddMessageReply',SimpleSuccess);
M('/api/Common/Square/DeleteMyMessageReply',SimpleSuccess);
//[POST][广场] 添加新动态
M('/api/Common/Square/AddMessage',SimpleSuccess);

//[GET][广场] 获得广场个人信息
M(/\/api\/Common\/Square\/GetUserInfo\?UserId\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "3317f16500124c3fa524d9726a77c098", "NickName": "俺是张三", "RealName": "张三",
      "HeadPic": "/Mock/Images/Head/jobseeker_1.png",
    }
});

//[GET][广场] 获得广场名片
M(/\/api\/Common\/ResumeCard\/GetCard\?resumeCardId\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "6bb4c6fe803a4f54a438334cc65cf44d", "Type": "FulltimeResume",
      "Resume": {
        "Id": "9ea4f20ca8f6460c856cee0fe1dc5bd9", "Title": "张三的简历",
        "Realname": "张三", "GenderCode": "A01", "NationCode": "A01", "MaritalStatusCode": "A02",
        "Stature": 176, "Address": "广东省汕头市龙湖区夏桂埔桂欣东路四巷一号",
        "ComputerLevelCode": "A03", "EnglishLevelCode": "A03",
        "NativePlaceAreaId": "00000000000000000000000000120100",
        "NativePlaceAreaName": "天津市", "NativePlaceAreaCascadeName": "天津 天津市",
        "GraduateSchool": "北科大", "MajorIn": "计算机",
        "HeadImage": "",
        "Idcard": "445121198811044545", "Gender": "A01", "Nation": "A01",
        "QQ": "", "Birthday": "1993-08-11 00:00:00",
        "LiveAreaId": "00000000000000000000000000120102",
        "LiveAreaName": "河东区", "LiveAreaCascadeName": "天津 天津市 河东区",
        "IntentionAreaIds": "00000000000000000000000000440500,00000000000000000000000000445100",
        "IntentionAreaNames": "汕头市,潮州市", "IntentionJobTypeId": "00000000000000000000000000000008",
        "IntentionJobType": "大客户销售代表", "IntentionJobTypeIds": "00000000000000000000000000000008",
        "IntentionJobTypeNames": "大客户销售代表",
        "WorkStatusCode": "A03", "WorkingAgeCode": "A04", "IntentionPayCode": "A07", "EducationCode": "A03",
        "WorkExperience": "[{\"JobCompany\":\"宙斯影视有限公司\",\"JobDetail\":\"1.担任微电影剧组《神》主演之一\\u003cbr\\u003e2.揣摩人物造型、举止、语言、神态，与导演对于具体场次中人物的不同刻画方式进行交流，确立人物基本定位\\u003cbr\\u003e3.克服拍摄时地点、气候和起居条件等恶劣环境所带来的困难，全身心投入到拍摄工作\\u003cbr\\u003e4.与搭戏的演员进行大量事先交流，确保拍摄过程中尽量少的出现忘词、笑场等不应有的状况圆满完成对人物的塑造和诠释，保证影片拍摄顺利完成\",\"JobName\":\"导演\",\"JobinTime\":\"2017/07/03\",\"JoboutTime\":\"2017/07/21\"},{\"JobCompany\":\"乔布堂电视台\",\"JobDetail\":\"1.专题节目策划，脚本、解说词、新闻稿件撰写；\\u003cbr\\u003e2.节目配音与现场播报；\\u003cbr\\u003e3.采访、专访与发布会主持；\\u003cbr\\u003e4.跟进后期剪辑，确保节目质量\",\"JobName\":\"见习主持人\",\"JobinTime\":\"2014/07/14\",\"JoboutTime\":\"2015/07/18\"}]",
        "EduExperience": "[{\"EduLevelValue\":\"A06\",\"EduProfessional\":\"空间学\",\"EduSchool\":\"宇宙大学\",\"EduinTime\":\"2017/07/16\",\"EduoutTime\":\"2017/07/15\"},{\"EduLevelValue\":\"A03\",\"EduProfessional\":\"植物学\",\"EduSchool\":\"太阳系高校\",\"EduinTime\":\"2017/07/09\",\"EduoutTime\":\"2017/07/15\"},{\"EduLevelValue\":\"A02\",\"EduProfessional\":\"空气学\",\"EduSchool\":\"大气层实验中学\",\"EduinTime\":\"2017/07/02\",\"EduoutTime\":\"2017/07/22\"}]",
        "PersonalProfile": "本人有高度的事业心与责任心，良好的职业道德，原则性强，工作认真，积极主动，能吃苦耐劳，在工作和生活中能够不断吸取新的知识充实自己，并能从实际出发全面考虑问题，有信心向新工作挑战，和同事关系融洽！我愿到贵公司工作。我希望能与其它员工一起为贵公司奉献自己的一份力量，同时也体现自己的人生价值。",
        "Proportion": 1.0, "Certificate": "高级工程师认证", "Skill": "编程", "IsDefault": true,
        "Integral": 1, "Phone": "", "Email": "", "ReleaseTime": "2017-07-29 14:04:13",
        "UserId": "0ae601616b7d4a90b6d6d087aa6af228", "Labels": "A06,A05,A08"
      }
    }
    
});

var CommomExistUser = { "code": "40502", "msg": "手机号码已被注册，请更换后重新尝试。", "body": {}, "count": 0 };
//[POST] 判断手机是否已注册
M('/api/Common/User/PhoneIsUse',CommomExistUser);

//[POST] 获取短信验证码
M('/api/Common/VerificationCode/SendSMS',CommomExistUser);

//[POST] 注册
M(/\/api\/\w+\/User\/Register/,CommomExistUser);

//[POST] 忘记密码
M('/api/Common/User/PhoneForgotPwd',CommomExistUser);



//[POST] (通用)退出登录
M('/api/Common/User/LoginOff',SimpleSuccess);

//[POST] (企业Company)(求职者JobSeeker)登录
M(/\/api\/\w+\/User\/Login/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "C1F97D5F15CDBC9D0B80D8253D5671C9B710C355C0DC417D338323159CABFB8CE406C25801B1BA58D96219E57E111C3B9C7E4AC70ACC2181465A7AC483DD96DE113DCB5D6A06BC524052807CE62A515F4504307B1397BC279E1F694E5A936F4E6A9871B4378EC495FFE14B246CC1EB03835F85B27F1F0FC65F5852F296465EB21BC3140D6D9728D317C368F2BDB252F000630C2C567A77F55807BD794F8665980F4DFFBC04DAED38ED79506C5DB55A0F3C95AFA8B7E33C80A48ECC2A899431E6AD94DF067A7F374AD2396A680915023D"
});

//[POST] (企业)获取营业执照审核状态
M('/api/Company/Enterprise/GetBusinessLicenseAuthenticationDisposeStatus',{
    "code": "0", "msg": "ok", "count": 0,
    "body": { "Status": 1, "ReplyContent": "" }
});

//[GET] (企业)获取用户信息
M('/api/Company/User/GetCurrentUser',{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "ac830eb985e7480d8470f98a2dcd8721", "Rold": "Enterprise", "RegisterTime": "2016-07-22 16:09:56",
      "NickName": "广东人力资源有限公司", "RealName": "广东人力资源有限公司", "Industry": "其它", "Nature": "跨国公司(集团)",
      "HeadPic": "/Mock/Images/Head/company_1.png", "Phone": "13670511519", 
      "EnterpriseId": "fbf638f4704f482bbb3eacd20e059687", "EnterpriseName": "广东测试企业有限公司但是",
      "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。",
      "WebsiteUrl": "", "BusRoutes": "", "MapLocation": "116.730262,23.363683",
      "Logo": "/Mock/Images/Head/company_1.png", "LogoLit": "/Mock/Images/Head/company_1.png",
      "Address": "汕头市龙湖区金龙大厦B栋2楼", "PeopleNum": "50-100人", "RegisteredCapital": "100万-200万",
      "ContactManName": "杨先生", "ContactManPhone": "13670511519",
      "JobApplyCount": 35, "JobCount": 54, "JobPutawayCount": 54, "JobDeleteCount": 28, "MailCount": 75, "MailNotReadCount": 5,
      "Email": "712733451@qq.com", "IsSelf": false, "Departments": [ "劳务部", "技术部", "运营部", "行政部" ],
      "IsApplyReadCount": 32, "AllowReadResumeCount": 48, "IsApplyNotReadCount": 3, "ResumeCount": 7,
      "EnterpriseCollectResumeIds": [
        "4f5cdcbb2e0b4f779ad91f8179ab08c8", "9ea4f20ca8f6460c856cee0fe1dc5bd9",
        "7f87ae72ece749b59019feed03508c6d", "eb29f1e94cc14e8ea8d79128e688b5e1",
        "b7a2c0e05d7f450395950c5ad82c34e4", "f34ceb5f29b24a3187ab49af13b3f4a6",
        "4157cfcc909f42e28fdcf7c351310839"
      ]
    }
});
//[GET] (求职者)获取用户信息
M('/api/JobSeeker/User/GetCurrentUser',{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "f9bf5e209c40492dbaa25554b4c9757c", "Rold": "JobSeeker",
      "NickName": "张三", "RealName": "张三", "HeadPic": "/Mock/Images/Head/jobseeker_1.png",
      "Phone": "13670511519", "RegisterTime": "2017-11-17 11:22:19",
      "MailCount": 0, "MailNotReadCount": 0, "InformCount": 0,
      "Proportion": 0.0, "IsHasResumeBaseInfo": false, "IsHasResume": false,
      "JobCollectsCount": 0, "EnterpriseCollectsCount": 0, "JobApplysCount": 0,
      "CollectJobIds": [], "JobApplyIds": [],
    }
});

//[GET] (企业)是否完善基本资料
M('/api/Company/Enterprise/IsInitBaseInfo',{
    "code": "0", "msg": "ok", "body": true, "count": 0
});

//[GET] (企业)获取基本资料
M('/api/Company/Enterprise/GetEnterpriseBaseInfo', {
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Name": "广东人力资源有限公司",
      "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。",
      "IndustryId": "b9969b4b32464a3086f55e8e79e524ec", "NatureCode": "A13", "WebsiteUrl": "", "BusRoutes": "", "AreaId": "00000000000000000000000000440500",
      "AreaName": "汕头市", "AreaCascadeName": "广东省 汕头市", "EstablishDate": "1970-01-01 08:00:00", "MapLocation": "116.730262,23.363683",
      "Address": "汕头市龙湖区金龙大厦B栋2楼", "PeopleNumCode": "A02", "RegisteredCapitalCode": "A02", "ContactManName": "1sir",
      "ContactManPhone": "13670511519", "QQ": "405348097", "BusinessLicenseNumber": "224455667780",
      "BusinessLicensePic": "/Mock/Images/Head/company_1.png"
    }
});
//[GET] (求职者)获取基本资料
M('/api/JobSeeker/Resume/GetBaseInfo',{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Name": "张三", "GenderCode": "A01", "NationCode": "A01", "MaritalStatusCode": "A01",
      "Birthday": "2017-10-18 15:28:22", "Stature": 160, "Phone": "13612309640", "Email": "405348097@qq.com",
      "QQ": "405348097", "Address": "汕头市龙湖区金龙大厦B座1楼", "ComputerLevelCode": "A04", "EnglishLevelCode": "A04",
      "LiveAreaId": "00000000000000000000000000140425", "LiveAreaName": "平顺县",
      "LiveAreaCascadeName": "山西省 长治市 平顺县", "NativePlaceAreaId": "00000000000000000000000000120100",
      "NativePlaceAreaName": "天津市", "NativePlaceAreaCascadeName": "天津 天津市",
      "EducationCode": "A05", "WorkingAgeCode": "A01", "GraduateSchool": "汕头大学",
      "MajorIn": "软件开发", "Labels": "A01,A02,A03"
    }
  });
//[GET] (求职者)更新基本资料
M(/\/api\/JobSeeker\/Resume\/UpdateBaseInfo/,SimpleSuccess);

//[GET] (求职者/企业)获取简历保密设置
M('/api/JobSeeker/Resume/GetSecuritySet',{
    "code": "0", "msg": "ok", "count": 0, "body": { "Mode": 0, "ShieldEnterpriseNames": [] }
});
//[GET] (求职者)获取默认选中简历（新建第一份简历自动选中简历）
M('/api/JobSeeker/Resume/GetDefaultResume',{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "9b128ad0c2c14707bec91551cff66779", "Title": "张三的简历",
      "Realname": "张三", "GenderCode": "A01", "NationCode": "A01", "MaritalStatusCode": "A01",
      "Stature": 0, "Address": "", "ComputerLevelCode": "", "EnglishLevelCode": "",
      "NativePlaceAreaId": "", "NativePlaceAreaName": "", "NativePlaceAreaCascadeName": "",
      "GraduateSchool": "", "MajorIn": "", "HeadImage": "", "Idcard": "",
      "Gender": "A01", "Nation": "A01", "QQ": "", "Birthday": "2017-10-18 15:28:22",
      "LiveAreaId": "", "LiveAreaName": "", "LiveAreaCascadeName": "",
      "IntentionAreaIds": "00000000000000000000000000445100",
      "IntentionAreaNames": "潮州市", "IntentionJobTypeId": "00000000000000000000000000000008",
      "IntentionJobType": "大客户销售代表", "IntentionJobTypeIds": "00000000000000000000000000000008",
      "IntentionJobTypeNames": "大客户销售代表", "WorkStatusCode": "", "WorkingAgeCode": "",
      "IntentionPayCode": "A02", "EducationCode": "", "WorkExperience": "",
      "EduExperience": "[{\"EduinTime\":\"2017/11/06\",\"EduoutTime\":\"2017/11/08\",\"EduSchool\":\"13123\",\"EduProfessional\":\"3123\",\"EduLevelValue\":\"A02\"}]",
      "PersonalProfile": "12323", "Proportion": 0.7, "Certificate": "123", "Skill": "123",
      "IsDefault": true, "Integral": 0, "Phone": "13612309640", "Email": "",
      "UserId": "4bbd3217007b4bfdab201fa3c43e668f", "ReleaseTime": "2017-10-18 15:28:24",
      "Labels": ""
    }
});

//[GET] (通用)获取通知（系统）
M('/api/Common/Inform/GetInformList',{ "code": "0", "msg": "ok", "count": 0, "body": [] });

//[GET] (通用)获取通知（私信）
M('/api/Common/Mail/GetMailGroupUsers',{ "code": "0", "msg": "ok", "count": 0, "body": [] });

//[GET] (通用)获取单页文章（用户协议/等等..)
M(/\/api\/Common\/Single\/GetSingle\?code\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "2d9b896923e5481d8e7c1051833c43f3", "Name": "用户协议", "Pic": null, "ReleaseTime": "2015-12-02 20:54:33",
      "Content": "<p>\n\t一、前提声明：<br />\n\t1.1、达工宝网站及程序将按照本协议及不定时发布的补充协议提供达工宝网络招聘服务。达工宝保留更新本协议的权利，在必要时，达工宝可以修改、添加协议内容并以电子邮箱通知到使用者。为获得达工宝服务，服务使用人(以下称为用户，包括求职者等注册者)应当同意本协议的全部条款并按照注册页面提示完成注册。用户在注册过程中确认勾选&ldquo;同意&rdquo;本条款即表示用户完全接受本协议的全部条款。注册后因任何原因拒绝接受协议，应通知达工宝，并停止使用本产品，可不再受本协议约束；如果继续使用达工宝产品，将视为重新同意所有条款。<br />\n\t<br />\n\t1.2、用户注册成功后，其账号和密码由用户负责保管；用户对其账户的操作及所有活动、事件负法律责任。<br />\n\t<br />\n\t<br />\n\t二、版权声明<br />\n\t<br />\n\t2.1、达工宝网站及应用程序的内容和图表信息受《中华人民共和国著作权法》及相关法律法规和中国加入的所有知识产权方面的国际条约的保护。达工宝拥有达工宝网站及应用程序一切权利，包括达工宝对外公开的所有内容的著作权，未经达工宝许可，禁止全部或部分复制、转载或以其他方式使用。<br />\n\t<br />\n\t2.2达工宝网站及应用程序是达工宝创造的用以制成网页的HTML及程序。HTML及程序的版权同样属于达工宝所有。达工宝对其网站及应用程序上的所有标识、图标、图饰、图表、色彩、文字表述及其组合、版面设计、数据库均享有完全的著作权及其衍生的其他全部权利，对发布的信息均享有专有的发布和使用权。未经达工宝许可，网站或程序上任何信息均为禁止复制、使用、转载或其他方式使用。<br />\n\t<br />\n\t2.3达工宝用户发布的任何内容仅代表用户自己的观点和立场，与达工宝无关，由内容作者承担一切法律责任。<br />\n\t<br />\n\t<br />\n\t三、产品使用规则<br />\n\t<br />\n\t3.1使用达工宝网站、应用程序等产品应遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规。<br />\n\t<br />\n\t3.2使用产品时必须向达工宝提供准确的个人资料，如资料变动，必须及时更新。<br />\n\t<br />\n\t3.3用户不允许将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知达工宝。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，达工宝不承担任何责任。<br />\n\t<br />\n\t3.4用户需为在达工宝上传、存储、发表、发送的全部内容负全部责任。所有用户禁止在任何页面上传、存储、发表、发送下列信息，否则达工宝有权自行处理并不通知用户：<br />\n\t(1)违反宪法确定的基本原则的；<br />\n\t(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；<br />\n\t(3)损害国家荣誉和利益的；<br />\n\t(4)煽动民族仇恨、民族歧视，破坏民族团结的；<br />\n\t(5)破坏国家宗教政策，宣扬邪教和封建迷信的；<br />\n\t(6)散布谣言，扰乱社会秩序，破坏社会稳定的；<br />\n\t(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；<br />\n\t(8)侮辱或者诽谤他人，侵害他人合法权益的；<br />\n\t(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；<br />\n\t(10)以非法民间组织名义活动的；<br />\n\t(11)含有法律、行政法规禁止的其他内容的。<br />\n\t<br />\n\t3.5用户在使用达工宝产品同时应做到：<br />\n\t(1)遵守所有与网络服务有关的网络协议、规定和程序；<br />\n\t(2)不得为任何非法目的而使用网络服务系统；<br />\n\t(3)不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；<br />\n\t(4)不得利用达工宝网络服务系统进行未经达工宝授权的广告；<br />\n\t(5)未经达工宝同意，禁止给公布信息的个人或公司发电子邮件、打电话、寄信或进行其他接触的行为。<br />\n\t(6)用户接受以其注册的电子邮件地址接受达工宝发送的邮件或其他邮件资料，若希望&quot;退订&quot;这些邮件资料，可点击电子邮件中的退订链接退订或联系达工宝取消订阅。<br />\n\t(7)用户不得通过任何技术手段，侵入达工宝数据库、网站、应用程序，进行任何达工宝未对外开放的功能操作。不得进行数据采集。不得影响干涉其他用户或网络正常运行。一经发现达工宝有权停止该用户的账户所有功能。破坏系统或网络可能导致犯罪，达工宝将依法采取法律途径追究造成的损失。<br />\n\t<br />\n\t3.6用户违反上述使用规则，达工宝有权禁止其继续使用达工宝产品。<br />\n\t<br />\n\t3.7达工宝有权拒绝与本单位经营同类业务、有业务竞争关系或者其他利害关系的单位及个人提供服务。<br />\n\t<br />\n\t3.8达工宝有权在预先通知或不予通知的情况下终止任何免费服务。<br />\n\t<br />\n\t四、隐私保护<br />\n\t4.1达工宝不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在达工宝的非公开内容，但下列情况除外：<br />\n\t(1)事先获得用户的明确授权；<br />\n\t(2)根据有关的法律法规要求；<br />\n\t(3)按照相关政府主管部门的要求；<br />\n\t(4)为维护社会公众的利益。<br />\n\t<br />\n\t4.2在不透露单个用户隐私资料的前提下，达工宝有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。<br />\n\t<br />\n\t<br />\n\t五、免责条款<br />\n\t<br />\n\t5.1<br />\n\t用户明确同意其使用达工宝产品所存在的风险将完全由其自己承担；因其使用达工宝产品而产生的一切后果也由其自己承担，达工宝对用户不承担任何责任。<br />\n\t<br />\n\t5.2<br />\n\t达工宝不担保能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。同时，不保证能够长期无错误运营，也不保证服务器不受病毒或其他故障的侵扰。如果用户在使用本网站时发生数据丢失的情况，与达工宝无关。<br />\n\t<br />\n\t5.3<br />\n\t达工宝不能保证产品中信息会有一定数量的用户来浏览，也不能保证会有一位特定的用户来浏览。达工宝不保证所有信息、文本、图形、链接及其它项目的绝对准确性和完整性，故仅供用户参考使用。<br />\n\t<br />\n\t5.4<br />\n\t用户必须独自承担由于使用达工宝产品或通过达工宝产品登录到其他站点而形成的全部风险。用户需独立承担与他人交流信息所造成的后果。达工宝不担保用户发送给另一方用户的资料的真实性、精确性与可靠性。用户对所接受的资料的信任纯属个人风险。<br />\n\t<br />\n\t5.5<br />\n\t达工宝仅为招聘网络信息发布平台，任何通过达工宝产品发布的任何信息均系用户自行发布，达工宝对其合法性概不负责，亦不承担任何法律责任；用户在通过达工宝产品得到资讯和信息后，与信息发布人所进行的任何交易均系其双方自主交易，双方若发生纠纷，皆与达工宝无关，达工宝不承担任何法律责任；达工宝对于用户由于使用达工宝产品而造成的任何金钱、商誉、名誉的损失，或任何特殊的、间接的、或结果性的损失都不负任何责任。<br />\n\t<br />\n\t<br />\n\t六、风险说明<br />\n\t<br />\n\t6.1用户使用达工宝产品将承担自行风险。达工宝对产品所提供材料材料不作明显的或暗含的保证。除非适用的法律法规有明确规定，达工宝及其所属网络/产品对销售性的和适合于某一特定目的的一切保证不予承认。 达工宝不能保证材料的特殊目的不受阻挠不出错误，也不能保证错误会得到纠正，也不能保证达工宝产品或制成达工宝产品的材料不含有病毒或其他有害成分。在有关材料的使用或使用结果方面对材料的正确性、准确性、可靠性或其他方面，达工宝不作出保证或任何说明。用户承担一切必要的服务、修理或改正费用。在适用法规不允许暗含保证可免除承担一切费用的范围里，免除上述承担费用不适用于你。<br />\n\t<br />\n\t6.2警告<br />\n\t在使用达工宝产品时违背了这些法规将构成对达工宝权利的侵犯或违反，并可采取法律行动。<br />\n\t&nbsp;</p>"
    }
});

//[GET] (通用)获取地区ID
M(/\/api\/Common\/Data\/GetAreaAbbr\w+/,mockArea);

//[GET] (企业)首页简历列表
M(/\/api\/Common\/Resume\/GetHomeResumeList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,{
  "code": "0", "msg": "ok",
  "body|10": [
    {
      "Id": "1b5e088fbd5046c8aeb4d9876723e41c", "Title": "@cname()的简历", "Gender": "A01",
      "Realname": "@cname()", "GenderCode": "A01", "GraduateSchool": "1231", "Birthday": "1970-01-21 00:00:00",
      "MajorIn": "12312312312", "HeadImage": "@image(30x30)",
      "IntentionAreaIds": "00000000000000000000000000440500", "IntentionAreaNames": "汕头市",
      "IntentionJobTypeId": "00000000000000000000000000000015", "IntentionJobType": "@JobNames",
      "IntentionJobTypeIds": "00000000000000000000000000000015", "IntentionJobTypeNames": "@JobNames",
      "WorkingAgeCode": "A01", "IntentionPayCode": "A01", "EducationCode": "A01", "IsDefault": true,
      "UserId": "9590d84a86914ecc88e27cb579b77c4e", "Labels": "@ArrayToString('" + S.Labels + "',4)"
    }
  ]
});

//[GET] (企业)简历详情
M(/\/api\/Company\/Resume\/GetResumeDetail\?ResumeId\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": {
    "Id": "1b5e088fbd5046c8aeb4d9876723e41c", "Title": "张三的简历", "Realname": "张三",
    "GenderCode": "A01", "NationCode": "A03", "MaritalStatusCode": "A01", "Stature": 176,
    "Address": "汕头市龙湖区金霞街道金砂路104号金龙大厦12层", "ComputerLevelCode": "A02", "EnglishLevelCode": "A01",
    "NativePlaceAreaId": "00000000000000000000000000210600", "NativePlaceAreaName": "丹东市",
    "NativePlaceAreaCascadeName": "辽宁省 丹东市", "GraduateSchool": "广东科技大学", "MajorIn": "软件开发",
    "HeadImage": "/Mock/Images/Head/jobseeker_1.png", "Idcard": "440508111111111",
    "Gender": "A01", "Nation": "A03", "QQ": "405348097", "Birthday": "1970-01-21 00:00:00",
    "LiveAreaId": "00000000000000000000000000440500", "LiveAreaName": "汕头市",
    "LiveAreaCascadeName": "广东省 汕头市", "IntentionAreaIds": "00000000000000000000000000440500",
    "IntentionAreaNames": "汕头市", "IntentionJobTypeId": "00000000000000000000000000000015",
    "IntentionJobType": "招商经理", "IntentionJobTypeIds": "00000000000000000000000000000015",
    "IntentionJobTypeNames": "招商经理", "WorkStatusCode": "", "WorkingAgeCode": "A01",
    "IntentionPayCode": "A01", "EducationCode": "A01",
    "WorkExperience": "[{\"JobCompany\":\"宙斯影视有限公司\",\"JobDetail\":\"1.担任微电影剧组《神》主演之一\\u003cbr\\u003e2.揣摩人物造型、举止、语言、神态，与导演对于具体场次中人物的不同刻画方式进行交流，确立人物基本定位\\u003cbr\\u003e3.克服拍摄时地点、气候和起居条件等恶劣环境所带来的困难，全身心投入到拍摄工作\\u003cbr\\u003e4.与搭戏的演员进行大量事先交流，确保拍摄过程中尽量少的出现忘词、笑场等不应有的状况圆满完成对人物的塑造和诠释，保证影片拍摄顺利完成\",\"JobName\":\"导演\",\"JobinTime\":\"2017/07/03\",\"JoboutTime\":\"2017/07/21\"},{\"JobCompany\":\"乔布堂电视台\",\"JobDetail\":\"1.专题节目策划，脚本、解说词、新闻稿件撰写；\\u003cbr\\u003e2.节目配音与现场播报；\\u003cbr\\u003e3.采访、专访与发布会主持；\\u003cbr\\u003e4.跟进后期剪辑，确保节目质量\",\"JobName\":\"见习主持人\",\"JobinTime\":\"2014/07/14\",\"JoboutTime\":\"2015/07/18\"}]",
    "EduExperience": "[{\"EduLevelValue\":\"A06\",\"EduProfessional\":\"空间学\",\"EduSchool\":\"宇宙大学\",\"EduinTime\":\"2017/07/16\",\"EduoutTime\":\"2017/07/15\"},{\"EduLevelValue\":\"A03\",\"EduProfessional\":\"植物学\",\"EduSchool\":\"太阳系高校\",\"EduinTime\":\"2017/07/09\",\"EduoutTime\":\"2017/07/15\"},{\"EduLevelValue\":\"A02\",\"EduProfessional\":\"空气学\",\"EduSchool\":\"大气层实验中学\",\"EduinTime\":\"2017/07/02\",\"EduoutTime\":\"2017/07/22\"}]",
    "PersonalProfile": "本人有高度的事业心与责任心，良好的职业道德，原则性强，工作认真，积极主动，能吃苦耐劳，在工作和生活中能够不断吸取新的知识充实自己，并能从实际出发全面考虑问题，有信心向新工作挑战，和同事关系融洽！我愿到贵公司工作。我希望能与其它员工一起为贵公司奉献自己的一份力量，同时也体现自己的人生价值。",
    "Proportion": 1, "Certificate": "全国英语6级证书", "Skill": "设计", "IsDefault": true, "Integral": 0, "Labels": "A01,A04",
    "Phone": "", "Email": "", "UserId": "9590d84a86914ecc88e27cb579b77c4e", "ReleaseTime": "2017-11-07 16:40:01"
  }
});

//[GET] (企业)简历详情 - 扣除次数，开放显示简历联系方式的权限（需要再刷新GetResumeDetail接口才会显示）
M(/\/api\/Company\/Resume\/GetResumeContactWay\?resumeId\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": { "QQ": "405348097", "Phone": "15914385220", "Email": "tsurumure@hotmail.com" }
});

//[POST] (企业)判断简历是否有收藏
M('/api/Company/ResumeBook/IsExist',{ "code": "0", "msg": "ok", "body": false, "count": 0 });

//[POST] (企业)添加/移除 简历收藏
M('/api/Company/ResumeBook/AddResume',SimpleSuccess);
M('/api/Company/ResumeBook/DeleteResume',SimpleSuccess);

//[GET] (通用)获得私信模板
M('/api/Common/Mail/GetTemplates',{
  "code": "0", "msg": "ok", "count": 0,
  "body": [
    "您好，您的简历我们已收到，现给您发出面试邀请。面试时间：-月-日-时-分，面试地点：-",
    "您好，我们对您的简历感兴趣，方便约时间聊聊吗？"
  ]
});

//[POST] (通用)更新私信模板
M('/api/Common/Mail/UpdateTemplates',SimpleSuccess);

//[GET] (通用)获得招聘会列表
M(/\/api\/Common\/CareerFair\/GetList\?PageIndex\=\w+\&PageSize\=\w+/,{
  "code": "0",
  "msg": "ok",
  "body|5": [
    {
      "Id": "bf1609a347414461929c1e42ae542cb1", "Name": "广东汇才秋季大型综合招聘会",
      "Content": "<div>\r\n\t<strong>联系方式</strong></div>\r\n<div>\r\n\t订展专线：86348888 / 18923988375（刘小姐, QQ：863193140 传真86322777）&nbsp;</div>\r\n<div>\r\n\t网　　址：www.zdzp.cn（职得招聘）&nbsp;</div>\r\n<div>\r\n\t会场地址：汕头市龙湖区金砂东路104号金龙大厦1-2楼广东汇才人力资源市场</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>参会流程</strong></div>\r\n<div>\r\n\t企业参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>参会须知</strong></div>\r\n<div>\r\n\t参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。参会单位注意：参会单位工作人员上午9点签到入场，提前做好准备，服从大会统一安排，请勿随意搬移桌椅，会议期间妥善保管好随身物品。</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>媒体支持</strong></div>\r\n<div>\r\n\t平面媒体：汕头电视台一套、汇才人力薪情快报、路边广告牌、展架及汕头电视台资讯频道不间断宣传等</div>\r\n<div>\r\n\t公车/驾车指引</div>\r\n<div>\r\n\t直达乘车路线&mdash;&mdash;10、24路公交车到外贸中专站下车或2、6、18、38、101路公交车到金海湾大酒店站。临近站点&mdash;&mdash;12、15、19、20、24、25、28、39、103路会展中心站下车向金海湾方向直走100米。</div>\r\n<div>\r\n\t&nbsp;</div>",
      "Address": "广东汇才人力资源市场(汕头龙湖区金砂东路104号金龙大厦首层)",
      // "Images": "/Mock/Images/Square/b1.jpg",
      "Images": "@image('70x70')", "BoothImage": "@image('70x70')",
      "ConductTime": "2017年10月14日9点", "IsEnd": false, "StallCount": 80, "CareerFairDetails": [], "JobSeekerCount": 0,
      "TrafficGuide": "直达乘车路线——10、24路公交车到外贸中专站下车或2、6、18、38、101路公交车到金海湾大酒店站。临近站点——12、15、19、20、24、25、28、39、103路会展中心站下车向金海湾方向直走100米。",
      "ContactWay": "订展专线：86348888 / 18923988375（刘小姐, QQ：863193140 传真86322777）\r\n网　　址：www.zdzp.cn（职得招聘）\r\n会场地址：汕头市龙湖区金砂东路104号金龙大厦1-2楼广东汇才人力资源市场",
      "Notice": "参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。参会单位注意：参会单位工作人员上午9点签到入场，提前做好准备，服从大会统一安排，请勿随意搬移桌椅，会议期间妥善保管好随身物品。",
      "Media": "平面媒体：汕头电视台一套、汇才人力薪情快报、路边广告牌、展架及汕头电视台资讯频道不间断宣传等",
      "Flow": "企业参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。"
    },
    {
      "Id": "bf1609a347414461929c1e42ae542cb2", "Name": "广东汇才秋季大型综合招聘会",
      "Content": "<div>\r\n\t<strong>联系方式</strong></div>\r\n<div>\r\n\t订展专线：86348888 / 18923988375（刘小姐, QQ：863193140 传真86322777）&nbsp;</div>\r\n<div>\r\n\t网　　址：www.zdzp.cn（职得招聘）&nbsp;</div>\r\n<div>\r\n\t会场地址：汕头市龙湖区金砂东路104号金龙大厦1-2楼广东汇才人力资源市场</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>参会流程</strong></div>\r\n<div>\r\n\t企业参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>参会须知</strong></div>\r\n<div>\r\n\t参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。参会单位注意：参会单位工作人员上午9点签到入场，提前做好准备，服从大会统一安排，请勿随意搬移桌椅，会议期间妥善保管好随身物品。</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>媒体支持</strong></div>\r\n<div>\r\n\t平面媒体：汕头电视台一套、汇才人力薪情快报、路边广告牌、展架及汕头电视台资讯频道不间断宣传等</div>\r\n<div>\r\n\t公车/驾车指引</div>\r\n<div>\r\n\t直达乘车路线&mdash;&mdash;10、24路公交车到外贸中专站下车或2、6、18、38、101路公交车到金海湾大酒店站。临近站点&mdash;&mdash;12、15、19、20、24、25、28、39、103路会展中心站下车向金海湾方向直走100米。</div>\r\n<div>\r\n\t&nbsp;</div>",
      "Address": "广东汇才人力资源市场(汕头龙湖区金砂东路104号金龙大厦首层)",
      "Images": "@image('70x70')", "BoothImage": "@image('70x70')",
      "ConductTime": "2017年10月14日9点", "IsEnd": true, "StallCount": 80, "CareerFairDetails": [], "JobSeekerCount": 0,
      "TrafficGuide": "直达乘车路线——10、24路公交车到外贸中专站下车或2、6、18、38、101路公交车到金海湾大酒店站。临近站点——12、15、19、20、24、25、28、39、103路会展中心站下车向金海湾方向直走100米。",
      "ContactWay": "订展专线：86348888 / 18923988375（刘小姐, QQ：863193140 传真86322777）\r\n网　　址：www.zdzp.cn（职得招聘）\r\n会场地址：汕头市龙湖区金砂东路104号金龙大厦1-2楼广东汇才人力资源市场",
      "Notice": "参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。参会单位注意：参会单位工作人员上午9点签到入场，提前做好准备，服从大会统一安排，请勿随意搬移桌椅，会议期间妥善保管好随身物品。",
      "Media": "平面媒体：汕头电视台一套、汇才人力薪情快报、路边广告牌、展架及汕头电视台资讯频道不间断宣传等",
      "Flow": "企业参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。"
    }
  ]
});

//[GET] (通用)获得招聘会列表 - 参会人才
M(/\/api\/Common\/CareerFair\/GetJobSeekerList\?careerFairId\=\w+/,{
  "code": "0", "msg": "ok", "body": [], "count": 0
});

//[GET] (通用)获得招聘会列表 - 招聘会详情
M(/\/api\/Common\/CareerFair\/GetDetail\?careerFairId\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": {
    "Id": "bf1609a347414461929c1e42ae542cb1", "Name": "广东汇才秋季大型综合招聘会",
    "Content": "<div>\r\n\t<strong>联系方式</strong></div>\r\n<div>\r\n\t订展专线：86348888 / 18923988375（刘小姐, QQ：863193140 传真86322777）&nbsp;</div>\r\n<div>\r\n\t网　　址：www.zdzp.cn（职得招聘）&nbsp;</div>\r\n<div>\r\n\t会场地址：汕头市龙湖区金砂东路104号金龙大厦1-2楼广东汇才人力资源市场</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>参会流程</strong></div>\r\n<div>\r\n\t企业参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>参会须知</strong></div>\r\n<div>\r\n\t参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。参会单位注意：参会单位工作人员上午9点签到入场，提前做好准备，服从大会统一安排，请勿随意搬移桌椅，会议期间妥善保管好随身物品。</div>\r\n<div>\r\n\t&nbsp;</div>\r\n<div>\r\n\t<strong>媒体支持</strong></div>\r\n<div>\r\n\t平面媒体：汕头电视台一套、汇才人力薪情快报、路边广告牌、展架及汕头电视台资讯频道不间断宣传等</div>\r\n<div>\r\n\t公车/驾车指引</div>\r\n<div>\r\n\t直达乘车路线&mdash;&mdash;10、24路公交车到外贸中专站下车或2、6、18、38、101路公交车到金海湾大酒店站。临近站点&mdash;&mdash;12、15、19、20、24、25、28、39、103路会展中心站下车向金海湾方向直走100米。</div>\r\n<div>\r\n\t&nbsp;</div>",
    "Address": "广东汇才人力资源市场(汕头龙湖区金砂东路104号金龙大厦首层)",
    "Images": "@image('70x70')",  "BoothImage": "@image('70x70')",
    "ConductTime": "2017年10月14日9点", "IsEnd": false, "StallCount": 80, "CareerFairDetails": [], "JobSeekerCount": 0,
    "TrafficGuide": "直达乘车路线——10、24路公交车到外贸中专站下车或2、6、18、38、101路公交车到金海湾大酒店站。临近站点——12、15、19、20、24、25、28、39、103路会展中心站下车向金海湾方向直走100米。",
    "ContactWay": "订展专线：86348888 / 18923988375（刘小姐, QQ：863193140 传真86322777）\r\n网　　址：www.zdzp.cn（职得招聘）\r\n会场地址：汕头市龙湖区金砂东路104号金龙大厦1-2楼广东汇才人力资源市场",
    "Notice": "参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。参会单位注意：参会单位工作人员上午9点签到入场，提前做好准备，服从大会统一安排，请勿随意搬移桌椅，会议期间妥善保管好随身物品。",
    "Media": "平面媒体：汕头电视台一套、汇才人力薪情快报、路边广告牌、展架及汕头电视台资讯频道不间断宣传等",
    "Flow": "企业参会手续办理：参会单位须提供营业执照副本、介绍信或经办人身份证复印件、招聘资料，于大会前2天办理展位预定手续，以便统一制作宣传海报。"
  }
});

//[GET] (通用)获得招聘会列表 - 是否有申请过
M(/\/api\/Company\/CareerFair\/IsApply\?CareerFairId\=\w+/,{
  "code": "0", "msg": "ok", "body": false, "count": 0
});