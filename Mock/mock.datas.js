var M = Mock.mock;
var SimpleSuccess = { "code": "0", "msg": "成功", "body": {}, "count": 0 };

var S = {
  "Labels": ['A01','A02','A03','A04','A05','A06','A07','A08'],
  "LabelsValue": ['热情开朗','亲和力','善于沟通','能加班','会英语','能出差','抗压力','善于创新'],
  "WelfareValue": ['住宿','班车','工作餐','返现','实习','保险','公积金','年终奖','周末双休']
}
var SimpleJobList = {
  "code": "0", "msg": "ok",
  "body|10": [
    {
      "Id": "39fcc95e9f0b4ba1823ab385224bb22a", "EnterpriseId": "1f8c8e747e4041dc9a67447a75cf832c",
      "EnterpriseName": "@CompanyNames()", "EnterpriseLogoSmall": "@image(30x30)",
      "Name": "@JobNames", "Nature": "A01", "JobTypeId": "00000000000000000000000000000206",
      "JobTypeName": "化验/检验", "Department": "质量保证部", "RecruitingCount": 3, "PayWay": "A01",
      "WorkAreaId": "00000000000000000000000000440511", "WorkAreaName": "金平区", "WorkAreaCascadeName": "广东省 汕头市 金平区",
      "Pay": "@integer(1,5)000-@integer(5,10)000", "JobPayUnit": "元/月", "Welfare": "A03,A06,A08,A09", "WelfareValue": "@ArrayToString('" + S.WelfareValue + "',4)",
      "MapLocation": "116.685815,23.403163", "ReleaseTime": "2017-11-23 09:34:13", "IsPutaway": true, "ApplyCount": 1
    }
  ]
}
var SimpleJob = {
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
var EditJob = {
  "JobId":"39fcc95e9f0b4ba1823ab385224bb22x",
  "Id": "c94a2a2a88af4f3fbc4f3b8167c43389", "EnterpriseId": "fbf638f4704f482bbb3eacd20e059687",
  "EnterpriseName": "@CompanyNames()", "EnterpriseLogoSmall": "@image(40x40)",
  "Name": "@JobNames()", "Nature": "A02", "JobTypeId": "00000000000000000000000000000012",
  "JobTypeName": "销售业务跟单", "Department": "技术部", "RecruitingCount": 2, "PayWay": "A01",
  "WorkAreaId": "00000000000000000000000000440507", "WorkAreaName": "龙湖区", "WorkAreaCascadeName": "广东省 汕头市 龙湖区",
  "Pay": "@integer(1,5)000-@integer(5,10)000","PayMin": 3000, "PayMax": 5000, "JobPayUnit": "元/月", "Welfare": "A02,A05", "WelfareValue": "班车,实习",
  "MapLocation": "116.730262,23.363683", "ReleaseTime": "2017-11-14 14:11:29", "IsPutaway": true, "ApplyCount": 0
}

var SimpleResumeList = {
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
      "UserId": "9590d84a86914ecc88e27cb579b77c4e", "Labels": "@ArrayToString('" + S.Labels + "',3)"
    }
  ]
}
var SimpleResume = {
  "Id": "9ea4f20ca8f6460c856cee0fe1dc5bd9", "Title": "@cname()的简历", "Realname": "@cname()", "GenderCode": "A01", "NationCode": "A01", "MaritalStatusCode": "A02",
  "Stature": 176, "Address": "广东省汕头市龙湖区夏桂埔桂欣东路四巷一号", "ComputerLevelCode": "A03", "EnglishLevelCode": "A03",
  "NativePlaceAreaId": "00000000000000000000000000120100", "NativePlaceAreaName": "天津市", "NativePlaceAreaCascadeName": "天津 天津市",
  "GraduateSchool": "北科大", "MajorIn": "计算机", "HeadImage": "@image(80x80)", "Idcard": "445121198811044545", "Gender": "A01", "Nation": "A01",
  "QQ": "", "Birthday": "1993-08-11 00:00:00", "LiveAreaId": "00000000000000000000000000120102", "LiveAreaName": "河东区", "LiveAreaCascadeName": "天津 天津市 河东区",
  "IntentionAreaIds": "00000000000000000000000000440500,00000000000000000000000000445100", "IntentionAreaNames": "汕头市,潮州市", "IntentionJobTypeId": "00000000000000000000000000000008",
  "IntentionJobType": "@JobNames()", "IntentionJobTypeIds": "00000000000000000000000000000008",
  "IntentionJobTypeNames": "@JobNames()",
  "WorkStatusCode": "A03", "WorkingAgeCode": "A04", "IntentionPayCode": "A07", "EducationCode": "A03",
  "WorkExperience": "[{\"JobCompany\":\"宙斯影视有限公司\",\"JobDetail\":\"1.担任微电影剧组《神》主演之一\\u003cbr\\u003e2.揣摩人物造型、举止、语言、神态，与导演对于具体场次中人物的不同刻画方式进行交流，确立人物基本定位\\u003cbr\\u003e3.克服拍摄时地点、气候和起居条件等恶劣环境所带来的困难，全身心投入到拍摄工作\\u003cbr\\u003e4.与搭戏的演员进行大量事先交流，确保拍摄过程中尽量少的出现忘词、笑场等不应有的状况圆满完成对人物的塑造和诠释，保证影片拍摄顺利完成\",\"JobName\":\"导演\",\"JobinTime\":\"2017/07/03\",\"JoboutTime\":\"2017/07/21\"},{\"JobCompany\":\"乔布堂电视台\",\"JobDetail\":\"1.专题节目策划，脚本、解说词、新闻稿件撰写；\\u003cbr\\u003e2.节目配音与现场播报；\\u003cbr\\u003e3.采访、专访与发布会主持；\\u003cbr\\u003e4.跟进后期剪辑，确保节目质量\",\"JobName\":\"见习主持人\",\"JobinTime\":\"2014/07/14\",\"JoboutTime\":\"2015/07/18\"}]",
  "EduExperience": "[{\"EduLevelValue\":\"A06\",\"EduProfessional\":\"空间学\",\"EduSchool\":\"宇宙大学\",\"EduinTime\":\"2017/07/16\",\"EduoutTime\":\"2017/07/15\"},{\"EduLevelValue\":\"A03\",\"EduProfessional\":\"植物学\",\"EduSchool\":\"太阳系高校\",\"EduinTime\":\"2017/07/09\",\"EduoutTime\":\"2017/07/15\"},{\"EduLevelValue\":\"A02\",\"EduProfessional\":\"空气学\",\"EduSchool\":\"大气层实验中学\",\"EduinTime\":\"2017/07/02\",\"EduoutTime\":\"2017/07/22\"}]",
  "PersonalProfile": "本人有高度的事业心与责任心，良好的职业道德，原则性强，工作认真，积极主动，能吃苦耐劳，在工作和生活中能够不断吸取新的知识充实自己，并能从实际出发全面考虑问题，有信心向新工作挑战，和同事关系融洽！我愿到贵公司工作。我希望能与其它员工一起为贵公司奉献自己的一份力量，同时也体现自己的人生价值。",
  "Proportion": 1.0, "Certificate": "高级工程师认证", "Skill": "编程", "IsDefault": true, "Integral": 1, "Phone": "", "Email": "", "ReleaseTime": "2017-07-29 14:04:13",
  "UserId": "0ae601616b7d4a90b6d6d087aa6af228", "Labels": "A06,A05,A08"
}
var SimpleSystemMessage = {
  "Id": "bd7f7b26609e48829b322052d9c7eda7", "Name": "[@CompanyNames]包装工", "Type": "Interview",
  "Content": "@ctitle(10,15)", "AddTime": "2016-09-07 13:53:52", "IsRead": true, "IdentCode": "52dfab4480e14b118d25622fd528f97f"
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

// [GET] Head meta Attribute [name:keywords]
M('/api/Common/Common/GetWebSiteKeyWords',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "达工宝,汕头找工作,揭阳找工作,汕头打工,揭阳打工,汕头招聘网,揭阳招聘网"
});

// [GET] Head meta Attribute [name:description]
M('/api/Common/Common/GetWebSiteDescription',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "达工宝是广东汇才推出专注于蓝领求职+社交的免费APP。达工宝对企业的招聘信息审核归类后，发布达工宝APP。达工宝保障职位可靠同时，让蓝领便捷地通过移动互联网获取最新招聘信息。",
});

// [GET] Head meta Attribute [name:searchtitle]
M('/api/Common/Common/GetWebSiteSearchTitle',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "汕头招聘网,达工宝,汕头人才网,汕头招聘,汕头人才市场,汕头招聘信息,汕头招聘会"
});

// [GET] 单张广告图片弹窗（小图Base64，用于判断是否有数据更新，减少数据加载量）
M(/\/api\/Common\/Common\/GetAdPhonePopupWindowDisplayNumber\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Yc"
});

// [GET]单张广告图片弹窗（链接跳转地址）
M(/\/api\/Common\/Common\/GetAdPhonePopupWindowURL\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "#/tab/job/detail/index/1f0479874652457185d874be59cea694"
});

// [GET]单张广告图片弹窗（大图Base64）
M(/\/api\/Common\/Common\/GetAdPhonePopupWindow\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "data:image/png;base64,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"
});

// [GET][首页] 获取职位列表
// M('/api/Common/Job/GetHomeJobList?AreaId=00000000000000000000000000440500&PageIndex=0&PageSize=10',{
M(/\/api\/Common\/Job\/GetHomeJobList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,{
    "code": "0", "msg": "ok",
    "body|20": [
      {
        "Id": "098e9c2257ca43e1a9fff1779cf62062", "EnterpriseId": "6abcb5e1ad5a4999b93928561c355b14",
        "Name": "@JobNames()", "EnterpriseName": "@CompanyNames()",
        "EnterpriseLogoSmall": "@image(30x30)", "IsPutaway": true,
        "Pay": "@integer(1,5)000-@integer(5,10)000", "JobPayUnit": "元/月", "WelfareValue": "@ArrayToString('" + S.WelfareValue + "',4)"
      }
    ]
});

