Mock.Random.string();

// Head meta Attribute [name:keywords]
Mock.mock('/api/Common/Common/GetWebSiteKeyWords',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "达工宝,汕头找工作,揭阳找工作,汕头打工,揭阳打工,汕头招聘网,揭阳招聘网"
});

// Head meta Attribute [name:description]
Mock.mock('/api/Common/Common/GetWebSiteDescription',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "达工宝是广东汇才推出专注于蓝领求职+社交的免费APP。达工宝对企业的招聘信息审核归类后，发布达工宝APP。达工宝保障职位可靠同时，让蓝领便捷地通过移动互联网获取最新招聘信息。",
});

// Head meta Attribute [name:searchtitle]
Mock.mock('/api/Common/Common/GetWebSiteSearchTitle',{
    "code": "0", "msg": "成功", "count": 0,
    "body": "汕头招聘网,达工宝,汕头人才网,汕头招聘,汕头人才市场,汕头招聘信息,汕头招聘会"
});

// 单张广告图片弹窗（小图Base64，用于判断是否有数据更新，减少数据加载量）
Mock.mock(/\/api\/Common\/Common\/GetAdPhonePopupWindowDisplayNumber\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Yc"
});

// 单张广告图片弹窗（链接跳转地址）
Mock.mock(/\/api\/Common\/Common\/GetAdPhonePopupWindowURL\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "#/tab/job/detail/index/1f0479874652457185d874be59cea694"
});

// 单张广告图片弹窗（大图Base64）
Mock.mock(/\/api\/Common\/Common\/GetAdPhonePopupWindow\?area\=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "data:image/png;base64,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"
});

