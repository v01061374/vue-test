<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <link type="text/css" href="{{asset('css/app.css')}}">

    <title>Document</title>
</head>
<body>
    <div id="app" style="overflow-y: scroll;">
        {{--vue output comes here--}}
    </div>
    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>