// [GET] 获取职位详情
M(/\/api\/Common\/Job\/GetJob\?jobId\=\w+/, { "code": "0", "msg": "ok", "count": 0, "body": SimpleJob });

// [GET] 获取企业详情
M(/\/api\/Common\/Enterprise\/GetEnterprise\?entId\=\w+/,{
  "code": "0",
  "msg": "ok",
  "body": {
    "Id": "6abcb5e1ad5a4999b93928561c355b14", "UserId": "ad1afaf8e17c49b0a531151fc4342edc",
    "Name": "@CompanyNames()", "Industry": "人力资源", "Nature": "民营企业",
    "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。",
    "WebsiteUrl": "www.zdzp.com", "BusRoutes": "", "MapLocation": "23.385766,116.742521",
    "Logo": "/Mock/Images/Head/company_1.png", "LogoLit": "/Mock/Images/Head/company_1.png",
    "Address": "汕头市金砂东路104号金龙大厦1-2楼", "PeopleNum": "50-100人",
    "RegisteredCapital": "100万以下", "IsSelf": false,
    "ContactManName": "@cname()", "ContactManPhone": "136@integer(0,100000000)",
    "Images": [ "Mock/Images/CompanyDetail/1.jpg","Mock/Images/CompanyDetail/2.jpg","@image('600x360')"],
    "Jobs|5": [{
        "Id": "098e9c2257ca43e1a9fff1779cf62062", "UserId": "ad1afaf8e17c49b0a531151fc4342edc",
        "Name": "人力资源培训师", "Pay": "10000-12000", "JobPayUnit": "元/月", "IsPutaway": true,
        "EnterpriseLogoSmall": "/Mock/Images/Head/company_1.png"
    }]
  }
});
// [GET] (求职者)判断是否收藏了企业
M(/\/api\/JobSeeker\/Enterprise\/IsCollectEnterprise\?enterpriseId\=\w+/,{ "code": "0", "msg": "ok", "body": true, "count": 0 })

// [GET][POST] 添加阅读记录
M(/\/api\/Common\/Job\/AddReadRecord/, SimpleSuccess);
M(/\/api\/Common\/Resume\/AddReadRecord/, SimpleSuccess);

// [GET][首页] 获取热门搜索关键词
M(/\/api\/Common\/Common\/GetHotSerachKeyword\?area\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body|12": [
        "@HotSearchJobs(@increment)"
    ]
});

// [GET][首页] 获取Banner
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

// [GET][首页] 获取最新公告
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

// [GET]获取 验证码
M(/\/api\/Common\/VerificationCode\/GetImage\?Width\=\w+\&Height\=\w+\&Type=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "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"
});

// [GET][附近] 获得附近职位列表
M(/\/api\/Common\/Job\/GetJobMapList\?lng\=\w+\.\w+\&lat\=\w+\.\w+/,{
    "code": "0", "msg": "ok",
    "body|10": [
      {
        "Id": "253eea8298f344c7a3097bd4cdeb1d50", "Name": "@JobNames", "Pay": "@integer(1,5)000-@integer(5,10)000",
        "EnterpriseName": "@CompanyNames", "EnterpriseLogoSmall": "@image(40x40)",
        "ShareLogo": "/Mock/Images/Head/company_1.png", "Welfare": "住,险", "WelfareValue": "住宿,保险",
        "MapLng": "116.722067", "MapLat": "23.386145", "JobPayUnit": "元/月",
        "Distance": "@integer(1,500)"
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
// [GET][广场] 获取广场列表
M('/api/Common/Square/GetNewestMessageList',SquareList);
// [GET][广场] 获取热门广场列表
M('/api/Common/Square/GetHotMessageList',SquareList);
// [GET][广场] 获取我的广场列表
M('/api/Common/Square/GetMyReleaseMessageList',SquareList);

// [GET][广场] 获取广场列表（下滑刷新）
M(/\/api\/Common\/Square\/GetNextMessageList\?msgId\=\w+/,SquareList);
// [GET][广场] 获取广场动态的评论列表
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

// [POST][广场] 添加/删除 点赞
M('/api/Common/Square/AddMessagePraise', SimpleSuccess);
M('/api/Common/Square/DeleteMyMessagePraise', SimpleSuccess);
// [POST][广场] 添加/删除 评论
M('/api/Common/Square/AddMessageReply',SimpleSuccess);
M('/api/Common/Square/DeleteMyMessageReply',SimpleSuccess);
// [POST][广场] 添加新动态
M('/api/Common/Square/AddMessage',SimpleSuccess);

// [GET][广场] 获得广场个人信息
M(/\/api\/Common\/Square\/GetUserInfo\?UserId\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "3317f16500124c3fa524d9726a77c098", "NickName": "俺是张三", "RealName": "张三",
      "HeadPic": "/Mock/Images/Head/jobseeker_1.png",
    }
});

// [GET][广场] 获得广场名片
M(/\/api\/Common\/ResumeCard\/GetCard\?resumeCardId\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "6bb4c6fe803a4f54a438334cc65cf44d", "Type": "FulltimeResume",
      "Resume": SimpleResume
    }
});

var CommomExistUser = { "code": "40502", "msg": "手机号码已被注册，请更换后重新尝试。", "body": {}, "count": 0 };
// [POST] 判断手机是否已注册
M('/api/Common/User/PhoneIsUse',CommomExistUser);

// [POST] 获取短信验证码
M('/api/Common/VerificationCode/SendSMS',CommomExistUser);

// [POST] 注册
M(/\/api\/\w+\/User\/Register/,CommomExistUser);

// [POST] 忘记密码
M('/api/Common/User/PhoneForgotPwd',CommomExistUser);



// [POST] (通用)退出登录
M('/api/Common/User/LoginOff',SimpleSuccess);

// [POST] (企业Company)(求职者JobSeeker)登录
M(/\/api\/\w+\/User\/Login/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "C1F97D5F15CDBC9D0B80D8253D5671C9B710C355C0DC417D338323159CABFB8CE406C25801B1BA58D96219E57E111C3B9C7E4AC70ACC2181465A7AC483DD96DE113DCB5D6A06BC524052807CE62A515F4504307B1397BC279E1F694E5A936F4E6A9871B4378EC495FFE14B246CC1EB03835F85B27F1F0FC65F5852F296465EB21BC3140D6D9728D317C368F2BDB252F000630C2C567A77F55807BD794F8665980F4DFFBC04DAED38ED79506C5DB55A0F3C95AFA8B7E33C80A48ECC2A899431E6AD94DF067A7F374AD2396A680915023D"
});

// [POST] (企业)获取营业执照审核状态
M('/api/Company/Enterprise/GetBusinessLicenseAuthenticationDisposeStatus',{
    "code": "0", "msg": "ok", "count": 0,
    "body": { "Status": 1, "ReplyContent": "" }
});

// [GET] (企业)获取用户信息
M('/api/Company/User/GetCurrentUser',{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "ac830eb985e7480d8470f98a2dcd8721", "Rold": "Enterprise", "RegisterTime": "2016-07-22 16:09:56",
      "NickName": "广东人力资源有限公司", "RealName": "广东人力资源有限公司", "Industry": "其它", "Nature": "跨国公司(集团)",
      "HeadPic": "/Mock/Images/Head/company_1.png", "Phone": "136@integer(0,100000000)", 
      "EnterpriseId": "fbf638f4704f482bbb3eacd20e059687", "EnterpriseName": "广东测试企业有限公司但是",
      "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。",
      "WebsiteUrl": "", "BusRoutes": "", "MapLocation": "116.730262,23.363683",
      "Logo": "/Mock/Images/Head/company_1.png", "LogoLit": "/Mock/Images/Head/company_1.png",
      "Address": "汕头市龙湖区金龙大厦B栋2楼", "PeopleNum": "50-100人", "RegisteredCapital": "100万-200万",
      "ContactManName": "杨先生", "ContactManPhone": "136@integer(0,100000000)",
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
// [GET] (求职者)获取用户信息
M('/api/JobSeeker/User/GetCurrentUser',{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "f9bf5e209c40492dbaa25554b4c9757c", "Rold": "JobSeeker",
      "NickName": "张三", "RealName": "张三", "HeadPic": "/Mock/Images/Head/jobseeker_1.png",
      "Phone": "136@integer(0,100000000)", "RegisterTime": "2017-11-17 11:22:19",
      "MailCount": 4, "MailNotReadCount": 4, "InformCount": 4,
      "Proportion": 0.0, "IsHasResumeBaseInfo": true, "IsHasResume": true,
      "JobCollectsCount": 8, "EnterpriseCollectsCount": 10, "JobApplysCount": 6,
      "CollectJobIds": [], "JobApplyIds": [],
    }
});

// [GET] (企业)是否完善基本资料
M('/api/Company/Enterprise/IsInitBaseInfo',{
    "code": "0", "msg": "ok", "body": true, "count": 0
});

// [GET] (企业)基本资料 - 获取
M('/api/Company/Enterprise/GetEnterpriseBaseInfo', {
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Name": "广东人力资源有限公司",
      "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。",
      "IndustryId": "b9969b4b32464a3086f55e8e79e524ec", "NatureCode": "A13", "WebsiteUrl": "", "BusRoutes": "", "AreaId": "00000000000000000000000000440500",
      "AreaName": "汕头市", "AreaCascadeName": "广东省 汕头市", "EstablishDate": "1970-01-01 08:00:00", "MapLocation": "116.730262,23.363683",
      "Address": "汕头市龙湖区金龙大厦B栋2楼", "PeopleNumCode": "A02", "RegisteredCapitalCode": "A02", "ContactManName": "1sir",
      "ContactManPhone": "136@integer(0,100000000)", "QQ": "405348097", "BusinessLicenseNumber": "224455667780",
      "BusinessLicensePic": "/Mock/Images/Head/company_1.png"
    }
});
// [GET] (企业)基本资料 - 更新
M('/api/Company/Enterprise/UpdateInfo',SimpleSuccess);

