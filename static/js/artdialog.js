//提示框
function artdialog_notice(content, t) {
    artdialog = art.dialog({ id: "notice", title: false, cancel: false, content: "<div class=\"aui-boxt\" style=\"font-size:14px;\">" + content + "</div>", zIndex: 18008, lock: true, time: t, resize: false, fixed: true });
}