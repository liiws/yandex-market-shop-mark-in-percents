// ==UserScript==
// @name        yandex-market-shop-mark-in-percents
// @namespace   https://market.yandex.ru/
// @include     https://market.yandex.ru/shop--*/reviews*
// @include     https://market.yandex.ru/product--*/reviews*
// @include     https://market.yandex.ru/business--*/*/reviews*
// @grant       none
// @run-at      document-start
// @version     1.1.4
// @downloadURL https://github.com/liiws/yandex-market-shop-mark-in-percents/releases/download/release/yandex-market-shop-mark-in-percents.user.js
// @updateURL   https://github.com/liiws/yandex-market-shop-mark-in-percents/releases/download/release/yandex-market-shop-mark-in-percents.meta.js
// ==/UserScript==


window.addEventListener('DOMContentLoaded', Run);
window.addEventListener('load', Run);

function Run(isRepeating) {
	// if we called from 'DOMContentLoaded' then we don't need be called from 'onload'
	 window.removeEventListener('load', Run);

    var marksBlock = document.querySelector('div[data-zone-name="shop-rating-stat"]')
        || document.querySelector('div[data-zone-name="product-rating-stat"]');

    var mark5elem = marksBlock.querySelector('a div+div') || {};
    var mark4elem = marksBlock.querySelector('a+a div+div') || {};
    var mark3elem = marksBlock.querySelector('a+a+a div+div') || {};
    var mark2elem = marksBlock.querySelector('a+a+a+a div+div') || {};
    var mark1elem = marksBlock.querySelector('a+a+a+a+a div+div') || {};

    var mark5val = +((mark5elem.innerText || '0').match(/\d+/) || [])[0];
    var mark4val = +((mark4elem.innerText || '0').match(/\d+/) || [])[0];
    var mark3val = +((mark3elem.innerText || '0').match(/\d+/) || [])[0];
    var mark2val = +((mark2elem.innerText || '0').match(/\d+/) || [])[0];
    var mark1val = +((mark1elem.innerText || '0').match(/\d+/) || [])[0];

    var total = mark5val + mark4val + mark3val + mark2val + mark1val;

    document.querySelectorAll(".yms-mip").forEach(elem => elem.remove());

    mark5elem.innerHTML += '<span class="yms-mip" style="color:red"> &nbsp; ' + (Math.round(mark5val/total*1000)/10) + '%</span>';
    mark4elem.innerHTML += '<span class="yms-mip" style="color:red"> &nbsp; ' + (Math.round(mark4val/total*1000)/10) + '%</span>';
    mark3elem.innerHTML += '<span class="yms-mip" style="color:red"> &nbsp; ' + (Math.round(mark3val/total*1000)/10) + '%</span>';
    mark2elem.innerHTML += '<span class="yms-mip" style="color:red"> &nbsp; ' + (Math.round(mark2val/total*1000)/10) + '%</span>';
    mark1elem.innerHTML += '<span class="yms-mip" style="color:red"> &nbsp; ' + (Math.round(mark1val/total*1000)/10) + '%</span>';

    if (isRepeating !== true) {
        setTimeout(Run, 2000, true);
    }
}