// [GET] (求职者)基本资料 - 获取
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
// [GET] (求职者)基本资料 - 更新
M(/\/api\/JobSeeker\/Resume\/UpdateBaseInfo/,SimpleSuccess);

// [GET] (求职者)简历保密设置
M('/api/JobSeeker/Resume/GetSecuritySet',{ "code": "0", "msg": "ok", "count": 0, "body": { "Mode": 0, "ShieldEnterpriseNames": [] } });
// [GET] (求职者)更新 简历保密设置
M('/api/JobSeeker/Resume/UpdateSecuritySet',SimpleSuccess);

// [GET] (求职者)获取默认选中简历（新建第一份简历自动选中简历）
M('/api/JobSeeker/Resume/GetDefaultResume',{
    "code": "0", "msg": "ok", "count": 0,
    "body": SimpleResume
});

// [GET] (通用)获取通知（系统）
M('/api/Common/Inform/GetInformList',{ "code": "0", "msg": "ok", "count": 0, "body|5": [SimpleSystemMessage] });
// [POST] (通用)设置通知已阅
M('/api/Common/Inform/ReadInform',SimpleSuccess);

// [GET] (通用)获取通知（私信）
M('/api/Common/Mail/GetMailGroupUsers',{
  "code": "0", "msg": "ok",
  "body": [
    {
      "Id": "abf038bde11e4af9972f05e0b5432256", "SendUserName": "保密",
      "Content": "你好啊", "AddTime": "2017-11-23 15:53:27",
      "IsRead": false, "ReadTime": "1970-01-01 08:00:00",
      "SendUser": { "Id": "f9bf5e209c40492dbaa25554b4c9757c", "Name": "", "Rold": "JobSeeker", "NickName": "张三", "HeadPic": "/Mock/Images/Head/jobseeker_1.png", "RealName": "张三"},
      "ReceiveUser": { "Id": "ac830eb985e7480d8470f98a2dcd8721", "Name": "", "Rold": "Enterprise", "NickName": "广东测试企业有限公司但是", "HeadPic": "@image(40x40)", "RealName": "@CompanyNames()"}
    }
  ],
  "count": 0
});
// [GET] (通用)获取通知（私信）- 设置已阅
M('/api/Common/Mail/ReadMailContext',SimpleSuccess);

// [GET] (通用)获取通知（私信）- 详情
M(/\/api\/Common\/Mail\/GetMailListByUser\?userId\=\w+/,{
  "code": "0", "msg": "ok",
  "body": [
    {
      "Id": "abf038bde11e4af9972f05e0b5432256", "SendUserName": "保密",
      "Content": "这是我发的", "AddTime": "2017-11-23 15:53:27",
      "IsRead": false, "ReadTime": "1970-01-01 08:00:00",
      "SendUser": {
        "Id": "f9bf5e209c40492dbaa25554b4c9757c", "Name": "", "Rold": "JobSeeker", "NickName": "张三",
        "HeadPic": "/Mock/Images/Head/jobseeker_1.png", "RealName": "张三"
      },
      "ReceiveUser": {
        "Id": "ac830eb985e7480d8470f98a2dcd8721", "Name": "", "Rold": "Enterprise", "NickName": "广东测试企业有限公司但是",
        "HeadPic": "@image(40x40)","RealName": "广东测试企业有限公司但是"
      }
    },
    {
      "Id": "abf038bde11e4af9972f05e0b5432256", "SendUserName": "保密",
      "Content": "这里是公司的回复", "AddTime": "2017-11-23 15:53:27",
      "IsRead": false, "ReadTime": "1970-01-01 08:00:00",
      "ReceiveUser": {
        "Id": "f9bf5e209c40492dbaa25554b4c9757c", "Name": "", "Rold": "JobSeeker", "NickName": "张三",
        "HeadPic": "/Mock/Images/Head/jobseeker_1.png", "RealName": "张三"
      },
      "SendUser": {
        "Id": "4bbd3217007b4bfdab201fa3c43e668f", "Name": "", "Rold": "Enterprise", "NickName": "广东测试企业有限公司但是",
        "HeadPic": "@image(40x40)","RealName": "广东测试企业有限公司但是"
      }
    }
  ],
  "count": 0
});



// [GET] (通用)获取单页文章（用户协议/等等..)
M(/\/api\/Common\/Single\/GetSingle\?code\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "2d9b896923e5481d8e7c1051833c43f3", "Name": "用户协议", "Pic": null, "ReleaseTime": "2015-12-02 20:54:33",
      "Content": "<p>\n\t一、前提声明：<br />\n\t1.1、达工宝网站及程序将按照本协议及不定时发布的补充协议提供达工宝网络招聘服务。达工宝保留更新本协议的权利，在必要时，达工宝可以修改、添加协议内容并以电子邮箱通知到使用者。为获得达工宝服务，服务使用人(以下称为用户，包括求职者等注册者)应当同意本协议的全部条款并按照注册页面提示完成注册。用户在注册过程中确认勾选&ldquo;同意&rdquo;本条款即表示用户完全接受本协议的全部条款。注册后因任何原因拒绝接受协议，应通知达工宝，并停止使用本产品，可不再受本协议约束；如果继续使用达工宝产品，将视为重新同意所有条款。<br />\n\t<br />\n\t1.2、用户注册成功后，其账号和密码由用户负责保管；用户对其账户的操作及所有活动、事件负法律责任。<br />\n\t<br />\n\t<br />\n\t二、版权声明<br />\n\t<br />\n\t2.1、达工宝网站及应用程序的内容和图表信息受《中华人民共和国著作权法》及相关法律法规和中国加入的所有知识产权方面的国际条约的保护。达工宝拥有达工宝网站及应用程序一切权利，包括达工宝对外公开的所有内容的著作权，未经达工宝许可，禁止全部或部分复制、转载或以其他方式使用。<br />\n\t<br />\n\t2.2达工宝网站及应用程序是达工宝创造的用以制成网页的HTML及程序。HTML及程序的版权同样属于达工宝所有。达工宝对其网站及应用程序上的所有标识、图标、图饰、图表、色彩、文字表述及其组合、版面设计、数据库均享有完全的著作权及其衍生的其他全部权利，对发布的信息均享有专有的发布和使用权。未经达工宝许可，网站或程序上任何信息均为禁止复制、使用、转载或其他方式使用。<br />\n\t<br />\n\t2.3达工宝用户发布的任何内容仅代表用户自己的观点和立场，与达工宝无关，由内容作者承担一切法律责任。<br />\n\t<br />\n\t<br />\n\t三、产品使用规则<br />\n\t<br />\n\t3.1使用达工宝网站、应用程序等产品应遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规。<br />\n\t<br />\n\t3.2使用产品时必须向达工宝提供准确的个人资料，如资料变动，必须及时更新。<br />\n\t<br />\n\t3.3用户不允许将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知达工宝。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，达工宝不承担任何责任。<br />\n\t<br />\n\t3.4用户需为在达工宝上传、存储、发表、发送的全部内容负全部责任。所有用户禁止在任何页面上传、存储、发表、发送下列信息，否则达工宝有权自行处理并不通知用户：<br />\n\t(1)违反宪法确定的基本原则的；<br />\n\t(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；<br />\n\t(3)损害国家荣誉和利益的；<br />\n\t(4)煽动民族仇恨、民族歧视，破坏民族团结的；<br />\n\t(5)破坏国家宗教政策，宣扬邪教和封建迷信的；<br />\n\t(6)散布谣言，扰乱社会秩序，破坏社会稳定的；<br />\n\t(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；<br />\n\t(8)侮辱或者诽谤他人，侵害他人合法权益的；<br />\n\t(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；<br />\n\t(10)以非法民间组织名义活动的；<br />\n\t(11)含有法律、行政法规禁止的其他内容的。<br />\n\t<br />\n\t3.5用户在使用达工宝产品同时应做到：<br />\n\t(1)遵守所有与网络服务有关的网络协议、规定和程序；<br />\n\t(2)不得为任何非法目的而使用网络服务系统；<br />\n\t(3)不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；<br />\n\t(4)不得利用达工宝网络服务系统进行未经达工宝授权的广告；<br />\n\t(5)未经达工宝同意，禁止给公布信息的个人或公司发电子邮件、打电话、寄信或进行其他接触的行为。<br />\n\t(6)用户接受以其注册的电子邮件地址接受达工宝发送的邮件或其他邮件资料，若希望&quot;退订&quot;这些邮件资料，可点击电子邮件中的退订链接退订或联系达工宝取消订阅。<br />\n\t(7)用户不得通过任何技术手段，侵入达工宝数据库、网站、应用程序，进行任何达工宝未对外开放的功能操作。不得进行数据采集。不得影响干涉其他用户或网络正常运行。一经发现达工宝有权停止该用户的账户所有功能。破坏系统或网络可能导致犯罪，达工宝将依法采取法律途径追究造成的损失。<br />\n\t<br />\n\t3.6用户违反上述使用规则，达工宝有权禁止其继续使用达工宝产品。<br />\n\t<br />\n\t3.7达工宝有权拒绝与本单位经营同类业务、有业务竞争关系或者其他利害关系的单位及个人提供服务。<br />\n\t<br />\n\t3.8达工宝有权在预先通知或不予通知的情况下终止任何免费服务。<br />\n\t<br />\n\t四、隐私保护<br />\n\t4.1达工宝不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在达工宝的非公开内容，但下列情况除外：<br />\n\t(1)事先获得用户的明确授权；<br />\n\t(2)根据有关的法律法规要求；<br />\n\t(3)按照相关政府主管部门的要求；<br />\n\t(4)为维护社会公众的利益。<br />\n\t<br />\n\t4.2在不透露单个用户隐私资料的前提下，达工宝有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。<br />\n\t<br />\n\t<br />\n\t五、免责条款<br />\n\t<br />\n\t5.1<br />\n\t用户明确同意其使用达工宝产品所存在的风险将完全由其自己承担；因其使用达工宝产品而产生的一切后果也由其自己承担，达工宝对用户不承担任何责任。<br />\n\t<br />\n\t5.2<br />\n\t达工宝不担保能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。同时，不保证能够长期无错误运营，也不保证服务器不受病毒或其他故障的侵扰。如果用户在使用本网站时发生数据丢失的情况，与达工宝无关。<br />\n\t<br />\n\t5.3<br />\n\t达工宝不能保证产品中信息会有一定数量的用户来浏览，也不能保证会有一位特定的用户来浏览。达工宝不保证所有信息、文本、图形、链接及其它项目的绝对准确性和完整性，故仅供用户参考使用。<br />\n\t<br />\n\t5.4<br />\n\t用户必须独自承担由于使用达工宝产品或通过达工宝产品登录到其他站点而形成的全部风险。用户需独立承担与他人交流信息所造成的后果。达工宝不担保用户发送给另一方用户的资料的真实性、精确性与可靠性。用户对所接受的资料的信任纯属个人风险。<br />\n\t<br />\n\t5.5<br />\n\t达工宝仅为招聘网络信息发布平台，任何通过达工宝产品发布的任何信息均系用户自行发布，达工宝对其合法性概不负责，亦不承担任何法律责任；用户在通过达工宝产品得到资讯和信息后，与信息发布人所进行的任何交易均系其双方自主交易，双方若发生纠纷，皆与达工宝无关，达工宝不承担任何法律责任；达工宝对于用户由于使用达工宝产品而造成的任何金钱、商誉、名誉的损失，或任何特殊的、间接的、或结果性的损失都不负任何责任。<br />\n\t<br />\n\t<br />\n\t六、风险说明<br />\n\t<br />\n\t6.1用户使用达工宝产品将承担自行风险。达工宝对产品所提供材料材料不作明显的或暗含的保证。除非适用的法律法规有明确规定，达工宝及其所属网络/产品对销售性的和适合于某一特定目的的一切保证不予承认。 达工宝不能保证材料的特殊目的不受阻挠不出错误，也不能保证错误会得到纠正，也不能保证达工宝产品或制成达工宝产品的材料不含有病毒或其他有害成分。在有关材料的使用或使用结果方面对材料的正确性、准确性、可靠性或其他方面，达工宝不作出保证或任何说明。用户承担一切必要的服务、修理或改正费用。在适用法规不允许暗含保证可免除承担一切费用的范围里，免除上述承担费用不适用于你。<br />\n\t<br />\n\t6.2警告<br />\n\t在使用达工宝产品时违背了这些法规将构成对达工宝权利的侵犯或违反，并可采取法律行动。<br />\n\t&nbsp;</p>"
    }
});

