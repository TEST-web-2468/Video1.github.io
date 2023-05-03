<html>

<head>
    <link rel='stylesheet' href = 'https://share.brettlee21.repl.co/static/chatvr2/call/phone.css'>
    <script src = 'https://videoaudiocall-1.brettlee21.repl.co/static/phone_2w.js' defer></script>

        <script src = 'https://videoaudiocall-1.brettlee21.repl.co/static/pre_proto.js' defer></script>
</head>

    <style>


        #ri{
            position: absolute;
    top: 50%;
    left: 50%;
    background: darkcyan;
    height: 10%;
    display: flex;
    align-items: center;
    border-radius: 30px;
        }
    </style>


    
    <body style='margin: 0;' id='body'>
        <div class = 'call_body' style = 'flex-direction: row; align-items: center;'>

            
            <div class = 'call_option' style = 'margin: 0; width: 20%; border-radius: 0;'>
                <input id='to_user' type = 'text' placeholder = 'user_name' style = 'margin-top: 20px;height: 50px; border-radius: 30px; background: transparent; border:none; border-bottom: solid cyan;'>
                <button style = 'height: 50px; border-radius: 30px;' onclick = 'offer()'>Submit</button>
            </div>

            
            <div class = 'display' style= 'margin:10px;' >
                <video id = 'user1' autoplay class = 'user_call_card' muted></video>
                <video id = 'user2' autoplay class = 'user_call_card'></video>
            </div>
        </div>
    </body>
</html>