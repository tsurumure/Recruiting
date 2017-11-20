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
        "EnterpriseName": "广东人力资源有限公司(测试)",
        "EnterpriseLogoSmall": "http://192.168.1.21:8888/UpFile/Pic/fbf49ae2-83ac-4680-abcd-fe0f9b1ac8a2.jpg",
        "Name": "前端设计师(Mock)", "Nature": "A01",
        "JobTypeId": "00000000000000000000000000000121", "JobTypeName": "IT行业",
        "Department": "技术部", "RecruitingCount": 10,
        "PayWay": "A01", "WorkAreaId": "00000000000000000000000000440507",
        "WorkAreaName": "龙湖区", "WorkAreaCascadeName": "广东省 汕头市 龙湖区",
        "Pay": "10000-12000", "JobPayUnit": "元/月",
        "Welfare": "A09,A04,A05", "WelfareValue": "周末双休,返现,实习",
        "MapLocation": "116.72710393761011,23.372009521654274",
        "ReleaseTime": "2017-10-26 17:35:43", "IsPutaway": true, "ApplyCount": 2
      }
    ]
});

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
  "body|3": [
    {
      "Id": "79a7212eabcc4c5383dab41842f348a7", "Name": "测试图片1", "Content": "测试图片1内容长文本",
      "ReleaseTime": "2017-04-15 11:13:48", "IsLink": false, "Url": "", "Describe": "1",
      "Pic": "http://192.168.1.21:8888/UpFile/Pic/636277579992380194_b1.jpg"
    }
  ],
  "count": 0
});

// [首页] 获取最新公告
Mock.mock(/\/api\/Common\/Article\/GetNotice\?areaId\=*/,{
    "code": "0",
    "msg": "ok",
    "body|4": [
      {
        "Id": "@string(5)", "Name": "@string(15)",
        "Content|1": ["随机内容11（可带html标签）","随机内容22（可带html标签）","随机内容33（可带html标签）"],
        "ReleaseTime": "2017-10-21 15:17:21", "IsLink": true, "Url": "",
        "Describe": "", "Pic": "",
      }
    ]
});