// [GET] (通用)获取地区ID
M(/\/api\/Common\/Data\/GetAreaAbbr\w+/,mockArea);

// [GET] (企业)首页简历列表
M(/\/api\/Common\/Resume\/GetHomeResumeList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,SimpleResumeList);

// [GET] (企业)简历详情
M(/\/api\/Company\/Resume\/GetResumeDetail\?ResumeId\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": SimpleResume
});

// [POST] (企业)邀请面试
M('/api/Company/Resume/Invite',SimpleSuccess);


// [GET] (企业)简历详情 - 扣除次数，开放显示简历联系方式的权限（需要再刷新GetResumeDetail接口才会显示）
M(/\/api\/Company\/Resume\/GetResumeContactWay\?resumeId\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": { "QQ": "405348097", "Phone": "15914385220", "Email": "tsurumure@hotmail.com" }
});

// [POST] (企业)判断简历是否有收藏
M('/api/Company/ResumeBook/IsExist',{ "code": "0", "msg": "ok", "body": false, "count": 0 });

// [POST] (企业)添加/移除 简历收藏
M('/api/Company/ResumeBook/AddResume',SimpleSuccess);
M('/api/Company/ResumeBook/DeleteResume',SimpleSuccess);

// [GET] (通用)获得私信模板
M('/api/Common/Mail/GetTemplates',{
  "code": "0", "msg": "ok", "count": 0,
  "body": [
    "您好，您的简历我们已收到，现给您发出面试邀请。面试时间：-月-日-时-分，面试地点：-",
    "您好，我们对您的简历感兴趣，方便约时间聊聊吗？"
  ]
});

// [POST] (通用)更新私信模板
M('/api/Common/Mail/UpdateTemplates',SimpleSuccess);

// [GET] (通用)获得招聘会列表
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

// [GET] (通用)获得招聘会列表 - 参会人才
M(/\/api\/Common\/CareerFair\/GetJobSeekerList\?careerFairId\=\w+/,{
  "code": "0", "msg": "ok", "body": [], "count": 0
});

// [GET] (通用)获得招聘会列表 - 招聘会详情
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

// [GET] (通用)获得招聘会列表 - 是否有申请过
M(/\/api\/Company\/CareerFair\/IsApply\?CareerFairId\=\w+/,{
  "code": "0", "msg": "ok", "body": false, "count": 0
});

// [GET] (通用)获得兼职频道 - 列表
M('/api/Common/Article/GetPartTimeJob',{
  "code": "0", "msg": "ok",
  "body|5": [
    {
      "Id": "2522e846897f42b98110899c0079a5fe", "Name": "@CompanyNames() 招聘 @JobNames()", "Content": "",
      "Pic": "@image(600x250)", "ReleaseTime": "2017-02-17 14:09:27",
      "IsLink": false, "Url": "", "Describe": ""
    }
  ]
});

// [GET] (通用)企业热点
M('/api/Common/Article/GetEnterpriseHot',{
  "code": "0", "msg": "ok",
  "body|5": [
    {
      "Id": "2522e846897f42b98110899c0079a5f2", "Name": "@JobNames()专场招聘会", "Content": "",
      "Pic": "@image(600x250)", "ReleaseTime": "2017-02-17 14:09:27",
      "IsLink": false, "Url": "", "Describe": ""
    }
  ]
});

// [GET] (通用)获得兼职频道 - 详情
M(/\/api\/Common\/Article\/GetDetail\?artId\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": {
    "Id": "d36d378ba9c2444aaf0655d850657e40", "Name": "@CompanyNames() 招聘 @JobNames()",
    "Content": "<div>招11.13-11.15男兼职多名，两个班次，早班早上8点到下午5点，午休1小时，一小时15元，凌晨班次晚上11点到早上7点，16元一小时，速度来报名，地址金园工业区(拒绝报名做一天的)</div>\r\n<div>\r\n\t联系人 林生 18923988326&nbsp;</div>",
    "Pic": "http://www.zdzp.cn/UpFile/Pic/b7a4d17b-479f-49d3-a66a-d092e7f1e04f.jpg",
    "ReleaseTime": "2017-11-11 14:31:06", "IsLink": false, "Url": "", "Describe": ""
  }
});

