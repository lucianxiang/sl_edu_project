var Validator = {
    UserName: function (str) {
        var paten = /^[a-zA-Z0-9_\u4e00-\u9fa5\w]{4,16}$/;
        if (str.match(paten) == null) {
            return false;
        }
        return true;
    },
    Email: function (str) {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (str.match(reg) == null) {
            return false;
        }
        return true;
    },
    Phone: function (str) {
        var reg = /^(13|14|15|17|18)[0-9]{9}$/
        if (str.match(reg) == null) {
            return false;
        }
        return true;
    },
    PassWord: function (str) {
        var reg = /^[a-zA-Z0-9_-]+$/
        if (str.match(reg) == null) {
            return false;
        }
        return true;
    }
}