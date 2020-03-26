(function ($, undefined) {
        $.extend($.fn, {
            ShowSwitch: function (settings) {
                var params = $.extend({
                    css: '',
                    showIndex: 0,
                    showClass: ''
                }, settings);
                $.each($(this), function (i, n) {
                    new showSwitch(params, $(n));
                })
            }
        });
        function showSwitch(options, container) {
            if (options.css != '') {
                if (options.showClass != '') {
                    $(container).children(options.showClass).eq(options.showIndex).addClass(options.css);
                    $(container).children(options.showClass).hover(function () {
                        var _this = this;
                        $(_this).siblings(options.showClass).removeClass(options.css);
                        $(_this).addClass(options.css);
                    });
                } else {
                    $(container).children().eq(options.showIndex).addClass(options.css);
                    $(container).children().hover(function () {
                        var _this = this;
                        $(_this).siblings().removeClass(options.css);
                        $(_this).addClass(options.css);
                    });
                }
            } 
        }
    })(jQuery);