// [GET] (通用)学历教育
M('/api/Common/Education/GetEducationSchool',{
  "code": "0", "msg": "ok",
  "body": [
    {
      "Id": "a8e2324035134a4b9e2e476755a64201", "Name": "南开大学", "Subhead": "费用：7830.00分三次缴。",
      "Intro": "",
      "Additions": [
        { "Name": "报名方法", "Content": "全年组织报名，春、秋两季注册；春季注册为3月，秋季注册为9月。<br />   报名须知: 报名者（含申请免试入学）须持本人身份证、毕业证书原件及复印件各2份（A4纸），二寸相片（近期、免冠、正面、彩色、蓝底、同版）各4张及相片数码电子版。<br />    注意事项：<br />    毕业证书、身份证等有效证件信息与报名信息不一致者，须同时提供相关差异合理性的有效证明<br />●地址：汕头市金砂东路104号金龙大厦广东汇才人力资源市场二楼（与华山路交界处）广东汇才远程教育中心。" },
        { "Name": "入学资格审核", "Content": "报读网络教育专科起点本科的学生，必须按照教育部规定的相应学历条件报名入学（含免试入学）。严禁未获得国民教育系列专科毕业证书者取得专科起点本科入学资格。所有报名入学者必须提供真实、有效的证件接受审核与办理注册。若提供的毕业证书无法在中国高等教育学生信息网（www.chsi.com.cn）上得到确认，学生须在规定时间内提供全国高等学校学生信息咨询与就业指导中心或其授权的代理认证机构所出具的合格验证报告，方可具备入学资格。学校及各地学习中心，都不具备必要的资格和条件，辨认学生所提供的证书，是否属于国民教育系列，因此，无法承担由此导致的任何后果。各级教育行政主管部门有权在学生入学、就读甚至“毕业”前后的任何时候，审查学生的一学历证书是否属于国民教育系列。在任何时候，由于一学历毕业证书不属于国民教育系列而产生的任何后果，由学生自行承担完全责任。" },
        { "Name": "招生对象", "Content": "我校网络教育以在职人员的学历教育为主。<br />    专科起点本科须具备国民教育系列的专科或专科以上毕业证书。<br />    高中起点本、专科须具备高中、中专、技校及以上学历的毕业证书。<br />    报读学生不允许具有高等学历教育双重学籍。<br />    春季报读学生，其前置证书取得时间不得晚于当年2月28日。<br />    秋季报读学生，其前置证书取得时间不得晚于当年8月31日。" },
        { "Name": "入学测试", "Content": "语文<br />英语<br />药学、计算机应用技术\t数学(理)<br />英语<br />大学语文<br />大学英语<br />药学、计算机应用技术\t大学英语<br />高等数学" },
        { "Name": "入学方式", "Content": "语文<br />英语<br />药学、计算机应用技术\t数学(理)<br />英语<br />大学语文<br />大学英语<br />药学、计算机应用技术\t大学英语<br />高等数学" }
      ],
      "Courses": [
        {
          "Id": "02848d8c661c4e94a29eb24b36e619c7", "Name": "英语（教育）", "Subhead": "", "Level": "专升本",
          "Content": "<p>\r<br /> 学制：2.5年<br />\r<br /> 入学测试科目：大学语文或高等数学、教育学 &amp; 心理学<br />\r<br /> 学费标准：<br />\r<br /> 报名费：50.00，入学考试：100.00<br />\r<br /> 相片采集费：30.00<br />\r<br /> 第一学期学费：2400.00教材费：600.00<br />\r<br /> 第二学期学费：2400.00<br />\r<br /> 第三学期学费：1840.00<br />\r<br /> 所有费用大约：7420.00，分三次缴。</p>"
        },
        {
          "Id": "0d6fd5457aec449890b1374daf2bee22", "Name": "法律大类", "Subhead": "", "Level": "高起专",
          "Content": "<p>\r<br /> 学制：2.5年<br />\r<br /> 入学测试科目：英语、语文<br />\r<br /> 报名费：50.00，入学考试：100.00<br />\r<br /> 相片采集费：30.00<br />\r<br /> 第一学期学费：2400.0教材费：600.00<br />\r<br /> 第二学期学费：2400.00<br />\r<br /> 第三学期学费：1600.00<br />\r<br /> 所有费用大约：7180.00，分三次缴。</p>"
        },
        {
          "Id": "1ae6fce0a6ca4b3c9342f5311e261ff9", "Name": "体育学类（体育）", "Subhead": "", "Level": "专升本",
          "Content": "<p>\r<br /> 学制：2.5年、<br />\r<br /> 入学测试科目：大学英语、高等数学<br />\r<br /> 报名费：50.00，入学考试：100.00<br />\r<br /> 相片采集费：30.00<br />\r<br /> 第一学期学费：2400.00教材费：600.00<br />\r<br /> 第二学期学费：2400.00<br />\r<br /> 第三学期学费：1840.00<br />\r<br /> 所有费用大约：7420.00，分三次缴。<br />\r<br /> &nbsp;</p>\r<br /><p>\r<br /> &nbsp;</p>"
        },
        {
          "Id": "59806689bed04d5199e19aab9c83e87d", "Name": "经济管理、 行政管理、 旅游管理、 销售管理等", "Subhead": "", "Level": "高起专",
          "Content": "<div><br />\t全部专业：</div><br /><div><br />\t经济管理、 行政管理、 旅游管理、 销售管理、财务管理、 工程管理、 物业管理、 餐饮管理、 市场营销、法律事务、工商企业管理、 &nbsp;人力资源管理、 物流管理(专)、 保险实务、 金融管理与实务、电子商务(专)、 计算机应用技术、汉语言文学、国际经济与贸易、旅游管理(国际酒店方向 专)、药学、文秘、会计</div><br /><div><br />\t&nbsp;</div><br /><div><br />\t报名费：免 &nbsp; &nbsp; 入学考试：免</div><br /><div><br />\t相片采集费：30.00</div><br /><div><br />\t第一学期学费：2700.00</div><br /><div><br />\t教材费：600.00</div><br /><div><br />\t第二学期学费：2700.00</div><br /><div><br />\t第三学期学费：1800.00</div><br /><div><br />\t第四学期学费：免</div><br /><div><br />\t高起专、专升本 &nbsp;费用：7830.00分三次缴。</div><br /><div><br />\t&nbsp;</div>"
        }
      ]
    },
    {
      "Id": "a8e2324035134a4b9e2e476755a64202", "Name": "电子科技大学", "Subhead": "高起专：学制2.5年、学费8150元、分三次交、专升本:学制2.5年、学费8150元、分三次交",
      "Intro": "",
      "Additions": [
        { "Name": "报名方法", "Content": "全年组织报名，春、秋两季注册；春季注册为3月，秋季注册为9月。<br />   报名须知: 报名者（含申请免试入学）须持本人身份证、毕业证书原件及复印件各2份（A4纸），二寸相片（近期、免冠、正面、彩色、蓝底、同版）各4张及相片数码电子版。<br />    注意事项：<br />    毕业证书、身份证等有效证件信息与报名信息不一致者，须同时提供相关差异合理性的有效证明<br />●地址：汕头市金砂东路104号金龙大厦广东汇才人力资源市场二楼（与华山路交界处）广东汇才远程教育中心。" },
        { "Name": "入学资格审核", "Content": "报读网络教育专科起点本科的学生，必须按照教育部规定的相应学历条件报名入学（含免试入学）。严禁未获得国民教育系列专科毕业证书者取得专科起点本科入学资格。所有报名入学者必须提供真实、有效的证件接受审核与办理注册。若提供的毕业证书无法在中国高等教育学生信息网（www.chsi.com.cn）上得到确认，学生须在规定时间内提供全国高等学校学生信息咨询与就业指导中心或其授权的代理认证机构所出具的合格验证报告，方可具备入学资格。学校及各地学习中心，都不具备必要的资格和条件，辨认学生所提供的证书，是否属于国民教育系列，因此，无法承担由此导致的任何后果。各级教育行政主管部门有权在学生入学、就读甚至“毕业”前后的任何时候，审查学生的一学历证书是否属于国民教育系列。在任何时候，由于一学历毕业证书不属于国民教育系列而产生的任何后果，由学生自行承担完全责任。" },
        { "Name": "招生对象", "Content": "我校网络教育以在职人员的学历教育为主。<br />    专科起点本科须具备国民教育系列的专科或专科以上毕业证书。<br />    高中起点本、专科须具备高中、中专、技校及以上学历的毕业证书。<br />    报读学生不允许具有高等学历教育双重学籍。<br />    春季报读学生，其前置证书取得时间不得晚于当年2月28日。<br />    秋季报读学生，其前置证书取得时间不得晚于当年8月31日。" },
        { "Name": "入学测试", "Content": "语文<br />英语<br />药学、计算机应用技术\t数学(理)<br />英语<br />大学语文<br />大学英语<br />药学、计算机应用技术\t大学英语<br />高等数学" },
        { "Name": "入学方式", "Content": "语文<br />英语<br />药学、计算机应用技术\t数学(理)<br />英语<br />大学语文<br />大学英语<br />药学、计算机应用技术\t大学英语<br />高等数学" }
      ],
      "Courses": [
        {
          "Id": "59806689bed04d5199e19aab9c83e87d", "Name": "经济管理、 行政管理、 旅游管理、 销售管理等", "Subhead": "", "Level": "高起专",
          "Content": "<div><br />\t全部专业：</div><br /><div><br />\t经济管理、 行政管理、 旅游管理、 销售管理、财务管理、 工程管理、 物业管理、 餐饮管理、 市场营销、法律事务、工商企业管理、 &nbsp;人力资源管理、 物流管理(专)、 保险实务、 金融管理与实务、电子商务(专)、 计算机应用技术、汉语言文学、国际经济与贸易、旅游管理(国际酒店方向 专)、药学、文秘、会计</div><br /><div><br />\t&nbsp;</div><br /><div><br />\t报名费：免 &nbsp; &nbsp; 入学考试：免</div><br /><div><br />\t相片采集费：30.00</div><br /><div><br />\t第一学期学费：2700.00</div><br /><div><br />\t教材费：600.00</div><br /><div><br />\t第二学期学费：2700.00</div><br /><div><br />\t第三学期学费：1800.00</div><br /><div><br />\t第四学期学费：免</div><br /><div><br />\t高起专、专升本 &nbsp;费用：7830.00分三次缴。</div><br /><div><br />\t&nbsp;</div>"
        }
      ]
    }
  ]
});

// [POST] (通用)学历教育 - 我要报名
M('/api/Common/Education/CourseApply',SimpleSuccess);

// [GET] (通用)技能培训
M('/api/Common/Article/GetTrain',{
  "code": "0", "msg": "ok",
  "body": [
    {
      "Id": "2007949209cc467190aec60534c70ec1", "Name": "汕头市会计人员远程继续教育培训招生简介",
      "Content": "<p>\r\n\t经汕头市财政局授权，汕头市联博教育培训中心获得受理2014年及以前年度汕头市会计人员继续教育远程培训（会计年审）。该远程教育依托会计网（www.zfyacc.com）开展，会计网同时向汕头市直及各区县（金平、龙湖、潮阳、潮南）开通，欢迎广大学员选择网上学习。会计网24小时开放，方便学员自主安排时间参与学习和考核，真正让会计人员享受到足不出户、轻松便捷地继续教育学习。</p>\r\n<p>\r\n\t经汕头市物价局批准，远程继续教育培训费为每期70元。</p>\r\n<br />\r\n<p>\r\n\t▲ 联博教育培训中心地址：汕头市高新区科技中路11号经发大厦6楼601单元</p>\r\n<p>\r\n\t▲ 会计年审操作流程</p>\r\n<p>\r\n\t访问会计网 www.zfyacc.com &rarr; 注册 &rarr; 登陆 &rarr; 充值中心为账号充值 &rarr; 购买课程 &rarr; 在线学习 &rarr; 在线考试 &rarr; 成绩查询 &rarr; 考试通过 &rarr; 财政局备案、完成年审</p>\r\n<p>\r\n\t▲ 我们提供如下购买方式：</p>\r\n<p>\r\n\t1、到联博教育培训中心进行现场购买，同时购买者需提供会计从业资格证和身份证复印件；</p>\r\n<p>\r\n\t2、如果不方便到现场购买，请详情咨询客服人员</p>\r\n<p>\r\n\t▲ 购卡服务热线：0754-81880088，189 9896 8881</p>\r\n<p>\r\n\tQQ咨询：2533877118</p>\r\n<br />\r\n<p>\r\n\t继续教育情况查询：</p>\r\n<p>\r\n\t请您登陆：广东省会计信息服务平台（http://210.76.65.189:8080/gdkjcms/）&rarr; 查询服务 &rarr; 从业诚信档案查询 &rarr; 输入证件号（身份证） &rarr; 证书编号</p>",
      "Pic": "", "ReleaseTime": "2016-11-26 17:30:21", "IsLink": false, "Url": "", "Describe": ""
    }
  ]
});