// [首页] 获取职位列表
// Mock.mock('/api/Common/Job/GetHomeJobList?AreaId=00000000000000000000000000440500&PageIndex=0&PageSize=10',{
Mock.mock(/\/api\/Common\/Job\/GetHomeJobList\?AreaId\=\w+\&PageIndex\=\w+\&PageSize\=\w+/,{
    "code": "0", "msg": "ok",
    "body|20": [
      {
        "Id": "098e9c2257ca43e1a9fff1779cf62062", "EnterpriseId": "6abcb5e1ad5a4999b93928561c355b14",
        "Name": "人力资源培训师", "EnterpriseName": "广东人力资源有限公司",
        "EnterpriseLogoSmall": "/Mock/Images/Head/default_company.png", "IsPutaway": true,
        "Pay": "10000-12000", "JobPayUnit": "元/月", "WelfareValue": "周末双休,年终奖,五险一金",
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

// 获取职位详情
Mock.mock(/\/api\/Common\/Job\/GetJob\?jobId\=\w+/, {
    "code": "0", "msg": "ok", "count": 0,
    "body": {
        "Id": "098e9c2257ca43e1a9fff1779cf62062",
        "Name": "人力资源培训师", "Pay": "10000-12000", "JobPayUnit": "元/月",
        "UserId": "ad1afaf8e17c49b0a531151fc4342edc", "EnterpriseId": "6abcb5e1ad5a4999b93928561c355b14",
        "EnterpriseName": "广东人力资源有限公司", "EnterpriseNatureCode": "A05",
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

Mock.mock(/\/api\/Common\/Enterprise\/GetEnterprise\?entId\=\w+/,{
    "code": "0",
    "msg": "ok",
    "body": {
      "Id": "6abcb5e1ad5a4999b93928561c355b14", "UserId": "ad1afaf8e17c49b0a531151fc4342edc",
      "Name": "广东人力资源有限公司", "Industry": "人力资源", "Nature": "民营企业",
      "Intro": "广东人力资源有限公司由广东省对外劳务经济合作领域的优质资源整合而成，公司源自1979年4月由中华人民共和国对外贸易经济合作部批准成立的广东省劳动服务公司，是中国成立最早、规模最大的劳务合作、人才交流、各类人才派遣的专业国有大型企业。拥有国家商务部、人力资源和社会保障部以及广东省人力资源和社会保障厅、工商局批准的从事各类人力资源经营性服务的经营许可证和营业执照。公司业务范围包括：国内外人才中介服务，向港澳地区和世界各地派遣各类劳务人员，收集、整理、储存和发布国内外人才供求信息，人才推荐，人才招聘，人才测评，人才培训，人力资源开发与管理咨询，国内外劳动力职业介绍及就业服务。公司下设多个专业公司及分支机构，并拥有一支多年从事国内外人才中介服务、劳动力职业介绍及劳务输出的专业化团队，可为各界提供方便、快捷、优质的人力资源服务。 ",
      "WebsiteUrl": "www.zdzp.com", "BusRoutes": "", "MapLocation": "23.385766,116.742521",
      "Logo": "/Mock/Images/Head/company_1.png", "LogoLit": "/Mock/Images/Head/company_1.png",
      "Address": "汕头市金砂东路104号金龙大厦1-2楼", "PeopleNum": "50-100人",
      "RegisteredCapital": "100万以下", "IsSelf": false,
      "ContactManName": "杨先生", "ContactManPhone": "13670511519",
      "Images": [ "Mock/Images/CompanyDetail/1.jpg","Mock/Images/CompanyDetail/2.jpg","Mock/Images/CompanyDetail/3.jpg"],
      "Jobs|5": [{
          "Id": "098e9c2257ca43e1a9fff1779cf62062", "UserId": "ad1afaf8e17c49b0a531151fc4342edc",
          "Name": "人力资源培训师", "Pay": "10000-12000", "JobPayUnit": "元/月", "IsPutaway": true,
          "EnterpriseLogoSmall": "/Mock/Images/Head/company_1.png"
      }]
    }
  });

// [POST] 添加阅读记录
Mock.mock(/\/api\/Common\/Job\/AddReadRecord/, { "code": "0", "msg": "成功", "body": {}, "count": 0 });


// [首页] 获取热门搜索关键词
Mock.mock(/\/api\/Common\/Common\/GetHotSerachKeyword\?area\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body|9": [
        "测试数据"
    ]
});

// [首页] 获取Banner
Mock.mock('/api/Common/Article/GetSlideList',{
  "code": "0",
  "msg": "ok",
  "body": [
    { "Pic": "/Mock/Images/Banner/1.jpg", "IsLink": false, "Url": "" },
    { "Pic": "/Mock/Images/Banner/2.jpg", "IsLink": false, "Url": "" },
    { "Pic": "/Mock/Images/Banner/3.jpg", "IsLink": false, "Url": "" }
  ],
  "count": 0
});

// [首页] 获取最新公告
Mock.mock(/\/api\/Common\/Article\/GetNotice\?areaId\=*/,{
    "code": "0",
    "msg": "ok",
    "body|4": [
      {
        "Id": "@string(5)",
        "Name": "@string(20)",
        "Content|1": ["11111<b>随机</b>内容11111","22222随机内容22222","3333333随机内容33333","4444随机内容44"],
        "ReleaseTime": "2017-10-21 15:17:21", "IsLink": true, "Url": "",
        "Describe": "", "Pic": "",
      }
    ]
});

// 获取 验证码
Mock.mock(/\/api\/Common\/VerificationCode\/GetImage\?Width\=\w+\&Height\=\w+\&Type=\w+/,{
    "code": "0", "msg": "成功", "count": 0,
    "body": "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"
});

// [附近] 获得附近职位列表
Mock.mock(/\/api\/Common\/Job\/GetJobMapList\?lng\=\w+\.\w+\&lat\=\w+\.\w+/,{
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

// [广场] 获取广场列表
Mock.mock('/api/Common/Square/GetNewestMessageList',{
    "code": "0",
    "msg": "ok",
    "body|10": [
        //"ContentData": "{\"Id\":\"74703fa9044c4ef68c0c2ce9cd22c8af\",\"Type\":\"FulltimeResume\",\"Resume\":{\"Id\":\"1b5e088fbd5046c8aeb4d9876723e41c\",\"Title\":\"简易2\",\"Realname\":\"发达\",\"GenderCode\":\"A01\",\"NationCode\":\"A03\",\"MaritalStatusCode\":\"A01\",\"Stature\":111,\"Address\":\"工工工工\",\"ComputerLevelCode\":\"A02\",\"EnglishLevelCode\":\"A01\",\"NativePlaceAreaId\":\"00000000000000000000000000210600\",\"NativePlaceAreaName\":\"丹东市\",\"NativePlaceAreaCascadeName\":\"辽宁省 丹东市\",\"GraduateSchool\":\"1231\",\"MajorIn\":\"12312312312\",\"HeadImage\":\"http://192.168.1.21:8888/UpFile/UserHead/8bcf8f86-7078-4c10-8499-4df99a79eb29.jpg\",\"Idcard\":\"440508111111111\",\"Gender\":\"A01\",\"Nation\":\"A03\",\"QQ\":\"\",\"Birthday\":\"1970-01-21T00:00:00\",\"LiveAreaId\":\"00000000000000000000000000440500\",\"LiveAreaName\":\"汕头市\",\"LiveAreaCascadeName\":\"广东省 汕头市\",\"IntentionAreaIds\":\"00000000000000000000000000440500\",\"IntentionAreaNames\":\"汕头市\",\"IntentionJobTypeId\":\"00000000000000000000000000000015\",\"IntentionJobType\":\"招商经理\",\"IntentionJobTypeIds\":\"00000000000000000000000000000015\",\"IntentionJobTypeNames\":\"招商经理\",\"WorkStatusCode\":\"   \",\"WorkingAgeCode\":\"A01\",\"IntentionPayCode\":\"A01\",\"EducationCode\":\"A01\",\"WorkExperience\":\"[]\",\"EduExperience\":\"[]\",\"PersonalProfile\":\"3123123123\",\"Proportion\":0.6,\"Certificate\":\"11\",\"Skill\":\"22\",\"IsDefault\":true,\"Integral\":0,\"Phone\":\"\",\"Email\":\"\",\"UserId\":\"9590d84a86914ecc88e27cb579b77c4e\",\"ReleaseTime\":\"2017-11-07T16:40:01\",\"Labels\":\"A01,A04\"}}",
      {
        "Id": "afa22d50250d4f6aae538e17dcdac90f", "Type": "", "UserId": "3317f16500124c3fa524d9726a77c098",
        "Url": "/m/square/selectMessage/afa22d50250d4f6aae538e17dcdac90f",
        "UserHeadPic": "/Mock/Images/Head/jobseeker_1.png", "UserNickName": "俺是张三",
        "PraiseCount": 2, "PraiseUserIds": [ "f9bf5e209c40492dbaa25554b4c9757c", "4bbd3217007b4bfdab201fa3c43e668f" ],
        "PraiseUserNickNames": [ "俺是张三", "李四" ], "PraiseUserHeadImages": [ "" ],
        "Content": "除了自律以外，自黑的能力也相当重要。世界之大，无奇不有。等你哪一天稍微做出点成绩，就会有很多认识或不认识的人在背后议论是非，从最开始的吐槽，到断章取义的论断甚至无趣的黑你",
        "Images": "/Mock/Images/Square/b1.jpg,/Mock/Images/Square/b2.jpg,/Mock/Images/Square/b3.jpg",
        "ReleaseTime": "2017-11-08 10:23:04", "ReplyCount": 2, "StatusD": 1,
        "MessageReplyList": [
          {
            "Id": "b1bf1ae0a7b5444895b2d2f1a7c99454", "Content": "不错", "ReleaseTime": "2017-11-21 14:11:52",
            "UserId": "f9bf5e209c40492dbaa25554b4c9757c", "UserHeadPic": "", "UserNickName": "俺是张三",
            "ParentId": "", "ParentUserId": "", "ParentUserNickName": "", "ParentUserHeadPic": ""
          },
          {
            "Id": "c5cf2c1a879a463e94550e3b381e90e9", "Content": "是啊", "ReleaseTime": "2017-11-21 14:12:30",
            "UserId": "4bbd3217007b4bfdab201fa3c43e668f", "UserHeadPic": "", "UserNickName": "李四",
            "ParentId": "b1bf1ae0a7b5444895b2d2f1a7c99454", "ParentUserId": "f9bf5e209c40492dbaa25554b4c9757c",
            "ParentUserNickName": "Df9bf", "ParentUserHeadPic": ""
          }
        ]
      },
      {
        "Id": "afa22d50250d4f6aae538e17dcdac90f", "Type": "", "UserId": "3317f16500124c3fa524d9726a77c098",
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
});

// [广场] 获得广场个人信息
Mock.mock(/\/api\/Common\/Square\/GetUserInfo\?UserId\=\w+/,{
    "code": "0", "msg": "ok", "count": 0,
    "body": {
      "Id": "3317f16500124c3fa524d9726a77c098", "NickName": "俺是张三", "RealName": "张三",
      "HeadPic": "/Mock/Images/Head/jobseeker_1.png",
    }
});