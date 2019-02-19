;(function (ng) {
    "use strict";

    ng.module('alt.header-fixed', [])
    .constant('AltHeaderFixedEvents', {
        CALC_FIXED_HEADER_SIZE: 'header.fixed:calc_fixed_header_size'
    })
    .service('AltHeaderFixedService', [
        '$rootScope',
        'AltHeaderFixedEvents',
        function ($rootScope, event) {
            this.startDirective = function (obj, directiveStatusObject) {
                $rootScope.$broadcast(event.CALC_FIXED_HEADER_SIZE, obj, directiveStatusObject);
            };
        }
    ])
    .directive('altHeaderFixedDirective', [
        '$rootScope',
        'AltHeaderFixedEvents',
        '$timeout',
        '$window',
        function ($rootScope, event, $timeout, $window) {
            return {
                retrict: 'A',
                scope: {
                    id: '=?',
                    mgTop: '=?',
                    styles: '=?'
                },
                link: function (scope, element) {
                    scope.tFixed = null;
                    scope.randomNumber = Math.floor(Math.random() / 0.0001);

                    if (!scope.id) {
                        scope.id = "tableHeaderFixed";
                    }

                    if (!scope.mgTop) {
                        scope.mgTop = 0;
                    }

                    if (!scope.styles) {
                        scope.styles = {
                            top: 0,
                            position: 'fixed',
                            width: 'auto',
                            display: 'none',
                            border: 'none'
                        };
                    }

                    function prependStyles() {
                        let styles = '';
                        for (let style in scope.styles) {
                            styles += `${style}: ${scope.styles[style]}; `;
                        }

                        $('head').prepend(`<style id="headerFixedDirectiveStyles_${scope.randomNumber}">#${scope.id} .theadFixed {${styles}}</style>`);
                    }

                    function resizeFixed() {
                        scope.tFixed.find("th").each(function (index) {
                            $(this).css("width", element.find("th").eq(index).outerWidth() + "px");
                        });
                    }

                    function init() {
                        if (!scope.tFixed) {
                            element.wrap(`<div id="${scope.id}" />`);
                        } else {
                            element.parent().find('.theadFixed').remove();
                        }

                        scope.tFixed = element.clone();
                        scope.tFixed.find("tbody").remove().end().addClass("theadFixed").insertBefore(element);
                        scope.tFixed.removeClass('ng-hide');

                        resizeFixed();
                    }

                    function scrollFixed() {
                        var offset = $(this).scrollTop(),
                            tableOffsetTop = element.offset().top - scope.mgTop,
                            tableOffsetBottom = tableOffsetTop + element.height() - element.find("thead").height();

                        if (offset < tableOffsetTop || offset > tableOffsetBottom) {
                            scope.tFixed.hide();
                        }

                        if (offset >= tableOffsetTop && offset <= tableOffsetBottom && scope.tFixed.is(":hidden")) {
                            scope.tFixed.show();
                        }
                    }

                    scope.$on(event.CALC_FIXED_HEADER_SIZE, (obj, directiveStatusObject) => {
                        if ((!!directiveStatusObject && !!directiveStatusObject.id && directiveStatusObject.id === scope.id) || scope.id === 'tableHeaderFixed') {
                            $timeout(() => {
                                init();
                                angular.element($window).on('resize', resizeFixed);
                                angular.element($window).on('scroll', scrollFixed);
                            });
                        }
                    });

                    scope.$on('$destroy', () => {
                        $('head').find(`#headerFixedDirectiveStyles_${scope.randomNumber}`).remove();
                    });

                    ; (function () {
                        prependStyles();
                    }());
                }
            };
        }
    ]);
}(window.angular));