// [GET] (通用)搜索热门关键词 职位名/公司名
M('/api/Common/Common/GetJobSearchKeyword',{
  "code": "0", "msg": "ok", "count": 0, "body": [ "普工", "技术工", "车间", "行政", "送货" ]
});
M('/api/Common/Common/GetCompanySearchKeyword',{
  "code": "0", "msg": "ok", "count": 0,
  "body": ["广东汇才", "百度外卖", "龙光", "喜来登", "碧桂园", "邦宝", "丹喜", "南粤人力", "诗尼曼", "迅客", "华莱士", "奥飞", "华润"]
});

// [GET] 搜索职位
//\?pageIndex\=\w+\&mode\=\w+\&keyword\=\%\w+AreaIds\=\w+\&type\=\&welfares\=\&pay\=\&nature\=
M(/\/api\/Common\/Job\/GetJobList[\w\W]*/,SimpleJobList);

// [GET] (首页)获得名企招聘 职位
M(/\/api\/Common\/Job\/GetWellKnownJobList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,SimpleJobList);
// [GET] (首页)获得近期招聘 职位
M(/\/api\/Common\/Job\/GetNewJobList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,SimpleJobList);
// [GET] (首页)获得企业福利 职位
M(/\/api\/Common\/Job\/GetWelfareJobList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,SimpleJobList);
// [GET] (首页)获得行业分类 职位
M(/\/api\/Common\/Job\/GetIndustryJobList\?IndustryId\=\w+\&AreaIds\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,SimpleJobList);

// [GET] 职位类型
M(/\/api\/Common\/Data\/GetJobType[\w\W]*/,mockJobType);

// [GET] 行业分类
M('/api/Common/Data/GetIndustry',{
  "code": "0", "msg": "ok", "count": 0,
  "body": [
    {"Id": "3298c648f20540fa908da8ad6874c689", "Name": "综合性工商/实业公司", "Parent": ""}, {"Id": "350b15c865d547dea4c16441bf12083c", "Name": "电子技术/通讯/半导体/集成电路", "Parent": ""},
    {"Id": "0a67d48d045a41d7b4a57b5ab1080cf3", "Name": "快速消费品（食品/粮油/烟草/日用品/化妆品)", "Parent": ""}, {"Id": "53eead2184ae4a7aa862ac534cd66831", "Name": "公关/市场/营销/广告/会展", "Parent": ""},
    {"Id": "21073b2eab6b4b8886a6de04ae8e6888", "Name": "机械五金模具", "Parent": ""}, {"Id": "c9fd1c92fcec467caacca5a58e5e71f1", "Name": "包装印刷文具", "Parent": ""},
    {"Id": "53f2cbe3ef254976baee5be0db9b504f", "Name": "塑胶玩具工艺", "Parent": ""}, {"Id": "26007b11279047fe8fda0ec7b06426c0", "Name": "服装纺织鞋帽", "Parent": ""},
    {"Id": "faca8b87bdf2488296cc63ba2633d960", "Name": "IT网络电子商务", "Parent": ""}, {"Id": "e02a5fe6e8494842977c8d05278ba5fc", "Name": "电子电器音像", "Parent": ""},
    {"Id": "e0d93ca6b550475ab07626ccaba25bf1", "Name": "食品医药医疗", "Parent": ""}, {"Id": "7e9e84399a9547d3be18d0ffa215c7d9", "Name": "化工能源化妆品", "Parent": ""},
    {"Id": "3f6fa9736bfb4425bf5233f879ba01c1", "Name": "房产建材装饰", "Parent": ""}, {"Id": "69a3a0edb49d4e19b8b30b4391fc8906", "Name": "商贸广告教育", "Parent": ""},
    {"Id": "1c9d4b699d4948758cd8f5253fab0ded", "Name": "餐娱商铺服务业", "Parent": ""}, {"Id": "ef0e81923be44dfd89ea56788182521d", "Name": "金融保险证券", "Parent": ""},
    {"Id": "ddd01fbdca904eccaec80681dda217b4", "Name": "汽车物流快递", "Parent": ""}, {"Id": "9b3aafbb51cf4caba1657cfa931ac71e", "Name": "民生供应公共管理", "Parent": ""},
    {"Id": "b9969b4b32464a3086f55e8e79e524ec", "Name": "其它行业", "Parent": ""}
  ]
});

// [GET] 职场资讯 - 分类
M('/api/Common/Article/GetTypeListOfWorkplaceInformation',{
  "code": "0", "msg": "ok", "count": 0,
  "body": [
    { "Id": "15060a3a01574de6a4a18d51826efc2e", "Name": "劳动法苑", "Pic": "@image(50x50)"}, { "Id": "1c3ca1f4d6f444e78ed84bb52c4f1cef", "Name": "职场观察", "Pic": "@image(50x50)"},
    { "Id": "6535847b47cf41cab8f1218b0c5aad93", "Name": "简历指南", "Pic": "@image(50x50)"}, { "Id": "7f2a0f957d084059b7d1b23cf67a1fd3", "Name": "职业指导", "Pic": "@image(50x50)"},
    { "Id": "a8f1c9b758774ee58ee879b6312ae1bc", "Name": "面试宝典", "Pic": "@image(50x50)"}, { "Id": "efc2bb97aede4a6595eb96a47e87ae32", "Name": "职场八卦", "Pic": "@image(50x50)"}
  ]
});


