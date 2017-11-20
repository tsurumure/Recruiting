require.config({
    map:{ '*':{ 'css':'/Content/Phone/js/require/async/css.min' } },
    waitSeconds:0, //baseUrl: "/", 
    urlArgs:'v=' + (new Date()).getTime(),
    paths:{
        // 'BaiduMapData':'http://developer.baidu.com/map/jsdemo/data/points-sample-data.js' // 海量点
        'BaiduMap':'http://api.map.baidu.com/api?v=2.0&ak=fU8kHTKvOqNmv5QVRUGCUViC',
        'async':'/Content/Phone/js/require/async/async',
        'lrz':'/Content/Phone/js/require/async/lrz.all.bundle',
        'zxxFile':'/Content/Phone/js/require/async/zxxFile',
        'xml2json':'/Content/Phone/js/require/async/xml2json',
        'qrcode':'/Content/Phone/js/require/async/qrcode',
        'base64':'/Content/Phone/js/require/async/base64',
        'md5':'/Content/Phone/js/require/async/md5',
        'jquery':'/Content/Phone/js/require/async/jquery.min',
        'WX_SDK':'http://res.wx.qq.com/open/js/jweixin-1.2.0',
        'mockjs':'/Mock/mock', 'mock':'/Mock/mock.config'
    },
    shim:{
        'mock':['mockjs']
    }
});