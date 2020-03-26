var dialoading;
var App = {
    S: 1,
    post: function (callback, url, optionData, async, dataType) {
        $.ajax({
            async: async = async != null ? async : true,
            url: url,
            data: optionData,
            type: 'post',
            dataType: dataType = dataType != null ? dataType : 'json',
            success: function (o) {
                callback(o);
            },
            error: function (data) {
                alert(data.statusText, 3);
                return false;
            }
        });
    },
    get: function (callback, url, optionData, async, dataType) {
        $.ajax({
            async: async = async != null ? async : true,
            url: url,
            data: optionData,
            type: 'get',
            dataType: dataType = dataType != null ? dataType : 'json',
            success: function (o) {
                callback(o);
            },
            error: function (data) {
                alert(data.statusText, 3);
                return false;
            }
        });
    },
    notice: function (title, content, t, cancelbtn) {
        cancelbtn = cancelbtn != null ? cancelbtn : true;
        art.dialog({ id: "notice", title: title, opacity: 0.45, content: content, zIndex: 99998, lock: true, time: t, resize: false, fixed: true, cancel: cancelbtn });
    },
    succeed: function (title, content, t) {
        art.dialog({ id: "succeed", title: title, opacity: 0.45, content: content, zIndex: 99998, lock: true, time: t, resize: false, fixed: true, ok: function () { } });
    },
    loading: function (title, content) {
        dialoading = art.dialog({ id: "loading", opacity: 0.45, content: content, icon: "loading", zIndex: 99998, lock: true, cancel: false, title: title, fixed: true });
    },
    confirm: function (content, iconName, actionUrl) {
        artDialog({
            id: "Confirm", icon: iconName, fixed: true, lock: true, opacity: 0.3, content: "<div class=\"aui-boxt\" style=\"font-size:14px;\">" + content + "</div>", title: "提示", ok: function (here) {
                window.location.replace(actionUrl);
            },
            cancel: false
        });
    },
    changejsondateformat: function (jsondate) {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var date = new Date(parseInt(jsondate, 10));
        var curryear = date.getFullYear();
        var currmonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currdate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currhours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var currminutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var currseconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return curryear + "-" + currmonth + "-" + currdate + " " + currhours + ":" + currminutes + ":" + currseconds;
    },
    changejsondateshortformat: function (jsondate) {
        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        if (jsondate.indexOf("+") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        } else if (jsondate.indexOf("-") > 0) {
            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        }
        var date = new Date(parseInt(jsondate, 10));
        var curryear = date.getFullYear();
        var currmonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currdate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return curryear + "-" + currmonth + "-" + currdate;
    },
    opendialog: function (panl, title, url) {
        $('#' + panl).dialog({
            title: title,
            closed: false,
            cache: false,
            href: url,
            modal: true
        });
    },
    closedialog: function (panl) {
        $('#' + panl).dialog('close');//关闭窗口
    },
    clearlistsameitem: function (list) {
        //清除list相同项
        var result = list;
        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < list.length; j++) {
                temp = list[i];
                if ((i + j + 1) < list.length && temp == list[i + j + 1]) { //如果当前元素与后一个元素相等
                    result.splice(i + j + 1, 1);       //然后就移除下一个元素
                }
            }
        }
        return result
    },
    deletelistofid: function (idlist, delid) {
        var tmpList = idlist.toString().split(',');
        var retList = new Array();
        for (i = 0; i < tmpList.length; i++) {
            if (tmpList[i].toString().trim() == delid.toString().trim()) {
                tmpList[i] = "0";
            }
        }
        var num = 0;
        for (j = 0; j < tmpList.length; j++) {
            if (tmpList[j].toString().trim() != "0") {
                retList[num] = tmpList[j].toString().trim();
                num += 1;
            }
        }
        return retList.toString();
    }
}