// [GET] 资讯列表
M(/\/api\/Common\/Article\/Search\?typeId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,{
  "code": "0", "msg": "ok",
  "body|10": [
    {
      "Id": "977f06f3a854422bae81b1277573034e", "Name": "职工休病假期间 单位“开除”是否合法?",
      "Content": "<div>\r\n\t近日，&ldquo;兰州交通大学博文学院英语老师刘伶利因患癌症被学校开除，法院判决开除无效，学校未履行&rdquo;一事，引发社会广泛关注。8月22日，兰州交通大学博文学院下发文件，通知执行法院判决，撤销开除刘伶利的决定&hellip;&hellip;</div>\r\n<div>\r\n\t其实，刘伶利的遭遇并非个例，实践中，员工生了大病，有些用人单位为了维护自身利益，常会以旷工、考核不合格为由，将员工开除或与员工协商解除劳动合同；不少员工因不了解法律规定，认为自己长时间因病无法上班确实影响工作，单位与其解除劳动合同也是可以理解的，忽视了自身权益的维护。</div>\r\n<div>\r\n\t法定&ldquo;病假&rdquo; 单位无权&ldquo;开人&rdquo;</div>\r\n<div>\r\n\t我国《劳动合同法》第四十二条规定，劳动者患病或者非因工负伤，在规定医疗期内的，用人单位不得解除劳动合同。也就是说，员工生病，在医疗期内，员工本人无过错的，用人单位是没有权利与其解除劳动合同的。此时，用人单位如果与员工解除劳动合同，员工可以要求恢复劳动关系、支付工资、补缴社保；也可以要求用人单位支付违法解除劳动合同经济赔偿金，但二者只能选其一。</div>\r\n<div>\r\n\t经济赔偿金的标准是经济补偿金的二倍，经济补偿按照劳动者在本单位工作的年限，每满一年按支付一个月工资的标准向劳动者支付。六个月以上不满一年的，按一年计算；不满六个月的，向劳动者支付半个月工资的经济补偿。</div>\r\n<div>\r\n\t月工资是指劳动者在劳动关系解除或者终止前十二月的平均工资（月工资高于用人单位所在直辖市、设区的市级人民政府公布的本地区上年度职工月平均工资三倍的，按照三倍计算）。刘伶利因病未到单位上班，其本身并无过错，单位以旷工为由开除刘伶利，违反法律规定，故法院判决撤销兰州交通大学的开除决定。同时，因兰州交通大学与刘伶利解除劳动合同系违法解除（实体违法，并非程序违法），兰州交通大学还需支付刘伶利正常工资。</div>\r\n<div>\r\n\t单位&ldquo;辞退&rdquo; 有病员工须补偿</div>\r\n<div>\r\n\t我国《劳动合同法》第四十条规定，&ldquo;劳动者患病或者非因工负伤，在规定的医疗期满后不能从事原工作，也不能从事由用人单位另行安排的工作的&rdquo;，用人单位提前三十日以书面通知形式通知劳动者本人或者额外支付劳动者一个月工资后，可以解除劳动合同。</div>\r\n<div>\r\n\t也就是说，员工大病，在法定医疗期之后，如果不能从事原工作，也不能从事由用人单位另行安排的工作，此时，用人单位可以与员工解除劳动合同，但是用人单位需要提前三十日通知员工，或者额外支付员工一个月工资。此种情况下，用人单位与员工解除劳动合同的，还需要向员工支付解除劳动合同经济补偿金。</div>\r\n<div>\r\n\t两年不痊愈可适当延长医疗期</div>\r\n<div>\r\n\t根据《企业职工患病或非因工负伤医疗期规定》及《劳动部关于贯彻＜企业职工患病或非因工负伤医疗期规定＞的通知》的相关规定，企业职工因患病或非工负伤，需要停止工作医疗时，根据本人实际参加工作年限和本单位工作年限，给予三个月到二十四个月的医疗期，对某些特殊疾病（如癌症、精神病、瘫痪等）的职工，在24个月内尚不能痊愈的，经企业和劳动主管部门批准，可以适当延长医疗期。刘伶利2014年7月被确诊为卵巢癌，2016年8月14日去世。按照相关规定，这段期间均属法定的医疗期。</div>\r\n<div>\r\n\t用人单位在处理与员工的关系时，应按照法律规定执行。若单位只顾自身利益，违法处理与员工的关系，不仅会寒了员工的心，还要承担相应法律责任。</div>\r\n<div>\r\n\t<span style=\"color: rgb(90, 90, 90); font-family: &quot;Microsoft YaHei&quot;, Arial, Helvetica; font-size: 14px; text-align: justify;\">文章编辑：</span><a href=\"http://www.zdzp.cn/\" style=\"outline: 0px; text-decoration-line: none; font-family: &quot;Microsoft YaHei&quot;, Arial, Helvetica; font-size: 14px; text-align: justify;\">职得招聘&mdash;汕头招聘网</a></div>",
      "Pic": "http://www.zdzp.cn/UpFile/Pic/69328d28-e520-4a77-a4b1-3a304e8e3dbf.jpg",
      "ReleaseTime": "2017-10-16 15:39:08", "IsLink": false, "Url": "", "Describe": ""
    },
    {
      "Id": "dc32b6fcbfa24d818f0835f9f1e5301b", "Name": "企业与销售人员签订合同时的注意事项有哪些?",
      "Content": "<div>\r\n\t因为某些工作的原因，企业应当有销售人员之间需要签订一些合同。那么在签订合同的过程中，需要注意哪些注意事项呢？下面小编就跟大家一同通过一个简单的案例来分析一下：</div>\r\n<div>\r\n\t实践中，有些企业会与销售人员采取委托代理的方式，约定较高的提成比例，来提高产品销售额及市场占有率。但很多企业却分不清楚委托代理与劳动合同的关系，起草的委托代理合同却约定了劳动关系下管理条款，管理上也没有区分委托代理人员与企业员工的不同，一旦产生纠纷，很容易被司法机构认定为&ldquo;假合作，真劳动&rdquo;，从而承担企业本不应该承担的风险。</div>\r\n<div>\r\n\t一、案情介绍</div>\r\n<div>\r\n\t何培松于2014年1月1日入职山东和信机械有限公司，负责公司销售工作。当时公司承诺的条件是：月工资8000元，另有销售提成。原被告未签订劳动合同。何培松以工作过程中因不能及时发放工资、提供销售费用、供货、核算销售费用等原因，使销售工作无法正常开展为由，于2015年10月20日提起仲裁，请求判令：1、依法撤销新泰市劳动争议仲裁委员会新劳人仲案字（2015）第228号裁决书，依法判决被告双倍支付原告2014年1月至2015年2月工资72000元、逾期经济补偿金12000元；2、诉讼费由被告负担。</div>\r\n<div>\r\n\t山东和信机械有限公司提交以下证据：记账凭证、银行电子回单、考勤表、中国建设银行单位客户专用回单，证明被告分两次支付代理费用40000元，证明双方为销售代理关系，而不是劳动关系。</div>\r\n<div>\r\n\t二、本案焦点</div>\r\n<div>\r\n\t双方是劳动关系还是委托代理关系？</div>\r\n<div>\r\n\t三、裁审结果</div>\r\n<div>\r\n\t仲裁、法院均认为不是劳动关系，驳回了何培松全部请求。</div>\r\n<div>\r\n\t【何培松与山东和信机械有限公司劳动争议案，（2015）新民初字第5103号】</div>\r\n<div>\r\n\t四、律师观点</div>\r\n<div>\r\n\t1.委托代理关系与劳动关系？</div>\r\n<div>\r\n\t根据《劳动和社会保障部关于确立劳动关系有关事项的通知》（2005年5月25日 劳社部发[2005]12号），用人单位招用劳动者未订立书面劳动合同，但同时具备下列情形的，劳动关系成立。</div>\r\n<div>\r\n\t（一）用人单位和劳动者符合法律、法规规定的主体资格；</div>\r\n<div>\r\n\t（二）用人单位依法制定的各项劳动规章制度适用于劳动者，劳动者受用人单位的劳动管理，从事用人单位安排的有报酬的劳动；</div>\r\n<div>\r\n\t（三）劳动者提供的劳动是用人单位业务的组成部分。</div>\r\n<div>\r\n\t根据《民法通则》第63条，代理人在代理权限内，以被代理人的名义实施民事法律行为，被代理人对代理人的代理行为，承担民事责任。</div>\r\n<div>\r\n\t具体到本案中，从原告何培松提交的证据看，原告负责销售被告的产品，但对于原告是否接受被告单位的管理、控制、支配、是否与被告存在人身隶属关系、是否固定领取劳动报酬、是否遵守被告处的内部规章制度和劳动纪律等方面均未能提交证据证明。而被告山东和信机械有限公司提交的证据，可以看出被告是通过银行统一对其员工发放工资，而对原告则是单独汇款，且提交的员工考勤表中并不包含原告。</div>\r\n<div>\r\n\t2.委托代理关系与劳动关系的异同</div>\r\n<div>\r\n\t从广义角度讲，委托代理关系下的代理行为与劳动关系下的付出劳动，都属于一种&ldquo;劳动&rdquo;，只是其法律性质不同。而委托代理关系下，代理人完成代理事项获得的佣金与劳动关系下劳动者获得的劳动报酬，本质上并无区别。因此，委托代理关系与劳动关系在现实生活中，确实有很多相似的地方。</div>\r\n<div>\r\n\t二者的区别：</div>\r\n<div>\r\n\t首先，主体方面，劳动关系下，接受劳动或支付报酬的只能是单位，而委托代理关系下，委托人既可以是单位也可以是个人；</div>\r\n<div>\r\n\t其次，代理人与劳动者的从属性不同，劳动关系下，劳动者应服从单位的管理，而委托代理关系下，代理人与委托人之间是平等的，双方不互有管理与被管理关系；</div>\r\n<div>\r\n\t再次，法律后果不同，劳动关系下，单位需要为劳动者缴纳社保、承担工伤、支付工资、支付经济补偿金等，而委托代理关系下，委托人只需支付佣金及违约金等。</div>\r\n<div>\r\n\t3.与销售人员签订合同时应注意的事项</div>\r\n<div>\r\n\t首先，企业与销售人员签订合同时，应当明确是以一种合作关系如委托代理方式还是通过雇佣员工方式进行产品销售，从而选择签订委托代理合同还是劳动合同。</div>\r\n<div>\r\n\t其次，签订委托代理合同，要注意尽量使用规范法律术语。不能将适用于本企业员工的规章制度如基本工资、考勤、尽职晋级、奖励处罚等涉及管理属性的约定规定在委托代理合同中。</div>\r\n<div>\r\n\t此外，从管理上，对委托代理人的管理应当另行制定相应的管理制度，完全区别于企业员工适用的规章制度。</div>\r\n<div>\r\n\t最后，操作上，委托代理人佣金的支付不要与企业员工工资混在一起按月发放、财务上也应当避免将委托代理人的佣金与企业员工的工资混在一起记账等。</div>",
      "Pic": "http://www.zdzp.cn/UpFile/Pic/29b2517b-c472-4009-93e0-578999fd5e94.jpg",
      "ReleaseTime": "2017-09-28 16:05:07", "IsLink": false, "Url": "",
      "Describe": "因为某些工作的原因，企业应当有销售人员之间需要签订一些合同。那么在签订合同的过程中，需要注意哪些注意事项呢？下面小编就跟大家一同通过一个简单的案例来分析一下：\r\n实践中，有些企业会与销售人员采取委托代理的方式，约定较高的提成比例，来提高产品销售额及市场占有率。但很多企业却分不清楚委托代理与劳动合同的关系，起草的委托代理合同却约定了劳动关系下管理条款，管理上也没有区分委托代理人员与企业员工的不同，一旦产生纠纷，很容易被司法机构认定为“假合作，真劳动”，从而承担企业本不应该承担的风险。"
    }
  ]
});

// [GET] 获得广场名片（个人）
M(/\/api\/JobSeeker\/ResumeCard\/GetResumeCard\?type\=\w+/,{
  "code": "0", "msg": "ok", "count": 0,
  "body": {
    "Id": "cea360344e044ab7ac2ecd1692828967",
    "Type": "FulltimeResume",
    "Resume": SimpleResume
  }
});
// [POST] 推送名片到广场
M('/api/JobSeeker/ResumeCard/ResumeCardPushToSquareMessage',SimpleSuccess);

// [GET] (求职者)个人中心 - 收藏职位 - 列表
M('/api/JobSeeker/Job/GetCollectJobList',SimpleJobList);

// [GET] (求职者)个人中心 - 收藏企业 - 列表
M('/api/JobSeeker/Enterprise/GetCollectEnterpriseList',{
  "code": "0", "msg": "ok",
  "body|10": [
    { "EnterpriseCollectId": "c5a08338db4540369e92862ba7032f86", "CollectTime": "2017-11-18 14:06:38", "EnterpriseId": "0aebe0caa39c4658b21189ed10f95899", "EnterpriseName": "@CompanyNames()"}
  ]
});
// [GET] (求职者)个人中心 - 取消收藏企业
M('/api/JobSeeker/Enterprise/CollectEnterprise',SimpleSuccess);

