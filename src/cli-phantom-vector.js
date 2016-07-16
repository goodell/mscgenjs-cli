/* eslint-env phantomjs */
/* eslint no-var:0, no-magic-numbers: 0, func-names:0, no-console:0, prefer-arrow-callback:0 max-params:0*/
/* globals renderVectorInThePage */
var system = require('system');

var gPage               = system.args[1];
var gASTString          = system.args[2];
var gModuleBase         = system.args[4];
var gRequirePath        = system.args[5];
var gStyleAdditions     = system.args[6];
var gMirrorEntities     = system.args[7];
var gAdditionalTemplate = system.args[8];

var page = require('webpage').create();

page.onCallback = function(pSVG){
    console.log(pSVG);
    phantom.exit();
};

page.onError = function(pMessage /* , pTrace*/) {
    console.error(pMessage);
    phantom.exit(1);
};

page.onConsoleMessage = function(pMessage) {
    console.log(pMessage);
    phantom.exit(0);
};

page.open(gPage, function(pStatus) {
    if (pStatus === "success") {
        page.injectJs(gRequirePath);
        page.evaluate(
            function(pASTString, pModuleBase, pStyleAdditions, pMirrorEntities, pAdditionalTemplate){
                renderVectorInThePage(
                    pASTString,
                    pModuleBase,
                    pStyleAdditions,
                    pMirrorEntities,
                    pAdditionalTemplate
                );
            },
            gASTString,
            gModuleBase,
            gStyleAdditions,
            gMirrorEntities,
            gAdditionalTemplate
        );
    } else {
        console.log("failed to open ", gPage);
        phantom.exit(1);
    }
});
