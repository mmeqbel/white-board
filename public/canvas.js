//get canvas 
const canvas = document.getElementById("canvas");
let socket = io();
window.addEventListener("load", () => {
    //specifing contex (envirement we will work in it (2d or 3d))
    const ctx = canvas.getContext("2d");
    resizeCanvase();
    function resizeCanvase() {
        //resizing canvas 
        canvas.height = window.innerHeight-(window.innerHeight*20/100);
        canvas.width = window.innerWidth-(window.innerWidth*20/100);
    }  
    //resize window event
    window.addEventListener("resize",resizeCanvase);

    //line drawing 
    let drawing = false; // when mouse keydown  event triggered will be true


    canvas.addEventListener("mousedown",(e)=>{
        socket.emit('mousedown',e.clientX,e.clientY);    
    }); 
    canvas.addEventListener("mouseup",(e)=>{
        socket.emit('mouseup'); 
    });  
    canvas.addEventListener("mousemove",(e)=>{
        socket.emit('mousemove',e.clientX,e.clientY);
    });

    socket.on("_mousedown",(_drawing,x,y)=>{
        drawing=_drawing;
        ctx.beginPath();
        draw(x,y);
    });
    socket.on("_mouseup",(_drawing)=>{
        drawing=_drawing;
        ctx.beginPath("false");
    })
    
    socket.on("_mousemove",(x,y)=>{
        draw(x,y);
    })
    function draw(x,y) {
        if(!drawing)return;
        ctx.lineWidth=10;//line width
        ctx.lineCap="round";//line shape
        ctx.lineTo(x,y);//position
        ctx.strokeStyle="red"
        ctx.stroke();//visualize drawing 
    }
});