// [GET] (求职者)个人中心 - 我的简历 - 获取简历列表
M('/api/JobSeeker/Resume/GetResumeList',{
  "code": "0", "msg": "ok", "count": 0,
  "body": [
    {
      "Id": "9decdf8f08294dca9c6a7375951ff6bd", "Title": "未完成简历", "Realname": "张三",
      "GenderCode": "A01", "NationCode": "A02", "MaritalStatusCode": "A01", "Stature": 177,
      "Address": "中国村1号", "ComputerLevelCode": "A05", "EnglishLevelCode": "A03",
      "NativePlaceAreaId": "00000000000000000000000000440500", "NativePlaceAreaName": "汕头市",
      "NativePlaceAreaCascadeName": "广东省 汕头市", "GraduateSchool": "地球学院", "MajorIn": "地球学",
      "HeadImage": "@image(80x80)", "Idcard": "440500000000000", "Gender": "A01", "Nation": "A02",
      "QQ": "111111", "Birthday": "2002-07-17 00:00:00", "LiveAreaId": "00000000000000000000000000440511",
      "LiveAreaName": "金平区", "LiveAreaCascadeName": "广东省 汕头市 金平区", "IntentionAreaIds": "00000000000000000000000000440500,00000000000000000000000000445100",
      "IntentionAreaNames": "汕头市,潮州市", "IntentionJobTypeId": "00000000000000000000000000000002", "IntentionJobType": "客户销售代表",
      "IntentionJobTypeIds": "00000000000000000000000000000002", "IntentionJobTypeNames": "客户销售代表",
      "WorkStatusCode": "A01", "WorkingAgeCode": "A07", "IntentionPayCode": "A01", "EducationCode": "A05",
      "WorkExperience": "[]", "EduExperience": "[]", "PersonalProfile": "无", "Proportion": 0.5, "Certificate": "",
      "Skill": "", "IsDefault": false, "Integral": 0, "Phone": "13333333333", "Email": "11111@qq.com",
      "UserId": "e280a73a633f4240b9345953a3c74c7c", "ReleaseTime": "2017-11-23 14:06:25", "Labels": "A02,A01"
    }, SimpleResume
  ]
});

// [GET] (求职者)个人中心 - 我的简历 - 获取默认简历
M('/api/JobSeeker/Resume/GetDefaultResume',{ "code": "0", "msg": "ok", "count": 0, "body":SimpleResume });

// [GET] (求职者)个人中心 - 我的简历 - 获取简历详情
M(/\/api\/JobSeeker\/Resume\/GetResume\?resumeId\=\w+/,{ "code": "0", "msg": "ok", "count": 0, "body":SimpleResume });

// [POST] (求职者)个人中心 - 我的简历 - 设置默认简历
M('/api/JobSeeker/Resume/SetDefaultResume',SimpleSuccess);
// [POST] (求职者)个人中心 - 我的简历 - 增
M('/api/JobSeeker/Resume/AddResume',SimpleSuccess);
// [POST] (求职者)个人中心 - 我的简历 - 删
M('/api/JobSeeker/Resume/DeleteResume',SimpleSuccess);
// [POST] (求职者)个人中心 - 我的简历 - 改
M('/api/JobSeeker/Resume/UpdateResume',SimpleSuccess);

// [POST] 上传图片Base64
M('/api/Common/UploadFile/UploadImgBase64',SimpleSuccess);
// [POST] (求职者)修改头像
M('/api/JobSeeker/JobSeeker/ChangeHeadPic',SimpleSuccess);

// [GET] (求职者)个人中心 - 申请记录
M('/api/JobSeeker/Job/GetApplyJobRecord',{
  "code": "0", "msg": "ok",
  "body|10": [
    {
      "Id": "9babf5f47860476795fe862f9802649e", "ApplyTime": "2017-07-04 20:06:37",
      "IsDispose": "@boolean()", "DisposeTime": "1970-01-01 08:00:00", "IsPass": false,
      "DisposeContent": "", "Job": SimpleJob, "Resume":SimpleResume,
      "JobseekerName": "张三", "ResumeIntegral": -7, "IsResumeSelectAuth": true,
      "JobApplyDisposeStatus": 0, "IsRead": false
    }
  ]
});

// [GET] 判断是否申请过职位
M(/\/api\/JobSeeker\/Job\/IsApplyJob\?jobId\=\w+/,{ "code": "0", "msg": "ok", "body": false, "count": 0 });
// [GET] 判断是否收藏过职位
M(/\/api\/JobSeeker\/Job\/IsCollectJob\?jobId\=\w+/,{ "code": "0", "msg": "ok", "body": "@boolean()", "count": 0 });

// [POST] (求职者)申请职位
M('/api/JobSeeker/Job/ApplyJob',SimpleSuccess);
// [POST] (求职者)收藏职位
M('/api/JobSeeker/Job/CollectJob',SimpleSuccess);
// [POST] 发送私信
M('/api/Common/Mail/SendMail',SimpleSuccess);
// [POST] 绑定手机/邮箱
M('/api/Common/User/BindingPhone',SimpleSuccess);
M('/api/Common/User/BindingEmail',SimpleSuccess);
// [POST] 修改密码
M('/api/Common/User/ChangePwd',SimpleSuccess);
// [POST] 留言反馈
M('/api/Common/Feedback/Add',SimpleSuccess);

// [GET] 判断是否有参加专题活动（顶部提示）
M(/\/api\/Common\/Job\/GetJobSubhead\?jobId\=/,{
  "code": "0", "msg": "成功", "count": 0, "body":""
  // "body": "<a href=\"javascript:;\">此岗位参加了《送来‘薪’工作专场活动》</a>"
});

// /api/Company/Resume/SearchPublicResume?Key=%E6%99%AE%E5%B7%A5&IntentionJobTypes=&IntentionAreas=&Pays=&Gender=&LastLoginDay=&PageIndex=0&PageSize=10
// [GET] (企业)搜索简历
M(/\/api\/Company\/Resume\/SearchPublicResume[\w\W]*/,SimpleResumeList);

// [GET] (企业)个人中心 - 收到简历 - 新
M('/api/Company/JobApply/GetNotReadSimpleJobApplyList',{
  "code": "0", "msg": "ok",
  "body|5": [
    {
      "Id": "ba25e27af95b450cb88b61e60219beb7", "ApplyTime": "2017-10-11 15:29:37",
      "IsDispose": false, "DisposeTime": "1970-01-01 08:00:00", "IsPass": false,
      "DisposeContent": "", "Job": SimpleJob, "Resume": SimpleResume, "JobseekerName": "郑文豪",
      "ResumeIntegral": 2, "IsResumeSelectAuth": true, "JobApplyDisposeStatus": 0, "IsRead": false
    }
  ]
});

// [GET] (企业)个人中心 - 收到简历 - 已读简历
M(/\/api\/Company\/JobApply\/GetSimpleJobApplyList\?PageIndex\=\w+\&PageSize\=\w+/,{
  "code": "0", "msg": "ok",
  "body|5": [
    {
      "Id": "ba25e27af95b450cb88b61e60219beb7", "ApplyTime": "2017-10-11 15:29:37",
      "IsDispose": true, "DisposeTime": "1970-01-01 08:00:00", "IsPass": true,
      "DisposeContent": "", "Job": SimpleJob, "Resume": SimpleResume, "JobseekerName": "郑文豪",
      "ResumeIntegral": 2, "IsResumeSelectAuth": true, "JobApplyDisposeStatus": 0, "IsRead": true
    }
  ]
});

// [GET] (企业)个人中心 - 收到简历 - 满意/不满意
M('/api/Company/JobApply/Pass',SimpleSuccess);
M('/api/Company/JobApply/Reject',SimpleSuccess);

// [GET] (企业)个人中心 - 收到简历 - 添加已阅
M('/api/Company/JobApply/ReadJobApply',SimpleSuccess);

// [GET] (企业)个人中心 - 简历库（收藏的简历）
M('/api/Company/ResumeBook/GetResumeList',{
  "code": "0", "msg": "ok",
  "body|15": [
    {
      "Id": "0c5fff63bb3d4dc292d3b3ecc5dbce4b", "Resume": SimpleResume, "AddTime": "2017-09-06 10:17:07", "Remark": "",
      "User": {
        "Id": "0ae601616b7d4a90b6d6d087aa6af228", "Rold": "JobSeeker", "NickName": "@cname()", "HeadPic": "@image(40x40)",
        "Phone": "136@integer(0,100000000)", "RegisterTime": "2016-03-15 16:47:14", "Proportion": 0.0, "IsHasResume": true, "RealName": "@cname()"
      }
    }
  ]
});

// [GET] (企业)个人中心 - 企业图集 - 列表
M('/api/Company/Enterprise/GetImage',{ "code": "0", "msg": "ok", "count": 0, "body|5": [ "@image(200x200)" ] });
// [GET] (企业)个人中心 - 企业图集 - 更新
M('/api/Company/Enterprise/ChangeImage',SimpleSuccess);

// [GET] (企业)个人中心 - 已发布职位 - 列表
M('/api/Company/Job/GetReleaseJobList',{ "code": "0", "msg": "ok", "body|15": [ EditJob ] });
// [GET] (企业)个人中心 - 已发布职位 - 刷新/上架/下架
M('/api/Company/Job/RepublishJob',SimpleSuccess);
M('/api/Company/Job/SuspendJob',SimpleSuccess);
M('/api/Company/Job/PutawayJob',SimpleSuccess);

// [GET] (企业)个人中心 - 已发布职位 - 修改职位 - 查
M(/\/api\/Company\/Job\/GetJobDetail\?jobId\=\w+/, { "code": "0", "msg": "ok", "body": EditJob });
// [GET] (企业)个人中心 - 已发布职位 - 修改职位 - 改
M('/api/Company/Job/UpdateJob',SimpleSuccess);
