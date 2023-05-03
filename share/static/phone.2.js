var r = 'wss://videoaudiocall-1.brettlee21.repl.co/api/' + window.location.href.split('https://videoaudiocall-1.brettlee21.repl.co/')[1].split('/')[0] + '/'
var t = new WebSocket(r)
const servers = {
    'iceServers':[
        {
            'urls' : ['stun:stun1.1.google.com:19302' , 'stun:stun2.1.google.com:19302']
        }
    ]
}

let localStream;

let pc = new RTCPeerConnection(servers);  
var t2 = window.location.href.split('https://videoaudiocall-1.brettlee21.repl.co/')[1].split('/')[0]
let offer = async () => {
    await createPeerConnection(document.getElementById('to_user').value)
    let off = await pc.createOffer()
    await pc.setLocalDescription(off)
    console.log(off)
    t.send(JSON.stringify({'from' : t2 , 'to' : document.getElementById('to_user').value , 'type' : 'offer' , 'data' : off}))
}



let createPeerConnection = async (ID) => {
    peerConnection = pc

    remoteStream = new MediaStream()
    document.getElementById('user2').srcObject = remoteStream



    if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:true})
        document.getElementById('user1').srcObject = localStream
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

}




let createAnswer = async (ID, offer) => {
    await createPeerConnection(ID)
        await pc.setRemoteDescription(offer)
    
        pc.onicecandidate = async (event) => {
        if(event.candidate){
            t.send(JSON.stringify({'type':'candidate', 'data':event.candidate , 'to' : ID , 'from' : t2}))
        }
    }

    let answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)


    t.send(JSON.stringify({'type':'answer', 'data':answer , 'to' : ID , 'from' : t2}))
}





let addAnswer = async (answer) => {
    if(!pc.currentRemoteDescription){
        pc.setRemoteDescription(answer)
    }
}




t.onmessage = function(e){
    var tt = JSON.parse(e.data)
        if(tt['info']['rec_type'] === 'offer'){
        ring(tt['info']['from']  , tt['info']['data'])
    }

    if(tt['info']['rec_type'] === 'answer'){
        addAnswer(tt['info']['data'])
    }

    if(tt['info']['rec_type'] === 'candidate'){
        
            pc.addIceCandidate(tt['info']['data'])
    }


}








function ring(ID , E){
    var t = document.createElement('div')
    var m1 = document.createElement('AUDIO')
    m1.src = 'https://videoaudiocall-1.brettlee21.repl.co/static/audi.mp3'
    m1.id = 'ring'
    m1.autoplay = true;
    m1.loop = true;
    var b1 = document.createElement('button')
    var b2 = document.createElement('button')
    b1.innerHTML = "<img  src='https://img.icons8.com/external-vectorslab-flat-vectorslab/53/null/external-Incoming-Call-customer-support-vectorslab-flat-vectorslab-3.png'/>"
    b2.innerHTML = "<img  src='https://img.icons8.com/stickers/53/null/end-call.png'/>"
    b1.style.background = 'none'
    b2.style.background = 'none'
    b1.style.border = 'none'
    b2.style.border = 'none'
    t.append(b1 , b2)
    t.id = 'ri'
    var e = document.getElementById('body')
    e.append(m1)
    m1.style.display = 'none'
    e.append(t)
    e.style.zIndex = '-1'

    var mn = "att(" + "'" + ID + "'" + ")"
    var mn2 = "dec()"
    b1.setAttribute('onclick' , mn)
    b2.setAttribute('onclick' , mn2)

    localStorage.setItem('p' , JSON.stringify(E))
    var mri = document.getElementById('ring')
    mri.play()
}




function att(ID){
    m = JSON.parse(localStorage.getItem('p'))
    createAnswer(ID , m)
        var y = document.getElementById('ri')
        y.style.display = 'none'
        var y2 = document.getElementById('body')
        y2.style.zIndex = '1'
    var g = document.getElementById('ring')
    g.remove()
}

function dec() {

        var y = document.getElementById('ri')
        y.style.display = 'none'
        var y2 = document.getElementById('body')
        y2.style.zIndex = '1'
        var g = document.getElementById('ring')
    g.remove()
}