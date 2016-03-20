import 'babel-polyfill';
import * as angular from 'angular';
import * as InstantClick from 'instantclick2';

angular.module('app', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

//Loads all the angular modules
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /^(?!\.\/App.js).*\.js$/));

const initApp = function() {
    angular.bootstrap(document.body, ['app']);
};
initApp();

InstantClick.init({
    preloadingMode: 0,
    preloadCacheTimeLimit: Number.MAX_VALUE
});
InstantClick.on('change', function() {
    initApp();
});