<?php
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



//Route::domain('app.localhost:8000')->group(function(){
//    Route::get('/{any}', 'SinglePageController@index')->where('any', '.*');
//});

Route::group(array('domain' => 'app.{domain}'), function () {
    Route::get('/{any}', 'SinglePageController@index')->where('any', '.*');
});

Route::get('/', function(){
   var_dump('backend');
});
