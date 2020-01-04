<?php

namespace App\Http\Controllers;

use App\User;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class AuthController extends Controller
{
    // TODO throttle login
    public function login(Request $request){
        $h = new Client;
        try{
            $response = $h->post(config('services.passport.login_endpoint'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username' => $request->username,
                    'password' => $request->password,
                    'scope' => '',
                ],
            ]);
            return $response->getBody();
        }catch (BadResponseException $e){
            if($e->getCode() === 400){
                return response()->json('user o pass dastan dare.', $e->getCode());
            }
            return response()->json('Something went wrong', $e->getCode());
        }

    }

    public function register(Request $request){
        var_dump('fasdfasdf');
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'
                , 'confirmed'
            ],
        ]);
        try{
            // TODO remember to sanitize Eth
            $user = User::create([
                'name' => strip_tags($request->name),
                'email' => strip_tags($request->email),
                'password' => bcrypt($request->password),
            ]);
            return;
        }catch (\Exception $e){
            var_dump( $e);
            return response()->json('Something went wrong', $e->getCode());
        }

//        $h = new Client;

//        try{
//            $response = $h->post(config('services.passport.login_endpoint'), [
//                'form_params' => [
//                    'grant_type' => 'password',
//                    'client_id' => config('services.passport.client_id'),
//                    'client_secret' => config('services.passport.client_secret'),
//                    'username' => $request->username,
//                    'password' => $request->password,
//                    'scope' => '',
//                ],
//            ]);
//            return $response->getBody();
//        }catch (BadResponseException $e){
//            if($e->getCode() === 400){
//                return response()->json('user o pass dastan dare.', $e->getCode());
//            }
//            return response()->json('Something went wrong', $e->getCode());
//        }

    }

    public function logout(){

        auth()->user()->tokens->each(function ($token, $key){
           $token->revoke();
        });
        return response()->json('logged out', 200);
    }
}
