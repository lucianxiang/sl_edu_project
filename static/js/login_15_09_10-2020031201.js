
var accType = 0;
function UserLogin(username, password) {

    if (username == null) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>用户名不能为空。</span>", 3, false);
        return false;
    }
    if ((username.length < 1)) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>用户名不能为空。</span>", 3, false);
        return false;
    }
    if (username.length < 4 || username.length > 16) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>用户名长度在4-16个字符之间。</span>", 3, false);
        return false;
    }
    if (username.indexOf("-") > 0) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>用户名包含”-“符号，请替换为下划线。</span>", 3, false);
        return false;
    }
    if (!Validator.UserName(username)) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>用户名可能包含非法字符。</span>", 3, false);
        return false;
    }
    if (password == null) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>密码不能为空。</span>", 3, false);
        return false;
    }
    if (password.length < 1) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>密码不能为空。</span>", 3, false);
        return false;
    }
    if (password.length < 6 || password.length > 20) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>密码长度在6-20个字符之间。</span>", 3, false);
        return false;
    }
    if (!Validator.PassWord(password)) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>密码只能是字母、数字以及下划线。</span>", 3, false);
        return false;
    }
    GetAccountType(escape(username));
    if (accType == 0) {
        App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>用户名不存在。</span>", 3, false);
        return false;
    }
    $.ajax({
        type: "post",
        url: "/uc/user/userlogin",
        data: { username: escape(username), password: accType == 1 ? $.md5(password) : password },
        dataType: 'json',
        success: function (result) {
            if (result != null && result != "") {
                if (result.S == App.S) {
                    var skipflag = 0;
                    var uniontype = 0;
                    var objList = result.list.toString().split('|');
                    if (objList != null && objList.length > 0) {
                        skipflag = parseInt(objList[0]);
                        uniontype = parseInt(objList[1]);
                    }
                    localStorage.setItem("usertoken", result.msg);
                    if (skipflag == 0) {
                        //跳转到免费体验
                        window.location = "/course/taste";
                    } else {
                        //跳转到我的课堂
                        window.location = "/course/kc-index";
                    }
                } else {
                    App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>" + result.msg + "</span>", 3, false);
                }
            } else {
                App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>登录失败，请重试。</span>", 3, false);
            }
        },
        error: function (e) {
            App.notice("提示", "<span style='font-family:Microsoft YaHei;font-size:13px'>载入出错，登录失败。</span>", 3, false);
        },
        async: false,
        cache: false
    });
}

function GetAccountType(userName) {
    var option = { username: userName };
    App.post(function (result) {
        if (result.S == App.S) {
            accType = parseInt(result.msg);
        }
    }, "/uc/user/getaccounttype", option, false);
}

function StrLength(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}