<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <meta name="viewport" content="user-scalable = no">


    <title>Document</title>
</head>
<body>
    <div id="app" style="overflow-y: scroll;">
        {{--vue output comes here--}}
    </div>
    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>
